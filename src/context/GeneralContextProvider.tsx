import React, { createContext, useEffect, useState } from 'react';
import { accountService } from '../services/account.service';

export const GeneralContext = createContext(null);

export default function GeneralContextProvider ({ children }: { children: React.JSX.Element }) { 
  const [selectedFile, setSelectedFile] = useState('');

  useEffect(() => {
    if(selectedFile !== ""){
        accountService.setActiveFile(selectedFile);
    }else{
        accountService.logout();
    }
  }, [selectedFile]);

  return (
    <GeneralContext.Provider value={{ selectedFile, setSelectedFile }}>
      { children }
    </GeneralContext.Provider>
  )
}