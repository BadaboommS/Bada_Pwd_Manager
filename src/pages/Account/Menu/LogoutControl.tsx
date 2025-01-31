import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { MdExitToApp } from "react-icons/md";
import { accountService } from "../../../services/account.service";
import { GeneralContext } from "../../../context/GeneralContextProvider";
import { AccountContext } from "../../../context/AccountContextProvider";

export default function LogoutControl() {
    const { changedSinceLastUpdate } = useContext(AccountContext);
    const { setSelectedFile } = useContext(GeneralContext);
    const navigate = useNavigate();

    async function handleLogout(): Promise<void>{
        if(changedSinceLastUpdate){
            const confirm = await window.electronAPI.openDialog("Logout", "Change have been made since last save, logout anyway ?", "Confirm", "Cancel");
            if(!confirm){
                return null;
            }
        }else{
            const confirm = await window.electronAPI.openDialog("Logout", "Logout ?", "Confirm", "Cancel");
            if(!confirm){
                return null;
            }
        }
        
        setSelectedFile('');
        accountService.logout();
        navigate('/');
    }

    return (
        <button title="Exit File" onClick={() => handleLogout()}>
            <MdExitToApp size='42' className="text-red-500 hover:bg-red-500 hover:text-black rounded"/>
        </button>
    )
}