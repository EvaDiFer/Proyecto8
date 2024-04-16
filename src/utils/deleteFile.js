const cloudinary = require('cloudinary').v2;

const deleteFile = (url) => {
  //   console.log(url);

  //   const imgUrl =
  //     'https://res.cloudinary.com/djhjuxyes/image/upload/v1713178833/Biblioteca/dqbxdsxawxzq5rj58hbb.jpg ';

  const imgSplited = url.split('/');

  const folderName = imgSplited.at(-2);
  const fileName = imgSplited.at(-1).split('.')[0];

  cloudinary.uploader.destroy(`${folderName}/${fileName}`, () => {
    console.log('deleting');
  });
};

module.exports = { deleteFile };
