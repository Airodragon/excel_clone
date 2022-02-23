function colorPromise(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, 1000);
    })
}


async function isGraphCyclicTracePath(graphComponentMatrix, cycleResponse){
    let [srcr, srcc] = cycleResponse;
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

    let response = await dfsCycleDetectionTracePath(graphComponentMatrix, srcr, srcc, visited, dfsVisited);
    if(response === true) return Promise.resolve(true);
    
    return Promise.resolve(false);
}


//coloring cells for tracking
async function dfsCycleDetectionTracePath(graphComponentMatrix, srcr, srcc, visited, dfsVisited){
    visited[srcr][srcc] = true;
    dfsVisited[srcr][srcc] = true;

    let cell = document.querySelector(`.cell[rid="${srcr}"][cid="${srcc}"]`);
    cell.style.backgroundColor = "lightblue";
    await colorPromise();

    for(let children = 0; children < graphComponentMatrix[srcr][srcc].length; children++){
        let [crid, ccid] = graphComponentMatrix[srcr][srcc][children];
        if(visited[crid][ccid] === false){
            let response = await dfsCycleDetectionTracePath(graphComponentMatrix, crid, ccid, visited, dfsVisited);
            if(response === true){
                cell.style.backgroundColor = "#ecf0f1";
                await colorPromise();

                return Promise.resolve(true);
            }
        }
        else if(dfsVisited[crid][ccid] === true){
            let cyclicCell = document.querySelector(`.cell[rid="${crid}"][cid="${ccid}"]`);

            cell.style.backgroundColor = "lightsalmon";
            await colorPromise();

            cyclicCell.style.backgroundColor = "#ecf0f1";
            await colorPromise();

            cell.style.backgroundColor = "#ecf0f1";
            return Promise.resolve(true);
        }
    }
    dfsVisited[srcr][srcc] = false;
    return false;
}