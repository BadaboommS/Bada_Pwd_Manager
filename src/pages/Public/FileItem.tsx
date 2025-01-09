import React from 'react';
import { MdDelete } from "react-icons/md";
import { StorageDataInfoInterface } from '../../types/mainProcessTypes';

export default function FileItem({file, setActive, deleteFile}: {file: StorageDataInfoInterface, setActive: (selectedFile: string) => void, deleteFile: (selectedFile: string) => void}) {
    return (
        <>
            <tr className='hover:cursor-pointer'>
                <td onClick={() => setActive(file.fileName)}>{file.fileName}</td>
                <td onClick={() => setActive(file.fileName)}>{file.fileModified.toLocaleDateString()}</td>
                <td onClick={() => setActive(file.fileName)}>{file.fileSize}</td>
                <td onClick={() => deleteFile(file.fileName)}>
                    <MdDelete size='24' className="hover:bg-red-500 rounded transition-all"/>
                </td>
            </tr>
        </>
  )
}