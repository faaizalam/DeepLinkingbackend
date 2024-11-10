import express from 'express'
import { ShareRouter } from './router/Share.js'
import ip from 'ip'
const app = express()
app.use(express.json())

let port = process.env.PORT|| 3000

app.use("/share", ShareRouter)
app.get("/", (req, res) => {
  res.send(`Check out this product http://localhost:3000/share/product/2 `)
})
const localIP = ip.address()  // Get local IP address
app.listen(port,() => { // Corrected to "0.0.0.0"
  console.log(`http://${localIP}:3000`) // Replace `yourLaptopIP` with your local IP
})
