import { prisma } from "./client";
import { Status } from "@prisma/client";

export const createManyReels = async ({
  links,
  pageId,
  userId,
  status,
}: {
  userId: string;
  pageId: string;
  links: string[];
  status: boolean;
}) => {
  const reels = links.map((link) => ({
    link,
    userId,
    pageId,
    status:  status? Status.SCHEDULE : Status.PENDING,
  }));
  try {
    const res = await prisma.reel.createMany({
      data: reels,
    });
  } catch (error) {
    console.log(error)
  }
};
