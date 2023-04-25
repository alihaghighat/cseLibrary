function ValidateEmail(input) {

    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (input.match(validRegex)) {
        return true;

    } else {
        return false;
    }
}function ValidatePhone(input) {

    var validRegex = /^(\+98|0098|98|0)?9\d{9}$/;

    if (input.match(validRegex)) {
        return true;

    } else {
        return false;
    }
}
function ValidateNationalCode(xv) {
    if (isNaN(xv)) {
        return false;
    } else if (xv == "") {
        return false;
    } else if (xv.length < 10) {
        return false;
    } else {
        var yy = 0;
        var yv = parseInt(yv);
        for (let i = 0; i < xv.length; i++) {
            yv = xv[i] * (xv.length - i);
            yy += yv;
        }
        var x = yy % 11;
        if (x === 0) {
            return true;
        } else {
            return false;
        }
        yy = 0;
    }
}

module.exports = {ValidateEmail,ValidatePhone,ValidateNationalCode}