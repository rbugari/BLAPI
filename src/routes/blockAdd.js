
async function  AddBlockchain(key,type,xdata,hash,tag) {
    const Tx = require('ethereumjs-tx')
    const Web3 = require('web3')
    const xconfig =require('../config.json')
    const config = xconfig[0]

    const web3 = new Web3(config.web3_path)

    console.log(config)

    const account1 =config.eth_account
    //const account2 = '0x24C08c49A4280C5E60123713e7890CA600689421'


    const privkey1 = config.eth_privkey
    const priv1 = Buffer.from(privkey1,'hex');



    //const docContractABI = config.Contract
    const docContractABI = [
        {
            "constant": true,
            "inputs": [
                {
                    "name": "_key",
                    "type": "string"
                }
            ],
            "name": "ifExist",
            "outputs": [
                {
                    "name": "_used",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "claves",
            "outputs": [
                {
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "elementCount",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "_key",
                    "type": "string"
                }
            ],
            "name": "GetContent",
            "outputs": [
                {
                    "name": "_xtype",
                    "type": "string"
                },
                {
                    "name": "_data",
                    "type": "string"
                },
                {
                    "name": "_hash",
                    "type": "string"
                },
                {
                    "name": "_tags",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_key",
                    "type": "string"
                },
                {
                    "name": "_xtype",
                    "type": "string"
                },
                {
                    "name": "_data",
                    "type": "string"
                },
                {
                    "name": "_hash",
                    "type": "string"
                },
                {
                    "name": "_tags",
                    "type": "string"
                }
            ],
            "name": "NewContent",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "name": "key",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "name": "index",
                    "type": "uint256"
                }
            ],
            "name": "NewItem",
            "type": "event"
        }
    ]


    const contractAdress = config.eth_contact

    var docContract = new web3.eth.Contract(docContractABI, contractAdress)

    console.log (key,"--", type,"--",xdata,"--",hash,"--",tag)

    //const data = docContract.methods.NewDocTest(125).encodeABI()
    const data = docContract.methods.NewContent(
        key,
        type,
        xdata,
        hash,
        tag
        ).encodeABI()

    web3.eth.getTransactionCount(account1, (err, txCount) => {
        
        console.log ('Error: ',err,'  -- Cant de Transact: ',txCount);

        // Build the transaction
        const txObject = {
            nonce: web3.utils.toHex(txCount) ,
            gasLimit:web3.utils.toHex(3000000) ,
            gasPrice:web3.utils.toHex(web3.utils.toWei('10','gwei')) ,
            to:contractAdress,
            data:data 
        }
        //console.log (txObject)

        // sign the transaction
        const tx = new Tx(txObject)
        tx.sign(priv1)

        const serializedTransaction = tx.serialize()
        const raw = '0x' + serializedTransaction.toString('hex')

        console.log('raw', raw)

        // Bradcast transaction
        web3.eth.sendSignedTransaction (raw, (err,txHash) => {
            console.log('Error:',err,'txHash',txHash)
        })
    })
    return 1

}

module.exports = AddBlockchain

