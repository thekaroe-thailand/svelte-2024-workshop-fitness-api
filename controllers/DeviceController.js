const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
    create: async (req, res) => {
        try {
            await prisma.device.create({
                data: {
                    name: req.body.name,
                    price: req.body.price,
                    qty: req.body.qty,
                    remark: req.body.remark
                }
            });

            return res.send({ message: 'success' })
        } catch (e) {
            return res.status(500).send({ error: e.message })
        }
    },
    list: async (req, res) => {
        try {
            const rows = await prisma.device.findMany({
                orderBy: {
                    id: 'desc'
                }
            })

            return res.send({ results: rows })
        } catch (e) {
            return res.status(500).send({ error: e.message })
        }
    }
}

