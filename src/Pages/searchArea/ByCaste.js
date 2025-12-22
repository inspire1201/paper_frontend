import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CContainer,
    CFormInput,
    CFormLabel,
    CInputGroup,
    CInputGroupText,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CRow,
    CSpinner,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilArrowLeft, cilFilter, cilMagnifyingGlass, cilReload } from '@coreui/icons'
import surnameService from '../../services/surnameService'

const ByCaste = () => {
    const navigate = useNavigate()
    const [castes, setCastes] = useState([])
    const [loading, setLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')

    // Filter state
    const [filterType, setFilterType] = useState('none')
    const [topN, setTopN] = useState('10')
    const [rangeMin, setRangeMin] = useState('')
    const [rangeMax, setRangeMax] = useState('')

    // Applied filter state
    const [appliedSearchTerm, setAppliedSearchTerm] = useState('')
    const [appliedFilterType, setAppliedFilterType] = useState('none')
    const [appliedTopN, setAppliedTopN] = useState('10')
    const [appliedRangeMin, setAppliedRangeMin] = useState('')
    const [appliedRangeMax, setAppliedRangeMax] = useState('')

    // Modal state
    const [showModal, setShowModal] = useState(false)
    const [selectedCaste, setSelectedCaste] = useState('')
    const [assemblyData, setAssemblyData] = useState([])
    const [modalLoading, setModalLoading] = useState(false)
    const [modalTotalCount, setModalTotalCount] = useState(0)

    useEffect(() => {
        fetchAllCastes()
    }, [])

    const fetchAllCastes = async () => {
        setLoading(true)
        try {
            const response = await surnameService.getAllCastesByArea()
            if (response.success) {
                setCastes(response.data)
                toast.success(`Loaded ${response.total_castes} castes`)
            }
        } catch (error) {
            console.error('Error fetching castes:', error)
            toast.error('Failed to load caste data')
        } finally {
            setLoading(false)
        }
    }

    const fetchAssemblyData = async (casteName) => {
        setModalLoading(true)
        setSelectedCaste(casteName)
        setShowModal(true)

        try {
            const response = await surnameService.getCasteAssemblyDistribution(casteName)

            if (response.success) {
                setAssemblyData(response.data)
                setModalTotalCount(response.total_count)
            }
        } catch (error) {
            console.error('Error fetching assembly data:', error)
            toast.error('Failed to load assembly data')
        } finally {
            setModalLoading(false)
        }
    }

    const closeModal = () => {
        setShowModal(false)
        setAssemblyData([])
        setSelectedCaste('')
        setModalTotalCount(0)
    }

    const applyFilters = (data) => {
        if (appliedFilterType === 'none') {
            return data
        }

        if (appliedFilterType === 'top') {
            const n = parseInt(appliedTopN) || 10
            return [...data].sort((a, b) => b.total_count - a.total_count).slice(0, n)
        }

        if (appliedFilterType === 'range') {
            const min = parseInt(appliedRangeMin) || 0
            const max = parseInt(appliedRangeMax) || Infinity
            return data.filter((caste) => caste.total_count >= min && caste.total_count <= max)
        }

        return data
    }

    const searchFilteredCastes = castes.filter((caste) =>
        caste.caste_name.toLowerCase().includes(appliedSearchTerm.toLowerCase()),
    )

    const filteredCastes = applyFilters(searchFilteredCastes)

    return (
        <div className="bg-body-tertiary min-vh-100 p-4">
            <CContainer>
                <CCard className="mb-4 shadow-sm">
                    <CCardBody className="p-4">
                        {/* Search and Filters */}
                        <CCard className="mb-4 bg-light border-0">
                            <CCardBody>
                                <h5 className="mb-3 d-flex align-items-center">
                                    <CIcon icon={cilFilter} className="me-2" /> Search & Filter
                                </h5>
                                <CRow className="g-3">
                                    <CCol md={12}>
                                        <CFormLabel>Search Caste</CFormLabel>
                                        <CInputGroup>
                                            <CInputGroupText>
                                                <CIcon icon={cilMagnifyingGlass} />
                                            </CInputGroupText>
                                            <CFormInput
                                                placeholder="Search caste..."
                                                value={searchTerm}
                                                onChange={(e) => {
                                                    setSearchTerm(e.target.value)
                                                    setAppliedSearchTerm(e.target.value)
                                                }}
                                            />
                                        </CInputGroup>
                                    </CCol>

                                    <CCol md={12}>
                                        <CFormLabel>Filter by Total Count</CFormLabel>
                                        <div className="d-flex gap-2 flex-wrap">
                                            <CButton
                                                color={filterType === 'none' ? 'primary' : 'secondary'}
                                                variant={filterType === 'none' ? 'solid' : 'outline'}
                                                onClick={() => setFilterType('none')}
                                                size="sm"
                                            >
                                                None
                                            </CButton>
                                            <CButton
                                                color={filterType === 'top' ? 'primary' : 'secondary'}
                                                variant={filterType === 'top' ? 'solid' : 'outline'}
                                                onClick={() => setFilterType('top')}
                                                size="sm"
                                            >
                                                Top
                                            </CButton>
                                            <CButton
                                                color={filterType === 'range' ? 'primary' : 'secondary'}
                                                variant={filterType === 'range' ? 'solid' : 'outline'}
                                                onClick={() => setFilterType('range')}
                                                size="sm"
                                            >
                                                Range
                                            </CButton>
                                        </div>
                                    </CCol>

                                    {filterType === 'top' && (
                                        <CCol md={4}>
                                            <CFormLabel>Show Top N</CFormLabel>
                                            <CFormInput
                                                type="number"
                                                value={topN}
                                                onChange={(e) => setTopN(e.target.value)}
                                                placeholder="10"
                                            />
                                        </CCol>
                                    )}

                                    {filterType === 'range' && (
                                        <CCol md={12}>
                                            <CRow className="g-2">
                                                <CCol md={6}>
                                                    <CFormInput
                                                        type="number"
                                                        value={rangeMin}
                                                        onChange={(e) => setRangeMin(e.target.value)}
                                                        placeholder="Min Count"
                                                    />
                                                </CCol>
                                                <CCol md={6}>
                                                    <CFormInput
                                                        type="number"
                                                        value={rangeMax}
                                                        onChange={(e) => setRangeMax(e.target.value)}
                                                        placeholder="Max Count"
                                                    />
                                                </CCol>
                                            </CRow>
                                        </CCol>
                                    )}

                                    <CCol md={12} className="d-flex justify-content-end gap-2 mt-3">
                                        <CButton
                                            color="danger"
                                            variant="ghost"
                                            onClick={() => {
                                                setSearchTerm('')
                                                setFilterType('none')
                                                setTopN('10')
                                                setRangeMin('')
                                                setRangeMax('')
                                                setAppliedSearchTerm('')
                                                setAppliedFilterType('none')
                                                setAppliedTopN('10')
                                                setAppliedRangeMin('')
                                                setAppliedRangeMax('')
                                                toast.success('Filters reset successfully!')
                                            }}
                                        >
                                            <CIcon icon={cilReload} className="me-1" /> Reset
                                        </CButton>
                                        <CButton
                                            color="primary"
                                            onClick={() => {
                                                setAppliedFilterType(filterType)
                                                setAppliedTopN(topN)
                                                setAppliedRangeMin(rangeMin)
                                                setAppliedRangeMax(rangeMax)
                                                toast.success('Filters applied successfully!')
                                            }}
                                        >
                                            Apply Filters
                                        </CButton>
                                    </CCol>
                                </CRow>
                            </CCardBody>
                        </CCard>

                        {/* Resume Stats */}
                        <div className="d-flex justify-content-end mb-3">
                            <div className="badge bg-secondary p-2">Total Castes: {castes.length}</div>
                        </div>

                        {/* Table */}
                        {loading ? (
                            <div className="text-center p-5">
                                <CSpinner color="primary" />
                            </div>
                        ) : filteredCastes.length > 0 ? (
                            <CTable hover responsive bordered>
                                <CTableHead color="light">
                                    <CTableRow>
                                        <CTableHeaderCell>SN</CTableHeaderCell>
                                        <CTableHeaderCell>Caste Name</CTableHeaderCell>
                                        <CTableHeaderCell className="text-end">Total Count</CTableHeaderCell>
                                        <CTableHeaderCell className="text-center">Action</CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {filteredCastes.map((caste, index) => (
                                        <CTableRow key={index}>
                                            <CTableDataCell>{index + 1}</CTableDataCell>
                                            <CTableDataCell>{caste.caste_name}</CTableDataCell>
                                            <CTableDataCell className="text-end fw-bold text-primary">{caste.total_count.toLocaleString()}</CTableDataCell>
                                            <CTableDataCell className="text-center">
                                                <CButton
                                                    color="info"
                                                    size="sm"
                                                    className="text-white"
                                                    onClick={() => fetchAssemblyData(caste.caste_name)}
                                                >
                                                    View Assemblies
                                                </CButton>
                                            </CTableDataCell>
                                        </CTableRow>
                                    ))}
                                </CTableBody>
                            </CTable>
                        ) : (
                            <div className="text-center p-5 text-body-secondary border rounded bg-light">
                                <p className="mb-0">No castes found. Try adjusting filters.</p>
                            </div>
                        )}
                    </CCardBody>
                </CCard>

                {/* Modal */}
                <CModal visible={showModal} onClose={closeModal} size="lg">
                    <CModalHeader onClose={closeModal} className="bg-primary text-white">
                        <CModalTitle>Assembly Distribution - {selectedCaste}</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        {modalLoading ? (
                            <div className="text-center py-5">
                                <CSpinner color="primary" />
                            </div>
                        ) : assemblyData.length > 0 ? (
                            <>
                                <div className="alert alert-info d-flex justify-content-between align-items-center">
                                    <strong>Total Count:</strong> <span className="h5 mb-0">{modalTotalCount.toLocaleString()}</span>
                                </div>
                                <CTable striped hover responsive small>
                                    <CTableHead>
                                        <CTableRow>
                                            <CTableHeaderCell>SN</CTableHeaderCell>
                                            <CTableHeaderCell>Assembly Name</CTableHeaderCell>
                                            <CTableHeaderCell className="text-end">Count</CTableHeaderCell>
                                        </CTableRow>
                                    </CTableHead>
                                    <CTableBody>
                                        {assemblyData.map((assembly, idx) => (
                                            <CTableRow key={idx}>
                                                <CTableDataCell>{idx + 1}</CTableDataCell>
                                                <CTableDataCell>{assembly.assembly_name}</CTableDataCell>
                                                <CTableDataCell className="text-end fw-bold">{assembly.count.toLocaleString()}</CTableDataCell>
                                            </CTableRow>
                                        ))}
                                    </CTableBody>
                                </CTable>
                            </>
                        ) : (
                            <p className="text-center py-4">No assembly data available</p>
                        )}
                    </CModalBody>
                    <CModalFooter>
                        <CButton color="secondary" onClick={closeModal}>Close</CButton>
                    </CModalFooter>
                </CModal>

            </CContainer>
        </div>
    )
}

export default ByCaste
