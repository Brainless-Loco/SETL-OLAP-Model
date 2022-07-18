module.exports = class LevelAttribute{
    constructor(sub,pred,obj){
        this.sub = sub;
        this.pred = pred;
        this.obj = obj;
    }
    label = [
        (
            type,
            labelValue,
            language
        )
    ]
}