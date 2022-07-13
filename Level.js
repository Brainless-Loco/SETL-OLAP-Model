class Level {
    constructor(sub,pred,obj){
        this.sub = sub;
        this.pred = pred;
        this.obj = obj;
    }
    hasAttributes  = [
        (
            type,
            ids = []
        )
    ]; ///array of tuples(hasAttributeType, [values])
    label = [
        (
            type,
            labelValue,
            language
        )
    ]
  }
  