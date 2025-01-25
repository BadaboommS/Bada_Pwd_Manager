import React, { useState } from "react";
import { MdAdd } from "react-icons/md";
import FileCreateForm from "./FileCreateForm";
import Modal from "../../../global/Modal";

export default function FileCreateControl () {
    const [showAddFile, setShowAddFile] = useState(false);

    return (
      <>
        <button title="Add New Password" onClick={() => setShowAddFile(true)}>
            <MdAdd size='42' className="text-green-500 hover:bg-green-500 hover:text-black rounded transition-all"/>
        </button>
        {(showAddFile)
        ?   <Modal isOpen={showAddFile} onClose={() => setShowAddFile(false)}>
                <FileCreateForm setShowAddFile={setShowAddFile} />
            </Modal>
        :   <></>
        }
      </>
    )
  }
  