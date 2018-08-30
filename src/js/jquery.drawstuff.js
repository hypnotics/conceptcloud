(function () {
  var createNodes = function (numNodes, radius) {
    var concepts = $('#related ul li')

    var nodes = [],
      width = (radius * 2) + 50,
      height = (radius * 2) + 50,
      angle,
      x,
      y,
      text,
      i
    for (i = 0; i < numNodes; i++) {
      angle = (i / (numNodes / 2)) * Math.PI // Calculate the angle at which the element will be placed.
                                             // For a semicircle, we would use (i / numNodes) * Math.PI.
      var deltax = 0
      var deltay = 0
      var cat = 0
      var anchor = 'start'
      var localindex = 0
      var max = 0

      if (i < numNodes / 4 || i > 3 * (numNodes / 4)) {
        deltax = 400
        anchor = 'end'
      }
      if (i < numNodes / 4) {
        deltay = i * 10
        cat = 1
      }
      if (i >= numNodes / 4 && i < numNodes / 2) {
        max = (numNodes / 4) * 10
        localindex = i - (numNodes / 4)
        deltay = max - (localindex * 10)
        cat = 2
      }
      if (i >= numNodes / 2 && i < 3 * (numNodes / 4)) {
        localindex = i - (numNodes / 2)
        deltay = -(localindex * 10)
        cat = 3
      }
      if (i >= 3 * (numNodes / 4)) {
        localindex = i - (3 * (numNodes / 4))
        max = ((numNodes / 4) * 10)
        deltay = -(max - (localindex * 10))
        cat = 4
      }
      x = 10 + (radius * Math.cos(angle)) + (width / 2) + deltax // Calculate the x position of the element.
      y = 100 + (radius * Math.sin(angle)) + (height / 2) + deltay // Calculate the y position of the element.
      text = concepts[i].innerText
      nodes.push({'id': i, 'x': x, 'y': y, 'text': text, 'text-anchor': anchor})
      console.log(i + ': ' + text + ' ' + deltay + ' cat:' + cat)
    }
    return nodes
  }

  var createSvg = function (radius, callback) {
    d3.selectAll('svg').remove()
    var svg = d3.select('#canvas').append('svg:svg')
                 .attr('width', (radius * 2) + 500)
                 .attr('height', (radius * 2) + 500)
    callback(svg)
  }

  var createElements = function (svg, nodes, elementRadius) {
    element = svg.selectAll('circle')
                     .data(nodes)
                   .enter()
                   .append("svg:a").attr("xlink:href", function(d){return 'javascript:void()';})
                   .append('text')
                     .text(function (d) { return ' ' + d.text + ' ' })
                     .attr('fill', 'gray')
                     .attr('text-anchor', function (d) {
                       return 'text-anchor' in d ? d['text-anchor'] : null
                     })
                     .attr('font-family', 'Open Sans')
                     .attr('font-size', '10px')
                     .attr('x', function (d, i) {
                       return d.x
                     })
                     .attr('y', function (d, i) {
                       return d.y
                     })
                     .on("click", clickLink);
  }

  var clickLink = function(){
    console.log('hurrah!');
  }

  var createRoot = function (svg) {
    var root = []
    var concept = $('#core').html()
    root.push({'id': 0, 'x': 450, 'y': 325, 'text': concept})
    element = svg.selectAll('circle')
                   .data(root)
                   .enter().append('text')
                     .text(function (d) { return ' ' + d.text + ' ' })
                     .attr('font-family', 'Open Sans')
                     .attr('font-size', '25px')
                     .attr('font-weight', '900')
                     .attr('text-anchor', 'middle')
                     .attr('fill', 'black')
                     .attr('x', function (d, i) {
                       return d.x
                     })
                     .attr('y', function (d, i) {
                       return d.y
                     })
  }

  var draw = function () {
    var numNodes = $('#related ul li').length || 100
    var radius = $('#radius').val() || 200
    var nodes = createNodes(numNodes, radius)
    createSvg(radius, function (svg) {
      createElements(svg, nodes, 5)
      createRoot(svg)
    })
  }

  $(document).ready(function () {
       // draw();
  })

  $('#core').bind('click', function (e) {
    $('#container').hide()
    console.log('... finding ' + $('#related ul li').length + ' elements')
    draw()
  })
})()
