module.exports = async (req, res) => {
  res.status(200).json({
    ok: true,
    service: "matt.net",
    version: "1.0.0",
    timestamp: new Date().toISOString()
  });
};
