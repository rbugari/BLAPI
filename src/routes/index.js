const { Router } = require('express')
const router = Router()

router.get('/',(req,res) => {
    res.json({"Tile" : "API Kargho Blockchain Running"})
})

module.exports = router