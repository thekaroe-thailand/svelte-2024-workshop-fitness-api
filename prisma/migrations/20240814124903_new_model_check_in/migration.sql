-- CreateTable
CREATE TABLE "Checkin" (
    "id" SERIAL NOT NULL,
    "member_id" INTEGER NOT NULL,
    "checkin_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Checkin_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Checkin" ADD CONSTRAINT "Checkin_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
