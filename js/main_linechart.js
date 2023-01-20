let total_net_incomes_by_year = [];
d3.csv("data/incomes.csv").then(data =>  {
    let x = 0
    data.forEach(element => {
        if (element.Denomination === "Net income total" && element.year > 2010) {
            let object = {};
            object.year = +element.year
            object.total = +element.Total.replaceAll(" ", "")
            total_net_incomes_by_year.push(object)
            x = x + 200
        }
    });

    console.log(total_net_incomes_by_year)

    const linechart = new Linechart({ parentElement: '#chart'}, total_net_incomes_by_year);

    // Show chart
    linechart.updateVis();
})