const { QueryEngine } = require("@comunica/query-sparql")
const Hierarchy = require('./Hierarchy')

module.exports = class HeirarchyFactory {
    constructor(source, dimensions) {
        this.source = source ?? "https://firebasestorage.googleapis.com/v0/b/serveturtle.appspot.com/o/rdfsource%2FPopulationByResAdm5LivposTargetTBox-1.ttl?alt=media&token=357a68b4-52fe-40f9-84fc-931f4d980589"
        this.dimensions = dimensions ?? []
        this.resultSet = []
        this.heirarchies = []
    }

    async fetchCubeHierarchies() {
        const context = this
        const obj = "http://purl.org/qb4olap/cubes#Hierarchy"

        this.dimensions.forEach(dimension => {
            let tempHierarchies = this.fetchHierarchyFromDimension(dimension, context)
            let i = 0 
            return tempHierarchies.then((arrayOfHierarchy)=>{
                let temp = []
                arrayOfHierarchy.forEach( (item)=>{
                    let tempHierarchy = new Hierarchy()
                    let sub = item.get('x').value
                    tempHierarchy.setSubject(sub)
                    tempHierarchy.setObject(obj)
                    tempHierarchy.setInDimension(dimension)
                    temp.push(tempHierarchy)
                } )
                console.log(temp)
            })
        });
    }
    
    async fetchHierarchyFromDimension(dimension, context) {
        const mEngine = new QueryEngine()
        const sparql = "PREFIX qb:	<http://purl.org/linked-data/cube#>\r\n"
            + "PREFIX	owl:	<http://www.w3.org/2002/07/owl#>\r\n"
            + "PREFIX	qb4o:	<http://purl.org/qb4olap/cubes#>\r\n"
            + "SELECT ?x " + "WHERE { <" + dimension.sub + "> a qb:DimensionProperty."
            + "<" + dimension.sub + "> qb4o:hasHierarchy ?x.}"

        const resStream = await mEngine.queryBindings(sparql, {source: context.source})
        const result = await resStream.toArray()
        return result
        //console.log(result.toString())
    }
    getHierarchySet = ()=>{return this.resultSet}
}