const jwt = require('jsonwebtoken');

const generarJWT = (uid, name) => {

    return new Promise((resolve, reject) => {

        //cracion del payload (datos que se guardaran en el token)
        const payload = {uid, name};

        //firma del token
        jwt.sign(
            payload,
            process.env.SECRET_JWT_SEED,
            {
                expiresIn: '2h'
            },
            (error, token) => {
                if(error) {
                    reject('No se pudo generar el token');
                }
                resolve(token);
            }
        );

    })

}

module.exports = {
    generarJWT
}