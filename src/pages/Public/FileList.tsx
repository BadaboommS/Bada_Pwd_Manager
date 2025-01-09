import React, { useContext } from 'react';
import { StorageDataInfoInterface } from '../../types/mainProcessTypes';
import { GeneralContext } from '../../context/GeneralContextProvider';
import { PublicContext } from '../../context/PublicContextProvider';
import FileItem from './FileItem';

export default function FileList() {
    const { filesList, setReload } = useContext(PublicContext);
    const { setSelectedFile } = useContext(GeneralContext);

    function handleSetActiveFile(selectedFile: string): void{
        setSelectedFile(selectedFile);
    }

    function handleDeleteFile(selectedFile: string): void{
        if(window.confirm("Confirm File suppression ? (this is permanent)") === false){
            return null
        }

        window.electronAPI.deleteFile(selectedFile);
        setReload(true);
    }

    return (
        <>
            {(filesList[0])
                ?   <table className='w-full bg-white p-2'>
                        <thead className='text-center'>
                            <tr>
                                <th>File</th>
                                <th>Last modified</th>
                                <th>Size</th>
                                <th>Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filesList.map((file: StorageDataInfoInterface, i: number) => {
                                return(
                                    <FileItem key={i} file={file} setActive={handleSetActiveFile} deleteFile={handleDeleteFile}/>
                                )
                            })}
                        </tbody>
                    </table>
                :   <></>
            }
        </>
  )
}