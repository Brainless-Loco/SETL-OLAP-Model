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
    // const dimensionFact = new DimensionFactory(null,cuFact.cube);

    //console.log(cuFact.cube)

    if(isCuboid) {
        await extractLevel(cuFact.cube)
        //console.log(cuFact.cube)
    } else {
        // Do stuff for dimension
        const dimFact = new DimensionFactory(null,cuFact.cube)
        console.log("Got a Cube: "+cuFact)
    }
}

const extractLevel = async (cuboid) => {
    const lvlFact = new LevelFactory(null, cuboid.sub)
    await lvlFact.getCuboidLevel()
    lvlFact.extractData()
}

main()