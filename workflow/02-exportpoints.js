
// Change to your grid_name
var region_number = 2
var region_number2 = "2"
var region_name = "reg_";

var regions = ee.FeatureCollection("projects/mapbiomas_af_trinacional/ANCILLARY_DATA/VECTOR/Regiones_AR-PY_col3");
var myRegion = regions.filterMetadata('Reg_id', 'equals', region_name+region_number)

var outputAsset = 'projects/mapbiomas_af_trinacional/SAMPLES/Coleccion3/PoligonosVT/';

var year_list = [1985, 1995, 2000, 2010, 2015, 2021]

var dir1 = 'projects/nexgenmap/MapBiomas2/LANDSAT/ATLANTICFOREST/mosaics'
var dir2 = 'projects/nexgenmap/MapBiomas2/LANDSAT/ATLANTICFOREST/mosaics-landsat-7'

var mosaicos1 = ee.ImageCollection(dir1)
var mosaicos2 = ee.ImageCollection(dir2)

var dirasset = mosaicos1.merge(mosaicos2)  
print(dirasset, "dirasset")

var visParMedian1 = {'bands':['nir_median_dry','swir1_median_dry','red_median_dry'], 'max': 3187.5,'gamma':1.32 };
var visParMedian2 = {'bands':['nir_median_wet','swir1_median_wet','red_median_wet'], 'max': 3187.5,'gamma':1.32 };

// Add mosaic for each year dry
for (var year_id in year_list){
  var year = year_list[year_id]
  var mosaico = ee.ImageCollection(dirasset)
                    .filterMetadata('year', 'equals', year)
                    .filterBounds(myRegion.geometry())
                    .mosaic().clip(myRegion)
  Map.addLayer(mosaico, visParMedian1, 'Land_dry'+year+region_name, false);  
}

// Add mosaic for each year wet
for (var year_id in year_list){
  var year = year_list[year_id]
  var mosaico = ee.ImageCollection(dirasset)
                    .filterMetadata('year', 'equals', year)
                    .filterBounds(myRegion.geometry())
                    .mosaic().clip(myRegion)
  Map.addLayer(mosaico, visParMedian2, 'Land_wet'+year+region_name, false);  
}

var visParMedian3 = {"bands": ["B5","B6","B4"], "min":130, 'max': 3187.5,'gamma':1.32 };


var blank = ee.Image(0).mask(0);
var outline = blank.paint(myRegion, 'AA0000', 2); 
var visPar = {'palette':'#f20a0a','opacity': 0.6};
Map.addLayer(outline, visPar, region_name, true);
Map.addLayer(regions, {}, 'regions', false);

Map.centerObject(myRegion, 7)


// Samples
var forest = c03_forest_formation
var forest_plantation = c09_forest_plantation
var pasture = c15_pasture
var annual_crops = c19_annual_crops_uso
var non_vegetated = c22_non_vegetated_area
var water = c33_water
var perennial_crops = c36_perennial_crops

print('# c03_forest_formation', forest.size())
print('# c09_forest_plantation', forest_plantation.size())
print('# c15_pasture', pasture.size())
print('# c19_annual_crops', annual_crops.size())
print('# c22_non_vegetated_area', non_vegetated.size())
print('# c33_water', water.size())
print('# c36_perennial_crops', perennial_crops.size())

var samples = forest.merge(forest_plantation).merge(pasture).merge(annual_crops)
              .merge(non_vegetated).merge(water)


Export.table.toAsset({
    "collection": ee.FeatureCollection(samples),
    "description": region_name + region_number2 + "_Coleccion3",
    "assetId": outputAsset + region_name + region_number2 + "_Coleccion3"
});

