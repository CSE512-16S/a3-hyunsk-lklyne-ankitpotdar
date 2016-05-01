function normalizeFeatures(data){
  var features = []
  _.forEach(data.features, function(val, i){
    var feature = val.properties;
    feature.id = val.id;
    feature.latitude = val.geometry.coordinates[1];
    feature.longitude = val.geometry.coordinates[0];
    feature.depth = val.geometry.coordinates[2];

    feature.radius = val.properties.mag;

    features.push(feature);
  });

  return features;
}

$().ready(function(){
  d3.json("../assets/dataset.json", function(err, data){
    var features;
    features = normalizeFeatures(data);
    map.init(features);
  });
});
