module.exports = (req, res) => {
  res.status(200);

  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "no-store");

  res.end(JSON.stringify({
    success: true,
    version: 2,
    service: "matt.net"
  }));
};