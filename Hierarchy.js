class Hierarchy {
    constructor(sub,pred,obj,inDimensionType,inDimension){
        this.sub = sub;
        this.pred = pred;
        this.obj = obj;
        this.inDimensionType = inDimensionType;
        this.inDimension = inDimension;
    }
    hasLevels = [
        (
            type,
            ids = []
        )
    ]; ///array of tupels (levelType, [levelValues])
  }
  