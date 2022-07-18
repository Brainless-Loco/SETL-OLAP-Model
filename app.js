const CubeFactory = require('./CubeFactory')
const DatasetFactory = require('./DatasetFactory')
const LevelFactory = require('./LevelFactory')

const main = async () => {
    const dsFact = new DatasetFactory()
    await dsFact.extractEndpointDataset(null)
    dsFact.extractDataset()
    
    // To be able to use the dataset array here
    console.log(dsFact.getDatasetArray())

    // Extract cube, level, heirarchy etc
    dsFact.getDatasetArray().forEach(extractCube);
    

    
}

const extractCube = async (dataset) => {
    const cuFact = new CubeFactory(null, dataset)
    await cuFact.extractOlapDatasetCube()
    const isCuboid = cuFact.extractData()

    console.log(cuFact.cube)

    if(isCuboid) {
        await extractLevel(cuFact.cube)
    } else {
        // Do stuff for dimension
        // await extractDimension(cuFact.cube)
    }
}

const extractLevel = async (cuboid) => {
    const lvlFact = new LevelFactory(null, cuboid.sub)
    await lvlFact.getCuboidLevel()
    lvlFact.extractData()

    console.log(lvlFact.getLevelArray())
}

main()