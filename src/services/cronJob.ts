import reelsIndex from "./reels";
import { prisma } from "../client";

export const cornJob = async ()=> {
  try {
    // Find active pages
    const pages = await prisma.page.findMany({
      where: {
        active: true,
        nPublish: {
          lte: new Date(),
        },
      },
      include: {
        reel: {
          where: {
            status: "SCHEDULE",
            OR: [{ publish: null }, { publish: { lte: new Date() } }],
          },
        },
      },
    });

    for (const page of pages) {
      // Check if the page has reels to publish
      if (page.reel.length > 0) {
        // Find the first reel to publish (either without a publish date or the next scheduled one)
        const reelToPublish = page.reel.find(
          (reel) => reel.status !== "SCHEDULE"
        );

        if (reelToPublish) {
          const description = reelToPublish.description || page.description as string
          const res = await reelsIndex({
            pageId: page.id,
            token: page.token,
            vUrl: reelToPublish.link,
            description,
          });
          if (res.success) {
            await prisma.reel.update({
              where: { id: reelToPublish.id },
              data: {
                status: "PUBLISH",
                publish: new Date(), // Set the current time as the publish time
              },
            });
            console.log(
              `Published reel ${reelToPublish.id} for page ${page.id}`
            );
            // Update lPublish and nPublish fields for the page
            const currentTime = new Date();
            const nextPublishTime = new Date(
              currentTime.getTime() + page.after * 60 * 60 * 1000
            );

            await prisma.page.update({
              where: { id: page.id },
              data: {
                lPublish: currentTime,
                nPublish: nextPublishTime,
              },
            });
          }
        }
      } else {
        const totalReel = await prisma.reel.count({
          where: { userId: page.id },
        });
        if (totalReel > 0) {
          await prisma.page.update({
            where: { id: page.id },
            data: {
              active: false,
            },
          });
          console.log(`Deactivated page ${page.id} due to no reels.`);
        }
      }
    }
  } catch (error) {
    console.error("Error running cron job:", error);
  }
}