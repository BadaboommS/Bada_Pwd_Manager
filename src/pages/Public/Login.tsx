import React, { useContext, useEffect, useState } from 'react';
import { PublicContext } from '../../context/PublicContextProvider';
import { GeneralContext } from '../../context/GeneralContextProvider';
import FileMenu from './FileMenu/FileMenu';
import FileList from './FileList';
import FileLogin from './FileLogin';
import Modal from '../../global/Modal';

export default function Login () {
  const { filesList } = useContext(PublicContext);
  const { selectedFile } = useContext(GeneralContext);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    if(selectedFile !== ""){
      setShowLogin(true);
    }
  }, [selectedFile])


  return (
    <div className='flex flex-col gap-2 w-full h-full p-2 bg-gray-400'>
      {(filesList[0])
        ? <>
            <FileMenu />
            <FileList/>
            {(showLogin)
              ? <Modal isOpen={showLogin} onClose={() => setShowLogin(false)}>
                  <FileLogin setShowLogin={setShowLogin}/>
                </Modal> 
              : <></>
            }
          </>
        : <div>
            <p>Storage Empty</p>
            <button> Add New storage file</button>
            <FileMenu />
          </div>
      }
    </div>
  )
}
