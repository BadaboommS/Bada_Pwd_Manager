export interface PwdItem {
    id: number,
    name: string,
    website: string,
    username: string,
    password: string,
    comment: string
}

export type PwdArray = Array<PwdItem>