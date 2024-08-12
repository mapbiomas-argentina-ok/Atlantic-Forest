var year = 2015 // year to see result

var dir_pre_class = 'projects/mapbiomas_af_trinacional/COLLECTION3/filters'
var vesion_in = 'v1' // this is spatial filter
var version_out = 'v1'  

var middle_plant = [9]; //[33, 3, 21, 13, 25]; 
var ordem_exec_first = [9]; //[3, 33, 21, 13, 25];
var ordem_exec_last = [9]; //[21];

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

var image_FE = ee.Image(dir_pre_class+'/step_08c_filter_temporal_grasspast_col3_'+vesion_in)

var mask3first = function(valor, imagem){
  var mask = imagem.select('classification_1985').neq (valor)
        .and(imagem.select('classification_1986').eq(valor))
        .and(imagem.select('classification_1987').eq (valor))
  var muda_img = imagem.select('classification_1985').mask(mask.eq(1)).where(mask.eq(1), valor);  
  var img_out = imagem.select('classification_1985').blend(muda_img)
  img_out = img_out.addBands([imagem.select('classification_1986'),
                              imagem.select('classification_1987'),
                              imagem.select('classification_1988'),
                              imagem.select('classification_1989'),
                              imagem.select('classification_1990'),
                              imagem.select('classification_1991'),
                              imagem.select('classification_1992'),
                              imagem.select('classification_1993'),
                              imagem.select('classification_1994'),
                              imagem.select('classification_1995'),
                              imagem.select('classification_1996'),
                              imagem.select('classification_1997'),
                              imagem.select('classification_1998'),
                              imagem.select('classification_1999'),
                              imagem.select('classification_2000'),
                              imagem.select('classification_2001'),
                              imagem.select('classification_2002'),
                              imagem.select('classification_2003'),
                              imagem.select('classification_2004'),
                              imagem.select('classification_2005'),
                              imagem.select('classification_2006'),
                              imagem.select('classification_2007'),
                              imagem.select('classification_2008'),
                              imagem.select('classification_2009'),
                              imagem.select('classification_2010'),
                              imagem.select('classification_2011'),
                              imagem.select('classification_2012'),
                              imagem.select('classification_2013'),
                              imagem.select('classification_2014'),
                              imagem.select('classification_2015'),
                              imagem.select('classification_2016'),
                              imagem.select('classification_2017'),
                              imagem.select('classification_2018'),
                              imagem.select('classification_2019'),
                              imagem.select('classification_2020'),
                              imagem.select('classification_2021'),
                              imagem.select('classification_2022')])
  return img_out;
}

var mask3last = function(valor, imagem){
  var mask = imagem.select('classification_2020').eq (valor)
        .and(imagem.select('classification_2021').eq(valor))
        .and(imagem.select('classification_2022').neq (valor))
  var muda_img = imagem.select('classification_2022').mask(mask.eq(1)).where(mask.eq(1), valor);  
  var img_out = imagem.select('classification_1985')
  img_out = img_out.addBands([imagem.select('classification_1986'),
                              imagem.select('classification_1987'),
                              imagem.select('classification_1988'),
                              imagem.select('classification_1989'),
                              imagem.select('classification_1990'),
                              imagem.select('classification_1991'),
                              imagem.select('classification_1992'),
                              imagem.select('classification_1993'),
                              imagem.select('classification_1994'),
                              imagem.select('classification_1995'),
                              imagem.select('classification_1996'),
                              imagem.select('classification_1997'),
                              imagem.select('classification_1998'),
                              imagem.select('classification_1999'),
                              imagem.select('classification_2000'),
                              imagem.select('classification_2001'),
                              imagem.select('classification_2002'),
                              imagem.select('classification_2003'),
                              imagem.select('classification_2004'),
                              imagem.select('classification_2005'),
                              imagem.select('classification_2006'),
                              imagem.select('classification_2007'),
                              imagem.select('classification_2008'),
                              imagem.select('classification_2009'),
                              imagem.select('classification_2010'),
                              imagem.select('classification_2011'),
                              imagem.select('classification_2012'),
                              imagem.select('classification_2013'),
                              imagem.select('classification_2014'),
                              imagem.select('classification_2015'),
                              imagem.select('classification_2016'),
                              imagem.select('classification_2017'),
                              imagem.select('classification_2018'),
                              imagem.select('classification_2019'),
                              imagem.select('classification_2020'),
                              imagem.select('classification_2021')])
  var img_out = img_out.addBands(imagem.select('classification_2022').blend(muda_img))
  return img_out;
}


var mask3 = function(valor, ano, imagem){
  var mask = imagem.select('classification_'+ (parseInt(ano) - 1)).eq (valor)
        .and(imagem.select('classification_'+ (ano)              ).neq(valor))
        .and(imagem.select('classification_'+ (parseInt(ano) + 1)).eq (valor))
  var muda_img = imagem.select('classification_'+ (ano)    ).mask(mask.eq(1)).where(mask.eq(1), valor);  
  var img_out = imagem.select('classification_'+ano).blend(muda_img)
  return img_out;
}

var mask4 = function(valor, ano, imagem){
  var mask = imagem.select('classification_'+ (parseInt(ano) - 1)).eq (valor)
        .and(imagem.select('classification_'+ (ano)              ).neq(valor))
        .and(imagem.select('classification_'+ (parseInt(ano) + 1)).neq(valor))
        .and(imagem.select('classification_'+ (parseInt(ano) + 2)).eq (valor))
  var muda_img  = imagem.select('classification_'+ (ano)              ).mask(mask.eq(1)).where(mask.eq(1), valor);  
  var muda_img1 = imagem.select('classification_'+ (parseInt(ano) + 1)).mask(mask.eq(1)).where(mask.eq(1), valor); 
  var img_out = imagem.select('classification_'+ano).blend(muda_img).blend(muda_img1)
  return img_out;
}

var mask5 = function(valor, ano, imagem){
  var mask = imagem.select('classification_'+ (parseInt(ano) - 1)).eq (valor)
        .and(imagem.select('classification_'+ (ano)              ).neq(valor))
        .and(imagem.select('classification_'+ (parseInt(ano) + 1)).neq(valor))
        .and(imagem.select('classification_'+ (parseInt(ano) + 2)).neq(valor))
        .and(imagem.select('classification_'+ (parseInt(ano) + 3)).eq (valor))
  var muda_img  = imagem.select('classification_'+ (ano)              ).mask(mask.eq(1)).where(mask.eq(1), valor);  
  var muda_img1 = imagem.select('classification_'+ (parseInt(ano) + 1)).mask(mask.eq(1)).where(mask.eq(1), valor);  
  var muda_img2 = imagem.select('classification_'+ (parseInt(ano) + 2)).mask(mask.eq(1)).where(mask.eq(1), valor);  
  var img_out = imagem.select('classification_'+ano).blend(muda_img).blend(muda_img1).blend(muda_img2)
  return img_out;
}

var mask6 = function(valor,ano, imagem){
  var mask = imagem.select('classification_'+ (parseInt(ano) - 1)).eq(valor)
        .and(imagem.select('classification_'+ (ano)              ).neq(valor))
        .and(imagem.select('classification_'+ (parseInt(ano) + 1)).neq(valor))
        .and(imagem.select('classification_'+ (parseInt(ano) + 2)).neq(valor))
        .and(imagem.select('classification_'+ (parseInt(ano) + 3)).neq(valor))
        .and(imagem.select('classification_'+ (parseInt(ano) + 4)).eq (valor))
  var muda_img  = imagem.select('classification_'+ (ano)              ).mask(mask.eq(1)).where(mask.eq(1), valor);  
  var muda_img1 = imagem.select('classification_'+ (parseInt(ano) + 1)).mask(mask.eq(1)).where(mask.eq(1), valor);  
  var muda_img2 = imagem.select('classification_'+ (parseInt(ano) + 2)).mask(mask.eq(1)).where(mask.eq(1), valor);
  var muda_img3 = imagem.select('classification_'+ (parseInt(ano) + 3)).mask(mask.eq(1)).where(mask.eq(1), valor); 
  var img_out = imagem.select('classification_'+ano).blend(muda_img).blend(muda_img1).blend(muda_img2).blend(muda_img3)
  return img_out;
}

var mask7 = function(valor,ano, imagem){
  var mask = imagem.select('classification_'+ (parseInt(ano) - 1)).eq(valor)
        .and(imagem.select('classification_'+ (ano)              ).neq(valor))
        .and(imagem.select('classification_'+ (parseInt(ano) + 1)).neq(valor))
        .and(imagem.select('classification_'+ (parseInt(ano) + 2)).neq(valor))
        .and(imagem.select('classification_'+ (parseInt(ano) + 3)).neq(valor))
        .and(imagem.select('classification_'+ (parseInt(ano) + 4)).neq (valor))
        .and(imagem.select('classification_'+ (parseInt(ano) + 5)).eq (valor))
  var muda_img  = imagem.select('classification_'+ (ano)              ).mask(mask.eq(1)).where(mask.eq(1), valor);  
  var muda_img1 = imagem.select('classification_'+ (parseInt(ano) + 1)).mask(mask.eq(1)).where(mask.eq(1), valor);  
  var muda_img2 = imagem.select('classification_'+ (parseInt(ano) + 2)).mask(mask.eq(1)).where(mask.eq(1), valor);
  var muda_img3 = imagem.select('classification_'+ (parseInt(ano) + 3)).mask(mask.eq(1)).where(mask.eq(1), valor); 
  var muda_img4 = imagem.select('classification_'+ (parseInt(ano) + 4)).mask(mask.eq(1)).where(mask.eq(1), valor);
  var img_out = imagem.select('classification_'+ano).blend(muda_img).blend(muda_img1).blend(muda_img2).blend(muda_img3).blend(muda_img4)
  return img_out;
}

var mask8 = function(valor,ano, imagem){
  var mask = imagem.select('classification_'+ (parseInt(ano) - 1)).eq(valor)
        .and(imagem.select('classification_'+ (ano)              ).neq(valor))
        .and(imagem.select('classification_'+ (parseInt(ano) + 1)).neq(valor))
        .and(imagem.select('classification_'+ (parseInt(ano) + 2)).neq(valor))
        .and(imagem.select('classification_'+ (parseInt(ano) + 3)).neq(valor))
        .and(imagem.select('classification_'+ (parseInt(ano) + 4)).neq (valor))
        .and(imagem.select('classification_'+ (parseInt(ano) + 5)).neq (valor))
        .and(imagem.select('classification_'+ (parseInt(ano) + 6)).eq (valor))
  var muda_img  = imagem.select('classification_'+ (ano)              ).mask(mask.eq(1)).where(mask.eq(1), valor);  
  var muda_img1 = imagem.select('classification_'+ (parseInt(ano) + 1)).mask(mask.eq(1)).where(mask.eq(1), valor);  
  var muda_img2 = imagem.select('classification_'+ (parseInt(ano) + 2)).mask(mask.eq(1)).where(mask.eq(1), valor);
  var muda_img3 = imagem.select('classification_'+ (parseInt(ano) + 3)).mask(mask.eq(1)).where(mask.eq(1), valor); 
  var muda_img4 = imagem.select('classification_'+ (parseInt(ano) + 4)).mask(mask.eq(1)).where(mask.eq(1), valor);
  var muda_img5 = imagem.select('classification_'+ (parseInt(ano) + 5)).mask(mask.eq(1)).where(mask.eq(1), valor);
  var img_out = imagem.select('classification_'+ano).blend(muda_img).blend(muda_img1).blend(muda_img2).blend(muda_img3).blend(muda_img4).blend(muda_img5)
  return img_out;
}

var mask9 = function(valor,ano, imagem){
  var mask = imagem.select('classification_'+ (parseInt(ano) - 1)).eq(valor)
        .and(imagem.select('classification_'+ (ano)              ).neq(valor))
        .and(imagem.select('classification_'+ (parseInt(ano) + 1)).neq(valor))
        .and(imagem.select('classification_'+ (parseInt(ano) + 2)).neq(valor))
        .and(imagem.select('classification_'+ (parseInt(ano) + 3)).neq(valor))
        .and(imagem.select('classification_'+ (parseInt(ano) + 4)).neq (valor))
        .and(imagem.select('classification_'+ (parseInt(ano) + 5)).neq (valor))
        .and(imagem.select('classification_'+ (parseInt(ano) + 6)).neq (valor))
        .and(imagem.select('classification_'+ (parseInt(ano) + 7)).eq (valor))
  var muda_img  = imagem.select('classification_'+ (ano)              ).mask(mask.eq(1)).where(mask.eq(1), valor);  
  var muda_img1 = imagem.select('classification_'+ (parseInt(ano) + 1)).mask(mask.eq(1)).where(mask.eq(1), valor);  
  var muda_img2 = imagem.select('classification_'+ (parseInt(ano) + 2)).mask(mask.eq(1)).where(mask.eq(1), valor);
  var muda_img3 = imagem.select('classification_'+ (parseInt(ano) + 3)).mask(mask.eq(1)).where(mask.eq(1), valor); 
  var muda_img4 = imagem.select('classification_'+ (parseInt(ano) + 4)).mask(mask.eq(1)).where(mask.eq(1), valor);
  var muda_img5 = imagem.select('classification_'+ (parseInt(ano) + 5)).mask(mask.eq(1)).where(mask.eq(1), valor);
  var muda_img6 = imagem.select('classification_'+ (parseInt(ano) + 6)).mask(mask.eq(1)).where(mask.eq(1), valor);
  var img_out = imagem.select('classification_'+ano).blend(muda_img).blend(muda_img1).blend(muda_img2).blend(muda_img3).blend(muda_img4).blend(muda_img5).blend(muda_img6)
  return img_out;
}

var mask10 = function(valor,ano, imagem){
  var mask = imagem.select('classification_'+ (parseInt(ano) - 1)).eq(valor)
        .and(imagem.select('classification_'+ (ano)              ).neq(valor))
        .and(imagem.select('classification_'+ (parseInt(ano) + 1)).neq(valor))
        .and(imagem.select('classification_'+ (parseInt(ano) + 2)).neq(valor))
        .and(imagem.select('classification_'+ (parseInt(ano) + 3)).neq(valor))
        .and(imagem.select('classification_'+ (parseInt(ano) + 4)).neq (valor))
        .and(imagem.select('classification_'+ (parseInt(ano) + 5)).neq (valor))
        .and(imagem.select('classification_'+ (parseInt(ano) + 6)).neq (valor))
        .and(imagem.select('classification_'+ (parseInt(ano) + 7)).neq (valor))
        .and(imagem.select('classification_'+ (parseInt(ano) + 8)).eq (valor))
  var muda_img  = imagem.select('classification_'+ (ano)              ).mask(mask.eq(1)).where(mask.eq(1), valor);  
  var muda_img1 = imagem.select('classification_'+ (parseInt(ano) + 1)).mask(mask.eq(1)).where(mask.eq(1), valor);  
  var muda_img2 = imagem.select('classification_'+ (parseInt(ano) + 2)).mask(mask.eq(1)).where(mask.eq(1), valor);
  var muda_img3 = imagem.select('classification_'+ (parseInt(ano) + 3)).mask(mask.eq(1)).where(mask.eq(1), valor); 
  var muda_img4 = imagem.select('classification_'+ (parseInt(ano) + 4)).mask(mask.eq(1)).where(mask.eq(1), valor);
  var muda_img5 = imagem.select('classification_'+ (parseInt(ano) + 5)).mask(mask.eq(1)).where(mask.eq(1), valor);
  var muda_img6 = imagem.select('classification_'+ (parseInt(ano) + 6)).mask(mask.eq(1)).where(mask.eq(1), valor);
  var muda_img7 = imagem.select('classification_'+ (parseInt(ano) + 7)).mask(mask.eq(1)).where(mask.eq(1), valor);
  var img_out = imagem.select('classification_'+ano).blend(muda_img).blend(muda_img1).blend(muda_img2).blend(muda_img3).blend(muda_img4).blend(muda_img5).blend(muda_img6).blend(muda_img7)
  return img_out;
}

var mask11 = function(valor,ano, imagem){
  var mask = imagem.select('classification_'+ (parseInt(ano) - 1)).eq(valor)
        .and(imagem.select('classification_'+ (ano)              ).neq(valor))
        .and(imagem.select('classification_'+ (parseInt(ano) + 1)).neq(valor))
        .and(imagem.select('classification_'+ (parseInt(ano) + 2)).neq(valor))
        .and(imagem.select('classification_'+ (parseInt(ano) + 3)).neq(valor))
        .and(imagem.select('classification_'+ (parseInt(ano) + 4)).neq (valor))
        .and(imagem.select('classification_'+ (parseInt(ano) + 5)).neq (valor))
        .and(imagem.select('classification_'+ (parseInt(ano) + 6)).neq (valor))
        .and(imagem.select('classification_'+ (parseInt(ano) + 7)).neq (valor))
        .and(imagem.select('classification_'+ (parseInt(ano) + 8)).neq (valor))
        .and(imagem.select('classification_'+ (parseInt(ano) + 9)).eq (valor))
  var muda_img  = imagem.select('classification_'+ (ano)              ).mask(mask.eq(1)).where(mask.eq(1), valor);  
  var muda_img1 = imagem.select('classification_'+ (parseInt(ano) + 1)).mask(mask.eq(1)).where(mask.eq(1), valor);  
  var muda_img2 = imagem.select('classification_'+ (parseInt(ano) + 2)).mask(mask.eq(1)).where(mask.eq(1), valor);
  var muda_img3 = imagem.select('classification_'+ (parseInt(ano) + 3)).mask(mask.eq(1)).where(mask.eq(1), valor); 
  var muda_img4 = imagem.select('classification_'+ (parseInt(ano) + 4)).mask(mask.eq(1)).where(mask.eq(1), valor);
  var muda_img5 = imagem.select('classification_'+ (parseInt(ano) + 5)).mask(mask.eq(1)).where(mask.eq(1), valor);
  var muda_img6 = imagem.select('classification_'+ (parseInt(ano) + 6)).mask(mask.eq(1)).where(mask.eq(1), valor);
  var muda_img7 = imagem.select('classification_'+ (parseInt(ano) + 7)).mask(mask.eq(1)).where(mask.eq(1), valor);
  var muda_img8 = imagem.select('classification_'+ (parseInt(ano) + 8)).mask(mask.eq(1)).where(mask.eq(1), valor);
  var img_out = imagem.select('classification_'+ano).blend(muda_img).blend(muda_img1).blend(muda_img2).blend(muda_img3).blend(muda_img4).blend(muda_img5).blend(muda_img6).blend(muda_img7).blend(muda_img8)
  return img_out;
}

var mask12 = function(valor,ano, imagem){
  var mask = imagem.select('classification_'+ (parseInt(ano) - 1)).eq(valor)
        .and(imagem.select('classification_'+ (ano)              ).neq(valor))
        .and(imagem.select('classification_'+ (parseInt(ano) + 1)).neq(valor))
        .and(imagem.select('classification_'+ (parseInt(ano) + 2)).neq(valor))
        .and(imagem.select('classification_'+ (parseInt(ano) + 3)).neq(valor))
        .and(imagem.select('classification_'+ (parseInt(ano) + 4)).neq (valor))
        .and(imagem.select('classification_'+ (parseInt(ano) + 5)).neq (valor))
        .and(imagem.select('classification_'+ (parseInt(ano) + 6)).neq (valor))
        .and(imagem.select('classification_'+ (parseInt(ano) + 7)).neq (valor))
        .and(imagem.select('classification_'+ (parseInt(ano) + 8)).neq (valor))
        .and(imagem.select('classification_'+ (parseInt(ano) + 9)).neq (valor))
        .and(imagem.select('classification_'+ (parseInt(ano) + 10)).eq (valor))
  var muda_img  = imagem.select('classification_'+ (ano)              ).mask(mask.eq(1)).where(mask.eq(1), valor);  
  var muda_img1 = imagem.select('classification_'+ (parseInt(ano) + 1)).mask(mask.eq(1)).where(mask.eq(1), valor);  
  var muda_img2 = imagem.select('classification_'+ (parseInt(ano) + 2)).mask(mask.eq(1)).where(mask.eq(1), valor);
  var muda_img3 = imagem.select('classification_'+ (parseInt(ano) + 3)).mask(mask.eq(1)).where(mask.eq(1), valor); 
  var muda_img4 = imagem.select('classification_'+ (parseInt(ano) + 4)).mask(mask.eq(1)).where(mask.eq(1), valor);
  var muda_img5 = imagem.select('classification_'+ (parseInt(ano) + 5)).mask(mask.eq(1)).where(mask.eq(1), valor);
  var muda_img6 = imagem.select('classification_'+ (parseInt(ano) + 6)).mask(mask.eq(1)).where(mask.eq(1), valor);
  var muda_img7 = imagem.select('classification_'+ (parseInt(ano) + 7)).mask(mask.eq(1)).where(mask.eq(1), valor);
  var muda_img8 = imagem.select('classification_'+ (parseInt(ano) + 8)).mask(mask.eq(1)).where(mask.eq(1), valor);
  var muda_img9 = imagem.select('classification_'+ (parseInt(ano) + 9)).mask(mask.eq(1)).where(mask.eq(1), valor);
  var img_out = imagem.select('classification_'+ano).blend(muda_img).blend(muda_img1).blend(muda_img2).blend(muda_img3).blend(muda_img4).blend(muda_img5).blend(muda_img6).blend(muda_img7).blend(muda_img8).blend(muda_img9)
  return img_out;
}

var mask32 = function(valor, ano, imagem){
  var mask = imagem.select('classification_'+ (parseInt(ano) - 1)).eq (3)
        .and((imagem.select('classification_'+ (ano)              ).eq(22))
        .or(imagem.select('classification_'+ (ano)              ).eq(48)).or(imagem.select('classification_'+ (ano)              ).eq(65))
        .or(imagem.select('classification_'+ (ano)              ).eq(15))
        .or(imagem.select('classification_'+ (ano)              ).eq(19)))
        .and(imagem.select('classification_'+ (parseInt(ano) + 1)).eq (valor))
  var muda_img = imagem.select('classification_'+ (ano)    ).mask(mask.eq(1)).where(mask.eq(1), valor);  
  var img_out = imagem.select('classification_'+ano).blend(muda_img)
  return img_out;
}

var mask42 = function(valor, ano, imagem){
  var mask = imagem.select('classification_'+ (parseInt(ano) - 1)).eq (3)
        .and((imagem.select('classification_'+ (ano)              ).eq(22))
        .or(imagem.select('classification_'+ (ano)              ).eq(48)).or(imagem.select('classification_'+ (ano)              ).eq(65))
        .or(imagem.select('classification_'+ (ano)              ).eq(15))
        .or(imagem.select('classification_'+ (ano)              ).eq(19)))
        .and((imagem.select('classification_'+ (parseInt(ano) + 1)).eq(22))
        .or(imagem.select('classification_'+ (parseInt(ano) + 1)).eq(48)).or(imagem.select('classification_'+ (parseInt(ano) + 1)).eq(65))
        .or(imagem.select('classification_'+ (parseInt(ano) + 1)).eq(15))
        .or(imagem.select('classification_'+ (parseInt(ano) + 1)).eq(19)))
        .and(imagem.select('classification_'+ (parseInt(ano) + 2)).eq (valor))
  var muda_img  = imagem.select('classification_'+ (ano)              ).mask(mask.eq(1)).where(mask.eq(1), valor);  
  var muda_img1 = imagem.select('classification_'+ (parseInt(ano) + 1)).mask(mask.eq(1)).where(mask.eq(1), valor); 
  var img_out = imagem.select('classification_'+ano).blend(muda_img).blend(muda_img1)
  return img_out;
}

var mask52 = function(valor, ano, imagem){
  var mask = imagem.select('classification_'+ (parseInt(ano) - 1)).eq (3)
        .and((imagem.select('classification_'+ (ano)              ).eq(22))
        .or(imagem.select('classification_'+ (ano)              ).eq(48)).or(imagem.select('classification_'+ (ano)              ).eq(65))
        .or(imagem.select('classification_'+ (ano)              ).eq(15))
        .or(imagem.select('classification_'+ (ano)              ).eq(19)))
        .and((imagem.select('classification_'+ (parseInt(ano) + 1)).eq(22))
        .or(imagem.select('classification_'+ (parseInt(ano) + 1)).eq(48)).or(imagem.select('classification_'+ (parseInt(ano) + 1)).eq(65))
        .or(imagem.select('classification_'+ (parseInt(ano) + 1)).eq(15))
        .or(imagem.select('classification_'+ (parseInt(ano) + 1)).eq(19)))
        .and((imagem.select('classification_'+ (parseInt(ano)  + 2)).eq(22))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 2)).eq(48)).or(imagem.select('classification_'+ (parseInt(ano) + 2)).eq(65))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 2)).eq(15))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 2)).eq(19)))
        .and(imagem.select('classification_'+ (parseInt(ano) + 3)).eq (valor))
  var muda_img  = imagem.select('classification_'+ (ano)              ).mask(mask.eq(1)).where(mask.eq(1), valor);  
  var muda_img1 = imagem.select('classification_'+ (parseInt(ano) + 1)).mask(mask.eq(1)).where(mask.eq(1), valor);  
  var muda_img2 = imagem.select('classification_'+ (parseInt(ano) + 2)).mask(mask.eq(1)).where(mask.eq(1), valor);  
  var img_out = imagem.select('classification_'+ano).blend(muda_img).blend(muda_img1).blend(muda_img2)
  return img_out;
}

var mask62 = function(valor, ano, imagem){
  var mask = imagem.select('classification_'+ (parseInt(ano) - 1)).eq(3)
        .and((imagem.select('classification_'+ (ano)              ).eq(22))
        .or(imagem.select('classification_'+ (ano)              ).eq(48)).or(imagem.select('classification_'+ (ano)              ).eq(65))
        .or(imagem.select('classification_'+ (ano)              ).eq(15))
        .or(imagem.select('classification_'+ (ano)              ).eq(19)))
        .and((imagem.select('classification_'+ (parseInt(ano) + 1)).eq(22))
        .or(imagem.select('classification_'+ (parseInt(ano) + 1)).eq(48)).or(imagem.select('classification_'+ (parseInt(ano) + 1)).eq(65))
        .or(imagem.select('classification_'+ (parseInt(ano) + 1)).eq(15))
        .or(imagem.select('classification_'+ (parseInt(ano) + 1)).eq(19)))
        .and((imagem.select('classification_'+ (parseInt(ano)  + 2)).eq(22))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 2)).eq(48)).or(imagem.select('classification_'+ (parseInt(ano) + 2)).eq(65))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 2)).eq(15))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 2)).eq(19)))
        .and((imagem.select('classification_'+ (parseInt(ano)  + 3)).eq(22))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 3)).eq(48)).or(imagem.select('classification_'+ (parseInt(ano) + 3)).eq(65))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 3)).eq(15))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 3)).eq(19))) 
        .and(imagem.select('classification_'+ (parseInt(ano) + 4)).eq (valor))
  var muda_img  = imagem.select('classification_'+ (ano)              ).mask(mask.eq(1)).where(mask.eq(1), valor);  
  var muda_img1 = imagem.select('classification_'+ (parseInt(ano) + 1)).mask(mask.eq(1)).where(mask.eq(1), valor);  
  var muda_img2 = imagem.select('classification_'+ (parseInt(ano) + 2)).mask(mask.eq(1)).where(mask.eq(1), valor);
  var muda_img3 = imagem.select('classification_'+ (parseInt(ano) + 3)).mask(mask.eq(1)).where(mask.eq(1), valor); 
  var img_out = imagem.select('classification_'+ano).blend(muda_img).blend(muda_img1).blend(muda_img2).blend(muda_img3)
  return img_out;
}

var mask72 = function(valor,ano, imagem){
  var mask = imagem.select('classification_'+ (parseInt(ano) - 1)).eq(3)
        .and((imagem.select('classification_'+ (ano)              ).eq(22))
        .or(imagem.select('classification_'+ (ano)              ).eq(48)).or(imagem.select('classification_'+ (ano)              ).eq(65))
        .or(imagem.select('classification_'+ (ano)              ).eq(15))
        .or(imagem.select('classification_'+ (ano)              ).eq(19)))
        .and((imagem.select('classification_'+ (parseInt(ano) + 1)).eq(22))
        .or(imagem.select('classification_'+ (parseInt(ano) + 1)).eq(48)).or(imagem.select('classification_'+ (parseInt(ano) + 1)).eq(65))
        .or(imagem.select('classification_'+ (parseInt(ano) + 1)).eq(15))
        .or(imagem.select('classification_'+ (parseInt(ano) + 1)).eq(19)))
        .and((imagem.select('classification_'+ (parseInt(ano)  + 2)).eq(22))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 2)).eq(48)).or(imagem.select('classification_'+ (parseInt(ano) + 2)).eq(65))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 2)).eq(15))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 2)).eq(19)))
        .and((imagem.select('classification_'+ (parseInt(ano)  + 3)).eq(22))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 3)).eq(48)).or(imagem.select('classification_'+ (parseInt(ano) + 3)).eq(65))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 3)).eq(15))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 3)).eq(19)))
        .and((imagem.select('classification_'+ (parseInt(ano)  + 4)).eq(22))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 4)).eq(48)).or(imagem.select('classification_'+ (parseInt(ano) + 4)).eq(65))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 4)).eq(15))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 4)).eq(19)))
        .and(imagem.select('classification_'+ (parseInt(ano) + 5)).eq (valor))
  var muda_img  = imagem.select('classification_'+ (ano)              ).mask(mask.eq(1)).where(mask.eq(1), valor);  
  var muda_img1 = imagem.select('classification_'+ (parseInt(ano) + 1)).mask(mask.eq(1)).where(mask.eq(1), valor);  
  var muda_img2 = imagem.select('classification_'+ (parseInt(ano) + 2)).mask(mask.eq(1)).where(mask.eq(1), valor);
  var muda_img3 = imagem.select('classification_'+ (parseInt(ano) + 3)).mask(mask.eq(1)).where(mask.eq(1), valor); 
  var muda_img4 = imagem.select('classification_'+ (parseInt(ano) + 4)).mask(mask.eq(1)).where(mask.eq(1), valor);
  var img_out = imagem.select('classification_'+ano).blend(muda_img).blend(muda_img1).blend(muda_img2).blend(muda_img3).blend(muda_img4)
  return img_out;
}

var mask82 = function(valor,ano, imagem){
  var mask = imagem.select('classification_'+ (parseInt(ano) - 1)).eq(3)
       .and((imagem.select('classification_'+ (ano)              ).eq(22))
        .or(imagem.select('classification_'+ (ano)              ).eq(48)).or(imagem.select('classification_'+ (ano)              ).eq(65))
        .or(imagem.select('classification_'+ (ano)              ).eq(15))
        .or(imagem.select('classification_'+ (ano)              ).eq(19)))
        .and((imagem.select('classification_'+ (parseInt(ano) + 1)).eq(22))
        .or(imagem.select('classification_'+ (parseInt(ano) + 1)).eq(48)).or(imagem.select('classification_'+ (parseInt(ano) + 1)).eq(65))
        .or(imagem.select('classification_'+ (parseInt(ano) + 1)).eq(15))
        .or(imagem.select('classification_'+ (parseInt(ano) + 1)).eq(19)))
        .and((imagem.select('classification_'+ (parseInt(ano)  + 2)).eq(22))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 2)).eq(48)).or(imagem.select('classification_'+ (parseInt(ano) + 2)).eq(65))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 2)).eq(15))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 2)).eq(19)))
        .and((imagem.select('classification_'+ (parseInt(ano)  + 3)).eq(22))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 3)).eq(48)).or(imagem.select('classification_'+ (parseInt(ano) + 3)).eq(65))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 3)).eq(15))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 3)).eq(19)))
        .and((imagem.select('classification_'+ (parseInt(ano)  + 4)).eq(22))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 4)).eq(48)).or(imagem.select('classification_'+ (parseInt(ano) + 4)).eq(65))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 4)).eq(15))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 4)).eq(19)))
        .and((imagem.select('classification_'+ (parseInt(ano)  + 5)).eq(22))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 5)).eq(48)).or(imagem.select('classification_'+ (parseInt(ano) + 5)).eq(65))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 5)).eq(15))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 5)).eq(19)))
        .and(imagem.select('classification_'+ (parseInt(ano) + 6)).eq (valor))
  var muda_img  = imagem.select('classification_'+ (ano)              ).mask(mask.eq(1)).where(mask.eq(1), valor);  
  var muda_img1 = imagem.select('classification_'+ (parseInt(ano) + 1)).mask(mask.eq(1)).where(mask.eq(1), valor);  
  var muda_img2 = imagem.select('classification_'+ (parseInt(ano) + 2)).mask(mask.eq(1)).where(mask.eq(1), valor);
  var muda_img3 = imagem.select('classification_'+ (parseInt(ano) + 3)).mask(mask.eq(1)).where(mask.eq(1), valor); 
  var muda_img4 = imagem.select('classification_'+ (parseInt(ano) + 4)).mask(mask.eq(1)).where(mask.eq(1), valor);
  var muda_img5 = imagem.select('classification_'+ (parseInt(ano) + 5)).mask(mask.eq(1)).where(mask.eq(1), valor);
  var img_out = imagem.select('classification_'+ano).blend(muda_img).blend(muda_img1).blend(muda_img2).blend(muda_img3).blend(muda_img4).blend(muda_img5)
  return img_out;
}

var mask92 = function(valor,ano, imagem){
  var mask = imagem.select('classification_'+ (parseInt(ano) - 1)).eq(3)
       .and((imagem.select('classification_'+ (ano)              ).eq(22))
        .or(imagem.select('classification_'+ (ano)              ).eq(48)).or(imagem.select('classification_'+ (ano)              ).eq(65))
        .or(imagem.select('classification_'+ (ano)              ).eq(15))
        .or(imagem.select('classification_'+ (ano)              ).eq(19)))
        .and((imagem.select('classification_'+ (parseInt(ano) + 1)).eq(22))
        .or(imagem.select('classification_'+ (parseInt(ano) + 1)).eq(48)).or(imagem.select('classification_'+ (parseInt(ano) + 1)).eq(65))
        .or(imagem.select('classification_'+ (parseInt(ano) + 1)).eq(15))
        .or(imagem.select('classification_'+ (parseInt(ano) + 1)).eq(19)))
        .and((imagem.select('classification_'+ (parseInt(ano)  + 2)).eq(22))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 2)).eq(48)).or(imagem.select('classification_'+ (parseInt(ano) + 2)).eq(65))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 2)).eq(15))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 2)).eq(19)))
        .and((imagem.select('classification_'+ (parseInt(ano)  + 3)).eq(22))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 3)).eq(48)).or(imagem.select('classification_'+ (parseInt(ano) + 3)).eq(65))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 3)).eq(15))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 3)).eq(19)))
        .and((imagem.select('classification_'+ (parseInt(ano)  + 4)).eq(22))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 4)).eq(48)).or(imagem.select('classification_'+ (parseInt(ano) + 4)).eq(65))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 4)).eq(15))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 4)).eq(19)))
        .and((imagem.select('classification_'+ (parseInt(ano)  + 5)).eq(22))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 5)).eq(48)).or(imagem.select('classification_'+ (parseInt(ano) + 5)).eq(65))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 5)).eq(15))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 5)).eq(19)))
        .and((imagem.select('classification_'+ (parseInt(ano)  + 6)).eq(22))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 6)).eq(48)).or(imagem.select('classification_'+ (parseInt(ano) + 6)).eq(65))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 6)).eq(15))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 6)).eq(19)))
        .and(imagem.select('classification_'+ (parseInt(ano) + 7)).eq (valor))
  var muda_img  = imagem.select('classification_'+ (ano)              ).mask(mask.eq(1)).where(mask.eq(1), valor);  
  var muda_img1 = imagem.select('classification_'+ (parseInt(ano) + 1)).mask(mask.eq(1)).where(mask.eq(1), valor);  
  var muda_img2 = imagem.select('classification_'+ (parseInt(ano) + 2)).mask(mask.eq(1)).where(mask.eq(1), valor);
  var muda_img3 = imagem.select('classification_'+ (parseInt(ano) + 3)).mask(mask.eq(1)).where(mask.eq(1), valor); 
  var muda_img4 = imagem.select('classification_'+ (parseInt(ano) + 4)).mask(mask.eq(1)).where(mask.eq(1), valor);
  var muda_img5 = imagem.select('classification_'+ (parseInt(ano) + 5)).mask(mask.eq(1)).where(mask.eq(1), valor);
  var muda_img6 = imagem.select('classification_'+ (parseInt(ano) + 6)).mask(mask.eq(1)).where(mask.eq(1), valor);
  var img_out = imagem.select('classification_'+ano).blend(muda_img).blend(muda_img1).blend(muda_img2).blend(muda_img3).blend(muda_img4).blend(muda_img5).blend(muda_img6)
  return img_out;
}

var mask102 = function(valor,ano, imagem){
  var mask = imagem.select('classification_'+ (parseInt(ano) - 1)).eq(3)
       .and((imagem.select('classification_'+ (ano)              ).eq(22))
        .or(imagem.select('classification_'+ (ano)              ).eq(48)).or(imagem.select('classification_'+ (ano)              ).eq(65))
        .or(imagem.select('classification_'+ (ano)              ).eq(15))
        .or(imagem.select('classification_'+ (ano)              ).eq(19)))
        .and((imagem.select('classification_'+ (parseInt(ano) + 1)).eq(22))
        .or(imagem.select('classification_'+ (parseInt(ano) + 1)).eq(48)).or(imagem.select('classification_'+ (parseInt(ano) + 1)).eq(65))
        .or(imagem.select('classification_'+ (parseInt(ano) + 1)).eq(15))
        .or(imagem.select('classification_'+ (parseInt(ano) + 1)).eq(19)))
        .and((imagem.select('classification_'+ (parseInt(ano)  + 2)).eq(22))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 2)).eq(48)).or(imagem.select('classification_'+ (parseInt(ano) + 2)).eq(65))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 2)).eq(15))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 2)).eq(19)))
        .and((imagem.select('classification_'+ (parseInt(ano)  + 3)).eq(22))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 3)).eq(48)).or(imagem.select('classification_'+ (parseInt(ano) + 3)).eq(65))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 3)).eq(15))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 3)).eq(19)))
        .and((imagem.select('classification_'+ (parseInt(ano)  + 4)).eq(22))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 4)).eq(48)).or(imagem.select('classification_'+ (parseInt(ano) + 4)).eq(65))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 4)).eq(15))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 4)).eq(19)))
        .and((imagem.select('classification_'+ (parseInt(ano)  + 5)).eq(22))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 5)).eq(48)).or(imagem.select('classification_'+ (parseInt(ano) + 5)).eq(65))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 5)).eq(15))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 5)).eq(19)))
        .and((imagem.select('classification_'+ (parseInt(ano)  + 6)).eq(22))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 6)).eq(48)).or(imagem.select('classification_'+ (parseInt(ano) + 6)).eq(65))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 6)).eq(15))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 6)).eq(19)))
        .and((imagem.select('classification_'+ (parseInt(ano)  + 7)).eq(22))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 7)).eq(48)).or(imagem.select('classification_'+ (parseInt(ano) + 7)).eq(65))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 7)).eq(15))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 7)).eq(19)))
        .and(imagem.select('classification_'+ (parseInt(ano) + 8)).eq (valor))
  var muda_img  = imagem.select('classification_'+ (ano)              ).mask(mask.eq(1)).where(mask.eq(1), valor);  
  var muda_img1 = imagem.select('classification_'+ (parseInt(ano) + 1)).mask(mask.eq(1)).where(mask.eq(1), valor);  
  var muda_img2 = imagem.select('classification_'+ (parseInt(ano) + 2)).mask(mask.eq(1)).where(mask.eq(1), valor);
  var muda_img3 = imagem.select('classification_'+ (parseInt(ano) + 3)).mask(mask.eq(1)).where(mask.eq(1), valor); 
  var muda_img4 = imagem.select('classification_'+ (parseInt(ano) + 4)).mask(mask.eq(1)).where(mask.eq(1), valor);
  var muda_img5 = imagem.select('classification_'+ (parseInt(ano) + 5)).mask(mask.eq(1)).where(mask.eq(1), valor);
  var muda_img6 = imagem.select('classification_'+ (parseInt(ano) + 6)).mask(mask.eq(1)).where(mask.eq(1), valor);
  var muda_img7 = imagem.select('classification_'+ (parseInt(ano) + 7)).mask(mask.eq(1)).where(mask.eq(1), valor);
  var img_out = imagem.select('classification_'+ano).blend(muda_img).blend(muda_img1).blend(muda_img2).blend(muda_img3).blend(muda_img4).blend(muda_img5).blend(muda_img6).blend(muda_img7)
  return img_out;
}

var mask112 = function(valor,ano, imagem){
  var mask = imagem.select('classification_'+ (parseInt(ano) - 1)).eq(3)
       .and((imagem.select('classification_'+ (ano)              ).eq(22))
        .or(imagem.select('classification_'+ (ano)              ).eq(48)).or(imagem.select('classification_'+ (ano)              ).eq(65))
        .or(imagem.select('classification_'+ (ano)              ).eq(15))
        .or(imagem.select('classification_'+ (ano)              ).eq(19)))
        .and((imagem.select('classification_'+ (parseInt(ano) + 1)).eq(22))
        .or(imagem.select('classification_'+ (parseInt(ano) + 1)).eq(48)).or(imagem.select('classification_'+ (parseInt(ano) + 1)).eq(65))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 1)).eq(15))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 1)).eq(19)))
        .and((imagem.select('classification_'+ (parseInt(ano)  + 2)).eq(22))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 2)).eq(48)).or(imagem.select('classification_'+ (parseInt(ano) + 2)).eq(65))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 2)).eq(15))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 2)).eq(19)))
        .and((imagem.select('classification_'+ (parseInt(ano)  + 3)).eq(22))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 3)).eq(48)).or(imagem.select('classification_'+ (parseInt(ano) + 3)).eq(65))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 3)).eq(15))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 3)).eq(19)))
        .and((imagem.select('classification_'+ (parseInt(ano)  + 4)).eq(22))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 4)).eq(48)).or(imagem.select('classification_'+ (parseInt(ano) + 4)).eq(65))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 4)).eq(15))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 4)).eq(19)))
        .and((imagem.select('classification_'+ (parseInt(ano)  + 5)).eq(22))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 5)).eq(48)).or(imagem.select('classification_'+ (parseInt(ano) + 5)).eq(65))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 5)).eq(15))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 5)).eq(19)))
        .and((imagem.select('classification_'+ (parseInt(ano)  + 6)).eq(22))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 6)).eq(48)).or(imagem.select('classification_'+ (parseInt(ano) + 6)).eq(65))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 6)).eq(15))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 6)).eq(19)))
        .and((imagem.select('classification_'+ (parseInt(ano)  + 7)).eq(22))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 7)).eq(48)).or(imagem.select('classification_'+ (parseInt(ano) + 7)).eq(65))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 7)).eq(15))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 7)).eq(19)))
        .and((imagem.select('classification_'+ (parseInt(ano)  + 8)).eq(22))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 8)).eq(48)).or(imagem.select('classification_'+ (parseInt(ano) + 8)).eq(65))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 8)).eq(15))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 8)).eq(19)))
        .and(imagem.select('classification_'+ (parseInt(ano) + 9)).eq (valor))
  var muda_img  = imagem.select('classification_'+ (ano)              ).mask(mask.eq(1)).where(mask.eq(1), valor);  
  var muda_img1 = imagem.select('classification_'+ (parseInt(ano) + 1)).mask(mask.eq(1)).where(mask.eq(1), valor);  
  var muda_img2 = imagem.select('classification_'+ (parseInt(ano) + 2)).mask(mask.eq(1)).where(mask.eq(1), valor);
  var muda_img3 = imagem.select('classification_'+ (parseInt(ano) + 3)).mask(mask.eq(1)).where(mask.eq(1), valor); 
  var muda_img4 = imagem.select('classification_'+ (parseInt(ano) + 4)).mask(mask.eq(1)).where(mask.eq(1), valor);
  var muda_img5 = imagem.select('classification_'+ (parseInt(ano) + 5)).mask(mask.eq(1)).where(mask.eq(1), valor);
  var muda_img6 = imagem.select('classification_'+ (parseInt(ano) + 6)).mask(mask.eq(1)).where(mask.eq(1), valor);
  var muda_img7 = imagem.select('classification_'+ (parseInt(ano) + 7)).mask(mask.eq(1)).where(mask.eq(1), valor);
  var muda_img8 = imagem.select('classification_'+ (parseInt(ano) + 8)).mask(mask.eq(1)).where(mask.eq(1), valor);
  var img_out = imagem.select('classification_'+ano).blend(muda_img).blend(muda_img1).blend(muda_img2).blend(muda_img3).blend(muda_img4).blend(muda_img5).blend(muda_img6).blend(muda_img7).blend(muda_img8)
  return img_out;
}

var mask122 = function(valor,ano, imagem){
  var mask = imagem.select('classification_'+ (parseInt(ano) - 1)).eq(3)
       .and((imagem.select('classification_'+ (ano)              ).eq(22))
        .or(imagem.select('classification_'+ (ano)              ).eq(48)).or(imagem.select('classification_'+ (ano)              ).eq(65))
        .or(imagem.select('classification_'+ (ano)              ).eq(15))
        .or(imagem.select('classification_'+ (ano)              ).eq(19)))
        .and((imagem.select('classification_'+ (parseInt(ano) + 1)).eq(22))
        .or(imagem.select('classification_'+ (parseInt(ano) + 1)).eq(48)).or(imagem.select('classification_'+ (parseInt(ano) + 1)).eq(65))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 1)).eq(15))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 1)).eq(19)))
        .and((imagem.select('classification_'+ (parseInt(ano)  + 2)).eq(22))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 2)).eq(48)).or(imagem.select('classification_'+ (parseInt(ano) + 2)).eq(65))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 2)).eq(15))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 2)).eq(19)))
        .and((imagem.select('classification_'+ (parseInt(ano)  + 3)).eq(22))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 3)).eq(48)).or(imagem.select('classification_'+ (parseInt(ano) + 3)).eq(65))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 3)).eq(15))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 3)).eq(19)))
        .and((imagem.select('classification_'+ (parseInt(ano)  + 4)).eq(22))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 4)).eq(48)).or(imagem.select('classification_'+ (parseInt(ano) + 4)).eq(65))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 4)).eq(15))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 4)).eq(19)))
        .and((imagem.select('classification_'+ (parseInt(ano)  + 5)).eq(22))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 5)).eq(48)).or(imagem.select('classification_'+ (parseInt(ano) + 5)).eq(65))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 5)).eq(15))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 5)).eq(19)))
        .and((imagem.select('classification_'+ (parseInt(ano)  + 6)).eq(22))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 6)).eq(48)).or(imagem.select('classification_'+ (parseInt(ano) + 6)).eq(65))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 6)).eq(15))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 6)).eq(19)))
        .and((imagem.select('classification_'+ (parseInt(ano)  + 7)).eq(22))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 7)).eq(48)).or(imagem.select('classification_'+ (parseInt(ano) + 7)).eq(65))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 7)).eq(15))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 7)).eq(19)))
        .and((imagem.select('classification_'+ (parseInt(ano)  + 8)).eq(22))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 8)).eq(48)).or(imagem.select('classification_'+ (parseInt(ano) + 8)).eq(65))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 8)).eq(15))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 8)).eq(19)))
        .and((imagem.select('classification_'+ (parseInt(ano)  + 9)).eq(22))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 9)).eq(48)).or(imagem.select('classification_'+ (parseInt(ano) + 9)).eq(65))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 9)).eq(15))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 9)).eq(19)))
        .and(imagem.select('classification_'+ (parseInt(ano) + 10)).eq (valor))
  var muda_img  = imagem.select('classification_'+ (ano)              ).mask(mask.eq(1)).where(mask.eq(1), valor);  
  var muda_img1 = imagem.select('classification_'+ (parseInt(ano) + 1)).mask(mask.eq(1)).where(mask.eq(1), valor);  
  var muda_img2 = imagem.select('classification_'+ (parseInt(ano) + 2)).mask(mask.eq(1)).where(mask.eq(1), valor);
  var muda_img3 = imagem.select('classification_'+ (parseInt(ano) + 3)).mask(mask.eq(1)).where(mask.eq(1), valor); 
  var muda_img4 = imagem.select('classification_'+ (parseInt(ano) + 4)).mask(mask.eq(1)).where(mask.eq(1), valor);
  var muda_img5 = imagem.select('classification_'+ (parseInt(ano) + 5)).mask(mask.eq(1)).where(mask.eq(1), valor);
  var muda_img6 = imagem.select('classification_'+ (parseInt(ano) + 6)).mask(mask.eq(1)).where(mask.eq(1), valor);
  var muda_img7 = imagem.select('classification_'+ (parseInt(ano) + 7)).mask(mask.eq(1)).where(mask.eq(1), valor);
  var muda_img8 = imagem.select('classification_'+ (parseInt(ano) + 8)).mask(mask.eq(1)).where(mask.eq(1), valor);
  var muda_img9 = imagem.select('classification_'+ (parseInt(ano) + 9)).mask(mask.eq(1)).where(mask.eq(1), valor);
  var img_out = imagem.select('classification_'+ano).blend(muda_img).blend(muda_img1).blend(muda_img2).blend(muda_img3).blend(muda_img4).blend(muda_img5).blend(muda_img6).blend(muda_img7).blend(muda_img8).blend(muda_img9)
  return img_out;
}

///////////////////////////////////////

var mask323 = function(valor, ano, imagem){
  var mask = imagem.select('classification_'+ (parseInt(ano) - 1)).eq (valor)
        .and((imagem.select('classification_'+ (ano)              ).eq(22))
        .or(imagem.select('classification_'+ (ano)              ).eq(48)).or(imagem.select('classification_'+ (ano)              ).eq(65))
        .or(imagem.select('classification_'+ (ano)              ).eq(15))
        .or(imagem.select('classification_'+ (ano)              ).eq(19)))
        .and((imagem.select('classification_'+ (parseInt(ano) + 1)).eq(22))
        .or(imagem.select('classification_'+ (parseInt(ano) + 1)).eq(48)).or(imagem.select('classification_'+ (parseInt(ano) + 1)).eq(65))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 1)).eq(15))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 1)).eq(19)))
  var muda_img = imagem.select('classification_'+ (ano)    ).mask(mask.eq(1)).where(mask.eq(1), valor);  
  var img_out = imagem.select('classification_'+ano).blend(muda_img)
  return img_out;
}

var mask423 = function(valor, ano, imagem){
  var mask = imagem.select('classification_'+ (parseInt(ano) - 1)).eq (valor)
        .and((imagem.select('classification_'+ (ano)              ).eq(22))
        .or(imagem.select('classification_'+ (ano)              ).eq(48)).or(imagem.select('classification_'+ (ano)              ).eq(65))
        .or(imagem.select('classification_'+ (ano)              ).eq(15))
        .or(imagem.select('classification_'+ (ano)              ).eq(19)))
        .and((imagem.select('classification_'+ (parseInt(ano) + 1)).eq(22))
        .or(imagem.select('classification_'+ (parseInt(ano) + 1)).eq(48)).or(imagem.select('classification_'+ (parseInt(ano) + 1)).eq(65))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 1)).eq(15))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 1)).eq(19)))
        .and((imagem.select('classification_'+ (parseInt(ano) + 2)).eq(22))
        .or(imagem.select('classification_'+ (parseInt(ano) + 2)).eq(48)).or(imagem.select('classification_'+ (parseInt(ano) + 2)).eq(65))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 2)).eq(15))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 2)).eq(19)))
  var muda_img  = imagem.select('classification_'+ (ano)              ).mask(mask.eq(1)).where(mask.eq(1), valor);  
  var muda_img1 = imagem.select('classification_'+ (parseInt(ano) + 1)).mask(mask.eq(1)).where(mask.eq(1), valor); 
  var img_out = imagem.select('classification_'+ano).blend(muda_img).blend(muda_img1)
  return img_out;
}

var mask523 = function(valor, ano, imagem){
  var mask = imagem.select('classification_'+ (parseInt(ano) - 1)).eq (valor)
        .and((imagem.select('classification_'+ (ano)              ).eq(22))
        .or(imagem.select('classification_'+ (ano)              ).eq(48)).or(imagem.select('classification_'+ (ano)              ).eq(65))
        .or(imagem.select('classification_'+ (ano)              ).eq(15))
        .or(imagem.select('classification_'+ (ano)              ).eq(19)))
        .and((imagem.select('classification_'+ (parseInt(ano) + 1)).eq(22))
        .or(imagem.select('classification_'+ (parseInt(ano) + 1)).eq(48)).or(imagem.select('classification_'+ (parseInt(ano) + 1)).eq(65))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 1)).eq(15))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 1)).eq(19)))
        .and((imagem.select('classification_'+ (parseInt(ano) + 2)).eq(22))
        .or(imagem.select('classification_'+ (parseInt(ano) + 2)).eq(48)).or(imagem.select('classification_'+ (parseInt(ano) + 2)).eq(65))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 2)).eq(15))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 2)).eq(19)))
        .and((imagem.select('classification_'+ (parseInt(ano) + 3)).eq(22))
        .or(imagem.select('classification_'+ (parseInt(ano) + 3)).eq(48)).or(imagem.select('classification_'+ (parseInt(ano) + 3)).eq(65))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 3)).eq(15))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 3)).eq(19)))
  var muda_img  = imagem.select('classification_'+ (ano)              ).mask(mask.eq(1)).where(mask.eq(1), valor);  
  var muda_img1 = imagem.select('classification_'+ (parseInt(ano) + 1)).mask(mask.eq(1)).where(mask.eq(1), valor);  
  var muda_img2 = imagem.select('classification_'+ (parseInt(ano) + 2)).mask(mask.eq(1)).where(mask.eq(1), valor);  
  var img_out = imagem.select('classification_'+ano).blend(muda_img).blend(muda_img1).blend(muda_img2)
  return img_out;
}

var mask623 = function(valor, ano, imagem){
  var mask = imagem.select('classification_'+ (parseInt(ano) - 1)).eq (valor)
        .and((imagem.select('classification_'+ (ano)              ).eq(22))
        .or(imagem.select('classification_'+ (ano)              ).eq(48)).or(imagem.select('classification_'+ (ano)              ).eq(65))
        .or(imagem.select('classification_'+ (ano)              ).eq(15))
        .or(imagem.select('classification_'+ (ano)              ).eq(19)))
        .and((imagem.select('classification_'+ (parseInt(ano) + 1)).eq(22))
        .or(imagem.select('classification_'+ (parseInt(ano) + 1)).eq(48)).or(imagem.select('classification_'+ (parseInt(ano) + 1)).eq(65))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 1)).eq(15))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 1)).eq(19)))
        .and((imagem.select('classification_'+ (parseInt(ano) + 2)).eq(22))
        .or(imagem.select('classification_'+ (parseInt(ano) + 2)).eq(48)).or(imagem.select('classification_'+ (parseInt(ano) + 2)).eq(65))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 2)).eq(15))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 2)).eq(19)))
        .and((imagem.select('classification_'+ (parseInt(ano) + 3)).eq(22))
        .or(imagem.select('classification_'+ (parseInt(ano) + 3)).eq(48)).or(imagem.select('classification_'+ (parseInt(ano) + 3)).eq(65))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 3)).eq(15))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 3)).eq(19)))
        .and((imagem.select('classification_'+ (parseInt(ano) + 4)).eq(22))
        .or(imagem.select('classification_'+ (parseInt(ano) + 4)).eq(48)).or(imagem.select('classification_'+ (parseInt(ano) + 4)).eq(65))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 4)).eq(15))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 4)).eq(19)))
  var muda_img  = imagem.select('classification_'+ (ano)              ).mask(mask.eq(1)).where(mask.eq(1), valor);  
  var muda_img1 = imagem.select('classification_'+ (parseInt(ano) + 1)).mask(mask.eq(1)).where(mask.eq(1), valor);  
  var muda_img2 = imagem.select('classification_'+ (parseInt(ano) + 2)).mask(mask.eq(1)).where(mask.eq(1), valor);
  var muda_img3 = imagem.select('classification_'+ (parseInt(ano) + 3)).mask(mask.eq(1)).where(mask.eq(1), valor); 
  var img_out = imagem.select('classification_'+ano).blend(muda_img).blend(muda_img1).blend(muda_img2).blend(muda_img3)
  return img_out;
}

var mask723 = function(valor,ano, imagem){
  var mask = imagem.select('classification_'+ (parseInt(ano) - 1)).eq (valor)
        .and((imagem.select('classification_'+ (ano)              ).eq(22))
        .or(imagem.select('classification_'+ (ano)              ).eq(48)).or(imagem.select('classification_'+ (ano)              ).eq(65))
        .or(imagem.select('classification_'+ (ano)              ).eq(15))
        .or(imagem.select('classification_'+ (ano)              ).eq(19)))
        .and((imagem.select('classification_'+ (parseInt(ano) + 1)).eq(22))
        .or(imagem.select('classification_'+ (parseInt(ano) + 1)).eq(48)).or(imagem.select('classification_'+ (parseInt(ano) + 1)).eq(65))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 1)).eq(15))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 1)).eq(19)))
        .and((imagem.select('classification_'+ (parseInt(ano) + 2)).eq(22))
        .or(imagem.select('classification_'+ (parseInt(ano) + 2)).eq(48)).or(imagem.select('classification_'+ (parseInt(ano) + 2)).eq(65))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 2)).eq(15))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 2)).eq(19)))
        .and((imagem.select('classification_'+ (parseInt(ano) + 3)).eq(22))
        .or(imagem.select('classification_'+ (parseInt(ano) + 3)).eq(48)).or(imagem.select('classification_'+ (parseInt(ano) + 3)).eq(65))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 3)).eq(15))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 3)).eq(19)))
        .and((imagem.select('classification_'+ (parseInt(ano) + 4)).eq(22))
        .or(imagem.select('classification_'+ (parseInt(ano) + 4)).eq(48)).or(imagem.select('classification_'+ (parseInt(ano) + 4)).eq(65))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 4)).eq(15))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 4)).eq(19)))
        .and((imagem.select('classification_'+ (parseInt(ano) + 5)).eq(22))
        .or(imagem.select('classification_'+ (parseInt(ano) + 5)).eq(48)).or(imagem.select('classification_'+ (parseInt(ano) + 5)).eq(65))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 5)).eq(15))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 5)).eq(19)))
  var muda_img  = imagem.select('classification_'+ (ano)              ).mask(mask.eq(1)).where(mask.eq(1), valor);  
  var muda_img1 = imagem.select('classification_'+ (parseInt(ano) + 1)).mask(mask.eq(1)).where(mask.eq(1), valor);  
  var muda_img2 = imagem.select('classification_'+ (parseInt(ano) + 2)).mask(mask.eq(1)).where(mask.eq(1), valor);
  var muda_img3 = imagem.select('classification_'+ (parseInt(ano) + 3)).mask(mask.eq(1)).where(mask.eq(1), valor); 
  var muda_img4 = imagem.select('classification_'+ (parseInt(ano) + 4)).mask(mask.eq(1)).where(mask.eq(1), valor);
  var img_out = imagem.select('classification_'+ano).blend(muda_img).blend(muda_img1).blend(muda_img2).blend(muda_img3).blend(muda_img4)
  return img_out;
}

var mask823 = function(valor,ano, imagem){
  var mask = imagem.select('classification_'+ (parseInt(ano) - 1)).eq (valor)
        .and((imagem.select('classification_'+ (ano)              ).eq(22))
        .or(imagem.select('classification_'+ (ano)              ).eq(48)).or(imagem.select('classification_'+ (ano)              ).eq(65))
        .or(imagem.select('classification_'+ (ano)              ).eq(15))
        .or(imagem.select('classification_'+ (ano)              ).eq(19)))
        .and((imagem.select('classification_'+ (parseInt(ano) + 1)).eq(22))
        .or(imagem.select('classification_'+ (parseInt(ano) + 1)).eq(48)).or(imagem.select('classification_'+ (parseInt(ano) + 1)).eq(65))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 1)).eq(15))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 1)).eq(19)))
        .and((imagem.select('classification_'+ (parseInt(ano) + 2)).eq(22))
        .or(imagem.select('classification_'+ (parseInt(ano) + 2)).eq(48)).or(imagem.select('classification_'+ (parseInt(ano) + 2)).eq(65))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 2)).eq(15))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 2)).eq(19)))
        .and((imagem.select('classification_'+ (parseInt(ano) + 3)).eq(22))
        .or(imagem.select('classification_'+ (parseInt(ano) + 3)).eq(48)).or(imagem.select('classification_'+ (parseInt(ano) + 3)).eq(65))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 3)).eq(15))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 3)).eq(19)))
        .and((imagem.select('classification_'+ (parseInt(ano) + 4)).eq(22))
        .or(imagem.select('classification_'+ (parseInt(ano) + 4)).eq(48)).or(imagem.select('classification_'+ (parseInt(ano) + 4)).eq(65))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 4)).eq(15))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 4)).eq(19)))
        .and((imagem.select('classification_'+ (parseInt(ano) + 5)).eq(22))
        .or(imagem.select('classification_'+ (parseInt(ano) + 5)).eq(48)).or(imagem.select('classification_'+ (parseInt(ano) + 5)).eq(65))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 5)).eq(15))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 5)).eq(19)))
        .and((imagem.select('classification_'+ (parseInt(ano) + 6)).eq(22))
        .or(imagem.select('classification_'+ (parseInt(ano) + 6)).eq(48)).or(imagem.select('classification_'+ (parseInt(ano) + 6)).eq(65))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 6)).eq(15))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 6)).eq(19)))
  var muda_img  = imagem.select('classification_'+ (ano)              ).mask(mask.eq(1)).where(mask.eq(1), valor);  
  var muda_img1 = imagem.select('classification_'+ (parseInt(ano) + 1)).mask(mask.eq(1)).where(mask.eq(1), valor);  
  var muda_img2 = imagem.select('classification_'+ (parseInt(ano) + 2)).mask(mask.eq(1)).where(mask.eq(1), valor);
  var muda_img3 = imagem.select('classification_'+ (parseInt(ano) + 3)).mask(mask.eq(1)).where(mask.eq(1), valor); 
  var muda_img4 = imagem.select('classification_'+ (parseInt(ano) + 4)).mask(mask.eq(1)).where(mask.eq(1), valor);
  var muda_img5 = imagem.select('classification_'+ (parseInt(ano) + 5)).mask(mask.eq(1)).where(mask.eq(1), valor);
  var img_out = imagem.select('classification_'+ano).blend(muda_img).blend(muda_img1).blend(muda_img2).blend(muda_img3).blend(muda_img4).blend(muda_img5)
  return img_out;
}

var mask923 = function(valor,ano, imagem){
  var mask = imagem.select('classification_'+ (parseInt(ano) - 1)).eq (valor)
        .and((imagem.select('classification_'+ (ano)              ).eq(22))
        .or(imagem.select('classification_'+ (ano)              ).eq(48)).or(imagem.select('classification_'+ (ano)              ).eq(65))
        .or(imagem.select('classification_'+ (ano)              ).eq(15))
        .or(imagem.select('classification_'+ (ano)              ).eq(19)))
        .and((imagem.select('classification_'+ (parseInt(ano) + 1)).eq(22))
        .or(imagem.select('classification_'+ (parseInt(ano) + 1)).eq(48)).or(imagem.select('classification_'+ (parseInt(ano) + 1)).eq(65))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 1)).eq(15))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 1)).eq(19)))
        .and((imagem.select('classification_'+ (parseInt(ano) + 2)).eq(22))
        .or(imagem.select('classification_'+ (parseInt(ano) + 2)).eq(48)).or(imagem.select('classification_'+ (parseInt(ano) + 2)).eq(65))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 2)).eq(15))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 2)).eq(19)))
        .and((imagem.select('classification_'+ (parseInt(ano) + 3)).eq(22))
        .or(imagem.select('classification_'+ (parseInt(ano) + 3)).eq(48)).or(imagem.select('classification_'+ (parseInt(ano) + 3)).eq(65))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 3)).eq(15))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 3)).eq(19)))
        .and((imagem.select('classification_'+ (parseInt(ano) + 4)).eq(22))
        .or(imagem.select('classification_'+ (parseInt(ano) + 4)).eq(48)).or(imagem.select('classification_'+ (parseInt(ano) + 4)).eq(65))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 4)).eq(15))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 4)).eq(19)))
        .and((imagem.select('classification_'+ (parseInt(ano) + 5)).eq(22))
        .or(imagem.select('classification_'+ (parseInt(ano) + 5)).eq(48)).or(imagem.select('classification_'+ (parseInt(ano) + 5)).eq(65))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 5)).eq(15))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 5)).eq(19)))
        .and((imagem.select('classification_'+ (parseInt(ano) + 6)).eq(22))
        .or(imagem.select('classification_'+ (parseInt(ano) + 6)).eq(48)).or(imagem.select('classification_'+ (parseInt(ano) + 6)).eq(65))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 6)).eq(15))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 6)).eq(19)))
        .and((imagem.select('classification_'+ (parseInt(ano) + 7)).eq(22))
        .or(imagem.select('classification_'+ (parseInt(ano) + 7)).eq(48)).or(imagem.select('classification_'+ (parseInt(ano) + 7)).eq(65))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 7)).eq(15))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 7)).eq(19)))
  var muda_img  = imagem.select('classification_'+ (ano)              ).mask(mask.eq(1)).where(mask.eq(1), valor);  
  var muda_img1 = imagem.select('classification_'+ (parseInt(ano) + 1)).mask(mask.eq(1)).where(mask.eq(1), valor);  
  var muda_img2 = imagem.select('classification_'+ (parseInt(ano) + 2)).mask(mask.eq(1)).where(mask.eq(1), valor);
  var muda_img3 = imagem.select('classification_'+ (parseInt(ano) + 3)).mask(mask.eq(1)).where(mask.eq(1), valor); 
  var muda_img4 = imagem.select('classification_'+ (parseInt(ano) + 4)).mask(mask.eq(1)).where(mask.eq(1), valor);
  var muda_img5 = imagem.select('classification_'+ (parseInt(ano) + 5)).mask(mask.eq(1)).where(mask.eq(1), valor);
  var muda_img6 = imagem.select('classification_'+ (parseInt(ano) + 6)).mask(mask.eq(1)).where(mask.eq(1), valor);
  var img_out = imagem.select('classification_'+ano).blend(muda_img).blend(muda_img1).blend(muda_img2).blend(muda_img3).blend(muda_img4).blend(muda_img5).blend(muda_img6)
  return img_out;
}

var mask1023 = function(valor,ano, imagem){
  var mask = imagem.select('classification_'+ (parseInt(ano) - 1)).eq (valor)
        .and((imagem.select('classification_'+ (ano)              ).eq(22))
        .or(imagem.select('classification_'+ (ano)              ).eq(48)).or(imagem.select('classification_'+ (ano)              ).eq(65))
        .or(imagem.select('classification_'+ (ano)              ).eq(15))
        .or(imagem.select('classification_'+ (ano)              ).eq(19)))
        .and((imagem.select('classification_'+ (parseInt(ano) + 1)).eq(22))
        .or(imagem.select('classification_'+ (parseInt(ano) + 1)).eq(48)).or(imagem.select('classification_'+ (parseInt(ano) + 1)).eq(65))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 1)).eq(15))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 1)).eq(19)))
        .and((imagem.select('classification_'+ (parseInt(ano) + 2)).eq(22))
        .or(imagem.select('classification_'+ (parseInt(ano) + 2)).eq(48)).or(imagem.select('classification_'+ (parseInt(ano) + 2)).eq(65))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 2)).eq(15))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 2)).eq(19)))
        .and((imagem.select('classification_'+ (parseInt(ano) + 3)).eq(22))
        .or(imagem.select('classification_'+ (parseInt(ano) + 3)).eq(48)).or(imagem.select('classification_'+ (parseInt(ano) + 3)).eq(65))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 3)).eq(15))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 3)).eq(19)))
        .and((imagem.select('classification_'+ (parseInt(ano) + 4)).eq(22))
        .or(imagem.select('classification_'+ (parseInt(ano) + 4)).eq(48)).or(imagem.select('classification_'+ (parseInt(ano) + 4)).eq(65))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 4)).eq(15))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 4)).eq(19)))
        .and((imagem.select('classification_'+ (parseInt(ano) + 5)).eq(22))
        .or(imagem.select('classification_'+ (parseInt(ano) + 5)).eq(48)).or(imagem.select('classification_'+ (parseInt(ano) + 5)).eq(65))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 5)).eq(15))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 5)).eq(19)))
        .and((imagem.select('classification_'+ (parseInt(ano) + 6)).eq(22))
        .or(imagem.select('classification_'+ (parseInt(ano) + 6)).eq(48)).or(imagem.select('classification_'+ (parseInt(ano) + 6)).eq(65))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 6)).eq(15))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 6)).eq(19)))
        .and((imagem.select('classification_'+ (parseInt(ano) + 7)).eq(22))
        .or(imagem.select('classification_'+ (parseInt(ano) + 7)).eq(48)).or(imagem.select('classification_'+ (parseInt(ano) + 7)).eq(65))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 7)).eq(15))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 7)).eq(19)))
        .and((imagem.select('classification_'+ (parseInt(ano) + 8)).eq(22))
        .or(imagem.select('classification_'+ (parseInt(ano) + 8)).eq(48)).or(imagem.select('classification_'+ (parseInt(ano) + 8)).eq(65))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 8)).eq(15))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 8)).eq(19)))
  var muda_img  = imagem.select('classification_'+ (ano)              ).mask(mask.eq(1)).where(mask.eq(1), valor);  
  var muda_img1 = imagem.select('classification_'+ (parseInt(ano) + 1)).mask(mask.eq(1)).where(mask.eq(1), valor);  
  var muda_img2 = imagem.select('classification_'+ (parseInt(ano) + 2)).mask(mask.eq(1)).where(mask.eq(1), valor);
  var muda_img3 = imagem.select('classification_'+ (parseInt(ano) + 3)).mask(mask.eq(1)).where(mask.eq(1), valor); 
  var muda_img4 = imagem.select('classification_'+ (parseInt(ano) + 4)).mask(mask.eq(1)).where(mask.eq(1), valor);
  var muda_img5 = imagem.select('classification_'+ (parseInt(ano) + 5)).mask(mask.eq(1)).where(mask.eq(1), valor);
  var muda_img6 = imagem.select('classification_'+ (parseInt(ano) + 6)).mask(mask.eq(1)).where(mask.eq(1), valor);
  var muda_img7 = imagem.select('classification_'+ (parseInt(ano) + 7)).mask(mask.eq(1)).where(mask.eq(1), valor);
  var img_out = imagem.select('classification_'+ano).blend(muda_img).blend(muda_img1).blend(muda_img2).blend(muda_img3).blend(muda_img4).blend(muda_img5).blend(muda_img6).blend(muda_img7)
  return img_out;
}

var mask1123 = function(valor,ano, imagem){
  var mask = imagem.select('classification_'+ (parseInt(ano) - 1)).eq (valor)
        .and((imagem.select('classification_'+ (ano)              ).eq(22))
        .or(imagem.select('classification_'+ (ano)              ).eq(48)).or(imagem.select('classification_'+ (ano)              ).eq(65))
        .or(imagem.select('classification_'+ (ano)              ).eq(15))
        .or(imagem.select('classification_'+ (ano)              ).eq(19)))
        .and((imagem.select('classification_'+ (parseInt(ano) + 1)).eq(22))
        .or(imagem.select('classification_'+ (parseInt(ano) + 1)).eq(48)).or(imagem.select('classification_'+ (parseInt(ano) + 1)).eq(65))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 1)).eq(15))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 1)).eq(19)))
        .and((imagem.select('classification_'+ (parseInt(ano) + 2)).eq(22))
        .or(imagem.select('classification_'+ (parseInt(ano) + 2)).eq(48)).or(imagem.select('classification_'+ (parseInt(ano) + 2)).eq(65))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 2)).eq(15))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 2)).eq(19)))
        .and((imagem.select('classification_'+ (parseInt(ano) + 3)).eq(22))
        .or(imagem.select('classification_'+ (parseInt(ano) + 3)).eq(48)).or(imagem.select('classification_'+ (parseInt(ano) + 3)).eq(65))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 3)).eq(15))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 3)).eq(19)))
        .and((imagem.select('classification_'+ (parseInt(ano) + 4)).eq(22))
        .or(imagem.select('classification_'+ (parseInt(ano) + 4)).eq(48)).or(imagem.select('classification_'+ (parseInt(ano) + 4)).eq(65))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 4)).eq(15))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 4)).eq(19)))
        .and((imagem.select('classification_'+ (parseInt(ano) + 5)).eq(22))
        .or(imagem.select('classification_'+ (parseInt(ano) + 5)).eq(48)).or(imagem.select('classification_'+ (parseInt(ano) + 5)).eq(65))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 5)).eq(15))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 5)).eq(19)))
        .and((imagem.select('classification_'+ (parseInt(ano) + 6)).eq(22))
        .or(imagem.select('classification_'+ (parseInt(ano) + 6)).eq(48)).or(imagem.select('classification_'+ (parseInt(ano) + 6)).eq(65))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 6)).eq(15))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 6)).eq(19)))
        .and((imagem.select('classification_'+ (parseInt(ano) + 7)).eq(22))
        .or(imagem.select('classification_'+ (parseInt(ano) + 7)).eq(48)).or(imagem.select('classification_'+ (parseInt(ano) + 7)).eq(65))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 7)).eq(15))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 7)).eq(19)))
        .and((imagem.select('classification_'+ (parseInt(ano) + 8)).eq(22))
        .or(imagem.select('classification_'+ (parseInt(ano) + 8)).eq(48)).or(imagem.select('classification_'+ (parseInt(ano) + 8)).eq(65))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 8)).eq(15))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 8)).eq(19)))
        .and((imagem.select('classification_'+ (parseInt(ano) + 9)).eq(22))
        .or(imagem.select('classification_'+ (parseInt(ano) + 9)).eq(48)).or(imagem.select('classification_'+ (parseInt(ano) + 9)).eq(65))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 9)).eq(15))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 9)).eq(19)))
  var muda_img  = imagem.select('classification_'+ (ano)              ).mask(mask.eq(1)).where(mask.eq(1), valor);  
  var muda_img1 = imagem.select('classification_'+ (parseInt(ano) + 1)).mask(mask.eq(1)).where(mask.eq(1), valor);  
  var muda_img2 = imagem.select('classification_'+ (parseInt(ano) + 2)).mask(mask.eq(1)).where(mask.eq(1), valor);
  var muda_img3 = imagem.select('classification_'+ (parseInt(ano) + 3)).mask(mask.eq(1)).where(mask.eq(1), valor); 
  var muda_img4 = imagem.select('classification_'+ (parseInt(ano) + 4)).mask(mask.eq(1)).where(mask.eq(1), valor);
  var muda_img5 = imagem.select('classification_'+ (parseInt(ano) + 5)).mask(mask.eq(1)).where(mask.eq(1), valor);
  var muda_img6 = imagem.select('classification_'+ (parseInt(ano) + 6)).mask(mask.eq(1)).where(mask.eq(1), valor);
  var muda_img7 = imagem.select('classification_'+ (parseInt(ano) + 7)).mask(mask.eq(1)).where(mask.eq(1), valor);
  var muda_img8 = imagem.select('classification_'+ (parseInt(ano) + 8)).mask(mask.eq(1)).where(mask.eq(1), valor);
  var img_out = imagem.select('classification_'+ano).blend(muda_img).blend(muda_img1).blend(muda_img2).blend(muda_img3).blend(muda_img4).blend(muda_img5).blend(muda_img6).blend(muda_img7).blend(muda_img8)
  return img_out;
}

var mask1223 = function(valor,ano, imagem){
  var mask = imagem.select('classification_'+ (parseInt(ano) - 1)).eq (valor)
        .and((imagem.select('classification_'+ (ano)              ).eq(22))
        .or(imagem.select('classification_'+ (ano)              ).eq(48)).or(imagem.select('classification_'+ (ano)              ).eq(65))
        .or(imagem.select('classification_'+ (ano)              ).eq(15))
        .or(imagem.select('classification_'+ (ano)              ).eq(19)))
        .and((imagem.select('classification_'+ (parseInt(ano) + 1)).eq(22))
        .or(imagem.select('classification_'+ (parseInt(ano) + 1)).eq(48)).or(imagem.select('classification_'+ (parseInt(ano) + 1)).eq(65))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 1)).eq(15))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 1)).eq(19)))
        .and((imagem.select('classification_'+ (parseInt(ano) + 2)).eq(22))
        .or(imagem.select('classification_'+ (parseInt(ano) + 2)).eq(48)).or(imagem.select('classification_'+ (parseInt(ano) + 2)).eq(65))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 2)).eq(15))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 2)).eq(19)))
        .and((imagem.select('classification_'+ (parseInt(ano) + 3)).eq(22))
        .or(imagem.select('classification_'+ (parseInt(ano) + 3)).eq(48)).or(imagem.select('classification_'+ (parseInt(ano) + 3)).eq(65))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 3)).eq(15))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 3)).eq(19)))
        .and((imagem.select('classification_'+ (parseInt(ano) + 4)).eq(22))
        .or(imagem.select('classification_'+ (parseInt(ano) + 4)).eq(48)).or(imagem.select('classification_'+ (parseInt(ano) + 4)).eq(65))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 4)).eq(15))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 4)).eq(19)))
        .and((imagem.select('classification_'+ (parseInt(ano) + 5)).eq(22))
        .or(imagem.select('classification_'+ (parseInt(ano) + 5)).eq(48)).or(imagem.select('classification_'+ (parseInt(ano) + 5)).eq(65))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 5)).eq(15))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 5)).eq(19)))
        .and((imagem.select('classification_'+ (parseInt(ano) + 6)).eq(22))
        .or(imagem.select('classification_'+ (parseInt(ano) + 6)).eq(48)).or(imagem.select('classification_'+ (parseInt(ano) + 6)).eq(65))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 6)).eq(15))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 6)).eq(19)))
        .and((imagem.select('classification_'+ (parseInt(ano) + 7)).eq(22))
        .or(imagem.select('classification_'+ (parseInt(ano) + 7)).eq(48)).or(imagem.select('classification_'+ (parseInt(ano) + 7)).eq(65))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 7)).eq(15))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 7)).eq(19)))
        .and((imagem.select('classification_'+ (parseInt(ano) + 8)).eq(22))
        .or(imagem.select('classification_'+ (parseInt(ano) + 8)).eq(48)).or(imagem.select('classification_'+ (parseInt(ano) + 8)).eq(65))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 8)).eq(15))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 8)).eq(19)))
        .and((imagem.select('classification_'+ (parseInt(ano) + 9)).eq(22))
        .or(imagem.select('classification_'+ (parseInt(ano) + 9)).eq(48)).or(imagem.select('classification_'+ (parseInt(ano) + 9)).eq(65))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 9)).eq(15))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 9)).eq(19)))
        .and((imagem.select('classification_'+ (parseInt(ano) + 10)).eq(22))
        .or(imagem.select('classification_'+ (parseInt(ano) + 10)).eq(48)).or(imagem.select('classification_'+ (parseInt(ano) + 10)).eq(65))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 10)).eq(15))
        .or(imagem.select('classification_'+ (parseInt(ano)   + 10)).eq(19)))
  var muda_img  = imagem.select('classification_'+ (ano)              ).mask(mask.eq(1)).where(mask.eq(1), valor);  
  var muda_img1 = imagem.select('classification_'+ (parseInt(ano) + 1)).mask(mask.eq(1)).where(mask.eq(1), valor);  
  var muda_img2 = imagem.select('classification_'+ (parseInt(ano) + 2)).mask(mask.eq(1)).where(mask.eq(1), valor);
  var muda_img3 = imagem.select('classification_'+ (parseInt(ano) + 3)).mask(mask.eq(1)).where(mask.eq(1), valor); 
  var muda_img4 = imagem.select('classification_'+ (parseInt(ano) + 4)).mask(mask.eq(1)).where(mask.eq(1), valor);
  var muda_img5 = imagem.select('classification_'+ (parseInt(ano) + 5)).mask(mask.eq(1)).where(mask.eq(1), valor);
  var muda_img6 = imagem.select('classification_'+ (parseInt(ano) + 6)).mask(mask.eq(1)).where(mask.eq(1), valor);
  var muda_img7 = imagem.select('classification_'+ (parseInt(ano) + 7)).mask(mask.eq(1)).where(mask.eq(1), valor);
  var muda_img8 = imagem.select('classification_'+ (parseInt(ano) + 8)).mask(mask.eq(1)).where(mask.eq(1), valor);
  var muda_img9 = imagem.select('classification_'+ (parseInt(ano) + 9)).mask(mask.eq(1)).where(mask.eq(1), valor);
var img_out = imagem.select('classification_'+ano).blend(muda_img).blend(muda_img1).blend(muda_img2).blend(muda_img3).blend(muda_img4).blend(muda_img5).blend(muda_img6).blend(muda_img7).blend(muda_img8).blend(muda_img9)
  return img_out;
}

var anos3 = [1986, 1987, 
    1988, 1989, 1990, 1991, 
    1992, 1993, 1994, 1995, 
    1996, 1997, 1998, 1999,
    2000, 2001, 2002, 2003, 
    2004, 2005, 2006, 2007, 
    2008, 2009, 2010, 2011, 
    2012, 2013, 2014, 2015, 
    2016, 2017, 2018, 2019,
    2020,2021]
    
var anos4 = [1986, 1987, 
    1988, 1989, 1990, 1991, 
    1992, 1993, 1994, 1995, 
    1996, 1997, 1998, 1999,
    2000, 2001, 2002, 2003, 
    2004, 2005, 2006, 2007, 
    2008, 2009, 2010, 2011, 
    2012, 2013, 2014, 2015, 
    2016, 2017, 2018, 2019,2020]   
    
var anos5 = [1986, 1987, 
    1988, 1989, 1990, 1991, 
    1992, 1993, 1994, 1995, 
    1996, 1997, 1998, 1999,
    2000, 2001, 2002, 2003, 
    2004, 2005, 2006, 2007, 
    2008, 2009, 2010, 2011, 
    2012, 2013, 2014, 2015, 
    2016, 2017, 2018,2019]
    
var anos6 = [1986, 1987, 
    1988, 1989, 1990, 1991, 
    1992, 1993, 1994, 1995, 
    1996, 1997, 1998, 1999,
    2000, 2001, 2002, 2003, 
    2004, 2005, 2006, 2007, 
    2008, 2009, 2010, 2011, 
    2012, 2013, 2014, 2015, 
    2016, 2017,2018]
    
var anos7 = [1986, 1987, 
    1988, 1989, 1990, 1991, 
    1992, 1993, 1994, 1995, 
    1996, 1997, 1998, 1999,
    2000, 2001, 2002, 2003, 
    2004, 2005, 2006, 2007, 
    2008, 2009, 2010, 2011, 
    2012, 2013, 2014, 2015, 
    2016,2017]
    
var anos8 = [1986, 1987, 
    1988, 1989, 1990, 1991, 
    1992, 1993, 1994, 1995, 
    1996, 1997, 1998, 1999,
    2000, 2001, 2002, 2003, 
    2004, 2005, 2006, 2007, 
    2008, 2009, 2010, 2011, 
    2012, 2013, 2014, 2015,2016]
    
var anos9 = [1986, 1987, 
    1988, 1989, 1990, 1991, 
    1992, 1993, 1994, 1995, 
    1996, 1997, 1998, 1999,
    2000, 2001, 2002, 2003, 
    2004, 2005, 2006, 2007, 
    2008, 2009, 2010, 2011, 
    2012, 2013, 2014,2015]   
    
var anos10 = [1986, 1987, 
    1988, 1989, 1990, 1991, 
    1992, 1993, 1994, 1995, 
    1996, 1997, 1998, 1999,
    2000, 2001, 2002, 2003, 
    2004, 2005, 2006, 2007, 
    2008, 2009, 2010, 2011, 
    2012, 2013,2014] 
    
var anos11 = [1986, 1987, 
    1988, 1989, 1990, 1991, 
    1992, 1993, 1994, 1995, 
    1996, 1997, 1998, 1999,
    2000, 2001, 2002, 2003, 
    2004, 2005, 2006, 2007, 
    2008, 2009, 2010, 2011, 
    2012,2013] 
    
var anos12 = [1986, 1987, 
    1988, 1989, 1990, 1991, 
    1992, 1993, 1994, 1995, 
    1996, 1997, 1998, 1999,
    2000, 2001, 2002, 2003, 
    2004, 2005, 2006, 2007, 
    2008, 2009, 2010, 2011,2012]
    
var window12years = function(imagem, valor){
   var img_out = imagem.select('classification_1985')
   for (var i_ano=0;i_ano<anos12.length; i_ano++){  
     var ano = anos12[i_ano];  
     img_out = img_out.addBands(mask12(valor,ano, imagem)) }
     img_out = img_out.addBands(imagem.select('classification_2013'))
     img_out = img_out.addBands(imagem.select('classification_2014'))
     img_out = img_out.addBands(imagem.select('classification_2015'))
     img_out = img_out.addBands(imagem.select('classification_2016'))
     img_out = img_out.addBands(imagem.select('classification_2017'))
     img_out = img_out.addBands(imagem.select('classification_2018'))
     img_out = img_out.addBands(imagem.select('classification_2019'))
     img_out = img_out.addBands(imagem.select('classification_2020'))
     img_out = img_out.addBands(imagem.select('classification_2021'))
     img_out = img_out.addBands(imagem.select('classification_2022'))
   return img_out
}

var window11years = function(imagem, valor){
   var img_out = imagem.select('classification_1985')
   for (var i_ano=0;i_ano<anos11.length; i_ano++){  
     var ano = anos11[i_ano];  
     img_out = img_out.addBands(mask11(valor,ano, imagem)) }
     img_out = img_out.addBands(imagem.select('classification_2014'))
     img_out = img_out.addBands(imagem.select('classification_2015'))
     img_out = img_out.addBands(imagem.select('classification_2016'))
     img_out = img_out.addBands(imagem.select('classification_2017'))
     img_out = img_out.addBands(imagem.select('classification_2018'))
     img_out = img_out.addBands(imagem.select('classification_2019'))
     img_out = img_out.addBands(imagem.select('classification_2020'))
     img_out = img_out.addBands(imagem.select('classification_2021'))
     img_out = img_out.addBands(imagem.select('classification_2022'))
   return img_out
}

var window10years = function(imagem, valor){
   var img_out = imagem.select('classification_1985')
   for (var i_ano=0;i_ano<anos10.length; i_ano++){  
     var ano = anos10[i_ano];  
     img_out = img_out.addBands(mask10(valor,ano, imagem)) }
     img_out = img_out.addBands(imagem.select('classification_2015'))
     img_out = img_out.addBands(imagem.select('classification_2016'))
     img_out = img_out.addBands(imagem.select('classification_2017'))
     img_out = img_out.addBands(imagem.select('classification_2018'))
     img_out = img_out.addBands(imagem.select('classification_2019'))
     img_out = img_out.addBands(imagem.select('classification_2020'))
     img_out = img_out.addBands(imagem.select('classification_2021'))
     img_out = img_out.addBands(imagem.select('classification_2022'))
   return img_out
}

var window9years = function(imagem, valor){
   var img_out = imagem.select('classification_1985')
   for (var i_ano=0;i_ano<anos9.length; i_ano++){  
     var ano = anos9[i_ano];  
     img_out = img_out.addBands(mask9(valor,ano, imagem)) }
     img_out = img_out.addBands(imagem.select('classification_2016'))
     img_out = img_out.addBands(imagem.select('classification_2017'))
     img_out = img_out.addBands(imagem.select('classification_2018'))
     img_out = img_out.addBands(imagem.select('classification_2019'))
     img_out = img_out.addBands(imagem.select('classification_2020'))
     img_out = img_out.addBands(imagem.select('classification_2021'))
     img_out = img_out.addBands(imagem.select('classification_2022'))
   return img_out
}

var window8years = function(imagem, valor){
   var img_out = imagem.select('classification_1985')
   for (var i_ano=0;i_ano<anos8.length; i_ano++){  
     var ano = anos8[i_ano];  
     img_out = img_out.addBands(mask8(valor,ano, imagem)) }
     img_out = img_out.addBands(imagem.select('classification_2017'))
     img_out = img_out.addBands(imagem.select('classification_2018'))
     img_out = img_out.addBands(imagem.select('classification_2019'))
     img_out = img_out.addBands(imagem.select('classification_2020'))
     img_out = img_out.addBands(imagem.select('classification_2021'))
     img_out = img_out.addBands(imagem.select('classification_2022'))
   return img_out
}

var window7years = function(imagem, valor){
   var img_out = imagem.select('classification_1985')
   for (var i_ano=0;i_ano<anos7.length; i_ano++){  
     var ano = anos7[i_ano];  
     img_out = img_out.addBands(mask7(valor,ano, imagem)) }
     img_out = img_out.addBands(imagem.select('classification_2018'))
     img_out = img_out.addBands(imagem.select('classification_2019'))
     img_out = img_out.addBands(imagem.select('classification_2020'))
     img_out = img_out.addBands(imagem.select('classification_2021'))
     img_out = img_out.addBands(imagem.select('classification_2022'))
   return img_out
}

var window6years = function(imagem, valor){
   var img_out = imagem.select('classification_1985')
   for (var i_ano=0;i_ano<anos6.length; i_ano++){  
     var ano = anos6[i_ano];  
     img_out = img_out.addBands(mask6(valor,ano, imagem)) }
     img_out = img_out.addBands(imagem.select('classification_2019'))
     img_out = img_out.addBands(imagem.select('classification_2020'))
     img_out = img_out.addBands(imagem.select('classification_2021'))
     img_out = img_out.addBands(imagem.select('classification_2022'))
   return img_out
}

var window5years = function(imagem, valor){
   var img_out = imagem.select('classification_1985')
   for (var i_ano=0;i_ano<anos5.length; i_ano++){  
     var ano = anos5[i_ano];  
     img_out = img_out.addBands(mask5(valor,ano, imagem)) }
     img_out = img_out.addBands(imagem.select('classification_2020'))
     img_out = img_out.addBands(imagem.select('classification_2021'))
     img_out = img_out.addBands(imagem.select('classification_2022'))
   return img_out
}

var window4years = function(imagem, valor){
   var img_out = imagem.select('classification_1985')
   for (var i_ano=0;i_ano<anos4.length; i_ano++){  
     var ano = anos4[i_ano];  
     img_out = img_out.addBands(mask4(valor,ano, imagem)) }
     img_out = img_out.addBands(imagem.select('classification_2021'))
     img_out = img_out.addBands(imagem.select('classification_2022'))
   return img_out
}

var window3years = function(imagem, valor){
   var img_out = imagem.select('classification_1985')
   for (var i_ano=0;i_ano<anos3.length; i_ano++){  
     var ano = anos3[i_ano];   
     img_out = img_out.addBands(mask3(valor,ano, imagem)) }
     img_out = img_out.addBands(imagem.select('classification_2022'))
   return img_out
}

/////////////////////////

var window12years2 = function(imagem, valor){
   var img_out = imagem.select('classification_1985')
   for (var i_ano=0;i_ano<anos12.length; i_ano++){  
     var ano = anos12[i_ano];  
     img_out = img_out.addBands(mask122(valor,ano, imagem)) }
     img_out = img_out.addBands(imagem.select('classification_2013'))
     img_out = img_out.addBands(imagem.select('classification_2014'))
     img_out = img_out.addBands(imagem.select('classification_2015'))
     img_out = img_out.addBands(imagem.select('classification_2016'))
     img_out = img_out.addBands(imagem.select('classification_2017'))
     img_out = img_out.addBands(imagem.select('classification_2018'))
     img_out = img_out.addBands(imagem.select('classification_2019'))
     img_out = img_out.addBands(imagem.select('classification_2020'))
     img_out = img_out.addBands(imagem.select('classification_2021'))
     img_out = img_out.addBands(imagem.select('classification_2022'))
   return img_out
}

var window11years2 = function(imagem, valor){
   var img_out = imagem.select('classification_1985')
   for (var i_ano=0;i_ano<anos11.length; i_ano++){  
     var ano = anos11[i_ano];  
     img_out = img_out.addBands(mask112(valor,ano, imagem)) }
     img_out = img_out.addBands(imagem.select('classification_2014'))
     img_out = img_out.addBands(imagem.select('classification_2015'))
     img_out = img_out.addBands(imagem.select('classification_2016'))
     img_out = img_out.addBands(imagem.select('classification_2017'))
     img_out = img_out.addBands(imagem.select('classification_2018'))
     img_out = img_out.addBands(imagem.select('classification_2019'))
     img_out = img_out.addBands(imagem.select('classification_2020'))
     img_out = img_out.addBands(imagem.select('classification_2021'))
     img_out = img_out.addBands(imagem.select('classification_2022'))
   return img_out
}

var window10years2 = function(imagem, valor){
   var img_out = imagem.select('classification_1985')
   for (var i_ano=0;i_ano<anos10.length; i_ano++){  
     var ano = anos10[i_ano];  
     img_out = img_out.addBands(mask102(valor,ano, imagem)) }
     img_out = img_out.addBands(imagem.select('classification_2015'))
     img_out = img_out.addBands(imagem.select('classification_2016'))
     img_out = img_out.addBands(imagem.select('classification_2017'))
     img_out = img_out.addBands(imagem.select('classification_2018'))
     img_out = img_out.addBands(imagem.select('classification_2019'))
     img_out = img_out.addBands(imagem.select('classification_2020'))
     img_out = img_out.addBands(imagem.select('classification_2021'))
     img_out = img_out.addBands(imagem.select('classification_2022'))
   return img_out
}

var window9years2 = function(imagem, valor){
   var img_out = imagem.select('classification_1985')
   for (var i_ano=0;i_ano<anos9.length; i_ano++){  
     var ano = anos9[i_ano];  
     img_out = img_out.addBands(mask92(valor,ano, imagem)) }
     img_out = img_out.addBands(imagem.select('classification_2016'))
     img_out = img_out.addBands(imagem.select('classification_2017'))
     img_out = img_out.addBands(imagem.select('classification_2018'))
     img_out = img_out.addBands(imagem.select('classification_2019'))
     img_out = img_out.addBands(imagem.select('classification_2020'))
     img_out = img_out.addBands(imagem.select('classification_2021'))
     img_out = img_out.addBands(imagem.select('classification_2022'))
   return img_out
}

var window8years2 = function(imagem, valor){
   var img_out = imagem.select('classification_1985')
   for (var i_ano=0;i_ano<anos8.length; i_ano++){  
     var ano = anos8[i_ano];  
     img_out = img_out.addBands(mask82(valor,ano, imagem)) }
     img_out = img_out.addBands(imagem.select('classification_2017'))
     img_out = img_out.addBands(imagem.select('classification_2018'))
     img_out = img_out.addBands(imagem.select('classification_2019'))
     img_out = img_out.addBands(imagem.select('classification_2020'))
     img_out = img_out.addBands(imagem.select('classification_2021'))
     img_out = img_out.addBands(imagem.select('classification_2022'))
   return img_out
}


var window7years2 = function(imagem, valor){
   var img_out = imagem.select('classification_1985')
   for (var i_ano=0;i_ano<anos7.length; i_ano++){  
     var ano = anos7[i_ano];  
     img_out = img_out.addBands(mask72(valor, ano, imagem)) }
     img_out = img_out.addBands(imagem.select('classification_2018'))
     img_out = img_out.addBands(imagem.select('classification_2019'))
     img_out = img_out.addBands(imagem.select('classification_2020'))
     img_out = img_out.addBands(imagem.select('classification_2021'))
     img_out = img_out.addBands(imagem.select('classification_2022'))
   return img_out
}

var window6years2 = function(imagem, valor){
   var img_out = imagem.select('classification_1985')
   for (var i_ano=0;i_ano<anos6.length; i_ano++){  
     var ano = anos6[i_ano];  
     img_out = img_out.addBands(mask62(valor, ano, imagem)) }
     img_out = img_out.addBands(imagem.select('classification_2019'))
     img_out = img_out.addBands(imagem.select('classification_2020'))
     img_out = img_out.addBands(imagem.select('classification_2021'))
     img_out = img_out.addBands(imagem.select('classification_2022'))
   return img_out
}

var window5years2 = function(imagem, valor){
   var img_out = imagem.select('classification_1985')
   for (var i_ano=0;i_ano<anos5.length; i_ano++){  
     var ano = anos5[i_ano];  
     img_out = img_out.addBands(mask52(valor, ano, imagem)) }
     img_out = img_out.addBands(imagem.select('classification_2020'))
     img_out = img_out.addBands(imagem.select('classification_2021'))
     img_out = img_out.addBands(imagem.select('classification_2022'))
   return img_out
}

var window4years2 = function(imagem, valor){
   var img_out = imagem.select('classification_1985')
   for (var i_ano=0;i_ano<anos4.length; i_ano++){  
     var ano = anos4[i_ano];  
     img_out = img_out.addBands(mask42(valor, ano, imagem)) }
     img_out = img_out.addBands(imagem.select('classification_2021'))
     img_out = img_out.addBands(imagem.select('classification_2022'))
   return img_out
}

var window3years2 = function(imagem, valor){
   var img_out = imagem.select('classification_1985')
   for (var i_ano=0;i_ano<anos3.length; i_ano++){  
     var ano = anos3[i_ano];   
     img_out = img_out.addBands(mask32(valor, ano, imagem)) }
     img_out = img_out.addBands(imagem.select('classification_2022'))
   return img_out
}

/////////////////////////

var window12years3 = function(imagem, valor){
   var img_out = imagem.select('classification_1985')
   for (var i_ano=0;i_ano<anos12.length; i_ano++){  
     var ano = anos12[i_ano];  
     img_out = img_out.addBands(mask1223(valor,ano, imagem)) }
     img_out = img_out.addBands(imagem.select('classification_2013'))
     img_out = img_out.addBands(imagem.select('classification_2014'))
     img_out = img_out.addBands(imagem.select('classification_2015'))
     img_out = img_out.addBands(imagem.select('classification_2016'))
     img_out = img_out.addBands(imagem.select('classification_2017'))
     img_out = img_out.addBands(imagem.select('classification_2018'))
     img_out = img_out.addBands(imagem.select('classification_2019'))
     img_out = img_out.addBands(imagem.select('classification_2020'))
     img_out = img_out.addBands(imagem.select('classification_2021'))
     img_out = img_out.addBands(imagem.select('classification_2022'))
   return img_out
}

var window11years3 = function(imagem, valor){
   var img_out = imagem.select('classification_1985')
   for (var i_ano=0;i_ano<anos11.length; i_ano++){  
     var ano = anos11[i_ano];  
     img_out = img_out.addBands(mask1123(valor,ano, imagem)) }
     img_out = img_out.addBands(imagem.select('classification_2014'))
     img_out = img_out.addBands(imagem.select('classification_2015'))
     img_out = img_out.addBands(imagem.select('classification_2016'))
     img_out = img_out.addBands(imagem.select('classification_2017'))
     img_out = img_out.addBands(imagem.select('classification_2018'))
     img_out = img_out.addBands(imagem.select('classification_2019'))
     img_out = img_out.addBands(imagem.select('classification_2020'))
     img_out = img_out.addBands(imagem.select('classification_2021'))
     img_out = img_out.addBands(imagem.select('classification_2022'))
   return img_out
}

var window10years3 = function(imagem, valor){
   var img_out = imagem.select('classification_1985')
   for (var i_ano=0;i_ano<anos10.length; i_ano++){  
     var ano = anos10[i_ano];  
     img_out = img_out.addBands(mask1023(valor,ano, imagem)) }
     img_out = img_out.addBands(imagem.select('classification_2015'))
     img_out = img_out.addBands(imagem.select('classification_2016'))
     img_out = img_out.addBands(imagem.select('classification_2017'))
     img_out = img_out.addBands(imagem.select('classification_2018'))
     img_out = img_out.addBands(imagem.select('classification_2019'))
     img_out = img_out.addBands(imagem.select('classification_2020'))
     img_out = img_out.addBands(imagem.select('classification_2021'))
     img_out = img_out.addBands(imagem.select('classification_2022'))
   return img_out
}

var window9years3 = function(imagem, valor){
   var img_out = imagem.select('classification_1985')
   for (var i_ano=0;i_ano<anos9.length; i_ano++){  
     var ano = anos9[i_ano];  
     img_out = img_out.addBands(mask923(valor,ano, imagem)) }
     img_out = img_out.addBands(imagem.select('classification_2016'))
     img_out = img_out.addBands(imagem.select('classification_2017'))
     img_out = img_out.addBands(imagem.select('classification_2018'))
     img_out = img_out.addBands(imagem.select('classification_2019'))
     img_out = img_out.addBands(imagem.select('classification_2020'))
     img_out = img_out.addBands(imagem.select('classification_2021'))
     img_out = img_out.addBands(imagem.select('classification_2022'))
   return img_out
}

var window8years3 = function(imagem, valor){
   var img_out = imagem.select('classification_1985')
   for (var i_ano=0;i_ano<anos8.length; i_ano++){  
     var ano = anos8[i_ano];  
     img_out = img_out.addBands(mask823(valor,ano, imagem)) }
     img_out = img_out.addBands(imagem.select('classification_2017'))
     img_out = img_out.addBands(imagem.select('classification_2018'))
     img_out = img_out.addBands(imagem.select('classification_2019'))
     img_out = img_out.addBands(imagem.select('classification_2020'))
     img_out = img_out.addBands(imagem.select('classification_2021'))
     img_out = img_out.addBands(imagem.select('classification_2022'))
   return img_out
}


var window7years3 = function(imagem, valor){
   var img_out = imagem.select('classification_1985')
   for (var i_ano=0;i_ano<anos7.length; i_ano++){  
     var ano = anos7[i_ano];  
     img_out = img_out.addBands(mask723(valor, ano, imagem)) }
     img_out = img_out.addBands(imagem.select('classification_2018'))
     img_out = img_out.addBands(imagem.select('classification_2019'))
     img_out = img_out.addBands(imagem.select('classification_2020'))
     img_out = img_out.addBands(imagem.select('classification_2021'))
     img_out = img_out.addBands(imagem.select('classification_2022'))
   return img_out
}

var window6years3 = function(imagem, valor){
   var img_out = imagem.select('classification_1985')
   for (var i_ano=0;i_ano<anos6.length; i_ano++){  
     var ano = anos6[i_ano];  
     img_out = img_out.addBands(mask623(valor, ano, imagem)) }
     img_out = img_out.addBands(imagem.select('classification_2019'))
     img_out = img_out.addBands(imagem.select('classification_2020'))
     img_out = img_out.addBands(imagem.select('classification_2021'))
     img_out = img_out.addBands(imagem.select('classification_2022'))
   return img_out
}

var window5years3 = function(imagem, valor){
   var img_out = imagem.select('classification_1985')
   for (var i_ano=0;i_ano<anos5.length; i_ano++){  
     var ano = anos5[i_ano];  
     img_out = img_out.addBands(mask523(valor, ano, imagem)) }
     img_out = img_out.addBands(imagem.select('classification_2020'))
     img_out = img_out.addBands(imagem.select('classification_2021'))
     img_out = img_out.addBands(imagem.select('classification_2022'))
   return img_out
}

var window4years3 = function(imagem, valor){
   var img_out = imagem.select('classification_1985')
   for (var i_ano=0;i_ano<anos4.length; i_ano++){  
     var ano = anos4[i_ano];  
     img_out = img_out.addBands(mask423(valor, ano, imagem)) }
     img_out = img_out.addBands(imagem.select('classification_2021'))
     img_out = img_out.addBands(imagem.select('classification_2022'))
   return img_out
}

var window3years3 = function(imagem, valor){
   var img_out = imagem.select('classification_1985')
   for (var i_ano=0;i_ano<anos3.length; i_ano++){  
     var ano = anos3[i_ano];   
     img_out = img_out.addBands(mask323(valor, ano, imagem)) }
     img_out = img_out.addBands(imagem.select('classification_2022'))
   return img_out
}

var filtered = image_FE

for (var i_class=0;i_class<middle_plant.length; i_class++){  
   var id_class = middle_plant[i_class]; 
   filtered = window12years2(filtered, id_class)
   filtered = window11years2(filtered, id_class)
   filtered = window10years2(filtered, id_class)
   filtered = window9years2(filtered, id_class)
   filtered = window8years2(filtered, id_class)
   filtered = window7years2(filtered, id_class)
   filtered = window6years2(filtered, id_class)
   filtered = window5years2(filtered, id_class)
   filtered = window4years2(filtered, id_class)
   filtered = window3years2(filtered, id_class)
}

for (var i_class=0;i_class<middle_plant.length; i_class++){  
   var id_class = middle_plant[i_class]; 
   filtered = window12years3(filtered, id_class)
   filtered = window11years3(filtered, id_class)
   filtered = window10years3(filtered, id_class)
   filtered = window9years3(filtered, id_class)
   filtered = window8years3(filtered, id_class)
   filtered = window7years3(filtered, id_class)
   filtered = window6years3(filtered, id_class)
   filtered = window5years3(filtered, id_class)
   filtered = window4years3(filtered, id_class)
   filtered = window3years3(filtered, id_class)
}

for (var i_class=0;i_class<middle_plant.length; i_class++){  
   var id_class = middle_plant[i_class]; 
   filtered = window12years(filtered, id_class)
   filtered = window11years(filtered, id_class)
   filtered = window10years(filtered, id_class)
   filtered = window9years(filtered, id_class)
   filtered = window8years(filtered, id_class)
   filtered = window7years(filtered, id_class)
   filtered = window6years(filtered, id_class)
   filtered = window5years(filtered, id_class)
   filtered = window4years(filtered, id_class)
   filtered = window3years(filtered, id_class)
}

for (var i_class=0;i_class<ordem_exec_first.length; i_class++){  
   var id_class = ordem_exec_first[i_class]; 
   filtered = mask3first(id_class, filtered)
}

for (var i_class=0;i_class<ordem_exec_last.length; i_class++){  
   var id_class = ordem_exec_last[i_class]; 
   filtered = mask3last(id_class, filtered)
}


print(image_FE, "original")
Map.addLayer(image_FE.select(6), vis, 'original 1990');

print(filtered,'filtered')
Map.addLayer(filtered.select(6), vis, 'filtered 1990');

Export.image.toAsset({
  "image": filtered.toInt8(),
  "description": 'filter_temporal_'+version_out,
  "assetId": dir_pre_class + '/step_08d_filter_temporal_plantaciones_col3_'+version_out,
  "scale": 30,
  "pyramidingPolicy": {
      '.default': 'mode'
  },
  "maxPixels": 1e13,
  "region": regions
}); 