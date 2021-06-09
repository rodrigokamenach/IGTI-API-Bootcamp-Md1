import express from "express";
import router from "./routes/pedidos.routes.js";
import basicAuth from "express-basic-auth";

const app = express();
global.fileName = "pedidos.json";

function getRole(user) {
    if (user == 'rsk') {
        return 'adm'
    } else if (user == 'rosy') {
        return 'basico'
    }
}

function autoriza(...allowed) {

    const isAllowed = role => allowed.indexOf(role) > -1; 

    return (req, res, next) => {

        if (req.auth.user) {
            const role = getRole(req.auth.user);

            if (isAllowed(role)) {
                next();
            } else {
                res.status(401).send('Não autorizado');
            }
        } else {
            res.status(403).send('User não encontrado');
        }
    }
}

app.use(express.json());
app.use(basicAuth({
    authorizer: (username, password) => {
        const userMath = basicAuth.safeCompare(username, 'rsk');
        const passMath = basicAuth.safeCompare(password, '123456');

        return userMath && passMath;
    }
}))

app.use('/pedidos', autoriza('basico'), router);

app.listen(3001, () => {
    console.log('API Started')
});