let scatterplot;
let filtered_data;
d3.csv('data/fifa18.csv')
    .then(data => {

        filtered_data = data.filter(d => d.Stamina !== "")
        filtered_data = filtered_data.map(d => ({...d, ["Preferred Positions"]: d["Preferred Positions"].split(" ")[0]}))
        filtered_data = filtered_data.map(d => {
            if (["GK"].includes(d["Preferred Positions"])) {
                return {
                    ...d, ["Preferred Positions"]: "goalkeeper"
                }
            } else if (["CB", "RCB", "LCB", "RB", "LB", "RWB", "LWB"].includes(d["Preferred Positions"])) {
                return {
                    ...d, ["Preferred Positions"]: "defender"
                }
            } else if (["RM", "LM", "CAM", "CM", "CDM"].includes(d["Preferred Positions"])) {
                return {
                    ...d, ["Preferred Positions"]: "midfielder"
                }
            } else {
                return {
                    ...d, ["Preferred Positions"]: "attacker"
                }
            }
        })

        filtered_data = filtered_data.slice(0, 500)

        scatterplot = new Scatterplot({ parentElement: '#scatter-chart'}, filtered_data);
        scatterplot.updateVis();
    }).catch(error => console.error(error));

d3.selectAll('.block').on('click', function() {
    d3.select(this).classed('inactive', !d3.select(this).classed('inactive'));

    let roles = [];
    d3.selectAll('.block:not(.inactive)').each(function() {
        roles.push(d3.select(this).attr('role'));
    });

    scatterplot.data = filtered_data.filter(d => roles.includes(d["Preferred Positions"]));
    scatterplot.updateVis();
});