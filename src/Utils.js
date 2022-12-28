export const withGrid = (n) =>  {
    return n * 16;
};

export const setGridCoords = (x, y) => {
    return `${x * 16}, ${y * 16}`
};

export const asGridCoords = (x, y) => {
    return `${x * 16},${y * 16}`
};

export const nextPosition = (initialX, initialY, direction) => {
    let x = initialX;
    let y = initialY;
    const size = 16;
    if (direction === 'left') {
        x -= size;
    } else if (direction === 'right') {
        x += size;
    } else if (direction === 'up') {
        y -= size;
    } else if (direction === "down") {
        y += size;
    }
    return { x , y };
};

export const oppositeDirection = (direction) => {
    if (direction === "left") {
        return "right";
    }
    if (direction === "right") {
        return "left";
    }
    if (direction === "up") {
        return "down";
    }
    return "up";
};

export const loadWall = (mapCollision) =>  {
    const boundaries = [];
		for (let i = 0; i < mapCollision.length; i += Math.sqrt(mapCollision.length)) {
			const mapCollisionArray = [];
			mapCollisionArray.push(mapCollision.slice(i, Math.sqrt(mapCollision.length) + i));

			let k = (i / Math.sqrt(mapCollision.length));
			mapCollisionArray.forEach((row, i) => {
				row.forEach((symbol, j) => {
					if (symbol !== 0) boundaries.push([setGridCoords(j, k), true]);
				});
			});
		}
	const boundariesObj = Object.fromEntries(boundaries);
	return boundariesObj;
};

export const loadGrass = (mapGrass) =>  {
    const grassStats = [];
		for (let i = 0; i < mapGrass.length; i += Math.sqrt(mapGrass.length)) {
			const grassArray = [];
			grassArray.push(mapGrass.slice(i, Math.sqrt(mapGrass.length) + i));

			let k = (i / Math.sqrt(mapGrass.length));
			grassArray.forEach((row, i) => {
				row.forEach((symbol, j) => {
					if (symbol !== 0) grassStats.push([setGridCoords(j, k), true]);
				});
			});
		}
	const grassStatsObj = Object.fromEntries(grassStats);
	return grassStatsObj;
};

export const loadBump = (mapBump) =>  {
    const boundaries = [];
		for (let i = 0; i < mapBump.length; i += Math.sqrt(mapBump.length)) {
			const mapBumpArray = [];
			mapBumpArray.push(mapBump.slice(i, Math.sqrt(mapBump.length) + i));

			let k = (i / Math.sqrt(mapBump.length));
			mapBumpArray.forEach((row, i) => {
				row.forEach((symbol, j) => {
					if (symbol !== 0) boundaries.push([setGridCoords(j, k), true]);
				});
			});
		}
	const boundariesObj = Object.fromEntries(boundaries);
	return boundariesObj;
};

export const wait = (ms) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
};

export const randomFromArray = (array) =>  {
    return array[Math.floor(Math.random() * array.length)];
}

export const emitEvent = (name, detail) => {
    const event = new CustomEvent(name, {
        detail
    });
    document.dispatchEvent(event);
};


export const setLanguage = () =>  {
    const lang = localStorage.getItem("language")
    return  lang;
};