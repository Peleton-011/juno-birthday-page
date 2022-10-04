
const genericStyle = "transition: all 2s ease; position: "absolute; width: 50px; height: 50px",

function Vector (x, y) {
    this.x = Number(x);
    this.y = Number(y);
    this.random = () => {
        function negOnetoPosOne () {
            return (Math.random() * 2) - 1;
        }
        this.x = negOnetoPosOne();
        this.y = negOnetoPosOne();
    }
}

function Sticker (path, vector, dist1, dist2) {

}

function setup () {
    const button = document.querySelector("#mainBut");
    button.addEventListener("click", (e) => {
        switchState();
    });
}

function createTestDiv () {
    const div = document.createElement("div");
    const body = document.querySelector("body");
    div.classList.add("test");
    div.style.cssText = ;
    body.appendChild(div);
}

function switchState (willHide) {
    const div = document.querySelector(".test");
    div || createTestDiv();
    div.style.cssText = "transition: all 2s ease; position: absolute; left: 10vw;";    
}

setup()