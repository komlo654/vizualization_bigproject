class Spiderchart {
    constructor(_data, _features) {
        this.data = _data;
        this.features = _features;
        this.initVis();
    }

    initVis() {
        let vis = this

        vis.width = 700;
        vis.height = 700;
        vis.svg = d3.select("#spider-chart")
            .attr("width", vis.width)
            .attr("height", vis.height);

        vis.radialScale = d3.scaleLinear()
            .domain([0, 100])
            .range([0, 175]);
        vis.ticks = [20, 40, 60, 80, 100];

        vis.svg.selectAll("circle")
            .data(vis.ticks)
            .join(
                enter => enter.append("circle")
                    .attr("cx", vis.width / 2)
                    .attr("cy", vis.height / 2)
                    .attr("fill", "none")
                    .attr("stroke", "gray")
                    .attr("r", d => vis.radialScale(d))
            );

        vis.svg.selectAll(".ticklabel")
            .data(vis.ticks)
            .join(
                enter => enter.append("text")
                    .attr("class", "ticklabel")
                    .attr("x", vis.width / 2 + 5)
                    .attr("y", d => vis.height / 2 - vis.radialScale(d))
                    .text(d => d.toString())
            );


        vis.featureData = vis.features.map((f, i) => {
            let angle = (Math.PI / 2) + (2 * Math.PI * i / vis.features.length);
            return {
                "name": f,
                "angle": angle,
                "line_coord": angleToCoordinate(angle, 130, vis),
                "label_coord": angleToCoordinate(angle, 150, vis)
            };
        });

        vis.svg.selectAll("line")
            .data(vis.featureData)
            .join(
                enter => enter.append("line")
                    .attr("x1", vis.width / 2)
                    .attr("y1", vis.height / 2)
                    .attr("x2", d => d.line_coord.x)
                    .attr("y2", d => d.line_coord.y)
                    .attr("stroke","black")
            );

        vis.svg.selectAll(".axislabel")
            .data(vis.featureData)
            .join(
                enter => enter.append("text")
                    .attr("x", d => d.label_coord.x)
                    .attr("y", d => d.label_coord.y)
                    .text(d => d.name)
            );
    }

    updateVis() {
        let vis = this;

        vis.renderVis();
    }

    renderVis() {
        let vis = this;

        vis.svg.selectAll('path').remove()

        vis.line = d3.line()
            .x(d => d.x)
            .y(d => d.y);
        vis.colors = ["blue", "red"];

        const paths = vis.svg.selectAll("path")
            .data(vis.data)
            .join(
                enter => enter.append("path")
                    .datum(d => getPathCoordinates(d, vis))
                    .attr("d", vis.line)
                    .attr("stroke-width", 3)
                    .attr("stroke", (_, i) => vis.colors[i])
                    .attr("fill", (_, i) => vis.colors[i])
                    .attr("stroke-opacity", 1)
                    .attr("opacity", 0.5)
            );
    }
}