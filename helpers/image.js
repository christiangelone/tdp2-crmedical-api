const request = require('request')
const Jimp = require('jimp');
const streamifier = require('streamifier')

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
        .then(img => new Promise((res, rej) => {
           img.quality(100).getBuffer(Jimp.MIME_PNG, (err, buffer) => {
               if(err) rej(err)
               else res(streamifier.createReadStream(buffer))
           })
        }))
}

const getImgBufferFromUrl = url => {
    return new Promise((res, rej) => {
        request.get({ url, encoding: null }, (err, _, buffer) => {
            if(err) rej(err)
            else res(buffer)
        });
    })
}

module.exports = {
    stampWatermark,
    getImgBufferFromUrl
}