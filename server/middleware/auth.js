import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
    try {
        //check token is valid for user to like or delete a post, get token from front end
        const token = req.headers.auth.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;

        let decodedData;

        if(token && isCustomAuth) {
            decodedData = jwt.verify(token, 'test');
            //we store verified user data in req.userId
            req.userId = decodedData?.id;
        } else {
            decodedData = jwt.decode(token);

            //sub is an id that differentiates every single user
            req.userId = decodedData?.sub;
        }

        next();

    } catch (error) {
        console.log(error);
    }
}

export default auth;