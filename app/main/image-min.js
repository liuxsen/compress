const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');
const fs = require("fs");
const path = require('path');
// const path = require('path');
// const imagePath = path.join(__dirname, 'static') + '/images/*.{jpg,png}';
// console.log(imagePath);

// (async () => {
// 	const files = await imagemin([imagePath], {
// 		destination: 'build/images',
// 		plugins: [
// 			imageminJpegtran(),
// 			imageminPngquant({
// 				quality: [0.1, 0.1]
// 			})
// 		]
// 	});

// 	// console.log(files);
// 	//=> [{data: <Buffer 89 50 4e …>, destinationPath: 'build/images/foo.jpg'}, …]
// })();

// const Electron = require('electron');
const Electron = require('electron');
const { dialog, Notification } = Electron;
const fsStat = (path) => {
  return new Promise((resolve, reject)=>{
    fs.stat(path,function(err,stat){
      if (err) {
        console.error(err);
        reject(err);
      }
      console.log(stat);
      resolve({
        isFile: stat.isFile(),
        isDirectory: stat.isDirectory()
      });
    });
  });
};

const miniImage = async (input) => {
  const output = await dialog.showSaveDialog();
  for (let index = 0; index < input.length; index++) {
    const element = input[index];
    console.log(element.path);
    const {isFile} = await fsStat(element.path);
    const minPath = isFile ? element.path : element.path+'/**.{jpg,png,jpeg}';
    await imagemin([minPath], {
      destination: output,
      plugins: [
        imageminJpegtran(),
        imageminPngquant({
          quality: [0.1, 0.1]
        })
      ]
    });
  }
  console.log('压缩完成');
  if(Notification.isSupported()){
    const notice = new Notification({
      title: '压缩完成',
      // subtitle: '感谢使用compress',
      // body: '压缩完成',
      silent: true,
      icon: path.join(__dirname, '../../assets/icons/fiddle.png')
    });
    notice.show();
  }
  return true;
};

module.exports = miniImage;