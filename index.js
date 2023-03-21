const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())

const port = Number(process.env.PORT || "8080")

app.get('/get-balance/:addrOrPrivKey', async (req, res) => {
    // TODO: Get balance
    const addrOrPrivKey = req.params.addrOrPrivKey

    res.json({
        balance: 0,
        addrOrPrivKey: addrOrPrivKey
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
