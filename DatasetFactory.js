const QueryEngine = require('@comunica/query-sparql').QueryEngine
const fs = require('fs')

module.exports = class DatasetFactory {
    constructor(source) {
        this.source = source ?? "https://firebasestorage.googleapis.com/v0/b/serveturtle.appspot.com/o/rdfsource%2FPopulationByResAdm5LivposTargetTBox-1.ttl?alt=media&token=357a68b4-52fe-40f9-84fc-931f4d980589"
    }
    extractEndpointDataset(endPoint) {
        // Case 1: No remote endpoint
        if(!Boolean(endPoint)) {
            const queryResult = this.getDefaultResultSet()
        }
        // TODO Case 2: Has remote endpoint
    }
    
    // Gets result set for no endpoint queries
    async getDefaultResultSet() {
        const sparql = "PREFIX qb:	<http://purl.org/linked-data/cube#>\r\n"
        + "PREFIX	owl:	<http://www.w3.org/2002/07/owl#>\r\n"
        + "PREFIX	qb4o:	<http://purl.org/qb4olap/cubes#>\r\n"
        + "SELECT * WHERE { ?s a qb:DataSet; ?p ?o.\r\n"
        + "?s qb:structure ?x.\r\n}"
    
        const mEngine = new QueryEngine()
        const resStream = await mEngine.queryBindings(sparql, {sources: [this.source]})
        
        resStream.on('data', hash => {
            console.log("Getting dataset", hash.toString())
            const dataset = hash["s"]
            const cube = hash["x"]

            this.getObservation(dataset, mEngine)
            // Make an array of Dataset class instance
            // Push into the array the hash object from this function
            // Notify the client app
        })
    }

    async getObservation(dataset, mEngine) {
        const sparql = "PREFIX qb:	<http://purl.org/linked-data/cube#>\r\n"
        + "PREFIX	owl:	<http://www.w3.org/2002/07/owl#>\r\n"
        + "PREFIX	qb4o:	<http://purl.org/qb4olap/cubes#>\r\n"
        + "SELECT (count(?o) AS ?numobs) WHERE { ?o a qb:Observation.}"

        const resStream = await mEngine.queryBindings(sparql, {source: this.source})
        resStream.on('data', hash => {
            console.log("Getting observations", hash.toString())
        })
    }
}