//https://firebase.google.com/docs/auth/admin/verify-id_tokens?hl=it#web

const resp = await fetch(
  "https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com"
);

const body = await resp.json();
const keys = [];

for (const key in body) {
  keys.push(key);
}

async function CheckIdToken(req, res, next) {
  console.log(req.path, Date.now());
  const IdToken = req.get("id_token");

  if (req.path == "/log-in") return next();

  if (!IdToken) return res.status(400);

  try {
    const [header, payload] = parseJwt(IdToken);

    var date = new Date().getTime() / 1000;

    var exp = payload.exp;
    var iat = payload.iat;
    var aud = payload.aud;
    var iss = payload.iss;
    var sub = payload.sub;
    var auth_time = payload.auth_time;
    var user_id = payload.user_id;

    var valid = true;

    if (header.alg != "RS256") {
      valid = false;
      console.log("alg");
    } else if (!keys.includes(header.kid)) {
      valid = false;
      console.log("kid");
    } else if (!exp) {
      valid = false;
      console.log("exp");
    } else if (!iat) {
      valid = false;
      console.log("iat");
    } else if (!aud) {
      valid = false;
      console.log("aud");
    } else if (!iss) {
      valid = false;
      console.log("iss");
    } else if (!sub) {
      valid = false;
      console.log("sub");
    } else if (!auth_time) {
      valid = false;
      console.log("auth_time");
    } else if (!user_id) {
      valid = false;
      console.log("user_id");
    } else if (exp < date) {
      valid = false;
      console.log("exp<date");
    } else if (iat > date) {
      valid = false;
      console.log("iat>date");
    } else if (auth_time > date) {
      valid = false;
      console.log("auth_time>date");
    } else if (aud != process.env.fb_projectId) {
      valid = false;
      console.log("aud 2", aud);
    } else if (
      iss != `https://securetoken.google.com/${process.env.fb_projectId}`
    ) {
      valid = false;
      console.log("iss != ");
    }
    console.log("valid", valid);
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
