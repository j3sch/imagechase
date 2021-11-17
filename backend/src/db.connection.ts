import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const allPosts = await prisma.post.findMany();
  console.log(allPosts);
}

main()
  .catch((e) => {
    throw e;
  })

  .finally(async () => {
    await prisma.$disconnect();
  });
