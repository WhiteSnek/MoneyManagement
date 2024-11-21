/*
  Warnings:

  - The `bought` column on the `items` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
CREATE SEQUENCE items_priority_seq;
ALTER TABLE "items" ALTER COLUMN "priority" SET DEFAULT nextval('items_priority_seq'),
DROP COLUMN "bought",
ADD COLUMN     "bought" BOOLEAN NOT NULL DEFAULT false;
ALTER SEQUENCE items_priority_seq OWNED BY "items"."priority";
