// storage
let collectedGraphComponent = [];
let graphComponentMatrix = [];

// for(let r = 0; r < rows; r++){
//     let row = [];
//     for(let c = 0; c < cols; c++){
//         row.push([]);
//     }
//     graphComponentMatrix.push(row);
// }

// true denotes cycle false vice versa
function isGraphCyclic(graphComponentMatrix){
    // dependency -> visited, dfsvisited
    let visited = [];
    let dfsVisited = [];

    for(let r = 0; r < rows; r++){
        let visitedRow = [];
        let dfsVisitedRow = [];
        for(let c = 0; c < cols; c++){
            visitedRow.push(false);
            dfsVisitedRow.push(false);
        }
        visited.push(visitedRow);
        dfsVisited.push(dfsVisitedRow);
    }

    for(let r = 0; r < rows; r++){
        for(let c = 0; c < cols; c++){
            if(visited[r][c] === false){
                let response = dfsCycleDetection(graphComponentMatrix, r, c, visited, dfsVisited);
                if(response === true) return [r, c];
            }
        }
    }
    return null;
}

// start -> visited[true] dfsvisited[true]
// end -> dfsvisited[false]
// if visited[i][j] -> backtrack
// cycle condition -> visited[i][j] == true && dfsvisited[i][j] == true
function dfsCycleDetection(graphComponentMatrix, srcr, srcc, visited, dfsVisited){
    visited[srcr][srcc] = true;
    dfsVisited[srcr][srcc] = true;

    for(let children = 0; children < graphComponentMatrix[srcr][srcc].length; children++){
        let [crid, ccid] = graphComponentMatrix[srcr][srcc][children];
        if(visited[crid][ccid] === false){
            let response = dfsCycleDetection(graphComponentMatrix, crid, ccid, visited, dfsVisited);
            if(response === true) return true;
        }
        else if(dfsVisited[crid][ccid] === true) return true;
    }
    dfsVisited[srcr][srcc] = false;
    return false;
}