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

const ByCategory = () => {
    const navigate = useNavigate()
    const [categories, setCategories] = useState([])
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
    const [selectedCategory, setSelectedCategory] = useState('')
    const [assemblyData, setAssemblyData] = useState([])
    const [modalLoading, setModalLoading] = useState(false)
    const [modalTotalCount, setModalTotalCount] = useState(0)

    useEffect(() => {
        fetchAllCategories()
    }, [])

    const fetchAllCategories = async () => {
        setLoading(true)
        try {
            const response = await surnameService.getAllCategoriesByArea()
            if (response.success) {
                setCategories(response.data)
                toast.success(`Loaded ${response.total_categories} categories`)
            }
        } catch (error) {
            console.error('Error fetching categories:', error)
            toast.error('Failed to load category data')
        } finally {
            setLoading(false)
        }
    }

    const fetchAssemblyData = async (categoryName) => {
        setModalLoading(true)
        setSelectedCategory(categoryName)
        setShowModal(true)

        try {
            const response = await surnameService.getCategoryAssemblyDistribution(categoryName)

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
        setSelectedCategory('')
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
            return data.filter((cat) => cat.total_count >= min && cat.total_count <= max)
        }

        return data
    }

    const searchFilteredCategories = categories.filter((cat) =>
        cat.category_name.toLowerCase().includes(appliedSearchTerm.toLowerCase()),
    )

    const filteredCategories = applyFilters(searchFilteredCategories)

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
                                        <CFormLabel>Search Category</CFormLabel>
                                        <CInputGroup>
                                            <CInputGroupText>
                                                <CIcon icon={cilMagnifyingGlass} />
                                            </CInputGroupText>
                                            <CFormInput
                                                placeholder="Search category..."
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
                                                color={filterType === 'none' ? 'danger' : 'secondary'}
                                                variant={filterType === 'none' ? 'solid' : 'outline'}
                                                onClick={() => setFilterType('none')}
                                                size="sm"
                                            >
                                                None
                                            </CButton>
                                            <CButton
                                                color={filterType === 'top' ? 'danger' : 'secondary'}
                                                variant={filterType === 'top' ? 'solid' : 'outline'}
                                                onClick={() => setFilterType('top')}
                                                size="sm"
                                            >
                                                Top
                                            </CButton>
                                            <CButton
                                                color={filterType === 'range' ? 'danger' : 'secondary'}
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
                                            color="secondary"
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
                                            color="danger"
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
                            <div className="badge bg-secondary p-2">Total Categories: {categories.length}</div>
                        </div>

                        {/* Table */}
                        {loading ? (
                            <div className="text-center p-5">
                                <CSpinner color="danger" />
                            </div>
                        ) : filteredCategories.length > 0 ? (
                            <CTable hover responsive bordered>
                                <CTableHead color="light">
                                    <CTableRow>
                                        <CTableHeaderCell>SN</CTableHeaderCell>
                                        <CTableHeaderCell>Category Name</CTableHeaderCell>
                                        <CTableHeaderCell className="text-end">Total Count</CTableHeaderCell>
                                        <CTableHeaderCell className="text-center">Action</CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {filteredCategories.map((cat, index) => (
                                        <CTableRow key={index}>
                                            <CTableDataCell>{index + 1}</CTableDataCell>
                                            <CTableDataCell>{cat.category_name}</CTableDataCell>
                                            <CTableDataCell className="text-end fw-bold text-danger">{cat.total_count.toLocaleString()}</CTableDataCell>
                                            <CTableDataCell className="text-center">
                                                <CButton
                                                    color="danger"
                                                    size="sm"
                                                    className="text-white"
                                                    onClick={() => fetchAssemblyData(cat.category_name)}
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
                                <p className="mb-0">No categories found. Try adjusting filters.</p>
                            </div>
                        )}
                    </CCardBody>
                </CCard>

                {/* Modal */}
                <CModal visible={showModal} onClose={closeModal} size="lg">
                    <CModalHeader onClose={closeModal} className="bg-danger text-white">
                        <CModalTitle>Assembly Distribution - {selectedCategory}</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        {modalLoading ? (
                            <div className="text-center py-5">
                                <CSpinner color="danger" />
                            </div>
                        ) : assemblyData.length > 0 ? (
                            <>
                                <div className="alert alert-danger d-flex justify-content-between align-items-center">
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

export default ByCategory
