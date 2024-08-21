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
				reject(`Connection Timed Out`);
			}
		}, delay);
	});
};
const toggleButton = document.querySelector("button");
let bool = false;
const randomColorChanger = async () => {
	while (bool) {
		await changer(Math.floor(Math.random() * 3000));
	}
};

toggleButton.addEventListener("click", () => {
	bool = !bool;
	toggleButton.textContent = bool ? "TURN-OFF" : "TURN-ON";
	if (bool) {
		randomColorChanger();
	}
});
