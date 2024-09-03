-- CreateTable
CREATE TABLE "PayRecord" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "qty" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "payDate" TIMESTAMP(3) NOT NULL,
    "remark" TEXT NOT NULL,

    CONSTRAINT "PayRecord_pkey" PRIMARY KEY ("id")
);
