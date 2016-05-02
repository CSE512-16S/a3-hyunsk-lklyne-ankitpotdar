var timelineHistogram = function(features, selector){

  // setup
  var $el = $(selector);
  var margin = {top:0, right:10, bottom: 20, left: 15},
    barMargin = 1,
    padding = {top: 5, right: 20, bottom: 5, left: 20},
    outerWidth = $el.width(),
    outerHeight = $el.height(),
    innerWidth = outerWidth - margin.left - margin.right,
    innerHeight = outerHeight - margin.top - margin.bottom,
    width = innerWidth - padding.left - padding.right,
    height = innerHeight - padding.top - padding.bottom;

  // add scales
  function getDate(d){
    return moment(d.dateformat_date, "MM/DD/YYYY").toDate();
  }
  function getCount(d){
    return d.quakeCount;
  }

  var time_domain = [d3.min(features, getDate), d3.max(features, getDate)];
  var count_domain = [0, d3.max(features, getCount)];

  var xScale = d3.time.scale()
    .domain(time_domain)
    .range([0, width]);
  var yScale = d3.scale.linear()
    .domain(count_domain)
    .range([height, 0])
    .nice();
  var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom");
  var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left");

  // add svg containers
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
  g.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);
  g.append("g")
    .attr("class", "y axis")
    .call(yAxis);

  var draw = function(){
    g.selectAll("rect")
      .data(features)
      .enter()
      .append("rect")
      .attr({
        class: "bar",
        x: function(d, i) {
          return xScale(getDate(d));
        },
        y: function(d) {
          return yScale(getCount(d));
        },
        width: width / features.length - barMargin,
        height: function(d) {
          return yScale(0) - yScale(getCount(d));
        }
        // fill: function(d) { return "hsl(0, 0%,"+ cScale(d.nkill) + "%)";}
      });
  }

  draw();

  return{

  }
}