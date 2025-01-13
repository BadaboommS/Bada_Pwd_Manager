import React, { useContext, useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import { MdDone, MdCancel, MdAdd, MdAutorenew } from 'react-icons/md';
import { TbEyeOff, TbEye } from "react-icons/tb";
import { AccountContext } from '../../../context/AccountContextProvider';
import { generatePassword } from '../../../utils/generatePassword';
import Modal from '../../../global/Modal';

type PwdFormInput = {
    name: string,
    website: string,
    username: string,
    password: string,
    comment: string
}

export default function AddPwdControl() {
    const { passwordList, setPasswordList, fileParams } = useContext(AccountContext);
    const [showPrivatePassword, setShowPrivatePassword] = useState(false);
    const [ showAddPwdForm, setShowAddPwdForm ] = useState(false);

    const { register, handleSubmit, setValue, reset } = useForm<PwdFormInput>({
        defaultValues: {
            name: '',
            website: '',
            username: '',
            password: generatePassword(fileParams),
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
        reset();
        setShowAddPwdForm(false);
    }

    function getNewPassword(): void{
        const newPassword = generatePassword(fileParams);
        setValue('password', newPassword);
    }

    return (
        <>
            <button title="Add New Password" onClick={() => setShowAddPwdForm(true)} >
                <MdAdd size='42' className="text-green-500 hover:bg-green-500 hover:text-black rounded transition-all"/>
            </button>
            {(showAddPwdForm)
                ?   <Modal open={showAddPwdForm}>
                        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center gap-2 p-2 text-lg' key={new Date().getTime()}>
                            <h1 className='text-2xl text-center'>Add New Password</h1>
                            <div className="w-3/4 h-px border-black border"></div>
                            <div className='flex flex-col gap-2 p-2 border-2 border-gray-500 rounded'>
                                <input {...register("name", {required: "This Field is required."})} placeholder='Name' className='indent-2' />
                                <input {...register("website", {required: "This Field is required."})} placeholder='Website' className='indent-2' />
                                <input {...register("username", {required: "This Field is required."})} placeholder='Username' className='indent-2' />
                                <input {...register("password", {required: "This Field is required."})} className={`${showPrivatePassword? '' : 'password_field'} indent-2`} placeholder='Password'/>
                                <input {...register("comment")} placeholder='Comment' className='indent-2'/>
                                <div className='flex justify-around'>
                                    <span className='p-2 cursor-pointer' onClick={() => setShowPrivatePassword(!showPrivatePassword)} title={showPrivatePassword? "Hide" : "Show"}>
                                        {showPrivatePassword? <TbEye size='24'/> : <TbEyeOff size='24'/>}
                                    </span>
                                    <span className='p-2 cursor-pointer' onClick={() => getNewPassword()}>
                                        <MdAutorenew size='24' title='Generate New Password' />
                                    </span>
                                </div>
                            </div>
                            <div className='flex justify-around w-full p-2'>
                                <button type="submit" title="Confirm">
                                    <MdDone size='32' className="text-green-500 hover:bg-green-500 hover:text-black rounded transition-all" />
                                </button>
                                <button type='reset' onClick={() => setShowAddPwdForm(false)} title="Cancel">
                                    <MdCancel size='32' className="text-red-500 hover:bg-red-500 hover:text-black rounded transition-all" />
                                </button>
                            </div>
                        </form>
                    </Modal>
                :   <></>
            }
        </>
    )
}