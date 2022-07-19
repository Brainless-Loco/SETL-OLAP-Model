const Cube = require("./Cube")

module.exports = class Dataset {
    
    constructor(iri, schemaIri){
      this.iri = iri
      this.schemaIri = schemaIri
      this.name = ''
      this.prefix = ''
      this.cube = new Cube()
    }

    setIri(iri) { this.iri = iri }
    setSchemaIri(schemaIri) { this.schemaIri = schemaIri }
    extractName(iri) {
        const arr = iri.split('#')
        this.name = arr[1]
        this.prefix = arr[0]
    }

    setCube(cube) { this.cube = cube }
}
    
  