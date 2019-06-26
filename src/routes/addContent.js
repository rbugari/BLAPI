/* Metodo addContent
Permite ingresar un JSON con los datos del remito deberia tener el siguiente formato
{
    "key": 4,
    "type": "1",
    "data": {
        "idTransac": 2,
        "idProvider": 2,
        "idCustomer": 2,
        "URLFile": "https://s3.us-east-2.amazonaws.com/cocaimagenes/Argentina/CocaCola/237+ml+CC+Light+FR_baja.png"
    },
    "hash": "b9801dee251bd52031740a5c0097a96eb5e4f3875f07097e99960a5b10be2f55",
    "tags": [
        "tag2"
    ]
}

*/

const { Router } = require('express')
const router = Router()
const _ = require('underscore')
const bl = require('./blockAdd')
const xconfig =require('../config.json')
const config = xconfig[0]
// Models
const Contentenido = require('../models/Content.js')

//const docs=require('../sample.json')
//console.log(docs)
const ensureToken = require("./helper")


router.post('/', ensureToken,async(req,res) => {
    //console.log(req.body)

    const key = req.body.key
    console.log ('clave a ingresar : ', key)
    var msgtxt = ''
    // si la clave no es null
    try{
        if (key){
            let  { key,type,data,hash,tags } = req.body;
            data = JSON.stringify(data)
            tags = JSON.stringify(tags)

            console.log("Data to ADD :   ", key,type,data,hash,tags)

            if (config.useBL){
                console.log('vamos al BL')
                await bl(key,type,data,hash,tags).then(console.log('ok'))
        
                msgtxt +=" insertado Correctamente BL "
            }else{
                if (config.useDB){
                    const newContent2 = new Contentenido({key,type,data,hash,tags});
                    
                    await newContent2.save().then(console.log('saved'));
                    msgtxt +=" insertado Correctamente BL "
                    console.log("insertado en DB  ",newContent2)
  
                }    
     
            }
            

        }else{
            msgtxt += 'Wrong Request key: '+ key
            
        }
    }catch (error){
    console.log (error) 
    }
    res.send({msg: msgtxt})
})

module.exports = router