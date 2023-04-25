const mysql = require('mysql2');
const Promise = require('promise');


// create the connection to database
const con = mysql.createConnection({
    host: 'localhost',
    user: 'asqtesti_omid',
    password:'omidAsali5353',
    database: 'asqtesti_cselibrary'
});
function getRecords(tblname,where,placeholder){
    let sql="SELECT * FROM "+tblname;
    if(where!=''){
        sql=sql+" WHERE "+where;
    }

    return new Promise((resolve, reject) => {
        con.query(sql,placeholder, function (error, result, fields) {
            if (error) {

                return  resolve(false);
            } else {

                return resolve(result);
            }
        });
    });

}

function runSql(sql,placeholder){
    return new Promise((resolve, reject) => {
        con.query(sql,placeholder, function (error, result, fields) {
            if (error) {
                console.error(error);
                return  resolve(false);
            } else {

                return resolve(result);
            }
        });
    });

}
function addRecords(tblname,items){
    let sql="INSERT INTO "+tblname+" (";
    const keys=Object.keys(items).join(' ,');
    sql=sql+keys+") VALUES (";
    const value=Object.values(items);
    let i=0;
    value.forEach(items=>{
        if(i==0){
           i+=1;
            sql=sql+"?";
        }else{
            sql=sql+" ,?";
        }
    });
    sql=sql+")";



    return new Promise((resolve, reject) => {
        con.query(sql,value, function (error, result, fields) {
            if (error) {
                return reject(error);
            } else {
                return resolve(result);

            }
        });
    });

}
function deleteRecords(tblname,where,placeholder){
    let sql="DELETE FROM "+tblname;
    if(where!=''){
        sql=sql+" WHERE "+where;
    }

    return new Promise((resolve, reject) => {
        con.query(sql,placeholder, function (error, result, fields) {
            if (error) {
                throw error;
            } else {
                return resolve(result);
            }
        });
    });

}
function updateRecords(tblname,items,where,placeholder){
    let sql="UPDATE "+tblname+" SET";
    const value=Object.values(items);

    const placeholderU=value.concat(placeholder)
    const keys=Object.keys(items);
    let i=0;
    keys.forEach(items=>{
        if(i==0){
            i+=1;
            sql=sql+" "+items+"=?";
        }else{
            sql=sql+" ,"+items+"=?";
        }
    });
    if(where!=''){
        sql=sql+" WHERE "+where;
    }


    return new Promise((resolve, reject) => {
        con.query(sql,placeholderU, function (error, result, fields) {
            if (error) {
                console.error(error);
                return resolve(error);
            } else {

                return resolve(result);
            }
        });
    });

}


// const result =  getRecords("customers","",[]);
// result.then((data)=>{ // promise and callback function
//     res.status(200);
//     res.setHeader("Content-Type", "application/json");
//
//     res.send(JSON.stringify(data));
//
// });

// const result =addRecords("customers",{name:"ali"});
// result.then(
//     (data)=>{ // promise and callback function
//         res.status(200);
//         res.setHeader("Content-Type", "application/json");
//
//         res.send(JSON.stringify(data));
//
//     }
//     ).catch((error)=>{
//     res.status(201);
//     res.setHeader("Content-Type", "application/json");
//
//     res.send(JSON.stringify(error));
//
//     });


// const result =deleteRecords("customers","id=?",[2]);
// result.then(
//     (data)=>{ // promise and callback function
//         res.status(200);
//         res.setHeader("Content-Type", "application/json");
//
//         res.send(JSON.stringify(data));
//
//     }
// ).catch((error)=>{
//     res.status(201);
//     res.setHeader("Content-Type", "application/json");
//
//     res.send(JSON.stringify(error));
//
// const result =updateRecords("customers",{name:"ali2"},"id=?",[2]);
// result.then(
//     (data)=>{ // promise and callback function
//         res.status(200);
//         res.setHeader("Content-Type", "application/json");
//
//         res.send(JSON.stringify(data));
//
//     }
//     ).catch((error)=>{
//         res.status(201);
//         res.setHeader("Content-Type", "application/json");
//
//         res.send(JSON.stringify(error));
//
//     });



module.exports={getRecords,addRecords,deleteRecords,updateRecords,runSql}
