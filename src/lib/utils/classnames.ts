export default (o: any): string => Object.keys(o).filter(i => o[i]).join(' ')
