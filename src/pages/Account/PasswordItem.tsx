import React, { useState } from 'react'
import { FaEdit, FaCopy } from "react-icons/fa";
import { TbEyeOff, TbEye } from "react-icons/tb";
import { MdCancel, MdDelete, MdDone } from "react-icons/md";
import { PwdItem } from '../../types/pwdTypes';
import Modal from '../../global/Modal';
/* import { generatePassword } from '../../utils/generatePassword'; */


interface PwdItemPropsInterface{
  item: PwdItem,
  editPasswordEntry: (event: React.FormEvent<HTMLFormElement>, itemId: number) => void,
  deletePasswordEntry: (id: number) => void
}

export default function PasswordItem({ item = null, editPasswordEntry, deletePasswordEntry }: PwdItemPropsInterface) {
    const [showPrivatePassword, setShowPrivatePassword] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    function copyTextToClipboard(text: string) {
        navigator.clipboard.writeText(text);
    }

    function handlePwdEdit(e: React.FormEvent<HTMLFormElement>): void{
      e.preventDefault();

      if(window.confirm("Confirm Edit ?") === false){
          return null
      }

      editPasswordEntry(e, item.id);
      setShowEdit(false);
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
        <td><div className='flex justify-around'><p className={showPrivatePassword? '' : 'password_field'}>{item.password}</p><button onClick={() => copyTextToClipboard(item.password)} title="Copy"><FaCopy size='24'/></button></div></td>
        <td>{item.comment}</td>
        <td>
          <div className='flex justify-around'>
            <button className='p-2' onClick={() => setShowPrivatePassword(!showPrivatePassword)} title={showPrivatePassword? "Hide" : "Show"}>{showPrivatePassword? <TbEye size='24'/> : <TbEyeOff size='24'/>}</button>
            <button className='p-2' onClick={() => setShowEdit(!showEdit)} title="Edit"><FaEdit size='24'/></button>
          </div>
        </td>
      </tr>
      <Modal open={showEdit}>
        <button className='p-2' onClick={() => handlePwdDelete(item.id)} title="Delete Entry"><MdDelete size='24'/></button>
        <form onSubmit={(e) => handlePwdEdit(e)}>
          <input placeholder='Name' type="text" name="name" id="name" defaultValue={item.name} required></input>
          <input placeholder='Website' type="text" name="website" id="website" defaultValue={item.website} required />
          <input placeholder='Username' type="text" name="username" id="username" defaultValue={item.username} required />
          <input placeholder='Password' type="text" name="password" id="password" defaultValue={item.password} required />
          <input placeholder='Comment' type="text" name="comment" id="comment" defaultValue={item.comment} />
          <button type="submit" className='ml-1 p-2' title="Validate Edit"><MdDone size='24'/></button>
          <button className='p-2' type='reset' onClick={() => setShowEdit(false)} title="Cancel Edit"><MdCancel size='24'/></button>
        </form>
      </Modal>
    </>
  )
}