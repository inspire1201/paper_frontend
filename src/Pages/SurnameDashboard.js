import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CContainer,
    CHeader,
    CHeaderBrand,
    CHeaderNav,
    CNavItem,
    CRow,
} from '@coreui/react'
import { CIcon } from '@coreui/icons-react'
import { cilArrowLeft } from '@coreui/icons'
import authService from '../services/authService'

const SurnameDashboard = () => {
    const navigate = useNavigate()
    const user = authService.getCurrentUser()

    // Navigation Button Component
    const NavigationButton = ({ onClick, title, description, color, iconPath }) => (
        <div
            onClick={onClick}
            className="d-flex align-items-center justify-content-between p-3 mb-2 border rounded cursor-pointer hover-bg-light transition"
            style={{ cursor: 'pointer', backgroundColor: '#f8f9fa' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e9ecef')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#f8f9fa')}
        >
            <div className="d-flex align-items-center gap-3">
                <div
                    className={`d-flex align-items-center justify-content-center rounded text-white`}
                    style={{ width: '32px', height: '32px', backgroundColor: color }}
                >
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        style={{ width: '20px', height: '20px' }}
                    >
                        {iconPath}
                    </svg>
                </div>
                <div>
                    <h6 className="mb-0 text-dark">{title}</h6>
                    <small className="text-body-secondary">{description}</small>
                </div>
            </div>
            <svg
                className="text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                style={{ width: '20px', height: '20px', color: '#adb5bd' }}
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
        </div>
    )

    return (
        <div className="bg-body-tertiary min-vh-100">
          

            <CContainer>
               

                <CRow className="g-4">
                    {/* LEFT SECTION: In Area */}
                    <CCol md={6}>
                        <CCard className="h-100 shadow-sm">
                            <CCardHeader className="bg-white font-weight-bold">
                                <h5 className="mb-0">In Area</h5>
                            </CCardHeader>
                            <CCardBody>
                                <div className="d-grid gap-3">
                                    <NavigationButton
                                        onClick={() => navigate('/surname-similar-search')}
                                        title="Search Surname"
                                        description="View surname entries"
                                        color="#198754" // success
                                        iconPath={
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                            />
                                        }
                                    />
                                    <NavigationButton
                                        onClick={() => navigate('/caste-search')}
                                        title="Search Caste"
                                        description="View caste statistics"
                                        color="#0d6efd" // primary
                                        iconPath={
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                            />
                                        }
                                    />
                                    <NavigationButton
                                        onClick={() => navigate('/category-search')}
                                        title="Search Category"
                                        description="View category statistics"
                                        color="#6f42c1" // purple
                                        iconPath={
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                            />
                                        }
                                    />
                                </div>
                            </CCardBody>
                        </CCard>
                    </CCol>

                    {/* RIGHT SECTION: Search Area */}
                    <CCol md={6}>
                        <CCard className="h-100 shadow-sm">
                            <CCardHeader className="bg-white font-weight-bold">
                                <h5 className="mb-0">Search Area</h5>
                            </CCardHeader>
                            <CCardBody>
                                <div className="d-grid gap-3">
                                    <NavigationButton
                                        onClick={() => navigate('/in-area/by-surname')}
                                        title="By Surname"
                                        description="Browse by surname"
                                        color="#ffc107" // warning
                                        iconPath={
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                            />
                                        }
                                    />
                                    <NavigationButton
                                        onClick={() => navigate('/in-area/by-caste')}
                                        title="By Caste"
                                        description="Browse by caste"
                                        color="#fd7e14" // orange
                                        iconPath={
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                                            />
                                        }
                                    />
                                    <NavigationButton
                                        onClick={() => navigate('/in-area/by-category')}
                                        title="By Category"
                                        description="Browse by category"
                                        color="#dc3545" // danger
                                        iconPath={
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                            />
                                        }
                                    />
                                </div>
                            </CCardBody>
                        </CCard>
                    </CCol>

                    {/* ADDITIONAL TOOLS */}
                    <CCol xs={12}>
                        <CCard className="shadow-sm">
                            <CCardHeader className="bg-white font-weight-bold">
                                <h5 className="mb-0">Additional Tools</h5>
                            </CCardHeader>
                            <CCardBody>
                                <NavigationButton
                                    onClick={() => navigate('/assembly-caste-detail')}
                                    title="Assembly Caste Detail"
                                    description="View comprehensive assembly data"
                                    color="#6610f2" // indigo
                                    iconPath={
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                    }
                                />
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    )
}

export default SurnameDashboard
