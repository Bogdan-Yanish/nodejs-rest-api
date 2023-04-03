const Jimp = require("jimp");

const avatarJimpManipulation = async(path) => {
    const avatarImg = await Jimp.read(path);
    await avatarImg
            .cover(
                250,
                250,
                Jimp.HORIZONTAL_ALIGN_CENTER || Jimp.VERTICAL_ALIGN_MIDDLE
                )
            .writeAsync(path);
}

module.exports = avatarJimpManipulation;