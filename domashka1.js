const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');
const arrayUniq = require('array-uniq');
const program = require('commander');

program
  .version('1.0.0')
  .option('-o, --outdir [name]', 'Directory with sorted files witn name [output]', 'output')
  .option('-i, --inpdir [name]', 'Directory for sorting files with name [input]', 'input')
  .parse(process.argv);


const inputDir = './' + program.inpdir;
const outputDir = './' + program.outdir;
let dirNames = [];

const createNewDir = (directoryName) => {
  // Creating output folder(if exist delete)
  //if (fse.ensureDirSync(directoryName)) {
    if (fs.existsSync(directoryName)) {
    console.log('Folder exist');
    fse.removeSync(directoryName);

    fs.mkdir(directoryName, (err) => {
      if (err) {
        console.log('Error');
      }
      console.log('Folder is empty');
    });
  } else {
    fs.mkdir(directoryName, (err) => {
      if (err) {
        console.log('Error');
      }
      console.log('Folder created');
    });
  }
};

// Creating catalog tree
const readDir = (inputDir, level) => {
  const files = fs.readdirSync(inputDir);

  files.forEach((item) => {
    let localBase = path.join(inputDir, item);
    let state = fse.statSync(localBase);
    if (state.isDirectory()) {
      readDir(localBase, level + 1);
    } else {
      if (item[0]!='.') dirNames.push(item[0]);
    }
  });
};

// /making folders in output
const createDir = (directoriesNames) => {
  let uniqLetter = arrayUniq(directoriesNames);

  uniqLetter.forEach((item, i, arr) => {
    console.log(path.join(outputDir, item));
    fs.mkdirSync(path.join(outputDir, item));
  });
};

// Copying files
const copyFiles = (inputDir, outputDir) => {
  const files = fs.readdirSync(inputDir);

  files.forEach((item) => {
    let localBase = path.join(inputDir, item);
    let state = fs.statSync(localBase);
    if (state.isDirectory()) {
      copyFiles(localBase, outputDir);
    } else {
      if (item[0]!='.') fse.writeFileSync(path.join(outputDir, item[0], item), fse.readFileSync(localBase));
    }
  });
};

createNewDir(outputDir);
readDir(inputDir, 0);
createDir(dirNames);
copyFiles(inputDir, outputDir);
