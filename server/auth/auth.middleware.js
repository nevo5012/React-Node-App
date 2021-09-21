import { validateToken } from './auth.service.js'

export const validJWTNeeded = (role) => {
    return (req, res, next) => {
        if (req.headers['authorization']) {
            try {
                let authorization = req.headers['authorization'].split(' ');
                if (authorization[0] !== 'Bearer') {
                    return res.status(401).send();
                } else {
                    let decodeToken = validateToken(authorization[1]);
                    if (decodeToken) {
                        if (!role) {
                            return next();
                        } else if (decodeToken['custom:role']== role) {
                            return next();
                        } else {
                            return res.status(403).send();
                        }
                    } else {
                        return res.status(401).send();
                    }
                }
            } catch (err) {
                console.log(err);
                return res.status(403).send();
            }
        } else {
            return res.status(401).send();
        }
    }
};