import React from 'react'
import ReactDOM from 'react-dom'
import TransitionGroupContext from './TransitionGroupContext'

import config from './config'

export const UNMOUNTED = 'unmounted'
export const EXITED = 'exited'
export const ENTERING = 'entering'
export const ENTERED = 'entered'
export const EXITING = 'exiting'

/**
 * The Transition component lets you describe a transition from one component
 * state to another _over time_ with a simple declarative API. Most commonly
 * it's used to animate the mounting and unmounting of a component, but can also
 * be used to describe in-place transition states as well.
 *
 * ---
 *
 * **Note**: `Transition` is a platform-agnostic base component. If you're using
 * transitions in CSS, you'll probably want to use
 * [`CSSTransition`](https://reactcommunity.org/react-transition-group/css-transition)
 * instead. It inherits all the features of `Transition`, but contains
 * additional features necessary to play nice with CSS transitions (hence the
 * name of the component).
 *
 * ---
 *
 * By default the `Transition` component does not alter the behavior of the
 * component it renders, it only tracks "enter" and "exit" states for the
 * components. It's up to you to give meaning and effect to those states. For
 * example we can add styles to a component when it enters or exits:
 *
 * ```jsx
 * import { Transition } from 'react-transition-group';
 *
 * const duration = 300;
 *
 * const defaultStyle = {
 *   transition: `opacity ${duration}ms ease-in-out`,
 *   opacity: 0,
 * }
 *
 * const transitionStyles = {
 *   entering: { opacity: 1 },
 *   entered:  { opacity: 1 },
 *   exiting:  { opacity: 0 },
 *   exited:  { opacity: 0 },
 * };
 *
 * const Fade = ({ in: inProp }) => (
 *   <Transition in={inProp} timeout={duration}>
 *     {state => (
 *       <div style={{
 *         ...defaultStyle,
 *         ...transitionStyles[state]
 *       }}>
 *         I'm a fade Transition!
 *       </div>
 *     )}
 *   </Transition>
 * );
 * ```
 *
 * There are 4 main states a Transition can be in:
 *  - `'entering'`
 *  - `'entered'`
 *  - `'exiting'`
 *  - `'exited'`
 *
 * Transition state is toggled via the `in` prop. When `true` the component
 * begins the "Enter" stage. During this stage, the component will shift from
 * its current transition state, to `'entering'` for the duration of the
 * transition and then to the `'entered'` stage once it's complete. Let's take
 * the following example (we'll use the
 * [useState](https://reactjs.org/docs/hooks-reference.html#usestate) hook):
 *
 * ```jsx
 * function App() {
 *   const [inProp, setInProp] = useState(false);
 *   return (
 *     <div>
 *       <Transition in={inProp} timeout={500}>
 *         {state => (
 *           // ...
 *         )}
 *       </Transition>
 *       <button onClick={() => setInProp(true)}>
 *         Click to Enter
 *       </button>
 *     </div>
 *   );
 * }
 * ```
 *
 * When the button is clicked the component will shift to the `'entering'` state
 * and stay there for 500ms (the value of `timeout`) before it finally switches
 * to `'entered'`.
 *
 * When `in` is `false` the same thing happens except the state moves from
 * `'exiting'` to `'exited'`.
 */

const defaultProps = {
  in: false,
  mountOnEnter: false,
  unmountOnExit: false,
  appear: false,
  enter: true,
  exit: true,
  timeout: {
    appear: 500,
    enter: 500,
    exit: 500
  }
}

interface Itimeout {
  appear:number
  enter:number
  exit:number
}

interface IP {
  children: any // 某个状态下需要过渡效果的目标组件，可以是函数（“ entering”，“ entered”，`'exiting'`，`'exited'`）
  in:boolean // 用于在enter与exit状态之间转换，默认为false，表示不挂载组件或者处于exit状态。
  mountOnEnter: boolean // 在第一次in={true}即挂载的时候，设置mountOnEnter={true}表示延迟挂载，懒加载组件。
  unmountOnExit: boolean // 如果为true，在组件处于exited状态的时候，卸载组件。
  appear:boolean // 如果为true，在组件挂载的时候，展示过渡动画。默认为false，第一次挂载过渡动画不生效。
  enter:boolean // 如果为true，表示允许enter状态的过渡动画生效，默认为true
  exit:boolean // 如果为true，表示允许exit状态的过渡动画生效，默认为true
  timeout: number | Itimeout
  addEndListener?: (node:any, nextCallback:any) => void //过渡动画结束时执行的毁掉函数
  onEnter: (node:any, appearing:boolean) => void // 进入回调
  onEntering: (node:any, appearing:boolean) => void // 进入中回调
  onEntered: (node:any, appearing:boolean) => void // 进入结束回调

  onExit: (node:any, appearing:boolean) => void // 退出回调
  onExiting: (node:any, appearing:boolean) => void // 退出中回调
  onExited: (node:any, appearing:boolean) => void // 退出结束回调
};

interface IS {
  status: string
}

class Transition extends React.Component<IP, IS> {
  static defaultProps = defaultProps;

  appearStatus:any;
  nextCallback:any;
  state = {
    status: UNMOUNTED
  };

  constructor(props:IP, context:any) {
    super(props, context)

    let parentGroup = context
    // 有父组件且父组件挂载完毕，则所有子组件开始进入
    let appear:boolean|undefined =
      parentGroup && !parentGroup.isMounting ? props.enter : props.appear

    let initialStatus

    this.appearStatus = null

    if (props.in) {
      if (appear) {
        // 第一次挂载动画生效
        this.appearStatus = ENTERING
        initialStatus = EXITED
      } else {
        initialStatus = ENTERED
      }
    } else {
      if (props.unmountOnExit || props.mountOnEnter) {
        initialStatus = UNMOUNTED
      } else {
        initialStatus = EXITED
      }
    }

    this.state = { status: initialStatus }

    this.nextCallback = null
  }

  // 组件第一次渲染完成，此时dom节点已经生成
  componentDidMount() {
    // 第一次挂载的时候，如果in = true && appear = true，则appearStatus=ENTERING动画生效，否则为null。
    this.updateStatus(true, this.appearStatus)
  }

  componentDidUpdate(prevProps:IP) {
    let nextStatus = null
    if (prevProps !== this.props) {
      const { status } = this.state

      //根据in=true判断此时需要进行入场动
      if (this.props.in) {
        if (status !== ENTERING && status !== ENTERED) {
          //如果当前状态既不是正在入场也不是已经入场，则将下一个状态置为正在入场
          nextStatus = ENTERING
        }
      } else {
        //根据in=false判断此时需要进行退场动画
        if (status === ENTERING || status === ENTERED) {
          //如果当前状态是正在入场或者已经入场，则将下一个状态置为退场
          nextStatus = EXITING
        }
      }
    }
    this.updateStatus(false, nextStatus)
  }

  static getDerivedStateFromProps(nextProps:IP, prevState:IS) {
    // 更新阶段：
    // 如果挂载阶段in=true,上一次显示未挂载则状态更新为退出
    if (nextProps.in && prevState.status === UNMOUNTED) {
      return { status: EXITED }
    }
    return null
  }

  componentWillUnmount() {
    this.cancelNextCallback()
  }

  getTimeouts() {
    const { timeout } = this.props
    let exit = 0,
        enter =0,
        appear = 0

    if (timeout != null && typeof timeout === 'number') {
      exit = enter = appear = timeout
    }

    if (timeout != null && typeof timeout !== 'number') {
      exit = timeout.exit
      enter = timeout.enter
      // TODO: remove fallback for next major
      appear = timeout.appear !== undefined ? timeout.appear : enter
    }
    return { exit, enter, appear }
  }

  updateStatus(mounting = false, nextStatus: string|null) {
    if (nextStatus) {
      // nextStatus will always be ENTERING or EXITING.
      this.cancelNextCallback() // 挂载阶段无操作
      const node = ReactDOM.findDOMNode(this) // 挂载阶段找到真实DOM

      // 更新阶段nextStatus只有两种状态ENTERING与EXITING
      // 如果为ENTERING执行入场，EXITING执行退场
      if (nextStatus === ENTERING) {
        this.performEnter(node!, mounting)
      } else {
        this.performExit(node!)
      }
    } else if (this.props.unmountOnExit && this.state.status === EXITED) {
      this.setState({ status: UNMOUNTED })
    }
  }

  // 其中performEnter函数为：
  // 执行onEnter回调函数 --> 设置{ status: ENTERING } 
  // --> 执行onEntering回调函数 
  // --> 监听onTransitionEnd过渡动画是否完成 --> 设置{ status: ENTERED } 
  // --> 执行onEntered回调函数
  performEnter(node:any, mounting:boolean) {
    const { enter } = this.props
    //  挂载阶段：如果in = true && appear = true，则appearing = true
    const appearing = this.context ? this.context.isMounting : mounting

    const timeouts = this.getTimeouts()
    const enterTimeout:number = appearing ? timeouts.appear : timeouts.enter
    // no enter animation skip right to ENTERED
    // if we are mounting and running this it means appear _must_ be set
    if ((!mounting && !enter) || config.disabled) {
      this.safeSetState({ status: ENTERED }, () => {
        this.props.onEntered(node!, false)
      })
      return
    }

    this.props.onEnter(node, appearing)

    // 改变{ status: ENTERING }，改变之后执行一次回调函数
    this.safeSetState({ status: ENTERING }, () => {
      // 将状态设置为ENTERING之后，开始执行过渡动画
      this.props.onEntering(node, appearing)

      // timeouts.enter为入场enter的持续时间
      // 过渡动画结束，设置{ status: ENTERED }，执行onEntered回调函数
      this.onTransitionEnd(node, enterTimeout, () => {
        this.safeSetState({ status: ENTERED }, () => {
          this.props.onEntered(node, appearing)
        })
      })
    })
  }

  performExit(node:any) {
    const { exit } = this.props
    const timeouts = this.getTimeouts()

    // no exit animation skip right to EXITED
    if (!exit || config.disabled) {
      this.safeSetState({ status: EXITED }, () => {
        this.props.onExited(node, false)
      })
      return
    }
    this.props.onExit(node, false)

    this.safeSetState({ status: EXITING }, () => {
      this.props.onExiting(node, false)

      this.onTransitionEnd(node, timeouts.exit, () => {
        this.safeSetState({ status: EXITED }, () => {
          this.props.onExited(node, false)
        })
      })
    })
  }

  cancelNextCallback() {
    if (this.nextCallback !== null) {
      this.nextCallback.cancel()
      this.nextCallback = null
    }
  }

  safeSetState(nextState:any, callback:any) {
    // This shouldn't be necessary, but there are weird race conditions with
    // setState callbacks and unmounting in testing, so always make sure that
    // we can cancel any pending setState callbacks after we unmount.
    callback = this.setNextCallback(callback)
    this.setState(nextState, callback)
  }

  setNextCallback(callback:any) {
    let active = true

    this.nextCallback = (event:any) => {
      if (active) {
        active = false
        this.nextCallback = null

        callback(event)
      }
    }

    this.nextCallback.cancel = () => {
      active = false
    }

    return this.nextCallback
  }

  onTransitionEnd(node:any, timeout:number, handler:() => void) {
    const nextCallback = this.setNextCallback(handler)
    const doesNotHaveTimeoutOrListener =
      timeout == null && !this.props.addEndListener
    if (!node || doesNotHaveTimeoutOrListener) {
      setTimeout(nextCallback, 0)
      return
    }

    if (this.props.addEndListener) {
      this.props.addEndListener(node, nextCallback)
    }

    if (timeout != null) {
      setTimeout(nextCallback, timeout)
    }
  }
  render() {
    const status = this.state.status
    if (status === UNMOUNTED) {
      return null
    }

    const { children, ...childProps } = this.props
    // filter props for Transtition
    delete childProps.in
    delete childProps.mountOnEnter
    delete childProps.unmountOnExit
    delete childProps.appear
    delete childProps.enter
    delete childProps.exit
    delete childProps.timeout
    delete childProps.addEndListener
    delete childProps.onEnter
    delete childProps.onEntering
    delete childProps.onEntered
    delete childProps.onExit
    delete childProps.onExiting
    delete childProps.onExited

    if (typeof children === 'function') {
      // allows for nested Transitions
      return (
        <TransitionGroupContext.Provider value={null}>
          {children(status, childProps)}
        </TransitionGroupContext.Provider>
      )
    }

    const child = React.Children.only(children)
    return (
      // allows for nested Transitions
      <TransitionGroupContext.Provider value={null}>
        {React.cloneElement(child, childProps)}
      </TransitionGroupContext.Provider>
    )
  }
}

export default Transition
