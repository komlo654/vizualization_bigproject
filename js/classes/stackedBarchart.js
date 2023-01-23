class StackedBarChart {

    /**
     * Class constructor with basic chart configuration
     * @param {Object}
     * @param {Array}
     */
    constructor(_config, _data) {
        this.config = {
            parentElement: _config.parentElement,
            containerWidth: 500,
            containerHeight: 400,
            margin: {top: 10, right: 10, bottom: 30, left: 50},
            tooltipPadding: _config.tooltipPadding || 15,
            roles: _config.roles || ["goalkeeper", "defender", "midfielder", "attacker"]
        }
        this.data = _data;
        this.initVis();
    }

    /**
     * Initialize scales/axes and append static chart elements
     */
    initVis() {
        let vis = this;

        vis.width = vis.config.containerWidth - vis.config.margin.left - vis.config.margin.right;
        vis.height = vis.config.containerHeight - vis.config.margin.top - vis.config.margin.bottom;

        vis.xScale = d3.scaleBand()
            .range([0, vis.width])
            .paddingInner(0.2)
            .paddingOuter(0.2);

        vis.yScale = d3.scaleLinear()
            .range([vis.height, 0]);

        // Initialize axes
        vis.xAxis = d3.axisBottom(vis.xScale);
        vis.yAxis = d3.axisLeft(vis.yScale).ticks(6);

        // Define size of SVG drawing area
        vis.svg = d3.select(vis.config.parentElement)
            .attr('width', vis.config.containerWidth)
            .attr('height', vis.config.containerHeight);

        // Append group element that will contain our actual chart
        vis.chart = vis.svg.append('g')
            .attr('transform', `translate(${vis.config.margin.left},${vis.config.margin.top})`);

        // Append empty x-axis group and move it to the bottom of the chart
        vis.xAxisG = vis.chart.append('g')
            .attr('class', 'axis x-axis')
            .attr('transform', `translate(0,${vis.height})`);

        // Append y-axis group
        vis.yAxisG = vis.chart.append('g')
            .attr('class', 'axis y-axis');

        // Initialize stack generator and specify the categories or layers
        // that we want to show in the chart
        vis.stack = d3.stack()
            .keys(vis.config.roles.map(r => r));

        vis.updateVis();
    }

    /**
     * Prepare the data and scales before we render it.
     */
    updateVis() {
        let vis = this;

        vis.stack = d3.stack()
            .keys(vis.config.roles.map(r => r));

        vis.yValue = d => d.goalkeeper + d.defender + d.midfielder + d.attacker;

        vis.xScale.domain(vis.data.map(d => d.age));
        vis.yScale.domain([0, d3.max(vis.data, vis.yValue)]);

        // Call stack generator on the dataset
        vis.stackedData = vis.stack(vis.data);

        vis.renderVis();
    }

    /**
     * This function contains the D3 code for binding data to visual elements
     * Important: the chart is not interactive yet and renderVis() is intended
     * to be called only once; otherwise new paths would be added on top
     */
    renderVis() {
        let vis = this;

        vis.chart.selectAll('.category').remove()


        let categories = vis.chart.selectAll('.category')
            .data(vis.stackedData)
            .join('g')
            .attr('class', d => `category cat-${d.key}`)
            .selectAll('rect')
            .data(d => d)
            .join('rect')
            .attr('x', d => vis.xScale(d.data.age))
            .attr('y', d => vis.yScale(d[1]))
            .attr('height', d => vis.yScale(d[0]) - vis.yScale(d[1]))
            .attr('width', vis.xScale.bandwidth());

        categories
            .on('mouseover', (event,d) => {
                d3.select('#stacked-barchart-tooltip')
                    .style('opacity', '1')
                    .style('left', (event.pageX + vis.config.tooltipPadding) + 'px')
                    .style('top', (event.pageY + vis.config.tooltipPadding) + 'px')
                    .html(`
              <div class="tooltip-title">Havi átlagjövedelem (€)</div>
              <div class="average-wage-details">
                <div>${d3.format(',')(Math.round(+d[1] - +d[0]))}</div>
                
            `);
            })
            .on('mouseleave', () => {
                d3.select('#stacked-barchart-tooltip').style('opacity', '0');
            });


        // Update the axes
        vis.xAxisG.call(vis.xAxis);
        vis.yAxisG.call(vis.yAxis);
    }
}