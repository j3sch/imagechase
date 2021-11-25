/*
  Warnings:

  - You are about to alter the column `title` on the `Competition` table. The data in that column could be lost. The data in that column will be cast from `VarChar(150)` to `VarChar(50)`.
  - You are about to alter the column `description` on the `Competition` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(200)`.
  - You are about to drop the column `description` on the `Rating` table. All the data in the column will be lost.
  - You are about to drop the column `superuser` on the `User` table. All the data in the column will be lost.
  - Added the required column `instructions` to the `Competition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rules` to the `Competition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Competition` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `Competition` required. This step will fail if there are existing NULL values in that column.
  - Made the column `startDate` on table `Competition` required. This step will fail if there are existing NULL values in that column.
  - Made the column `endDate` on table `Competition` required. This step will fail if there are existing NULL values in that column.
  - Made the column `content` on table `Submission` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `Submission` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Submission" DROP CONSTRAINT "Submission_userId_fkey";

-- DropIndex
DROP INDEX "Rating_submissionId_key";

-- DropIndex
DROP INDEX "Rating_userId_key";

-- DropIndex
DROP INDEX "Submission_competitionId_key";

-- DropIndex
DROP INDEX "Submission_userId_key";

-- AlterTable
ALTER TABLE "Competition" ADD COLUMN     "instructions" TEXT NOT NULL,
ADD COLUMN     "rules" TEXT NOT NULL,
ADD COLUMN     "type" VARCHAR(30) NOT NULL,
ALTER COLUMN "title" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "description" SET DATA TYPE VARCHAR(200),
ALTER COLUMN "startDate" SET NOT NULL,
ALTER COLUMN "endDate" SET NOT NULL;

-- AlterTable
ALTER TABLE "Rating" DROP COLUMN "description",
ADD COLUMN     "feedback" TEXT;

-- AlterTable
ALTER TABLE "Submission" ADD COLUMN     "rating" DOUBLE PRECISION NOT NULL DEFAULT 0,
ALTER COLUMN "content" SET NOT NULL,
ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "superuser",
ADD COLUMN     "bio" TEXT,
ADD COLUMN     "judge" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "Participants" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "competitionId" INTEGER NOT NULL,

    CONSTRAINT "Participants_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participants" ADD CONSTRAINT "Participants_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participants" ADD CONSTRAINT "Participants_competitionId_fkey" FOREIGN KEY ("competitionId") REFERENCES "Competition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
