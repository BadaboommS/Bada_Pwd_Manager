import React, { useContext } from 'react';
import { StorageDataInfoInterface } from '../../types/mainProcessTypes';
import { PublicContext } from '../../context/PublicContextProvider';
import FileItem from './FileItem';

export default function FileList() {
    const { filesList } = useContext(PublicContext);

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
                                    <FileItem key={i} file={file} />
                                )
                            })}
                        </tbody>
                    </table>
                :   <></>
            }
        </>
  )
}