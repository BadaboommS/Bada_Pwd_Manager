import React, {  useState } from 'react'
import { MdEditSquare  } from "react-icons/md";
import { TbEyeOff, TbEye } from "react-icons/tb";
import Modal from '../../global/Modal';
import { showPopup } from '../../global/showPopup';
import { PwdItem } from '../../types/pwdTypes';
import PasswordEditForm from './PasswordEditForm';

interface PwdItemPropsInterface{
  item: PwdItem,
}

export default function PasswordItem({ item = null }: PwdItemPropsInterface) {
    const [showPrivatePassword, setShowPrivatePassword] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [isCopyDisabled, setIsCopyDisabled] = useState(false);

    function copyTextToClipboard (e: React.MouseEvent, text: string, itemName: string): void {
      if(isCopyDisabled) return null;

      window.electronAPI.clipboardCopy(text);
      showPopup(e.clientX, e.clientY, itemName);

      setIsCopyDisabled(true);
      setTimeout(() => setIsCopyDisabled(false), 4000);
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
            <PasswordEditForm item={item} setShowEdit={setShowEdit} />
          </Modal>
        : <></>
    }      
    </>
  )
}