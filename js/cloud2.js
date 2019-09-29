// // DATA
// function test(data){
//     // console.log(data)
// }
// function type(d) {
//         // console.log(dataHeader[i] + "1")
//     d["Frq"] = +d["Frq"]
//     // d["year"] = +d["year"];
//     // console.log(d);
//     words.push(d)
//     return d;
// }
//   var text_string = "Of course that’s your contention. You’re a first year grad student. You just got finished readin’ some Marxian historian, Pete Garrison probably. You’re gonna be convinced of that ’til next month when you get to James Lemon and then you’re gonna be talkin’ about how the economies of Virginia and Pennsylvania were entrepreneurial and capitalist way back in 1740. That’s gonna last until next year. You’re gonna be in here regurgitating Gordon Wood, talkin’ about, you know, the Pre-Revolutionary utopia and the capital-forming effects of military mobilization… ‘Wood drastically underestimates the impact of social distinctions predicated upon wealth, especially inherited wealth.’ You got that from Vickers, Work in Essex County, page 98, right? Yeah, I read that, too. Were you gonna plagiarize the whole thing for us? Do you have any thoughts of your own on this matter? Or do you, is that your thing? You come into a bar. You read some obscure passage and then pretend, you pawn it off as your own, as your own idea just to impress some girls and embarrass my friend? See, the sad thing about a guy like you is in 50 years, you’re gonna start doin’ some thinkin’ on your own and you’re gonna come up with the fact that there are two certainties in life. One: don’t do that. And two: you dropped a hundred and fifty grand on a fuckin’ education you coulda got for a dollar fifty in late charges at the public library.";
  
//   var words = []
//   d3.csv("93396.csv", type, test);
//   setTimeout(function(){
//     drawWordCloud(words);
// },200);

function drawWordCloud(words_frequency){
var shuffling = true;				// shuffling make less-sparsed word clouds
var spiral = "archimedean";		// 'archimedean or 'rectangular'
var outter = true;						// (try to) make disappearing words outter

var city = "amsterdam";
var zoom_group;							// reusable d3 selection


Math.seedrandom('abcde');  // define a fixed random seed, to avoid to have a different layout on each page reload. change the string to randomize

console.log(words_frequency);
var color = d3.scaleOrdinal().domain(["P","N"]).range(["#008C3C","Red"]);
    var font_size = d3.scaleLinear()
           .domain([0, d3.max(words_frequency, function(d) {
            console.log(d["Frq"])
              return d["Frq"];
            })
           ])
           .range([10,100]);

// var font_size = d3.scale.linear()
// .domain([1, max])
// .range([10,100]);

/*
var color = d3.scale.linear()
    .domain([-max, 0, max])
    .range([d3.hcl(36, 65, 50), d3.hcl(95, 65, 80), d3.hcl(150, 65, 50)])
    .interpolate(d3.interpolateHcl);*/



if (shuffling) {
  shuffle(words_frequency);
}
console.log(words_frequency);
d3.layout.cloud().size([720, 350])
  .words(words_frequency)
  .rotate(function() { return ~~(Math.random() * 2) * 90; })
  .font("Impact")
  .spiral(spiral)
  .text(function(d){ return d.Word; })
  .fontSize(function(d){ return font_size(d.Frq); })
  .on("end", draw)
  .start();
}
function draw(words) {
    var color = d3.scaleOrdinal().domain(["P","N"]).range(["#008C3C","Red"]);
    var font_size = d3.scaleLinear()
           .domain([0, d3.max(words, function(d) {
            console.log(d["Frq"])
              return d["Frq"];
            })
           ])
           .range([10,100]);
    // console.log(words_frequency)
  var svg = d3.select(".wordCloud").append("svg")
  .attr("width", 960)
  .attr("height", 500);


  // append a group for zoomable content
  zoom_group = svg.append('g');

  // define a zoom behavior
  var zoom = d3.zoom()
  .scaleExtent([1,4]) // min-max zoom
  .on('zoom', function() {
    // whenever the user zooms,
    // modify translation and scale of the zoom group accordingly
    zoom_group.attr('transform', 'translate('+zoom.translate()+')scale('+zoom.scale()+')');
  });

  // bind the zoom behavior to the main SVG
  svg.call(zoom);


  zoom_group.append("g")
    .attr("transform", "translate(480,250)")
    .selectAll("text")
    .data(words)
    .enter()
    	.append("text")
      .style("font-size", function(d){ return font_size(d.Frq) + "px"; })
      .style("font-family", "Impact")
      .style("fill", function(d) { return color(d.Category); })
  		.style("fill-opacity", function(d) { return (d.Frq>0)? 1 : 0; })
      .attr("text-anchor", "middle")
      .attr("transform", function(d) {
        var far = 1500*(Math.random() > 0.5 ? +1 : -1);
        if(d.rotate === 0)
          return "translate("+far+",0)rotate(" + d.rotate + ")";
        else
          return "translate(0,"+far+")rotate(" + d.rotate + ")";
      })
      .text(function(d) { return d.Word; })
      .transition()
        .duration(1000)
        .attr("transform", function(d) {
          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        });
}

function update() {
  if (city === "london") {
    city = "amsterdam";
  } else {
    city = "london";
  }
  
  zoom_group.selectAll("text")
  	.data(words_frequency)
  	.transition()
      .duration(1000)
      .style("font-size", function(d){ return font_size(d[city].count) + "px"; })
  		.style("fill", function(d) { return color(d[city].polarity); })
  		.style("fill-opacity", function(d) { return (d[city].count>0)? 1 : 0; });
}

function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}