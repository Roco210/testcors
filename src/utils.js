import {dirname} from 'path';
import {fileURLToPath} from 'url';
import config from './config/config.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const __dirname= dirname(fileURLToPath(import.meta.url))

// hash password
export const hashdata=  async (data)=>{
    return bcrypt.hash(data, 10)
}

export const compareHash = async (data, hash)=>{
    return bcrypt.compare(data, hash)
}

// JWT

export const generateToken = (user) => {
    const token = jwt.sign({user}, config.jwtSecret, { expiresIn: '24h' })
    
    return token
}