import addOneClass from 'dom-helpers/addClass';

import removeOneClass from 'dom-helpers/removeClass';
import React from 'react';

import Transition from './Transition';

const addClass = (node:any, classes:string) => node && classes && classes.split(' ').forEach((c:string) => addOneClass(node, c));
const removeClass = (node:any, classes:string) => node && classes && classes.split(' ').forEach((c:string) => removeOneClass(node, c));

/**
 * A transition component inspired by the excellent
 * [ng-animate](http://www.nganimate.org/) library, you should use it if you're
 * using CSS transitions or animations. It's built upon the
 * [`Transition`](https://reactcommunity.org/react-transition-group/transition)
 * component, so it inherits all of its props.
 *
 * `CSSTransition` applies a pair of class names during the `appear`, `enter`,
 * and `exit` states of the transition. The first class is applied and then a
 * second `*-active` class in order to activate the CSS transition. After the
 * transition, matching `*-done` class names are applied to persist the
 * transition state.
 *
 * ```jsx
 * function App() {
 *   const [inProp, setInProp] = useState(false);
 *   return (
 *     <div>
 *       <CSSTransition in={inProp} timeout={200} classNames="my-node">
 *         <div>
 *           {"I'll receive my-node-* classes"}
 *         </div>
 *       </CSSTransition>
 *       <button type="button" onClick={() => setInProp(true)}>
 *         Click to Enter
 *       </button>
 *     </div>
 *   );
 * }
 * ```
 *
 * When the `in` prop is set to `true`, the child component will first receive
 * the class `example-enter`, then the `example-enter-active` will be added in
 * the next tick. `CSSTransition` [forces a
 * reflow](https://github.com/reactjs/react-transition-group/blob/5007303e729a74be66a21c3e2205e4916821524b/src/CSSTransition.js#L208-L215)
 * between before adding the `example-enter-active`. This is an important trick
 * because it allows us to transition between `example-enter` and
 * `example-enter-active` even though they were added immediately one after
 * another. Most notably, this is what makes it possible for us to animate
 * _appearance_.
 *
 * ```css
 * .my-node-enter {
 *   opacity: 0;
 * }
 * .my-node-enter-active {
 *   opacity: 1;
 *   transition: opacity 200ms;
 * }
 * .my-node-exit {
 *   opacity: 1;
 * }
 * .my-node-exit-active {
 *   opacity: 0;
 *   transition: opacity 200ms;
 * }
 * ```
 *
 * `*-active` classes represent which styles you want to animate **to**.
 *
 * **Note**: If you're using the
 * [`appear`](http://reactcommunity.org/react-transition-group/transition#Transition-prop-appear)
 * prop, make sure to define styles for `.appear-*` classes as well.
 */

// type Partial<T> = {[P in keyof T]?: T[P]};

const defaultProps = {
  classNames: '',
  in: false,
  timeout: {
    appear: 500,
    enter: 500,
    exit: 500
  }
}

interface timeout {
  appear:number
  enter:number
  exit:number
}

interface IP {
  in:boolean
  classNames: any
  timeout: number | timeout
  children:React.ReactNode
}

class CSSTransition extends React.Component<IP> {
  static defaultProps = defaultProps;

  appliedClasses:any = {
    appear: {},
    enter: {},
    exit: {},
  }

  onEnter = (node:any, appearing:boolean) => {
    this.removeClasses(node, 'exit');
    this.addClass(node, appearing ? 'appear' : 'enter', 'base');
    console.log('------onEnter------')
  }

  onEntering = (node:any, appearing:boolean) => {
    const type = appearing ? 'appear' : 'enter';
    this.addClass(node, type, 'active')
    console.log('------onEntering------')
  }

  onEntered = (node:any, appearing:boolean) => {
    const type = appearing ? 'appear' : 'enter'
    this.removeClasses(node, type);
    this.addClass(node, type, 'done');
    console.log('------onEntered------')
  }

  onExit = (node:any) => {
    this.removeClasses(node, 'appear');
    this.removeClasses(node, 'enter');
    this.addClass(node, 'exit', 'base')
    console.log('------onExit------')
  }

  onExiting = (node:any) => {
    this.addClass(node, 'exit', 'active')
    console.log('------onExiting------')
  }

  onExited = (node:any) => {
    this.removeClasses(node, 'exit');
    this.addClass(node, 'exit', 'done');
    console.log('------onExited------')
  }

  getClassNames = (type:string) => {
    const { classNames } = this.props;
    const isStringClassNames = typeof classNames === 'string';
    const prefix = isStringClassNames && classNames
      ? `${classNames}-`
      : '';

    let baseClassName = isStringClassNames
      ? `${prefix}${type}`
      : classNames[type]

    let activeClassName = isStringClassNames
      ? `${baseClassName}-active`
      : classNames[`${type}Active`];

    let doneClassName = isStringClassNames
      ? `${baseClassName}-done`
      : classNames[`${type}Done`];

    const rs: {
      baseClassName:string
      activeClassName:string
      doneClassName:string
      [protoName: string]: any
    } = {
      baseClassName,
      activeClassName,
      doneClassName
    }
    return rs;
  }

  addClass(node:any, type:string, phase:string) {
    let className:string = this.getClassNames(type)[`${phase}ClassName`];

    if (type === 'appear' && phase === 'done') {
      className += ` ${this.getClassNames('enter').doneClassName}`;
    }

    // This is for to force a repaint,
    // which is necessary in order to transition styles when adding a class name.
    if (phase === 'active') {
      /* eslint-disable no-unused-expressions */
      // node && node.scrollTop;
    }

    this.appliedClasses[type][phase] = className
    addClass(node, className)
  }

  removeClasses(node:any, type:string) {
    const {
      base: baseClassName,
      active: activeClassName,
      done: doneClassName
    } = this.appliedClasses[type]

    this.appliedClasses[type] = {};

    if (baseClassName) {
      removeClass(node, baseClassName);
    }
    if (activeClassName) {
      removeClass(node, activeClassName);
    }
    if (doneClassName) {
      removeClass(node, doneClassName);
    }
  }

  render() {
    const { classNames: _, children, ...props } = this.props;
    return (
      <Transition
        {...props}
        children={children}
        onEnter={this.onEnter}
        onEntered={this.onEntered}
        onEntering={this.onEntering}
        onExit={this.onExit}
        onExiting={this.onExiting}
        onExited={this.onExited}
      />
    );
  }
}


export default CSSTransition
