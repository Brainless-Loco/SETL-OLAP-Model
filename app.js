const CubeFactory = require('./CubeFactory')
const DatasetFactory = require('./DatasetFactory')

const main = async () => {
    const dsFact = new DatasetFactory()
    await dsFact.extractEndpointDataset(null)
    dsFact.extractDataset()
    
    // To be able to use the dataset array here
    console.log(dsFact.getDatasetArray())

    // Extract cube, level, heirarchy etc
    dsFact.getDatasetArray().forEach(dataset => {
        const cuFact = new CubeFactory(null, dataset)
        cuFact.extractOlapDatasetCube().then(() => {
            cuFact.extractData()
        })
    });
    

    
} 

main()