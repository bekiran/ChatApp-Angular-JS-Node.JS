const chatModel = require('../app/model/chat.model');

exports.addMessage = (req, callback) => {
    console.log("req on service");
    chatModel.addMessage(req, (err, data) => {
        if (err) {
            console.log("error on service file", err);
            return callback(err)
        } else {
            console.log("datra on service file", data);
            return callback(null, data)
        }
    });
}
exports.getUserMsg = (req, callback) => {
    chatModel.getUserMsg(req, (err, data) => {
        if (err) {
            return callback(err);
        } else {
            return callback(null, data)
        }
    });
}