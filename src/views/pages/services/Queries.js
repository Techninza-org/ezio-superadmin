import axios from 'axios'
import React, { useEffect, useMemo, useState } from 'react'
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table'
import { AppSidebar, AppHeader } from '../../../components/index'

const Queries = () => {
  const [services, setServices] = useState([])
  const token = localStorage.getItem('token')
  async function getUsers() {
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}superAdmin/queries`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const ser = res.data.queries
    setServices(ser)
  }

  const columns = useMemo(
    () => [
      {
        header: 'S.No',
        accessorFn: (dataRow, index) => index + 1,
      },
      {
        header: 'Name',
        accessorKey: 'name',
      },
      {
        header: 'Email',
        accessorKey: 'email',
      },
      {
        header: 'Phone',
        accessorKey: 'phone',
      },
      {
        header: 'Message',
        accessorKey: 'message',
        size: 160,
      },
      
      {
        header: 'Created At',
        accessorFn: (dataRow) => new Date(dataRow.created_at).toLocaleString().split(',')[0],
        size: 60,
      },
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
            <h1 className="text-center mb-4">User Queries</h1>
            <MantineReactTable table={table} />
          </div>
        </div>
      </div>
    </>
  )
}
export default Queries
