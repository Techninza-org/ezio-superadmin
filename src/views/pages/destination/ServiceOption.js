import React, { useEffect, useState } from 'react'
import { AppSidebar, AppHeader } from '../../../components/index'
import axios from 'axios'
import { CFormInput } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilTrash } from '@coreui/icons'

const ServiceOption = () => {
    const [options, setOptions] = useState([])
    const [name, setName] = useState('')
    async function getServiceOptions() {
        const token = localStorage.getItem('token')
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}superAdmin/service-options`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        const ser = res.data.serviceOptions;
        setOptions(ser);
    }
    useEffect(() => {
        getServiceOptions();
    }, [])

    const handleChange = (e) => {
        setName(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const token = localStorage.getItem('token')
        if (!name) {
            return alert("Please enter a service option")
        }
        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}superAdmin/service-option`, {
            name: name
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if (res.data.error) return alert("Failed to add option")
        getServiceOptions();
    }

    const handleDelete = async (id) => {
        const token = localStorage.getItem('token')
        const res = await axios.delete(`${import.meta.env.VITE_BASE_URL}superAdmin/service-option/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if (res.data.error) return alert("Failed to delete option")
        getServiceOptions();
    }

    return (
        <>
            <AppSidebar />
            <div className="wrapper d-flex flex-column min-vh-100">
                <AppHeader />
                <div className="body flex-grow-1">
                    <div className='mx-5 mb-5'>
                        <h1 className='text-center mb-4'>Service Options</h1>
                        <div>
                        <div className=' w-50 mb-5'>
                            <CFormInput type="text" placeholder="Enter Service Option" onChange={handleChange} />
                            <button className="btn btn-primary mt-4" onClick={handleSubmit}>Add</button>
                        </div>
                        <div>
                        <table className="table table-bordered table-hover w-50 shadow-sm">
    <thead className="table-light">
        <tr>
            <th scope="col">S.No</th>
            <th scope="col">Name</th>
            <th scope="col">Action</th>
        </tr>
    </thead>
    <tbody>
        {options?.map((option, index) => (
            <tr key={option.id}>
                <td>{index + 1}</td>
                <td>{option.name}</td>
                <td>
                    <CIcon
                        onClick={() => handleDelete(option.id)}
                        icon={cilTrash}
                        className="text-danger"
                        style={{ cursor: 'pointer' }}
                    />
                </td>
            </tr>
        ))}
    </tbody>
</table>

                        </div>

                        
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ServiceOption