async function  GetBlockchain(key) {
    const Tx = require('ethereumjs-tx')
    const Web3 = require('web3')
    const config =require('../config.json')

    const web3 = new Web3(config.web3_path)

    //console.log(config)

    const account1 =config.eth_account
    //const account2 = '0x24C08c49A4280C5E60123713e7890CA600689421'


    const privkey1 = config.eth_privkey
    const priv1 = Buffer.from(privkey1,'hex');
    
    const docContractABI = config.eth_abi

 
    //const contractAdress = config.eth_contact
    const contractAdress = '0x002149afc18df3ba785c8e159411f0c59eb217d8'
    //var docContract = new web3.eth.Contract(docContractABI, contractAdress)

    console.log ('contract instance : ',docContract)

    console.log ("dentro bl find : " ,key)



    //docContract.methods.elementCount().call().then(function (res){console.log(res)})

    const Content = 
        {
            "key": key
        }
    console.log (Content)
    return Content


    // docContract.methods.GetContent(key).call()
    // .then(function (res)
    // {
    //     const Content = 
    //     {
    //         "key": key,
    //         "xtype" : res._xtype,
    //         "data" : res._data,
    //         "hash":res._hash,
    //         "tags":res.tags
    //         }
    //     console.log (Content)
    //     return Content
    // })
    // .catch(function(error){
    //     console.log ("error : ",error)
    // })

}
module.exports = GetBlockchain



