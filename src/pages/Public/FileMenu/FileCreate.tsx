import React, { useContext, useState } from "react";
import { MdAdd, MdCancel, MdDone } from "react-icons/md";
import Modal from "../../../global/Modal";
import { DEFAULT_FILE_DATA, NewFileInterface } from "../../../types/mainProcessTypes";
import { PublicContext } from "../../../context/PublicContextProvider";

export default function FileCreate () {
    const [showAddFile, setShowAddFile] = useState(false);
    const { setReload } = useContext(PublicContext);

    const DEFAULT_PWD_GEN_PARAMS = DEFAULT_FILE_DATA.params;

    function handleFileCreate(e: React.FormEvent<HTMLFormElement>): void{
        e.preventDefault();

        if(window.confirm("Confirm add new password ?") === false){
            return null
        }

        const form = e.currentTarget;
        const formElements = form.elements as typeof form.elements & {
            name: {value: string};
            masterKey : {value: string};
            params_length: {value: number};
            params_setNumber: {checked: boolean};
            params_setUppercase: {checked: boolean};
            params_setLowercase: {checked: boolean};
            params_setMinus: {checked: boolean};
            params_setUnderline: {checked: boolean};
            params_setSpecial: {checked: boolean};
            params_setBrackets: {checked: boolean};
        }

        const newFileData: NewFileInterface = {
            name: formElements.name.value,
            masterKey: formElements.masterKey.value,
            params: {
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
        };

        window.electronAPI.createNewFile(newFileData);
        setShowAddFile(false);
        setReload(true);
    }

    return (
      <>
        <button title="Add New Password" onClick={() => setShowAddFile(true)}>
            <MdAdd size='32' className="hover:bg-green-500 rounded transition-all"/>
        </button>
        <Modal open={showAddFile}>
            <form onSubmit={(e) => handleFileCreate(e)}>
                {/* File Name */}
                <input placeholder='Name' type="text" name="name" id="name" required />
                {/* Master Key */}
                <input placeholder="masterKey" type="text" name="masterKey" id="masterKey" />
                {/* Password Generation */}
                <div className='flex'>
                    <input type="number" name="params_length" min="5" max="40" required defaultValue={DEFAULT_PWD_GEN_PARAMS.length}/>
                    <label htmlFor="params_length">Password Length</label>
                </div>
                <div className='flex'>
                    <input type="checkbox" name="params_setNumber" defaultChecked={DEFAULT_PWD_GEN_PARAMS.selectedSet.setNumber}/>
                    <label htmlFor="params_setNumber">Numbers (0-9)</label>
                </div>
                <div className='flex'>
                    <input type="checkbox" name="params_setUppercase" defaultChecked={DEFAULT_PWD_GEN_PARAMS.selectedSet.setUppercase}/>
                    <label htmlFor="params_setUppercase">Uppercase (A-Z)</label>
                </div>
                <div className='flex'>
                    <input type="checkbox" name="params_setLowercase" defaultChecked={DEFAULT_PWD_GEN_PARAMS.selectedSet.setLowercase}/>
                    <label htmlFor="params_setLowercase">Lowercase (a-z)</label>
                </div>
                <div className='flex'>
                    <input type="checkbox" name="params_setMinus" defaultChecked={DEFAULT_PWD_GEN_PARAMS.selectedSet.setMinus}/>
                    <label htmlFor="params_setMinus">Minus (-)</label>
                </div>
                <div className='flex'>
                    <input type="checkbox" name="params_setUnderline" defaultChecked={DEFAULT_PWD_GEN_PARAMS.selectedSet.setUnderline}/>
                    <label htmlFor="params_setUnderline">Underline (-)</label>
                </div>
                <div className='flex'>
                    <input type="checkbox" name="params_setSpecial" defaultChecked={DEFAULT_PWD_GEN_PARAMS.selectedSet.setSpecial}/>
                    <label htmlFor="params_setSpecial">Special (#,$,@,$...)</label>
                </div>
                <div className='flex'>
                    <input type="checkbox" name="params_setBrackets" defaultChecked={DEFAULT_PWD_GEN_PARAMS.selectedSet.setBrackets}/>
                    <label htmlFor="params_setBrackets">Brackets (&#91;,&#93;,&#123;,&#125;,...)</label>
                </div>
                <button type="submit" className='ml-1 p-2' title="Confirm">
                    <MdDone size='32' className="hover:bg-green-500 rounded transition-all"/>
                </button>
                <button className='p-2' type='reset' onClick={() => setShowAddFile(false)} title="Cancel">
                    <MdCancel size='32' className="hover:bg-red-500 rounded transition-all"/>
                </button>
            </form>
        </Modal>
      </>
    )
  }
  