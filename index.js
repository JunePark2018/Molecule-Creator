// Click Buttons...

$("button").mousedown( function() {
    $("button").addClass("button-pressed");
    let x = Math.floor(Math.random() * canvas.width);
    let y = Math.floor(Math.random() * canvas.height);
    atoms.push(DrawAtom(x, y, 1));
});

$("button").mouseup( function() {
    $("button").removeClass("button-pressed");
});


// Canvas Ready...

let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");

let atoms = [];

function DrawAtom(x, y, n) {
    ctx.beginPath();

    let r = n * 2 + 30;
    ctx.arc(x, y, r, 0, 2*Math.PI, true);
    ctx.lineWidth = 10;
    ctx.stroke();

    ctx.fillStyle = '#aaa';
    ctx.fill();

    ctx.closePath();

    return {x, y, n, r};
}


// When user clicks canvas...

let isCanvasClicked = false;
let clickedAtom = undefined;

$("canvas").mousedown( function (event) {
    // Check if the user clicked one of the atoms...
    let mouseX = event.clientX - canvas.getBoundingClientRect().x;
    let mouseY = event.clientY - canvas.getBoundingClientRect().y;
    
    for (let i = atoms.length - 1; i >= 0; i--) {
        if (Math.sqrt(Math.pow(atoms[i].x - mouseX, 2) + Math.pow(atoms[i].y - mouseY, 2)) <= atoms[i].r) {
            clickedAtom = {i, distX: atoms[i].x - mouseX, distY: atoms[i].y - mouseY};
            break;
        }
    }

    // Else, the user clicked the blank...
    if (clickedAtom != undefined) {
        isCanvasClicked = true;
    }
});

$("canvas").mousemove( function (event) {
    let mouseX = event.clientX - canvas.getBoundingClientRect().x;
    let mouseY = event.clientY - canvas.getBoundingClientRect().y;

    $("p").text("마우스 좌표: { X: " + mouseX + " / Y: " + mouseY + " }");

    if (clickedAtom != undefined) {
        atoms[clickedAtom.i].x = mouseX + clickedAtom.distX;
        atoms[clickedAtom.i].y = mouseY + clickedAtom.distY;
        ctx.clearRect(0, 0, canvas.width, canvas.height);        
        for (let atom of atoms)
            DrawAtom(atom.x, atom.y, atom.n);
    }    
});

$("canvas").mouseup( function () {
    clickedAtom = undefined;
    isCanvasClicked = false;
});