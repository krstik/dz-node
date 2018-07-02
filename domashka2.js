var fs = require('fs');
var fse = require('fs-extra');
var path = require('path');
var arrayUniq = require('array-uniq');
var program = require('commander');

program
  .version('1.0.0')
  .option('-o, --outdir [name]', 'Directory with sorted files witn name [output]', 'output')
  .option('-i, --inpdir [name]', 'Directory for sorting files with name [input]', 'input')
  .parse(process.argv);


const inputDir = './' + program.inpdir;
const outputDir = './' + program.outdir;
let dirNames = [];

async function createNewDir (directoryName)  {
  // Creating output folder(if exist delete)
  //if (fse.ensureDirSync(directoryName)) {
    fs.mkdir(directoryName, (folder) => {
      return folder
    })
  }

function getFolderOutPath (item) {
    var firstCharName = item.charAt(0).toUpperCase()
    var folderPath = path.join(outputDir, firstCharName)
    createNewDir(folderPath)
    return path.join(folderPath, item)
  }

// Creating catalog tree
async function readDir (base, level) {
  fs.readdir(base, function (err, files) {
    if (err) {
      console.log(err.stack)
    }

    files.forEach((item) => {
      var localBase = path.join(base, item)
      if (item[0]!='.'){
      fs.stat(localBase, (err, fileOrDir) => {
        if (err) {
          console.log(err)
        }

        if (fileOrDir.isDirectory()) {
          console.log(localBase + ' is directory')
          readDir(localBase, level + 1)
        } else {
          console.log(localBase + ' is file')
          copyItem(item, localBase)
        }
      })
    }
    })
  })
}

// /making folders in output
async function createDir (directoriesNames) {
  var uniqLetter = arrayUniq(directoriesNames);

  uniqLetter.forEach((item, i, arr) => {
    console.log(path.join(outputDir, item));
    fs(path.join(outputDir, item));
  });
};

// Copying files
function copyItem (item, localBase) {
  var outputFile = getFolderOutPath(item)
  fs.access(outputFile, () => {
    fs.createReadStream(localBase).pipe(fs.createWriteStream(outputFile))
  })
}



async function main () {
    try {
      // fs.exists(outputDir,exists=>{
      //   if (exists)
      //   {
      //     fse.remove(outputDir, err => {
      //       if (err) return console.error(err)
      //       console.log('Warning Output folder exists and will be removed')
      //     })
      //   }
      // })
      await createNewDir(outputDir);
      await readDir(inputDir, 0);
    } catch (error) {
      console.log(error)
    }
  }

main()
