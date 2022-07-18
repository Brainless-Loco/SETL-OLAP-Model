const Cube = require('./Cube')
const Dataset = require('./Dataset')
const Dimension = require('./Dimension')
const QueryEngine = require('@comunica/query-sparql').QueryEngine

module.exports = class DimensionFactory {
    constructor(source, cube,isCuboid) {
        this.source = source ?? "https://firebasestorage.googleapis.com/v0/b/serveturtle.appspot.com/o/rdfsource%2FPopulationByResAdm5LivposTargetTBox-1.ttl?alt=media&token=357a68b4-52fe-40f9-84fc-931f4d980589"
        this.cube = cube ?? new Cube()
        this.resultSet = []
        this.dimension = new Dimension()
        this.isCuboid = isCuboid
    }

    async extractOlapDimension(endPoint) {
        // Case 1: No remote endpoint
        if(!Boolean(endPoint)) {
            this.resultSet = await this.getDefaultResultSet()
        }
        // TODO Case 2: Has remote endpoint (CubeFactory)
    }

    // Extract data here
    extractDimension() {
        let tempSet = []
        this.resultSet.forEach(item => {
            const sub = item.get('o').value
            const obj = "http://purl.org/qb4olap/cubes#dimension"
            this.dimension.setSubject(sub)
            this.dimension.setObject(obj)
            tempSet.push(this.dimension)
        })
        this.resultSet = tempSet
        console.log(this.resultSet)
    }

    async getDefaultResultSet() {
        let cubeOrCuboid = this.isCuboid ? this.cube.sub : this.cube.obj
        const sparql = "PREFIX qb:	<http://purl.org/linked-data/cube#>\r\n"
				+ "PREFIX	owl:	<http://www.w3.org/2002/07/owl#>\r\n"
				+ "PREFIX	qb4o:	<http://purl.org/qb4olap/cubes#>\r\n"
				+ "SELECT DISTINCT ?o WHERE { <" + cubeOrCuboid + "> a qb:DataStructureDefinition.\n"
				+ "<" + cubeOrCuboid + "> qb:component ?s.\n"
				+ "?s qb4o:dimension ?o.\n"
				+ "}"

        const mEngine = new QueryEngine()
        const resStream = await mEngine.queryBindings(sparql, {source: this.source})
        const result = await resStream.toArray()
        return result
    }
    getDimensionArray = () => {return this.resultSet}
}