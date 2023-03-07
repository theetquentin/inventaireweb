import express from 'express'
import { getInventaire, ajoutOrdi } from '../backend/database.js'
import cors from 'cors'
import si from 'systeminformation';

import dotenv from 'dotenv'
dotenv.config()

const app = express()

app.use(cors());

// on récupère les informations du système
const cpuData = await si.cpu()
const osData = await si.osInfo()
const ramData = await si.mem()
const disksData = await si.fsSize();

// on trie les valeurs qui nous intéressent
const idPc = osData.hostname
const cpu = cpuData.manufacturer + " " + cpuData.brand
const os = osData.distro + " " + osData.arch

const ram = {
  total: (ramData.total / (1024 * 1024 * 1024)).toFixed(1),
};

const disks = disksData.map((disk) => ({
  fs: disk.fs,
  filesystem: disk.filesystem,
  size: Math.round(disk.size / (1024 * 1024 * 1024)),
  used: Math.round(disk.used / (1024 * 1024 * 1024)),
  available: Math.round(disk.available / (1024 * 1024 * 1024)),
}));

// app.get('/bdd', async (req, res) => {
//   await ajoutOrdi(idPc, cpu, os, ram.total, disks[0].size, disks[0].used, disks[0].available, disks[1].size, disks[1].used, disks[1].available)

//   res.send("Ajout d'un ordinateur dans la bdd : " + idPc)
// })

app.get('/bdd', async (req, res) => {
  try {
    await ajoutOrdi(idPc, cpu, os, ram.total, disks[0].size, disks[0].used, disks[0].available, disks[1].size, disks[1].used, disks[1].available);
    res.send("Ajout d'un ordinateur dans la bdd : " + idPc);
  } catch (error) {
    res.status(409).send(error.message);
  }
});

app.get('/inventaire', async (req, res) => {
  const mots = await getInventaire()

  res.send(mots)
})

app.listen(process.env.PORT, () => console.log('app running on port '+ process.env.PORT))