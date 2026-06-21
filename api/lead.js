import axios from "axios";

export default async function handler(req, res) {
  try {
    // Get fresh access token
    const tokenResponse = await axios.post(
      "https://accounts.zoho.in/oauth/v2/token",
      null,
      {
        params: {
          refresh_token: process.env.ZOHO_REFRESH_TOKEN,
          client_id: process.env.ZOHO_CLIENT_ID,
          client_secret: process.env.ZOHO_CLIENT_SECRET,
          grant_type: "refresh_token",
        },
      }
    );

    const accessToken = tokenResponse.data.access_token;

    // Create lead
    const response = await axios.post(
      "https://www.zohoapis.in/crm/v8/Leads",
      req.body,
      {
        headers: {
          Authorization: `Zoho-oauthtoken ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    return res.status(200).json(response.data);
  } catch (error) {
    console.log("ZOHO ERROR:", error.response?.data);
    return res.status(500).json(
      error.response?.data || { message: error.message }
    );
  }
}