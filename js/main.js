var timeSlider = null;
var magSlider = null;
var timeline = null;
var showMap = false;


var dataTransformer = {

  _features: null,
  _currentOpt: {},


  normalizeFeatures: function (data) {
    var features = []
    _.forEach(data.features, function (val, i) {
      var feature = val.properties;
      feature.id = val.id;
      feature.latitude = val.geometry.coordinates[1];
      feature.longitude = val.geometry.coordinates[0];
      feature.depth = val.geometry.coordinates[2];
      feature.mag = val.properties.mag;
      feature.radius = Math.pow(1.4, val.properties.mag);
      feature.borderWidth = 0;
      feature.fillOpacity = 0.33;
      //doing startOf to have common grouping by date.
      feature.time = moment(val.properties.time).startOf('day').toDate();
      features.push(feature);
    });

    this._features = features;

    return features;
  },


  computeAllFilters: function (options) {
    var filteredData = this._features;
    _.extend(this._currentOpt, options);

    if (this._currentOpt.dateStart != null){
      filteredData = this.dateFilter(filteredData, this._currentOpt.dateStart, this._currentOpt.dateEnd);
    }
    if (this._currentOpt.magStart != null){
      filteredData = this.magFilter(filteredData, this._currentOpt.magStart, this._currentOpt.magEnd);
    }
    map.update(filteredData);
  },

  dateFilter: function (dataset, startDate, endDate) {
    startDate = moment.isDate(startDate) ? startDate : new Date();
    endDate = moment.isDate(endDate) ? endDate : new Date();
    return _.filter(dataset, function (val) {
      return val.time.getTime() >= startDate.getTime() && val.time.getTime() <= endDate.getTime();
    });
  },

  magFilter: function (dataset, startMag, endMag) {
    startMag = !isNaN(startMag) ? startMag : 0;
    endMag = !isNaN(endMag) ? endMag : 10;
    return _.filter(dataset, function (val) {
      return val.mag >= startMag && val.mag <= endMag;
    });
  },

  countByDate: function (dataset) {
    var aggregateArray = [];
    var aggregate = _.countBy(dataset, function (val) {
      return val.time.getTime();
    });
    var keys = Object.keys(aggregate);
    for (var i = 0; i < keys.length; i++) {
      var temp = {};
      temp.time = moment(parseInt(keys[i])).toDate();
      temp.count = aggregate[keys[i]];
      aggregateArray.push(temp);
    }
    return aggregateArray;
  }
}


$().ready(function () {
  d3.json("../assets/dataset-4months.json", function (err, data) {
    var transformedData = dataTransformer.normalizeFeatures(data);
    var group = dataTransformer.countByDate(transformedData);
    map.init(transformedData);
    timeline = timelineHistogram(group, ".timeline");
  });
  initControls();

});


function initControls() {
  var dateStart = null;
  var dateEnd = null;
  var magStart = null;
  var magEnd = null;

  

  magSlider = $('.mag-slider')[0];
  noUiSlider.create(magSlider, {
    start: [2.5, 10],
    step: 0.1,
    tooltips: true,
    range: {
      'min': [0],
      'max': [10]
    }
  });

  magSlider.noUiSlider.on('change', function () {
    magStart = magSlider.noUiSlider.get()[0];
    magEnd = magSlider.noUiSlider.get()[1];
    dataTransformer.computeAllFilters({
      dateStart: dateStart,
      dateEnd: dateEnd,
      magStart: magStart,
      magEnd: magEnd
    });
  });

  $('#showMap').on('change',function(){
    console.log ($(this).checked);
    d3.select('.datamaps-subunits').classed('opacity-toggle',$(this).is(':checked'));
});


}







