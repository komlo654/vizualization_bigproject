let spiderchart
let players
d3.csv('data/fifa18.csv')
    .then(data => {
        players = data
        spiderchart = new Spiderchart(players.slice(0, 2));
    }).catch(error => console.error(error));

d3.selectAll('.player').on('click', function() {
    d3.select(this).classed('inactive', !d3.select(this).classed('inactive'));

    let selected_players = [];
    d3.selectAll('.player:not(.inactive)').each(function() {
        selected_players.push(d3.select(this).attr('player'));
    });

    spiderchart.data = players.filter(d => selected_players.includes(d.Name))
    spiderchart.updateVis()
});

