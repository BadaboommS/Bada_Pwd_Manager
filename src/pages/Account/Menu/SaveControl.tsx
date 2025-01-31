import React, { useContext } from 'react';
import { MdSave } from 'react-icons/md';
import { AccountContext } from '../../../context/AccountContextProvider';
import { accountService } from '../../../services/account.service';

export default function SaveControl() {
    const { passwordList, changedSinceLastUpdate, setLastFetchedList } = useContext(AccountContext);
        
    async function handlePasswordListChange(): Promise<void>{
        if(changedSinceLastUpdate){
            const confirm = await window.electronAPI.openDialog("Password List Save", "Save changes ?", "Save", "Cancel");
            if(!confirm){
                return null;
            }
        }else{
            const confirm = await window.electronAPI.openDialog("Password List Save", "No change since last update, save anyway ?", "Save", "Cancel");
            if(!confirm){
                return null;
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