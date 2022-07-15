module.exports = class Dataset {
    
    constructor(sub,pred,obj,structure){
      this.sub = sub;
      this.pred = pred;
      this.obj = obj;
      this.structure = structure
    }
    hasCubes = [
        /*(
            type,
            ids = []
        )*/
    ] //array of tupels<hasCubeType, array of cubeId(s)>
}
    
  