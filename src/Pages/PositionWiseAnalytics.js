import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import electionResultsService from '../services/electionResultsService'
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CContainer,
    CRow,
    CNav,
    CNavItem,
    CNavLink,
    CTable,
    CTableHead,
    CTableRow,
    CTableHeaderCell,
    CTableBody,
    CTableDataCell,
    CSpinner,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilArrowLeft, cilMenu } from '@coreui/icons'

const PositionWiseAnalytics = () => {
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState(1) // 1: 1st Position, 2: 2nd Position, 3: 3rd Position
    const [loading, setLoading] = useState(true)
    const [positionData, setPositionData] = useState({
        assembly: [],
        parliament: []
    })
    const [electionYears, setElectionYears] = useState([])
    const totalSeats = 90 // Total number of seats

    // Modal state
    const [showModal, setShowModal] = useState(false)
    const [modalData, setModalData] = useState(null)
    const [modalLoading, setModalLoading] = useState(false)
    const [modalInfo, setModalInfo] = useState({ party: '', year: '', electionType: '' })

    // Fetch position-wise analytics data
    useEffect(() => {
        fetchPositionData(activeTab)
    }, [activeTab])

    const fetchPositionData = async (position) => {
        setLoading(true)
        try {
            const positionMap = {
                1: '1',
                2: '2',
                3: '3'
            }

            const result = await electionResultsService.getPositionAnalytics(positionMap[position])

            if (result.success) {
                setPositionData({
                    assembly: result.data.assembly || [],
                    parliament: result.data.parliament || []
                })
                setElectionYears(result.data.years || [])
            }
        } catch (error) {
            console.error('Error fetching position data:', error)
            // Set empty data on error
            setPositionData({
                assembly: [],
                parliament: []
            })
            setElectionYears([])
        } finally {
            setLoading(false)
        }
    }

    // Handle seat count click to show details
    const handleSeatClick = async (party, year, electionType) => {
        setShowModal(true)
        setModalLoading(true)
        setModalInfo({ party, year, electionType })

        try {
            const positionMap = {
                1: '1',
                2: '2',
                3: '3'
            }

            const result = await electionResultsService.getPositionDetailsByParty(
                positionMap[activeTab],
                party,
                year,
                electionType
            )

            if (result.success) {
                setModalData(result.data.constituencies)
            } else {
                setModalData([])
            }
        } catch (error) {
            console.error('Error fetching position details:', error)
            setModalData([])
        } finally {
            setModalLoading(false)
        }
    }

    const getTabTitle = () => {
        switch (activeTab) {
            case 1:
                return '1st/Win/(1st) Analysis'
            case 2:
                return '2nd (Runner Up) Analysis'
            case 3:
                return '3rd Position Analysis'
            default:
                return '1st/Win/(1st) Analysis'
        }
    }

    const getPositionSuffix = () => {
        switch (activeTab) {
            case 1:
                return '1ST'
            case 2:
                return '2ND'
            case 3:
                return '3RD'
            default:
                return '1ST'
        }
    }

    const renderTable = (data, title, electionType) => {
        return (
            <CCard className="mb-4 shadow-sm">
                <CCardHeader className="bg-light">
                    <h6 className="mb-0 fw-semibold text-dark">{title}</h6>
                </CCardHeader>
                <CCardBody className="p-0">
                    <div className="table-responsive">
                        <CTable hover bordered className="mb-0">
                            <CTableHead>
                                <CTableRow>
                                    <CTableHeaderCell
                                        className="text-center align-middle bg-light"
                                        style={{ width: '80px', fontWeight: '600' }}
                                    >
                                        #
                                    </CTableHeaderCell>
                                    <CTableHeaderCell
                                        className="text-center align-middle bg-info text-white"
                                        style={{ fontWeight: '600' }}
                                    >
                                        No. of ACs
                                    </CTableHeaderCell>
                                    {electionYears.map((year) => (
                                        <CTableHeaderCell
                                            key={year}
                                            className="text-center align-middle text-white"
                                            style={{
                                                backgroundColor: getYearColor(year),
                                                fontWeight: '600',
                                                minWidth: '100px'
                                            }}
                                        >
                                            {getYearLabel(year)}
                                        </CTableHeaderCell>
                                    ))}
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {/* Total Seats Row */}
                                <CTableRow className="bg-info bg-opacity-10">
                                    <CTableDataCell className="text-center fw-semibold"></CTableDataCell>
                                    <CTableDataCell className="text-center fw-semibold">
                                        {totalSeats}
                                    </CTableDataCell>
                                    {electionYears.map((year) => (
                                        <CTableDataCell key={year} className="text-center fw-semibold">
                                            {totalSeats}
                                        </CTableDataCell>
                                    ))}
                                </CTableRow>

                                {/* Party Rows */}
                                {data.map((partyData, index) => (
                                    <CTableRow key={index}>
                                        <CTableDataCell
                                            className="text-center fw-bold text-white align-middle"
                                            style={{
                                                backgroundColor: partyData.color,
                                                fontSize: '0.9rem'
                                            }}
                                        >
                                            {partyData.party}
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center">-</CTableDataCell>
                                        {electionYears.map((year) => {
                                            const value = partyData.years[year]
                                            return (
                                                <CTableDataCell
                                                    key={year}
                                                    className="text-center align-middle"
                                                >
                                                    {value !== null && value !== undefined && value > 0 ? (
                                                        <span
                                                            className="badge fw-semibold px-3 py-2"
                                                            style={{
                                                                backgroundColor: '#8BC34A',
                                                                color: 'white',
                                                                fontSize: '0.85rem',
                                                                minWidth: '40px',
                                                                display: 'inline-block',
                                                                cursor: 'pointer'
                                                            }}
                                                            onClick={() => handleSeatClick(partyData.party, year, electionType)}
                                                        >
                                                            {value}
                                                        </span>
                                                    ) : (
                                                        <span className="text-muted">-</span>
                                                    )}
                                                </CTableDataCell>
                                            )
                                        })}
                                    </CTableRow>
                                ))}
                            </CTableBody>
                        </CTable>
                    </div>
                </CCardBody>
            </CCard>
        )
    }

    const getYearColor = (year) => {
        const colors = {
            2008: '#E57373',
            2009: '#F06292',
            2013: '#EF5350',
            2014: '#EC407A',
            2018: '#E53935',
            2019: '#D32F2F'
        }
        return colors[year] || '#E57373'
    }

    const getYearLabel = (year) => {
        // Determine election type from data
        // If we have assembly data for this year, check if it's AC or PE
        const assemblyEntry = positionData.assembly.find(p => p.years && p.years[year] !== undefined)
        const parliamentEntry = positionData.parliament.find(p => p.years && p.years[year] !== undefined)

        if (assemblyEntry && assemblyEntry.years[year] !== null) {
            return `AE ${year}` // Assembly Election
        } else if (parliamentEntry && parliamentEntry.years[year] !== null) {
            return `PE ${year}` // Parliament Election
        }

        return `${year}`
    }

    if (loading) {
        return (
            <div className="bg-body-tertiary min-vh-100 d-flex justify-content-center align-items-center">
                <CSpinner color="primary" size="lg" />
            </div>
        )
    }

    return (
        <div className="bg-body-tertiary min-vh-100">
            <CContainer fluid>

                {/* Navigation Tabs */}
                <CCard className="mb-4 shadow-sm">
                    <CCardBody className="p-0">
                        <CNav variant="tabs" role="tablist" className="border-bottom-0">
                            <CNavItem>
                                <CNavLink
                                    href="#!"
                                    active={activeTab === 1}
                                    onClick={() => setActiveTab(1)}
                                    style={{
                                        cursor: 'pointer',
                                        borderTopLeftRadius: '0.375rem',
                                        fontWeight: activeTab === 1 ? '600' : '400'
                                    }}
                                    className={activeTab === 1 ? 'bg-primary text-white' : ''}
                                >
                                    1st/Win/(1st) Analysis
                                </CNavLink>
                            </CNavItem>
                            <CNavItem>
                                <CNavLink
                                    href="#!"
                                    active={activeTab === 2}
                                    onClick={() => setActiveTab(2)}
                                    style={{
                                        cursor: 'pointer',
                                        fontWeight: activeTab === 2 ? '600' : '400'
                                    }}
                                    className={activeTab === 2 ? 'bg-primary text-white' : ''}
                                >
                                    2nd (Runner Up) Analysis
                                </CNavLink>
                            </CNavItem>
                            <CNavItem>
                                <CNavLink
                                    href="#!"
                                    active={activeTab === 3}
                                    onClick={() => setActiveTab(3)}
                                    style={{
                                        cursor: 'pointer',
                                        fontWeight: activeTab === 3 ? '600' : '400'
                                    }}
                                    className={activeTab === 3 ? 'bg-primary text-white' : ''}
                                >
                                    3rd Position Analysis
                                </CNavLink>
                            </CNavItem>
                        </CNav>
                    </CCardBody>
                </CCard>

                {/* Assembly Constituency Table */}
                {renderTable(
                    positionData.assembly,
                    `${getPositionSuffix()} Position - Assembly Constituency Wise`,
                    'AC'
                )}

                {/* Parliamentary Constituency Table */}
                {renderTable(
                    positionData.parliament,
                    `${getPositionSuffix()} Position - Parliamentary Constituency Wise`,
                    'PE'
                )}

                {/* Pagination */}
                <CRow className="mb-4">
                    <CCol className="d-flex justify-content-end">
                        <nav>
                            <ul className="pagination mb-0">
                                <li className="page-item disabled">
                                    <span className="page-link">«</span>
                                </li>
                                <li className="page-item active">
                                    <span className="page-link">1</span>
                                </li>
                                <li className="page-item">
                                    <a className="page-link" href="#!">2</a>
                                </li>
                                <li className="page-item">
                                    <a className="page-link" href="#!">3</a>
                                </li>
                                <li className="page-item">
                                    <a className="page-link" href="#!">»</a>
                                </li>
                            </ul>
                        </nav>
                    </CCol>
                </CRow>

                {/* Details Modal */}
                <CModal size="xl" visible={showModal} onClose={() => setShowModal(false)}>
                    <CModalHeader>
                        <CModalTitle>
                            {modalInfo.party} - {modalInfo.electionType === 'AC' ? 'Assembly' : 'Parliament'} {modalInfo.year} - Position {activeTab} Details
                        </CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        {modalLoading ? (
                            <div className="text-center py-4">
                                <CSpinner color="primary" />
                            </div>
                        ) : modalData && modalData.length > 0 ? (
                            <div className="table-responsive">
                                <CTable striped hover>
                                    <CTableHead>
                                        <CTableRow>
                                            <CTableHeaderCell className="text-center">#</CTableHeaderCell>
                                            <CTableHeaderCell className="text-center">Assembly ID</CTableHeaderCell>
                                            <CTableHeaderCell className="text-center">Assembly Name</CTableHeaderCell>
                                            <CTableHeaderCell className="text-center">
                                                {modalInfo.electionType === 'AC' ? 'AE' : 'PE'} {modalInfo.year} - Party
                                            </CTableHeaderCell>
                                        </CTableRow>
                                    </CTableHead>
                                    <CTableBody>
                                        {modalData.map((row, index) => {
                                            // Map year to column name
                                            const yearColumnMap = {
                                                '2008': 'ele_ae_2008',
                                                '2009': 'ele_pe_2009',
                                                '2013': 'ele_ae_2013',
                                                '2014': 'ele_pe_2014',
                                                '2018': 'ele_ae_2018',
                                                '2019': 'ele_pe_2019'
                                            };
                                            const columnName = yearColumnMap[modalInfo.year];
                                            const partyValue = row[columnName];

                                            return (
                                                <CTableRow key={index}>
                                                    <CTableDataCell className="text-center">{index + 1}</CTableDataCell>
                                                    <CTableDataCell className="text-center fw-semibold">{row.assembly_id || row.ac_no}</CTableDataCell>
                                                    <CTableDataCell className="text-start fw-semibold">{row.assembly_name || '-'}</CTableDataCell>
                                                    <CTableDataCell className="text-center">
                                                        <span
                                                            className="badge px-3 py-2"
                                                            style={{
                                                                backgroundColor: partyValue === modalInfo.party ? '#8BC34A' : '#9E9E9E',
                                                                color: 'white',
                                                                fontSize: '0.85rem'
                                                            }}
                                                        >
                                                            {partyValue}
                                                        </span>
                                                    </CTableDataCell>
                                                </CTableRow>
                                            );
                                        })}
                                    </CTableBody>
                                </CTable>
                            </div>
                        ) : (
                            <div className="text-center py-4">
                                <p className="text-muted">No detailed data available</p>
                            </div>
                        )}
                    </CModalBody>
                    <CModalFooter>
                        <CButton color="secondary" onClick={() => setShowModal(false)}>
                            Close
                        </CButton>
                    </CModalFooter>
                </CModal>
            </CContainer>
        </div>
    )
}

export default PositionWiseAnalytics
