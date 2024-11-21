-- DropForeignKey
ALTER TABLE "items" DROP CONSTRAINT "items_listId_fkey";

-- AlterTable
ALTER TABLE "items" ALTER COLUMN "listId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_listId_fkey" FOREIGN KEY ("listId") REFERENCES "lists"("id") ON DELETE SET NULL ON UPDATE CASCADE;
