import React, { useContext } from 'react';
import FileList from './FileList';
import FileLogin from './FileLogin';
import { PublicContext } from '../../context/PublicContextProvider';
import { GeneralContext } from '../../context/GeneralContextProvider';
import FileMenu from './FileMenu/FileMenu';

export default function Login () {
  const { filesList } = useContext(PublicContext);
  const { selectedFile } = useContext(GeneralContext);

  return (
    <div className='flex flex-col gap-2 w-full h-full p-2 bg-gray-400'>
      {(filesList[0])
        ? <>
            <FileMenu />
            <FileList/>
            {(selectedFile !== "")
              ? <FileLogin /> 
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
