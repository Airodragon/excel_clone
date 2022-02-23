let addSheetBtn = document.querySelector(".sheet-add-icon");
let sheetsFolderCont = document.querySelector(".sheets-folder-cont");

addSheetBtn.addEventListener("click", (e) => {
    let sheet = document.createElement("div");
    sheet.setAttribute("class", "sheet-folder");
    
    let allSheetFolders = document.querySelectorAll(".sheet-folder");
    sheet.setAttribute("id", allSheetFolders.length);

    sheet.innerHTML = `
    <div class="sheet-content">Sheet${allSheetFolders.length + 1}</div>
    `;

    sheetsFolderCont.appendChild(sheet);
    sheet.scrollIntoView();
    // DB storage
    createSheetDB();
    createGraphComponentMatrix();
    handleSheetActiveness(sheet);
    handleSheetRemoval(sheet);
    sheet.click();
})

function handleSheetRemoval(sheet){
    sheet.addEventListener("mousedown", (e) => {
        //right click
        if(e.button !== 2) return;

        let allSheetFolders = document.querySelectorAll(".sheet-folder");
        if(allSheetFolders.length === 1){
            alert("You need to have atleast one sheet!");
            return;
        }
        let response = confirm("Your sheet will be removed permanently. Are you sure to delete?");
        if(response === false) return;

        let sheetIdx = Number(sheet.getAttribute("id"));
        collectedSheetDB.splice(sheetIdx, 1);
        collectedGraphComponent.splice(sheetIdx, 1);
        handleSheetUIRemoval(sheet);

        //by default make sheet 1 active
        sheetDB = collectedSheetDB[0];
        graphComponentMatrix = collectedGraphComponent[0];
        handleSheetProperties();

    })
}

function handleSheetUIRemoval(sheet){
    sheet.remove();
    let allSheetFolders = document.querySelectorAll(".sheet-folder");
    for(let i = 0; i < allSheetFolders.length; i++){
        allSheetFolders[i].setAttribute("id", i);
        let sheetCont = allSheetFolders[i].querySelector(".sheet-content");
        sheetCont.innerText = `Sheet${i + 1}`;
        allSheetFolders[i].style.backgroundColor = "#ecf0f1";
    }
    allSheetFolders[0].style.backgroundColor = "#ced6e0";
}

function handleSheetDB(sheetIdx){
    sheetDB = collectedSheetDB[sheetIdx];
    graphComponentMatrix = collectedGraphComponent[sheetIdx];
}

function handleSheetProperties(){
    for(let r = 0; r < rows; r++){
        for(let c = 0; c < cols; c++){
            let cell = document.querySelector(`.cell[rid="${r}"][cid="${c}"]`);
            cell.click();
        }
    }

    // by default click on first cell via DOM
    let firstCell = document.querySelector(".cell");
    firstCell.click();
}

function handleSheetUI(sheet){
    let allSheetFolders = document.querySelectorAll(".sheet-folder");
    for(let i = 0; i < allSheetFolders.length; i++){
        allSheetFolders[i].style.backgroundColor = "#ecf0f1";
    }
    sheet.style.backgroundColor = "#ced6e0";
}

function handleSheetActiveness(sheet){
    sheet.addEventListener("click", (e) => {
        let sheetIdx = Number(sheet.getAttribute("id"));
        handleSheetDB(sheetIdx);
        handleSheetProperties();
        handleSheetUI(sheet);
    })
}

function createSheetDB(){
    let sheetDB = [];
    for(let r = 0; r < rows; r++){
        let sheetRow = [];
        for(let c = 0; c < cols; c++){
            let cellProp = {
                bold: false,
                italic: false,
                underline: false,
                alignment: "left",
                fontFamily: "monospace",
                fontSize: "14",
                fontColor: "#000000",
                BGcolor: "#ecf0f1",
                value: "",
                formula: "",
                children: []
            };
            sheetRow.push(cellProp);
        }
        sheetDB.push(sheetRow);
    }
    collectedSheetDB.push(sheetDB);
}

function createGraphComponentMatrix(){
    let graphComponentMatrix = [];
    for(let r = 0; r < rows; r++){
        let row = [];
        for(let c = 0; c < cols; c++){
            row.push([]);
        }
        graphComponentMatrix.push(row);
    }
    collectedGraphComponent.push(graphComponentMatrix);
}