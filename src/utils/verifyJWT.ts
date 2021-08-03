import JWT from 'jsonwebtoken';

export const generateToken = (payload: string | object | Buffer) => (
    new Promise((resolve) => {
        JWT.sign(payload, 'adadalconex', { algorithm: 'HS256' }, (err, token) => {
            if (err) {
                console.error(err);
                throw new Error('ERR_INVALID_TOKEN');
            }
            resolve(token);
        });
    })
);
export const refreshToken = (payload: string | object | Buffer) => (
    new Promise((resolve) => {
        JWT.sign(payload, 'adadalconex', { algorithm: 'HS256' }, (err, token) => {
            if (err) {
                console.error(err);
                throw new Error('ERR_INVALID_TOKEN');
            }
            resolve(token);
        });
    })
);
