import React, { useContext, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { StorageDataInfoInterface } from '../../types/mainProcessTypes';
import { GeneralContext } from '../../context/GeneralContextProvider';
import { PublicContext } from '../../context/PublicContextProvider';
import { accountService } from '../../services/account.service';
import FileItem from './FileItem';
import Modal from '../../global/Modal';

type LoginFormInput = {
    password: string
}

export default function FileList() {
    const { filesList, setReload } = useContext(PublicContext);
    const { setSelectedFile } = useContext(GeneralContext);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteFile, setDeleteFile] = useState('');

    const { register, handleSubmit, reset } = useForm<LoginFormInput>({
        defaultValues: {
            password: ''
        }
    });
    const onSubmit: SubmitHandler<LoginFormInput> = (data) => {
        if(window.confirm("Confirm File suppression ? (this is permanent)") === false){
            return null
        }

        accountService.login(data.password, deleteFile)
            .then(token => {
                if(token === null || token === undefined){
                    alert('Wrong Master Key');
                }else{
                    setShowDeleteModal(false);
                    reset();
                    window.electronAPI.deleteFile(deleteFile);
                    setReload(true);
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    function handleSetActiveFile(selectedFile: string): void{
        setSelectedFile(selectedFile);
    }

    function handleDeleteModal(selectedFile: string): void{
        setShowDeleteModal(true);
        setDeleteFile(selectedFile);
    }

    function cancelDeleteModal():void {
        setShowDeleteModal(false);
        setDeleteFile('');
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
                                    <FileItem key={i} file={file} setActive={handleSetActiveFile} deleteFile={handleDeleteModal}/>
                                )
                            })}
                        </tbody>
                    </table>
                :   <></>
            }
            {(showDeleteModal)
                ?   <Modal open={showDeleteModal}>
                        <div className='flex flex-col gap-2'>
                            <p>Are you sure you want to delete file : {deleteFile} ?</p>
                            <div className='flex flex-col gap-2'>
                                <form onSubmit={handleSubmit(onSubmit)} className='bg-slate-400 rounded-md p-5 gap-5 border border-solid border-black flex flex-col items-center'>
                                    <h2 className='text-2xl'>Enter Master Key</h2>
                                    <div className='flex flex-row items-center gap-2'>
                                        <input {...register("password", {required: "Enter Master Password."})} className="pl-1" type="password" autoComplete='off'/>
                                    </div>
                                    <div className='flex flex-row gap-2'>
                                        <button type='submit' form='form' className='bg-red-500 text-white p-2 rounded-md'>Delete</button>
                                        <button onClick={() => cancelDeleteModal()} type="reset" className='bg-green-500 text-white p-2 rounded-md'>Cancel</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </Modal>
                :   <></>
            }
        </>
  )
}