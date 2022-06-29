class Level {
    constructor(title, parentLevel, childLevel){
        this.title = title;
        this.parentLevel = parentLevel;
        this.childLevel = childLevel;
    }
    inHierarchy = null;
    hasAttribute = [];
    measure;
  }
  