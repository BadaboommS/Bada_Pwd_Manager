import React, { useContext, useState } from "react";
import Modal from "../../../global/Modal";
import { MdCancel, MdDelete } from "react-icons/md";
import { PublicContext } from "../../../context/PublicContextProvider";
import { StorageDataInfoInterface } from '../../../types/mainProcessTypes';

export default function FileDelete () {
    const { filesList, setReload } = useContext(PublicContext);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    function handleFileDelete(fileName: string): void{
        if(window.confirm("Confirm File suppression ? (this is permanent)") === false){
            return null
        }

        window.electronAPI.deleteFile(fileName);
        setShowDeleteModal(false);
        setReload(true);
    }
    return (
        <>
            <button title="Delete File" onClick={() => setShowDeleteModal(true)}>
                <MdDelete size='32' className="hover:bg-red-500 rounded p-2 transition-all"/>
            </button>
            <Modal open={showDeleteModal}>
                <div className="flex flex-col gap-2 justify-center items-center">
                    {filesList[0]
                        ?   <div className="flex flex-col gap-2">
                                <h3 className="text-2xl text-black font-bold">Select File to delete:</h3>
                                {filesList.map((file: StorageDataInfoInterface, i: number) => {
                                    return <button key={i} onClick={() => handleFileDelete(file.fileName)} className="w-full p-2 text-white text-xl hover:bg-red-500 rounded transition-all">{file.fileName}</button>
                                })}
                            </div>
                        :   <p>No File to Delete !</p>
                    }
                    <button className='p-2' type='reset' onClick={() => setShowDeleteModal(false)} title="Cancel"><MdCancel size='32' className="hover:bg-red-500 rounded p-2 transition-all"/></button>
                </div>
            </Modal>
        </>
    )
}
