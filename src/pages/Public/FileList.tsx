import React, { useContext } from 'react';
import { GeneralContext } from '../../context/GeneralContextProvider';
import { StorageDataInfoInterface } from '../../types/mainProcessTypes';
import { PublicContext } from '../../context/PublicContextProvider';

export default function FileList() {
    const { filesList } = useContext(PublicContext);
    const { setSelectedFile } = useContext(GeneralContext);

    function handleSetActiveFile(selectedFile: string): void{
        setSelectedFile(selectedFile);
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
                            </tr>
                        </thead>
                        <tbody>
                            {filesList.map((file: StorageDataInfoInterface, i: number) => {
                                return(
                                    <tr key={i} className='hover:cursor-pointer' onClick={() => handleSetActiveFile(file.fileName)}>
                                        <td>{file.fileName}</td>
                                        <td>{file.fileModified.toLocaleDateString()}</td>
                                        <td>{file.fileSize}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                :   <></>
            }
        </>
  )
}