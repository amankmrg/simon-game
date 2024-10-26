var arr1 = [];

var obj = {
    1: "green",
    2: "red",
    3: "yellow",
    4: "blue",
    "green": 1,
    "red": 2,
    "yellow": 3,
    "blue": 4
};

var key_count = {"value" : 0};
var click_count = {"value" : 0};
var level = {"value" : 1};

function pressed_function(classNumber) {
    let className = obj[classNumber];
    let element = document.getElementById(className);
    element.classList.add("pressed");
    let titleElement = document.getElementById("level-title");
    titleElement.textContent = "Level " + level.value;
    playSound(classNumber);
    setTimeout(function () {
        element.classList.remove("pressed");
    }, 150);


}

function playSound(num){
    switch(num){
        case 1:
            let sound1 = new Audio("sounds/green.mp3");
            sound1.play();
            break;
        case 2:
            let sound2 = new Audio("sounds/red.mp3");
            sound2.play();
            break;
        case 3:
            let sound3 = new Audio("sounds/yellow.mp3");
            sound3.play();
            break;
        case 4:
            let sound4 = new Audio("sounds/blue.mp3");
            sound4.play();
            break;
        case 5:
            let sound5 = new Audio("sounds/wrong.mp3");
            sound5.play();
            break;
    }
};


function keyPress(key_coun) {
    if (key_coun.value == 0) {
        let randomNumber = Math.floor((Math.random() * 4) + 1);
        arr1.push(randomNumber);
        pressed_function(randomNumber);
        key_coun.value++;
    }

};

function wrong(){
    playSound(5);
    let body = document.body;
    body.classList.add('game-over');
    let titleElement = document.getElementById("level-title");
    titleElement.textContent = "Game Over, Press Any Key to Restart";
    arr1.splice(0);
    console.log(arr1);
    key_count.value = 0;
    click_count.value = 0;
    level.value = 0;
    level.value = 1;
    setTimeout(function(){
        body.classList.remove('game-over');
    },100);  
}

function clickEvent(click_count, className) {
    let classNumber = obj[className];
    if (arr1[click_count.value] == classNumber) {
        pressed_function(classNumber);
        click_count.value++;
    }
    else {
        wrong();
    }
    if (click_count.value == arr1.length && arr1.length != 0) {
        setTimeout(function(){
            let randomNumber = Math.floor((Math.random() * 4) + 1);
            arr1.push(randomNumber);
            click_count.value = 0;
            level.value++;
            pressed_function(randomNumber);
        },1000);
        
    }

    // console.log(arr1);
    // console.log(className);
};

document.addEventListener('keydown', function (event) {
    // console.log(event.key);
    keyPress(key_count);
});

document.addEventListener('click', function (event) {
    let clickedElement = event.target;
    let className = clickedElement.id;
    if(arr1.length!=0){
        if (className in obj) {
            clickEvent(click_count, className);
        }
    }
    

});

