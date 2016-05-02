var features = null;

var timeSlider = null;
var magSlider = null;


var dataTransformer = {

  normalizeFeatures: function (data){
  var features = []
  _.forEach(data.features, function(val, i){
    var feature = val.properties;
    feature.id = val.id;
    feature.latitude = val.geometry.coordinates[1];
    feature.longitude = val.geometry.coordinates[0];
    feature.depth = val.geometry.coordinates[2];
    feature.mag = val.properties.mag;
    feature.radius = Math.pow(1.4,val.properties.mag);
    feature.borderWidth = 0;
    feature.fillOpacity = 0.33;
    //doing startOf to have common grouping by date.
    feature.time =moment(val.properties.time).startOf('day').toDate();
    features.push(feature);
  });

  return features;
},


  computeAllFilters:function (dataset,dateStart,dateEnd, magStart,magEnd){
    var filteredDate =  this.dateFilter(dataset,dateStart,dateEnd);
    var filteredDateAndMag = this.magFilter(filteredDate,magStart,magEnd);
    map.update(filteredDateAndMag);
  },

  dateFilter: function (dataset,startDate, endDate){
    startDate = moment.isDate(startDate)? startDate : new Date();
    endDate = moment.isDate(endDate)? endDate : new Date();
    return  _.filter(dataset, function(val) {
      return val.time.getTime() >=startDate.getTime() && val.time.getTime() <=endDate.getTime();
    });
  },

  magFilter:function (dataset,startMag, endMag){
    startMag = !isNaN(startMag)?startMag:0;
    endMag = !isNaN(endMag)?endMag:10;
    return _.filter(dataset, function(val){
      return val.mag>=startMag && val.mag<=endMag;
    });
  },

  countByDate: function (dataset){
    var aggregateArray = [];
    var aggregate =  _.countBy(dataset, function(val){
      return val.time.getTime();
    });
    var keys = Object.keys(aggregate);
    for(var i = 0;i< keys.length;i++){
      var temp = {};
      temp.time = moment(parseInt(keys[i])).toDate();
      temp.count = aggregate[keys[i]];
      aggregateArray.push(temp);
    }
    return aggregateArray;
  }
}




$().ready(function(){
  d3.json("../assets/histogram/countData-4months-sorted.json", function(err, data){
    
  });
  d3.json("../assets/dataset-4months.json", function(err, data){
    features = dataTransformer.normalizeFeatures(data);
    map.init(features);
    countsByDate = dataTransformer.countByDate(features);
    timelineHistogram(countsByDate, ".timeline");
  });
  initControls();

});



function  initControls(){
  var dateStart = null;
  var dateEnd = null;
  var magStart = null;
  var magEnd = null;

  timeSlider = $('.date-slider')[0];
  noUiSlider.create(timeSlider, {
    start: [20, 80],
    step: 1,
    range: {
      'min': [ 0 ],
      'max': [ 120 ]
    }
  });

  timeSlider.noUiSlider.on('change', function(){
    dateStart = moment("2016-01-01").add( timeSlider.noUiSlider.get()[0],'days').toDate();
    dateEnd =  moment("2016-01-01").add( timeSlider.noUiSlider.get()[1],'days').toDate();
    magStart = magSlider.noUiSlider.get()[0];
    magEnd =   magSlider.noUiSlider.get()[1];
    dataTransformer.computeAllFilters(features,dateStart,dateEnd,magStart,magEnd)
  });



  magSlider = $('.mag-slider')[0];
  noUiSlider.create(magSlider, {
    start: [2.5, 10],
    step: 0.1,
    range: {
      'min': [ 0 ],
      'max': [ 10 ]
    }
  });

  magSlider.noUiSlider.on('change', function(){
    dateStart = moment("2016-01-01").add( timeSlider.noUiSlider.get()[0],'days').toDate();
    dateEnd =  moment("2016-01-01").add( timeSlider.noUiSlider.get()[1],'days').toDate();
    magStart = magSlider.noUiSlider.get()[0];
    magEnd =   magSlider.noUiSlider.get()[1];
    dataTransformer.computeAllFilters(features,dateStart,dateEnd,magStart,magEnd);
  });
}







