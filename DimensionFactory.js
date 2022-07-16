const Dimension = require('./Dimension')
const QueryEngine = require('@comunica/query-sparql').QueryEngine

module.exports = class CubeFactory {
    constructor(source, dataset) {
        this.source = source ?? "https://firebasestorage.googleapis.com/v0/b/serveturtle.appspot.com/o/rdfsource%2FPopulationByResAdm5LivposTargetTBox-1.ttl?alt=media&token=357a68b4-52fe-40f9-84fc-931f4d980589"
        this.dataset = dataset ?? new Dataset()
        this.resultSet = []
    }

    // Extract cube from the tbox of a dataset, no endpoints by default
    async extractOlapDatasetCube(endPoint) {
        // Case 1: No remote endpoint
        if(!Boolean(endPoint)) {
            this.resultSet = await this.getDefaultResultSet()
        }
        // TODO Case 2: Has remote endpoint (CubeFactory)
    }

    // Extract data here
    extractData() {
        // Extract data from the result set accordingly
        this.resultSet.forEach(item => {
            //console.log(item.toString())
        })
    }

    async getDefaultResultSet() {
        const sparql = "PREFIX qb:	<http://purl.org/linked-data/cube#>\r\n"
        + "PREFIX	owl:	<http://www.w3.org/2002/07/owl#>\r\n"
        + "PREFIX	qb4o:	<http://purl.org/qb4olap/cubes#>\r\n"
        + `SELECT * WHERE { <${this.dataset.iri}> a qb:DataSet.\n`
        + `<${this.dataset.iri}> qb:structure ?cube.\n`
        + "?cube a qb:DataStructureDefinition.\n"
        + "?cube ?pred ?obj.\n"
        + "}"

        const mEngine = new QueryEngine()
        const resStream = await mEngine.queryBindings(sparql, {source: this.source})
        const result = await resStream.toArray()
        console.log(result)
        return result
    }
}