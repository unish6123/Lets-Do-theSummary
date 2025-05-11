import { useState } from 'react'
import React from 'react'
import Navbar from '../components/UI/Navbar.jsx'
import BookStore from '../components/BookStore/BookStore.jsx'

const DashboardPage = () => {
  return (
    <div>
     <BookStore />
    </div>
  )
}

export default DashboardPage
