const genericStyle =
    "transition: all 2s ease; position: absolute; width: 50px; height: 50px";

const containerSelector = "body";
const targetSelector = "body";

const container = document.querySelector(containerSelector)
const containerVec = new Vector(window.innerWidth, window.innerHeight);

function setup() {
    const button = document.querySelector("#mainBut");
    button.addEventListener("click", (e) => {
        console.log(new Sticker("cum"));
    });
}

// Adds an element to the DOM of the tag "tag", as a child of the node which fits "selector", with the inline style "style"
// You can add any other attribute as an array ["attributeName", "attributeValue"]

function addToDOM(tag, selector, style) {
    const target = document.querySelector(selector);
    const element = document.createElement(tag);
    if (style) {
        element.style.cssText = style;
    }
    for (let i = 3; i < arguments.length; i++) {
        if (arguments[i]) {
            element.setAttribute(arguments[i][0], arguments[i][1]);
        }
    }
    if (target) {
        target.appendChild(element);
    }
}

// Gets coordinates at which this vector intersects with the viewport
function getLimit(thisVector, quadrilateral) {
    // Functions to find the limit depending on the side it intersects with first
    const functions = {
        top: () => {
            let x = (thisVector.x * (quadrilateral.y / 2)) / thisVector.y;
            return new Vector(x, quadrilateral.y / 2);
        },
        bot: () => {
            let x = (thisVector.x * (-quadrilateral.y / 2)) / thisVector.y;
            return new Vector(x, -quadrilateral.y / 2);
        },
        rgt: () => {
            let y = (thisVector.y * (quadrilateral.x / 2)) / thisVector.x;
            return new Vector(quadrilateral.x / 2, y);
        },
        lft: () => {
            let y = (thisVector.y * (-quadrilateral.x / 2)) / thisVector.x;
            return new Vector(-quadrilateral.x / 2, y);
        },
    };

    // This finds which side the vector will intersect with first
    const ratio = thisVector.y * (quadrilateral.x / quadrilateral.y);

    let side;
    if (thisVector.x < ratio && thisVector.x > thisVector.y * ratio) {
        thisVector.y > 0 && (side = "top");
        thisVector.y < 0 && (side = "bot");
    }
    thisVector.x > 0 && (side = "rgt");
    thisVector.x < 0 && (side = "lft");

    return functions[side]();
}

// Gets a pseudo-random distance with higher frequency near the limits
function getRandDistance(max) {
    return Math.max(Math.random(), Math.random() + 0.15) * max;
}

// Calculates absolute coordinates based on vector and distance relative to the center
function calcCoords(vec, dist, offset) {
    // First calculate relative position
    const rel = new Vector(vec.x * dist + offset.x, vec.y * dist + offset.y);
    const abs = new Vector(rel.x + containerVec.x / 2, rel.y + containerVec.y / 2);
    return abs;
}

function Vector(x, y) {
    this.x = Number(x) || Math.random() * 2 - 1;
    this.y = Number(y) || Math.random() * 2 - 1;
    this.length = Math.sqrt(this.x ** 2 + this.y ** 2);
    // Gets distance to another vector
    this.getDistance = function (vec) {
        let x = this.x - vec.x;
        let y = this.y - vec.y;
        return Math.sqrt(x ** x + y ** 2);
    };
    // Returns a collinear unit vector
    this.unitVector = function () {
        return new Vector(this.x / this.length, this.y / this.length);
    };
}

function Sticker(path, vector, offset) {
    this.path = path;

    this.vector = vector || new Vector();
    this.vector = this.vector.unitVector();

    this.limit = getLimit(this.vector, containerVec);

    this.dist1 = getRandDistance(this.limit.length);
    this.dist2 = this.dist1 + this.limit.length;

    this.offset =
        offset ||
        new Vector(
            Math.random * (this.limit.length - this.dist1),
            Math.random * (this.limit.length - this.dist1)
        );

    this.init = "CUM";
}

setup();
