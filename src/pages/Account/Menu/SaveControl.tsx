import React, { useContext } from 'react';
import { MdSave } from 'react-icons/md';
import { AccountContext } from '../../../context/AccountContextProvider';
import { accountService } from '../../../services/account.service';

export default function SaveControl() {
    const { passwordList, changedSinceLastUpdate, setLastFetchedList } = useContext(AccountContext);
        
    function handlePasswordListChange(): void{
        if(changedSinceLastUpdate){
            if(window.confirm("Save changes ?") === false){
                return null
            }
        }else{
            if(window.confirm("No change since last update, save anyway ?") === false){
                return null
            }
        }
        

        window.electronAPI.setFilePwdData(passwordList, accountService.getToken());
        setLastFetchedList(passwordList);
    }

    return (
        <button title={changedSinceLastUpdate? "Save Password List (change detected)" : "Save Password List"} onClick={() => handlePasswordListChange()}>
            <MdSave size='42' className={`${changedSinceLastUpdate? "text-yellow-500 hover:bg-green-500 hover:text-black " : "text-green-500 hover:bg-green-500 hover:text-black"} rounded transition-all`} />
        </button>
    )
}