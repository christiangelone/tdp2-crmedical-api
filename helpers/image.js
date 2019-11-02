var Jimp = require('jimp');

const stampWatermark = (bufferImg, bufferWatermarkImg) => {
    return Jimp
        .read(bufferImg)
        .then(img => Jimp.read(bufferWatermarkImg).then(watermark => {
            watermark.opacity(0.75)
            return img.composite(
                watermark,
                1000,
                1420,
                [Jimp.BLEND_DESTINATION_OVER, 0.2, 0.2]
            );
        }))
        .then(img => img.quality(100))
}

// stampWatermark('receta.jpg', 'autorizado.png')
//     .then(img => img.write('result.png'))