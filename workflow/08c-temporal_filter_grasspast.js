
var vesion_in = 'v1'
var version_out = "v1"
var dir_pre_class = 'projects/mapbiomas_af_trinacional/COLLECTION3/filters'
var dirout = 'projects/mapbiomas_af_trinacional/COLLECTION3/filters/'

////*************************************************************
// Do not Change from these lines
////*************************************************************

var vis = {"opacity":1,//"bands":["classification_2022"],
"min":1,"max":65,"palette":["#129912","#1f4423","#006400","#00ff00","#687537","#76a5af","#29eee4","#77a605","#935132",
"#bbfcac","#45c2a5","#b8af4f","#f1c232","#ffffb2","#ffd966","#f6b26b","#f99f40","#e974ed","#d5a6bd","#c27ba0","#fff3bf",
"#ea9999","#dd7e6b","#aa0000","#ff99ff","#0000ff","#d5d5e5","#dd497f","#b2ae7c","#af2a2a","#8a2be2","#968c46","#0000ff",
"#4fd3ff","#645617","#fae1f9","#000000","#000000","#f5b3c8","#c71585","#f54ca9","#000000","#000000","#000000","#000000",
"#d68fe2","#9932cc","#e6ccff","#02d659","#ad5100","#000000","#000000","#000000","#000000","#000000","#000000","#000000",
"#000000","#000000","#000000","#000000","#ff69b4","#000000","#000000","#842b4c"]};

var class4 = ee.Image(dir_pre_class+'/step_08b_filter_temporal_bosqhum_col3_'+vesion_in)
print(class4)

var regions = ee.FeatureCollection("projects/mapbiomas_af_trinacional/ANCILLARY_DATA/VECTOR/Regiones_AR-PY_col3");

var reg_union = regions.union()
var blank = ee.Image(0).mask(0);
var outline = blank.paint(reg_union, 'AA0000', 2); 
var visPar = {'palette':'000000','opacity': 0.6};
Map.addLayer(outline, visPar, "Atlantic Forest", true);

var filtrofreq2 = function(mapbiomas){
  ////////Calculando frequencias
  //////////////////////

  // General rule
  var exp = '100*((b(0)+b(1)+b(2)+b(3)+b(4)+b(5)+b(6)+b(7)+b(8)+b(9)+b(10)+b(11)+b(12)+b(13)+b(14)+b(15)' +
      '+b(16)+b(17)+b(18)+b(19)+b(20)+b(21)+b(22)+b(23)+b(24)+b(25)+b(26)+b(27)+b(28)+b(29)+b(30)+b(31)+b(32)+b(33)' +
      '+b(34)+b(35)+b(36)+b(37))/38)';
  
  // get frequency
var grassFreq = mapbiomas.eq(12).expression(exp);
var saida = grassFreq
saida  = saida.select(['constant'],['grassFreq'])
return saida;
}

var saida = filtrofreq2(class4)

print(class4)
print(saida)

Map.addLayer(class4.select(0), vis, 'image original');
Map.addLayer(saida.select('grassFreq').selfMask(), {}, 'grassFreq');

var mask1 = class4.select('classification_1985').eq(3)
          .or(class4.select('classification_1986').eq(3))
          .and(saida.gt(0))
            
Map.addLayer(mask1.selfMask(),{}, 'Mascara1');

var filtroGrassPast = function(image) {
  var x = image.where(image.eq(12).and(mask1.eq(1)),15)
  return x
}

var years = [1986, 1987, 
    1988, 1989, 1990, 1991, 
    1992, 1993, 1994, 1995, 
    1996, 1997, 1998, 1999,
    2000, 2001, 2002, 2003, 
    2004, 2005, 2006, 2007, 
    2008, 2009, 2010, 2011, 
    2012, 2013, 2014, 2015, 
    2016, 2017, 2018, 2019,
    2020,2021,2022]


var aplicarFuncionBandas = function(imagem){
   var img_out = imagem.select('classification_1985')
   for (var i_ano=0;i_ano<years.length; i_ano++){  
     var ano = years[i_ano];   
     img_out = img_out.addBands(filtroGrassPast(imagem.select("classification_"+ano)))}
   return img_out
}

var coleccionReclass = aplicarFuncionBandas(class4)
print(coleccionReclass)

Map.addLayer(class4.select(5), vis, 'image original 1990');
Map.addLayer(coleccionReclass.select(5), vis, 'image con filtro Humedales 1990');

Export.image.toAsset({
    'image': coleccionReclass,
    'description': 'frequency_filter_'+version_out,
    'assetId': dir_pre_class + '/step_08c_filter_temporal_grasspast_col3_'+version_out,
    'pyramidingPolicy': {
        '.default': 'mode'
    },
    'region': regions,
    'scale': 30,
    'maxPixels': 1e13
});

 