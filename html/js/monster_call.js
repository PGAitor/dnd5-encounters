var filterResult = [];
let lastClickedDropdown  = ''
/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function dropdownMenu(elementID) {
    lastClickedDropdown = elementID
    document.getElementById(elementID).classList.toggle("show");
}
// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
    var dropdowns = document.querySelectorAll(".dropdown-content");
    var clickedElement = event.target;

    dropdowns.forEach(function(dropdown) {
        if (dropdown.classList.contains('show')) {
            if (!clickedElement.matches(`.${lastClickedDropdown}`) || !dropdown.matches(`#${lastClickedDropdown}`)) {
                dropdown.classList.remove('show');
            }
        }
    })
}
let page = 1
fetch(`http://localhost:8000/monsters?page=${page}&limit=10`)
.then((response) => response.json())
.then((data) => {
    filterResult = data;
    filterResult.forEach(function (element) {
        let {name, type, size, cr, str, dex, con, int, wis, cha, hp, ac, savings, senses, skills, speed, tokenURL, traits, actions, immunities, legendaryActions, source, page} = element;
        let monsterDiv = `
                <div class="monster-line">
                    <div class="monster-cell monster-cell-avatar"><img src="${tokenURL}" alt="${name}" class="avatar"></div>
                    <div class="monster-cell monster-cell-name">${name}</div>
                    <div class="monster-cell monster-cell-type">${type}</div>
                    <div class="monster-cell monster-cell-size">${size}</div>
                    <div class="monster-cell monster-cell-cr">${cr}</div>
                    <div class="monster-cell monster-cell-add-button"><button class="monster-button"><div class="">ponlo</div></button></div>
                    <div onclick="showNPC('npcID${name}')" class="monster-cell monster-cell-expand-button"><button class="updown-button"><div class="">ficha</div></button></div>
                </div>
                <div id="npcID${name}" class="npcsheet">
                    <div class="npc-stats">hello</div>
                </div>`;
        document.getElementById('monsterResults').insertAdjacentHTML("beforeend",monsterDiv)
        //console.log(`Nombre: ${name} || Tipo: ${type} || Tamaño: ${size} || ND: ${cr}`)
    })
    filterResult.forEach(element => console.log(element))
});

function showNPC(npcID) {
    document.getElementById(npcID).classList.toggle("show-npc-sheet");
}
// let monsterDiv = `
// <div class="monster-cell">
//     <div class="monster-line">
//         <div class="monster-cell-avatar"><img src="${tokenURL}" alt="${name}" class="avatar"></div>
//         <div class="monster-cell monster-cell-name">${name}</div>
//         <div class="monster-cell monster-cell-type">${type}</div>
//         <div class="monster-cell monster-cell-size">${size}</div>
//         <div class="monster-cell monster-cell-cr">${cr}</div>
//         <div class="monster-cell monster-cell-add-button"><button class="monster-button"><div class="">ponlo</div></button></div>
//         <div onclick="showNPC('npcID')" class="monster-cell monster-cell-expand-button"><button class="updown-button"><div class="">ficha</div></button></div>
//     </div>
//     <div id="npcID" class="npcsheet"></div>
// </div>`