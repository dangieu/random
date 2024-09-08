let cube = document.querySelector(".cube");
let blocks = document.querySelectorAll(".block");
let turn = 0;

let player1Blocks = []
let player2Blocks = []



function cubeInteraction(block) {
    block.classList.add(turn%2 ? "chosen-player2" : "chosen-player1");
    updatePlayerBlocks(block)
    turn++;
    console.log(player1Blocks, ":", player2Blocks)
    if(strike()) {gameOver()}
}

function updatePlayerBlocks(block) {
    if (block.classList.contains("chosen-player1")) {
        player1Blocks.push([block.id])
    }
    if (block.classList.contains("chosen-player2")) {
        player2Blocks.push([block.id])
    }
}
function strike() {
    for(blocks of player1Blocks) {
        for(let triple=0; triple<3; triple++) {

        }
    }
}


function regExpCount(regExp) {
    
}



function gameOver() {
    cube.classList.add("folded")
}