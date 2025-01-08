import React from 'react';
import FileCreate from "./FileCreate";
import FileDelete from "./FileDelete";

export default function FileMenu () {
  return (
    <div className="flex gap-2 w-full bg-white p-2 rounded">
      <FileCreate />
      <div className="w-px min-h-full border-black border"></div>
      <FileDelete />
    </div>
  )
}
