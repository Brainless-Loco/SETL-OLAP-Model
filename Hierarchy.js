module.exports = class Hierarchy {
    constructor(sub,pred,obj,inDimension){
        this.sub = sub;
        this.pred = pred;
        this.obj = obj;
        this.inDimension = inDimension;
    }
    setSubject(sub) { this.sub = sub }
    setPredicate(pred) { this.pred = pred }
    setObject(obj) { this.obj = obj }
    setInDimension(inDimension) {this.inDimension = inDimension}
    hasLevels = [
        // (
        //     type,
        //     ids = []
        // )
    ]; ///array of tupels (levelType, [levelValues])
  }
  