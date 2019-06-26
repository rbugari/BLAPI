function ensureToken(req,res,next){
    const Header = req.header('authorization')
    console.log(Header)
    if (typeof Header !== 'undefined'){
        const NewToken = Header
        console.log('Token rescatado:',NewToken)
        req.token = NewToken
        next()
    }else{
        res.sendStatus(403)
    }
    return
}
module.exports = ensureToken

