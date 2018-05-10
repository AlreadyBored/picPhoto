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
	
	const currentStatus = {};
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
		`file:///D:/JS/picPhoto/images/02-PHOTO.jpg`,
		`file:///D:/JS/picPhoto/images/01-PHOTO.jpg`,
		`file:///D:/JS/picPhoto/images/03-PHOTO.jpg`,
		`file:///D:/JS/picPhoto/images/04-PHOTO.jpg`,
		`file:///D:/JS/picPhoto/images/05-PHOTO.jpg`,
		`file:///D:/JS/picPhoto/images/06-PHOTO.jpg`,
		`file:///D:/JS/picPhoto/images/07-PHOTO.jpg`,
		`file:///D:/JS/picPhoto/images/08-PHOTO.jpg`,
		`file:///D:/JS/picPhoto/images/09-PHOTO.jpg`,
		`file:///D:/JS/picPhoto/images/10-PHOTO.jpg`,
		`file:///D:/JS/picPhoto/images/11-PHOTO.jpg`,
  ];
	
	const levelsData3 = [{
		lvlType: 3,
		src1: `file:///D:/JS/picPhoto/images/01-PHOTO.jpg`,
		src2: `file:///D:/JS/picPhoto/images/01-PHOTO.jpg`,
		src3: `file:///D:/JS/picPhoto/images/01-PHOTO.jpg`
	},
	{
		lvlType: 3,
		src1: `file:///D:/JS/picPhoto/images/01-PHOTO.jpg`,
		src2: `file:///D:/JS/picPhoto/images/01-PHOTO.jpg`,
		src3: `file:///D:/JS/picPhoto/images/01-PHOTO.jpg`
	},
	{
		lvlType: 3,
		src1: `file:///D:/JS/picPhoto/images/01-PHOTO.jpg`,
		src2: `file:///D:/JS/picPhoto/images/01-PHOTO.jpg`,
		src3: `file:///D:/JS/picPhoto/images/01-PHOTO.jpg`
	},
	{
		lvlType: 3,
		src1: `file:///D:/JS/picPhoto/images/01-PHOTO.jpg`,
		src2: `file:///D:/JS/picPhoto/images/01-PHOTO.jpg`,
		src3: `file:///D:/JS/picPhoto/images/01-PHOTO.jpg`
	},
	{
		lvlType: 3,
		src1: `file:///D:/JS/picPhoto/images/01-PHOTO.jpg`,
		src2: `file:///D:/JS/picPhoto/images/01-PHOTO.jpg`,
		src3: `file:///D:/JS/picPhoto/images/01-PHOTO.jpg`
	},
	{
		lvlType: 3,
		src1: `file:///D:/JS/picPhoto/images/01-PHOTO.jpg`,
		src2: `file:///D:/JS/picPhoto/images/01-PHOTO.jpg`,
		src3: `file:///D:/JS/picPhoto/images/01-PHOTO.jpg`
	}];
	
  
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
        card1.style.backgroundImage = `url(${getRandomUnique(levelsData2)})`;
				card2.style.backgroundImage = `url(${getRandomUnique(levelsData2)})`;
        container.appendChild(card1);
				container.appendChild(card2);
				break;

				case 3:
				card3.style.backgroundImage = `url(${getRandomUnique(levelsData2)})`;
				card4.style.backgroundImage = `url(${getRandomUnique(levelsData2)})`;
				card5.style.backgroundImage = `url(${getRandomUnique(levelsData2)})`;
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



