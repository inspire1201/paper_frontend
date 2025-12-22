import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CContainer,
    CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilArrowLeft, cilWarning } from '@coreui/icons'

const BySurname = () => {
    const navigate = useNavigate()

    return (
        <div className="bg-body-tertiary min-vh-100 p-4">
            <CContainer>
                <CCard className="mb-4 shadow-sm">
                    <CCardHeader className="bg-warning text-white p-4">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center gap-3">
                                <CButton
                                    color="light"
                                    variant="ghost"
                                    onClick={() => navigate('/')}
                                    className="text-white p-2"
                                >
                                    <CIcon icon={cilArrowLeft} size="lg" />
                                </CButton>
                                <div>
                                    <h1 className="h3 mb-0 fw-bold">By Surname</h1>
                                    <p className="mb-0 text-white-50">Browse data grouped by surname</p>
                                </div>
                            </div>
                        </div>
                    </CCardHeader>
                    <CCardBody className="p-5 text-center">
                        <div className="mb-4">
                            <div
                                className="rounded-circle bg-warning d-inline-flex align-items-center justify-content-center text-white shadow"
                                style={{ width: '100px', height: '100px' }}
                            >
                                <CIcon icon={cilWarning} size="4xl" />
                            </div>
                        </div>
                        <h2 className="display-5 fw-bold text-dark mb-3">Coming Soon</h2>
                        <p className="lead text-body-secondary mb-5">
                            This page will display surname data organized by surname groupings.
                        </p>

                        <CCard className="bg-light border-warning mb-5 mx-auto" style={{ maxWidth: '600px' }}>
                            <CCardBody className="text-start">
                                <h5 className="cw-bold mb-3">Features in Development:</h5>
                                <ul className="list-unstyled">
                                    <li className="mb-2 d-flex align-items-center">
                                        <span className="text-warning me-2">●</span> Browse all surnames alphabetically
                                    </li>
                                    <li className="mb-2 d-flex align-items-center">
                                        <span className="text-warning me-2">●</span> View associated caste and category information
                                    </li>
                                    <li className="mb-2 d-flex align-items-center">
                                        <span className="text-warning me-2">●</span> Filter by assembly and region
                                    </li>
                                    <li className="mb-2 d-flex align-items-center">
                                        <span className="text-warning me-2">●</span> Export data for analysis
                                    </li>
                                </ul>
                            </CCardBody>
                        </CCard>

                        <CButton color="warning" className="text-white px-4 py-2" onClick={() => navigate('/')}>
                            Back to Home
                        </CButton>
                    </CCardBody>
                </CCard>
            </CContainer>
        </div>
    )
}

export default BySurname
