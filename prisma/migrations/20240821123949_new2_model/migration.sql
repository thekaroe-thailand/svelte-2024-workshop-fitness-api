-- CreateTable
CREATE TABLE "Course" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "detail" TEXT NOT NULL,
    "remark" TEXT NOT NULL,
    "dayPerWeek" INTEGER NOT NULL,
    "hourPerDay" INTEGER NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CouseAndTrainer" (
    "id" SERIAL NOT NULL,
    "courseId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "CouseAndTrainer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CouseAndTrainer" ADD CONSTRAINT "CouseAndTrainer_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CouseAndTrainer" ADD CONSTRAINT "CouseAndTrainer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "EmployeeAndTrainer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
