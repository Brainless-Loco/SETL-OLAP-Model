module.exports = class Hierarchy {
    constructor(sub,pred,obj,inDimension){
        this.sub = sub;
        this.pred = pred;
        this.obj = obj;
        this.hierarchyStep = []
    }
    setSubject(sub) { this.sub = sub }
    setPredicate(pred) { this.pred = pred }
    setObject(obj) { this.obj = obj }
    setHierarchyStep(hierarchyStep) {this.hierarchyStep = hierarchyStep}
  }
  