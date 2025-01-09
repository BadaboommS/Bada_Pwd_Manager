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
                    setShowLogin(false);
                    reset();
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
        <Modal open={showLogin} key={`${showLogin}-${selectedFile}`}>
            <div className='w-full h-full flex items-center justify-center'>
                <form onSubmit={handleSubmit(onSubmit)} className='bg-slate-400 rounded-md p-5 gap-5 border border-solid border-black flex flex-col items-center' >
                    <h2 className='text-2xl'>Login</h2>
                    <div className='flex flex-row items-center gap-2'>
                        <input {...register("password", {required: "Enter Master Password."})} className="pl-1" type="password" autoComplete='off'/>
                    </div>
                    <div className='flex gap-2'>
                        <button type="submit" className='text-white bg-slate-600 p-2 rounded-sm hover:cursor-pointer'>Connexion</button>
                        <button type="reset" className='text-white bg-slate-600 p-2 rounded-sm hover:cursor-pointer' onClick={() => handleFileLoginCancel()}>Cancel</button>
                    </div>
                </form>
            </div>
            {fetchError? 
                <div className='fixed bottom-2 w-full flex flex-col justify-center items-center bg-red-500 rounded text-white'>
                    <p>Erreur lors de la connexion</p>
                    <p>- Veuillez réessayer -</p>
                </div>
            :
                <></>
            }
            {loadingModal
                ? <div className="lds-dual-ring"></div>
                : <></>
            }
        </Modal>
  )
}