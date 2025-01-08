import React, { useContext, useState } from 'react'
import Modal from '../../../global/Modal';
import { MdCancel, MdSettings, MdSave } from 'react-icons/md';
import { AccountContext } from '../../../context/AccountContextProvider';
import { accountService } from '../../../services/account.service';

export default function SettingsControl() {
    const { fileParams, setFileParams } = useContext(AccountContext);
    const [ showParamsModal, setShowParamsModal ] = useState(false);

    function handleParamsChange(e: React.FormEvent<HTMLFormElement>): void {
        e.preventDefault();

        if(window.confirm("Save settings ?") === false){
            return null;
        }

        const form = e.currentTarget;
        const formElements = form.elements as typeof form.elements & {
            params_length: {value: number};
            params_setNumber: {checked: boolean};
            params_setUppercase: {checked: boolean};
            params_setLowercase: {checked: boolean};
            params_setMinus: {checked: boolean};
            params_setUnderline: {checked: boolean};
            params_setSpecial: {checked: boolean};
            params_setBrackets: {checked: boolean};
        }

        const newParams = {
            length: formElements.params_length.value,
            selectedSet: {
                setNumber: formElements.params_setNumber.checked,
                setUppercase: formElements.params_setUppercase.checked,
                setLowercase: formElements.params_setLowercase.checked,
                setMinus: formElements.params_setMinus.checked,
                setUnderline: formElements.params_setUnderline.checked,
                setSpecial: formElements.params_setSpecial.checked,
                setBrackets: formElements.params_setBrackets.checked,
            }
        }

        if(Object.values(newParams.selectedSet).every((bool) => bool === false)){
            alert('None Options have been selected, please select at least one.');
        }
        
        setFileParams(newParams);
        window.electronAPI.setFileParams(newParams, accountService.getToken());
        setShowParamsModal(false);
    }

    return (
        <>
            <button title="Settings" onClick={() => setShowParamsModal(true)}>
                <MdSettings size='32' />
            </button>
            <Modal open={showParamsModal}>
                <form className="flex flex-col" onSubmit={(e) => handleParamsChange(e)}>
                    <div className='flex'>
                        <input type="number" name="params_length" min="5" max="40" required defaultValue={fileParams.length}/>
                        <label htmlFor="params_length">Password Length</label>
                    </div>
                    <div className='flex'>
                        <input type="checkbox" name="params_setNumber" defaultChecked={fileParams.selectedSet.setNumber}/>
                        <label htmlFor="params_setNumber">Numbers (0-9)</label>
                    </div>
                    <div className='flex'>
                        <input type="checkbox" name="params_setUppercase" defaultChecked={fileParams.selectedSet.setUppercase}/>
                        <label htmlFor="params_setUppercase">Uppercase (A-Z)</label>
                    </div>
                    <div className='flex'>
                        <input type="checkbox" name="params_setLowercase" defaultChecked={fileParams.selectedSet.setLowercase}/>
                        <label htmlFor="params_setLowercase">Lowercase (a-z)</label>
                    </div>
                    <div className='flex'>
                        <input type="checkbox" name="params_setMinus" defaultChecked={fileParams.selectedSet.setMinus}/>
                        <label htmlFor="params_setMinus">Minus (-)</label>
                    </div>
                    <div className='flex'>
                        <input type="checkbox" name="params_setUnderline" defaultChecked={fileParams.selectedSet.setUnderline}/>
                        <label htmlFor="params_setUnderline">Underline (-)</label>
                    </div>
                    <div className='flex'>
                        <input type="checkbox" name="params_setSpecial" defaultChecked={fileParams.selectedSet.setSpecial}/>
                        <label htmlFor="params_setSpecial">Special (#,$,@,$...)</label>
                    </div>
                    <div className='flex'>
                        <input type="checkbox" name="params_setBrackets" defaultChecked={fileParams.selectedSet.setBrackets}/>
                        <label htmlFor="params_setBrackets">Brackets (&#91;,&#93;,&#123;,&#125;,...)</label>
                    </div>
                    <button type="submit" className='ml-1 p-2' title="Confirm"><MdSave size='24'/></button>
                    <button className='p-2' type='reset' onClick={() => setShowParamsModal(false)} title="Cancel"><MdCancel size='24'/></button>
                </form>
            </Modal>
        </>
    )
}