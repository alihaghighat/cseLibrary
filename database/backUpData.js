const fs = require('fs')
const mysqldump = require('mysqldump')
const {gregorian_to_jalali} = require("../functiones/shamsi");
const {getRecords,addRecords,updateRecords, deleteRecords} = require('../database/database');
const ndt=new Date();
const g_y=ndt.getFullYear();
const g_m=ndt.getMonth()+1;
const  g_d=ndt.getDate();
const g_time=ndt.getTime();
const shamsi=gregorian_to_jalali(g_y,g_m,g_d);
const date=shamsi[0]+'-'+shamsi[1]+'-'+shamsi[2];
const dumpFileName = `backupData/${date}_${g_time}.dump.sql`;
const Name = `${date}_${g_time}.tag`;

const writeStream = fs.createWriteStream(dumpFileName)
const AdmZip = require("adm-zip");





async function backupData() {
    console.log("start");

    console.log("start");

    mysqldump({
        connection: {
            host: 'localhost',
            user: 'parsenob_admin',
            password: 'haq5381haqali',
            database: 'parsenob_nobat',
        },
        dumpToFile: dumpFileName,
    }).then(  () => {
            var zip = new AdmZip();

// add file directly

            zip.addLocalFile("./" + dumpFileName);

// or write everything to disk
            zip.writeZip(/*target file name*/ `./backupData/${Name}`);

            console.log("end");
        }

    );
    const listOfVisit = await addRecords("tblBackUp",{name:Name})

}
module.exports={backupData}