
var region_name = "reg_10"
var collection = "3"
var anio = "2000"

var version_samples_in = '1'
var version_class_out = '1'   // Version that will be saved
var stage = 'step_03-class'

var nSamplesMin = 350;
var nSamplesMax = 700;

var percent_03 = 24
//var percent_04 = 5
var percent_09 = 4
var percent_11 = 6
var percent_12 = 6
var percent_15 = 20
var percent_19 = 20
//var percent_21 = 5
var percent_22 = 2
var percent_33 = 4
//var percent_36 = 4

var year_list =   [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 
                   2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021,2022]
                   

//nTrees padrao: 100
var nTrees = 100;
var variablesPerSplit = 4 //mtry
var minLeafPopulation = 25  //Nnodes
var seed = 1
var colors = [
              "006400",//3
              //"32cd32",//4
              "935132",//9
              "45c2a5",//11
              "b8af4f",//12
              "ffd966",//15
              "d5a6bd",//19
              //"#ffefc3",//21
              "EA9999",//22
              "0000ff",//33
              "dd497f",//48
              "842b4c",//65
              ];

//************************************
//Do not change bellow this point

var regions = ee.FeatureCollection("projects/mapbiomas_af_trinacional/ANCILLARY_DATA/VECTOR/Regiones_AR-PY_col3");
var myRegion = regions.filterMetadata('Reg_id', 'equals', region_name)
Map.addLayer(myRegion, null, "Region")

var dirasset = 'projects/nexgenmap/MapBiomas2/LANDSAT/ATLANTICFOREST/mosaics';
var dirasset7 = 'projects/nexgenmap/MapBiomas2/LANDSAT/ATLANTICFOREST/mosaics-landsat-7';
var dir_Samples = 'projects/mapbiomas_af_trinacional/SAMPLES/Coleccion3/Samples/';
var dir_pre_class = 'projects/mapbiomas_af_trinacional/COLLECTION3/pre-classification/'

var bandas = ee.ImageCollection('projects/nexgenmap/MapBiomas2/LANDSAT/ATLANTICFOREST/mosaics').first()
print(bandas.bandNames(), "band names")
print(bandas)
var palettes = require('users/mapbiomas/modules:Palettes.js');

var names = [
              "[03] Natural Forest",
              //"[04] Savanna Formation",
              "[09] Forest Plantation",
              "[11] Wetlands",
              "[12] Grassland",
              "[15] Pasture",
              "[19] Annual crops",
              //"[21] Mosaic_agriculture_pasture",
              "[22] Non vegetated area",
              "[33] Water",
              "[48] Perennial crops",
              "[65] Te"
            ];

var palettes = require('users/mapbiomas/modules:Palettes.js');

var vis = {
    'min': 0,
    'max': 36,
    'palette': palettes.get('classification3')
};

              
              var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});

// Create and add the legend title.
var legendTitle = ui.Label({
  value: 'MapBiomas Atlantic Forest Col. 2',
  style: {
    fontWeight: 'bold',
    fontSize: '16px',
    margin: '0 0 4px 0',
    padding: '0'
  }
});

legend.add(legendTitle);

var makeRow = function(color, name) {
  // Create the label that is actually the colored box.
  var colorBox = ui.Label({
    style: {
      backgroundColor: '#' + color,
      // Use padding to give the box height and width.
      padding: '8px',
      margin: '0 0 4px 0'
    }
  });

  // Create the label filled with the description text.
  var description = ui.Label({
    value: name,
    style: {margin: '0 0 4px 6px'}
  });

  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal')
  });
};

for (var i = 0; i < names.length; i++){
legend.add(makeRow(colors[i], names[i]));
}
/////////////////////////////////
var visParMedian2 = {'bands':['swir1_median','nir_median','red_median'], 'gain':[0.08, 0.06,0.2],'gamma':0.5 };

var samples_1 = ee.FeatureCollection("projects/mapbiomas_af_trinacional/SAMPLES/Coleccion3/Samples/reg_10-col_3-points_v1_1985")
var samples_2 = ee.FeatureCollection("projects/mapbiomas_af_trinacional/SAMPLES/Coleccion3/Samples/reg_10-col_3-points_v1_2000")
var colecao_pontos = samples_1.merge(samples_2)

var agregado = colecao_pontos.aggregate_array('reference').distinct()
print(agregado, "agregado")

var totalSample = colecao_pontos
                  //.filterMetadata('type', 'equals', 'training')
                  .filterBounds(myRegion)

print(totalSample.size())

var blank = ee.Image(0).mask(0);
var outline = blank.paint(myRegion, 'AA0000', 2); 
var visPar = {'palette':'000000','opacity': 0.6};
Map.addLayer(outline, visPar, region_name, false);

//------------------------------------------------------------------
// User defined functions
//------------------------------------------------------------------
/**
 * 
 * @param {*} collection 
 * @param {*} seed 
 */
var shuffle = function (collection, seed) {

    // Adds a column of deterministic pseudorandom numbers to a collection.
    // The range 0 (inclusive) to 1000000000 (exclusive).
    collection = collection.randomColumn('random', seed || 1)
        .sort('random', true)
        .map(
            function (feature) {
                var rescaled = ee.Number(feature.get('random'))
                    .multiply(1000000000)
                    .round();
                return feature.set('new_id', rescaled);
            }
        );

    // list of random ids
    var randomIdList = ee.List(
        collection.reduceColumns(ee.Reducer.toList(), ['new_id'])
        .get('list'));

    // list of sequential ids
    var sequentialIdList = ee.List.sequence(1, collection.size());

    // set new ids
    var shuffled = collection.remap(randomIdList, sequentialIdList, 'new_id');

    return shuffled;
};


// shuffle points and reindex them
var shuffledtraining = shuffle(totalSample, 2)

var num_train_03 = ee.Number(nSamplesMax * percent_03 / 100).round().int16().max(nSamplesMin)
var train_03 = shuffledtraining.filterMetadata('reference', 'equals', 3).limit(num_train_03)
var num_train_09 = ee.Number(nSamplesMax * percent_09 / 100).round().int16().max(nSamplesMin)
var train_09 = shuffledtraining.filterMetadata('reference', 'equals', 9).limit(num_train_09)
var num_train_11 = ee.Number(nSamplesMax * percent_11 / 100).round().int16().max(nSamplesMin)
var train_11 = shuffledtraining.filterMetadata('reference', 'equals', 11).limit(num_train_11)
var num_train_12 = ee.Number(nSamplesMax * percent_12 / 100).round().int16().max(nSamplesMin)
var train_12 = shuffledtraining.filterMetadata('reference', 'equals', 12).limit(num_train_12)
var num_train_15 = ee.Number(nSamplesMax * percent_15 / 100).round().int16().max(nSamplesMin)
var train_15 = shuffledtraining.filterMetadata('reference', 'equals', 15).limit(num_train_15)
var num_train_19 = ee.Number(nSamplesMax * percent_19 / 100).round().int16().max(nSamplesMin)
var train_19 = shuffledtraining.filterMetadata('reference', 'equals', 19).limit(num_train_19)
var num_train_22 = ee.Number(nSamplesMax * percent_22 / 100).round().int16().max(nSamplesMin)
var train_22 = shuffledtraining.filterMetadata('reference', 'equals', 22).limit(num_train_22)
var num_train_33 = ee.Number(nSamplesMax * percent_33 / 100).round().int16().max(nSamplesMin)
var train_33 = shuffledtraining.filterMetadata('reference', 'equals', 33).limit(num_train_33)

print(train_03.size())
print(train_09.size())
print(train_11.size())
print(train_12.size())
print(train_15.size())
print(train_19.size())
print(train_22.size())
print(train_33.size())

var balancedtraining = train_03
                      .merge(train_09)
                      .merge(train_11)
                      .merge(train_12)
                      .merge(train_15)
                      .merge(train_19)
                      .merge(train_22)
                      .merge(train_33)

var terrain = ee.Image("JAXA/ALOS/AW3D30_V1_1").select("AVE");
var slope = ee.Terrain.slope(terrain)
var square = ee.Kernel.square({radius: 5});

var bandNames = ee.List([
"blue_median",
"cai_median",
"evi2_median",
"evi2_median_dry",
"evi2_median_wet",
"gcvi_median_dry",
"green_median",
"green_median_wet",
"green_min",
"gv_stdDev",
"gvs_median_wet",
"ndfi_median",
"ndfi_median_wet",
"ndvi_median",
"ndvi_median_wet",
"ndwi_median",
"ndwi_median_wet",
"nir_median",
"nir_median_wet",
"nir_min",
"red_median",
"red_median_dry",
"red_median_wet",
"red_min",
"savi_median",
"savi_median_dry",
"savi_median_wet",
"shade_median",
"swir1_median",
"swir1_median_dry",
"swir1_median_wet",
"swir1_min",
"swir2_median",
"swir2_median_dry",
"swir2_median_wet",
"swir2_min",
"wefi_median_wet"
  ]);

var visParMedian2 = {'bands':['swir1_median','nir_median','red_median'], 'gain':[0.08, 0.06,0.2],'gamma':0.5 };

var mosaicos1 = ee.ImageCollection(dirasset)
                  
var mosaicos2 = ee.ImageCollection(dirasset7)
                 
var collectionimg = mosaicos1.merge(mosaicos2)

for (var year_id in year_list){
  var year = year_list[year_id]

  var mosaicoTotal = ee.ImageCollection(collectionimg)
                    .filterMetadata('year', 'equals', year)
                    .filterBounds(myRegion)
                    .mosaic()
                    .clip(myRegion)
  Map.addLayer(mosaicoTotal, visParMedian2, 'Land_'+year+'_trinacional', false);  


  mosaicoTotal = mosaicoTotal.clip(myRegion)
  mosaicoTotal = mosaicoTotal.select(bandNames)
  var training_img = mosaicoTotal.sampleRegions(balancedtraining, ['reference'], 30)

  var classifier = ee.Classifier.smileRandomForest({
            'numberOfTrees': nTrees,
            'variablesPerSplit': variablesPerSplit, 
            'minLeafPopulation': minLeafPopulation, 
            'seed': seed}).train(training_img, 'reference', bandNames);
            
  var classified = mosaicoTotal.classify(classifier).mask(mosaicoTotal.select('blue_median'));
  classified = classified.select(['classification'],['classification_'+year]).clip(myRegion).toInt8()
  Map.addLayer(classified, vis, 'RF'+year+"_"+region_name, false);
  
  if (year_id == 0){ var classified00a21 = classified }  
  else {classified00a21 = classified00a21.addBands(classified); }
  
}

Map.add(legend);
classified00a21 = classified00a21
.set('collection', 3)
.set('version', version_class_out)
.set('region_name', region_name)
.set('step', stage)
.set('type', 'region')

print(classified00a21)

Export.image.toAsset({
  "image": classified00a21.toInt8(),
  "description": region_name + '-col_'+collection +'_'+ anio + '-'+ 'class_v' + version_class_out,
  "assetId": dir_pre_class + stage + '_' + region_name + '-col_'+collection +'_'+ anio + '-'+ 'class_v' + version_class_out,
  "scale": 30,
  "pyramidingPolicy": {
      '.default': 'mode'
  },
  "maxPixels": 1e13,
  "region": myRegion
});    
