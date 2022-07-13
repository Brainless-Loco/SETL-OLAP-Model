class Dimension {
    constructor(sub,pred,obj){
        this.sub = sub;
        this.pred = pred;
        this.obj = obj;
    }
    hasHierarchiesType;
    hasHierarchies = [
        (
            type,
            ids = []
        )
    ]; //array of arrayS of <hasHierarchyType (eg: qb4o:hasHierarchy ), HierarchyId(s)>
    aggregationFunction = new AggregationFunction;
  }
  