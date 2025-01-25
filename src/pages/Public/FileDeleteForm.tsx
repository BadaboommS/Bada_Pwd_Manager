import React, { useContext } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { PublicContext } from '../../context/PublicContextProvider';
import { accountService } from '../../services/account.service';

interface FileDeleteFormPropsInterface {
    deleteFileName: string,
    setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>
}

type LoginFormInput = {
    password: string
}

export default function FileDeleteForm({ deleteFileName, setShowDeleteModal }: FileDeleteFormPropsInterface) {
    const { setReload } = useContext(PublicContext);

    const { register, handleSubmit, reset } = useForm<LoginFormInput>({
        defaultValues: {
            password: ''
        }
    });
    const onSubmit: SubmitHandler<LoginFormInput> = (data) => {
        if(window.confirm("Confirm File suppression ? (this is permanent)") === false){
            return null
        }

        accountService.login(data.password, deleteFileName)
            .then(token => {
                if(token === null || token === undefined){
                    alert('Wrong Master Key');
                }else{
                    window.electronAPI.deleteFile(deleteFileName);
                    setReload(true);
                    handleModalClose();
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    function handleModalClose(){
        reset();
        setShowDeleteModal(false);
    }

    return (
        <div className='flex flex-col gap-2'>
            <p>Are you sure you want to delete file : {deleteFileName} ?</p>
            <div className='flex flex-col gap-2'>
                <form onSubmit={handleSubmit(onSubmit)} className='bg-slate-400 rounded-md p-5 gap-5 border border-solid border-black flex flex-col items-center'>
                    <h2 className='text-2xl'>Enter Master Key</h2>
                    <div className='flex flex-row items-center gap-2'>
                        <input {...register("password", {required: "Enter Master Password."})} className="pl-1" type="password" autoComplete='off'/>
                    </div>
                    <div className='flex flex-row gap-2'>
                        <button type='submit' className='bg-red-500 text-white p-2 rounded-md'>Delete</button>
                        <button onClick={() => handleModalClose()} type="reset" className='bg-green-500 text-white p-2 rounded-md'>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
  )
}