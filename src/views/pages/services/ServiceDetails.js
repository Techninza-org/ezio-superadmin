import { CCard, CCardBody, CCardText, CCardTitle } from '@coreui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppSidebar, AppHeader } from '../../../components/index'
import { format } from 'date-fns'

export default function ServiceDetails() {
    const [service, setService] = useState({})
    const { id } = useParams()
    async function getService() {
        const token = localStorage.getItem('token')
        const res = await axios.get(`https://eziotravels.com/api/superAdmin/service/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        setService(res.data.service)
    }
    useEffect(() => {
        getService()
    }, [])

    return (
        <>
            <AppSidebar />
            <div className="wrapper d-flex flex-column min-vh-100">
                <AppHeader />
                <div className="body flex-grow-1">
                    <div>
                        <h4 className='text-center mb-4'>{service.name}</h4>
                        <div className='col-md-10 mx-auto mb-4'>
                            <CCardBody>
                                <table className="table table-bordered">
                                    <tbody>
                                        <tr>
                                            <th>Destination</th>
                                            <td>{service.destination}</td>
                                        </tr>
                                        <tr>
                                            <th>Description</th>
                                            <td>{service.description}</td>
                                        </tr>
                                        <tr>
                                            <th>Start Date</th>
                                            <td>{service.start_date ? format(new Date(service.start_date), 'dd/MM/yyyy') : 'N/A'}</td>
                                        </tr>
                                        <tr>
                                            <th>End Date</th>
                                            <td>{service.end_date ? format(new Date(service.end_date), 'dd/MM/yyyy') : 'N/A'}</td>
                                        </tr>
                                        <tr>
                                            <th>Duration</th>
                                            <td>{service.duration} days</td>
                                        </tr>
                                        <tr>
                                            <th>Price</th>
                                            <td>Rs. {service.price}</td>
                                        </tr>
                                        <tr>
                                            <th>Rating</th>
                                            <td>{service.rating}</td>
                                        </tr>
                                        <tr>
                                            <th>Services</th>
                                            <td>
                                                <ul className="mb-0">
                                                    {
                                                        service.services?.map((item, index) => (
                                                            <li key={index}>{item}</li>
                                                        ))
                                                    }
                                                </ul>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Itinerary</th>
                                            <td>
                                                <div style={{
                                                    overflowX: 'auto', width: '100%', scrollbarWidth: 'thin',
                                                    scrollbarColor: '#ccc transparent',
                                                }}>
                                                    <table className="table table-sm table-striped" style={{ tableLayout: 'fixed' }}>
                                                        <thead>
                                                            <tr>
                                                                <th style={{ width: '80px' }}>Day</th>
                                                                <th style={{ width: '300px', wordWrap: 'break-word' }}>Detail</th>
                                                                <th style={{ width: '120px' }}>Image</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                service?.itinerary?.map((item, index) => (
                                                                    <tr key={index}>
                                                                        <td>{item.day}</td>
                                                                        <td style={{ wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}>{item.detail}</td>
                                                                        <td>
                                                                            {item.image && (
                                                                                <img
                                                                                    src={item.image}
                                                                                    alt={`Itinerary ${index + 1}`}
                                                                                    style={{
                                                                                        maxWidth: 'auto',
                                                                                        maxHeight: '140px',
                                                                                        objectFit: 'cover'
                                                                                    }}
                                                                                />
                                                                            )}
                                                                        </td>
                                                                    </tr>
                                                                ))
                                                            }
                                                        </tbody>
                                                    </table>
                                                </div>

                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Images</th>
                                            <td>
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        overflowX: 'auto',
                                                        gap: '10px',
                                                        paddingBottom: '5px',
                                                        scrollbarWidth: 'thin',
                                                        scrollbarColor: '#ccc transparent',
                                                    }}
                                                >
                                                    {
                                                        service?.images?.map((image, index) => (
                                                            <img
                                                                key={index}
                                                                src={image}
                                                                alt={`service-${index}`}
                                                                style={{
                                                                    flexShrink: 0,
                                                                    width: 'auto',
                                                                    height: '180px',
                                                                    objectFit: 'cover',
                                                                    borderRadius: '6px',
                                                                    boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
                                                                }}
                                                            />
                                                        ))
                                                    }
                                                </div>
                                            </td>

                                        </tr>
                                    </tbody>
                                </table>
                            </CCardBody>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}
