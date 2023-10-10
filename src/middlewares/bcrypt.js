import bcrypt from 'bcrypt';

export const hashString = (string) => {
    const salt = bcrypt.genSaltSync(10);
    const hashedString = bcrypt.hashSync(string, salt);
    return hashedString;
}

export const checkHashedString = (hashedString, string) => {
    return bcrypt.compareSync(hashedString, string);
}