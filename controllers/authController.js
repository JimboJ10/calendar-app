const { response } = require('express');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/generarJwt');
const Usuario = require('../models/Usuario');

const crearUsuario = async(req, res = response) => {
    
    const {name, email, password} = req.body;
    try {

        let usuario = await Usuario.findOne({email});

        if(usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario ya existe con ese correo'
            });
        }

        usuario = new Usuario(req.body);

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        // Generar JWT
        const token = await generarJWT(usuario.id, usuario.name);
            
        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }

}

const loginUsuario = async(req, res = response) => {
    const {email, password} = req.body;

    try {

        const usuario = await Usuario.findOne({email});

        if(!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese email'
            });
        }

        // Confirmar los passwords
        const validaPassword = bcrypt.compareSync(password, usuario.password);
        if(!validaPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            });
        }

        // Generar el JWT
        const token = await generarJWT(usuario.id, usuario.name);

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }

   
}

const revalidarToken = async(req, res = response) => {

    const uid = req.uid;
    const name = req.name;

    try {

        // Generar un nuevo JWT y retornarlo en esta petición
        const token = await generarJWT(uid, name);

        res.status(201).json({
            ok: true,
            token
        })
        
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }

    
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}