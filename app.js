'use strict'
	
{
  const screen = document.querySelector(`.screen`),
	status = document.querySelector(`.status`),
	scene = document.querySelector(`.scene`),
	lives = document.querySelector(`.lives`),
	timerBlock = document.querySelector(`.timer`),
	level = document.querySelector(`.level`),
	container = document.querySelector(`.container.clearfix`),
  nextLvlButton = document.getElementById(`next-level`),
	initialStatus = Object.freeze({
	lives: 3,
	level: 1
	}),
  currentStatus = {
    lives: 3,
    level: 1
  },
  currentlyChosen = {
    // 2 || 3
    lvl: 0,
    answers: [
      true,
      true,
      true
    ]
  },
	card1 = document.createElement(`div`),
	card2 = document.createElement(`div`),
	card3 = document.createElement(`div`),
	card4 = document.createElement(`div`),
	card5 = document.createElement(`div`),
	cardPic = document.createElement(`div`),
	cardPhoto = document.createElement(`div`),
  levelsData2 = [
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
  
	let timer,
  tickCounter = 30;

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
  

	const tick = () => {
		timerBlock.textContent = tickCounter--;
		if (!(+tickCounter)) {
			Engine.gameOver({
				//Дописать статы на завершение
			})
      clearInterval(timer);
		}
	};
	
  const getRandomLvlType = () => {
    if(!!Math.round(Math.random())) {
      return {lvlType: 2};
    };
    return {lvlType: 3};
  };
  
	const getRandomUnique = array => {
    if(!array.length) throw new Error(`Images database is empty!`);
    return array.splice((Math.floor(Math.random() * array.length)), 1);
  };
	
  const concatenatePath = centralPart => `file:///D:/JS/picPhoto/images/${centralPart}.jpg`;
  
  // If returns true => photo, false => picture
  const checkCodeType = code => (+code.slice(-8, 1) + +code.slice(-9, 1) + +code.slice(-12, 1)) % 4 === 0;
  
  const choosingTypeHandler = e => {
		const target = e.target;
    
    if(!target.classList.contains(`card-photo`) && !target.classList.contains(`card-pic`)) return;
    
    const parentNode = target.parentNode,
    siblingNext = target.nextElementSibling,
    siblingPrevious = target.previousElementSibling,
    type = checkCodeType(parentNode.style.backgroundImage);
    
    let result;
    
    target.classList.toggle(`chosen`);
    
    if(target.classList.contains(`card-pic`)){
      type ? result = false : result = true;
    }
    
    if(target.classList.contains(`card-photo`)) {
      type ? result = true : result = false;
    }
    
    if(result && !target.classList.contains(`chosen`)) result = false;
    
    if(parentNode.classList.contains(`card1-1`) || parentNode.classList.contains(`card2-1`)) {
      currentlyChosen.answers[0] = result;
    } else if(parentNode.classList.contains(`card1-2`) || parentNode.classList.contains(`card2-2`)) {
      currentlyChosen.answers[1] = result;
    } else {
      currentlyChosen.answers[2] = result;
    }
    
    siblingNext ? siblingNext.classList.remove(`chosen`) :
    siblingPrevious.classList.remove(`chosen`);
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
        currentlyChosen.lvl = 2;
				card1.style.backgroundImage = `url(${concatenatePath(getRandomUnique(levelsData2))})`;
				card2.style.backgroundImage = `url(${concatenatePath(getRandomUnique(levelsData2))})`;
				container.appendChild(card1);
				container.appendChild(card2);
				break;

				case 3:
        currentlyChosen.lvl = 3;
				card3.style.backgroundImage = `url(${concatenatePath(getRandomUnique(levelsData2))})`;
				card4.style.backgroundImage = `url(${concatenatePath(getRandomUnique(levelsData2))})`;
				card5.style.backgroundImage = `url(${concatenatePath(getRandomUnique(levelsData2))})`;
				container.appendChild(card3);	
				container.appendChild(card4);	
				container.appendChild(card5);	
				break;
        
				default:
				throw new Error(`Wrong type of level!`);
			};
		},
    
    addHandlers() {
      scene.addEventListener(`click`, choosingTypeHandler);
      nextLvlButton.addEventListener(`click`, nextLevelHandler);
    },
    
    // Time rest from every level counter should be added here
    checkLevelOutcome() {
    switch(currentlyChosen.lvl) {
        case 2:
        if (!(currentlyChosen.answers[0] && currentlyChosen.answers[1])) {
          currentStatus.lives--;
        }
        break;
        
        case 3:
        if (!(currentlyChosen.answers[0] && currentlyChosen.answers[1] && currentlyChosen.answers[2])) {
          currentStatus.lives--;
        }
        break;
        
        default:
        throw new Error(`Wrong type of level has been detected when checking outcome`);
        break;
      }
    },
    
    nextLevel(options){
      this.renderScene(options);
      this.renderStatus(options);
    },
    
    gameOver(options) {
      document.body.innerHTML = ``;
      document.body.textContent = `GAME OVER`;
    }
	});  
  
  window.EngineEntrance = (() => {
    return {
      nextLevel: Engine.nextLevel,
      checkLevelOutcome: Engine.checkLevelOutcome,
      renderStatus: Engine.renderStatus,
      renderScene: Engine.renderScene,
      clearScene: Engine.clearScene,
      gameOver: Engine.gameOver,
      addHandlers: Engine.addHandlers
    }
  })();
  
  const nextLevelHandler = e => { 
    EngineEntrance.checkLevelOutcome();
    EngineEntrance.nextLevel(Object.assign(currentStatus, getRandomLvlType()));
  };
}

const test = () => {
  EngineEntrance.renderScene({lvlType: 3});
  EngineEntrance.addHandlers();
}

