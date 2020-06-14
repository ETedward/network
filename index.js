var width = 960,
    height = 500;

var links = [
    { source: 'Bara', target: 'Lann'},
    { source: 'Bara', target: 'Star'},
    { source: 'Lann', target: 'Star'},
    { source: 'Star', target: 'Home'},
    { source: "alo", target: 'ola'},
    { source: "ola", target: 'alo'},
    { source: "tedros", target: "Lann"},
    { source: "tedros", target: "Bara"},
    { source: "tedros", target: "Star"},
    { source: "tedros", target: "Home"},
    { source: "tedros", target: "alo"},
    { source: "tedros", target: "ola"},
];

var nodes = {} // parse links to nodes
links.forEach(function(link){ // for loop
    link.source = nodes[link.source] || 
    (nodes[link.source] = {name: link.source});
    link.target = nodes[link.target] || 
    (nodes[link.target] = {name: link.target});
});

var svg = d3.select("body").append("svg")
.attr("width", width)
.attr("height", height);

var force = d3.layout.force()
    .size([width, height])
    .nodes(d3.values(nodes))
    .links(links)
    .gravity(.05)
    .on("tick",tick)
    .linkDistance(200)
    .charge(-100)
    .start();

console.log(force.nodes());

var link = svg.selectAll('.link')
    .data(links)
    .enter().append('line') // append connection for curved line append path
    .attr('class','link');

var node = svg.selectAll('.node')
    .data(force.nodes())
    .enter().append("circle")
    .attr("class","node")
    .attr('r',width * 0.01);

var text = svg.selectAll('.text')
    .data(force.nodes())
    .enter().append("text")
    .text("hello")
    .attr("y", function(d, i) {
        return 20;
    })
    .attr("x", function(d, i) {
        return 30;
    });


function tick(e){
    node.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; })
        .call(force.drag);

    link.attr("x1", function(d) {return d.source.x; })
        .attr("y1", function(d) {return d.source.y; })
        .attr("x2", function(d) {return d.target.x; })
        .attr("y2", function(d) {return d.target.y; })
}
