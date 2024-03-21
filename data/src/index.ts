import { PrismaClient } from "@prisma/client";
const cors = require("cors");
import express from "express";

const prisma = new PrismaClient();
const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create a new mahasiswa
app.post(`/mahasiswa`, async (req, res) => {
  const { name, email } = req.body;

  const result = await prisma.mahasiswa.create({
    data: {
      name,
      email,
    },
  });
  res.json(result);
});

// Read all mahasiswa
app.get(`/mahasiswa`, async (req, res) => {
  const result = await prisma.mahasiswa.findMany();
  res.json(result);
});

// Update mahasiswa by ID
app.patch("/mahasiswa/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  const updatedMahasiswa = await prisma.mahasiswa.update({
    where: { id: Number(id) },
    data: {
      name,
      email,
    },
  });
  res.json(updatedMahasiswa);
});

// Delete mahasiswa by ID
app.delete(`/mahasiswa/:id`, async (req, res) => {
  const { id } = req.params;

  const deletedMahasiswa = await prisma.mahasiswa.delete({
    where: {
      id: Number(id),
    },
  });
  res.json(deletedMahasiswa);
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
