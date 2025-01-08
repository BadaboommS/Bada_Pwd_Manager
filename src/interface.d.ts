import { PwdArray } from "./types/pwdTypes"
import { ParamsInterface, StorageDataInfoInterface, NewFileInterface } from "./types/mainProcessTypes"

export interface IElectronAPI {
    // Main.on
    setActiveFile: (fileName: string) => void,
    resetActiveFile: () => void,
    setFilePwdData: (value: PwdArray, token: string) => Promise<void>,
    setFileParams: (newParams: ParamsInterface, token: string) => void,
    createNewFile: (newFileData: NewFileInterface) => void,
    deleteFile: (fileName: string) => void

    // Main.handle
    getStorageFileData: () => Promise<StorageDataInfoInterface[]>,
    checkMasterKey: (encodedKey: string, fileName: string) => Promise<string>,
    getUserPwdData: (token: string) => Promise<PwdArray>,
    getFileParams: (token: string) => Promise<ParamsInterface>,    
}

declare global{
    interface Window {
        electronAPI: IElectronAPI
    }
}