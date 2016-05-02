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
  var context = svg.append("g")
    .attr("class", "context")
    .attr("transform", "translate(" + padding.left + "," + padding.top + ")");

  context.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);
  context.append("g")
    .attr("class", "y axis")
    .call(yAxis);

  // brush
  var area = d3.svg.area()
    .interpolate("monotone")
    .x(function(d) { return x(getTime(d)); })
    .y0(height)
    .y1(function(d) { return y(getCount(d)); });

  var brush = d3.svg.brush()
    .x(xScale)
    .on("brushend", brushEnded);

  function brushEnded() {
    // xScale.domain(brush.empty() ? xScale2.domain() : brush.extent());
    // debugger
  }



  // draw
  var draw = function(){
    context.selectAll("rect")
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

    context.append("g")
      .attr("class", "x brush")
      .call(brush)
      .selectAll("rect")
      .attr("y", 0)
      .attr("height", height);
  }

  draw();

  return{

  }
}