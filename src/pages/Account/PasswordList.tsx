import React, { useContext, useEffect, useState } from 'react'
import PasswordItem from './PasswordItem'
import { PwdItem } from '../../types/pwdTypes'
import { AccountContext } from '../../context/AccountContextProvider'

interface PasswordListProps {
  sortQuery: string;
}

export default function PasswordList({ sortQuery }: PasswordListProps) {
  const { passwordList, setPasswordList } = useContext(AccountContext);
  const [ sortedPasswordList, setSortedPasswordList ] = useState([]);
      
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

  useEffect(() => {
    if (sortQuery !== '') {
      const newPwdArray = passwordList.filter((pwd: PwdItem) => 
        pwd.name.toLowerCase().includes(sortQuery.toLowerCase()) ||
        pwd.website.toLowerCase().includes(sortQuery.toLowerCase()) ||
        pwd.username.toLowerCase().includes(sortQuery.toLowerCase()) ||
        pwd.comment.toLowerCase().includes(sortQuery.toLowerCase())
      );
      setSortedPasswordList(newPwdArray);
    } else {
      setSortedPasswordList(passwordList);
    }
  },[sortQuery, passwordList]);

  return (
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
          {sortedPasswordList.map((pwd: PwdItem, i: number) => {
                return (pwd !== null) ? <PasswordItem item={pwd} key={i} editPasswordEntry={editPasswordEntry} deletePasswordEntry={deletePasswordEntry} /> : <></>
          })}
        </tbody>
      </table>
  )
}