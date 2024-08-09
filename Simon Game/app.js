let gameSeq=[];
let userSeq=[];
let level=0;
let gameStart=false;
let btns=["yellow","red","purple","green"];
let Scores=[];
let h2=document.querySelector("h2");
let startbtn=document.querySelector("button")
startbtn.addEventListener("click",function(){
    startbtn.innerText="Started";
    if(gameStart!=true){
        console.log("game start");
        gameStart=true;
        levelUp();
    }

});

function gameFlash(btn)
{
    btn.classList.add("flash");
    setTimeout(()=>{
        btn.classList.remove("flash");
    },250);
    autoBtnSound();
} 

function levelUp(){
    userSeq=[];
    level++;
    
    h2.innerHTML=`Level:${level}<br><br>`;
    let randIdx=Math.floor(Math.random()*3);
    let randColor=btns[randIdx];
    let randBtn=document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    gameFlash(randBtn);
}
function userFlash(btn)
{
    btn.classList.add("userflash");
    setTimeout(()=>{
        btn.classList.remove("userflash");
    },250);
} 
function checkAns(idx){
    //console.log(`curr lev ${level}`);
    
    if(userSeq[idx]===gameSeq[idx]){
        if(userSeq.length==gameSeq.length){
            setTimeout(levelUp,1000);
        }
    }
    else{
        Scores.push(level);
        highestScore=Scores.reduce((max,currEl)=>{
            if(max>currEl){
                return max;
            }
            else{
                return currEl;
            }
        });
        h2.innerHTML=`Game Over! Your score was <b>${level}</b><br>Highest Score:${highestScore}`;
        document.querySelector("body").style.backgroundColor="red";
        playSound();
        startbtn.innerText="Restart";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
        },150);

        reset();
    }
}
function btnPress(){
    let btn=this;
    userFlash(btn); 
    BtnSound();
    let userColor=btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}
let allBtns=document.querySelectorAll(".btn");

for( btn of allBtns){
    btn.addEventListener("click",btnPress);
}

function reset(){
    gameStart=false;
    gameSeq=[];
    userSeq=[];
    level=0;

}


//Audio effect
let gameover= new Audio('Audio/game-Over.mp3');
function playSound() {
    gameover.currentTime=0;
    gameover.play();
}

let btnClick= new Audio('Audio/btn-click.mp3');
function BtnSound() {
    btnClick.currentTime=0;
    btnClick.play();
}

let autobtnClick= new Audio('Audio/auto-click.mp3');
function autoBtnSound() {
    autobtnClick.currentTime=0;
    autobtnClick.play();
}



