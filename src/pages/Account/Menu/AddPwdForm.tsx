import React, { useContext, useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import { MdDone, MdCancel, MdAutorenew } from 'react-icons/md';
import { TbEyeOff, TbEye } from "react-icons/tb";
import { AccountContext } from '../../../context/AccountContextProvider';
import { generatePassword } from '../../../utils/generatePassword';

interface AddPwdFormProps {
    setShowAddPwdForm: React.Dispatch<React.SetStateAction<boolean>>
}

type PwdFormInput = {
    name: string,
    website: string,
    username: string,
    password: string,
    comment: string
}

export default function AddPwdForm({ setShowAddPwdForm } : AddPwdFormProps) {
    const { passwordList, setPasswordList, fileParams } = useContext(AccountContext);
    const [showPrivatePassword, setShowPrivatePassword] = useState(false);

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
        handleModalClose();
    }
    
    function handleModalClose(){
        reset();
        setShowAddPwdForm(false);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center gap-2 p-2 text-lg'>
            <h1 className='text-2xl text-center'>Add New Password</h1>
            <div className="w-3/4 h-px border-black border"></div>
            <div className='flex flex-col gap-2 p-2 border-2 border-gray-500 rounded'>
                <div className='flex flex-row gap-1'>
                    <label htmlFor="name">Name:</label>
                    <input {...register("name", {required: "This Field is required."})} placeholder='Name' className='indent-2' />
                </div>
                <div className='flex flex-row gap-1'>
                    <label htmlFor="website">Website:</label>
                    <input {...register("website", {required: "This Field is required."})} placeholder='Website' className='indent-2' />
                </div>
                <div className='flex flex-row gap-1'>
                    <label htmlFor="username">Username:</label>
                    <input {...register("username", {required: "This Field is required."})} placeholder='Username' className='indent-2' />
                </div>
                <div className='flex flex-row gap-1'>
                    <label htmlFor="password">Password:</label>
                    <input {...register("password", {required: "This Field is required."})} className={`${showPrivatePassword? '' : 'password_field'} indent-2`} placeholder='Password'/>
                </div>
                <div className='flex flex-row gap-1'>
                    <label htmlFor="comment">Notes:</label>
                    <input {...register("comment")} placeholder='Comment' className='indent-2'/>
                </div>
                <div className='flex justify-around'>
                    <span className='p-2 cursor-pointer' onClick={() => setShowPrivatePassword(!showPrivatePassword)}>
                        {showPrivatePassword? <TbEye size='24' title="Hide"/> : <TbEyeOff size='24' title="Show"/>}
                    </span>
                    <span className='p-2 cursor-pointer' onClick={() => setValue('password', generatePassword(fileParams))}>
                        <MdAutorenew size='24' title='Generate New Password' />
                    </span>
                </div>
            </div>
            <div className='flex justify-around w-full p-2'>
                <button type="submit" title="Confirm">
                    <MdDone size='32' className="text-green-500 hover:bg-green-500 hover:text-black rounded transition-all" />
                </button>
                <button type='reset' onClick={() => handleModalClose()} title="Cancel">
                    <MdCancel size='32' className="text-red-500 hover:bg-red-500 hover:text-black rounded transition-all" />
                </button>
            </div>
        </form>
    )
}