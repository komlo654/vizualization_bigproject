Promise.all([
    d3.json('data/world.json'),
    d3.csv('data/stadiums.csv')
]).then(data => {
    data[1].forEach(d => {
        d.Capacity = +d.Capacity;
    })

    console.log(data[1])

    const geoMap = new Geomap({
        parentElement: '#map'
    }, data[0], data[1]);
})
    .catch(error => console.error(error));
