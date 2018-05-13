'use strict'
	
{
	const screen = document.querySelector(`.screen`),
	status = document.querySelector(`.status`),
	scene = document.querySelector(`.scene`),
	lives = document.querySelector(`.lives`),
	timerBlock = document.querySelector(`.timer`),
	level = document.querySelector(`.level`),
	container = document.querySelector(`.container.clearfix`),
	initialStatus = Object.freeze({
	lives: 3,
	level: 1
	}),
	card1 = document.createElement(`div`),
	card2 = document.createElement(`div`),
	card3 = document.createElement(`div`),
	card4 = document.createElement(`div`),
	card5 = document.createElement(`div`),
	cardPic = document.createElement(`div`),
	cardPhoto = document.createElement(`div`);
		
	card1.className = (`card2-1 clearfix`);
	card2.className = (`card2-2 clearfix`);
	card3.className = (`card1-1 clearfix`);
	card4.className = (`card1-2 clearfix`);
	card5.className = (`card1-3 clearfix`);
	cardPic.classList.add(`card-pic`);
	cardPhoto.classList.add(`card-photo`);
  
	card1.appendChild(cardPic.cloneNode());
	card1.appendChild(cardPhoto.cloneNode());
	card2.appendChild(cardPic.cloneNode());
	card2.appendChild(cardPhoto.cloneNode());
	card3.appendChild(cardPic.cloneNode());
	card3.appendChild(cardPhoto.cloneNode());
	card4.appendChild(cardPic.cloneNode());
	card4.appendChild(cardPhoto.cloneNode());
	card5.appendChild(cardPic.cloneNode());
	card5.appendChild(cardPhoto.cloneNode());
	
	const currentStatus = {},
	currentChoice = {};
	
	let timer;
	let tickCounter = 30;
	
	const tick = () => {
		timerBlock.textContent = tickCounter--;
		if (!(+tickCounter)) {
			Engine.gameOver({
				//Дописать статы на завершение
			})
      clearInterval(timer);
		}
	};
	
	const getRandomUnique = array => {
    if(!array.length) throw new Error(`Images database is empty!`);
    return array.splice((Math.floor(Math.random() * array.length)), 1);
  };
	
  
	const levelsData2 = [
		`014019894`,
    `015419511`,
    `045784200`,
    `088148729`,
    `108399674`,
    `147344416`,
    `148984220`,
    `149888649`,
    `209109608`,
    `245148128`,
    `249284765`,
    `284648156`,
    `301700303`,
    `341384159`,
    `346144634`,
    `346348974`,
    `383988344`,
    `398400743`,
    `442748315`,
    `486044545`,
    `599491437`,
    `607809806`,
    `615809195`,
    `617690196`,
    `640784746`,
    `688844308`,
    `712799787`,
    `786188524`,
    `791790177`,
    `802999257`,
    `810801126`,
    `847384162`,
    `896000334`,
    `995209102`,
    `998710227`
  ];
	
  const concatenateRoute = centralPart => `file:///D:/JS/picPhoto/images/${centralPart}.jpg`;
  
	const choosingTypeHandler = e => {
		const target = e.target;
		
	};
	
	const Engine = Object.freeze({
		renderStatus(options) {
			currentStatus.lives = options.lives;
			currentStatus.level = options.level;
			
			level.textContent = `LEVEL ${currentStatus.level}`;
			
			switch(currentStatus.lives) {
				case 3:
				lives.textContent = `♥♥♥`;
				break;
				
				case 2:
				lives.textContent = `♥♥♡`;
				break;
				
				case 1:
				lives.textContent = `♥♡♡`;
				break;
        
        case 0:
        this.gameOver();
        break;
				
				default:
				throw new Error(`Wrong lives value!`);
				break;
			}
			
			tickCounter = 30;
      tick();
      if(timer) clearInterval(timer);
			timer = setInterval(tick, 1000);
		},
		
		clearScene() {
			container.innerHTML = ``;
		},
    
		renderScene(options) {
			this.clearScene();
			switch(options.lvlType) {
				case 2:
				card1.style.backgroundImage = `url(${concatenateRoute(getRandomUnique(levelsData2))})`;
				card2.style.backgroundImage = `url(${concatenateRoute(getRandomUnique(levelsData2))})`;
				container.appendChild(card1);
				container.appendChild(card2);
				break;

				case 3:
				card3.style.backgroundImage = `url(${concatenateRoute(getRandomUnique(levelsData2))})`;
				card4.style.backgroundImage = `url(${concatenateRoute(getRandomUnique(levelsData2))})`;
				card5.style.backgroundImage = `url(${concatenateRoute(getRandomUnique(levelsData2))})`;
				container.appendChild(card3);	
				container.appendChild(card4);	
				container.appendChild(card5);	
				break;
        
				default:
				throw new Error(`Wrong type of level!`);
			};
		},
    
    gameOver(options) {
      document.body.innerHTML = ``;
      document.body.textContent = `GAME OVER`;
    },
    
    // If returns true => photo, else => picture
    checkCodeType(code) {
      return (+code.slice(-4, 1) + +code.slice(-5, 1) + +code.slice(-8, 1)) % 4 === 0;
    }
	});
  
  window.EngineEntrance = (() => {
    return {
      renderStatus: Engine.renderStatus,
      renderScene: Engine.renderScene,
      clearScene: Engine.clearScene,
      gameOver: Engine.gameOver
    }
  })();
}


