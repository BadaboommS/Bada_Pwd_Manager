import React, { useContext, useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import { MdDone, MdCancel, MdAdd } from 'react-icons/md';
import { AccountContext } from '../../../context/AccountContextProvider';
import Modal from '../../../global/Modal';

type PwdFormInput = {
    name: string,
    website: string,
    username: string,
    password: string,
    comment: string
}

export default function AddPwdControl() {
    const { passwordList, setPasswordList } = useContext(AccountContext);
    const [ showAddPwdForm, setShowAddPwdForm ] = useState(false);

    const { register, handleSubmit } = useForm<PwdFormInput>({
        defaultValues: {
            name: '',
            website: '',
            username: '',
            password: '',
            comment: ''
        }
    });

    const onSubmit: SubmitHandler<PwdFormInput> = (data) => {
        if(window.confirm("Confirm add new password ?") === false){
            return null
        }

        const newPwd = {
            id: passwordList[0]? passwordList[passwordList.length - 1].id + 1 : 0,
            name: data.name,
            website: data.website,
            username: data.username,
            password: data.password,
            comment: data.comment
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
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='grid grid-cols-2'>
                        <input {...register("name", {required: "This Field is required."})} placeholder='Name'/>
                        <input {...register("website", {required: "This Field is required."})} placeholder='Website' />
                        <input {...register("username", {required: "This Field is required."})} placeholder='Username' />
                        <input {...register("password", {required: "This Field is required."})} placeholder='Password' />
                        <input {...register("comment")} placeholder='Comment' />
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