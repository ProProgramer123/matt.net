const { playFabServer } = require("../playfab");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "method_not_allowed"
    });
  }

  const {
    playFabId,
    data
  } = req.body || {};

  if (!playFabId) {
    return res.status(400).json({
      error: "playfab_id_required"
    });
  }

  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return res.status(400).json({
      error: "invalid_data"
    });
  }

  try {
    const result = await playFabServer(
      "UpdateUserData",
      {
        PlayFabId: playFabId,
        Data: data
      }
    );

    return res.status(200).json({
      success: true,
      version: result.data.Version
    });
  } catch (error) {
    console.error("Player save error:", error.message);

    return res.status(500).json({
      error: "player_save_failed"
    });
  }
};