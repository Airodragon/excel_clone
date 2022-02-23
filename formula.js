// attach event listener to each cell to get data
for(let r = 0; r < rows; r++){
    for(let c = 0;  c < cols; c++){
        let cell = document.querySelector(`.cell[rid="${r}"][cid="${c}"]`);
        cell.addEventListener("blur", (e) => {
            let address = addressBar.value;
            let [activeCell, cellProp] = getCellAndCellProp(address);
            let enteredData = activeCell.innerText;

            if(enteredData === cellProp.value) return;

            cellProp.value = enteredData; // data change

            // if data modified, remove parent-child relation, empty formula, update children with new hardcoded value
            removeChildFromParent(cellProp.formula);
            cellProp.formula = "";
            updateChildrenCells(address);   
        })
    }
}

// get formula from formula bar, evaluate it and set the values in ui and data
let formulaBar = document.querySelector(".formula-bar");
formulaBar.addEventListener("keydown", async (e) => {
    let inputFormula = formulaBar.value;
    if(e.key === "Enter" && inputFormula){
        // if change in formula, break old parent-child relation, evaluate new formula and update values
        let address = addressBar.value;
        let [cell, cellProp] = getCellAndCellProp(address);
        if(inputFormula !== cellProp.formula){
            removeChildFromParent(cellProp.formula);
        }

        addChildToGraphComponent(inputFormula, address);
        //check formula is cyclic or not then evaluate
        let cycleResponse = isGraphCyclic(graphComponentMatrix);
        if(cycleResponse){
            let response = confirm("Your formula is cyclic. Do you want to trace your path?");
            while(response === true){
                //keep on tracking color until user says to stop
                await isGraphCyclicTracePath(graphComponentMatrix, cycleResponse);
                response = confirm("Your formula is cyclic. Do you want to trace your path?");
            }
            removeChildFromGraphComponent(inputFormula, address);
            return;
        }

        let evaluatedValue = evaluateFormula(inputFormula);

        setCellUIAndCellProp(evaluatedValue, inputFormula, address);
        addChildToParent(inputFormula);
        updateChildrenCells(address);
    }
})

function addChildToGraphComponent(formula, childAddress){
   let [crid, ccid] = decodeAddress(childAddress);
   let encodedFormula = formula.split(" ");
   for(let i = 0; i < encodedFormula.length; i++){
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if(asciiValue >= 65 && asciiValue <= 90){
            let [prid, pcid] = decodeAddress(encodedFormula[i]);
            graphComponentMatrix[prid][pcid].push([crid, ccid]);
        }
    }
}

function removeChildFromGraphComponent(formula, childAddress){
    let [crid, ccid] = decodeAddress(childAddress);
    let encodedFormula = formula.split(" ");
    for(let i = 0; i < encodedFormula.length; i++){
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if(asciiValue >= 65 && asciiValue <= 90){
            let [prid, pcid] = decodeAddress(encodedFormula[i]);
            graphComponentMatrix[prid][pcid].pop();
        }
    }
}

//update children values in ui and data if parent value is changed
function updateChildrenCells(parentAddress){
    let [parentCell, parentCellProp] = getCellAndCellProp(parentAddress);
    let children = parentCellProp.children;

    for(let i = 0; i < children.length; i++){
        let childAddress = children[i];
        let [childCell, childCellProp] = getCellAndCellProp(childAddress);
        let childFormula = childCellProp.formula;
        let evaluatedValue = evaluateFormula(childFormula);
        setCellUIAndCellProp(evaluatedValue, childFormula, childAddress);
        updateChildrenCells(childAddress);
    }
}


// add children to parent cell
function addChildToParent(formula){
    let childAddress = addressBar.value;
    let encodedFormula = formula.split(" ");
    for(let i = 0; i < encodedFormula.length; i++){
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if(asciiValue >= 65 && asciiValue <= 90){
            let [parentCell, parentCellProp] = getCellAndCellProp(encodedFormula[i]);
            parentCellProp.children.push(childAddress);
        }
    }
}


// remove children from parent cell when change in formula
function removeChildFromParent(formula){
    let childAddress = addressBar.value;
    let encodedFormula = formula.split(" ");
    for(let i = 0; i < encodedFormula.length; i++){
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if(asciiValue >= 65 && asciiValue <= 90){
            let [parentCell, parentCellProp] = getCellAndCellProp(encodedFormula[i]);
            let idx = parentCellProp.children.indexOf(childAddress);
            parentCellProp.children.splice(idx, 1);
        }
    }
}

//evaluate formula
function evaluateFormula(formula){
    let encodedFormula = formula.split(" ");
    for(let i = 0; i < encodedFormula.length; i++){
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if(asciiValue >= 65 && asciiValue <= 90){
            let [cell, cellProp] = getCellAndCellProp(encodedFormula[i]);
            encodedFormula[i] = cellProp.value;
        }
    }
    let decodedFormula = encodedFormula.join(" ");
    return eval(decodedFormula);
}

// set evaluated value and formula in ui and data
function setCellUIAndCellProp(evaluatedValue, formula, address){
    let [cell, cellProp] = getCellAndCellProp(address);

    cell.innerText = evaluatedValue; // ui change
    //data change
    cellProp.value = evaluatedValue;
    cellProp.formula = formula;
}