module.exports = class Cube {
  constructor(sub,pred,obj){
    this.sub = sub;
    this.pred = pred;
    this.obj = obj;
  }

  setSubject(sub) { this.sub = sub }
  setPredicate(pred) { this.pred = pred }
  setObject(obj) { this.obj = obj }
}
  
