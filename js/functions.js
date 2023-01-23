function convertPositionToRole(data) {
    return data.map(d => {
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
}

function angleToCoordinate(angle, value, vis){
    let x = Math.cos(angle) * vis.radialScale(value);
    let y = Math.sin(angle) * vis.radialScale(value);
    return {"x": vis.width / 2 + x, "y": vis.height / 2 - y};
}

function getPathCoordinates(data_point, vis){
    let coordinates = [];
    for (let i = 0; i < vis.features.length; i++){
        let ft_name = vis.features[i];
        let angle = (Math.PI / 2) + (2 * Math.PI * i / vis.features.length);
        coordinates.push(angleToCoordinate(angle, data_point[ft_name], vis));
    }
    return coordinates;
}