-- CreateTable
CREATE TABLE "Membership" (
    "id" SERIAL NOT NULL,
    "member_id" INTEGER NOT NULL,
    "money" INTEGER NOT NULL,
    "pay_date" TIMESTAMP(3) NOT NULL,
    "remark" TEXT,

    CONSTRAINT "Membership_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Membership" ADD CONSTRAINT "Membership_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
