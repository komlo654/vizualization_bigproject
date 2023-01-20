/*
 *  Load data from CSV file
 */
d3.csv('data/test.csv')
    .then(data => {
        // Convert sales strings to numbers
        data.forEach(d => {
            d.sales = +d.sales;
        });

        showBarChart(data);
    })
    .catch(error => {
        console.error('Error loading the data');
    });

/*
 *  Draw chart
 */
function showBarChart(data) {
    const width = 500;
    const height = 120;

    // Append empty SVG container and set size
    const svg = d3.select('#chart').append('svg')
        .attr('width', width)
        .attr('height', height);

    // Initialize linear and ordinal scales (input domain and output range)
    const xScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.sales)])
        .range([0, width]);

    const yScale = d3.scaleBand()
        .domain(data.map(d => d.month))
        .range([0, height])
        .paddingInner(0.1);

    // Initialize axes
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    // Draw the axis
    const xAxisGroup = svg.append('g')
        .attr('class', 'axis x-axis')
        .call(xAxis);

    const yAxisGroup = svg.append('g')
        .attr('class', 'axis y-axis')
        .call(yAxis);

    // Add rectangles
    const bars = svg.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('fill', 'steelblue')
        .attr('width', d => xScale(d.sales))
        .attr('height', yScale.bandwidth())
        .attr('y', d => yScale(d.month))
        .attr('x', 0);
}