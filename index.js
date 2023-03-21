const express = require('express')
const bcoin = require('bcoin')
const cors = require('cors')
const tbtcv2bitcoin = require("@keep-network/tbtc-v2.ts/dist/src/bitcoin")
const tbtcv2electrum = require("@keep-network/tbtc-v2.ts/dist/src/electrum")

bcoin.set("testnet")

const app = express()
app.use(cors())

const privateKeyWif = "cRJvyxtoggjAm9A94cB86hZ7Y62z2ei5VNJHLksFi2xdnz1GJ6xt"
const port = Number(process.env.PORT || "8080")
const electrumUrl = process.env.ELECTRUM_URL || "wss://electrumx-server.test.tbtc.network:8443"
const bitcoinClient = tbtcv2electrum.Client.fromUrl(electrumUrl)

app.get('/get-balance', async (req, res) => {
    const keyRing = tbtcv2bitcoin.createKeyRing(privateKeyWif)
    const address = keyRing.getAddress("string")

    const utxos = await bitcoinClient.findAllUnspentTransactionOutputs(
        address
    )

    let balance = 0

    for (let i = 0; i < utxos.length; i++) {
        balance += utxos[i].value.toNumber()
    }

    res.json({
        balance,
        address
    })
})

app.get('*', (_, res) => {
    res.set('Content-Type', 'text/html');
    const content = "<p>Specify exact route</p>"
    res.send(Buffer.from(content));
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

module.exports = {
    main: app
}
