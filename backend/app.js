import express from 'express'
import { getInventaire } from '../backend/database.js'
import cors from 'cors'
import si from 'systeminformation';

import dotenv from 'dotenv'
dotenv.config()

const app = express()

app.use(cors());

app.get('/inventaire', async (req, res) => {
  const mots = await getInventaire()

  res.send(mots)
})

app.get('/cpu', async (req, res) => {
  const cpu = await si.cpu();
  res.send(cpu);
});

app.get('/storage', async (req, res) => {
  const disks = await si.fsSize();
  res.send(disks);
});

app.get('/os', async (req, res) => {
  const os = await si.osInfo();
  res.send(os);
});

app.get('/ram', async (req, res) => {
  const ram = await si.mem();
  res.send(ram);
});

// app.get('/talents', async (req, res) => {
//   const mots = await getTalents()

//   res.send(mots)
// })


// app.get('/inventaire/:id', async (req, res) => {
//   const id = req.params.id
//   const mots = await getInventaireParId(id)
//   res.send(mots)
// })

app.listen(process.env.PORT, () => console.log('app running on port '+ process.env.PORT))