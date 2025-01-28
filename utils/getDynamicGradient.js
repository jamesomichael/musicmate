import { Vibrant } from 'node-vibrant/browser';

module.exports = async (
	image,
	defaultGradient = 'linear-gradient(to bottom, #3fbf3f, #3fbf3f)'
) => {
	try {
		const palette = await Vibrant.from(image).getPalette();
		const colourFrom = palette.DarkVibrant.hex;
		const colourTo = palette.DarkMuted.hex;
		return `linear-gradient(to bottom, ${colourFrom}, ${colourTo})`;
	} catch (err) {
		console.error('Error generating colors:', err.message);
	}
	return defaultGradient;
};
