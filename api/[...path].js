function safeHeaders(req) {
  const names = ["content-type", "user-agent", "accept", "x-client-version", "x-platform"];
  const out = {};
  for (const name of names) {
    if (req.headers[name] !== undefined) out[name] = req.headers[name];
  }
  return out;
}

module.exports = async (req, res) => {
  const rawPath = req.query.path;
  const path = Array.isArray(rawPath) ? "/" + rawPath.join("/") : "/";

  console.log(JSON.stringify({
    service: "matt.net",
    method: req.method,
    path,
    query: req.query,
    headers: safeHeaders(req),
    body: req.body ?? null,
    time: new Date().toISOString()
  }));

  res.status(200).json({
    success: true,
    service: "matt.net",
    path,
    method: req.method,
    data: {}
  });
};
