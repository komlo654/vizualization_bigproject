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