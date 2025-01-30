import React, { useContext } from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
import { MdCancel, MdSave } from 'react-icons/md';
import { AccountContext } from '../../../context/AccountContextProvider';
import { accountService } from '../../../services/account.service';
import { ParamsInterface } from '../../../types/mainProcessTypes';

interface SettingsFormPropsInterface {
    setShowParamsModal: React.Dispatch<React.SetStateAction<boolean>>
}

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

export default function SettingsForm({ setShowParamsModal } : SettingsFormPropsInterface) {
    const { fileParams, setFileParams } = useContext(AccountContext);
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
        
        handleModalClose();
    }

    function handleModalClose(){
        reset();
        setShowParamsModal(false);
    }

    return (
        <form className="flex flex-col gap-2 justify-center items-center p-2 text-center text-lg" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-2xl">Change Password<br />Generation Parameters:</h1>
            <div className="w-full flex flex-col items-center gap-2 p-2 border-2 border-gray-500 rounded">
                <div className='flex flex-col justify-center text-center gap-2'>
                    <label htmlFor="params_length">Password Length</label>
                    <input {...register("params_length", {required: "This Field is required.", min: 5, max: 40})} className="indent-2" type="number" defaultValue={fileParams.length}/>
                </div>
                <div className="flex flex-col gap-2 w-3/4">
                    <div className='flex justify-between'>
                        <input {...register("params_setNumber")} type="checkbox" defaultChecked={fileParams.selectedSet.setNumber}/>
                        <label htmlFor="params_setNumber">Numbers (0-9)</label>
                    </div>
                    <div className='flex justify-between'>
                        <input {...register("params_setUppercase")} type="checkbox" defaultChecked={fileParams.selectedSet.setUppercase}/>
                        <label htmlFor="params_setUppercase">Uppercase (A-Z)</label>
                    </div>
                    <div className='flex justify-between'>
                        <input {...register("params_setLowercase")}type="checkbox" defaultChecked={fileParams.selectedSet.setLowercase}/>
                        <label htmlFor="params_setLowercase">Lowercase (a-z)</label>
                    </div>
                    <div className='flex justify-between'>
                        <input {...register("params_setMinus")} type="checkbox" defaultChecked={fileParams.selectedSet.setMinus}/>
                        <label htmlFor="params_setMinus">Minus (-)</label>
                    </div>
                    <div className='flex justify-between'>
                        <input {...register("params_setUnderline")} type="checkbox" defaultChecked={fileParams.selectedSet.setUnderline}/>
                        <label htmlFor="params_setUnderline">Underline (-)</label>
                    </div>
                    <div className='flex justify-between'>
                        <input {...register("params_setSpecial")} type="checkbox" defaultChecked={fileParams.selectedSet.setSpecial}/>
                        <label htmlFor="params_setSpecial">Special (#,$,@,$...)</label>
                    </div>
                    <div className='flex justify-between'>
                        <input {...register("params_setBrackets")} type="checkbox" defaultChecked={fileParams.selectedSet.setBrackets}/>
                        <label htmlFor="params_setBrackets">Brackets (&#91;,&#93;,&#123;,&#125;,...)</label>
                    </div>
                </div>
            </div>
            <div className='flex justify-around p-2 w-full'>
                <button type="submit" className='p-2' title="Confirm">
                    <MdSave size='32' className="text-green-500 hover:bg-green-500 hover:text-black rounded transition-all" />
                </button>
                <button className='p-2' type='reset' onClick={() => handleModalClose()} title="Cancel">
                    <MdCancel size='32' className="text-red-500 hover:bg-red-500 hover:text-black rounded transition-all"/>
                </button>
            </div>
        </form>
    )
}