import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const getMahasiswas = async (req, res) => {
    try {
        const response = await prisma.mahasiswa.findMany(); res.status(200).json(response);

    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const getMahasiswaById = async (req, res) => {
    try {
        const response = await prisma.mahasiswa.findUnique({
            where: {
                id: Number(req.params.id)
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const createMahasiswa = async (req, res) => {
    const { name, email, nohp, jenkel } = req.body;
    try {
        const mahasiswa = await prisma.mahasiswa.create({

            data: {
                name: name,
                email: email,
                nohp: nohp,
                jenkel: jenkel
            }
        });
        res.status(200).json(mahasiswa);
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const updateMahasiswa = async (req, res) => {
    const { name, email, nohp, jenkel } = req.body;
    try {
        const mahasiswa = await prisma.mahasiswa.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                name: name,
                email: email,
                nohp: nohp,
                jenkel: jenkel
            }
        });
        res.status(200).json(mahasiswa);
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const deleteMahasiswa = async (req, res) => {
    try {
        const mahasiswa = await prisma.mahasiswa.delete({
            where: {
                id: Number(req.params.id)
            }

        });
        res.status(200).json(mahasiswa);
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}