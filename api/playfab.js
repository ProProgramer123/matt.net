const PLAYFAB_TITLE_ID = process.env.PLAYFAB_TITLE_ID;
const PLAYFAB_SECRET_KEY = process.env.PLAYFAB_SECRET_KEY;

function requireConfig() {
  if (!PLAYFAB_TITLE_ID) {
    throw new Error("PLAYFAB_TITLE_ID is not configured");
  }

  if (!PLAYFAB_SECRET_KEY) {
    throw new Error("PLAYFAB_SECRET_KEY is not configured");
  }
}

async function playFabServer(endpoint, body) {
  requireConfig();

  const url =
    `https://${PLAYFAB_TITLE_ID}.playfabapi.com/Server/${endpoint}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-SecretKey": PLAYFAB_SECRET_KEY
    },
    body: JSON.stringify(body)
  });

  const text = await response.text();

  let data;

  try {
    data = JSON.parse(text);
  } catch {
    throw new Error(
      `PlayFab returned invalid JSON (${response.status})`
    );
  }

  if (!response.ok) {
    const error = new Error(
      `PlayFab request failed with HTTP ${response.status}`
    );

    error.playFab = data;

    throw error;
  }

  return data;
}

module.exports = {
  playFabServer
};