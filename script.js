const genericStyle =
    "transition: all 2s ease; position: absolute; width: 50px; height: 50px";

const containerSelector = "body";
const targetSelector = "body";

const target = document.querySelector(targetSelector);
const container = document.querySelector(containerSelector);
const containerVec = new Vector(container.offsetWidth, container.offsetHeight);

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
    const abs = new Vector(
        rel.x + containerVec.x / 2,
        rel.y + containerVec.y / 2
    );
    return abs;
}

// Returns CSS Text needed to get an element to the specified coords
function coordsToStyle(pos) {
    let result = "position: absolute; left: ";
    result += pos.x + "px";
    result += "bottom: ";
    result += pos.y + "px";
    return result;
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
    this.toUnitVector = function () {
        return new Vector(this.x / this.length, this.y / this.length);
    };
}

// A Sticker is defined by a vccector and a distance, the vector starts at the center of the parent element, and the distance is the point along that vector at which the Sticker is found
function Sticker(path, vector, offset) {
    this.path = path;
    this.isShown = false;

    this.vector = vector || new Vector();
    this.vector = this.vector.toUnitVector();

    this.limit = getLimit(this.vector, containerVec);

    this.dist1 = getRandDistance(this.limit.length);
    this.dist2 = this.dist1 + this.limit.length;

    // A random offset to make it feel less repetitive
    this.offset =
        offset ||
        new Vector(
            Math.random * (this.limit.length - this.dist1),
            Math.random * (this.limit.length - this.dist1)
        );

    this.coords1 = calcCoords(this.vector, this.dist1, this.offset);
    this.coords2 = calcCoords(this.vector, this.dist2, this.offset);

    this.style = "transition: all 2s ease; width: 50px; height: 50px";

    // This adds the image to the DOM
    this.init = function () {
        const initialStyle = this.style + coordsToStyle(this.coords2);
        const altString = `${this.path.split(".")[0]} Sticker.`;
        addToDOM(
            "img",
            targetSelector,
            initialStyle,
            ["src", this.path],
            ["alt", altString]
        );
    };

    // This updates the shown image
    this.update = function () {
        const currentStyle =
            this.style +
            (this.isShown
                ? coordsToStyle(this.coords1)
                : coordsToStyle(this.coords2));
        const img = document.querySelector("img[src = this.path]");
        img.style.cssText = currentStyle;
    };

    this.hide = function () {
        this.shown = false;
        this.update();
    };

    this.show = function () {
        this.shown = true;
        this.update();
    };

    this.switch = function () {
        if (this.isShown) {
            this.hide();
        }
        this.show();
    };
}

setup();
