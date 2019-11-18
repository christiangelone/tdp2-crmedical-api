const request = require('request')
const Jimp = require('jimp');

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

const getImgBufferFromUrl = url => {
    return new Promise((res, rej) => {
        request.get({ url, encoding: null }, (err, res, buffer) => {
            if(err) rej(err)
            else res(buffer)
        });
    })
}

module.exports = {
    stampWatermark,
    getImgBufferFromUrl
}