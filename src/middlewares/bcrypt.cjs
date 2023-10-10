const bcrypt = require('bcrypt');

const hashString = (string) => {
    const salt = bcrypt.genSaltSync(10);
    const hashedString = bcrypt.hashSync(string, salt);
    return hashedString;
}

const checkHashedString = (hashedString, string) => {
    return bcrypt.compareSync(hashedString, string);
}
module.exports = {
    hashString,
    checkHashedString
}