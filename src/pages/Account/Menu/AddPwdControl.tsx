import React, { useContext, useState } from 'react'
import Modal from '../../../global/Modal'
import { MdDone, MdCancel, MdAdd } from 'react-icons/md';
import { AccountContext } from '../../../context/AccountContextProvider';

export default function AddPwdControl() {
    const { passwordList, setPasswordList } = useContext(AccountContext);
    const [ showAddPwdForm, setShowAddPwdForm ] = useState(false);

    function handleAddPasswordEntry(e: React.FormEvent<HTMLFormElement>): void{
        e.preventDefault();

        if(window.confirm("Confirm add new password ?") === false){
            return null
        }

        const form = e.currentTarget;
        const formElements = form.elements as typeof form.elements & {
            name: {value: string};
            website: {value: string};
            username: {value: string};
            password: {value: string};
            comment: {value: string};
        }

        const newPwd = {
            id: passwordList[0]? passwordList[passwordList.length - 1].id + 1 : 0,
            name: formElements.name.value,
            website: formElements.website.value,
            username: formElements.username.value,
            password: formElements.password.value,
            comment: formElements.comment.value
        };

        const newPwdArray = [...passwordList, newPwd];
        setPasswordList(newPwdArray);
        setShowAddPwdForm(false);
    }

    return (
        <>
            <button title="Add New Password" onClick={() => setShowAddPwdForm(true)}>
                <MdAdd size='32'/>
            </button>
            <Modal open={showAddPwdForm}>
                <form onSubmit={(e) => handleAddPasswordEntry(e)}>
                    <div className='grid grid-cols-2'>
                        <input placeholder='Name' type="text" name="name" id="name" required></input>
                        <input placeholder='Website' type="text" name="website" id="website" required />
                        <input placeholder='Username' type="text" name="username" id="username" required />
                        <input placeholder='Password' type="text" name="password" id="password" required />
                        <input placeholder='Comment' type="text" name="comment" id="comment" />
                    </div>
                    <div className='flex justify-between'>
                        <button type="submit" title="Confirm"><MdDone size='32' className='p-2'/></button>
                        <button type='reset' onClick={() => setShowAddPwdForm(false)} title="Cancel"><MdCancel size='32' className='p-2'/></button>
                    </div>
                </form>
            </Modal>
        </>
    )
}