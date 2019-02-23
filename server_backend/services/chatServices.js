const chatModel = require('../app/model/chat.model');

exports.addMessage = (req, callback) => {

    console.log("req on service");

    chatModel.addMessage(req, (err, data) => {

        if (err) {
            console.log("err on service file", err);
            callback(err)
        } else {

            console.log("data on service file", data);
            callback(null, data)
        }

    })

}
exports.getUserMsg = (req, callback) => {
    chatModel.getUserMsg(req, (err, data) => {
        if (err) {
            console.log("chat services is not working");
            callback(err);
        } else {
            console.log("chat service is working fine")
            callback(null, data);
        }
    })
}