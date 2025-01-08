import React, { useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
import { TbEyeOff, TbEye } from "react-icons/tb";
import { MdCancel, MdDelete, MdDone, MdEditSquare, MdCopyAll  } from "react-icons/md";
import { PwdItem } from '../../types/pwdTypes';
import Modal from '../../global/Modal';
/* import { generatePassword } from '../../utils/generatePassword'; */


interface PwdItemPropsInterface{
  item: PwdItem,
  editPasswordEntry: (editedPwd: PwdItem) => void,
  deletePasswordEntry: (id: number) => void
}

type PwdFormInput = {
  name: string,
  website: string,
  username: string,
  password: string,
  comment: string
}

export default function PasswordItem({ item = null, editPasswordEntry, deletePasswordEntry }: PwdItemPropsInterface) {
    const [showPrivatePassword, setShowPrivatePassword] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    const { register, handleSubmit } = useForm<PwdFormInput>();
    const onSubmit: SubmitHandler<PwdFormInput> = (data) => {
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

    function copyTextToClipboard(text: string) {
        navigator.clipboard.writeText(text);
    }

    function handlePwdDelete(pwdId: number): void{
      if(window.confirm("Confirm Delete ?") === false){
        return null
      }
      
      setShowEdit(false);
      deletePasswordEntry(pwdId);
    }

    /* const testGenerate = {
      length: 20,
      selectedSet: {
          setNumber: true,
          setUppercase: true,
          setLowercase: true,
          setMinus: false,
          setUnderline: false,
          setSpecial: true,
          setBrackets: true
      }
    } */
      
  return (
    <>
      <tr>
        <td>{item.id + 1}</td>
        <td>{item.name}</td>
        <td>{item.website}</td>
        <td>{item.username}</td>
        <td>
          <div className='flex justify-around'>
            <p className={showPrivatePassword? '' : 'password_field'}>{item.password}</p>
            <button onClick={() => copyTextToClipboard(item.password)} title="Copy">
              <MdCopyAll size='32'/>
            </button>
          </div>
        </td>
        <td>{item.comment}</td>
        <td>
          <div className='flex justify-around'>
            <button className='p-2' onClick={() => setShowPrivatePassword(!showPrivatePassword)} title={showPrivatePassword? "Hide" : "Show"}>
              {showPrivatePassword? <TbEye size='32'/> : <TbEyeOff size='32'/>}
            </button>
            <button className='p-2' onClick={() => setShowEdit(!showEdit)} title="Edit">
              <MdEditSquare size='32'/>
            </button>
          </div>
        </td>
      </tr>
      <Modal open={showEdit}>
        <button className='p-2' onClick={() => handlePwdDelete(item.id)} title="Delete Entry">
          <MdDelete size='32' className="hover:bg-red-500 rounded transition-all"/>
        </button>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2'>
          <input {...register("name", {required: "This Field is required."})} placeholder='Name' defaultValue={item.name} />
          <input {...register("website", {required: "This Field is required."})} placeholder='Website' defaultValue={item.website} />
          <input {...register("username", {required: "This Field is required."})} placeholder='Username' defaultValue={item.username} />
          <input {...register("password", {required: "This Field is required."})} placeholder='Password' defaultValue={item.password} />
          <input {...register("comment", {required: "This Field is required."})} placeholder='Comment' defaultValue={item.comment} />
          <button type="submit" className='ml-1 p-2' title="Validate Edit">
            <MdDone size='32' className="hover:bg-green-500 rounded transition-all"/>
          </button>
          <button className='p-2' type='reset' onClick={() => setShowEdit(false)} title="Cancel Edit">
            <MdCancel size='32' className="hover:bg-red-500 rounded transition-all"/>
          </button>
        </form>
      </Modal>
    </>
  )
}