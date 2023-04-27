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
app.post('/manager/addCategory',async function (req, res) {
    const token = req.body.token;
    const name = req.body.name;
    const root = req.body.root;
    const manager = await managerFunctions.getMnagerByToken(token);
    if (manager != false) {
        const addCategory=await managerFunctions.addCategory({
            name:name,
            subId:root,
            active:'active'
        });
        if(addCategory!=false){
            res.send(JSON.stringify({
                status: 200,
                description: "موفقیت آمیز"
            }));
        }else{
            res.send(JSON.stringify({
                status: 108,
                description: "عدم ثبت اطلاعات"
            }));
        }


    } else {
        res.send(JSON.stringify({
            status: 102,
            description: "نشست شما به پایان رسیده است."
        }));
    }


})
app.post('/manager/addBook',async function (req, res) {
    const token = req.body.token;
    const name = req.body.name;
    const category = req.body.category;
    const comod = req.body.comod;
    const ghafase = req.body.ghafase;
    const manager = await managerFunctions.getMnagerByToken(token);
    if (manager != false) {
        const addBook=await managerFunctions.addBook({
            name:name,
            comode:comod,
            category:category,
            ghafase:ghafase,
            status:'active'
        });
        if(addBook!=false){

            res.send(JSON.stringify({
                status: 200,
                description: "موفقیت آمیز"
            }));
        }else{
            res.send(JSON.stringify({
                status: 108,
                description: "عدم ثبت اطلاعات"
            }));
        }


    } else {
        res.send(JSON.stringify({
            status: 102,
            description: "نشست شما به پایان رسیده است."
        }));
    }


})
app.post('/manager/editeCategory',async function (req, res) {
    const token = req.body.token;
    const name = req.body.name;
    const root = req.body.root;
    const id = req.body.id;
    const manager = await managerFunctions.getMnagerByToken(token);
    if (manager != false) {
        const editeCategory=await managerFunctions.editeCategory({
            name:name,
            subId:root,
            active:'active'
        },id);
        if(editeCategory!=false){
            res.send(JSON.stringify({
                status: 200,
                description: "موفقیت آمیز"
            }));
        }else{
            res.send(JSON.stringify({
                status: 108,
                description: "عدم ثبت اطلاعات"
            }));
        }


    } else {
        res.send(JSON.stringify({
            status: 102,
            description: "نشست شما به پایان رسیده است."
        }));
    }


})
app.post('/manager/deactiveCategory',async function (req, res) {
    const token = req.body.token;
    const id = req.body.id;
    const manager = await managerFunctions.getMnagerByToken(token);
    if (manager != false) {
        const editeCategory=await managerFunctions.editeCategory({
            active:'notActive'
        },id);
        if(editeCategory!=false){
            res.send(JSON.stringify({
                status: 200,
                description: "موفقیت آمیز"
            }));
        }else{
            res.send(JSON.stringify({
                status: 108,
                description: "عدم ثبت اطلاعات"
            }));
        }


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
app.post('/manager/categoryList',async function (req, res) {
    const token = req.body.token;
    const limit= req.body.limit;
    const page=req.body.page;
    const keyword= req.body.keyword;
    const manager = await managerFunctions.getMnagerByToken(token);
    if (manager != false) {
        const startLimit=(parseInt(page)-1)*parseInt(limit);
        const endLimit=startLimit+parseInt(limit);
        const rootCategory=await managerFunctions.rootCategory();
        for(let item in rootCategory){
            const temp=rootCategory[item];
            const subcategory=await managerFunctions.subCategory(temp.id);
            temp['subcategory']=subcategory;
        }

        res.send(JSON.stringify({
            status: 200,
            data:rootCategory.slice(startLimit,endLimit),
            count:rootCategory.length,
            description: "موفقیت آمیز"
        }));
    } else {
        res.send(JSON.stringify({
            status: 102,
            description: "نشست شما به پایان رسیده است."
        }));
    }


})
app.post('/manager/categoryDetaile',async function (req, res) {
    const token = req.body.token;
    const id= req.body.id;

    const manager = await managerFunctions.getMnagerByToken(token);
    if (manager != false) {

        const categoryDetaile=await managerFunctions.categoryDetaile(id);
        res.send(JSON.stringify({
            status: 200,
            data:categoryDetaile,

            description: "موفقیت آمیز"
        }));
    } else {
        res.send(JSON.stringify({
            status: 102,
            description: "نشست شما به پایان رسیده است."
        }));
    }


})
app.post('/manager/bookList',async function (req, res) {
    const token = req.body.token;
    const limit= req.body.limit;
    const page=req.body.page;
    const keyword= req.body.keyword;
    const manager = await managerFunctions.getMnagerByToken(token);
    if (manager != false) {
        const startLimit=(parseInt(page)-1)*parseInt(limit);
        const endLimit=startLimit+parseInt(limit);
        const books= await managerFunctions.books(keyword);
        for(let item in books){
            let temp=books[item];
            let categortD=await managerFunctions.categoryDetaile(books[item].category);
            temp['categoryName']=categortD[0].name;
        }
        res.send(JSON.stringify({
            status: 200,
            data:books.slice(startLimit,endLimit),
            count:books.length,
            description: "موفقیت آمیز"
        }));
    } else {
        res.send(JSON.stringify({
            status: 102,
            description: "نشست شما به پایان رسیده است."
        }));
    }


})
app.post('/manager/bookDetaile',async function (req, res) {
    const token = req.body.token;
    const id= req.body.id;

    const manager = await managerFunctions.getMnagerByToken(token);
    if (manager != false) {
        const books= await managerFunctions.bookDetaile(id);

        res.send(JSON.stringify({
            status: 200,
            data:books,
            description: "موفقیت آمیز"
        }));
    } else {
        res.send(JSON.stringify({
            status: 102,
            description: "نشست شما به پایان رسیده است."
        }));
    }


})
app.post('/manager/deactiveBook',async function (req, res) {
    const token = req.body.token;
    const id = req.body.id;
    const manager = await managerFunctions.getMnagerByToken(token);
    if (manager != false) {
        const editeBook=await managerFunctions.editeBook({
            status:'notActive'
        },id);
        if(editeBook!=false){
            res.send(JSON.stringify({
                status: 200,
                description: "موفقیت آمیز"
            }));
        }else{
            res.send(JSON.stringify({
                status: 108,
                description: "عدم ثبت اطلاعات"
            }));
        }


    } else {
        res.send(JSON.stringify({
            status: 102,
            description: "نشست شما به پایان رسیده است."
        }));
    }


})
app.post('/manager/activeBook',async function (req, res) {
    const token = req.body.token;
    const id = req.body.id;
    const manager = await managerFunctions.getMnagerByToken(token);
    if (manager != false) {
        const editeBook=await managerFunctions.editeBook({
            status:'active'
        },id);
        if(editeBook!=false){
            res.send(JSON.stringify({
                status: 200,
                description: "موفقیت آمیز"
            }));
        }else{
            res.send(JSON.stringify({
                status: 108,
                description: "عدم ثبت اطلاعات"
            }));
        }


    } else {
        res.send(JSON.stringify({
            status: 102,
            description: "نشست شما به پایان رسیده است."
        }));
    }


})
app.post('/manager/editeBook',async function (req, res) {
    const token = req.body.token;
    const name = req.body.name;
    const id = req.body.id;
    const category = req.body.category;
    const comod = req.body.comod;
    const ghafase = req.body.ghafase;
    const manager = await managerFunctions.getMnagerByToken(token);
    if (manager != false) {
        const editeBook=await managerFunctions.editeBook({
            name:name,
            comode:comod,
            category:category,
            ghafase:ghafase
        },id);
        if(editeBook!=false){
            res.send(JSON.stringify({
                status: 200,
                description: "موفقیت آمیز"
            }));
        }else{
            res.send(JSON.stringify({
                status: 108,
                description: "عدم ثبت اطلاعات"
            }));
        }


    } else {
        res.send(JSON.stringify({
            status: 102,
            description: "نشست شما به پایان رسیده است."
        }));
    }


})
app.post('/manager/addUser',async function (req, res) {
    const token = req.body.token;
    const name = req.body.name;
    const lastName = req.body.lastName;
    const phone = req.body.phone;
    const sNumber = req.body.sNumber;
    const grade = req.body.grade;
    const manager = await managerFunctions.getMnagerByToken(token);
    if (manager != false) {
        const userDetaile=await managerFunctions.userDetaile(sNumber);

        if(userDetaile==false){
            const addUser=await managerFunctions.addUser({
                name:name,
                lastName:lastName,
                phone:phone,
                sNumber:sNumber,
                grade:grade,
                status:'active'
            });
            if(addUser!=false){

                res.send(JSON.stringify({
                    status: 200,
                    description: "موفقیت آمیز"
                }));
            }else{
                res.send(JSON.stringify({
                    status: 108,
                    description: "عدم ثبت اطلاعات"
                }));
            }
        }else{
            res.send(JSON.stringify({
                status: 108,
                description: "این کاربر(کد دانشجویی) قبلا ثبت شده "
            }));
        }



    } else {
        res.send(JSON.stringify({
            status: 102,
            description: "نشست شما به پایان رسیده است."
        }));
    }


})
app.post('/manager/userList',async function (req, res) {
    const token = req.body.token;
    const limit= req.body.limit;
    const page=req.body.page;
    const keyword= req.body.keyword;
    const manager = await managerFunctions.getMnagerByToken(token);
    if (manager != false) {
        const startLimit=(parseInt(page)-1)*parseInt(limit);
        const endLimit=startLimit+parseInt(limit);
        const userList= await managerFunctions.userList(keyword);
        res.send(JSON.stringify({
            status: 200,
            data:userList.slice(startLimit,endLimit),
            count:userList.length,
            description: "موفقیت آمیز"
        }));
    } else {
        res.send(JSON.stringify({
            status: 102,
            description: "نشست شما به پایان رسیده است."
        }));
    }


})
app.post('/manager/deactiveUser',async function (req, res) {
    const token = req.body.token;
    const id = req.body.id;
    const manager = await managerFunctions.getMnagerByToken(token);
    if (manager != false) {
        const editeUser=await managerFunctions.editeUser({
            status:'notActive'
        },id);
        if(editeUser!=false){
            res.send(JSON.stringify({
                status: 200,
                description: "موفقیت آمیز"
            }));
        }else{
            res.send(JSON.stringify({
                status: 108,
                description: "عدم ثبت اطلاعات"
            }));
        }


    } else {
        res.send(JSON.stringify({
            status: 102,
            description: "نشست شما به پایان رسیده است."
        }));
    }


})
app.post('/manager/activeUser',async function (req, res) {
    const token = req.body.token;
    const id = req.body.id;
    const manager = await managerFunctions.getMnagerByToken(token);
    if (manager != false) {
        const editeUser=await managerFunctions.editeUser({
            status:'active'
        },id);
        if(editeUser!=false){
            res.send(JSON.stringify({
                status: 200,
                description: "موفقیت آمیز"
            }));
        }else{
            res.send(JSON.stringify({
                status: 108,
                description: "عدم ثبت اطلاعات"
            }));
        }


    } else {
        res.send(JSON.stringify({
            status: 102,
            description: "نشست شما به پایان رسیده است."
        }));
    }


})
app.post('/manager/userDetaile',async function (req, res) {
    const token = req.body.token;
    const id= req.body.id;

    const manager = await managerFunctions.getMnagerByToken(token);
    if (manager != false) {
        const userDetaile= await managerFunctions.userDetaileF(id);

        res.send(JSON.stringify({
            status: 200,
            data:userDetaile,
            description: "موفقیت آمیز"
        }));
    } else {
        res.send(JSON.stringify({
            status: 102,
            description: "نشست شما به پایان رسیده است."
        }));
    }


})
app.post('/manager/editeUser',async function (req, res) {
    const token = req.body.token;
    const name = req.body.name;
    const id = req.body.id;
    const lastName = req.body.lastName;
    const phone = req.body.phone;
    const sNumber = req.body.sNumber;
    const grade = req.body.grade;
    const manager = await managerFunctions.getMnagerByToken(token);
    if (manager != false) {
        const editeUser=await managerFunctions.editeUser({
            name:name,
            lastName:lastName,
            phone:phone,
            sNumber:sNumber,
            grade:grade
        },id);
        if(editeUser!=false){
            res.send(JSON.stringify({
                status: 200,
                description: "موفقیت آمیز"
            }));
        }else{
            res.send(JSON.stringify({
                status: 108,
                description: "عدم ثبت اطلاعات"
            }));
        }



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