import fs from 'fs';
import process from 'process';
import rdl from 'readline';

export const progressbar = async () => {
    const size = 80;
    let filledSize = 0;
    let sizeOfFiles = 0;
    let sizeOfDownloadedFiles = 0;
    const path = "./files/fsHard/";

    rdl.cursorTo(process.stdout, 0);
    
    for (let i = 0; i < size; i++) {
        if (i === 0) {
            process.stdout.write("[")
        } else if (i === size - 1) {
            process.stdout.write("]")
        } else {
            process.stdout.write(".")
        }
    }

    rdl.cursorTo(process.stdout, 1);

    const files = await new Promise(resolve => {
        fs.readdir(path, (err, data) => {
           resolve(data);
        })
    })

    for (let i = 0; i < files.length; i++) {
        sizeOfFiles += fs.statSync(`${path}${files[i]}`).size;
    }

    for (let file of files) {
        download(path, file).then(data => {
            fs.stat(`${path}${file}`, (err, file) => {
                sizeOfDownloadedFiles += file.size;
                let percent = sizeOfDownloadedFiles / sizeOfFiles;

                while (filledSize < 80 * percent - 3) {
                    if (filledSize === 76) {
                        process.stdout.write("##");
                        rdl.cursorTo(process.stdout, filledSize + 4);
                        filledSize++;
                    } else {
                        process.stdout.write("#")
                        filledSize++;
                    }
                }
            })
        });
    }
}

export function download(path, file) {
    return new Promise(resolve => {
        setTimeout(() => {
            fs.readFile(`${path}${file}`, 'utf8', (err, data) => {
                resolve(data);
            });
        }, Math.random() * 3000);
    })
}
