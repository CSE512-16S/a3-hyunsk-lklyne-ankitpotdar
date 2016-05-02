var map = {
  svg: null,
  features: null,
  filtered: null,
  init: function(features){
    this.features = features;
    this.filtered = features;
    this.dataMap = new Datamap({
      element: $(".map")[0],
      fills: {
        defaultFill: "rgba(220,220,220,0.9)" // Any hex, color name or rgb/rgba value
      }
    });
    this.drawBubbles(this.filtered);
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

  update: function(startDate, endDate){
    startDate = moment.isDate(startDate)? startDate : new Date();
    endDate = moment.isDate(endDate)? endDate : new Date();


   this.filtered  =  _.filter(this.features, function(val) {

      return (val.time.getTime() >=startDate.getTime() && val.time.getTime() <=endDate.getTime());
   });


    //$(".map svg").remove();
    //
    //this.dataMap = new Datamap({
    //  element: $(".map")[0],
    //  fills: {
    //    defaultFill: "rgba(220,220,220,0.9)" // Any hex, color name or rgb/rgba value
    //  }
    //});

    
    this.drawBubbles(this.filtered);
  }




}