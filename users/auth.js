//https://firebase.google.com/docs/auth/admin/verify-id-tokens?hl=it#web

const resp = await fetch(
  "https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com"
);

const body = await resp.json();
const keys = [];

for (const key in body) {
  keys.push(key);
}

async function CheckIdToken(req, res, next) {
  const IdToken = req.get("id-token");

  if (req.path == "/log-in") return next();

  try {
    const [header, payload] = parseJwt(IdToken);

    console.log(header);
    console.log(payload);

    var date = new Date().getTime() / 1000;

    var exp = payload.exp;
    var iat = payload.iat;
    var aud = payload.aud;
    var iss = payload.iss;
    var sub = payload.sub;
    var auth_time = payload.auth_time;
    var user_id = payload.user_id;

    var valid = true;

    if (header.alg != "RS256") valid = false;
    else if (!keys.includes(header.kid)) valid = false;
    else if (!exp) valid = false;
    else if (!iat) valid = false;
    else if (!aud) valid = false;
    else if (!iss) valid = false;
    else if (!sub) valid = false;
    else if (!auth_time) valid = false;
    else if (!user_id) valid = false;
    else if (exp < date) valid = false;
    else if (iat > date) valid = false;
    else if (auth_time > date) valid = false;
    else if (aud != process.env.fb_projectId) valid = false;
    else if (
      iss != `https://securetoken.google.com/${process.env.fb_projectId}`
    )
      valid = false;

    if (!valid) return res.status(500).json({ error: "bad request token" });

    return next();
  } catch (err) {
    console.error(err);
    return;
  }
}

function parseJwt(token) {
  var header = JSON.parse(
    Buffer.from(token.split(".")[0], "base64").toString()
  );
  var payload = JSON.parse(
    Buffer.from(token.split(".")[1], "base64").toString()
  );

  return [header, payload];
}

export default CheckIdToken;
