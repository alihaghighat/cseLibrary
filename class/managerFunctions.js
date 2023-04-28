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
    async categoryDetaile(id) {
        const categoryDetaile = await getRecords("tblcategory","id=? and active='active' ORDER by id asc ",[id]);
        if(categoryDetaile!=false){
            return categoryDetaile;
        }else{
            return [];
        }

    }
    async subCategory(id) {
        const subCategory = await getRecords("tblcategory","subId=? and active='active' ORDER by id asc ",[id]);
        if(subCategory!=false){
            return subCategory;
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
    async books(key) {
        const books = await getRecords("tblBook","name like CONCAT( '%',?,'%') ORDER by id asc ",[key]);
        if(books!=false){
            return books;
        }else{
            return [];
        }

    }
    async userList(key) {
        const userList = await getRecords("tblUser","name like CONCAT( '%',?,'%') Or lastName like CONCAT( '%',?,'%') Or sNumber like CONCAT( '%',?,'%')  ORDER by id asc ",[key,key,key]);
        if(userList!=false){
            return userList;
        }else{
            return [];
        }

    }
    async loanDetaile(id) {
        const bookDetaile = await getRecords("tblLoan","id=?",[id]);
        if(bookDetaile!=false){
            return bookDetaile;
        }else{
            return [];
        }

    }
    async bookDetaile(id) {
        const bookDetaile = await getRecords("tblBook","id=?",[id]);
        if(bookDetaile!=false){
            return bookDetaile;
        }else{
            return [];
        }

    }
    async userDetaileF(id) {
        const userDetaile = await getRecords("tblUser","id=?",[id]);
        if(userDetaile!=false){
            return userDetaile;
        }else{
            return [];
        }

    }
    async historyBook(id) {
        const historyBook = await getRecords("tblLoan","bookId=?",[id]);
        if(historyBook!=false){
            return historyBook;
        }else{
            return [];
        }

    }
    async historyBookAll() {
        const historyBookAll = await getRecords("tblLoan","status='active'",[]);
        if(historyBookAll!=false){
            return historyBook;
        }else{
            return [];
        }

    }
    async userDetaile(sNumber) {
        const userDetaile = await getRecords("tblUser","sNumber=?",[sNumber]);
        if(userDetaile!=false && userDetaile.length>0){
            return userDetaile[0];
        }else{
            return false;
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
    async addCategory(items){
        const addCategory=await addRecords("tblcategory",items);
        if(addCategory.affectedRows!=0){
            return addCategory.insertId;
        }else{
            return false;
        }
    }
    async addBook(items){
        const addCategory=await addRecords("tblBook",items);
        if(addCategory.affectedRows!=0){
            return addCategory.insertId;
        }else{
            return false;
        }
    }
    async addLoan(items){
        const addLoan=await addRecords("tblLoan",items);
        if(addLoan.affectedRows!=0){
            return addLoan.insertId;
        }else{
            return false;
        }
    }
    async addUser(items){
        const addUser=await addRecords("tblUser",items);
        if(addUser.affectedRows!=0){
            return addUser.insertId;
        }else{
            return false;
        }
    }
    async editeCategory(items, id){
        const editeCategory=await updateRecords("tblcategory",items,"id=?",[id]);
        if(editeCategory.affectedRows!=0){
            return true;
        }else{
            return false;
        }
    }
    async editeBook(items, id){
        const editeBook=await updateRecords("tblBook",items,"id=?",[id]);
        if(editeBook.affectedRows!=0){
            return true;
        }else{
            return false;
        }
    }
    async editeLoad(items, id){
        const editeLoad=await updateRecords("tblLoan",items,"id=?",[id]);
        if(editeLoad.affectedRows!=0){
            return true;
        }else{
            return false;
        }
    }
    async editeUser(items, id){
        const editeUser=await updateRecords("tblUser",items,"id=?",[id]);
        if(editeUser.affectedRows!=0){
            return true;
        }else{
            return false;
        }
    }

}


module.exports = managerFunctions