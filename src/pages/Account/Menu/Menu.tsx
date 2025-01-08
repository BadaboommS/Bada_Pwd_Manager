import React from 'react';
import AddPwdControl from './AddPwdControl';
import LogoutControl from './LogoutControl';
import SaveControl from './SaveControl';
import SettingsControl from './SettingsControl';

export default function Menu (){
    
    return (
        <>
            <div className="flex gap-2 w-full bg-white p-2 rounded">
                <AddPwdControl />
                <div className="w-px min-h-full border-black border"></div>
                <SaveControl />
                <div className="w-px min-h-full border-black border"></div>
                <SettingsControl />
                <div className="w-px min-h-full border-black border"></div>
                <LogoutControl />
            </div>
        </>
    )
}