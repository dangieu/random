let player1 = {
    occupied: [],
    color: "blue",
    score: 0
};
let player2 = {
    occupied: [],
    color: "red",
    score: 0
};
let awaiting = [];
let turn = 0;
let winnerBlocks;
let allBlocks = [];
let dimension;
let time = 20;

function createCube() {
    let cube = document.getElementsByClassName("cube")[0];
    let bottomSings = document.createElement("div");
    bottomSings.id = "bottom-signs";
    let turnLight = document.createElement("div");
    let clock = document.createElement("div");
    clock.id = "clock"
    clock.innerHTML = secsToDigital(time);
    turnLight.id = "turn";
    bottomSings.append(turnLight);
    bottomSings.append(clock)
    cube.append(bottomSings)
    let classList;
    switch(dimension) {
        case 3: 
            classList = ["first-layer-3", "second-layer-3", "third-layer-3"];
            break;
        case 4:
            classList = ["first-layer-4", "second-layer-4", "third-layer-4", "fourth-layer-4"];
            break;
    }
    for(layer in classList) {
        let newLayer = document.createElement("div");
        newLayer.style.gridTemplateColumns = "repeat(" + classList.length + ",1fr)"
        newLayer.style.gridTemplateRows = "repeat(" + classList.length + ",1fr)"
        newLayer.classList.add(classList[layer])
        let newLabel = document.createElement("div");
        newLabel.id = classList[layer].slice(0, classList[layer].length - 8) + "-label";
        newLabel.innerHTML = Number(layer)+1 + " Layer"
        newLayer.append(newLabel)
        cube.append(newLayer);
        for(let row=0; row<dimension; row++) {
            for (let column = 0; column < dimension; column++) {
                let newBlock = document.createElement("div");
                newBlock.classList.add("block")
                newBlock.id = "l" + layer + "r" + row + "c" + column;
                allBlocks.push(newBlock.id)
                clickListener(newBlock)
                newLayer.append(newBlock);
                for (side of ["front", "left", "back", "right", "top", "bottom"]) {
                    let newSide = document.createElement("span");
                    newSide.classList.add(side)
                    newBlock.append(newSide);
                }
            }
        }
    }
}
function clickListener(newBlock) {
    newBlock.addEventListener("click", () => {
        if (document.getElementById("bottom-signs").style.display != "none") {
            if (turn % 2 == 0 && !player1.occupied.concat(player2.occupied).includes(newBlock.id)) {
                player1.occupied.push(newBlock.id);
                Array.from(newBlock.children).forEach((value) => {
                    value.style.backgroundColor = player1.color;
                })
                document.getElementById("turn").style.background = "red";
                document.getElementById("turn").style.boxShadow = "0 0 10px 5px red";
                turn++;
            } else if (!player2.occupied.concat(player1.occupied).includes(newBlock.id)) {
                player2.occupied.push(newBlock.id)
                Array.from(newBlock.children).forEach((value) => {
                    value.style.backgroundColor = player2.color;
                })
                document.getElementById("turn").style.background = "blue";
                document.getElementById("turn").style.boxShadow = "0 0 10px 5px blue";
                turn++;
            }
        clock()
        gameOver()
        }
    })
}
function modelUp(event, winBlocks) {
    winnerBlocks = winBlocks;
    if (event === undefined || event.key === "q" ) {
        document.querySelectorAll('div[id$="label"]').forEach((label) => label.style.display = "none")
        document.getElementById("bottom-signs").style.display = "none";
        document.getElementById("dimension").style.visibility = "hidden";
        switch(dimension) {
            case 3:
                document.getElementsByClassName("first-layer-3")[0].classList.add("first-layer-transition-3")
                document.getElementsByClassName("third-layer-3")[0].classList.add("third-layer-transition-3")
                break;
            case 4:
                document.getElementsByClassName("first-layer-4")[0].classList.add("first-layer-transition-4")
                document.getElementsByClassName("second-layer-4")[0].classList.add("second-layer-transition-4")
                document.getElementsByClassName("third-layer-4")[0].classList.add("third-layer-transition-4")
                document.getElementsByClassName("fourth-layer-4")[0].classList.add("fourth-layer-transition-4")
        }
        document.getElementById("side").style.visibility = "hidden";
        (turn%2) ? player1.score++ : player2.score++
        awaiting.push(setTimeout(() => {
            document.getElementsByClassName("cube")[0].classList.add("layer-transition");

        }, 1000))
        awaiting.push(setTimeout(() => {
            document.getElementsByClassName("cube")[0].classList.add("rotate-animated")
            switch (dimension) {
                case 3:
                    document.getElementsByClassName("first-layer-3")[0].classList.add("first-layer-transited-3")
                    document.getElementsByClassName("first-layer-3")[0].classList.remove("first-layer-transition-3")
                    document.getElementsByClassName("third-layer-3")[0].classList.add("third-layer-transited-3")
                    document.getElementsByClassName("third-layer-3")[0].classList.remove("third-layer-transition-3")
                    document.getElementsByClassName("third-layer-3")[0].classList.add("third-layer-transited-3")
                    break;
                case 4:
                    document.getElementsByClassName("first-layer-4")[0].classList.add("first-layer-transited-4")
                    document.getElementsByClassName("first-layer-4")[0].classList.remove("first-layer-transition-4")
                    document.getElementsByClassName("second-layer-4")[0].classList.add("second-layer-transited-4")
                    document.getElementsByClassName("second-layer-4")[0].classList.remove("second-layer-transition-4")
                    document.getElementsByClassName("third-layer-4")[0].classList.add("third-layer-transited-4")
                    document.getElementsByClassName("third-layer-4")[0].classList.remove("third-layer-transition-4")
                    document.getElementsByClassName("fourth-layer-4")[0].classList.add("fourth-layer-transited-4")
                    document.getElementsByClassName("fourth-layer-4")[0].classList.remove("fourth-layer-transition-4")
            }
            document.getElementsByTagName("body")[0].addEventListener("click", reset)
            document.getElementsByTagName("body")[0].style.backgroundImage = 
            `linear-gradient(#151515 80%, ${(turn%2) ? player1.color : player2.color} 100%)`;
            Array.from(document.querySelectorAll('div[class*="-layer-"]')).forEach((layer => {
                layer.addEventListener("mouseover", opacityDown);
                layer.addEventListener("mouseout", opacityUp)
            }))
            
            
        }, 1500))
    }
}
function reset(event) {
    if(event.key == undefined || event.key === " ") {
        awaiting.forEach((timeout) => clearTimeout(timeout))
        awaiting = [];
        document.getElementById("blue-score").innerHTML = player1.score;
        document.getElementById("red-score").innerHTML = player2.score;
        document.getElementsByTagName("body")[0].style.backgroundImage = "none"
        switch (dimension) {
            case 3:
                document.getElementsByClassName("first-layer-3")[0].classList.remove("first-layer-transition-3")
                document.getElementsByClassName("third-layer-3")[0].classList.remove("third-layer-transition-3")
                document.getElementsByClassName("first-layer-3")[0].classList.remove("first-layer-transited-3")
                document.getElementsByClassName("third-layer-3")[0].classList.remove("third-layer-transited-3")
                break;
            case 4:
                document.getElementsByClassName("first-layer-4")[0].classList.remove("first-layer-transition-4")
                document.getElementsByClassName("first-layer-4")[0].classList.remove("first-layer-transited-4")
                document.getElementsByClassName("second-layer-4")[0].classList.remove("second-layer-transition-4")
                document.getElementsByClassName("second-layer-4")[0].classList.remove("second-layer-transited-4")
                document.getElementsByClassName("third-layer-4")[0].classList.remove("third-layer-transition-4")
                document.getElementsByClassName("third-layer-4")[0].classList.remove("third-layer-transited-4")
                document.getElementsByClassName("fourth-layer-4")[0].classList.remove("fourth-layer-transition-4")
                document.getElementsByClassName("fourth-layer-4")[0].classList.remove("fourth-layer-transited-4")
                
        }
        
        document.getElementsByClassName("cube")[0].classList.remove("layer-transition");
        document.getElementsByClassName("cube")[0].classList.remove("rotate-animated");
        document.querySelectorAll('div[id$="label"]').forEach((label) => label.style.display = "block");
        document.getElementById("side").style.visibility = "visible";
        document.getElementById("dimension").style.visibility = "visible";
        document.getElementById("bottom-signs").style.display = "block";
        document.getElementsByTagName("body")[0].removeEventListener("click", reset)
        Array.from(document.querySelectorAll(".block span")).forEach((side) => side.style.backgroundColor = "transparent");
        Array.from(document.getElementsByTagName("span")).forEach((side) => side.style.opacity = "1.0")
        Array.from(document.querySelectorAll('div[class*="-layer-"]')).forEach((layer => {
            layer.removeEventListener("mouseover", opacityDown);
            layer.removeEventListener("mouseout", opacityUp)
        }))
        document.getElementById("clock").innerHTML = secsToDigital(time)
        player1.occupied = [];
        player2.occupied = [];
    }
}
function gameOver() {
    let diagonals;
    switch(dimension) {
        case 3:
            diagonals = [
                `l(.)r\\1c\\1`,
                `(l0r2c2)|(l1r1c1)|(l2r0c0)`,
                `(l0r2c0)|(l1r1c1)|(l2r0c2)`,
                `(l0r0c2)|(l1r1c1)|(l2r2c0)`
            ]
            break;
        case 4:
            diagonals = [
                `l(.)r\\1c\\1`,
                `(l0r3c3)|(l1r2c2)|(l2r1c1)|(l3r0c0)`,
                `(l0r3c0)|(l1r2c1)|(l2r1c2)|(l3r0c3)`,
                `(l0r0c3)|(l1r1c2)|(l2r2c1)|(l3r3c0)`
            ]
    }
    diagonals.forEach((diagonal => {
        if(countMatches(player1.occupied, player2.occupied, new RegExp(diagonal)) === dimension) {
            modelUp(undefined, new RegExp(diagonal))
        }
    }))
    for(let layer=0; layer<dimension; layer++) {
        switch (dimension) {
            case 3:
                diagonals = [
                    `l(.)r\\1c${layer}`,
                    `l(.)r${layer}c\\1`,
                    `(l0r2c${layer})|(l1r1c${layer})|(l2r0c${layer})`,
                    `(l0r${layer}c2)|(l1r${layer}c1)|(l2r${layer}c0)`,
                    `l${layer}r(.)c\\1`,
                    `(l${layer}r0c2)|(l${layer}r1c1)|(l${layer}r2c0)`
                ]
                break;
            case 4:
                diagonals = [
                    `l(.)r\\1c${layer}`,
                    `l(.)r${layer}c\\1`,
                    `(l0r3c${layer})|(l1r2c${layer})|(l2r1c${layer})|(l3r0c${layer})`,
                    `(l0r${layer}c3)|(l1r${layer}c2)|(l2r${layer}c1)|(l3r${layer}c0)`,
                    `l${layer}r(.)c\\1`,
                    `(l${layer}r0c3)|(l${layer}r1c2)|(l${layer}r2c1)|(l${layer}r3c0)`
                ]
        }
        diagonals.forEach((diagonal => {
            if (countMatches(player1.occupied, player2.occupied, new RegExp(diagonal)) === dimension) {
                modelUp(undefined, new RegExp(diagonal))
            }
        }))
        for (let row = 0; row < dimension; row++) {
            let columns = [
                `l.r${layer}c${row}`,
                `l${layer}r${row}c.`,
                `l${layer}r.c${row}`
            ]
            columns.forEach((column => {
                if (countMatches(player1.occupied, player2.occupied, new RegExp(column)) === dimension) { 
                    modelUp(undefined, new RegExp(column)) 
                }
            }))
        }
    }
}
function opacityDown() {
    console.log()
    notWinnerBlocks(allBlocks, winnerBlocks).forEach((block) => {
        Array.from(document.getElementById(block).children).forEach((side) => {
            side.style.opacity = "0.1"
            side.style.transition = "opacity 0.2s linear"
        })
    })
}
function opacityUp() {
    notWinnerBlocks(allBlocks, winnerBlocks).forEach((block) => {
        Array.from(document.getElementById(block).children).forEach((side) => {
            side.style.opacity = "1.0";
            side.style.transition = "opacity 0.4s linear"
        })
    })
}
function scoreReset() {
    player1.score=0, player2.score = 0
    document.getElementById("blue-score").innerHTML = player1.score;
    document.getElementById("red-score").innerHTML = player2.score;

}
function setDimension(option) {
    let Z;
    switch(option.id) {
        case "dimension-3":
            if(dimension==3) break;
            dimension = 3
            Array.from(document.getElementsByClassName("cube")[0].children).forEach((layer) => layer.remove())
            allBlocks = [];
            createCube()
            Z = 0.05;
            document.getElementById("bottom-signs").classList.remove("bottom-position-4");
            player1.occupied = [];
            player2.occupied = [];
            awaiting.forEach((interval) => clearInterval(interval))
            break;
        case "dimension-4":
            if(dimension==4) break;
            dimension = 4
            Array.from(document.getElementsByClassName("cube")[0].children).forEach((layer) => layer.remove())
            allBlocks = [];
            createCube()
            Z = 0.0385;
            document.getElementById("bottom-signs").classList.add("bottom-position-4");
            player1.occupied = [];
            player2.occupied = [];
            awaiting.forEach((interval) => clearInterval(interval))
            break;
    }
    
    
    Array.from(document.querySelectorAll(".front")).forEach((side) => side.style.transform = `translateZ(calc(70vw * ${Z}))`)
    Array.from(document.querySelectorAll(".back")).forEach((side) => side.style.transform = `translateZ(calc(70vw * -${Z}))`)
    Array.from(document.querySelectorAll(".right")).forEach((side) => side.style.transform = `rotateY(-90deg) translateZ(calc(70vw * ${Z}))`)
    Array.from(document.querySelectorAll(".top")).forEach((side) => side.style.transform = `rotateX(90deg) translateZ(calc(70vw * ${Z}))`)
    Array.from(document.querySelectorAll(".left")).forEach((side) => side.style.transform = `rotateY(90deg) translateZ(calc(70vw * ${Z}))`)
    Array.from(document.querySelectorAll(".bottom")).forEach((side) => side.style.transform = `rotateX(-90deg) translateZ(calc(70vw * ${Z}))`)
}
function clock() {
    awaiting.forEach((interval) => clearInterval(interval))
    document.getElementById("clock").innerHTML = secsToDigital(time)
    let count = time-1;
    function countDown() {
        document.getElementById("clock").innerHTML = secsToDigital(count)
        count--;
        if(count===-1) {
            turn++
            if(turn%2) {
                document.getElementById("turn").style.background = "red";
                document.getElementById("turn").style.boxShadow = "0 0 10px 5px red";
            } else {
                document.getElementById("turn").style.background = "blue";
                document.getElementById("turn").style.boxShadow = "0 0 10px 5px blue";
            }
            clearInterval(1)
            clock()
        }  
    }
    awaiting.push(setInterval(countDown, 1000))
}
function secsToDigital(time) {
    let minutes = Math.floor(time/60);
    let seconds = time%60;
    seconds = (String(seconds).length == 1) ? "0" + seconds : seconds;
    return minutes+":"+seconds
} 




function countMatches(array1, array2, seeked) {
    return Math.max(array1.reduce((total, value) => {
        return seeked.test(value) ? total + 1 : total;
    }, 0), array2.reduce((total, value) => {
        return seeked.test(value) ? total + 1 : total;
    }, 0))
}
function notWinnerBlocks(array, trio) {
    return array.filter((value) => {
        return !trio.test(value)
    })
}



//------------------------config-------------------------------------
createCube()
setDimension(document.getElementById("dimension-3"))
