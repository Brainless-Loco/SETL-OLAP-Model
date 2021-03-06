const Dataset = require('./Dataset')
const QueryEngine = require('@comunica/query-sparql').QueryEngine
const fs = require('fs')

module.exports = class DatasetFactory {

    constructor(source, datasetArr) {
        this.source = source ?? "https://firebasestorage.googleapis.com/v0/b/serveturtle.appspot.com/o/rdfsource%2FPopulationByResAdm5LivposTargetTBox-1.ttl?alt=media&token=357a68b4-52fe-40f9-84fc-931f4d980589"
        this.datasetArr = datasetArr ?? []
        this.resultSet = []
    }

    extractDataset() {
        const tempDataset = new Dataset()
        this.resultSet.forEach((hash, idx) => {
            // const sub = hash.get('s').value
            // const structType = hash.get('p').value
            // const obj = hash.get('o').value
            // const structureId = hash.get('x').value
            // this.getObservation(dataset, mEngine) 

            if(idx & 1) tempDataset.setSchemaIri(hash.get('o').value)
            else tempDataset.setIri(hash.get('s').value)
            
            if(idx & 1) {
                tempDataset.extractName(tempDataset.iri)
                this.datasetArr.push(tempDataset)
            }
            

            // Make an array of Dataset class instance
            // Push into the array the hash object from this function
            // Notify the client app
        })
    }
    
    async extractEndpointDataset(endPoint) {
        // Case 1: No remote endpoint
        if(!Boolean(endPoint)) {
            this.resultSet = await this.getDefaultResultSet()
            
        }
        // TODO Case 2: Has remote endpoint (DatasetFactory)
    }
    
    // Gets result set for no endpoint queries
    async getDefaultResultSet() {
        const sparql = "PREFIX qb:	<http://purl.org/linked-data/cube#>\r\n"
        + "PREFIX	owl:	<http://www.w3.org/2002/07/owl#>\r\n"
        + "PREFIX	qb4o:	<http://purl.org/qb4olap/cubes#>\r\n"
        + "SELECT * WHERE { ?s a qb:DataSet; ?p ?o.\r\n"
        + "?s qb:structure ?x.\r\n}"
    
        const mEngine = new QueryEngine()
        const resStream = await mEngine.queryBindings(sparql, {source: this.source})
        //console.log(resStream)
        const result = await resStream.toArray()
        return result
    }

    async getObservation(dataset, mEngine) {
        const sparql = "PREFIX qb:	<http://purl.org/linked-data/cube#>\r\n"
        + "PREFIX	owl:	<http://www.w3.org/2002/07/owl#>\r\n"
        + "PREFIX	qb4o:	<http://purl.org/qb4olap/cubes#>\r\n"
        + "SELECT (count(?o) AS ?numobs) WHERE { ?o a qb:Observation.}"

        const resStream = await mEngine.queryBindings(sparql, {source: this.source})
        resStream.on('data', hash => {
            ///console.log("Getting observations", hash.toString())
            const ob =hash.get('numobs').value
            //console.log(ob)
        })
    }
    getDatasetArray = () => {return this.datasetArr}
}