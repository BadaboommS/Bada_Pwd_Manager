import React, { useContext } from 'react';
import { AccountContext } from '../../context/AccountContextProvider';
import AddPwdControl from './Menu/AddPwdControl';
import SearchPwdControl from './SearchPwdControl';
import PasswordList from './PasswordList';

export default function Dashboard() {
    const { passwordList } = useContext(AccountContext);

    return (
        (passwordList[0])
            ?   <div>
                    <SearchPwdControl onSearch={(query) => console.log('Searching for:', query)} />
                    <PasswordList />
                </div>

            :   <div className='flex flex-col items-center justify-center h-screen gap-2 p-2 text-2xl text-center'>
                    <h1>Password List is empty !</h1>
                    <p>Add a new password !</p>
                    <span className='flex gap-2 text-black'>
                        <AddPwdControl />
                    </span>
                </div>
    )
}
