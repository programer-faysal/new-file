const axios = require("axios");

export default async function videoUpload({
  fileUrl,
  token,
  videoId
}: {
  token: string;
  fileUrl: string;
  videoId: string;
}): Promise<{ success: boolean }> {
  const url = `https://rupload.facebook.com/video-upload/v21.0/${videoId}`;
  const headers = {
    Authorization: `OAuth ${token}`,
    file_url: fileUrl,
  };
  const res = await axios.post(url, null, { headers });
  return res.data;
}

