let scatterplot;
d3.csv('data/fifa18.csv')
    .then(data => {

        let filtered_data = data.filter(d => d.Stamina !== "")
        filtered_data = filtered_data.map(d => ({...d, ["Preferred Positions"]: d["Preferred Positions"].split(" ")[0]}))

        scatterplot = new Scatterplot({ parentElement: '#scatter-chart'}, filtered_data.slice(0, 500));
        scatterplot.updateVis();
    }).catch(error => console.error(error));

d3.select('#goalkeeper').on('click', d => {
    scatterplot.config.playerRole = "goalkeeper";
    scatterplot.updateVis();
})