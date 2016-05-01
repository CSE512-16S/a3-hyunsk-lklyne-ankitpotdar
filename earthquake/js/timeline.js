var timelineHistogram = function(features, selector){

  // setup
  var $el = $(selector);
  var margin = {top:0, right:15, bottom: 20, left: 15},
    padding = {top: 60, right: 60, bottom: 60, left: 60},
    outerWidth = $el.width(),
    outerHeight = $el.height(),
    innerWidth = outerWidth - margin.left - margin.right,
    innerHeight = outerHeight - margin.top - margin.bottom,
    width = innerWidth - padding.left - padding.right,
    height = innerHeight - padding.top - padding.bottom;

  function getDate(d){
    return d.dateformat_date;
  }
  function getCount(d){
    return d.quakeCount;
  }

  var time_scale = [d3.min(features, getDate), d3.max(features, getDate)];
  var count_scale = [d3.min(features, getCount), d3.max(features, getCount)];

  var x = d3.time.scale()
    .domain(time_scale)
    .range([0, width]);
  var y = d3.scale.linear()
    .domain(count_scale)
    .range([0, height]);
  var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");
  var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");
  var svg = d3.select(selector).append("svg")
    .attr("width", outerWidth)
    .attr("height", outerHeight)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  var g = svg.append("g")
    .attr("transform", "translate(" + padding.left + "," + padding.top + ")");

  svg.append("rect")
    .attr("class", "outer")
    .attr("width", innerWidth)
    .attr("height", innerHeight);
  g.append("rect")
    .attr("class", "inner")
    .attr("width", width)
    .attr("height", height);
  g.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);
  g.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(" + width + ",0)")
    .call(yAxis);

  return{

  }
}