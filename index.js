// Canvas Ready...

let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");

let atoms = [];

function DrawAtom(atom) {

    let {x, y, n, r} = atom;

    // Photon & Neutron
    ctx.beginPath();

    ctx.arc(x, y, r, 0, 2*Math.PI, true);
    ctx.lineWidth = 10;
    ctx.stroke();

    ctx.fillStyle = 'pink';
    ctx.fill();

    ctx.closePath();

    // Electron
    for (let i = 0; i < n; i++) {
        ctx.beginPath();
        if (i < 2)
            ctx.arc(x + (r + 40) * Math.cos(i * Math.PI), y + (r + 40) * Math.sin(i * Math.PI), 10, 0, 2*Math.PI, true);
        else if (i < 10)
            ctx.arc(x + (r + 80) * Math.cos((i - 2) * Math.PI / 4), y + (r + 80) * Math.sin((i - 2) * Math.PI / 4), 10, 0, 2*Math.PI, true);
        else if (i < 18)
            ctx.arc(x + (r + 120) * Math.cos((i - 10) * Math.PI / 4), y + (r + 120) * Math.sin((i - 10) * Math.PI / 4), 10, 0, 2*Math.PI, true);
        else
            ctx.arc(x + (r + 160) * Math.cos((i - 18) * Math.PI), y + (r + 160) * Math.sin((i - 18) * Math.PI), 10, 0, 2*Math.PI, true);
        ctx.lineWidth = 10;
        ctx.stroke();
        ctx.fillStyle = 'skyblue';
        ctx.fill();
        ctx.closePath();
    }
}


// When user clicks the button...

$(".controls > button").mousedown( function() {
    $(".controls > button").addClass("button-pressed");
    let x = Math.floor(Math.random() * canvas.width);
    let y = Math.floor(Math.random() * canvas.height);
    let n = $(".controls > input").val();
    let len = atoms.push({x, y, n, r: n * 2 + 30});
    DrawAtom(atoms[len - 1]);
});


// When user clicks canvas...

let isCanvasClicked = false;
let clickedAtom = undefined;
let canvasX = 0;
let canvasY = 0;

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
            DrawAtom(atom);
    }
    else if (isCanvasClicked) {
        // Move canvas
    } 
});


// When the mouse click is done...

$(document).mouseup( function () {
    $(".controls > button").removeClass("button-pressed");
    clickedAtom = undefined;
    isCanvasClicked = false;
});


// How the object moves...
function Move(obj, x, y) {
    $(obj).animate()
}