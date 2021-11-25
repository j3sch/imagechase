import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getSubmissionRating(
  id: string,
  rating: number,
): Promise<number> {
  const ratings = await prisma.rating.findMany({
    where: {
      submissionId: Number(id),
    },
  });

  let ratingSum = 0;

  for (let i = 0; i < ratings.length; i++) {
    ratingSum += ratings[i].rating;
  }
  return (ratingSum =
    Math.round(((ratingSum + rating) / (ratings.length + 1)) * 10) / 10);
}
