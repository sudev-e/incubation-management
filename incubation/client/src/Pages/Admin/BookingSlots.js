import React,{useEffect} from 'react'
import BookingSlots from '../../components/Admin/BookingSlots/BookingSlots'
import Sidebar from '../../components/Admin/Sidebar/Sidebar'
import { decodeToken } from 'react-jwt'
import { useNavigate } from 'react-router-dom'

function BookingSlotsPage() {

    const token = localStorage.getItem('Admintoken')
    const navigate = useNavigate()

    useEffect(() => {
        if (token) {
            const admin = decodeToken(token)
            if (!admin) {
                localStorage.removeItem('Admintoken')

            } else {
                console.log(admin);
            }
        } else {
            navigate('/admin/login')
        }
    })


    return (
        <div className='row'>
            <div className="col-lg-1 col-1 ">
                <Sidebar />
            </div>
            <div className=" col-lg-10 col-11  ms-4 ps-3 ">
                <BookingSlots />
            </div>
        </div>
    )
}

export default BookingSlotsPage
