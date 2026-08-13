const crypto = require("crypto");
const { playFabServer } = require("../playfab");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "method_not_allowed"
    });
  }

  try {
    const body = req.body || {};

    const username = body.username;
    const password = body.password;

    if (
      typeof username !== "string" ||
      username.length < 2 ||
      username.length > 32
    ) {
      return res.status(400).json({
        error: "invalid_username"
      });
    }

    if (
      typeof password !== "string" ||
      password.length < 8 ||
      password.length > 128
    ) {
      return res.status(400).json({
        error: "invalid_password"
      });
    }

    const customId = crypto.randomUUID();

    const result = await playFabServer(
      "LoginWithCustomID",
      {
        CustomId: customId,
        CreateAccount: true,
        InfoRequestParameters: {
          GetUserAccountInfo: true
        }
      }
    );

    return res.status(201).json({
      success: true,
      user: {
        id: result.data.PlayFabId,
        username
      },
      sessionTicket: result.data.SessionTicket
    });
  } catch (error) {
    console.error("Registration error:", error.message);

    return res.status(500).json({
      error: "registration_failed"
    });
  }
};