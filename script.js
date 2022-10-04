
const genericStyle = "transition: all 2s ease; position: absolute; width: 50px; height: 50px";

function Vector (x, y) {
    this.x = Number(x) || (Math.random() * 2) - 1;
    this.y = Number(y) || (Math.random() * 2) - 1;
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