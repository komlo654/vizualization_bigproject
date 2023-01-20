let barchart;
d3.csv('data/fifa18.csv')
    .then(data => {
        let sorted_array = data.sort((a,b) => (+a["Value (€)"] < +b["Value (€)"]) ? 1 : ((+b["Value (€)"] < +a["Value (€)"]) ? -1 : 0))

        barchart = new Barchart({ parentElement: '#barchart'}, sorted_array.slice(0, 10));
        barchart.updateVis();
    })
    .catch(error => console.error(error));