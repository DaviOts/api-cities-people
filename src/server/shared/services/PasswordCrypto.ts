import bcrypt from "bcryptjs";


const hashPassword = async(password: string) => {
    return await bcrypt.hash(password, 8);
}

const verifyPassword = async(password: string, hashPassword: string) => {
    return await bcrypt.compare(password, hashPassword);
}

export const PasswordCrypto = {
    hashPassword,
    verifyPassword
}