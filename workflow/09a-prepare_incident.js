var year = 2021

var dir_pre_class = 'projects/mapbiomas_af_trinacional/COLLECTION3/filters'
var vesion_in = 'v1'
var version_out = 'v1'

var num_incidentes = 5 //minimum value of incidentes

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
  
  
var anos =[1985, 1986, 1987, 
    1988, 1989, 1990, 1991, 
    1992, 1993, 1994, 1995, 
    1996, 1997, 1998, 1999,
    2000, 2001, 2002, 2003, 
    2004, 2005, 2006, 2007, 
    2008, 2009, 2010, 2011, 
    2012, 2013, 2014, 2015, 
    2016, 2017, 2018, 2019,
    2020, 2021,2022]

var classeIds =  [3,11,12,22,33]   //[3,13,21,25,33]
var newClasseIds = [3,11,12,22,33] //[3,13,21,25,33]

var imc_carta2 = ee.Image(dir_pre_class + '/step_08g_frequency_filter_col3_'+version_out)

var colList = ee.List([])
for (var i_ano=0;i_ano<anos.length; i_ano++){
  var ano = anos[i_ano];
  var colList = colList.add(imc_carta2.select(['classification_'+ano],['classification']))
}
var imc_carta = ee.ImageCollection(colList)

var img1 =  ee.Image(imc_carta.first());

var image_moda = imc_carta2.reduce(ee.Reducer.mode());

// ******* incidence **********
var imagefirst = img1.addBands(ee.Image(0)).rename(["classification", "incidence"]);

var incidence = function(imgActual, imgPrevious){
  
  imgActual = ee.Image(imgActual);
  imgPrevious = ee.Image(imgPrevious);
  
  var imgincidence = imgPrevious.select(["incidence"]);
  
  var classification0 = imgPrevious.select(["classification"]);
  var classification1 = imgActual.select(["classification"]);
  
  
  var change  = ee.Image(0);
  change = change.where(classification0.neq(classification1), 1);
  imgincidence = imgincidence.where(change.eq(1), imgincidence.add(1));
  
  return imgActual.addBands(imgincidence);
  
};

var imc_carta4 = imc_carta.map(function(image) {
    image = image.remap(classeIds, newClasseIds) //21)
    image = image.mask(image.neq(27));
    return image.rename('classification');
});

Map.addLayer(imc_carta4, vis, 'imc_carta4');

var image_incidence = ee.Image(imc_carta4.iterate(incidence, imagefirst)).select(["incidence"]);
//image_incidence = image_incidence.clip(geometry);

var palette_incidence = ["#C8C8C8","#FED266","#FBA713","#cb701b", "#cb701b", "#a95512", "#a95512", "#662000",  "#662000", "#cb181d"]
imc_carta2 = imc_carta2.select(['classification_1985', 'classification_1986', 'classification_1987', 'classification_1988', 'classification_1989', 
                                'classification_1990', 'classification_1991', 'classification_1992', 'classification_1993', 'classification_1994', 
                                'classification_1995', 'classification_1996', 'classification_1997', 'classification_1998', 'classification_1999',
                                'classification_2000', 'classification_2001', 'classification_2002', 'classification_2003', 'classification_2004', 
                                'classification_2005', 'classification_2006', 'classification_2007', 'classification_2008', 'classification_2009', 
                                'classification_2010', 'classification_2011', 'classification_2012', 'classification_2013', 'classification_2014',
                                'classification_2015', 'classification_2016', 'classification_2017', 'classification_2018', 'classification_2019',
                                'classification_2020','classification_2021','classification_2022'],
                               //['2000', '2001', '2002','2003', '2004', '2005','2006', '2007', '2008','2009', '2010', '2011','2012', '2013', '2014',
                                //'2015', '2016', '2017', '2018', '2019'])
                                ["1985", "1986", "1987", "1988", "1989", "1990", "1991", 
                                "1992", "1993", "1994", "1995", "1996", "1997", "1998", "1999",
                                "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", 
                                "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", 
                                "2016", "2017", "2018", "2019", "2020", "2021","2022"])
//Map.addLayer(imc_carta2, vis, 'MapBiomas');

image_incidence = image_incidence.mask(image_incidence.gt(num_incidentes))

image_incidence = image_incidence.addBands(image_incidence.where(image_incidence.gt(6),1).rename('valor1'))
image_incidence = image_incidence.addBands(image_incidence.select('valor1').connectedPixelCount(100,false).rename('connect'))
image_incidence = image_incidence.addBands(image_moda)
print(image_incidence)
Map.addLayer(image_incidence, {}, "incidents");

Export.image.toAsset({
  "image": image_incidence.toInt8(),
  "description": 'filter_incidente_prepare_'+version_out,
  "assetId": dir_pre_class + '/step_09a_filter_incidente_prepare_col3_'+version_out,
  "scale": 30,
  "pyramidingPolicy": {
      '.default': 'mode'
  },
  "maxPixels": 1e13,
  "region": regions
});    
