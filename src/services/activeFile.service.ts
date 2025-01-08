import { ActiveFileInterface, DEFAULT_FILE, DEFAULT_FILE_DATA } from "../types/mainProcessTypes";

let activeFileName = DEFAULT_FILE;
let activeFileData: ActiveFileInterface = DEFAULT_FILE_DATA;
let activeToken = '';

/* function showActualFile(){
    console.log("Active File Name: ", activeFileName);
    console.log("Active File Data: ", activeFileData);
    console.log("Active File Token: ", activeToken)
} */

// GET
function getActiveFileToken(): string{
    return activeToken;
}

function getActiveFileName(): string{
    return activeFileName;
}

function getFullActiveFileData(): ActiveFileInterface{
    return activeFileData;
}

function getActiveFileData<K extends keyof ActiveFileInterface>(objKey: K): ActiveFileInterface[K]{
    return activeFileData[objKey];
}

// SET
function setActiveFileData<K extends keyof ActiveFileInterface>(objKey: K, newData: ActiveFileInterface[K]): void{
    activeFileData[objKey] = newData;
}

function setActiveFileToken(token: string){
    activeToken = token;
}

function updateActiveFile( activeF: string = DEFAULT_FILE, data: ActiveFileInterface = DEFAULT_FILE_DATA): void{
    activeFileName = activeF;
    activeFileData = {
        params: data.params,
        pwdList: data.pwdList
    };
    //showActualFile();
}

export const activeFileService = {
    getActiveFileToken, getActiveFileName, getFullActiveFileData, getActiveFileData, setActiveFileToken, setActiveFileData, updateActiveFile
}