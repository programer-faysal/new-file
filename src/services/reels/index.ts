import Initialize from "./Initialize";
import videoUpload from "./videoUpload";
import reelPublish from "./reelPublish";
import { getFbVideoInfo } from "./videoScrapping";

export default async function reelsIndex({
  pageId,
  token,
  vUrl,
  description
}: {
  token: string;
  pageId: string;
  vUrl: string;
  description?: string;
}): Promise<{ success: boolean; message: string; videoId: string }> {
  try {
    const { upload_url, video_id } = await Initialize({ pageId, token });
    if (!video_id) throw new Error("Reel initialize fail");
    const { duration_ms, hd, sd, thumbnail, title, url } = await getFbVideoInfo(vUrl);
    if (!hd) throw new Error("Reel scrapping fail");
    const upload = await videoUpload({ fileUrl: hd, token, videoId: video_id });
    if (!upload.success) throw new Error("Reel upload fail");
    const published = await reelPublish({ pageId, token, videoId: video_id, description });
    if (!published.success) throw new Error("Reel publish fail");
    return {message: "Upload Successful", success: true, videoId: published.post_id}
  } catch (error) {
    console.log(error);
  }
  return {
    message: "Reels Upload Fail",
    videoId: "",
    success: false,
  };
}
