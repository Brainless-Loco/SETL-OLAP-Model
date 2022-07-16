const Cube = require('./Cube')
const Dataset = require('./Dataset')
const Dimension = require('./Dimension')
const QueryEngine = require('@comunica/query-sparql').QueryEngine

module.exports = class DimensionFactory {
    constructor(source, cube) {
        this.source = source ?? "https://firebasestorage.googleapis.com/v0/b/serveturtle.appspot.com/o/rdfsource%2FPopulationByResAdm5LivposTargetTBox-1.ttl?alt=media&token=357a68b4-52fe-40f9-84fc-931f4d980589"
        this.cube = cube ?? new Cube()
        this.resultSet = []
        this.dimesion = new Dimension()
    }

    async extractOlapDatasetCube(endPoint) {
        // Case 1: No remote endpoint
        if(!Boolean(endPoint)) {
            this.resultSet = await this.getDefaultResultSet()
        }
        // TODO Case 2: Has remote endpoint (CubeFactory)
    }

    // Extract data here
    extractData() {
        this.resultSet.forEach(item => {

            const sub = item.get('s').value
            ///const pred = item.get('pred').value
            const obj = item.get('o').value

            this.dimesion.setSubject(sub)
            //this.dimesion.setPredicate(pred)
            this.dimesion.setObject(obj)
        })
    }

    async getDefaultResultSet() {
        const sparql = "PREFIX qb:	<http://purl.org/linked-data/cube#>\r\n"
				+ "PREFIX	owl:	<http://www.w3.org/2002/07/owl#>\r\n"
				+ "PREFIX	qb4o:	<http://purl.org/qb4olap/cubes#>\r\n"
				+ "SELECT DISTINCT ?o WHERE { <" + this.cube.sub + "> a qb:DataStructureDefinition.\n"
				+ "<" + this.cube.sub + "> qb:component ?s.\n"
				+ "?s qb4o:dimension ?o.\n"
				+ "}"

        const mEngine = new QueryEngine()
        const resStream = await mEngine.queryBindings(sparql, {source: this.source})
        const result = await resStream.toArray()
        //console.log(result.toString())
        return result
    }
}