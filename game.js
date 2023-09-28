var buttoncolors = ["green","red","yellow","blue"];
var gamepattern = [];
var userclickedpattern = [];

var started = false;
var level = 0;

$(document).keypress(function(){
    if (!started){    
        $("#level-title").text("Level "+ level);
        nextsequence();
        started = true;
    }
});

$(".btn").click(function(){
    var userchoosencolor = $(this).attr("id");
    userclickedpattern.push(userchoosencolor);

    playsound(userchoosencolor);
    animatepress(userchoosencolor);

    checkanswer(userclickedpattern.length-1);
});


function nextsequence(){
    userclickedpattern = [];
    level++;
    $("#level-title").text("Level "+level)
    var randomnumber = Math.random();
    randomnumber = Math.floor(randomnumber*4)  ;
    var randomchoosencolor = buttoncolors[randomnumber];
    gamepattern.push(randomchoosencolor);
    $("#"+randomchoosencolor).fadeOut(50).fadeIn(50)
    
    playsound(randomchoosencolor);
   
}



function playsound(name){
    var audio = new Audio(name+".mp3");
    audio.play();
}

function animatepress(currentcolor){
    $("#"+currentcolor).addClass("pressed");

    setTimeout(function(){
        $("#"+currentcolor).removeClass("pressed");
    },100);
}

function checkanswer(currentlevel){
    if (gamepattern[currentlevel]===userclickedpattern[currentlevel]){
        
        if (userclickedpattern.length===gamepattern.length){
            setTimeout(function(){
                nextsequence();
            },1000);
        }
    } else{   
        playsound("wrong");
        $("body").addClass("game-over");
        $("h1").text("Game-Over , Press any key to Restart");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);       
        startover();
    }
}
function startover(){
    level = 0;
    gamepattern = [];
   started = false;
}

