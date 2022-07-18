const { QueryEngine } = require("@comunica/query-sparql")
const Level = require("./Level")

module.exports = class LevelFactory {
    constructor(source, cuboidName) {
        this.source = source ?? "https://firebasestorage.googleapis.com/v0/b/serveturtle.appspot.com/o/rdfsource%2FPopulationByResAdm5LivposTargetTBox-1.ttl?alt=media&token=357a68b4-52fe-40f9-84fc-931f4d980589"
        this.cuboidName = cuboidName ?? ''
        this.resultSet = []
        this.levelArray = []
    }

    setCubeName(cubeName) { this.cubeName = cubeName }

    async getCuboidLevel() {
        const sparql = "PREFIX qb:	<http://purl.org/linked-data/cube#>\r\n"
        + "PREFIX	owl:	<http://www.w3.org/2002/07/owl#>\r\n"
        + "PREFIX	qb4o:	<http://purl.org/qb4olap/cubes#>\r\n"
        + `SELECT DISTINCT ?o WHERE { <${this.cuboidName}> a qb:DataStructureDefinition.\n`
        + `<${this.cuboidName}> qb:component ?s.\n`
        + "?s qb4o:level ?o.\n"
        + "}"

        const mEngine = new QueryEngine()
        const resStream = await mEngine.queryBindings(sparql, {source: this.source})
        const result = await resStream.toArray()
        this.resultSet = result
    }

    extractData() {
        this.resultSet.forEach(item => {
            this.levelArray.push(new Level(null, null, item.get('o').value))
        })
    }

    getLevelArray() {
        return this.levelArray
    }
}