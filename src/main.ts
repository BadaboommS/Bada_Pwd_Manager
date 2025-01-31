import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import started from 'electron-squirrel-startup';
import { mainServiceFile, mainServiceInfo, mainServiceUtils } from './services/main.service';
import { ParamsInterface, NewFileInterface } from './types/mainProcessTypes';
import { activeFileService } from './services/activeFile.service';
import { PwdArray } from './types/pwdTypes';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true, //Must be true for the context bridge API to work.
      nodeIntegration: true
    },
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
  //Hide menu
  mainWindow.setMenu(null); 
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

// Data Storage function for main process

// Handler => expect a return value for Renderer
ipcMain.handle("getStorageFileData", () => {
  return mainServiceFile.getStorageFilesInfo();
})

ipcMain.handle("checkMasterKey", (e, encodedKey: string, fileName: string) => {
  return mainServiceInfo.checkMasterKey(encodedKey, fileName);
})

ipcMain.handle("getFileParams", (e, token: string) => {
  return mainServiceInfo.checkToken(token)? activeFileService.getActiveFileData('params') : null;
})

ipcMain.handle("getUserPwdData", (e, token: string) => {
  return mainServiceInfo.checkToken(token)? activeFileService.getActiveFileData('pwdList') : null;
})

ipcMain.handle("openDialog", (e, title: string, message: string, confirm: string, cancel: string) => {
  return mainServiceUtils.openDialog(title, message, confirm, cancel);
})

// On => No return value
ipcMain.on("createNewFile", (e, newFileData: NewFileInterface) => {
  mainServiceFile.createStorageFile(newFileData);
})

ipcMain.on("deleteFile", (e, fileName: string) => {
  mainServiceFile.deleteStorageFile(fileName);
})

ipcMain.on("setActiveFile", (e, selectedFile: string) => {
  const fileData = mainServiceInfo.getFileEncryptedInfo(selectedFile);
  activeFileService.updateActiveFile(selectedFile, fileData);
})

ipcMain.on("resetActiveFile", () => {
  activeFileService.updateActiveFile();
})

ipcMain.on("setPwdData", (e, newPwdData: PwdArray, token: string) => {
  if(mainServiceFile.isEncryptionAvailable() && mainServiceInfo.checkToken(token)){
    mainServiceInfo.writeUserPwd(newPwdData);
  }
});

ipcMain.on("setFileParams", (e, newParams: ParamsInterface, token: string) => {
  if(mainServiceFile.isEncryptionAvailable() && mainServiceInfo.checkToken(token)){
    mainServiceInfo.writeUserParams(newParams);
  }
});

ipcMain.on("clipboardCopy", (e, text: string) => {
  mainServiceFile.copyText(text);
})

ipcMain.on("openAlert", (e, title: string, message: string) => {
  mainServiceUtils.openAlert(title, message);
})