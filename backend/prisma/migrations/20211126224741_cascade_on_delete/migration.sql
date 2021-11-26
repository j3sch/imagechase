/*
  Warnings:

  - Made the column `userId` on table `Competition` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `Participant` required. This step will fail if there are existing NULL values in that column.
  - Made the column `competitionId` on table `Participant` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `Rating` required. This step will fail if there are existing NULL values in that column.
  - Made the column `submissionId` on table `Rating` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `Submission` required. This step will fail if there are existing NULL values in that column.
  - Made the column `competitionId` on table `Submission` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Competition" DROP CONSTRAINT "Competition_userId_fkey";

-- DropForeignKey
ALTER TABLE "Participant" DROP CONSTRAINT "Participant_competitionId_fkey";

-- DropForeignKey
ALTER TABLE "Participant" DROP CONSTRAINT "Participant_userId_fkey";

-- DropForeignKey
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_submissionId_fkey";

-- DropForeignKey
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_userId_fkey";

-- DropForeignKey
ALTER TABLE "Submission" DROP CONSTRAINT "Submission_competitionId_fkey";

-- DropForeignKey
ALTER TABLE "Submission" DROP CONSTRAINT "Submission_userId_fkey";

-- AlterTable
ALTER TABLE "Competition" ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Participant" ALTER COLUMN "userId" SET NOT NULL,
ALTER COLUMN "competitionId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Rating" ALTER COLUMN "userId" SET NOT NULL,
ALTER COLUMN "submissionId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Submission" ALTER COLUMN "userId" SET NOT NULL,
ALTER COLUMN "competitionId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Competition" ADD CONSTRAINT "Competition_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_competitionId_fkey" FOREIGN KEY ("competitionId") REFERENCES "Competition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "Submission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_competitionId_fkey" FOREIGN KEY ("competitionId") REFERENCES "Competition"("id") ON DELETE CASCADE ON UPDATE CASCADE;
