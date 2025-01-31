import { PwdArray } from "./types/pwdTypes"
import { ParamsInterface, StorageDataInfoInterface, NewFileInterface } from "./types/mainProcessTypes"

export interface IElectronAPI {
    // Main.on
    setActiveFile: (fileName: string) => void,
    resetActiveFile: () => void,
    setFilePwdData: (value: PwdArray, token: string) => Promise<void>,
    setFileParams: (newParams: ParamsInterface, token: string) => void,
    createNewFile: (newFileData: NewFileInterface) => void,
    deleteFile: (fileName: string) => void,
    clipboardCopy: (text: string) => void,
    openAlert: (title: string, message: string) => void,

    // Main.handle
    getStorageFileData: () => Promise<StorageDataInfoInterface[]>,
    checkMasterKey: (encodedKey: string, fileName: string) => Promise<string>,
    getUserPwdData: (token: string) => Promise<PwdArray>,
    getFileParams: (token: string) => Promise<ParamsInterface>,
    openDialog: (title: string, message: string, confirm: string, cancel: string) => Promise<boolean>
}

declare global{
    interface Window {
        electronAPI: IElectronAPI
    }
}