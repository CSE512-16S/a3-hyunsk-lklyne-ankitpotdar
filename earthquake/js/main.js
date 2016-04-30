var quakeData = null;
var features = [];

var worldMap = {
  svg: null,
  init: function(){
    worldMap.dataMap = new Datamap({
      element: $(".map")[0]
    });
    worldMap.drawBubbles();
  },
  drawBubbles: function(){
    worldMap.dataMap.bubbles(features);
  }
}

function normalizeFeatures(){
  _.forEach(quakeData.features, function(val, i){
    var feature = val.properties;
    feature.id = val.id;
    feature.latitude = val.geometry.coordinates[1];
    feature.longitude = val.geometry.coordinates[0];
    feature.depth = val.geometry.coordinates[2];

    feature.radius = val.properties.mag;

    features.push(feature);
  });
}

$().ready(function(){
  d3.json("../assets/dataset.json", function(err, data){
    quakeData = data;
    normalizeFeatures();
    worldMap.init();
  });
});
