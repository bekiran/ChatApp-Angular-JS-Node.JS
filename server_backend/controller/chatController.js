const chatServices = require("../services/chatServices");
exports.message = (req, res) => {
    console.log("request", req);
    chatServices.chatServices(req, (err, data) =>{
        if(err){
            console.log("error in controller");
            res(err);
        } else {
            console.log("controller is working fine");
            res(null, data);
        }
    }) 
}

exports.getUserMsg = (req, res) => {
    chatServices.getUserMsg(req, (err, data) => {
        var responce = {};
        if (err) {
            data.responce = false;
            data.responce = err;
            res.status(500).send(responce)
        } else {
            data.responce = true;
            data.responce = data;
            res.status(200).send(responce)
        }
    })
} 