import axios from "axios";

export default async function handler(req, res) {
  try {
    const response = await axios.post(
      "https://www.zohoapis.in/crm/v8/Leads",
      req.body,
      {
        headers: {
          Authorization: `Zoho-oauthtoken ${process.env.ZOHO_TOKEN}`,
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