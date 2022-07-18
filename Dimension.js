const AggregationFunction = require('./AggregationFunction')

module.exports = class Dimension {
    constructor(sub,pred,obj){
        this.sub = sub;
        this.pred = pred ?? 'a';
        this.obj = obj;
    }
    setSubject(sub) { this.sub = sub }
    setPredicate(pred) { this.pred = pred }
    setObject(obj) { this.obj = obj }
    hasHierarchies = []
  }
  