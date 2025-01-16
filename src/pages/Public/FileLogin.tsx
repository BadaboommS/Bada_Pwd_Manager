import React, { useContext, useEffect, useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from 'react-router';
import { GeneralContext } from '../../context/GeneralContextProvider';
import { accountService } from '../../services/account.service';
import Modal from '../../global/Modal';

type LoginFormInput = {
    password: string
}

export default function FileLogin() {
    const { selectedFile, setSelectedFile } = useContext(GeneralContext);
    const [showLogin, setShowLogin] = useState(false);
    const [loadingModal, setLoadingModal] = useState(false);
    const [fetchError, setFetchError] = useState(false);
    const navigate = useNavigate();

    const { register, handleSubmit, reset } = useForm<LoginFormInput>({
        defaultValues: {
            password: ''
        }
    });
    const onSubmit: SubmitHandler<LoginFormInput> = (data) => {
        setFetchError(false);
        setLoadingModal(true);

        accountService.login(data.password, selectedFile)
            .then(token => {
                if(token === null || token === undefined){
                    setFetchError(true);
                    setLoadingModal(false);
                }else{
                    accountService.saveToken(token);
                    reset();
                    setShowLogin(false);
                    navigate("/account", {replace: true});
                }
            })
            .catch(err => {
                setLoadingModal(false);
                setFetchError(true);
                console.log(err);
            })
    }

    function handleFileLoginCancel(): void{
        setShowLogin(false);
        setSelectedFile('');
    }

    useEffect(() => {
        if(!showLogin && selectedFile !== ""){
            setShowLogin(true);
        }
    }, [selectedFile]);

    return (
        <Modal isOpen={showLogin} onClose={() => setShowLogin(false)}>
            <div className='w-full h-full flex items-center justify-center'>
                <form onSubmit={handleSubmit(onSubmit)} className='bg-slate-400 rounded-md p-5 gap-5 border border-solid border-black flex flex-col items-center' >
                    <h2 className='text-2xl text-center'>Login<br/>File: {selectedFile}</h2>
                    <div className='flex flex-row items-center gap-2'>
                        <input {...register("password", {required: "Enter Master Password."})} className="pl-1" type="password" autoComplete='off'/>
                    </div>
                    <div className='flex gap-2'>
                        <button type="submit" className='text-white bg-slate-600 p-2 rounded-sm hover:cursor-pointer'>Connexion</button>
                        <button type="reset" className='text-white bg-slate-600 p-2 rounded-sm hover:cursor-pointer' onClick={() => handleFileLoginCancel()}>Cancel</button>
                    </div>
                </form>
            </div>
            {loadingModal && <p>Loading...</p>}
            {fetchError && <p>Error logging in. Please try again.</p>}
        </Modal>
  )
}