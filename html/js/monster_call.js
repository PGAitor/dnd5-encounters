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

function showNPC(npcID) {
    document.getElementById(npcID).classList.toggle("show-npc-sheet");
    document.getElementById(npcID+'Scroll').classList.toggle("npc-sheet-button-change");
}