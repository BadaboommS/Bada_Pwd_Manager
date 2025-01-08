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

    function handleLogout(): void{
        if(changedSinceLastUpdate){
            if(window.confirm("Change have been made since last save, logout anyway ?") === false){
                return null
            }
        }else{
            if(window.confirm("Logout ?") === false){
                return null
            }
        }
        
        setSelectedFile('');
        accountService.logout();
        navigate('/');
    }

    return (
        <button title="Exit File" onClick={() => handleLogout()}>
            <MdExitToApp size='32' className="bg-red-500 rounded"/>
        </button>
    )
}