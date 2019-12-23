const classnames = (o: any): string => Object.keys(o).filter(i => o[i]).join(' ')

export default classnames
