var map = {
  svg: null,
  features: null,
  init: function(features){
    var that = this;
    this.features = features;
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
    this.drawBubbles(this.features);


    /*Take this out -- for testing only*/
    $('#startDate').on("change",function(){

      var tempStart = moment("2016-01-01").add($(this).val(),'days');
      var tempend =  moment(tempStart).add(30,'days');

      that.update(tempStart.toDate(),tempend.toDate());
    });

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
    var dateRange =this.dateFilter(this.features,startDate,endDate);
    this.drawBubbles(dateRange);
  },


  dateFilter:function(dataset,startDate, endDate){
    startDate = moment.isDate(startDate)? startDate : new Date();
    endDate = moment.isDate(endDate)? endDate : new Date();
    return  _.filter(dataset, function(val) {
      return val.time.getTime() >=startDate.getTime() && val.time.getTime() <=endDate.getTime();
    });
  }









}