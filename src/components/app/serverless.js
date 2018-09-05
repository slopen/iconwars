// @flow

const icons = [
	'https://static.thenounproject.com/png/1914407-200.png',
	'https://static.thenounproject.com/png/1908155-200.png',
	'https://static.thenounproject.com/png/1914438-200.png',
	'https://static.thenounproject.com/png/1898991-200.png',
	'https://static.thenounproject.com/png/1899015-200.png',
	'https://static.thenounproject.com/png/1896750-200.png',
	'https://static.thenounproject.com/png/1872031-200.png',
	'https://static.thenounproject.com/png/1872011-200.png',
	'https://static.thenounproject.com/png/1872001-200.png',
	'https://static.thenounproject.com/png/1864286-200.png',
	'https://static.thenounproject.com/png/1896710-200.png',
	'https://static.thenounproject.com/png/1864281-200.png'
];

const shuffleArray = (array: string []) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor (Math.random () * (i + 1));

        [array [i], array [j]] = [array [j], array [i]];
    }

    return array;
}

export default () => shuffleArray (icons);