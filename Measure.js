module.exports = class Measure{
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
    range = (type, rangeValue);
}