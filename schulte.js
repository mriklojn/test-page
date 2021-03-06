/* https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
 * durstenfeld shuffle (in place)
 */
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


var url_params = new URLSearchParams(location.search);
const HEIGHT = url_params.get("height") || url_params.get("h") || 5;
const WIDTH = url_params.get("width") || url_params.get("w") || 5;

var current = 1;
var html_table = document.getElementsByTagName("TABLE")[0];
var insert = "";
var list = Array(WIDTH*HEIGHT);
var start_time, end_time;



for (let i = 0; i < HEIGHT; i++) {
    insert += "<tr>";
    for (let j = 1; j <= WIDTH; j++) {
        let count = i*WIDTH + j;
        insert += `<td onclick="process(this)" id="${count}"></td>`;
    }
    insert += "</tr>";
} /* generate table */
html_table.innerHTML = insert;

for (let i=1; i <= WIDTH*HEIGHT; i++) {
    list[i-1] = i;
}

function reset_game() {
    current = 1;
    shuffle(list);
    for (let i=1; i <= WIDTH*HEIGHT; i++) {
        document.getElementById(i).innerHTML = list[i-1];
    }
    html_table.style.display = "table";
    document.getElementById("gratz").innerHTML = '';
    document.getElementById("restart").style.display = "none";
}

function flash_color(elem, color, time) {
    var old_color = elem.style.backgroundColor;
    elem.style.backgroundColor = color;
    setTimeout(()=>{elem.style.backgroundColor = old_color;}, time);
}

function process(elem) {
    if (current == 1) {
        start_time = Date.now();
    }
    if (elem.innerText == current) {
        flash_color(elem, "#080", 100);
        current++;
    }
    else {
        flash_color(elem, "#800", 300);
    }
    if (current-1 == WIDTH*HEIGHT) {
        end_time = Date.now();
        html_table.style.display = "none";
        document.getElementById("gratz").innerHTML=`You took ${((end_time - start_time)/1000).toFixed(1)}s to finish`;
        document.getElementById("restart").style.display = "initial";
    }
}

reset_game();
