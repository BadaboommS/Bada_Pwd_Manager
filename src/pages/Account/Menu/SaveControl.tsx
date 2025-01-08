import React, { useContext } from 'react';
import { MdSave } from 'react-icons/md';
import { AccountContext } from '../../../context/AccountContextProvider';
import { accountService } from '../../../services/account.service';

export default function SaveControl() {
    const { passwordList, changedSinceLastUpdate, setLastFetchedList } = useContext(AccountContext);
        
    function handlePasswordListChange(): void{
        if(window.confirm("Confirm save ?") === false){
            return null
        }

        window.electronAPI.setFilePwdData(passwordList, accountService.getToken());
        setLastFetchedList(passwordList);
    }

    return (
        <button title={changedSinceLastUpdate? "Save Password List (change detected)" : "Save Password List"} onClick={() => handlePasswordListChange()}>
            <MdSave size='32' className={changedSinceLastUpdate? "text-yellow-500" : "text-green-500"} />
        </button>
    )
}