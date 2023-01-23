let spiderchart
let players
d3.csv('data/fifa18.csv')
    .then(data => {
        let features = ["Finishing", "Agility", "Dribbling", "Jumping", "Short passing", "Standing tackle"];
        players = data
        spiderchart = new Spiderchart([], features);
        spiderchart.updateVis()
    }).catch(error => console.error(error));

d3.selectAll('button').on('click', function() {
    let selected_players = [];
    d3.selectAll('input.checkbox:checked').each(function() {
        selected_players.push(this.value);
    });

    spiderchart.data = players.filter(d => selected_players.includes(d.Name))
    spiderchart.updateVis()
});

