import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../common/Sidebar'

function SupplierRoutes() {
  return (
    <React.Fragment>
      <Sidebar />
      <div className='AunthenticatedApp'>
        <Outlet />
      </div>
    </React.Fragment>
  )
}

export default SupplierRoutes