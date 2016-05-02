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
    var features;
    features = normalizeFeatures(data);
    map.init(features);
  });
});
