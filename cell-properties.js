let collectedSheetDB = [];
let sheetDB = [];

{
    let addSheetBtn = document.querySelector(".sheet-add-icon");
    addSheetBtn.click();
    //handleSheetProperties();
}

// // create cell property data sheet
// for(let r = 0; r < rows; r++){
//     let sheetRow = [];
//     for(let c = 0; c < cols; c++){
//         let cellProp = {
//             bold: false,
//             italic: false,
//             underline: false,
//             alignment: "left",
//             fontFamily: "monospace",
//             fontSize: "14",
//             fontColor: "#000000",
//             BGcolor: "#ecf0f1",
//             value: "",
//             formula: "",
//             children: []
//         };
//         sheetRow.push(cellProp);
//     }
//     sheetDB.push(sheetRow);
// }

let activeColorProp = "#d1d8e0";
let inactiveColorProp = "#ecf0f1";

// selectors for cell properties
let bold = document.querySelector(".bold");
let italic = document.querySelector(".italic");
let underline = document.querySelector(".underline");
let fontSize = document.querySelector(".font-size-prop");
let fontFamily = document.querySelector(".font-family-prop");
let fontColor = document.querySelector(".font-color-prop");
let BGcolor = document.querySelector(".BGcolor-prop");
let alignment = document.querySelectorAll(".alignment");
let leftAlign = alignment[0];
let centerAlign = alignment[1];
let rightAlign = alignment[2];

//listeners for cell properties
bold.addEventListener("click", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = getCellAndCellProp(address);

    //data change
    cellProp.bold = !cellProp.bold;
    //ui change
    cell.style.fontWeight = cellProp.bold ? "bold" : "normal";
    bold.style.backgroundColor = cellProp.bold ? activeColorProp :  inactiveColorProp;
})

italic.addEventListener("click", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = getCellAndCellProp(address);

    //data change
    cellProp.italic = !cellProp.italic;
    //ui change
    cell.style.fontStyle = cellProp.italic ? "italic" : "normal";
    italic.style.backgroundColor = cellProp.italic ? activeColorProp :  inactiveColorProp;
})

underline.addEventListener("click", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = getCellAndCellProp(address);

    //data change
    cellProp.underline = !cellProp.underline;
    //ui change
    cell.style.textDecoration = cellProp.underline ? "underline" : "none";
    underline.style.backgroundColor = cellProp.underline ? activeColorProp :  inactiveColorProp;
})

fontSize.addEventListener("change", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = getCellAndCellProp(address);

    //data change
    cellProp.fontSize = fontSize.value;
    //ui change
    cell.style.fontSize = cellProp.fontSize + "px";
    fontSize.value = cellProp.fontSize;
})

fontFamily.addEventListener("change", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = getCellAndCellProp(address);

    //data change
    cellProp.fontFamily = fontFamily.value;
    //ui change
    cell.style.fontFamily = cellProp.fontFamily;
    fontFamily.value = cellProp.fontFamily;
})

fontColor.addEventListener("change", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = getCellAndCellProp(address);

    //data change
    cellProp.fontColor = fontColor.value;
    //ui change
    cell.style.color = cellProp.fontColor;
    fontColor.value = cellProp.fontColor;
    cell.click();
})

BGcolor.addEventListener("change", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = getCellAndCellProp(address);

    //data change
    cellProp.BGcolor = BGcolor.value;
    //ui change
    cell.style.backgroundColor = cellProp.BGcolor;
    BGcolor.value = cellProp.BGcolor;
    cell.click();
})

alignment.forEach((alignElem) => {
    alignElem.addEventListener("click", (e) => {
        let address = addressBar.value;
        let [cell, cellProp] = getCellAndCellProp(address);

        let alignValue = e.target.classList[0];

        cellProp.alignment = alignValue; //data change
        //ui change
        cell.style.textAlign = cellProp.alignment;
        switch(alignValue){
            case "left":
                leftAlign.style.backgroundColor = activeColorProp;
                centerAlign.style.backgroundColor = inactiveColorProp;
                rightAlign.style.backgroundColor = inactiveColorProp;
                break;
            case "center":
                leftAlign.style.backgroundColor = inactiveColorProp;
                centerAlign.style.backgroundColor = activeColorProp;
                rightAlign.style.backgroundColor = inactiveColorProp;
                break;
            case "right":
                leftAlign.style.backgroundColor = inactiveColorProp;
                centerAlign.style.backgroundColor = inactiveColorProp;
                rightAlign.style.backgroundColor = activeColorProp;
                break;
        }
    })
})

// apply appropriate cell properties
let allCells = document.querySelectorAll(".cell");
for(let i = 0; i < allCells.length; i++){
    addListenerToAttachCellProperties(allCells[i]);
}

function addListenerToAttachCellProperties(cell){
    
    cell.addEventListener("click", (e) => {
        let address = addressBar.value;
        let [rid, cid] = decodeAddress(address);
        let cellProp = sheetDB[rid][cid];


        cell.style.fontWeight = cellProp.bold ? "bold" : "normal";
        cell.style.fontStyle = cellProp.italic ? "italic" : "normal";
        cell.style.textDecoration = cellProp.underline ? "underline" : "none";
        cell.style.color = cellProp.fontColor;
        cell.style.backgroundColor = cellProp.BGcolor;
        cell.style.fontSize = cellProp.fontSize + "px";
        cell.style.fontFamily = cellProp.fontFamily;
        cell.style.textAlign = cellProp.alignment;

        

        bold.style.backgroundColor = cellProp.bold ? activeColorProp :  inactiveColorProp;
        italic.style.backgroundColor = cellProp.italic ? activeColorProp :  inactiveColorProp;
        underline.style.backgroundColor = cellProp.underline ? activeColorProp :  inactiveColorProp;
        fontSize.value = cellProp.fontSize;
        fontFamily.value = cellProp.fontFamily;
        fontColor.value = cellProp.fontColor;
        BGcolor.value = cellProp.BGcolor;
        
        switch(cellProp.alignment){
            case "left":
                leftAlign.style.backgroundColor = activeColorProp;
                centerAlign.style.backgroundColor = inactiveColorProp;
                rightAlign.style.backgroundColor = inactiveColorProp;
                break;
            case "center":
                leftAlign.style.backgroundColor = inactiveColorProp;
                centerAlign.style.backgroundColor = activeColorProp;
                rightAlign.style.backgroundColor = inactiveColorProp;
                break;
            case "right":
                leftAlign.style.backgroundColor = inactiveColorProp;
                centerAlign.style.backgroundColor = inactiveColorProp;
                rightAlign.style.backgroundColor = activeColorProp;
                break;
        }

        let formulaBar = document.querySelector(".formula-bar");
        formulaBar.value = cellProp.formula;
        cell.innerText = cellProp.value;
        
    })
}


// get active cell in UI and storage
function getCellAndCellProp(address){
    let [rid, cid] = decodeAddress(address);
    let cell = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
    let cellProp = sheetDB[rid][cid];
    return [cell, cellProp];
}


// decode cell address for matrix
function decodeAddress(address){
    let rid = Number(address.slice(1)) - 1;
    let cid = Number(address.charCodeAt(0)) - 65;
    return [rid, cid];
}
