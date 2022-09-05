/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function dropdownMenu(elementID) {
    document.getElementById(elementID).classList.toggle("show");
}
    
// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
        }
    }
}

fetch('http://localhost:8000/monsters?page=1&limit=10')
  .then((response) => response.json())
  .then((data) => console.log(data));