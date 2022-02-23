let rows = 100;
let cols = 26;

let rowNumberCont = document.querySelector(".row-number-cont");
let colLetterCont = document.querySelector(".col-letter-cont");
let cellsCont = document.querySelector(".cells-cont");
let addressBar = document.querySelector(".address-bar");

// add row number div 
for(let r = 0; r < rows; r++){
    let rowNumber = document.createElement("div");
    rowNumber.setAttribute("class", "row-number");
    rowNumber.innerText = r + 1;
    rowNumberCont.appendChild(rowNumber);
}

// add col letter div
for(let c = 0; c < cols; c++){
    let colLetter = document.createElement("div");
    colLetter.setAttribute("class", "col-letter");
    colLetter.innerText = String.fromCharCode(65 + c);
    colLetterCont.appendChild(colLetter);
}

//create cells
for(let r = 0; r < rows; r++){
    let rowCont = document.createElement("div");
    rowCont.setAttribute("class", "row-cont");
    for(let c = 0; c < cols; c++){
        let cell = document.createElement("div");
        cell.setAttribute("class", "cell");
        cell.setAttribute("contenteditable", "true");
        cell.setAttribute("spellcheck", "false");
        //attributes for cell identification
        cell.setAttribute("rid", r);
        cell.setAttribute("cid", c);
        rowCont.appendChild(cell);
        addListenerForAddressBarDisplay(cell, r, c);
    }
    cellsCont.appendChild(rowCont);
}

//add cell name to address bar
function addListenerForAddressBarDisplay(cell, r, c){
    cell.addEventListener("click", (e) => {
        let rowId = r + 1;
        let colId = String.fromCharCode(c + 65);
        addressBar.value =`${colId}${rowId}`;
    })
}


