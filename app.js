const DatasetFactory = require('./DatasetFactory')

const fact = new DatasetFactory()
fact.extractEndpointDataset(null)
console.log(fact.getDatasetArray())
// To be able to use the dataset array here