"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderObject = exports.stringData = void 0;
function stringData(data) {
    let date = new Date(Number(data));
    function addZero(number, col) {
        if (Number(col) - Number(String(number).length) >= 0) {
            return "0".repeat(Number(col) - Number(String(number).length)) + number;
        }
        else {
            return number;
        }
    }
    return String(`${date.getFullYear()}.${addZero(Number(date.getMonth() + 1), 2)}.${addZero(date.getDate(), 2)} ${addZero(date.getHours(), 2)}:${addZero(date.getMinutes(), 2)}`);
}
exports.stringData = stringData;
function renderObject(req, obj) {
    if (req.session.messageAlert != undefined) {
        let messageAlert = req.session.messageAlert;
        req.session.messageAlert = undefined;
        return Object.assign({
            'auth': req.session.auth,
            'message': messageAlert
        }, obj);
    }
    return Object.assign({
        'auth': req.session.auth
    }, obj);
}
exports.renderObject = renderObject;
