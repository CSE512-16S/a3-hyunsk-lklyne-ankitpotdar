var map = {
  svg: null,
  features: null,
  init: function(features){
    this.features = features;
    this.dataMap = new Datamap({
      element: $(".map")[0]
    });
    this.drawBubbles();
  },
  drawBubbles: function(){
    this.dataMap.bubbles(this.features);
  }
}