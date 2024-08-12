
var year = 2019

var dir_pre_class = 'projects/mapbiomas_af_trinacional/COLLECTION3/filters'
var vesion_in = 'v1' 
var version_out = 'v1'

var regions = ee.FeatureCollection("projects/mapbiomas_af_trinacional/ANCILLARY_DATA/VECTOR/Regiones_AR-PY_col3");

var reg_union = regions.union()
var blank = ee.Image(0).mask(0);
var outline = blank.paint(reg_union, 'AA0000', 2); 
var visPar = {'palette':'000000','opacity': 0.6};
Map.addLayer(outline, visPar, "Atlantic Forest", true);


var vis = {"opacity":1,//"bands":["classification_2022"],
"min":1,"max":65,"palette":["#129912","#1f4423","#006400","#00ff00","#687537","#76a5af","#29eee4","#77a605","#935132",
"#bbfcac","#45c2a5","#b8af4f","#f1c232","#ffffb2","#ffd966","#f6b26b","#f99f40","#e974ed","#d5a6bd","#c27ba0","#fff3bf",
"#ea9999","#dd7e6b","#aa0000","#ff99ff","#0000ff","#d5d5e5","#dd497f","#b2ae7c","#af2a2a","#8a2be2","#968c46","#0000ff",
"#4fd3ff","#645617","#fae1f9","#000000","#000000","#f5b3c8","#c71585","#f54ca9","#000000","#000000","#000000","#000000",
"#d68fe2","#9932cc","#e6ccff","#02d659","#ad5100","#000000","#000000","#000000","#000000","#000000","#000000","#000000",
"#000000","#000000","#000000","#000000","#ff69b4","#000000","#000000","#842b4c"]};

var visParMedian2 = {'bands':['swir1_median','nir_median','red_median'], 'gain':[0.08, 0.06,0.2],'gamma':0.5 };

var dir1 = 'projects/nexgenmap/MapBiomas2/LANDSAT/ATLANTICFOREST/mosaics'
var dir2 = 'projects/nexgenmap/MapBiomas2/LANDSAT/ATLANTICFOREST/mosaics-landsat-7'

var mosaicos1 = ee.ImageCollection(dir1)
var mosaicos2 = ee.ImageCollection(dir2)

var dirasset = mosaicos1.merge(mosaicos2) 

var mosaicoTotal = ee.ImageCollection(dirasset)
                      .filterMetadata('year', 'equals', 2000)
                      .mosaic()
Map.addLayer(mosaicoTotal, visParMedian2, 'Img_Year_2000', false);

var class4GAP = ee.Image(dir_pre_class+'/step_06_gap-fill_col3_'+vesion_in)

print(class4GAP, "class4GAP")
Map.addLayer(class4GAP.select("classification_1985"), vis, 'class4GAP 1985 sin filter');

var ano = '1985'
var moda_85 = class4GAP.select('classification_'+ano).focal_mode(1, 'square', 'pixels')
moda_85 = moda_85.mask(class4GAP.select('classification_'+ano).neq(3).and(class4GAP.select('classification_'+ano).neq(22).and(class4GAP.select('classification_'+ano).neq(33))))
var class_outTotal = class4GAP.select('classification_'+ano).blend(moda_85)

print(class_outTotal, "class_outTotal 1985")
Map.addLayer(class_outTotal.select("classification_1985"), vis, 'class4 filter MODA 1985');


var anos = [1986, 1987, 
    1988, 1989, 1990, 1991, 
    1992, 1993, 1994, 1995, 
    1996, 1997, 1998, 1999,
    2000, 2001, 2002, 2003, 
    2004, 2005, 2006, 2007, 
    2008, 2009, 2010, 2011, 
    2012, 2013, 2014, 2015, 
    2016, 2017, 2018, 2019,
    2020, 2021,2022]

for (var i_ano=0;i_ano<anos.length; i_ano++){  
  var ano = anos[i_ano]; 
  var moda = class4GAP.select('classification_'+ano).focal_mode(1, 'square', 'pixels')
  moda = moda.mask(class4GAP.select('classification_'+ano).neq(3).and(class4GAP.select('classification_'+ano).neq(22).and(class4GAP.select('classification_'+ano).neq(33))))
  var class_out = class4GAP.select('classification_'+ano).blend(moda)
  class_outTotal = class_outTotal.addBands(class_out)
}
print(class_outTotal,"class_outTotal 1985-2022")
Map.addLayer(class_outTotal.select("classification_2010"), vis, 'class4 MODA - 2010');

Export.image.toAsset({
  "image": class_outTotal.toInt8(),
  "description": 'filter_spatial_'+version_out,
  "assetId": dir_pre_class + '/step_07a_filter_spatial_col3_'+version_out,
  "scale": 30,
  "pyramidingPolicy": {
      '.default': 'mode'
  },
  "maxPixels": 1e13,
  "region": regions
});    
