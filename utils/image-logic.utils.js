const Jimp = require("jimp");

function returnClosestColourBead(coloursArr, testPixel) {
    console.log('called returnClosestColourBead')
    if (testPixel.r === 0 && testPixel.g === 0 && testPixel.b === 0 && testPixel.a === 0) {
        return { ...testPixel, colour_name: null, id: 0 };
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
        }
};

function imageToBeadArr(image_url, colourPallette, width_px, height_px) {
    return Jimp.read(image_url)
        .then(image => image.pixelate(1))
        .then(image => image.contrast(0.5))
        .then(image => image.resize(+width_px, +height_px))
        .then(image => {
            let pxlArr = [];
            for (let i = 1; i < (+width_px) + 1; i++) {
                let innerPxlArr = [];
                for (let y = 1; y < (+height_px) + 1; y++) {
                    const testPixel = image.getPixelColour(i, y);
                    const bead = returnClosestColourBead(colourPallette, Jimp.intToRGBA(testPixel));
                    innerPxlArr.push({ ...bead, i, y });
                }
                pxlArr.push(innerPxlArr);
            }
            return pxlArr;
        })
}

module.exports = {imageToBeadArr};
