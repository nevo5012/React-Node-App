import jsonwebtoken from 'jsonwebtoken'
import jwkToPem from 'jwk-to-pem'

const jsonWebKeys = [
    {
        "alg": "RS256",
        "e": "AQAB",
        "kid": "5vs1K0AWCpZmoVV96non1FQnCYAMC9rKt+3abJNxTtc=",
        "kty": "RSA",
        "n": "uWt5HVY_M5ju4ClS_hdwyebdgnAxGkvOA68vWWoEY0gPbJGYKvXHg6fQpJRdue-L0MQMCZhrETDIBrFtYXFC8uXpCmzyd48KP0j6nR5mygSi8Ropdc7JzhsTzKd-HLhDPJx4SC62syD_V0PEs0Pv6Qvmmq5DnUgPneiTW15B7Qspa0bC8nOe5SBaBqAIh-wWpVm7vcaDRKN25DU1UQEZmnEobknpHE4VpUOKXINQff2XAttt-s3L-7wRRHa4PMNKYe_A26tgUopE7WIH4LAr3uP1Fl7P_uJ5nJINGG9r7eWJ9ni80nWh4z2ULJOnI9gqAV5oAWsZjfI8r7axodnoJw",
        "use": "sig"
    },
    {
        "alg": "RS256",
        "e": "AQAB",
        "kid": "3JWnVjfncmlU93ZRRDdVxIhpVbUGOua0f2ngYBjUA6w=",
        "kty": "RSA",
        "n": "xTXwGURnrT5Nvshr8YVzfLYP_LvQ2kBnhkQB2Wnx1vcfTJMFo1dEAi0XyK4f2OOVmRScXIifFNqB9pjmahhHz3TBFn1P9_6ZjrDPybJqJt8DcjcCET3KOb0Ja9aZRvVOwEBS-Vom7MIPC29imfdpoam4S7WE2ifY5F65vLAHV5clFxDkw54rQTYup7wH-PHk1gJMmEHiO3N31HCRwmBg4j6W_k33lDymDLnohgUi3E-TNwk5GNlbuFRTPo7gbCon3uCbxXn7t-aAVNd4TgiUFK-pIH3fjBU2noM7Jnf01cDBr2i__cWgM9NGD6PsX2Ff9YU6dHs0WW6bMgq2fG-kKQ",
        "use": "sig"
    }]

export function validateToken(token) {
    const header = decodeTokenHeader(token);  // {"kid":"XYZAAAAAAAAAAAAAAA/1A2B3CZ5x6y7MA56Cy+6abc=", "alg": "RS256"}
    const jsonWebKey = getJsonWebKeyWithKID(header.kid);
    return verifyJsonWebTokenSignature(token, jsonWebKey, (err, decodedToken) => {
        if (err) {
            console.error(err);
            return null;
        } else {
            return decodedToken;
        }
    })
}

function decodeTokenHeader(token) {
    const [headerEncoded] = token.split('.');
    const buff = Buffer.from(headerEncoded, 'base64');
    const text = buff.toString('ascii');
    return JSON.parse(text);
}

function getJsonWebKeyWithKID(kid) {
    for (let jwk of jsonWebKeys) {
        if (jwk.kid === kid) {
            return jwk;
        }
    }
    return null
}

function verifyJsonWebTokenSignature(token, jsonWebKey, clbk) {
    const pem = jwkToPem(jsonWebKey);
    return jsonwebtoken.verify(token, pem, { algorithms: ['RS256'] }, (err, decodedToken) => clbk(err, decodedToken))
}

export function getUserEmail(req) {
    if (req.headers['authorization']) {
        let authorization = req.headers['authorization'].split(' ');
        if (authorization[0] == 'Bearer') {
            let token = jsonwebtoken.decode(authorization[1]);
            return token?.email;
        }
    }
    return null;
}