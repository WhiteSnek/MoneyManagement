/*
  Warnings:

  - Changed the type of `creditDate` on the `users` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "users" ALTER COLUMN "dob" SET DATA TYPE TEXT,
DROP COLUMN "creditDate",
ADD COLUMN     "creditDate" INTEGER NOT NULL;
