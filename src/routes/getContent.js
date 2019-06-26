/* Metodo getContent
Permite traer un contenido definido de con el key como como parametro

*/
const { Router } = require("express");
const router = Router();
const _ = require("underscore");
const GetBlockchain = require('./blockGet')
const xconfig =require('../config.json')
const config = xconfig[0]

const ensureToken = require("./helper")
//const contents = require("../sample.json");
//console.log(docs)

// Models
const Contentenido = require('../models/Content.js')


router.get('/:key',ensureToken, async (req,res) => {
  const { key } = req.params
  console.log('el key solicitado : ',key)
  let Cont
  // busqueda en la Base
  if (config.useBL){
     try{
     Cont = await GetBlockchain(key)
     console.log (Cont)
     }
     catch(err){console.log(err)
    }
  } else {if (config.useDB){
     Cont = await Contentenido.find({key});
    }
  }
  console.log("Encontrado", Cont)
  res.send(Cont)
})

 
module.exports = router
