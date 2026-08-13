const { playFabServer } = require("../playfab");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "method_not_allowed"
    });
  }

  try {
    const body = req.body || {};

    if (typeof body.customId !== "string") {
      return res.status(400).json({
        error: "custom_id_required"
      });
    }

    const result = await playFabServer(
      "LoginWithCustomID",
      {
        CustomId: body.customId,
        CreateAccount: false,
        InfoRequestParameters: {
          GetUserAccountInfo: true,
          GetUserInventory: true,
          GetUserVirtualCurrency: true
        }
      }
    );

    return res.status(200).json({
      success: true,
      user: {
        id: result.data.PlayFabId
      },
      sessionTicket: result.data.SessionTicket,
      accountInfo: result.data.InfoResultPayload || null
    });
  } catch (error) {
    console.error("Login error:", error.message);

    return res.status(401).json({
      error: "invalid_credentials"
    });
  }
};