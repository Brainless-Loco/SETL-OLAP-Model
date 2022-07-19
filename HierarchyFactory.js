const { QueryEngine } = require("@comunica/query-sparql")
const Dimension = require("./Dimension")
const Hierarchy = require('./Hierarchy')

module.exports = class HeirarchyFactory {
    constructor(source, dimension) {
        this.source = source ?? "https://firebasestorage.googleapis.com/v0/b/serveturtle.appspot.com/o/rdfsource%2FPopulationByResAdm5LivposTargetTBox-1.ttl?alt=media&token=357a68b4-52fe-40f9-84fc-931f4d980589"
        this.dimension = dimension ?? new Dimension()
        this.resultSet = []
        this.hierarchyList = []
    }

    async fetchDimensionHierarchyList() {
        const mEngine = new QueryEngine()
        const sparql = "PREFIX qb:	<http://purl.org/linked-data/cube#>\r\n"
            + "PREFIX	owl:	<http://www.w3.org/2002/07/owl#>\r\n"
            + "PREFIX	qb4o:	<http://purl.org/qb4olap/cubes#>\r\n"
            + "SELECT ?x " + "WHERE { <" + this.dimension.sub + "> a qb:DimensionProperty."
            + "<" + this.dimension.sub + "> qb4o:hasHierarchy ?x.}"

        const resStream = await mEngine.queryBindings(sparql, {source: this.source})
        this.resultSet = await resStream.toArray()
        return this.resultSet
    }
    
    extractHierarchies() {
        const obj = "http://purl.org/qb4olap/cubes#Hierarchy"
        this.resultSet.forEach(item => {
            const sub = item.get('x').value
            this.hierarchyList.push(new Hierarchy(sub, 'a', obj))
        })
    }
    
    getHierarchyList = () => { return this.hierarchyList }
}