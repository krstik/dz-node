// const fse = require('fs-extra');
// const path = require('path');
// const arrayUniq = require('array-uniq');
const commandLine = require('commander');

commandLine
  .version('0.0.1')
  .option('-m, --mkdir [name]', 'Make a new directory in current path witn name [result]', 'result')
  .option('-t, --targetdir [name]', 'Target directory for necessary sort files with name [input]', 'input')
  .parse(process.argv);

console.log(commandLine.mkdir);
console.log(commandLine.targetdir);

// const targetDir = './' + commandLine.targetdir;
// const resultDir = './' + commandLine.mkdir;
// let dirNames = [];

// const createNewDir = (directoryName) => {
//   // если папка создана, то почистим внутри данной директории
//   // если нет, то создадим
//   if (fse.ensureDirSync(resultDir)) {
//     console.log('есть');
//     fse.removeSync(directoryName);

//     fse.mkdir(directoryName, (err) => {
//       if (err) {
//         console.log('Error');
//       }
//       console.log('Папка очищена');
//     });
//   } else {
//     fse.mkdir(directoryName, (err) => {
//       if (err) {
//         console.log('Error');
//       }
//       console.log('Папка создана');
//     });
//   }
// };

// // Прочитаем все файлы внутри нашей директории и запишем первые буквы в массив
// const readDir = (targetDir, level) => {
//   const files = fse.readdirSync(targetDir);

//   files.forEach((item) => {
//     let localBase = path.join(targetDir, item);
//     let state = fse.statSync(localBase);
//     if (state.isDirectory()) {
//       readDir(localBase, level + 1);
//     } else {
//       dirNames.push(item[0]);
//     }
//   });
// };

// // Создадим папки в новой директории
// const createDir = (directoriesNames) => {
//   let uniqLetter = arrayUniq(directoriesNames);

//   uniqLetter.forEach((item, i, arr) => {
//     fse.mkdirSync(path.join(resultDir, item));
//   });
// };

// // Скопируем файлы
// const copyFiles = (targetDir, resultDir) => {
//   const files = fse.readdirSync(targetDir);

//   files.forEach((item) => {
//     let localBase = path.join(targetDir, item);
//     let state = fse.statSync(localBase);
//     if (state.isDirectory()) {
//       copyFiles(localBase, resultDir);
//     } else {
//       // fs.writeFileSync(resultDir + '/' + item[0] + '/' + item, fs.readFileSync(localBase));
//       fse.writeFileSync(path.join(resultDir, item[0], item), fse.readFileSync(localBase));
//     }
//   });
// };

// createNewDir(resultDir);
// readDir(targetDir, 0);
// createDir(dirNames);
// copyFiles(targetDir, resultDir);
