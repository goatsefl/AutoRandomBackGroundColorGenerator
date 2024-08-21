const randomColors = () => {
	const first = Math.floor(Math.random() * 256);
	const second = Math.floor(Math.random() * 256);
	const third = Math.floor(Math.random() * 256);
	const alpha = Math.random() / 1.25;
	return `rgba(${first},${second},${third},${alpha})`;
};

const randomTransitions = () => {
	const x1 = Math.random();
	const y1 = Math.random();
	const x2 = Math.random();
	const y2 = Math.random();
	return `3s background-color cubic-bezier(${x1},${y1},${x2},${y2})`;
};

// Random changer logic
const changer = (delay) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (delay < 3001) {
				document.body.style.backgroundColor = randomColors();
				document.body.style.transition = randomTransitions();
				resolve(`Random color added`);
			} else {
				toggleOFF();
				toggleON();

				reject(`Connection Timed Out`);
			}
		}, delay);
	});
};

const randomColorChanger = async (colorCycle) => {
	if (colorCycle === 0) {
		throw new Error(
			"Give 1 to generate endless random colors at random delays"
		);
	}
	await changer(Math.floor(Math.random() * 3000));
	await randomColorChanger(colorCycle);
};

let bool = true;
const toggleButton = document.querySelector("button");
toggleButton.addEventListener("click", () => {
	if (bool) {
		toggleButton.textContent = "TURN-OFF";
		bool = false;
		const oN = async () => {
			await randomColorChanger(1);
		};
		oN();
	}
	if (!bool) {
		toggleButton.textContent = "TURN-ON";
		bool = true;
		const oFF = async () => {
			throw randomColorChanger(0);
		};
		oFF();
	}
});
