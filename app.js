const CubeFactory = require('./CubeFactory')
const DatasetFactory = require('./DatasetFactory')
const DimensionFactory = require('./DimensionFactory')
const LevelFactory = require('./LevelFactory')

const main = async () => {
    const dsFact = new DatasetFactory()
    await dsFact.extractEndpointDataset(null)
    dsFact.extractDataset()
    
    // To be able to use the dataset array here
    ///console.log(dsFact.getDatasetArray())

    // Extract cube, level, heirarchy etc
    dsFact.getDatasetArray().forEach(extractCube);
    
    

    
}

const extractCube = async (dataset) => {
    const cuFact = new CubeFactory(null, dataset)
    await cuFact.extractOlapDatasetCube()
    const isCuboid = cuFact.extractData()
    

    if(isCuboid) {
        await extractLevel(cuFact.cube)
        const dimFact = new DimensionFactory(null,cuFact.cube)
        await dimFact.extractOlapDimension(null)
        dimFact.extractDimension()
        ///console.log(dimFact.getDimensionArray())
    } else {
        // Do stuff for dimension
        const dimFact = new DimensionFactory(null,cuFact.cube)
        await dimFact.extractOlapDimension(null)
        dimFact.extractDimension()
    }
}

const extractLevel = async (cuboid) => {
    const lvlFact = new LevelFactory(null, cuboid.sub)
    await lvlFact.getCuboidLevel()
    lvlFact.extractData()
}

main()