var quakeData = null;

var worldMap = {
  svg: null,
  init: function(){
    worldMap.svg = new Datamap({
      element: $(".map")[0]
    });
  },
  drawBubbles: function(){
  }
}

$().ready(function(){
  d3.json("../assets/dataset.json", function(err, data){
    quakeData = data;
  });

  worldMap.init();
});
