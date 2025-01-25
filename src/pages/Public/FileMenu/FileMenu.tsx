import React from 'react';
import FileCreateControl from "./FileCreateControl";

export default function FileMenu () {
  return (
    <div className="flex gap-2 w-full bg-white p-2 rounded">
      <FileCreateControl />
    </div>
  )
}
