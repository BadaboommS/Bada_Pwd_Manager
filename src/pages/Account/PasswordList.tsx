import React, { useContext, useEffect, useState } from 'react'
import PasswordItem from './PasswordItem'
import { PwdItem } from '../../types/pwdTypes'
import { AccountContext } from '../../context/AccountContextProvider'

interface PasswordListPropsInterface {
  sortQuery: string;
}

export default function PasswordList({ sortQuery }: PasswordListPropsInterface) {
  const { passwordList } = useContext(AccountContext);
  const [ sortedPasswordList, setSortedPasswordList ] = useState([]);

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
    (sortedPasswordList.length === 0)
      ? <p className='text-center'>No matching password found !</p>
      : <table className='border border-solid border-white border-collapse border-spacing-1 text-left'>
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
                  return (pwd !== null) ? <PasswordItem item={pwd} key={i} /> : <></>
            })}
          </tbody>
        </table>
  )
}