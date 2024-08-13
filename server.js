import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser';
import { token } from './models/token.js';

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express()
const port = 8080

main().catch(err =>{
  console.log(err)
  res.send("Server under maintainence")
} );

 async function main() {
  await mongoose.connect('mongodb+srv://aritrapandit67:jBdF3kDd04LP7h5S@community-cart.cbq3w.mongodb.net/');
}

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


app.post('/verified', async (req, res) => {

  console.log(req.body.Token)
  if (req.body.Token !== undefined){
    let update = await token.updateOne({ ID: req.body.Token }, { $set: { status: true } })
    let Delete = await token.deleteOne({ ID: req.body.Token })
    console.log(update)
    console.log(Delete)
    res.json(update)
   }else{
    res.send(false)
   }

})