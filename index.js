const dotenv = require('dotenv')
const server = require('./api/server')

dotenv.config()

const PORT = process.env.PORT || 8000
server.listen(PORT, () => {
    console.log(`server live at localhost:${PORT}`)
})
