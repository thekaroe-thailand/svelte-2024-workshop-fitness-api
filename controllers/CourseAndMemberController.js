const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const PDFDocument = require("pdfkit");
const fs = require("fs");

module.exports = {
  create: async (req, res) => {
    try {
      const course = await prisma.course.findFirst({
        where: {
          id: req.body.courseId,
        },
      });

      await prisma.courseAndMember.create({
        data: {
          courseId: req.body.courseId,
          memberId: req.body.memberId,
          qty: req.body.qty,
          createdDate: req.body.createdDate,
          expireDate: req.body.expireDate,
          remark: req.body.remark,
          price: course.price,
        },
      });

      return res.send({ message: "success" });
    } catch (e) {
      return res.status(500).send({ error: e.message });
    }
  },
  list: async (req, res) => {
    try {
      const rows = await prisma.courseAndMember.findMany({
        include: {
          Member: true,
        },
        where: {
          courseId: parseInt(req.params.courseId),
        },
      });

      return res.send({ results: rows });
    } catch (e) {
      return res.status(500).send({ error: e.message });
    }
  },
  remove: async (req, res) => {
    try {
      await prisma.courseAndMember.delete({
        where: {
          id: parseInt(req.params.id),
        },
      });

      return res.send({ message: "success" });
    } catch (e) {
      return res.status(500).send({ error: e.message });
    }
  },
  printInvoice: async (req, res) => {
    try {
      const doc = new PDFDocument();
      const row = await prisma.courseAndMember.findFirst({
        include: {
          Member: true,
          Course: true,
        },
        where: {
          id: parseInt(req.params.id),
        },
      });

      doc.pipe(fs.createWriteStream("public/inv-" + row.id + ".pdf"));

      //
      // Draw UI
      //
      doc.font("./Sarabun/Sarabun-Medium.ttf");
      doc.fontSize(25).text("ใบเสร็จรับเงิน");
      doc.fontSize(15);
      doc.text("ลูกค้า " + row.Member.name);
      doc.text("เบอร์โทร " + row.Member.phone);

      doc.text("รายการ", 71, 150);
      doc.text("จำนวน", 320, 150, { width: 100, align: "right" });
      doc.text("ราคา", 380, 150, { width: 100, align: "right" });
      doc.text("ยอดรวม", 450, 150, { width: 100, align: "right" });

      doc.text(row.Course.name, 71, 175);
      doc.text(row.qty, 320, 175, { width: 100, align: "right" });
      doc.text(row.Course.price.toLocaleString("th-TH"), 380, 175, {
        width: 100,
        align: "right",
      });

      const amount = row.qty * row.Course.price;
      doc.text(amount.toLocaleString("th-TH"), 450, 175, {
        width: 100,
        align: "right",
      });

      // เส้นด้านบน
      doc.moveTo(71, 150).lineTo(550, 150).stroke();

      // เส้นด้านล่าง
      doc.moveTo(71, 172).lineTo(550, 172).stroke();

      // ขีดเส้นคู่ตรงยอดรวม
      doc.moveTo(500, 195).lineTo(550, 195).stroke();
      doc.moveTo(500, 197).lineTo(550, 197).stroke();

      doc.end();

      return res.send({ fileName: "inv-" + row.id + ".pdf" });
    } catch (e) {
      return res.status(500).send({ error: e.message });
    }
  },
};
