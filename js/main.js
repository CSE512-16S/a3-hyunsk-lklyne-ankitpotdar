var features = null;

function normalizeFeatures(data){
  var features = []
  _.forEach(data.features, function(val, i){
    var feature = val.properties;
    feature.id = val.id;
    feature.latitude = val.geometry.coordinates[1];
    feature.longitude = val.geometry.coordinates[0];
    feature.depth = val.geometry.coordinates[2];
    feature.mag = val.properties.mag;
    feature.radius = Math.pow(1.5,val.properties.mag);
    feature.borderWidth = 0;
    feature.fillOpacity = 0.33;
    feature.time =moment(val.properties.time).toDate();
    features.push(feature);
  });

  return features;
}

$().ready(function(){
  d3.json("../assets/histogram/countData-4months-sorted.json", function(err, data){
    timelineHistogram(data, ".timeline");
  });
  d3.json("../assets/dataset-4months.json", function(err, data){
    features = normalizeFeatures(data);
    map.init(features);
  });


  /*Take this out -- for testing only*/
  $('#startDate').on("change",function(){
    var tempStart = moment("2016-01-01").add($(this).val(),'days');
    var tempend =  moment(tempStart).add(30,'days');
    map.update(dateFilter(features,tempStart.toDate(),tempend.toDate()));

  });

});


function dateFilter(dataset,startDate, endDate){
  startDate = moment.isDate(startDate)? startDate : new Date();
  endDate = moment.isDate(endDate)? endDate : new Date();
  return  _.filter(dataset, function(val) {
    return val.time.getTime() >=startDate.getTime() && val.time.getTime() <=endDate.getTime();
  });
}

