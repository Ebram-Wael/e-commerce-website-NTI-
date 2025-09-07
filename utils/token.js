import jwt from 'jsonwebtoken'
import { ref } from 'process';


export const makeToken = (user => {
let token = jwt
.sign({id: user.id, email: user.email, role: user.role}, 
    process.env.JWT_SECRET, {expiresIn: '2h'});

return token;    

});


export const makeRefreshToken = (user => {
    let refreshToken = jwt
    .sign({id: user.id, email: user.email, role: user.role}, 
        process.env.JWT_REFRESH_TOKEN_SECRET, {expiresIn: '2d'});
    
    return refreshToken;    

})