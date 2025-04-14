import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react'
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import { Link, useParams } from 'react-router-dom';
import { cilDescription, cilPencil, cilTransfer } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { AppSidebar, AppHeader } from '../../../components/index'

export default function AllTrips() {
    const [trips, setTrips] = useState([]);
    useEffect(() => {
        async function getTrips() {
            const token = localStorage.getItem('token')
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}superAdmin/all-trips`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const trips = res.data.trips;
            setTrips(trips);
        }
        getTrips();
    }, [])

    const columns = useMemo(
        () => [
            {
                header: 'Details',
                accessorFn: (dataRow) => <Link to={`/trip/${dataRow.id}`}><CIcon icon={cilDescription} /></Link>,
                size: 50,
            },
            {
                header: 'Name',
                accessorFn: (dataRow) => <Link style={{textDecoration: 'none'}} to={`/detail/${dataRow.user.id}`}>{dataRow.user.username}</Link>,
                size: 100,
            },
            {
                header: 'Phone',
                accessorKey: 'user.phone',
                size: 100,
            },
            {
                header: 'Service Details',
                accessorFn: (dataRow) => <Link style={{textDecoration: 'none'}} to={`/service/${dataRow.service_id}`}>Service Details</Link>,
                size: 100,
            },
            {
                header: 'Service Rating',
                accessorKey: 'service.rating',
                size: 100,
            },
            {
                header: 'Destination',
                accessorKey: 'destination',
                size: 150
            },
            {
                header: 'Duration (days)',
                accessorKey: 'service.duration',
                size: 50,
            },
            {
                header: 'People',
                accessorKey: 'number_of_people',
                size: 50,
            },
            {
                header: 'Start Date',
                accessorKey: 'start_date',
                size: 100,
            },
            {
                header: 'End Date',
                accessorKey: 'end_date',
                size: 100,
            },
            {
                header: 'Booking Price',
                accessorFn: (dataRow) => <span>&#8377;{dataRow.cost / 100}</span>,
                size: 80,
            },
            {
                header: 'Order Id',
                accessorKey: 'order_id',
                size: 100,
            },
        ],
        [],
    );

    const table = useMantineReactTable({
        columns,
        data: trips,
        enableRowSelection: false,
        enableColumnOrdering: false,
        enableGlobalFilter: true,
        enableFullScreenToggle: false
    });
    return (
        <>
            <AppSidebar />
            <div className="wrapper d-flex flex-column min-vh-100">
                <AppHeader />
                <div className="body flex-grow-1">
                    <div className=' mx-5 mb-5'>
                        <h1 className='text-center mb-4'>All Trips</h1>
                        <MantineReactTable table={table} />
                    </div>
                </div>
            </div>
        </>
    )
}