const Cube = require('./Cube')
const CubeFactory = require('./CubeFactory')
const DatasetFactory = require('./DatasetFactory')
const DimensionFactory = require('./DimensionFactory')
const HeirarchyFactory = require('./HierarchyFactory')
const LevelFactory = require('./LevelFactory')

const main = async () => {
    const dsFact = new DatasetFactory()
    await dsFact.extractEndpointDataset(null)
    dsFact.extractDataset()
    
    // To be able to use the dataset array here
    //console.log(dsFact.getDatasetArray())

    // Extract cube, level, heirarchy etc
    dsFact.getDatasetArray().forEach(extractCube);
    
    

    
}

const extractCube = async (dataset) => {
    const cuFact = new CubeFactory(null, dataset)
    await cuFact.extractOlapDatasetCube()
    const isCuboid = cuFact.extractData()
    
    //console.log(cuFact.cube)
    

    if(isCuboid) {
        await extractLevel(cuFact.cube)
        // const dimFact = new DimensionFactory(null,cuFact.cube)
        // await dimFact.extractOlapDimension(null)
        // dimFact.extractDimension()
        ///console.log(dimFact.getDimensionArray())
    }

    // Extract dimension from cube
    const dimFact = new DimensionFactory(null, new Cube(cuFact.cube.obj, null, null))
    await dimFact.extractOlapDimension(null)
    dimFact.extractDimension()
    //console.log(dimFact.getDimensionArray())

    // Extract Hierarchies
    const hierFact = new HeirarchyFactory(null, dimFact.getDimensionArray())
    await hierFact.fetchCubeHierarchies()
    console.log(hierFact.getHierarchySet())

}

const extractLevel = async (cuboid) => {
    const lvlFact = new LevelFactory(null, cuboid.sub)
    await lvlFact.getCuboidLevel()
    lvlFact.extractData()

    //console.log(lvlFact.getLevelArray())
}

main()