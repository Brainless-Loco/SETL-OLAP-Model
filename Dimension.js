const AggregationFunction = require('./AggregationFunction')

module.exports = class Dimension {
    constructor(sub,pred,obj){
        this.sub = sub;
        this.pred = pred;
        this.obj = obj;
    }
    setSubject(sub) { this.sub = sub }
    setPredicate(pred) { this.pred = pred }
    setObject(obj) { this.obj = obj }
    extractName(sub) {
        const arr = iri.split('#')
        this.name = arr[1]
        this.prefix = arr[0]
    }
    hasHierarchiesType;
    hasHierarchies = [
        // (
        //     type,
        //     ids = []
        // )
    ]; //array of arrayS of <hasHierarchyType (eg: qb4o:hasHierarchy ), HierarchyId(s)>
    ///aggregationFunction = new AggregationFunction;
  }
  