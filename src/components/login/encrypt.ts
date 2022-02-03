import md5 from "md5";

export function hash(rawPassword: string, options?: {salt?:number, rounds?:number}) {
    const salt = options ? (options.salt ? options.salt : new Date().getTime()) : new Date().getTime();
    const rounds = options ? (options.rounds ? options.rounds : 10) : 10;

    let hashed = md5(rawPassword + salt);
    for (let i = 0; i <= rounds; i++) {
        hashed = md5(hashed);
    }
    return `${salt}$${rounds}$${hashed}`;
}

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
