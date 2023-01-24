let spiderchart
let spiderchart2
let spiderchart3
let spiderchart4
let players
d3.csv('data/fifa18.csv')
    .then(data => {
        let features = ["Crossing","Curve","Dribbling","Finishing","Free kick accuracy", "Heading accuracy","Interceptions","Vision","Volleys","Stamina"];
        let features2 = ["Acceleration","Aggression","Agility","Balance","Ball control","Composure", "Short passing","Shot power","Sliding tackle","Sprint speed"];
        let features3 = ["Jumping","Long passing","Long shots","Marking","Penalties","Positioning","Reactions","Standing tackle","Strength"];
        let features4 = ["Crossing","Curve","Dribbling","Finishing","Free kick accuracy", "Heading accuracy","Vision","Volleys","Stamina","Acceleration","Aggression","Agility","Balance","Ball control","Composure", "Short passing","Shot power","Sprint speed", "Jumping","Long passing","Long shots","Penalties","Positioning","Reactions","Strength", "Interceptions", "Standing tackle", "Marking", "Sliding tackle"]
        players = data
        spiderchart = new Spiderchart([], features, "#spider-chart");
        spiderchart.updateVis()
        spiderchart2 = new Spiderchart([], features2, "#spider-chart2");
        spiderchart2.updateVis()
        spiderchart3 = new Spiderchart([], features3, "#spider-chart3");
        spiderchart3.updateVis()
        spiderchart4 = new Spiderchart([], features4, "#spider-chart4");
        spiderchart4.updateVis()
    }).catch(error => console.error(error));

d3.selectAll('button').on('click', function() {
    let selected_players = [];
    d3.selectAll('input.checkbox:checked').each(function() {
        selected_players.push(this.value);
    });

    spiderchart.data = players.filter(d => selected_players.includes(d.Name))
    spiderchart.updateVis()


    spiderchart2.data = players.filter(d => selected_players.includes(d.Name))
    spiderchart2.updateVis()


    spiderchart3.data = players.filter(d => selected_players.includes(d.Name))
    spiderchart3.updateVis()

    spiderchart4.data = players.filter(d => selected_players.includes(d.Name))
    spiderchart4.updateVis()
});

