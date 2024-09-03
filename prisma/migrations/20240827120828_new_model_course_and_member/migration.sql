-- CreateTable
CREATE TABLE "CourseAndMember" (
    "id" SERIAL NOT NULL,
    "courseId" INTEGER NOT NULL,
    "memberId" INTEGER NOT NULL,
    "qty" INTEGER NOT NULL,
    "remark" TEXT,
    "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expireDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CourseAndMember_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CourseAndMember" ADD CONSTRAINT "CourseAndMember_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseAndMember" ADD CONSTRAINT "CourseAndMember_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
