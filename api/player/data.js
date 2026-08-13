const { playFabServer } = require("../playfab");

function getPlayFabId(req) {
  return (
    req.body?.playFabId ||
    req.query?.playFabId ||
    null
  );
}

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "method_not_allowed"
    });
  }

  const playFabId = getPlayFabId(req);

  if (!playFabId) {
    return res.status(400).json({
      error: "playfab_id_required"
    });
  }

  try {
    const result = await playFabServer(
      "GetUserData",
      {
        PlayFabId: playFabId,
        Keys: req.body?.keys || null
      }
    );

    return res.status(200).json({
      success: true,
      data: result.data.Data || {}
    });
  } catch (error) {
    console.error("Player data error:", error.message);

    return res.status(500).json({
      error: "player_data_failed"
    });
  }
};