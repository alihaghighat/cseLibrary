const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const md5 = require('md5');


// import class
const {ValidateEmail,ValidatePhone,ValidateNationalCode}=require('./functiones/validate');

const {getRecords, updateRecords, runSql, deleteRecords} = require("./database/database");

const managerClass=require("./class/managerFunctions");
const managerFunctions=new managerClass();
const cors = require('cors');
const corsOptions = {
    origin: (origin, callback) => {
            callback(null, true)


    }
}

app.use(cors(corsOptions));
// Catch 404 and forward to error handler

const port = 2209;

// use get json on body
app.use(express.json())
let sessionID;
console.log("new");
// start manager
app.post('/manager/login', async function (req, res) {
    const username = req.body.username;
    const password = req.body.password;
    console.log("ok");
    const login = await managerFunctions.login(username,password);
    if(login!=false){
        res.send(JSON.stringify({
            status:200,
            userToken:login.token,
            description:'با موفقیت واردشدید'
        }));
    }else {
        res.send(JSON.stringify({
            status:103,
            description:'نام کاربری و رمز عبور صحیح نمی باشد'
        }));
    }


})

app.get('/manager/pageDetaile/:pageName',async function (req, res) {

    const pageName = req.params.pageName;
    const pageDetaile = await managerFunctions.pageDetaile(pageName);
    if (pageDetaile != false) {
        res.send(JSON.stringify({
            status: 200,
            data:pageDetaile,
            description: "موفقیت آمیز"
        }));
    } else {
        res.send(JSON.stringify({
            status: 102,
            description: "نشست شما به پایان رسیده است."
        }));
    }


})
app.get('/manager/checkDetaileManager/:token',async function (req, res) {

    const token = req.params.token;
    const manager = await managerFunctions.getMnagerByToken(token);
    if (manager != false) {
        res.send(JSON.stringify({
            status: 200,
            data:manager,
            description: "موفقیت آمیز"
        }));
    } else {
        res.send(JSON.stringify({
            status: 102,
            description: "نشست شما به پایان رسیده است."
        }));
    }


})
app.get('/manager/menu/:token',async function (req, res) {
    const token = req.params.token;
    const manager = await managerFunctions.getMnagerByToken(token);
    if (manager != false) {
        const menu=await managerFunctions.menu(manager.kind);
        for (const item of menu) {
            const subArray = await managerFunctions.getSubMenus(item.id);
            item['subArray'] = subArray;

        }
        res.send(JSON.stringify({
            status: 200,
            data:menu,
            description: "موفقیت آمیز"
        }));
    } else {
        res.send(JSON.stringify({
            status: 102,
            description: "نشست شما به پایان رسیده است."
        }));
    }


})
app.post('/manager/rootCategory',async function (req, res) {
    const token = req.body.token;
    const manager = await managerFunctions.getMnagerByToken(token);
    if (manager != false) {
        const rootCategory=await managerFunctions.rootCategory();

        res.send(JSON.stringify({
            status: 200,
            data:rootCategory,
            description: "موفقیت آمیز"
        }));
    } else {
        res.send(JSON.stringify({
            status: 102,
            description: "نشست شما به پایان رسیده است."
        }));
    }


})

//end  manager


//end user
server.listen(port, () => {

    console.log(`Example app listening on port ${port}`)
});