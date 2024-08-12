var year = 2021

var dir_pre_class = 'projects/mapbiomas_af_trinacional/COLLECTION3/filters'
var vesion_in = 'v1'
var version_out = 'v1'
var min_num_connect_pixels = 33 // lower values changes more the map - 11 equal 1ha
var min_num_of_transition = 6  // lower values changes more the map - minimum is 5


var regions = ee.FeatureCollection("projects/mapbiomas_af_trinacional/ANCILLARY_DATA/VECTOR/Regiones_AR-PY_col3");

var reg_union = regions.union()
var blank = ee.Image(0).mask(0);
var outline = blank.paint(reg_union, 'AA0000', 2); 
var visPar = {'palette':'000000','opacity': 0.6};
Map.addLayer(outline, visPar, "Atlantic Forest", true);

var vis = {"opacity":1,"bands":["classification_2010"],
"min":1,"max":65,"palette":["#129912","#1f4423","#006400","#00ff00","#687537","#76a5af","#29eee4","#77a605","#935132",
"#bbfcac","#45c2a5","#b8af4f","#f1c232","#ffffb2","#ffd966","#f6b26b","#f99f40","#e974ed","#d5a6bd","#c27ba0","#fff3bf",
"#ea9999","#dd7e6b","#aa0000","#ff99ff","#0000ff","#d5d5e5","#dd497f","#b2ae7c","#af2a2a","#8a2be2","#968c46","#0000ff",
"#4fd3ff","#645617","#fae1f9","#000000","#000000","#f5b3c8","#c71585","#f54ca9","#000000","#000000","#000000","#000000",
"#d68fe2","#9932cc","#e6ccff","#02d659","#ad5100","#000000","#000000","#000000","#000000","#000000","#000000","#000000",
"#000000","#000000","#000000","#000000","#ff69b4","#000000","#000000","#842b4c"]};;

var visParMedian2 = {'bands':['swir1_median','nir_median','red_median'], 'gain':[0.08, 0.06,0.2],'gamma':0.5 };

var dir1 = 'projects/nexgenmap/MapBiomas2/LANDSAT/ATLANTICFOREST/mosaics'
var dir2 = 'projects/nexgenmap/MapBiomas2/LANDSAT/ATLANTICFOREST/mosaics-landsat-7'

var mosaicos1 = ee.ImageCollection(dir1)
var mosaicos2 = ee.ImageCollection(dir2)

var dirasset = mosaicos1.merge(mosaicos2) 

var mosaicoTotal = ee.ImageCollection(dirasset)
                      //.filterMetadata('biome', 'equals', "MATAATLANTICA")
                      .filterMetadata('year', 'equals', 2000)
                      .mosaic()
Map.addLayer(mosaicoTotal, visParMedian2, 'Img_Year_2000', false);
  

var class4Gap = ee.Image(dir_pre_class + '/step_06_gap-fill_col3_v1')
var class4FT = ee.Image(dir_pre_class + '/step_08g_frequency_filter_col3_'+vesion_in)

//Map.addLayer(class4FT, vis, 'class4FT');

var anos3 = [1986, 1987, 
    1988, 1989, 1990, 1991, 
    1992, 1993, 1994, 1995, 
    1996, 1997, 1998, 1999,
    2000, 2001, 2002, 2003, 
    2004, 2005, 2006, 2007, 
    2008, 2009, 2010, 2011, 
    2012, 2013, 2014, 2015, 
    2016, 2017, 2018, 2019,
    2020, 2021,2022]

//put "classification_2018 in the end of bands after gap fill
var original = class4Gap.select('classification_1985')
for (var i_ano=0;i_ano<anos3.length; i_ano++){  
  var ano = anos3[i_ano]; 
  original = original.addBands(class4Gap.select('classification_'+ano)) 
}
class4Gap = original.addBands(class4Gap.select('classification_2022'))


Map.addLayer(class4Gap, {}, 'class GAP', false)
var palette_incidence = ["#C8C8C8","#FED266","#FBA713","#cb701b", "#cb701b", "#a95512", "#a95512", "#662000",  "#662000", "#cb181d"]
var image_incidence = ee.Image(dir_pre_class + '/step_09a_filter_incidente_prepare_col3_'+vesion_in)
Map.addLayer(image_incidence, {bands: 'incidence', palette:palette_incidence, min:8, max:20}, "incidents", false);

var class4FT_corrigida = class4FT

print(image_incidence)

var maskIncid_borda = image_incidence.select('connect').lte(min_num_connect_pixels)
              .and(image_incidence.select('incidence').gt(min_num_of_transition))
maskIncid_borda = maskIncid_borda.mask(maskIncid_borda.eq(1))              
Map.addLayer(maskIncid_borda, {palette:"#f49e27", min:1, max:1}, 'maskIncid_borda')
var corrige_borda = image_incidence.select('mode').mask(maskIncid_borda)
//var corrige_borda = ee.Image(21).mask(maskIncid_borda)

class4FT_corrigida = class4FT_corrigida.blend(corrige_borda)

//Map.addLayer(class4FT_corrigida, vis, 'class4FT corrigida');
var years = [1985, 1986, 1987, 
    1988, 1989, 1990, 1991, 
    1992, 1993, 1994, 1995, 
    1996, 1997, 1998, 1999,
    2000, 2001, 2002, 2003, 
    2004, 2005, 2006, 2007, 
    2008, 2009, 2010, 2011, 
    2012, 2013, 2014, 2015, 
    2016, 2017, 2018, 2019,
    2020, 2021,2022];
    // get band names list 
var bandNames = ee.List(
    years.map(
        function (year) {
            return 'classification_' + String(year);
        }
    )
);

// add connected pixels bands
var imageFilledConnected = class4FT_corrigida.addBands(
    class4FT_corrigida
        .connectedPixelCount(100, true)
        .rename(bandNames.map(
            function (band) {
                return ee.String(band).cat('_conn')
            }
        ))
);
Export.image.toAsset({
  "image": imageFilledConnected.toInt8(),
  "description": 'filter_incident_'+version_out,
  "assetId": dir_pre_class + '/step_09b_filter_incidente_col3_'+version_out,
  "scale": 30,
  "pyramidingPolicy": {
      '.default': 'mode'
  },
  "maxPixels": 1e13,
  "region": regions
});    
