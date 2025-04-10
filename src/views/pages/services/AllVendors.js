import axios from 'axios'
import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table'
import CIcon from '@coreui/icons-react'
import { cilAirplaneMode, cilArrowThickBottom, cilCheck, cilPaperPlane, cilPool, cilTrash } from '@coreui/icons'
import { AppSidebar, AppHeader } from '../../../components/index'

const AllVendors = () => {
  const [services, setServices] = useState([])
  const token = localStorage.getItem('token')
  async function getUsers() {
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}superAdmin/vendors`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const ser = res.data.vendors
    setServices(ser)
  }

  async function deleteUser(id) {
    const res = await axios.delete(`${import.meta.env.VITE_BASE_URL}superAdmin/vendor/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (res.data.status === 200) {
      getUsers()
    }
  }

  const columns = useMemo(
    () => [
      {
        header: 'S.No',
        size: 50,
        accessorFn: (dataRow, index) => index + 1,
        // accessorFn: (dataRow) => <Link to={`/user/${dataRow.id}`} style={{ textDecoration: 'none' }}>{dataRow.username}</Link>,
      },
      {
        header: 'Name',
        // accessorKey: 'username',
        size: 150,
        accessorFn: (dataRow) => (
          <p>
            {dataRow.username}
          </p>
        ),
      },
      {
        header: 'Status',
        size: 150,
        accessorFn: (dataRow) => (
          <p>
            {dataRow.verified ? 'Verified' : ''}
          </p>
        ),
      },
      {
        header: 'Phone',
        accessorKey: 'phone',
        size: 60,
      },
      {
        header: 'Hosted Trips',
        accessorFn: (dataRow) => (
          <Link to={`/vendor/trips/${dataRow.id}`} className="btn btn-primary">
            <CIcon icon={cilPaperPlane} />
          </Link>
        ),
        size: 50,
      },
      {
        header: 'Services',
        accessorFn: (dataRow) => (
          <Link to={`/vendor/services/${dataRow.id}`} className="btn btn-primary">
            <CIcon icon={cilPool} />
          </Link>
        ),
        size: 50,
      },
      {
        header: 'Created At',
        accessorFn: (dataRow) => new Date(dataRow.created_at).toLocaleString().split(',')[0],
        size: 60,
      },
      // {
      //   header: 'Delete',
      //   accessorFn: (dataRow) => (
      //     <button
      //       className="btn btn-danger"
      //       onClick={() => {
      //         deleteUser(dataRow.id)
      //       }}
      //     >
      //       <CIcon icon={cilTrash} />
      //     </button>
      //   ),
      //   size: 50,
      // },
    ],
    [],
  )

  useEffect(() => {
    getUsers()
  }, [])

  const table = useMantineReactTable({
    columns,
    data: services,
    enableRowSelection: false,
    enableColumnOrdering: false,
    enableGlobalFilter: true,
    enableFullScreenToggle: false,
  })

  return (
    <>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
          <div className="mx-5 mb-5">
            <h1 className="text-center mb-4">All Vendors</h1>
            <MantineReactTable table={table} />
          </div>
        </div>
      </div>
    </>
  )
}
export default AllVendors
