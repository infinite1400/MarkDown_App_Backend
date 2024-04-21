import crypto from 'crypto'

export const random=()=>{
    return crypto.randomBytes(128).toString('base64');
}
const key=process.env.SECRET;
export const authentication=(salt : string,password : string)=>{
    return crypto.createHmac('sha256',[salt,password].join('/')).update(key).digest('hex');
}