const Jimp = require("jimp");

function returnClosestColourBead(coloursArr, testPixel) {
    if (testPixel.r === 0 && testPixel.g === 0 && testPixel.b === 0 && testPixel.a === 0) {
        return { r: null, g: null, b: null, colour_name: null, id: 0 };
    };
    const outputArr = coloursArr.map(bead => {
        const deltaR = Math.pow(bead.r - testPixel.r, 2);
        const deltaG = Math.pow(bead.g - testPixel.g, 2);
        const deltaB = Math.pow(bead.b - testPixel.b, 2);
        const diff = Math.sqrt(deltaR + deltaG + deltaB);
        return { ...bead, diff }
    })
    const bestFitBead = outputArr.sort((a, b) => a.diff - b.diff)[0];
    return {
        'bead_id': bestFitBead.id,
        'colour_name': bestFitBead.colour_name,
        'r': bestFitBead.r,
        'g': bestFitBead.g,
        'b': bestFitBead.b,
        'brand': bestFitBead.brand,
        'style': bestFitBead.style,
        'size': bestFitBead.size
    }
};

function imageToBeadArr(image_url, colourPallette, width_px, height_px) {
    return Jimp.read(image_url)
        .then(image => image.pixelate(1))
        .then(image => image.contrast(0.5))
        .then(image => image.resize(+width_px, +height_px))
        .then(image => {
            const pxlArr = [];
            for (let y = 1; y < (+height_px) + 1; y++) {
                    for (let x = 1; x < (+width_px) + 1; x++) {
                    const testPixel = image.getPixelColour(x, y);
                    const bead = returnClosestColourBead(colourPallette, Jimp.intToRGBA(testPixel));
                    pxlArr.push({ ...bead, x, y });
                }
            }
            return pxlArr;
        })
}

module.exports = {imageToBeadArr};
