// grab DOM elements
const pwrbtn = document.querySelector(".dial");
const outer = document.querySelector(".outer");
const veins = document.querySelectorAll(".veins");
const wordcontainer = document.querySelector(".words");
const door = document.querySelector(".door");
const chikn = document.querySelector(".chikn");
const lwing = document.querySelector(".lwing");
const rwing = document.querySelector(".rwing");
const leye = document.querySelector(".leye");
const reye = document.querySelector(".reye");
const bubble = document.querySelector(".bubble");
const status = document.querySelector(".status");
const washer = document.querySelector(".washer");

// defining phrases for an chikn
const words = [
	"Can anybody hear me?",
	"The Frogs Locked me in here!",
	"Let me out!",
	"Bok bok",
	"I'm stuck here",
	"Bok bok",
	"Somebody!",
	"I am sorry for what I have done!"
]

// init and other stuff  
var synthesis = speechSynthesis;
status.innerHTML = 'off';
showSay(words[0]);
var counter = 0;
var complains = setInterval(shout, 3000, words);

// what happens when someone presses the button
// gracefully start and stop animation of the dial
var running = false;
pwrbtn.addEventListener('click', powerHandler);

function powerHandler(){
	status.innerHTML = 'on';
	status.classList.add('on');
	washer.classList.add('shaking');
	door.removeEventListener('click', doorhandler);
	// wait for the iteration to end and then change words an other stuff
	bubble.addEventListener('animationiteration', after);
	
	function after(){
		disableInterval();
		showSay("No not again!");
	}
	setTimeout(function(){
		bubble.removeEventListener('animationiteration', after);
	}, 3000);

	cancelAnimations(leye, reye);
	this.classList.toggle('active');
	if(!running){
		start();
		running = true;
	}
	chikn.classList.add('rotate');
	setTimeout(function(){
		googleyEyes();
		showVeins(veins);
	}, 2000);
	counter = 0;

	// =========Animation End==============

	chikn.addEventListener('animationend', endanim);

	function endanim(){
		status.innerHTML = 'off';
		status.classList.remove('on');
		washer.classList.remove('shaking');
		chikn.removeEventListener('animationend', endanim);
		stop();
		graduallyHideVeins();
		leye.classList.remove("googley");
		reye.classList.remove("googley");
		chikn.classList.remove("rotate");
		counter = 0;

		bubble.addEventListener('animationiteration', after);
		
		function after(){
			disableInterval();
			showSay("Well, that was rough");
			complains = setInterval(shout, 3000, words);
		}
		setTimeout(function(){
			bubble.removeEventListener('animationiteration', after);
		}, 3000);
		door.addEventListener('click', doorhandler);

	};
}

// helper functions
hideVeins();
function hideVeins(){
	veins.forEach(vein => {
		vein.style.display = "none";
	});
}

function graduallyHideVeins(){
	veins.forEach(vein => {
		vein.style.opacity = 0;
	});
}

function start() {
	outer.classList.add('active');
}

function stop() {
  outer.addEventListener('animationiteration', callback);
  running = false;

  function callback() {
    outer.classList.remove('active');
    outer.removeEventListener('animationiteration', callback);
  }
}

function shout(arr){
	var randWord = arr[Math.floor(arr.length * Math.random())];
	showSay(randWord);
	counter++;
	if(counter >= arr.length){
		counter = 0;
	}
}

function disableInterval(){
	clearInterval(complains);
	wordcontainer.innerHTML = '';
}

function showSay(phrase){
	wordcontainer.innerHTML = phrase;
	var utterance = new SpeechSynthesisUtterance(phrase);
	utterance.pitch = 1.6;
	utterance.rate = 1.2;
	//synthesis.speak(utterance);
}

//what happens when someone opens the door
door.addEventListener('click', doorhandler);

function doorhandler(){
	pwrbtn.removeEventListener('click', powerHandler);
	var bubble = document.querySelector(".bubble");

	bubble.addEventListener('animationiteration', function(){
		showSay('Oh, finally, Thanks!');
		var synthesis = '';
		setInterval(function(){
			bubble.style.display = 'none';
		}, 2500);
		chikn.classList.remove('rotate');
		chikn.classList.add('free');
	});

	clearInterval(complains);
	this.classList.add('open');
	rwing.classList.add('rflitter');
	lwing.classList.add('lflitter');
}

function googleyEyes(){
	leye.classList.add("googley");
	reye.classList.add("googley");
}
function showVeins(vein){
	vein.forEach(vein => {
		vein.style.opacity = 1;
		vein.style.display = "block";
	});
}

function cancelAnimations(el){
	for (var i = 0; i < arguments.length; i++) {
	    arguments[i].style.animation = 0;
	}
}

  //Countdown Timer
  function countdown() {
    const clockdiv = document.getElementById("countdown");
    const countDownTime = 2944248728000;

    const countdownfunction = setInterval(function () {
      const now = new Date().getTime();
      const diff = countDownTime - now;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      if (diff < 0) {
        clockdiv.style.display = "none";
        clearInterval(countdownfunction);
      } else {
        clockdiv.style.display = "block";
        clockdiv.querySelector(".days").innerHTML = days;
        clockdiv.querySelector(".hours").innerHTML = hours;
        clockdiv.querySelector(".minutes").innerHTML = minutes;
        clockdiv.querySelector(".seconds").innerHTML = seconds;
      }
    }, 1000);
  }

countdown();