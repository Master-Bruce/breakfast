import {SubElection} from "../management/interfaces/SubElection";

const palette = require("google-palette");


export function getDataFromSubElection(subElection: SubElection) {
    return {
        labels: subElection.candidates.map((candidate) => candidate.name),
        datasets: [{
            data: subElection.candidates.map((candidate) => candidate.votes),
            backgroundColor: palette('tol', subElection.candidates.length).map((hex) => `#${hex}`),
        }]
    };
}

export function chartOptions(fontSize: number = 12, animation: boolean = true) {
    const boxWidth = fontSize * 20 / 12;
    const padding = fontSize * 10 / 12;
    let data = {
        legend: {
            position: 'right',
            labels: {
                boxWidth: boxWidth,
                fontSize: fontSize,
                padding: padding,
            },
        }
    };
    if (!animation)
        data["animation"] = false;
    return data;
}
