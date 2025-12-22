import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
    CCard,
    CCardBody,
    CCol,
    CContainer,
    CHeader,
    CHeaderBrand,
    CHeaderNav,
    CNavItem,
    CRow,
    CButton,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
    cilBuilding,
    cilStar,
    cilBadge,
    cilTouchApp,
    cilSitemap,
    cilUser,
} from '@coreui/icons'
import authService from '../services/authService'

const Home = () => {
    const navigate = useNavigate()
    const user = authService.getCurrentUser()

    const handleLogout = () => {
        authService.logout()
    }

    const dashboardCards = [
        {
            id: 1,
            title: 'State Dashboard',
            count: '1,164',
            bgColor: 'bg-orange-500', // Tailwind class
            icon: cilBuilding,
            path: '/state-dashboard'
        },
        {
            id: 2,
            title: 'State Result Dashboard',
            count: '1,164',
            bgColor: 'bg-yellow-400',
            icon: cilStar,
            path: '/state-result-dashboard'
        },
        {
            id: 3,
            title: 'Assembly Result Dashboard',
            count: '1,164',
            bgColor: 'bg-green-500',
            icon: cilBadge,
            path: '/assembly-result-dashboard'
        },
        {
            id: 4,
            title: 'Voter Info Dashboard',
            count: '1,164',
            bgColor: 'bg-red-500',
            icon: cilTouchApp,
            path: '/voter-info-dashboard'
        },
        {
            id: 5,
            title: 'Surname Dashboard',
            count: '534',
            bgColor: 'bg-cyan-400',
            icon: cilSitemap,
            path: '/surname-dashboard' // Points to the old functionality
        },
        {
            id: 6,
            title: 'Sangathan Structure',
            count: '534',
            bgColor: 'bg-blue-500',
            icon: cilSitemap,
            path: '/sangathan-structure'
        }
    ];

    return (
        <div className="min-vh-100 bg-light">
            <CHeader className="mb-4 shadow-sm bg-white p-3">
                <CContainer fluid>
                    <div className="d-flex justify-content-between align-items-center w-100">
                        <div>
                            <h4 className="mb-1 text-dark fw-semibold">Welcome back</h4>
                            <div className="d-flex align-items-center gap-2 mt-2">
                                <div className="rounded-circle bg-success d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                                    <CIcon icon={cilUser} style={{ color: 'white' }} size="lg" />
                                </div>
                                <div>
                                    <small className="text-muted d-block" style={{ fontSize: '0.75rem' }}>User Name</small>
                                    <span className="fw-medium text-dark">{user?.name || 'bjpcg'}</span>
                                </div>
                            </div>
                        </div>

                        {/* Progress Card */}
                        <div className="d-none d-md-flex align-items-center gap-4 bg-white p-3 rounded shadow-sm">
                            <div className="text-center">
                                <div className="h4 mb-0 fw-bold text-primary">55%</div>
                            </div>
                            <div>
                                <h6 className="mb-0 fw-semibold text-dark">Your Progress</h6>
                                <small className="text-muted">Where you stand in project</small>
                            </div>
                            <CButton color="danger" className="text-white ms-3" onClick={handleLogout}>
                                Logout
                            </CButton>
                        </div>
                        {/* Mobile Logout Button (visible only on small screens) */}
                        <div className="d-md-none">
                            <CButton color="danger" size="sm" className="text-white" onClick={handleLogout}>
                                Logout
                            </CButton>
                        </div>
                    </div>
                </CContainer>
            </CHeader>

            <CContainer className="mt-4">
                <CRow className="g-4">
                    {dashboardCards.map((card) => (
                        <CCol xs={12} md={6} lg={4} key={card.id}>
                            <div
                                onClick={() => navigate(card.path)}
                                style={{ cursor: 'pointer' }}
                                className="h-100 text-decoration-none"
                            >
                                <CCard className={`border-0 shadow-sm h-100 text-white ${card.bgColor.replace('bg-', 'bg-gradient-').replace('-400', '').replace('-500', '')}`} style={{ transition: 'transform 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                                    {/* Note: using simple bg-primary etc mapping if tailwind classes fail, but tailwind is installed so we can attempt to use them or map to coreui colors if preferred. Let's try to map roughly or rely on tailwind.
                                    Since tailwind is configured, we can use the classes directly if we use className. However, CoreUI often overrides.
                                    Let's use inline styles or standard CoreUI colors for reliability if tailwind isn't perfectly set up for dynamic extraction.
                                    Actually, let's map colors to CoreUI variants or standard Bootstrap colors for safety. */}
                                    <div className={`p-4 rounded ${card.bgColor.includes('orange') ? 'bg-warning' :
                                            card.bgColor.includes('yellow') ? 'bg-warning text-dark' :
                                                card.bgColor.includes('green') ? 'bg-success' :
                                                    card.bgColor.includes('red') ? 'bg-danger' :
                                                        card.bgColor.includes('cyan') ? 'bg-info text-white' :
                                                            card.bgColor.includes('blue') ? 'bg-primary' : 'bg-primary'
                                        }`}>
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <h2 className="display-6 fw-bold mb-0">{card.count}</h2>
                                            <CIcon icon={card.icon} size="3xl" className="opacity-75" />
                                        </div>
                                        <h5 className="fw-medium mb-0">{card.title}</h5>
                                    </div>
                                </CCard>
                            </div>
                        </CCol>
                    ))}
                </CRow>
            </CContainer>
        </div>
    )
}

export default Home
