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
    CRow,
    CSpinner,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CPagination,
    CPaginationItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
    cilArrowLeft,
    cilList,
    cilMagnifyingGlass,
} from '@coreui/icons'
import surnameService from '../../services/surnameService'

const SurnameSimilarSearch = () => {
    const navigate = useNavigate()
    const [assemblies, setAssemblies] = useState([])
    const [selectedAssemblies, setSelectedAssemblies] = useState([])
    const [selectAll, setSelectAll] = useState(false)
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(false)
    const [assemblyLoading, setAssemblyLoading] = useState(false)
    const [viewMode, setViewMode] = useState('separate')
    const [searchTerm, setSearchTerm] = useState('')
    const [paginationState, setPaginationState] = useState({})
    const itemsPerPage = 50

    // Filter state
    const [filterType, setFilterType] = useState('none')
    const [topN, setTopN] = useState('10')
    const [rangeMin, setRangeMin] = useState('')
    const [rangeMax, setRangeMax] = useState('')

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
        setPaginationState({})
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

            // Log the payload for debugging
            console.log('API Payload:', {
                assembly_id: assemblyParam,
                view_mode: viewMode
            })

            const data = await surnameService.getSurnameSimilarStats(assemblyParam, viewMode)

            let resultData = data
            if (!Array.isArray(resultData)) {
                resultData = [resultData]
            }

            setResults(resultData)
            toast.success('Stats loaded successfully!')
        } catch (error) {
            console.error('Error fetching surname stats:', error)
            toast.error('Failed to load surname statistics.')
        } finally {
            setLoading(false)
        }
    }

    const getPaginatedData = (stats, assemblyId) => {
        const currentPage = paginationState[assemblyId] || 1
        const startIndex = (currentPage - 1) * itemsPerPage
        const endIndex = startIndex + itemsPerPage
        return stats.slice(startIndex, endIndex)
    }

    const getTotalPages = (stats) => {
        return Math.ceil(stats.length / itemsPerPage)
    }

    const setAssemblyPage = (assemblyId, page) => {
        setPaginationState((prev) => ({ ...prev, [assemblyId]: page }))
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
                            <CCardHeader className="bg-success text-white">
                                <h5 className="mb-0"><CIcon icon={cilList} className="me-2" /> Select Assemblies</h5>
                            </CCardHeader>
                            <CCardBody>
                                {/* Actions */}
                                <div className="d-flex justify-content-end align-items-center mb-3 flex-wrap gap-2">
                                    {(selectAll || selectedAssemblies.length > 0) && (
                                        <CButton
                                            color="success"
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
                                                                color="success"
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
                                                    color={filterType === 'none' ? 'success' : 'outline-success'}
                                                    size="sm"
                                                    onClick={() => setFilterType('none')}
                                                    className="px-3"
                                                >
                                                    No Filter
                                                </CButton>
                                                <CButton
                                                    color={filterType === 'top' ? 'success' : 'outline-success'}
                                                    size="sm"
                                                    onClick={() => setFilterType('top')}
                                                    className="px-3"
                                                >
                                                    Top N
                                                </CButton>
                                                <CButton
                                                    color={filterType === 'range' ? 'success' : 'outline-success'}
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
                                                color={viewMode === 'separate' ? 'success' : 'outline-success'}
                                                onClick={() => setViewMode('separate')}
                                                className="px-3"
                                            >
                                                From Each Assembly
                                            </CButton>
                                            <CButton
                                                size="sm"
                                                color={viewMode === 'combined' ? 'success' : 'outline-success'}
                                                onClick={() => setViewMode('combined')}
                                                className="px-3"
                                            >
                                                Combined From All
                                            </CButton>
                                        </div>
                                    </div>
                                )}

                                <div className="d-grid gap-2 mt-4">
                                    <CButton color="success" className="text-white" onClick={handleSearch} disabled={loading || (!selectAll && selectedAssemblies.length === 0)}>
                                        {loading ? <CSpinner size="sm" /> : 'Submit'}
                                    </CButton>
                                </div>
                            </CCardBody>
                        </CCard>

                        {/* Results */}
                        {results.map((assemblyData, index) => {
                            const assemblyId = assemblyData.assembly?.assembly_id || 0
                            const filteredStats = applyFilters(assemblyData.stats)
                            const paginatedStats = getPaginatedData(filteredStats, assemblyId)
                            const totalPages = getTotalPages(filteredStats)
                            const currentPage = paginationState[assemblyId] || 1

                            return (
                                <CCard key={index} className="mb-4 border-success">
                                    <CCardHeader className="bg-success text-white d-flex justify-content-between align-items-center">
                                        <strong>{assemblyData.assembly?.assembly_name || 'Unknown Assembly'}</strong>
                                        <span className="badge bg-light text-success">Total: {filteredStats.length.toLocaleString()}</span>
                                    </CCardHeader>
                                    <CTable hover responsive className="mb-0">
                                        <CTableHead>
                                            <CTableRow>
                                                <CTableHeaderCell>SN</CTableHeaderCell>
                                                <CTableHeaderCell>Surname</CTableHeaderCell>
                                                <CTableHeaderCell className="text-end">Count</CTableHeaderCell>
                                            </CTableRow>
                                        </CTableHead>
                                        <CTableBody>
                                            {paginatedStats.map((stat, idx) => {
                                                const actualIndex = (currentPage - 1) * itemsPerPage + idx + 1
                                                return (
                                                    <CTableRow key={idx}>
                                                        <CTableDataCell>{actualIndex}</CTableDataCell>
                                                        <CTableDataCell>{stat.surname_similar}</CTableDataCell>
                                                        <CTableDataCell className="text-end fw-bold text-success">{stat.total_count.toLocaleString()}</CTableDataCell>
                                                    </CTableRow>
                                                )
                                            })}
                                        </CTableBody>
                                    </CTable>
                                    {/* Pagination */}
                                    {totalPages > 1 && (
                                        <div className="p-3 d-flex justify-content-center">
                                            <CPagination className="mb-0">
                                                <CPaginationItem
                                                    disabled={currentPage === 1}
                                                    onClick={() => setAssemblyPage(assemblyId, currentPage - 1)}
                                                >
                                                    Previous
                                                </CPaginationItem>
                                                <CPaginationItem active>{currentPage} / {totalPages}</CPaginationItem>
                                                <CPaginationItem
                                                    disabled={currentPage === totalPages}
                                                    onClick={() => setAssemblyPage(assemblyId, currentPage + 1)}
                                                >
                                                    Next
                                                </CPaginationItem>
                                            </CPagination>
                                        </div>
                                    )}
                                </CCard>
                            )
                        })}

                        {!loading && results.length === 0 && (
                            <div className="text-center p-5 text-body-secondary border rounded bg-light">
                                <p className="mb-0">No results found. Try adjusting filters.</p>
                            </div>
                        )}
                    </CCardBody>
                </CCard>
            </CContainer>
        </div>
    )
}

export default SurnameSimilarSearch
