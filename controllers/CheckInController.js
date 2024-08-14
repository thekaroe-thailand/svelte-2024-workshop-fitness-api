const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
    create: async (req, res) => {
        try {
            await prisma.checkin.create({
                data: {
                    member_id: req.body.member_id
                }
            })
            return res.send({ message: 'success' })
        } catch (e) {
            return res.status(500).send({ error: e.message })
        }
    },
    list: async (req, res) => {
        try {
            const rows = await prisma.checkin.findMany({
                include: {
                    Member: true
                }
            })

            return res.send({ results: rows })
        } catch (e) {
            return res.status(500).send({ error: e.message })
        }
    },
    remove: async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            await prisma.checkin.delete({
                where: {
                    id: id
                }
            })
            return res.send({ message: 'success' })
        } catch (e) {
            return res.status(500).send({ error: e.message })
        }
    }
}