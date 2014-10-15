all: cleanshots screenshots

cleanshots:
	trap 'rm screenshots/*.png' EXIT

screenshots:
	casperjs screenshots.js
