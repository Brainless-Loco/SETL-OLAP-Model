const AggregationFunction = require('./AggregationFunction')

module.exports = class Dimension {
    constructor(sub,pred,obj){
        this.sub = sub;
        this.pred = pred ?? 'a';
        this.obj = obj;
        this.hierarchyList = []
    }
    setSubject(sub) { this.sub = sub }
    setPredicate(pred) { this.pred = pred }
    setObject(obj) { this.obj = obj }

    getHierarchyList() { return this.hierarchyList }
    setHierarchyList(hierarchyList) { this.hierarchyList = hierarchyList }
  }
  