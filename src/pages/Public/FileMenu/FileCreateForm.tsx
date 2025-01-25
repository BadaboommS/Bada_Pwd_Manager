import React, { useContext } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { MdCancel, MdDone } from "react-icons/md";
import { DEFAULT_FILE_DATA, NewFileInterface, StorageDataInfoInterface } from "../../../types/mainProcessTypes";
import { PublicContext } from "../../../context/PublicContextProvider";

interface FileCreateFormPropsInterface {
    setShowAddFile: React.Dispatch<React.SetStateAction<boolean>>
}

type FileFormInput = {
    name: string;
    masterKey : string;
    params_length: number;
    params_setNumber: boolean;
    params_setUppercase: boolean;
    params_setLowercase: boolean;
    params_setMinus: boolean;
    params_setUnderline: boolean;
    params_setSpecial: boolean;
    params_setBrackets: boolean;
}

const DEFAULT_PWD_GEN_PARAMS = DEFAULT_FILE_DATA.params;

export default function FileCreateForm ({ setShowAddFile }: FileCreateFormPropsInterface) {
    const { filesList, setReload } = useContext(PublicContext);

    const { register, handleSubmit, reset } = useForm<FileFormInput>();
    const onSubmit: SubmitHandler<FileFormInput> = (data) => {
        if(window.confirm("Confirm add new file ?") === false){
            return null
        }

        if(filesList.map((file: StorageDataInfoInterface) => file.fileName).includes(data.name)){
            alert('File already exists !');
            return null
        }

        const newFileData: NewFileInterface = {
            name: data.name,
            masterKey: data.masterKey,
            params: {
                length: data.params_length,
                selectedSet: {
                    setNumber: data.params_setNumber,
                    setUppercase: data.params_setUppercase,
                    setLowercase: data.params_setLowercase,
                    setMinus: data.params_setMinus,
                    setUnderline: data.params_setUnderline,
                    setSpecial: data.params_setSpecial,
                    setBrackets: data.params_setBrackets,
                }
            }
        };

        window.electronAPI.createNewFile(newFileData);

        setReload(true);
        handleModalClose();
    };

    function handleModalClose(){
        reset();
        setShowAddFile(false);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 justify-center items-center p-2 text-center text-lg">
            <h1 className="text-2xl">Create New File:</h1>
            <div className="w-3/4 h-px border-black border"></div>
            {/* File Name */}
            <input {...register("name", {required: "Enter File Name."})} placeholder='Name'  className="indent-2" />
            {/* Master Key */}
            <input {...register("masterKey", {required: "Enter Master Password."})} placeholder="MasterKey" className="indent-2"/>
            {/* Password Generation */}
            <h3 className="text-lg">Password Generation Params: </h3>
            <div className="w-3/4 h-px border-black border"></div>
            <div className="w-full flex flex-col items-center gap-2 p-2 border-2 border-gray-500 rounded">
                <div className='flex flex-row justify-center gap-2'>
                    <label htmlFor="params_length">Length</label>
                    <input {...register("params_length", {required: "This Field is required.", min: 5, max: 40})} className="text-center w-1/2" type="number" defaultValue={DEFAULT_PWD_GEN_PARAMS.length}/>
                </div>
                <div className="flex flex-col gap-2 w-3/4">
                    <div className='flex justify-between'>
                        <input {...register("params_setNumber")} type="checkbox" defaultChecked={DEFAULT_PWD_GEN_PARAMS.selectedSet.setNumber}/>
                        <label htmlFor="params_setNumber">Numbers (0-9)</label>
                    </div>
                    <div className='flex justify-between'>
                        <input {...register("params_setUppercase")} type="checkbox" defaultChecked={DEFAULT_PWD_GEN_PARAMS.selectedSet.setUppercase}/>
                        <label htmlFor="params_setUppercase">Uppercase (A-Z)</label>
                    </div>
                    <div className='flex justify-between'>
                        <input {...register("params_setLowercase")} type="checkbox" defaultChecked={DEFAULT_PWD_GEN_PARAMS.selectedSet.setLowercase}/>
                        <label htmlFor="params_setLowercase">Lowercase (a-z)</label>
                    </div>
                    <div className='flex justify-between'>
                        <input {...register("params_setMinus")} type="checkbox" defaultChecked={DEFAULT_PWD_GEN_PARAMS.selectedSet.setMinus}/>
                        <label htmlFor="params_setMinus">Minus (-)</label>
                    </div>
                    <div className='flex justify-between'>
                        <input {...register("params_setUnderline")} type="checkbox" defaultChecked={DEFAULT_PWD_GEN_PARAMS.selectedSet.setUnderline}/>
                        <label htmlFor="params_setUnderline">Underline (-)</label>
                    </div>
                    <div className='flex justify-between'>
                        <input {...register("params_setSpecial")} type="checkbox" defaultChecked={DEFAULT_PWD_GEN_PARAMS.selectedSet.setSpecial}/>
                        <label htmlFor="params_setSpecial">Special (#,$,@,$...)</label>
                    </div>
                    <div className='flex justify-between'>
                        <input {...register("params_setBrackets")} type="checkbox" defaultChecked={DEFAULT_PWD_GEN_PARAMS.selectedSet.setBrackets}/>
                        <label htmlFor="params_setBrackets">Brackets (&#91;,&#93;,&#123;,&#125;,...)</label>
                    </div>
                </div>
            </div>
            <div className="flex justify-around p-2 w-full">
                <button type="submit" className='p-2' title="Confirm">
                    <MdDone size='32' className="text-green-500 hover:bg-green-500 hover:text-black rounded transition-all"/>
                </button>
                <button className='p-2' type='reset' onClick={() => setShowAddFile(false)} title="Cancel">
                    <MdCancel size='32' className="text-red-500 hover:bg-red-500 hover:text-black rounded transition-all"/>
                </button>
            </div>
        </form>
    )
}
  