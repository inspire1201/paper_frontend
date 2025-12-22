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
    CFormCheck,
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
    CProgress,
    CProgressBar,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
    cilArrowLeft,
    cilCheckCircle,
    cilFilter,
    cilList,
    cilMagnifyingGlass,
    cilReload,
    cilWarning,
} from '@coreui/icons'
import surnameService from '../../services/surnameService'

const CasteSearch = () => {
    const navigate = useNavigate()
    const [assemblies, setAssemblies] = useState([])
    const [selectedAssemblies, setSelectedAssemblies] = useState([])
    const [selectAll, setSelectAll] = useState(false)
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(false)
    const [assemblyLoading, setAssemblyLoading] = useState(false)
    const [viewMode, setViewMode] = useState('separate')
    const [searchTerm, setSearchTerm] = useState('')

    // Filter state
    const [filterType, setFilterType] = useState('none')
    const [topN, setTopN] = useState('10')
    const [rangeMin, setRangeMin] = useState('')
    const [rangeMax, setRangeMax] = useState('')

    // Modal state
    const [showSurnameModal, setShowSurnameModal] = useState(false)
    const [surnameDetails, setSurnameDetails] = useState(null)
    const [surnameLoading, setSurnameLoading] = useState(false)
    const [selectedCaste, setSelectedCaste] = useState('')
    const [currentAssemblyParam, setCurrentAssemblyParam] = useState('')

    useEffect(() => {
        fetchAssemblies()
    }, [])

    const fetchAssemblies = async () => {
        setAssemblyLoading(true)
        try {
            const response = await surnameService.getAssemblies()
            if (response.success) {
                setAssemblies(response.data)
            }
        } catch (error) {
            console.error('Error fetching assemblies:', error)
            toast.error('Failed to load assemblies.')
        } finally {
            setAssemblyLoading(false)
        }
    }

    const handleSearch = async () => {
        setLoading(true)
        try {
            let assemblyParam = ''
            if (selectAll) {
                assemblyParam = 'all'
            } else if (selectedAssemblies.length > 0) {
                assemblyParam = selectedAssemblies.join(',')
            } else {
                toast.error('Please select at least one assembly.')
                setLoading(false)
                return
            }

            const data = await surnameService.getCasteStats(assemblyParam, viewMode)
            setCurrentAssemblyParam(assemblyParam)

            let resultData = data
            if (!Array.isArray(resultData)) {
                resultData = [resultData]
            }

            setResults(resultData)
            toast.success('Stats loaded successfully!')
        } catch (error) {
            console.error('Error fetching caste stats:', error)
            toast.error('Failed to load caste statistics.')
        } finally {
            setLoading(false)
        }
    }

    const getTotalCount = (stats) => {
        return stats.reduce((sum, stat) => sum + stat.total_count, 0)
    }

    const applyFilters = (stats) => {
        if (filterType === 'none') {
            return stats
        }

        if (filterType === 'top') {
            const n = parseInt(topN) || 10
            return [...stats].sort((a, b) => b.total_count - a.total_count).slice(0, n)
        }

        if (filterType === 'range') {
            const min = parseInt(rangeMin) || 0
            const max = parseInt(rangeMax) || Infinity
            return stats.filter((stat) => stat.total_count >= min && stat.total_count <= max)
        }

        return stats
    }

    const fetchSurnameDetails = async (caste, assemblyId, assemblyIdsString) => {
        setSurnameLoading(true)
        setSelectedCaste(caste)
        setShowSurnameModal(true)

        try {
            let assembly_param
            if (assemblyIdsString) {
                assembly_param = assemblyIdsString
            } else if (assemblyId === 0 || !assemblyId) {
                assembly_param = 'all'
            } else {
                assembly_param = assemblyId
            }

            const data = await surnameService.getSurnameDetails(caste, assembly_param)
            setSurnameDetails(data)
        } catch (error) {
            console.error('Error fetching surname details:', error)
            toast.error('Failed to load surname details.')
        } finally {
            setSurnameLoading(false)
        }
    }

    const closeSurnameModal = () => {
        setShowSurnameModal(false)
        setSurnameDetails(null)
        setSelectedCaste('')
    }

    const filteredAssemblies = assemblies.filter((assembly) =>
        assembly.assembly_name.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    return (
        <div className="bg-body-tertiary min-vh-100 p-4">
            <CContainer>
                <CCard className="mb-4 shadow-sm">


                    <CCardBody className="p-4">
                        {/* Assembly Selection */}
                        <CCard className="mb-4 bg-light border-0">
                            <CCardHeader className="bg-info text-white">
                                <h5 className="mb-0"><CIcon icon={cilList} className="me-2" /> Select Assemblies</h5>
                            </CCardHeader>
                            <CCardBody>
                                {/* Actions */}
                                <div className="d-flex justify-content-end align-items-center mb-3 flex-wrap gap-2">
                                    {(selectAll || selectedAssemblies.length > 0) && (
                                        <CButton
                                            color="danger"
                                            size="sm"
                                            variant="ghost"
                                            onClick={() => {
                                                setSelectAll(false)
                                                setSelectedAssemblies([])
                                                setViewMode('separate')
                                            }}
                                        >
                                            Reset Selection
                                        </CButton>
                                    )}
                                </div>

                                {/* Search & List */}
                                {!selectAll && (
                                    <>
                                        <CInputGroup className="mb-3" style={{ maxWidth: '400px' }}>
                                            <CInputGroupText><CIcon icon={cilMagnifyingGlass} /></CInputGroupText>
                                            <CFormInput
                                                placeholder="Search assemblies..."
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                            />
                                        </CInputGroup>
                                        <div className="border rounded p-2 bg-white" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                                            {assemblyLoading ? (
                                                <div className="text-center"><CSpinner size="sm" /></div>
                                            ) : filteredAssemblies.length > 0 ? (
                                                <>
                                                    {/* Select All Checkbox for filtered assemblies */}
                                                    <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-2">
                                                        <div className="form-check">
                                                            <input
                                                                className="form-check-input"
                                                                type="checkbox"
                                                                id="select-all-filtered"
                                                                checked={selectAll || filteredAssemblies.every(assembly => selectedAssemblies.includes(assembly.assembly_id))}
                                                                onChange={(e) => {
                                                                    if (e.target.checked) {
                                                                        // Set selectAll to true, which will send assembly_id='all'
                                                                        setSelectAll(true)
                                                                        setSelectedAssemblies([])
                                                                        setViewMode('combined') // Automatically set to combined
                                                                    } else {
                                                                        // Uncheck - set selectAll to false
                                                                        setSelectAll(false)
                                                                        setSelectedAssemblies([])
                                                                        setViewMode('separate') // Automatically set to separate
                                                                    }
                                                                }}
                                                            />
                                                            <label className="form-check-label fw-bold" htmlFor="select-all-filtered">
                                                                Select All ({filteredAssemblies.length})
                                                            </label>
                                                        </div>
                                                        {selectedAssemblies.length > 0 && (
                                                            <CButton
                                                                color="info"
                                                                size="sm"
                                                                variant="ghost"
                                                                onClick={() => {
                                                                    setSelectAll(false)
                                                                    setSelectedAssemblies([])
                                                                    setViewMode('separate')
                                                                }}
                                                            >
                                                                Reset
                                                            </CButton>
                                                        )}
                                                    </div>
                                                    {filteredAssemblies.map((assembly) => (
                                                        <div key={assembly.id} className="form-check">
                                                            <input
                                                                className="form-check-input"
                                                                type="checkbox"
                                                                id={`assembly-${assembly.id}`}
                                                                checked={selectedAssemblies.includes(assembly.assembly_id)}
                                                                onChange={(e) => {
                                                                    if (e.target.checked) {
                                                                        setSelectedAssemblies([...selectedAssemblies, assembly.assembly_id])
                                                                    } else {
                                                                        setSelectedAssemblies(selectedAssemblies.filter(id => id !== assembly.assembly_id))
                                                                    }
                                                                }}
                                                            />
                                                            <label className="form-check-label" htmlFor={`assembly-${assembly.id}`}>
                                                                {assembly.assembly_name}
                                                            </label>
                                                        </div>
                                                    ))}
                                                </>
                                            ) : (
                                                <p className="text-center text-muted mb-0">No assemblies found</p>
                                            )}
                                        </div>
                                    </>
                                )}


                                {/* Filters */}
                                <hr />
                                <div className="mb-3">
                                    <CFormLabel className="fw-bold mb-3">Filter Results</CFormLabel>
                                    <CRow className="g-3">
                                        {/* Filter Type Selection */}
                                        <CCol md={12}>
                                            <div className="d-flex gap-2 flex-wrap">
                                                <CButton
                                                    color={filterType === 'none' ? 'info' : 'outline-info'}
                                                    size="sm"
                                                    onClick={() => setFilterType('none')}
                                                    className="px-3"
                                                >
                                                    No Filter
                                                </CButton>
                                                <CButton
                                                    color={filterType === 'top' ? 'info' : 'outline-info'}
                                                    size="sm"
                                                    onClick={() => setFilterType('top')}
                                                    className="px-3"
                                                >
                                                    Top N
                                                </CButton>
                                                <CButton
                                                    color={filterType === 'range' ? 'info' : 'outline-info'}
                                                    size="sm"
                                                    onClick={() => setFilterType('range')}
                                                    className="px-3"
                                                >
                                                    Range
                                                </CButton>
                                            </div>
                                        </CCol>

                                        {/* Filter Options */}
                                        {filterType === 'top' && (
                                            <CCol md={6} lg={4}>
                                                <CFormLabel htmlFor="topN" className="small text-muted">Number of Top Results</CFormLabel>
                                                <CFormInput
                                                    id="topN"
                                                    type="number"
                                                    placeholder="Enter number (e.g., 10)"
                                                    value={topN}
                                                    onChange={(e) => setTopN(e.target.value)}
                                                    min="1"
                                                />
                                            </CCol>
                                        )}
                                        {filterType === 'range' && (
                                            <>
                                                <CCol md={6} lg={3}>
                                                    <CFormLabel htmlFor="rangeMin" className="small text-muted">Minimum Count</CFormLabel>
                                                    <CFormInput
                                                        id="rangeMin"
                                                        type="number"
                                                        placeholder="Min"
                                                        value={rangeMin}
                                                        onChange={(e) => setRangeMin(e.target.value)}
                                                        min="0"
                                                    />
                                                </CCol>
                                                <CCol md={6} lg={3}>
                                                    <CFormLabel htmlFor="rangeMax" className="small text-muted">Maximum Count</CFormLabel>
                                                    <CFormInput
                                                        id="rangeMax"
                                                        type="number"
                                                        placeholder="Max"
                                                        value={rangeMax}
                                                        onChange={(e) => setRangeMax(e.target.value)}
                                                        min="0"
                                                    />
                                                </CCol>
                                            </>
                                        )}
                                    </CRow>
                                </div>

                                {/* View Mode */}
                                {(selectAll || selectedAssemblies.length > 1) && (
                                    <div className="mb-3">
                                        <CFormLabel className="fw-bold mb-2">View Mode</CFormLabel>
                                        <div className="d-flex gap-2 flex-wrap">
                                            <CButton
                                                size="sm"
                                                color={viewMode === 'separate' ? 'info' : 'outline-info'}
                                                onClick={() => setViewMode('separate')}
                                                className="px-3"
                                            >
                                                From Each Assembly
                                            </CButton>
                                            <CButton
                                                size="sm"
                                                color={viewMode === 'combined' ? 'info' : 'outline-info'}
                                                onClick={() => setViewMode('combined')}
                                                className="px-3"
                                            >
                                                Combined From All
                                            </CButton>
                                        </div>
                                    </div>
                                )}

                                <div className="d-grid gap-2 mt-4">
                                    <CButton color="info" className="text-white" onClick={handleSearch} disabled={loading || (!selectAll && selectedAssemblies.length === 0)}>
                                        {loading ? <CSpinner size="sm" /> : 'Submit'}
                                    </CButton>
                                </div>
                            </CCardBody>
                        </CCard>

                        {/* Results */}
                        {results.map((assemblyData, index) => (
                            <CCard key={index} className="mb-4 border-info">
                                <CCardHeader className="bg-info text-white d-flex justify-content-between align-items-center">
                                    <strong>{assemblyData.assembly?.assembly_name || 'Unknown Assembly'}</strong>
                                    <span className="badge bg-light text-info">Total: {getTotalCount(assemblyData.stats).toLocaleString()}</span>
                                </CCardHeader>
                                <CTable hover responsive className="mb-0">
                                    <CTableHead>
                                        <CTableRow>
                                            <CTableHeaderCell>SN</CTableHeaderCell>
                                            <CTableHeaderCell>Caste</CTableHeaderCell>
                                            <CTableHeaderCell className="text-end">Count</CTableHeaderCell>
                                            <CTableHeaderCell className="text-center">Details</CTableHeaderCell>
                                            <CTableHeaderCell>Percentage</CTableHeaderCell>
                                        </CTableRow>
                                    </CTableHead>
                                    <CTableBody>
                                        {applyFilters(assemblyData.stats).map((stat, idx) => {
                                            const total = getTotalCount(assemblyData.stats)
                                            const pct = total > 0 ? ((stat.total_count / total) * 100).toFixed(2) : 0
                                            return (
                                                <CTableRow key={idx}>
                                                    <CTableDataCell>{idx + 1}</CTableDataCell>
                                                    <CTableDataCell>{stat.surname_caste}</CTableDataCell>
                                                    <CTableDataCell className="text-end fw-bold text-info">{stat.total_count.toLocaleString()}</CTableDataCell>
                                                    <CTableDataCell className="text-center">
                                                        <CButton size="sm" color="link" onClick={() => {
                                                            if (assemblyData.assembly?.assembly_id === 0) {
                                                                fetchSurnameDetails(stat.surname_caste, undefined, currentAssemblyParam)
                                                            } else {
                                                                fetchSurnameDetails(stat.surname_caste, assemblyData.assembly?.assembly_id)
                                                            }
                                                        }}>
                                                            {stat.total_similar}
                                                        </CButton>
                                                    </CTableDataCell>
                                                    <CTableDataCell>
                                                        <div className="d-flex align-items-center">
                                                            <CProgress className="flex-grow-1 me-2" height={6} value={parseFloat(pct)}>
                                                                <CProgressBar color="info" value={parseFloat(pct)} />
                                                            </CProgress>
                                                            <small>{pct}%</small>
                                                        </div>
                                                    </CTableDataCell>
                                                </CTableRow>
                                            )
                                        })}
                                    </CTableBody>
                                </CTable>
                            </CCard>
                        ))}

                        {/* Modal */}
                        <CModal visible={showSurnameModal} onClose={closeSurnameModal} size="lg">
                            <CModalHeader onClose={closeSurnameModal} className="bg-info text-white">
                                <CModalTitle>Surname Details - {selectedCaste}</CModalTitle>
                            </CModalHeader>
                            <CModalBody>
                                {surnameLoading ? (
                                    <div className="text-center p-4"><CSpinner color="info" /></div>
                                ) : surnameDetails ? (
                                    <CTable striped hover responsive small>
                                        <CTableHead>
                                            <CTableRow>
                                                <CTableHeaderCell>SN</CTableHeaderCell>
                                                <CTableHeaderCell>Surname Similar</CTableHeaderCell>
                                                <CTableHeaderCell className="text-end">Count</CTableHeaderCell>
                                            </CTableRow>
                                        </CTableHead>
                                        <CTableBody>
                                            {surnameDetails.surnames.map((s, i) => (
                                                <CTableRow key={i}>
                                                    <CTableDataCell>{i + 1}</CTableDataCell>
                                                    <CTableDataCell>{s.surname_similar}</CTableDataCell>
                                                    <CTableDataCell className="text-end fw-bold text-info">{s.count.toLocaleString()}</CTableDataCell>
                                                </CTableRow>
                                            ))}
                                        </CTableBody>
                                    </CTable>
                                ) : <p className="text-center">No data</p>}
                            </CModalBody>
                        </CModal>
                    </CCardBody>
                </CCard>
            </CContainer>
        </div>
    )
}

export default CasteSearch
