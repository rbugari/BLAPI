/* Metodo allDocs
muestra todo la lista de docs

*/
const { Router } = require('express')
const router = Router()
const _ = require('underscore')

const ensureToken = require("./helper")

//const Contents=require('../sample.json')
//console.log(docs)

// Models
const Contentenido = require('../models/Content.js')


router.get('/',ensureToken,async (req,res) => {
    const Cont = await Contentenido.find();
    console.log("Encontrado",Cont)
    res.send(Cont)
  })

module.exports = router