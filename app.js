const Cube = require('./Cube')
const CubeFactory = require('./CubeFactory')
const DatasetFactory = require('./DatasetFactory')
const DimensionFactory = require('./DimensionFactory')
const HeirarchyFactory = require('./HierarchyFactory')
const LevelFactory = require('./LevelFactory')
const fs = require('fs')

const main = async () => {
    const dsFact = new DatasetFactory()
    await dsFact.extractEndpointDataset(null)
    dsFact.extractDataset()
    
    // To be able to use the dataset array here
    //console.log(dsFact.getDatasetArray())

    // Extract cube, level, heirarchy etc
    const datasetList = dsFact.getDatasetArray()
    for(let i = 0 ; i < datasetList.length ; i++) {
        await extractCube(datasetList[i])
    }

    dsFact.getDatasetArray().forEach(dataset => {
        fs.writeFile('output.json', JSON.stringify(dataset), error => {
            if(error) {
                console.error("Error saving file!")
                return
            }
            console.log("Saved file to \"output.json\"")
        })
    });
}

const extractCube = async (dataset) => {
    const cuFact = new CubeFactory(null, dataset)
    await cuFact.extractOlapDatasetCube()
    const isCuboid = cuFact.extractData()
    
    //console.log(cuFact.cube)
    let cube = cuFact.getCube()

    if(isCuboid) {
        cube = new Cube(cuFact.getCube().obj, null, null)
        await extractCuboidLevel(cuFact.cube)
        // const dimFact = new DimensionFactory(null,cuFact.cube)
        // await dimFact.extractOlapDimension(null)
        // dimFact.extractDimension()
        ///console.log(dimFact.getDimensionArray())
    }

    dataset.setCube(cube)

    // Extract dimension from cube
    const dimFact = new DimensionFactory(null, cube)
    await dimFact.extractOlapDimension(null)
    dimFact.extractDimension()
    cube.setDimensionList(dimFact.getDimensionArray())
    //console.log(dimFact.getDimensionArray())

    // Extract Hierarchies from each dimension, extract hierarchy level
    const dimensions = dimFact.getDimensionArray()
    for(let i = 0 ; i < dimensions.length ; i++) {
        await extractHierarchyList(dimensions[i])
        await extractHierarchyStepLevel(dimensions[i].getHierarchyList())
    }

}

const extractCuboidLevel = async (cuboid) => {
    const lvlFact = new LevelFactory(null)
    await lvlFact.fetchCuboidLevel(cuboid)
    lvlFact.extractData()

    //console.log(lvlFact.getLevelArray())
}

const extractHierarchyStepLevel = async (hierarchyList) => {
    for(let i = 0 ; i < hierarchyList.length ; i++) {
        await extractHierarchyStepLevelList(hierarchyList[i])
    }
}

const extractHierarchyStepLevelList = async (hierarchy) => {
    const lvlFact = new LevelFactory(null)
    await lvlFact.fetchHierarchyStepLevels(hierarchy)
    lvlFact.extractData()

    hierarchy.setHierarchyStep(lvlFact.getLevelArray())
}

const extractHierarchyList = async (dimension) => {
    const hierFact = new HeirarchyFactory(null, dimension)
    await hierFact.fetchDimensionHierarchyList()
    hierFact.extractHierarchies()
    dimension.setHierarchyList(hierFact.getHierarchyList())
    //console.log(dimension)
}

main()