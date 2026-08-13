module.exports = async (req, res) => {
  const path = Array.isArray(req.query.path)
    ? "/" + req.query.path.join("/")
    : "/";

  console.log("========== MATT.NET REQUEST ==========");
  console.log("Method:", req.method);
  console.log("Path:", path);
  console.log("Query:", req.query);

  console.log(
    "Content-Type:",
    req.headers["content-type"] || null
  );

  console.log(
    "User-Agent:",
    req.headers["user-agent"] || null
  );

  /*
   * DO NOT log authorization headers,
   * PlayFab secrets, passwords, or session tickets.
   */

  console.log("=======================================");

  return res.status(200).json({
    success: true,
    service: "matt.net",
    endpoint: path,
    message: "Endpoint received."
  });
};