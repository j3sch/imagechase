/*
  Warnings:

  - You are about to drop the column `content` on the `Competition` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `Submission` table. All the data in the column will be lost.
  - Added the required column `imageAlt` to the `Competition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `Competition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageAlt` to the `Submission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `Submission` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Competition" DROP COLUMN "content",
ADD COLUMN     "imageAlt" TEXT NOT NULL,
ADD COLUMN     "imageUrl" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Submission" DROP COLUMN "content",
ADD COLUMN     "imageAlt" TEXT NOT NULL,
ADD COLUMN     "imageUrl" TEXT NOT NULL;
