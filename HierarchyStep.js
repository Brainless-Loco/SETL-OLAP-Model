class HierarchyStep {
    constructor(sub,pred,obj,inHierarchy,childLevel, parentLevel) {
        this.sub = sub;
        this.pred = pred;
        this.obj = obj; 
        this.inHierarchy = inHierarchy; //tuple of (inHierarchyDefinition,inHierarchySub)
        this.childLevel = childLevel; //tuple of (childLevelDefinition,ChildLevelSub)
        this.parentLevel = parentLevel; //tuple of (parentLevelDefinition,parentLevelSub)
    }
}
  