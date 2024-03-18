import express from "express";
import { getMahasiswas, getMahasiswaById, createMahasiswa, updateMahasiswa, deleteMahasiswa } from "../controllers/MahasiswaController.js";

const router = express.Router();

router.get('/mahasiswas', getMahasiswas);
router.get('/mahasiswas/:id', getMahasiswaById);
router.post('/mahasiswas', createMahasiswa);
router.patch('/mahasiswas/:id', updateMahasiswa);
router.delete('/mahasiswas/:id', deleteMahasiswa);

export default router;