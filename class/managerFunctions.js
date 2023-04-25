var md5 = require('md5');
const {getRecords,addRecords,updateRecords, deleteRecords} = require('../database/database');
class managerFunctions {
    constructor() {

    }
    async login(username, password) {
        const md5Password = md5(password);
        const login = await getRecords("tblmanager","username=? and password=?",[username,md5Password]);
        if(login!=false){
            return login[0];
        }else{
            return false;
        }

    }
    async pageDetaile(pageName) {
        const page = await getRecords("tblManagerMenu","url=? ",[pageName]);
        if(page!=false){
            return page[0];
        }else{
            return false;
        }

    }
    async menu(kind) {
        const menu = await getRecords("tblManagerMenu","kind=? and subId=0 ORDER by ordering asc ",[kind]);
        if(menu!=false){
            return menu;
        }else{
            return [];
        }

    }
    async rootCategory() {
        const rootCategory = await getRecords("tblcategory","subId=0 and active='active' ORDER by id asc ",[]);
        if(rootCategory!=false){
            return rootCategory;
        }else{
            return [];
        }

    }
    async getSubMenus(subId) {
        const menu = await getRecords("tblManagerMenu","subId=? ORDER by ordering asc ",[subId]);
        if(menu!=false){
            return menu;
        }else{
            return [];
        }

    }
    async getMnagerByToken(token) {
        const manager = await getRecords("tblmanager","token=? ",[token]);
        if(manager!=false){
            return manager[0];
        }else{
            return false;
        }

    }

}


module.exports = managerFunctions