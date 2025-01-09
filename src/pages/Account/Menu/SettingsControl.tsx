import React, { useContext, useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
import { MdCancel, MdSettings, MdSave } from 'react-icons/md';
import { AccountContext } from '../../../context/AccountContextProvider';
import { accountService } from '../../../services/account.service';
import { ParamsInterface } from '../../../types/mainProcessTypes';
import Modal from '../../../global/Modal';

type ParamsFormInput = {
    params_length: number,
    params_setNumber: boolean,
    params_setUppercase: boolean,
    params_setLowercase: boolean,
    params_setMinus: boolean,
    params_setUnderline: boolean,
    params_setSpecial: boolean,
    params_setBrackets: boolean
}

export default function SettingsControl() {
    const { fileParams, setFileParams } = useContext(AccountContext);
    const [ showParamsModal, setShowParamsModal ] = useState(false);

    const { register, handleSubmit, reset } = useForm<ParamsFormInput>();

    const onSubmit: SubmitHandler<ParamsFormInput> = (data) => {
        if(window.confirm("Save settings ?") === false){
            return null;
        }

        const newParams: ParamsInterface = {
            length: data.params_length,
            selectedSet: {
                setNumber: data.params_setNumber,
                setUppercase: data.params_setUppercase,
                setLowercase: data.params_setLowercase,
                setMinus: data.params_setMinus,
                setUnderline: data.params_setUnderline,
                setSpecial: data.params_setSpecial,
                setBrackets: data.params_setBrackets
            }
        }

        if(Object.values(newParams.selectedSet).every((bool) => bool === false)){
            alert('None Options have been selected, please select at least one.');
        }
        
        setFileParams(newParams);
        window.electronAPI.setFileParams(newParams, accountService.getToken());
        reset();
        setShowParamsModal(false);
    }

    return (
        <>
            <button title="Settings" onClick={() => setShowParamsModal(true)}>
                <MdSettings size='32' className="hover:bg-gray-500 rounded transition-all"/>
            </button>
            {(showParamsModal)
                ?   <Modal open={showParamsModal}>
                        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                            <div className='flex'>
                                <input {...register("params_length", {required: "This Field is required.", min: 5, max: 40})} type="number" defaultValue={fileParams.length}/>
                                <label htmlFor="params_length">Password Length</label>
                            </div>
                            <div className='flex'>
                                <input {...register("params_setNumber")} type="checkbox" defaultChecked={fileParams.selectedSet.setNumber}/>
                                <label htmlFor="params_setNumber">Numbers (0-9)</label>
                            </div>
                            <div className='flex'>
                                <input {...register("params_setUppercase")} type="checkbox" defaultChecked={fileParams.selectedSet.setUppercase}/>
                                <label htmlFor="params_setUppercase">Uppercase (A-Z)</label>
                            </div>
                            <div className='flex'>
                                <input {...register("params_setLowercase")}type="checkbox" defaultChecked={fileParams.selectedSet.setLowercase}/>
                                <label htmlFor="params_setLowercase">Lowercase (a-z)</label>
                            </div>
                            <div className='flex'>
                                <input {...register("params_setMinus")} type="checkbox" defaultChecked={fileParams.selectedSet.setMinus}/>
                                <label htmlFor="params_setMinus">Minus (-)</label>
                            </div>
                            <div className='flex'>
                                <input {...register("params_setUnderline")} type="checkbox" defaultChecked={fileParams.selectedSet.setUnderline}/>
                                <label htmlFor="params_setUnderline">Underline (-)</label>
                            </div>
                            <div className='flex'>
                                <input {...register("params_setSpecial")} type="checkbox" defaultChecked={fileParams.selectedSet.setSpecial}/>
                                <label htmlFor="params_setSpecial">Special (#,$,@,$...)</label>
                            </div>
                            <div className='flex'>
                                <input {...register("params_setBrackets")} type="checkbox" defaultChecked={fileParams.selectedSet.setBrackets}/>
                                <label htmlFor="params_setBrackets">Brackets (&#91;,&#93;,&#123;,&#125;,...)</label>
                            </div>
                            <button type="submit" className='ml-1 p-2' title="Confirm">
                                <MdSave size='32' className="hover:bg-green-500 rounded transition-all" />
                            </button>
                            <button className='p-2' type='reset' onClick={() => setShowParamsModal(false)} title="Cancel">
                                <MdCancel size='32' className="hover:bg-red-500 rounded transition-all"/>
                            </button>
                        </form>
                    </Modal>
                :   <></>
            }
        </>
    )
}