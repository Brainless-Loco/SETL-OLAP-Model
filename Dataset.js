module.exports = class Dataset {
    
    constructor(iri, schemaIri){
      this.iri = iri
      this.schemaIri = schemaIri
      this.name = ''
      this.prefix = ''
    }

    setIri(iri) { this.iri = iri }
    setSchemaIri(schemaIri) { this.schemaIri = schemaIri }
    extractName(iri) {
        const arr = iri.split('#')
        this.name = arr[1]
        this.prefix = arr[0]
    }
}
    
  