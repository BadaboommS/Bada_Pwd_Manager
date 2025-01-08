import { PwdArray } from "./pwdTypes";

export interface StorageDataInfoInterface {
    fileName: string,
    fileSize: number,
    fileModified: Date
}

export interface ParamsInterface {
    length: number,
    selectedSet: {
        setNumber: boolean,
        setUppercase: boolean,
        setLowercase: boolean,
        setMinus: boolean,
        setUnderline: boolean,
        setSpecial: boolean,
        setBrackets: boolean,
    }
}

// New File
export interface NewFileInterface {
    name: string;
    masterKey : string;
    params: {
        length: number,
        selectedSet: {
            setNumber: boolean,
            setUppercase: boolean,
            setLowercase: boolean,
            setMinus: boolean,
            setUnderline: boolean,
            setSpecial: boolean,
            setBrackets: boolean,
        }
    }
}

// Active File
export interface ActiveFileInterface {
    params: ParamsInterface,
    pwdList: PwdArray
}

export interface FullFileInterface {
    masterKey: string,
    params: ParamsInterface,
    pwdList: PwdArray
}

export const DEFAULT_FILE = '';
export const DEFAULT_FILE_DATA: ActiveFileInterface = {
    params: {
        length: 20,
        selectedSet: {
            setNumber: true,
            setUppercase: true,
            setLowercase: true,
            setMinus: false,
            setUnderline: false,
            setSpecial: false,
            setBrackets: false,
        }
    },
    pwdList: []
};