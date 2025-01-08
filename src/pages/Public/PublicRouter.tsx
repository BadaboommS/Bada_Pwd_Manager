import React from 'react'
import { Routes, Route } from 'react-router'
import Error from '../../utils/Error'
import Login from './Login'
import PublicContextProvider from '../../context/PublicContextProvider'

export default function PublicRouter () {

  return (
    <PublicContextProvider>
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path='/*' element={<Error />} />
      </Routes>
    </PublicContextProvider>
  )
}