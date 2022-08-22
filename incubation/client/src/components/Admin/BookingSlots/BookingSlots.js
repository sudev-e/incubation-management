import React, { useEffect, useState } from 'react'
import '../BookingSlots/BookingSlot.css'
import { Button, Modal } from 'react-bootstrap';
import { MDBTooltip } from 'mdb-react-ui-kit';

function BookingSlots() {

    let A, B, C, D, E

    // let applicantId
    // var slotId,slotSection

    const [sectionA, setSectionA] = useState([])
    const [sectionB, setSectionB] = useState([])
    const [sectionC, setSectionC] = useState([])
    const [sectionD, setSectionD] = useState([])
    const [sectionE, setSectionE] = useState([])


    const [slotId, setSlotId] = useState()
    const [slotSection, setSlotSection] = useState()





    const [applicantsList, setApplicantsList] = useState([])

    // modal

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

 

    useEffect(() => {
        displaySlots()
        applicants()
    })


    const applicants = async () => {
        const req = await fetch('http://localhost:9000/admin/applicants/listings')
        const response = await req.json()

        const records = response.data.filter((item) => {
                return (!item.isBooked)
            })

            setApplicantsList(records)
            // console.log(applicantsList);
        }



    const displaySlots = async () => {
            const req = await fetch('http://localhost:9000/admin/slots')
            const response = await req.json()
            const slots = response.data

            A = slots.filter((item) => {
                return (item.section === 'A')
            })
            setSectionA(A)


            B = slots.filter((item) => {
                return (item.section === 'B')
            })
            setSectionB(B)


            C = slots.filter((item) => {
                return (item.section === 'C')
            })
            setSectionC(C)


            D = slots.filter((item) => {
                return (item.section === 'D')
            })
            setSectionD(D)

            E = slots.filter((item) => {
                return (item.section === 'E')
            })
            setSectionE(E)

        }
        const handleShow = (slot_id, slot_section) => {
            // slotId = slot_id
            setSlotId(slot_id)
            // slotSection=slot_section
            setSlotSection(slot_section)
            console.log(slotId, slotSection)

            setShow(true);
        }


        const slotBooking = async (id) => {
            let applicantId = id
            console.log(applicantId, slotId, slotSection);
            const req = await fetch(`http://localhost:9000/admin/slot/update?applicantId=${applicantId}&slotId=${slotId}&slotSection=${slotSection}`)

        }

        return (

            <div>
                <div className="d-flex sectionA ms-lg-5 mx-auto mb-5">
                    {
                        sectionA.map((item) => {

                            return (
                                <div className={item.isBooked ? 'slot  bg-danger' : 'slot  bg-warning'} onClick={() => {console.log('j'); return (item.isBooked ?alert(`Section ${item.section} Slot ${item.slot}   Already Booked`): handleShow(item.slot, item.section)) }}></div>
                               
                            )
                        })
                    }
                </div>
                <div className="">
                    <div className="d-flex sectionA ms-lg-5 mx-auto">
                        {sectionB &&
                            sectionB.map((item) => {
                                return (
                                    <div className={item.isBooked ? 'subSlot   bg-danger' : 'subSlot   bg-warning'} onClick={() => {console.log('g'); return (item.isBooked ? alert(`Section ${item.section} Slot ${item.slot}   Already Booked`): handleShow(item.slot, item.section)) }}></div>
                                )
                            })}
                    </div>
                    </div>
                    <div>
                    <div className="d-flex sectionA ms-lg-5 mx-auto">
                        {sectionC &&
                            sectionC.map((item) => {
                                return (
                                    <div className={item.isBooked ? 'subSlot   bg-danger' : 'subSlot   bg-warning'} onClick={() => { return (item.isBooked ?alert(`Section ${item.section} Slot ${item.slot}   Already Booked`): handleShow(item.slot, item.section)) }}></div>
                                )
                            })}
                    </div>
                    </div>
                    <div>
                    <div className="d-flex sectionA ms-lg-5 mx-auto">
                        {sectionD &&
                            sectionD.map((item) => {
                                return (
                                    <div className={item.isBooked ? 'subSlot   bg-danger' : 'subSlot   bg-warning'} onClick={() => { return (item.isBooked ? alert(`Section ${item.section} Slot ${item.slot}   Already Booked`): handleShow(item.slot, item.section)) }}></div>
                                )
                            })}
                    </div>
                    </div>
                    <div>
                    <div className="d-flex sectionA ms-lg-5 mx-auto">
                        {sectionE &&
                            sectionE.map((item) => {
                                return (
                                    <div onClick={() => { return (item.isBooked ? alert(`Section ${item.section} Slot ${item.slot}   Already Booked`) : handleShow(item.slot, item.section)) }} className={item.isBooked ? 'subSlot   bg-danger' : 'subSlot bg-warning'} ></div>
                                )
                            })}
                    </div>
                    </div>






                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Select a Company</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <select class="form-select" aria-label="Default select example"

                            onChange={(e) => {
                                slotBooking(e.target.value)
                            }}
                        >
                            <option selected>--select--</option>

                            {applicantsList &&

                                applicantsList.map((item) => {
                                    return (
                                        <option value={item._id}> {item.companyName}</option>


                                    )
                                })



                            }
                        </select>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                         
                    </Modal.Footer>
                </Modal>

                
            </div>
        )
    }

    export default BookingSlots
