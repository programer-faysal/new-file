const axios = require("axios");

export default async function reelPublish({
  pageId,
  token,
  videoId,
  description,
}: {
  pageId: string;
  token: string;
  videoId: string;
  description?: string;
}) : Promise<{ success: boolean, post_id: string }> {
  const url = `https://graph.facebook.com/v21.0/${pageId}/video_reels`;
  const params = {
    access_token: token, 
    video_id: videoId,
    upload_phase: "finish",
    video_state: "PUBLISHED",
    description,
  };
  const res = await axios.post(url, null, { params })
  return res.data;
}
