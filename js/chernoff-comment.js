(function() {
    function sign(num) {
        if(num > 0) {
            return 1;
        } else if(num < 0) {
            return -1;
        } else {
            return 0;
        }
    }
    
    // Implements Chernoff faces (http://en.wikipedia.org/wiki/Chernoff_face).
    // Exposes 8 parameters through functons to control the facial expression.
    // face -- shape of the face {0..1}
    // hair -- shape of the hair {-1..1}
    // mouth -- shape of the mouth {-1..1}
    // noseh -- height of the nose {0..1}
    // nosew -- width of the nose {0..1}
    // eyeh -- height of the eyes {0..1}
    // eyew -- width of the eyes {0..1}
    // brow -- slant of the brows {-1..1}
    function d3_chernoff() {
        var facef = 0.5, // 0 - 1
            hairf = 0, // -1 - 1
            mouthf = 0, // -1 - 1
            nosehf = 0.5, // 0 - 1
            nosewf = 0.5, // 0 - 1
            eyehf = 0.5, // 0 - 1
            eyewf = 0.5, // 0 - 1
            browf = 0, // -1 - 1

            //https://bl.ocks.org/emmasaunders/f7178ed715a601c5b2c458a2c7093f78
            //https://www.dashingd3js.com/svg-paths-and-d3js
            line = d3.line()
                .x(function(d) { return d.x; })
                .y(function(d) { return d.y; })
                .curve(d3.curveCardinalClosed),
            bline = d3.line()
                .x(function(d) { return d.x; })
                .y(function(d) { return d.y; })
                .curve(d3.curveBasisClosed),

            arc =  d3.arc()
                    .innerRadius(function(d) {
                        // console.log(d);
                    return d.innerRadius;
                    })
                    .outerRadius(function(d) {
                    return d.outerRadius;
                    })
                    .startAngle(function(d) {
                        return d.startAngle;
                        })
                    .endAngle(function(d) {
                    return d.endAngle;
                    });
    
        function chernoff(a) {
            if(a instanceof Array) {
                a.each(__chernoff);
            } else {
                d3.select(this).each(__chernoff);
            }
        }
    
        function __chernoff(d) {
            console.log(d3.select(this));
            var ele = d3.select(".chernoff"),
                facevar = (typeof(facef) === "function" ? facef(d) : facef) * 30,
                hairvar = (typeof(hairf) === "function" ? hairf(d) : hairf) * 80,
                mouthvar = (typeof(mouthf) === "function" ? mouthf(d) : mouthf) * 7,
                nosehvar = (typeof(nosehf) === "function" ? nosehf(d) : nosehf) * 10,
                nosewvar = (typeof(nosewf) === "function" ? nosewf(d) : nosewf) * 10,
                eyehvar = (typeof(eyehf) === "function" ? eyehf(d) : eyehf) * 10,
                eyewvar = (typeof(eyewf) === "function" ? eyewf(d) : eyewf) * 10,
                browvar = (typeof(browf) === "function" ? browf(d) : browf) * 3;
        
        var face_color = mouthf*2 - 1;
        console.log(mouthf)
        console.log(face_color)
        var color = d3.scaleLinear()
      .domain([-1, 0.3,0.7, 1])
      .range(["red","red","#61CE70", "#006D00"]);
      console.log(100)
            var face = [{x: 50, y: 30}, {x: 100, y: 50},
                        {x: 100-facevar, y: 80}, {x: 100-facevar, y: 130},
                        {x: facevar, y: 130}, {x: facevar, y: 80},
                        {x: 0, y: 50}];
                        console.log(face)
            ele.append("path")
                .attr("fill", color(face_color))
                .attr("class", "face")
                .attr("d",function(d,i){console.log(d); return bline(face); });
                console.log(10)
            var hair = [{x: 70, y: 60}, {x: 120, y: 80},
                        {x: 140, y: 45-hairvar}, {x: 120, y: 45},
                        {x: 70, y: 30}, {x: 20, y: 45},
                        {x: 0, y: 45-hairvar}, {x: 20, y: 80}];
            // ele.selectAll("path.hair").data([hair]).enter()
            //     .append("path")
            //     .attr("class", "hair")
            //     .attr("d", bline);
    
            var mouth = [{x: 50, y: 100+mouthvar},
                {x: 90-facevar, y: 105-mouthvar},
                {x: 50, y: 110+mouthvar},
                {x: 10+facevar, y: 105-mouthvar}];
            var mouth2 =    {innerRadius: 20,
                         outerRadius: 25,
                         startAngle: mouthvar*Math.PI/4,
                         endAngle: (2 + mouthvar*Math.PI/4),
                        x: 70,
                        y: 100}
            // console.log(mouthvar)
            ele.append("path")
                .attr("fill","white")
                //.attr('transform', function(d) { return "translate(" + d.x + "," + d.y + ")" ;})
                .attr("class", "mouth")
                .attr("d",function(d,i){console.log(d); return line(mouth); });
    
            var nose = [{x: 50, y: 80-nosehvar},
                        {x: 50+nosewvar, y: 80+nosehvar},
                        {x: 50-nosewvar, y: 80+nosehvar}];
            ele.append("path")
                .attr("class", "nose")
                .attr("d",function(d,i){console.log(d); return line(nose); });

    
            var leye = [{x: 35, y: 60-eyehvar}, {x: 35+eyewvar, y: 60},
                        {x: 35, y: 60+eyehvar}, {x: 35-eyewvar, y: 60}];
            var reye = [{x: 65, y: 60-eyehvar}, {x: 65+eyewvar, y: 60},
                        {x: 65, y: 60+eyehvar}, {x: 65-eyewvar, y: 60}];
            ele
                .append("path")
                .attr("class", "leye")
                .attr("d",function(d,i){console.log(d); return bline(leye); });
            ele.append("path")
                .attr("class", "reye")
                .attr("d",function(d,i){console.log(d); return bline(reye); });
    
            ele.append("path")
                .attr("class", "lbrow")
                .attr("d", "M" + (55-eyewvar/1.7-sign(browvar)) + "," +
                           (87-eyehvar+browvar) + " " +
                           (55+eyewvar/1.7-sign(browvar)) + "," +
                           (87-eyehvar-browvar));
            ele.append("path")
                .attr("class", "rbrow")
                .attr("d", "M" + (85-eyewvar/1.7+sign(browvar)) + "," +
                           (87-eyehvar-browvar) + " " +
                           (85+eyewvar/1.7+sign(browvar)) + "," +
                           (87-eyehvar+browvar));
        }
    
        chernoff.face = function(x) {
            if(!arguments.length) return facef;
            facef = x;
            return chernoff;
        };
    
        chernoff.hair = function(x) {
            if(!arguments.length) return hairf;
            hairf = x;
            return chernoff;
        };
    
        chernoff.mouth = function(x) {
            if(!arguments.length) return mouthf;
            mouthf = x;
            return chernoff;
        };
    
        chernoff.noseh = function(x) {
            if(!arguments.length) return nosehf;
            nosehf = x;
            return chernoff;
        };
    
        chernoff.nosew = function(x) {
            if(!arguments.length) return nosewf;
            nosewf = x;
            return chernoff;
        };
    
        chernoff.eyeh = function(x) {
            if(!arguments.length) return eyehf;
            eyehf = x;
            return chernoff;
        };
    
        chernoff.eyew = function(x) {
            if(!arguments.length) return eyewf;
            eyewf = x;
            return chernoff;
        };
    
        chernoff.brow = function(x) {
            if(!arguments.length) return browf;
            browf = x;
            return chernoff;
        };
    
        return chernoff;
    }
    
    d3.chernoff = function() {
        return d3_chernoff(Object);
    };
    })();