const DatasetFactory = require('./DatasetFactory')

const main = async () => {
    const fact = new DatasetFactory()
    await fact.extractEndpointDataset(null)
    fact.extractDataset()
    // To be able to use the dataset array here
    console.log(fact.getDatasetArray())
} 

main()