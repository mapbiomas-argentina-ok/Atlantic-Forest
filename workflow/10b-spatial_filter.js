var dir_pre_class = 'projects/mapbiomas_af_trinacional/COLLECTION3/filters'
var vesion_in = 'v1' // this is Gap Fill version
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
                      //.filterMetadata('biome', 'equals', "MATAATLANTICA")
                      .filterMetadata('year', 'equals', 2000)
                      .mosaic()
Map.addLayer(mosaicoTotal, visParMedian2, 'Img_Year_2000', false);


////*************************************************************
// Do not Change from these lines
////*************************************************************

var class4GAP = ee.Image(dir_pre_class+'/step_10a_spatial_filter_col3_'+vesion_in)

var classes = [3,9,11,12,15,19,48,65]

var constant = ee.Image.constant(0).clip(reg_union)

var spatialfilter = function(valor,ano, imagem){
  var constant = constant
  var mask = imagem.select('classification_'+ (ano)).eq(valor)
  var maskclase = mask.updateMask(mask)
  
  var objectId = maskclase.connectedComponents({
  connectedness: ee.Kernel.plus(1),
  maxSize: 50
    });
  var objectSize = objectId.select('labels')
  .connectedPixelCount({
    maxSize: 50, eightConnected: false
  });

  //tamano minimo de 10 hectareas (111 pixeles landsat)  
  var objectSize_filtr = objectSize.gte(6).unmask(constant)
  var clasesnovalor = (imagem.select('classification_'+ (ano)).neq(valor).add(objectSize_filtr)).gte(1)
  var maskclasvalor = imagem.select('classification_'+ (ano)).updateMask(clasesnovalor)
  
  // corre un filtro de MODA
    var filteredclas = maskclasvalor.focalMode({
    radius: 2,
    kernelType: 'square',
    units: 'pixels',
});

  var objectSize_filtr2 = objectSize.lt(6).unmask(constant)
  var tope = filteredclas.updateMask(objectSize_filtr2)
  var classfilteredvalor = imagem.select('classification_'+ (ano)).blend(tope)

  return classfilteredvalor;
}

var anos = [1985,1986, 1987, 
    1988, 1989, 1990, 1991, 
    1992, 1993, 1994, 1995, 
    1996, 1997, 1998, 1999,
    2000, 2001, 2002, 2003, 
    2004, 2005, 2006, 2007, 
    2008, 2009, 2010, 2011, 
    2012, 2013, 2014, 2015, 
    2016, 2017, 2018, 2019,
    2020,2021,2022]
    
var appliedspatialfilter = function(imagem, valor){
   var img_out = constant
   for (var i_ano=0;i_ano<anos.length; i_ano++){  
     var ano = anos[i_ano];   
     img_out = img_out.addBands(spatialfilter(valor,ano, imagem))}
   return img_out
}

var filtered = class4GAP

for (var i_class=0;i_class<classes.length; i_class++){  
   var id_class = classes[i_class]; 
   filtered = appliedspatialfilter(filtered, id_class)
}

var imgfilterspatial = filtered.select(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,
                                24,25,26,27,28,29,30,31,32,33,34,35,36,37,38)

print(class4GAP, "original")
Map.addLayer(class4GAP.select(0), vis, 'original_1985');

print(imgfilterspatial,'filtered')
Map.addLayer(imgfilterspatial.select(0), vis, 'filtered_1985');

Export.image.toAsset({
  "image": imgfilterspatial.toInt8(),
  "description": 'spatial_filter_'+version_out,
  "assetId": dir_pre_class + '/step_10b_spatial_filter_col3_'+version_out,
  "scale": 30,
  "pyramidingPolicy": {
      '.default': 'mode'
  },
  "maxPixels": 1e13,
  "region": regions
}); 













