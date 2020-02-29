var express = require('express');
var validator = require("email-validator");
var constants = require('./constants');

var app = express();
app.use(express.json());

var searchEnterprises = [
    {
        "id": 1,
        "name": "Empresa 1",
        "country": "Brazil",
        "zone": "Negócios",
        "image": "https://i.picsum.photos/id/411/600/400.jpg"
    },
    {
        "id": 2,
        "name": "Empresa 2",
        "country": "EUA",
        "zone": "Telemarketing",
        "image": "https://i.picsum.photos/id/1073/600/400.jpg"
    },
    {
        "id": 3,
        "name": "Your Company",
        "country": "Germany",
        "zone": "Software Development",
        "image": "https://i.picsum.photos/id/625/600/400.jpg"
    },
];

var allEnterprises = [
    {
        "id": 1,
        "name": "Empresa 1",
        "description": constants.DESCRIPTION,
        "image": "https://i.picsum.photos/id/411/600/400.jpg"
    },
    {
        "id": 2,
        "name": "Empresa 2",
        "description": constants.DESCRIPTION,
        "image": "https://i.picsum.photos/id/1073/600/400.jpg"
    },
    {
        "id": 3,
        "name": "Your Company",
        "description": constants.DESCRIPTION,
        "image": "https://i.picsum.photos/id/625/600/400.jpg"
    },
];

function validateHeaders(req, res) {
    var accesstoken = req.header("access-token");
    var client = req.header("client");
    var uid = req.header("uid");

    if (accesstoken != constants.ACCESSTOKEN || client != constants.CLIENT || uid != constants.UID) {
        return false;
    }

    return true;
}

app.post('/api/v1/users/auth/sign_in', function (req, res) {
    var email = req.body.email;
    var password = req.body.password;

    if (!validator.validate(email)) {
        res.send({
            "success": false,
            "errors": [
                "Email não é valido"
            ]
        });
    } else if (password.length < 4) {
        res.send({
            "success": false,
            "errors": [
                "Senha menor que 4 caracteres"
            ]
        });
    } else if (email == "testeapple@ioasys.com.br" && password == "12341234") {
        res.send({
            "success": true,
            "accesstoken": constants.ACCESSTOKEN,
            "client": constants.CLIENT,
            "uid": constants.UID,
        });
    } else {
        res.send({
            "success": false,
            "errors": [
                "Usuário não encontrado"
            ]
        });
    }
});

app.get('/', function (req, res) {
    res.send({ "success": true, });
});

app.get('/api/v1/enterprises', function (req, res) {
    if (validateHeaders(req, res)) {
        var name = req.query.name;
        var enterprises = [];
        Object.values(searchEnterprises).forEach(function (enterprise) {
            if (enterprise.name.toLocaleLowerCase().includes(name.toLocaleLowerCase())) {
                enterprises.push(enterprise);
            }
        });
        res.send({
            "success": true,
            "enterprises": enterprises
        });
    } else {
        res.send({
            "success": false,
            "errors": [
                "Credenciais inválidas"
            ]
        });
    }
});

app.get('/api/v1/enterprises/:id', function (req, res) {
    if (validateHeaders(req, res)) {
        var id = req.params.id;
        var enterprises = [];
        Object.values(allEnterprises).forEach(function (enterprise) {
            if (enterprise.id == id) {
                enterprises.push(enterprise);
            }
        });
        res.send({
            "success": true,
            "enterprise": enterprises[0]
        });
    } else {
        res.send({
            "success": false,
            "errors": [
                "Credenciais inválidas"
            ]
        });
    }
});

var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('Example app listening on port 3000!');
});