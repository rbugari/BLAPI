/* Metodo login
entrega un token si la clave es adecuando
*/
const { Router } = require("express");
const router = Router();
const jwt = require("jsonwebtoken")
const ensureToken = require("./helper")

/// test token in header 
router.get('/protected',ensureToken,(req,res) => {
    jwt.verify(req.token,'my_secret_key',(err,data) => {
        if (err){
            res.sendStatus(403)
        }else{
            res.json({
                text:'protected',
                data
            })
        }
    })
})


router.post('/', (req,res) => {
  const user_name = req.header('userName')
  const user_password =  req.header('userPassword')
  // validar usuario.
  if (user_name != "kargho"){
      res.send ({"msg":"usuario no autorizado a trabajar"})
  }
  const user = { user_name,user_password}
  const token = jwt.sign({user},'my_secret_key') 
  console.log('el id solicitado : ',user)
  res.send({"token":token})
})

 
module.exports = router