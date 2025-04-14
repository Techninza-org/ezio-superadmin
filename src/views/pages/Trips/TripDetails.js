import { CCard, CCardBody, CCardText, CCardTitle } from '@coreui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppSidebar, AppHeader } from '../../../components/index'

export default function TripDetails() {
    const [trip, setTrip] = useState({})
    const [service, setService] = useState({})
    const { id } = useParams()
    useEffect(() => {
        async function getTrip() {
            const token = localStorage.getItem('token')
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}superAdmin/trip/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setTrip(res.data.trip)
            setService(res.data.trip.service)
        }
        getTrip()
    }, [id])

    return (
        <>
            <AppSidebar />
            <div className="wrapper d-flex flex-column min-vh-100">
                <AppHeader />
                <div className="body flex-grow-1">
                    <div >
                        <h4 className='text-center mt-2 mb-2'>Trip Details</h4>
                        <div className="container my-4">
                            <div className="row justify-content-center">
                                <div className="col-md-10">
                                    <div className="shadow-sm">
                                        <div className="card-body">
                                            <table className="table table-bordered">
                                                <tbody>
                                                    <tr>
                                                        <th scope="row">User Name</th>
                                                        <td>{trip.user?.username}</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">User Phone</th>
                                                        <td>{trip.user?.phone}</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Host name</th>
                                                        <td>{trip.host?.name}</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Host Phone</th>
                                                        <td>{trip.host?.phone}</td>
                                                    </tr>
                                                    {trip?.tripMembers?.length > 0 && (
                                                        <>
                                                            <tr>
                                                                <th colSpan="2">Trip Members</th>
                                                            </tr>
                                                            {trip.tripMembers.map((member, index) => (
                                                                <tr key={index}>
                                                                    <th scope="row">Member {index + 1}</th>
                                                                    <td>
                                                                        <div><strong>Name:</strong> {member.name}</div>
                                                                        <div><strong>Age:</strong> {member.age}</div>
                                                                        <div><strong>Gender:</strong> {member.gender}</div>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </>
                                                    )}
                                                    <tr>
                                                        <th scope="row">Destination</th>
                                                        <td>{service?.destination}</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Description</th>
                                                        <td>{service?.description}</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">No. of People</th>
                                                        <td>{trip?.number_of_people}</td>
                                                    </tr>

                                                    <tr>
                                                        <th scope="row">Duration</th>
                                                        <td>{service?.duration} days</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Start Date</th>
                                                        <td>{trip?.start_date}</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">End Date</th>
                                                        <td>{trip?.end_date}</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Booking Price</th>
                                                        <td>Rs. {trip?.cost}</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Service Name</th>
                                                        <td>{trip?.service?.name}</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Services</th>
                                                        <td>
                                                            <ul className="mb-0 ps-3">
                                                                {service?.services?.map((s, i) => (
                                                                    <li key={i}>{s}</li>
                                                                ))}
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
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
