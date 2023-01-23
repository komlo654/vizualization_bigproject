let stacked_barchart;
let data;
let data_info;
d3.csv('data/fifa18.csv')
    .then(data => {

        let f_data = data.filter(d => d.Age !== "" && d.Wage !== "")
        f_data = f_data.map(d => ({...d, ["Preferred Positions"]: d["Preferred Positions"].split(" ")[0]}))
        f_data = convertPositionToRole(f_data)

        data = [
            {age: "16-24", goalkeeper: 0, defender: 0, midfielder: 0, attacker: 0},
            {age: "25-32", goalkeeper: 0, defender: 0, midfielder: 0, attacker: 0},
            {age: "32+", goalkeeper: 0, defender: 0, midfielder: 0, attacker: 0}
        ]

        data_info = [
            {
                goalkeeper: {
                    number_of_players: 0, total_wage: 0
                },
                defender: {
                    number_of_players: 0, total_wage: 0
                },
                midfielder: {
                    number_of_players: 0, total_wage: 0
                },
                attacker: {
                    number_of_players: 0, total_wage: 0
                },
            },
            {
                goalkeeper: {
                    number_of_players: 0, total_wage: 0
                },
                defender: {
                    number_of_players: 0, total_wage: 0
                },
                midfielder: {
                    number_of_players: 0, total_wage: 0
                },
                attacker: {
                    number_of_players: 0, total_wage: 0
                },
            },
            {
                goalkeeper: {
                    number_of_players: 0, total_wage: 0
                },
                defender: {
                    number_of_players: 0, total_wage: 0
                },
                midfielder: {
                    number_of_players: 0, total_wage: 0
                },
                attacker: {
                    number_of_players: 0, total_wage: 0
                },
            }
        ]

        f_data.map(d => {
            if (d.Age <= 24) {
                ++data_info[0][d["Preferred Positions"]].number_of_players
                data_info[0][d["Preferred Positions"]].total_wage += parseInt(d["Wage (€)"])
            } else if (d.Age >= 25 && d.Age <= 31) {
                ++data_info[1][d["Preferred Positions"]].number_of_players
                data_info[1][d["Preferred Positions"]].total_wage += parseInt(d["Wage (€)"])
            } else {
                ++data_info[2][d["Preferred Positions"]].number_of_players
                data_info[2][d["Preferred Positions"]].total_wage += parseInt(d["Wage (€)"])
            }
        })

        data = data.map((d, index) => (
            {
                ...d,
                goalkeeper: data_info[index].goalkeeper.total_wage / data_info[index].goalkeeper.number_of_players,
                defender: data_info[index].defender.total_wage / data_info[index].defender.number_of_players,
                midfielder: data_info[index].midfielder.total_wage / data_info[index].midfielder.number_of_players,
                attacker: data_info[index].goalkeeper.total_wage / data_info[index].attacker.number_of_players,
            }
        ))

        stacked_barchart = new StackedBarChart({ parentElement: '#stacked-barchart'}, data);
        stacked_barchart.updateVis();

    }).catch(error => console.error(error));

d3.selectAll('.role').on('click', function() {
    d3.select(this).classed('inactive', !d3.select(this).classed('inactive'));

    let roles = [];
    d3.selectAll('.role:not(.inactive)').each(function() {
        roles.push(d3.select(this).attr('role'));
    });

    stacked_barchart.config.roles = roles;
    stacked_barchart.updateVis();
});