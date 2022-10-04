
const genericStyle = "transition: all 2s ease; position: absolute; width: 50px; height: 50px";

const vw = window.innerWidth;
const vh = window.innerHeight;

function Vector (x, y) {
    this.x = Number(x) || (Math.random() * 2) - 1;
    this.y = Number(y) || (Math.random() * 2) - 1;
}

// Gets coordinates at which this vector intersects with the viewport
function getLimit(thisVector, vh, vw) {
    // Top: 0
    // Right: 1
    // Bottom: 2
    // Left: 3
    const ratio = thisVector.y * (vw / vh);
    let result;
    if ((thisVector.x < ratio) && (thisVector.x > thisVector.y * ratio)) {
        (thisVector.y > 0) && (result = 0);
        (thisVector.y < 0) && (result = 2);
    }
    (thisVector.x > 0) && (result = 1);
    (thisVector.x < 0) && (result = 3);
    return result;
}

function Sticker (path, vector, dist1, dist2) {

}

function setup () {
    const button = document.querySelector("#mainBut");
    button.addEventListener("click", (e) => {
        console.log(new Vector())
    });
}

function createTestDiv () {
    const div = document.createElement("div");
    const body = document.querySelector("body");
    div.classList.add("test");
    div.style.cssText = "color: blue;";
    body.appendChild(div);
}

function switchState (willHide) {
    const div = document.querySelector(".test");
    div || createTestDiv();
    div.style.cssText = "transition: all 2s ease; position: absolute; left: 10vw;";    
}

setup()