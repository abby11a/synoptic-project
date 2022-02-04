import md5 from "md5";

/* Function to hash the password i.e. hash("Pasword123") will return hashed string */
export function hash(rawPassword: string, options?: {salt?:number, rounds?:number}) {
    // salt is the date used, can specify or defaults to current time
    const salt = options ? (options.salt ? options.salt : new Date().getTime()) : new Date().getTime();
    // rounds is a number used, can specify or defaults to 10
    const rounds = options ? (options.rounds ? options.rounds : 10) : 10;

    let hashed = md5(rawPassword + salt);
    for (let i = 0; i <= rounds; i++) {
        hashed = md5(hashed);
    }
    return `${salt}$${rounds}$${hashed}`;
}

/* Checks if the password is the same as the hashedPassword */
export function compare(rawPassword: string, hashedPassword: string) {
    try {
        let hashedPasswordArr = (hashedPassword.split('$'));
        const salt = Number(hashedPasswordArr[0]);
        const rounds = Number(hashedPasswordArr[1])
        const hashedRawPassword = hash(rawPassword, { salt, rounds });
        return hashedPassword === hashedRawPassword;
    } catch (error: any) {
        throw Error(error);
    }
}