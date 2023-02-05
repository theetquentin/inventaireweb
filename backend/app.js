import express from 'express'
import { getInventaire, getInventaireParId } from '../backend/database.js'
import cors from 'cors'

import dotenv from 'dotenv'
dotenv.config()

const app = express()

app.use(cors());

app.get('/inventaire', async (req, res) => {
  const mots = await getInventaire()

  res.send(mots)
})

// app.get('/talents', async (req, res) => {
//   const mots = await getTalents()

//   res.send(mots)
// })


app.get('/inventaire/:id', async (req, res) => {
  const id = req.params.id
  const mots = await getInventaireParId(id)
  res.send(mots)
})

app.listen(process.env.PORT, () => console.log('app running on port '+ process.env.PORT))