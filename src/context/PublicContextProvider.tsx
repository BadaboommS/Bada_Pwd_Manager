import React, { createContext, useEffect, useState } from 'react';
import { StorageDataInfoInterface } from '../types/mainProcessTypes';

export const PublicContext = createContext(null);

export default function PublicContextProvider ({ children }: { children: React.ReactNode }) {
  const [filesList, setFilesList] = useState<StorageDataInfoInterface[]>([]);
  const [reload, setReload] = useState(false);

  async function getStorageData(){
    return await window.electronAPI.getStorageFileData();
  }

  useEffect(() => {
    try{
      getStorageData().then(fetchedData => {
        if(fetchedData !== null){
          setFilesList(fetchedData);
        }
      });
    }catch(err){
      console.log(`Error in Public Fetching Context: ${err.name} - ${err.message}`);
    }finally{
      setReload(false);
    }
  }, [reload]);


  return (
    <PublicContext.Provider value={{ filesList, setReload }}>
      { children }
    </PublicContext.Provider>
  )
}