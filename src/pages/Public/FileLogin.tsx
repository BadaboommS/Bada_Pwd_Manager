import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { GeneralContext } from '../../context/GeneralContextProvider';
import { accountService } from '../../services/account.service';
import Modal from '../../global/Modal';

export default function FileLogin() {
    const { selectedFile, setSelectedFile } = useContext(GeneralContext);
    const [showLogin, setShowLogin] = useState(false);
    const [inputPassword, setInputPassword] = useState('');
    const [loadingModal, setLoadingModal] = useState(false);
    const [fetchError, setFetchError] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if(!showLogin && selectedFile !== ""){
            setShowLogin(true);
        }
    }, [selectedFile]);

    function handlePasswordSubmit(e: React.FormEvent<HTMLFormElement>): void{
        e.preventDefault();
        setFetchError(false);
        setLoadingModal(true);

        accountService.login(inputPassword, selectedFile)
            .then(token => {
                if(token === null || token === undefined){
                    setFetchError(true);
                    setLoadingModal(false);
                }else{
                    accountService.saveToken(token);
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
        setInputPassword('');
    }

    return (
        <Modal open={showLogin} key={`${showLogin}-${selectedFile}`}>
            <div className='w-full h-full flex items-center justify-center'>
                <form className='bg-slate-400 rounded-md p-5 gap-5 border border-solid border-black flex flex-col items-center' onSubmit={(e) => handlePasswordSubmit(e)}>
                    <h2 className='text-2xl'>Login</h2>
                    <div className='flex flex-row items-center gap-2'>
                        <input className="pl-1" type="password" name="password" onChange={(e) => setInputPassword(e.currentTarget.value)} value={inputPassword} autoComplete='off'/>
                    </div>
                    <div className='flex gap-2'>
                        <button type="submit" className='text-white bg-slate-600 p-2 rounded-sm hover:cursor-pointer'>Connexion</button>
                        <button className='text-white bg-slate-600 p-2 rounded-sm hover:cursor-pointer' onClick={() => handleFileLoginCancel()}>Cancel</button>
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