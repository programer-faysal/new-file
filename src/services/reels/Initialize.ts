const axios = require("axios");

export default async function Initialize({
  pageId,
  token,
}: {
  pageId: string;
  token: string;
}): Promise<{ video_id: string; upload_url: string }> {
  const url = `https://graph.facebook.com/v21.0/${pageId}/video_reels`;
  const data = {
    upload_phase: "start",
    access_token: token,
  };
  const res = await axios.post(url, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data;
}
