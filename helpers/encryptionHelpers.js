import bcrypt from 'bcrypt';

export const encryptData = (data) => bcrypt.hashSync(data, 10);
export const compareData = (data, hash) => bcrypt.compareSync(data, hash);
