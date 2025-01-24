import React, { useState } from 'react';
import { MdAdd } from 'react-icons/md';
import AddPwdForm from './AddPwdForm';
import Modal from '../../../global/Modal';

export default function AddPwdControl() {
    const [ showAddPwdForm, setShowAddPwdForm ] = useState(false);

    return (
        <>
            <button title="Add New Password" onClick={() => setShowAddPwdForm(true)} >
                <MdAdd size='42' className="text-green-500 hover:bg-green-500 hover:text-black rounded transition-all"/>
            </button>
            {(showAddPwdForm)
                ?   <Modal isOpen={showAddPwdForm} onClose={() => setShowAddPwdForm(false)}>   
                        <AddPwdForm setShow={setShowAddPwdForm}/>
                    </Modal>

                :   <></>
            }
        </>
    )
}