class Scatterplot {

    /**
     * Class constructor with basic chart configuration
     * @param _config {Object}
     * @param _data {Array}
     */
    constructor(_config, _data) {
        this.config = {
            parentElement: _config.parentElement,
            containerWidth: _config.containerWidth || 600,
            containerHeight: _config.containerHeight || 400,
            margin: _config.margin || {top: 30, right: 20, bottom: 20, left: 35},
            tooltipPadding: _config.tooltipPadding || 15,
            playerRole: _config.playerRole || "default"
        }
        this.data = _data;
        this.initVis();
    }

    /**
     * We initialize scales/axes and append static elements, such as axis titles.
     */
    initVis() {
        let vis = this;

        // Calculate inner chart size. Margin specifies the space around the actual chart.
        vis.width = vis.config.containerWidth - vis.config.margin.left - vis.config.margin.right;
        vis.height = vis.config.containerHeight - vis.config.margin.top - vis.config.margin.bottom;

        vis.xScale = d3.scaleLinear()
            .range([0, vis.width]);

        vis.yScale = d3.scaleLinear()
            .range([vis.height, 0]);

        // Initialize axes
        vis.xAxis = d3.axisBottom(vis.xScale)
            .ticks(6)
            .tickSize(-vis.height - 10)
            .tickPadding(10)
            .tickFormat(d => d);

        vis.yAxis = d3.axisLeft(vis.yScale)
            .ticks(6)
            .tickSize(-vis.width - 10)
            .tickPadding(10);

        // Define size of SVG drawing area
        vis.svg = d3.select(vis.config.parentElement)
            .attr('width', vis.config.containerWidth)
            .attr('height', vis.config.containerHeight);

        // Append group element that will contain our actual chart
        // and position it according to the given margin config
        vis.chart = vis.svg.append('g')
            .attr('transform', `translate(${vis.config.margin.left},${vis.config.margin.top})`);

        // Append empty x-axis group and move it to the bottom of the chart
        vis.xAxisG = vis.chart.append('g')
            .attr('class', 'axis x-axis')
            .attr('transform', `translate(0,${vis.height})`);

        // Append y-axis group
        vis.yAxisG = vis.chart.append('g')
            .attr('class', 'axis y-axis');

        // Append both axis titles
        vis.chart.append('text')
            .attr('class', 'axis-title')
            .attr('y', vis.height - 15)
            .attr('x', vis.width + 10)
            .attr('dy', '.71em')
            .style('text-anchor', 'end')
            .text('Állóképesség');

        vis.svg.append('text')
            .attr('class', 'axis-title')
            .attr('x', 0)
            .attr('y', "5px")
            .attr('dy', '.71em')
            .text('Életkor');
    }

    /**
     * Prepare the data and scales before we render it.
     */
    updateVis() {
        let vis = this;

        if (vis.config.playerRole === "goalkeeper") {
            vis.data = vis.data.filter(d => d["Preferred Positions"] === "GK")
        }

        // Specificy accessor functions
        vis.xValue = d => d["Stamina"];
        vis.yValue = d => d["Age"];

        // Set the scale input domains
        vis.xScale.domain([0, d3.max(vis.data, vis.xValue)]);
        vis.yScale.domain([15, d3.max(vis.data, vis.yValue)]);

        vis.renderVis();
    }

    /**
     * Bind data to visual elements.
     */
    renderVis() {
        let vis = this;

        // Add circles
        const circles = vis.chart.selectAll('.point')
            .data(vis.data, d => d["Name"])
            .join('circle')
            .attr('class', 'point')
            .attr('r', 4)
            .attr("fill", d => {
                if (d["Preferred Positions"] === "ST" || d["Preferred Positions"] === "RS" || d["Preferred Positions"] === "LS" || d["Preferred Positions"] === "RF" || d["Preferred Positions"] === "LF" || d["Preferred Positions"] === "RW" || d["Preferred Positions"] === "LW" || d["Preferred Positions"] === "CF") {
                    return "blue";
                } else if (d["Preferred Positions"] === "RM" || d["Preferred Positions"] === "LM" || d["Preferred Positions"] === "CM" || d["Preferred Positions"] === "CAM" || d["Preferred Positions"] === "CDM" ) {
                    return "green";
                } else if (d["Preferred Positions"] === "CB" || d["Preferred Positions"] === "RCB" || d["Preferred Positions"] === "LCB" || d["Preferred Positions"] === "RB" || d["Preferred Positions"] === "LB" || d["Preferred Positions"] === "RWB" || d["Preferred Positions"] === "LWB") {
                    return "yellow";
                } else if (d["Preferred Positions"] === "GK") {
                    return "orange";
                }
            })
            .attr("stroke", "black")
            .attr('cy', d => vis.yScale(vis.yValue(d)))
            .attr('cx', d => vis.xScale(vis.xValue(d)));

        // Tooltip event listeners
        circles
            .on('mouseover', (event,d) => {
                d3.select('#scatter-tooltip')
                    .style('opacity', '1')
                    .style('left', (event.pageX + vis.config.tooltipPadding) + 'px')
                    .style('top', (event.pageY + vis.config.tooltipPadding) + 'px')
                    .html(`
              <div class="tooltip-title">${d["Name"]}</div>
              <div class="player-details">
                <div>${"Álóképesség: " + d["Stamina"]}</div>
                <div>${"Életkor: " + d["Age"]}</div>
            `);
            })
            .on('mouseleave', () => {
                d3.select('#scatter-tooltip').style('opacity', '0');
            });

        // Update the axes/gridlines
        // We use the second .call() to remove the axis and just show gridlines
        vis.xAxisG
            .call(vis.xAxis)
            .call(g => g.select('.domain').remove());

        vis.yAxisG
            .call(vis.yAxis)
            .call(g => g.select('.domain').remove())
    }
}