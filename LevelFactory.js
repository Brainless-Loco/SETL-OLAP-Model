const { QueryEngine } = require("@comunica/query-sparql")
const Level = require("./Level")

module.exports = class LevelFactory {
    constructor(source) {
        this.source = source ?? "https://firebasestorage.googleapis.com/v0/b/serveturtle.appspot.com/o/rdfsource%2FPopulationByResAdm5LivposTargetTBox-1.ttl?alt=media&token=357a68b4-52fe-40f9-84fc-931f4d980589"
        this.resultSet = []
        this.levelArray = []
        this.isCuboid = false
    }

    
    async fetchCuboidLevel(cuboid) {
        this.isCuboid = true
        const sparql = "PREFIX qb:	<http://purl.org/linked-data/cube#>\r\n"
        + "PREFIX	owl:	<http://www.w3.org/2002/07/owl#>\r\n"
        + "PREFIX	qb4o:	<http://purl.org/qb4olap/cubes#>\r\n"
        + `SELECT DISTINCT ?o WHERE { <${cuboid.sub}> a qb:DataStructureDefinition.\n`
        + `<${cuboid.sub}> qb:component ?s.\n`
        + "?s qb4o:level ?o.\n"
        + "}"
        
        await this.executeQuery(sparql)
    }
    
    async executeQuery(sparql) {
        const mEngine = new QueryEngine()
        const resStream = await mEngine.queryBindings(sparql, { source: this.source })
        const result = await resStream.toArray()
        this.resultSet = result
    }

    async fetchHierarchyStepLevels(hierarchy) {
        const sparql = "PREFIX qb:	<http://purl.org/linked-data/cube#>\r\n"
        + "PREFIX	owl:	<http://www.w3.org/2002/07/owl#>\r\n"
        + "PREFIX	rdfs:	<http://www.w3.org/2000/01/rdf-schema#>\r\n"
        + "PREFIX	qb4o:	<http://purl.org/qb4olap/cubes#>\r\n"
        + "SELECT * " + "WHERE {"
        + "?step a qb4o:HierarchyStep. \n"
        + "?step qb4o:inHierarchy <" + hierarchy.sub + ">. \n"
        + "?step qb4o:parentLevel ?parent. \n"
        + "?step qb4o:childLevel ?child. \n"
        + "}"

        await this.executeQuery(sparql)
    }
    
    extractData() {
        this.resultSet.forEach(item => {
            if(this.isCuboid)
                this.levelArray.push(new Level(item.get('o').value, null, null))
            else this.levelArray.push(new Level(item.get('child').value, null, item.get('parent').value))
        })
    }
    
    getLevelArray() {
        return this.levelArray
    }

    setCubeName(cubeName) { this.cubeName = cubeName }
}