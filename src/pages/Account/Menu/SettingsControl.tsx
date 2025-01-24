import React, { useState } from 'react'
import { MdSettings } from 'react-icons/md';
import Modal from '../../../global/Modal';
import SettingsForm from './SettingsForm';

export default function SettingsControl() {
    const [ showParamsModal, setShowParamsModal ] = useState(false);

    return (
        <>
            <button title="Settings" onClick={() => setShowParamsModal(true)}>
                <MdSettings size='42' className="text-gray-500 hover:bg-gray-500 hover:text-black rounded transition-all"/>
            </button>
            {(showParamsModal)
                ?   <Modal isOpen={showParamsModal} onClose={() => setShowParamsModal(false)}>
                        <SettingsForm setShowParamsModal={setShowParamsModal}/>
                    </Modal>
                :   <></>
            }
        </>
    )
}