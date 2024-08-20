-- CreateTable
CREATE TABLE "EmployeeAndTrainer" (
    "id" SERIAL NOT NULL,
    "gender" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'use',
    "level" TEXT NOT NULL DEFAULT 'employee',
    "salary" INTEGER NOT NULL,

    CONSTRAINT "EmployeeAndTrainer_pkey" PRIMARY KEY ("id")
);
