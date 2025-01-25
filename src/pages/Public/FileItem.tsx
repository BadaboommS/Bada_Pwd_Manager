import React, { useContext, useState } from 'react';
import { MdDelete } from "react-icons/md";
import { StorageDataInfoInterface } from '../../types/mainProcessTypes';
import { GeneralContext } from '../../context/GeneralContextProvider';
import FileDeleteForm from './FileDeleteForm';
import Modal from '../../global/Modal';

interface FileItemPropsInterface {
    file: StorageDataInfoInterface
}

export default function FileItem({ file }: FileItemPropsInterface){
    const { setSelectedFile } = useContext(GeneralContext);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    return (
        <>
            <tr className='hover:cursor-pointer text-xl'>
                <td onClick={() => setSelectedFile(file.fileName)}>{file.fileName}</td>
                <td onClick={() => setSelectedFile(file.fileName)}>{file.fileModified.toLocaleDateString()}</td>
                <td onClick={() => setSelectedFile(file.fileName)}>{file.fileSize}</td>
                <td>
                    <MdDelete size='24' className="hover:bg-red-500 rounded transition-all" onClick={() => setShowDeleteModal(true)}/>
                </td>
            </tr>
            {(showDeleteModal)
                ?   <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
                        <FileDeleteForm deleteFileName={file.fileName} setShowDeleteModal={setShowDeleteModal}/>
                    </Modal>
                : <></>
            }
        </>
  )
}