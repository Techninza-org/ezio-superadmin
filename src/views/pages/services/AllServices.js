import axios from 'axios'
import React, { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table'
import { AppSidebar, AppHeader } from '../../../components/index'

const AllServices = () => {
  const [services, setServices] = useState([])
  const token = localStorage.getItem('token')
  async function getServices() {
    const res = await axios.get(
      `${import.meta.env.VITE_BASE_URL}superAdmin/all-services`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    const ser = res.data.services
    setServices(ser)
  }

  const columns = useMemo(
    () => [
      {
        header: 'Name',
        accessorKey: 'name',
        // accessorFn: (dataRow) => <Link to={`/service/${dataRow.id}`} style={{ textDecoration: 'none' }}>{dataRow.name}</Link>,
      },
      {
        header: 'Type',
        accessorFn: (dataRow) => {
            if (dataRow.custom_trip_id === null) {
                return <span className="badge bg-primary">General</span>
            } else {
                return <span className="badge bg-secondary">Custom</span>
            }
        }
      },
      {
        header: 'Destination',
        accessorFn: (dataRow) => {
            if (dataRow.custom_trip_id === null) {
                return <p>{dataRow.destination}</p>
            } else {
                return dataRow.itinerary
  .map((item, index) => `${index + 1}. ${item.destination}`)
  .join(' ');
            }
        }
      },
      {
        header: 'Duration (days)',
        accessorKey: 'duration',
      },
      {
        header: 'Price',
        accessorFn: (dataRow) => <span>&#8377;{dataRow.price}</span>,
      },
      {
        header: 'Host Name',
        accessorKey: 'host.name',
      },
      {
        header: 'Host phone',
        accessorKey: 'host.phone',
      },
    ],
    [],
  )

  useEffect(() => {
    getServices()
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
            <h1 className="text-center mb-4">All Services / Packages</h1>
            <MantineReactTable table={table} />
          </div>
        </div>
      </div>
    </>
  )
}
export default AllServices
