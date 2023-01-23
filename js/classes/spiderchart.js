class Spiderchart {
    constructor(_data) {
        this.initVis(_data);
    }

    initVis(data) {
        let example = data
        let features = ["Finishing", "Agility", "Dribbling", "Jumping", "Short passing", "Standing tackle"];

        let width = 700;
        let height = 700;
        let svg = d3.select("#spider-chart")
            .attr("width", width)
            .attr("height", height);

        let radialScale = d3.scaleLinear()
            .domain([0, 100])
            .range([0, 175]);
        let ticks = [20, 40, 60, 80, 100];

        svg.selectAll("circle")
            .data(ticks)
            .join(
                enter => enter.append("circle")
                    .attr("cx", width / 2)
                    .attr("cy", height / 2)
                    .attr("fill", "none")
                    .attr("stroke", "gray")
                    .attr("r", d => radialScale(d))
            );

        svg.selectAll(".ticklabel")
            .data(ticks)
            .join(
                enter => enter.append("text")
                    .attr("class", "ticklabel")
                    .attr("x", width / 2 + 5)
                    .attr("y", d => height / 2 - radialScale(d))
                    .text(d => d.toString())
            );


        function angleToCoordinate(angle, value){
            let x = Math.cos(angle) * radialScale(value);
            let y = Math.sin(angle) * radialScale(value);
            return {"x": width / 2 + x, "y": height / 2 - y};
        }

        let featureData = features.map((f, i) => {
            let angle = (Math.PI / 2) + (2 * Math.PI * i / features.length);
            return {
                "name": f,
                "angle": angle,
                "line_coord": angleToCoordinate(angle, 130),
                "label_coord": angleToCoordinate(angle, 150)
            };
        });

// draw axis line
        svg.selectAll("line")
            .data(featureData)
            .join(
                enter => enter.append("line")
                    .attr("x1", width / 2)
                    .attr("y1", height / 2)
                    .attr("x2", d => d.line_coord.x)
                    .attr("y2", d => d.line_coord.y)
                    .attr("stroke","black")
            );

// draw axis label
        svg.selectAll(".axislabel")
            .data(featureData)
            .join(
                enter => enter.append("text")
                    .attr("x", d => d.label_coord.x)
                    .attr("y", d => d.label_coord.y)
                    .text(d => d.name)
            );

        let line = d3.line()
            .x(d => d.x)
            .y(d => d.y);
        let colors = ["blue", "red"];

        function getPathCoordinates(data_point){
            let coordinates = [];
            for (var i = 0; i < features.length; i++){
                let ft_name = features[i];
                let angle = (Math.PI / 2) + (2 * Math.PI * i / features.length);
                coordinates.push(angleToCoordinate(angle, data_point[ft_name]));
            }
            return coordinates;
        }

        svg.selectAll("path")
            .data(example)
            .join(
                enter => enter.append("path")
                    .datum(d => getPathCoordinates(d))
                    .attr("d", line)
                    .attr("stroke-width", 3)
                    .attr("stroke", (_, i) => colors[i])
                    .attr("fill", (_, i) => colors[i])
                    .attr("stroke-opacity", 1)
                    .attr("opacity", 0.5)
            );
    }
}