var map = {
  svg: null,
  init: function(features){
    this.dataMap = new Datamap({
      element: $(".map")[0],
      fills: {
        defaultFill: "rgba(220,220,220,0.9)" // Any hex, color name or rgb/rgba value
      },
      geographyConfig: {
        popupOnHover: false,
        highlightOnHover: false
      },
    });
    this.drawBubbles(features);

  },

  drawBubbles: function(dataset){
    this.dataMap.bubbles(dataset,{
      popupTemplate: function (geo, data) {
        return ['<div class="hoverinfo">',
          "Magnitude: " +  data.mag ,
            "<br/>Place: " + data.place,
            "<br/> Date: " + moment(data.time).format("MM/DD/YYYY"),
          "</div>"].join("");
      }});
  },

  update: function(data){
    this.drawBubbles(data);
  }












}