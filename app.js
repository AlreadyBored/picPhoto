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
		
	card1.classList.add(`card2-1`);
	card1.classList.add(`clearfix`);
	card2.classList.add(`card2-2`);
	card2.classList.add(`clearfix`);
	card3.classList.add(`card1-1`);
	card3.classList.add(`clearfix`);
	card4.classList.add(`card1-2`);
	card4.classList.add(`clearfix`);
	card5.classList.add(`card1-3`);
	card5.classList.add(`clearfix`);
	cardPic.classList.add(`card-pic`);
	cardPhoto.classList.add(`card-photo`);
	card1.appendChild(cardPic);
	card1.appendChild(cardPhoto);
	card2.appendChild(cardPic);
	card2.appendChild(cardPhoto);
	card3.appendChild(cardPic);
	card3.appendChild(cardPhoto);
	card4.appendChild(cardPic);
	card4.appendChild(cardPhoto);
	card5.appendChild(cardPic);
	card5.appendChild(cardPhoto);
	
	const currentStatus = {};
	let timer;
	let tickCounter = 30;
	
	const tick = () => {
		//Дописать статы на завершение
		timerBlock.textContent = tickCounter--;
		if (!tickCounter) {
			Engine.gameOver({
				//...
			})
		}
	};
	
	const getRandom = (a, b) => Math.floor(min + Math.random() * (max + 1 - min));
	
	const levelsData2 = [{
		lvlType: 2,
		src1: `src1`,
		src2: `src2`
	},
	{
		lvlType: 2,
		src1: `src3`,
		src2: `src4`
	},
	{
		lvlType: 2,
		src1: `src5`,
		src2: `src6`
	},
	{
		lvlType: 2,
		src1: `src7`,
		src2: `src8`
	},
	{
		lvlType: 2,
		src1: `src9`,
		src2: `src10`
	},
	{
		lvlType: 2,
		src1: `src11`,
		src2: `src12`
	}];
	
	const levelsData3 = [{
		lvlType: 3,
		src1: `src1`,
		src2: `src2`,
		src3: `src3`
	},
	{
		lvlType: 3,
		src1: `src4`,
		src2: `src5`,
		src3: `src6`
	},
	{
		lvlType: 3,
		src1: `src7`,
		src2: `src8`,
		src3: `src9`
	},
	{
		lvlType: 3,
		src1: `src10`,
		src2: `src11`,
		src3: `src12`
	},
	{
		lvlType: 3,
		src1: `src13`,
		src2: `src14`,
		src3: `src15`
	},
	{
		lvlType: 3,
		src1: `src16`,
		src2: `src17`,
		src3: `src18`
	}];
	
	window.Engine = Object.freeze({
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
				
				default:
				throw new Error(`Wrong lives value!`);
				break;
			}
			
			tickCounter = 30;
			timer = setInterval(tick, 1000);
		}
		
		renderScene(options) {
			switch(options.lvlType) {
				case 2:
				card1.style.backgroundImage = `url(${options.src1})`;
				card2.style.backgroundImage = `url(${options.src2})`;
				scene.appendChild(card1);
				scene.appendChild(card2);
				break;

				case 3:
				card1.style.backgroundImage = `url(${options.src1})`;
				card2.style.backgroundImage = `url(${options.src2})`;
				card3.style.backgroundImage = `url(${options.src3})`;
				scene.appendChild(card3);	
				scene.appendChild(card4);	
				scene.appendChild(card5);	
				break;
				
			}
			
		}
	})
}



