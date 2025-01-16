import React, { useContext } from 'react'
import PasswordItem from './PasswordItem'
import { PwdItem } from '../../types/pwdTypes'
import { AccountContext } from '../../context/AccountContextProvider'
import AddPwdControl from './Menu/AddPwdControl';

export default function PasswordList() {
  const { passwordList, setPasswordList } = useContext(AccountContext);
      
  function editPasswordEntry( editedPwd: PwdItem ): void{
    const newPwdArray = [...passwordList];
    const editPwdIndex = newPwdArray.findIndex((obj:PwdItem) => obj.id === editedPwd.id);
    newPwdArray[editPwdIndex] = editedPwd;
    setPasswordList(newPwdArray);
  }

  function deletePasswordEntry( deletePwdId: number ): void{
    const pwdList = [...passwordList];
    const newPwdArray = pwdList.filter((obj: PwdItem) => obj.id !== deletePwdId);
    setPasswordList(newPwdArray);
  }

  return (
    <>
      {(passwordList[0])
        ? (
            <table className='border border-solid border-white border-collapse border-spacing-1 text-left'>
              <thead>
                <tr>
                  <th>N°</th>
                  <th>Name</th>
                  <th>Website</th>
                  <th>Username</th>
                  <th>Password</th>
                  <th>Notes</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                {passwordList.map((pwd: PwdItem, i: number) => {
                      return (pwd !== null) ? <PasswordItem item={pwd} key={i} editPasswordEntry={editPasswordEntry} deletePasswordEntry={deletePasswordEntry}></PasswordItem> : <></>
                })}
              </tbody>
            </table>         
          )         
        : <div className='flex flex-col items-center justify-center h-screen gap-2 p-2 text-2xl text-center'>
            <h1>Password List is empty !</h1>
            <p>Add a new password !</p>
            <span className='flex gap-2 text-black'>
              <AddPwdControl />
            </span>
          </div>
      }
    </>
  )
}