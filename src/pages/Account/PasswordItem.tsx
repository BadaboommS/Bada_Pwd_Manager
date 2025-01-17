import React, { useContext, useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
import { MdCancel, MdDelete, MdDone, MdEditSquare, MdCopyAll, MdAutorenew  } from "react-icons/md";
import { TbEyeOff, TbEye } from "react-icons/tb";
import { AccountContext } from '../../context/AccountContextProvider';
import Modal from '../../global/Modal';

import { generatePassword } from '../../utils/generatePassword';
import { showPopup } from '../../global/showPopup';
import { PwdItem } from '../../types/pwdTypes';

interface PwdItemPropsInterface{
  item: PwdItem,
  editPasswordEntry: (editedPwd: PwdItem) => void,
  deletePasswordEntry: (id: number) => void
}

type PwdEditFormInput = {
  name: string,
  website: string,
  username: string,
  password: string,
  comment: string
}

export default function PasswordItem({ item = null, editPasswordEntry, deletePasswordEntry }: PwdItemPropsInterface) {
    const [showPrivatePassword, setShowPrivatePassword] = useState(false);
    const [showEditPassword, setShowEditPassword] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const { fileParams } = useContext(AccountContext);

    const { register, handleSubmit, setValue } = useForm<PwdEditFormInput>();
    const onSubmit: SubmitHandler<PwdEditFormInput> = (data) => {
      if(window.confirm("Confirm Edit ?") === false){
        return null
      }

      const editedPwd = {
        id: item.id,
        name: data.name,
        website: data.website,
        username: data.username,
        password: data.password,
        comment: data.comment
      }

      editPasswordEntry(editedPwd);
      setShowEdit(false);
    }

    function copyTextToClipboard (e: React.MouseEvent, text: string, itemName: string): void {
      window.electronAPI.clipboardCopy(text);
      showPopup(e.clientX, e.clientY, itemName);
    }

    function handlePwdDelete(pwdId: number): void{
      if(window.confirm("Confirm Delete ?") === false){
        return null
      }
      
      setShowEdit(false);
      deletePasswordEntry(pwdId);
    }

  return (
    <>
      <tr>
        <td>{item.id + 1}</td>
        <td onClick={(e) => copyTextToClipboard(e, item.name, "Entry Name")} className="hover:cursor-pointer">{item.name}</td>
        <td onClick={(e) => copyTextToClipboard(e, item.website, "Website")} className="hover:cursor-pointer">{item.website}</td>
        <td onClick={(e) => copyTextToClipboard(e, item.username, "Username")} className="hover:cursor-pointer">{item.username}</td>
        <td>
          <div className='flex justify-around'>
            <p onClick={(e) => copyTextToClipboard(e, item.password, "Password")} className={`${showPrivatePassword? '' : 'password_field'} hover:cursor-pointer`}>{item.password}</p>
          </div>
        </td>
        <td>{item.comment}</td>
        <td>
          <div className='flex justify-around'>
            {showPrivatePassword
              ? <TbEye size='32' title="Hide" className='cursor-pointer' onClick={() => setShowPrivatePassword(!showPrivatePassword)}/> 
              : <TbEyeOff size='32' title="Show" className='cursor-pointer' onClick={() => setShowPrivatePassword(!showPrivatePassword)}/>}
            <MdEditSquare size='32' title="Edit" className='cursor-pointer' onClick={() => setShowEdit(!showEdit)} />
          </div>
        </td>
      </tr>
      {(showEdit)
        ? <Modal isOpen={showEdit} onClose={() => setShowEdit(false)}>
            <span className='flex flex-col items-center'>
              <button className='p-2' onClick={() => handlePwdDelete(item.id)} title="Delete Entry">
                <MdDelete size='32' className="text-red-500 hover:bg-red-500 hover:text-black rounded transition-all" />
              </button>
              <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center gap-2 p-2 text-lg'>
                <h1 className='text-2xl text-center'>Edit password: {item.name}</h1>
                <div className="w-3/4 h-px border-black border"></div>
                <div className='flex flex-col gap-2 p-2 border-2 border-gray-500 rounded'>
                    <div className='flex flex-row gap-1'>
                      <label htmlFor="name">Name:</label>
                      <input {...register("name", {required: "This Field is required."})} placeholder='Name' className='indent-2' defaultValue={item.name} />
                    </div>
                    <div className='flex flex-row gap-1'>
                      <label htmlFor="website">Website:</label>
                      <input {...register("website", {required: "This Field is required."})} placeholder='Website' className='indent-2' defaultValue={item.website} />
                    </div>
                    <div className='flex flex-row gap-1'>
                      <label htmlFor="username">Username:</label>
                      <input {...register("username", {required: "This Field is required."})} placeholder='Username' className='indent-2' defaultValue={item.username} />
                    </div>
                    <div className='flex flex-row gap-1'>
                      <label htmlFor="password">Password:</label>
                      <input {...register("password", {required: "This Field is required."})} placeholder='Password' className={`${showEditPassword? '' : 'password_field'} indent-2`} defaultValue={item.password} />
                    </div>
                    <div className='flex flex-row gap-1'>
                        <label htmlFor="comment">Notes:</label>
                        <input {...register("comment", {required: "This Field is required."})} placeholder='Comment' className='indent-2' defaultValue={item.comment} />
                    </div>
                  <div className='flex justify-around'>
                      <span className='p-2 cursor-pointer' onClick={() => setShowEditPassword(!showEditPassword)}>
                          {showEditPassword? <TbEye size='24' title="Hide"/> : <TbEyeOff size='24' title="Show"/>}
                      </span>
                      <span className='p-2 cursor-pointer' onClick={() => setValue('password', generatePassword(fileParams))}>
                          <MdAutorenew size='24' title='Generate New Password' />
                      </span>
                  </div>
                </div>
                <div className='flex justify-around w-full p-2'>
                  <button type="submit" className='ml-1 p-2' title="Validate Edit">
                    <MdDone size='32' className="text-green-500 hover:bg-green-500 hover:text-black rounded transition-all"/>
                  </button>
                  <button className='p-2' type='reset' onClick={() => setShowEdit(false)} title="Cancel Edit">
                    <MdCancel size='32' className="text-red-500 hover:bg-red-500 hover:text-black rounded transition-all" />
                  </button>
                </div>
              </form>
            </span>
          </Modal>
        : <></>
    }      
    </>
  )
}