d3.csv('data/pokemon.csv')
    .then(data => {

        // Convert strings to numbers
        data.forEach(d => {
            d["Attack"] = +d["Attack"];
            d["HP"] = +d["HP"];
        });

        // Initialize chart
        const scatterplot = new Scatterplot({ parentElement: '#chart'}, data);

        // Show chart
        scatterplot.updateVis();
    })
    .catch(error => console.error(error));