// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { ParamsInterface, NewFileInterface } from "./types/mainProcessTypes";
import { ipcRenderer, contextBridge } from "electron";

// Expose Api for bridge between main and renderer
if(process.contextIsolated){
    try{
        contextBridge.exposeInMainWorld('electronAPI', {
            // Main.on
            setActiveFile: (fileName: string) => ipcRenderer.send("setActiveFile", fileName),
            resetActiveFile: () => ipcRenderer.send("resetActiveFile"),
            setFilePwdData: (newData: string, token: string) => ipcRenderer.send("setFilePwdData", newData, token),
            setFileParams: (newParams: ParamsInterface, token: string) => ipcRenderer.send("setFileParams", newParams, token),
            createNewFile: (newFileData: NewFileInterface) => ipcRenderer.send("createNewFile", newFileData),
            deleteFile: (fileName: string) => ipcRenderer.send("deleteFile", fileName),

            // Main.handle
            getStorageFileData: () => ipcRenderer.invoke("getStorageFileData"),
            checkMasterKey: (encodedKey: string, fileName: string) => ipcRenderer.invoke("checkMasterKey", encodedKey, fileName),
            getUserPwdData: (token: string) => ipcRenderer.invoke("getUserPwdData", token),
            getFileParams: (token: string) => ipcRenderer.invoke("getFileParams", token),
        })
    }catch(error){
        console.log(error);
    }
}