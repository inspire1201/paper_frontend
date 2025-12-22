import React, { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CContainer,
    CSpinner,
    CTable,
    CTableBody,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CTableDataCell,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilArrowLeft, cilArrowTop, cilArrowBottom, cilList } from '@coreui/icons'
import surnameService from '../services/surnameService'

const AssemblyCasteDetail = () => {
    const navigate = useNavigate()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [sortField, setSortField] = useState(null)
    const [sortDirection, setSortDirection] = useState(null)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        setLoading(true)
        try {
            const response = await surnameService.getAllAssemblyCasteDetail()
            if (response.success) {
                setData(response.data)
                toast.success(`Loaded ${response.data.length} records`)
            }
        } catch (error) {
            console.error('Error fetching assembly caste detail:', error)
            toast.error('Failed to load data')
        } finally {
            setLoading(false)
        }
    }

    const handleSort = (field) => {
        let direction = 'asc'

        if (sortField === field) {
            if (sortDirection === 'asc') {
                direction = 'desc'
            } else if (sortDirection === 'desc') {
                direction = null
            }
        }

        setSortField(direction ? field : null)
        setSortDirection(direction)
    }

    const sortedData = useMemo(() => {
        if (!sortField || !sortDirection) {
            return data
        }

        return [...data].sort((a, b) => {
            const aValue = a[sortField]
            const bValue = b[sortField]

            if (aValue === null && bValue === null) return 0
            if (aValue === null) return sortDirection === 'asc' ? 1 : -1
            if (bValue === null) return sortDirection === 'asc' ? -1 : 1

            if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1
            if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1
            return 0
        })
    }, [data, sortField, sortDirection])

    const SortIcon = ({ field }) => {
        if (sortField !== field) {
            return <span className="ms-1 text-muted" style={{ fontSize: '0.7em' }}>⇵</span>
        }
        return sortDirection === 'asc' ? (
            <CIcon icon={cilArrowTop} size="sm" className="ms-1 text-primary" />
        ) : (
            <CIcon icon={cilArrowBottom} size="sm" className="ms-1 text-primary" />
        )
    }

    const TableHeader = ({ field, children, align = 'left' }) => (
        <CTableHeaderCell
            onClick={() => handleSort(field)}
            className={`cursor-pointer user-select-none ${align === 'right' ? 'text-end' : 'text-start'} py-2 px-3`}
            style={{
                cursor: 'pointer',
                fontSize: '0.85rem',
                lineHeight: '1.4',
                fontWeight: '600',
                backgroundColor: '#f8f9fa',
                borderBottom: '2px solid #dee2e6'
            }}
        >
            <div className={`d-flex align-items-center ${align === 'right' ? 'justify-content-end' : 'justify-content-start'}`}>
                <span>{children}</span>
                <SortIcon field={field} />
            </div>
        </CTableHeaderCell>
    )

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
                <CSpinner color="primary" />
            </div>
        )
    }

    return (
        <div className="bg-body-tertiary min-vh-100 p-4">
            <CContainer fluid>
                <CCard className="shadow-sm">
                    <CCardHeader className="bg-white border-bottom">
                        <h4 className="mb-0 text-primary">
                            <CIcon icon={cilList} className="me-2" />
                            Assembly Caste Detail Report
                        </h4>
                    </CCardHeader>
                    <CCardBody>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <div className="d-flex align-items-center gap-2">
                                <CIcon icon={cilList} className="text-primary" />
                                <strong>Total Records:</strong> {data.length}
                            </div>
                            {sortField && (
                                <CButton
                                    size="sm"
                                    color="link"
                                    className="text-danger text-decoration-none"
                                    onClick={() => {
                                        setSortField(null)
                                        setSortDirection(null)
                                    }}
                                >
                                    Clear Sort
                                </CButton>
                            )}
                        </div>

                        <div className="table-responsive">
                            <CTable hover bordered small responsive className="mb-0" style={{ fontSize: '0.875rem' }}>
                                <CTableHead color="light">
                                    <CTableRow>
                                        <TableHeader field="ac_no">AC No</TableHeader>
                                        <TableHeader field="assembly_name">Assembly Name</TableHeader>
                                        <TableHeader field="total_voter" align="right">Total Voter</TableHeader>
                                        <TableHeader field="total_surname" align="right">Total Surname</TableHeader>
                                        <TableHeader field="surname_covered_criteria" align="right">Surname Covered</TableHeader>
                                        <TableHeader field="voters_covered_criteria" align="right">Voters Covered</TableHeader>
                                        <TableHeader field="voters_pct_covered" align="right">% Covered</TableHeader>
                                        <TableHeader field="voters_pct_null_surname" align="right">% Null</TableHeader>
                                        <TableHeader field="voters_pct_not_covered" align="right">% Not Covered</TableHeader>
                                        <TableHeader field="voters_pct_not_to_work" align="right">% Not to Work</TableHeader>
                                        <TableHeader field="surname_similar_caste" align="right">Similar Caste</TableHeader>
                                        <TableHeader field="filled_caste" align="right">Filled Caste</TableHeader>
                                        <TableHeader field="filled_category" align="right">Filled Category</TableHeader>
                                        <TableHeader field="voters_filled_caste" align="right">Voters Filled Caste</TableHeader>
                                        <TableHeader field="voters_filled_category" align="right">Voters Filled Category</TableHeader>
                                        <TableHeader field="filled_caste_diff" align="right">Caste Diff</TableHeader>
                                        <TableHeader field="filled_category_diff" align="right">Category Diff</TableHeader>
                                        <TableHeader field="caste_covered_vs_done" align="right">Covered vs Done</TableHeader>
                                        <TableHeader field="caste_covered_vs_done_pct" align="right">Covered vs Done %</TableHeader>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {sortedData.length > 0 ? (
                                        sortedData.map((item) => (
                                            <CTableRow key={item.id} style={{ backgroundColor: item.ac_no === 0 ? '#fff3cd' : 'inherit' }}>
                                                <CTableDataCell className="py-2 px-3">
                                                    <span className={`badge ${item.ac_no === 0 ? 'bg-warning text-dark' : 'bg-info text-white'}`} style={{ fontSize: '0.85rem', padding: '0.35rem 0.65rem' }}>
                                                        {item.ac_no === 0 ? 'All' : item.ac_no}
                                                    </span>
                                                </CTableDataCell>
                                                <CTableDataCell className="fw-semibold py-2 px-3" style={{ minWidth: '150px' }}>{item.assembly_name}</CTableDataCell>
                                                <CTableDataCell className="text-end py-2 px-3" style={{ fontFamily: 'monospace' }}>{item.total_voter.toLocaleString()}</CTableDataCell>
                                                <CTableDataCell className="text-end py-2 px-3" style={{ fontFamily: 'monospace' }}>{item.total_surname.toLocaleString()}</CTableDataCell>
                                                <CTableDataCell className="text-end py-2 px-3" style={{ fontFamily: 'monospace' }}>{item.surname_covered_criteria.toLocaleString()}</CTableDataCell>
                                                <CTableDataCell className="text-end py-2 px-3" style={{ fontFamily: 'monospace' }}>{item.voters_covered_criteria.toLocaleString()}</CTableDataCell>
                                                <CTableDataCell className="text-end py-2 px-3">
                                                    <span className="badge bg-success" style={{ fontSize: '0.8rem', padding: '0.3rem 0.5rem' }}>
                                                        {item.voters_pct_covered.toFixed(2)}%
                                                    </span>
                                                </CTableDataCell>
                                                <CTableDataCell className="text-end text-muted py-2 px-3" style={{ fontFamily: 'monospace' }}>{item.voters_pct_null_surname.toFixed(2)}%</CTableDataCell>
                                                <CTableDataCell className="text-end text-muted py-2 px-3" style={{ fontFamily: 'monospace' }}>{item.voters_pct_not_covered.toFixed(2)}%</CTableDataCell>
                                                <CTableDataCell className="text-end text-muted py-2 px-3" style={{ fontFamily: 'monospace' }}>{item.voters_pct_not_to_work.toFixed(2)}%</CTableDataCell>
                                                <CTableDataCell className="text-end text-primary py-2 px-3" style={{ fontFamily: 'monospace' }}>{item.surname_similar_caste?.toLocaleString() ?? '-'}</CTableDataCell>
                                                <CTableDataCell className="text-end text-primary py-2 px-3" style={{ fontFamily: 'monospace' }}>{item.filled_caste?.toLocaleString() ?? '-'}</CTableDataCell>
                                                <CTableDataCell className="text-end text-primary py-2 px-3" style={{ fontFamily: 'monospace' }}>{item.filled_category?.toLocaleString() ?? '-'}</CTableDataCell>
                                                <CTableDataCell className="text-end py-2 px-3" style={{ fontFamily: 'monospace' }}>{item.voters_filled_caste.toLocaleString()}</CTableDataCell>
                                                <CTableDataCell className="text-end py-2 px-3" style={{ fontFamily: 'monospace' }}>{item.voters_filled_category.toLocaleString()}</CTableDataCell>
                                                <CTableDataCell className={`text-end py-2 px-3 ${item.filled_caste_diff ? 'text-warning fw-semibold' : 'text-muted'}`} style={{ fontFamily: 'monospace' }}>{item.filled_caste_diff?.toLocaleString() ?? '-'}</CTableDataCell>
                                                <CTableDataCell className={`text-end py-2 px-3 ${item.filled_category_diff ? 'text-warning fw-semibold' : 'text-muted'}`} style={{ fontFamily: 'monospace' }}>{item.filled_category_diff?.toLocaleString() ?? '-'}</CTableDataCell>
                                                <CTableDataCell className="text-end text-info py-2 px-3" style={{ fontFamily: 'monospace' }}>{item.caste_covered_vs_done?.toLocaleString() ?? '-'}</CTableDataCell>
                                                <CTableDataCell className="text-end py-2 px-3">
                                                    <span className="badge bg-success" style={{ fontSize: '0.8rem', padding: '0.3rem 0.5rem' }}>
                                                        {item.caste_covered_vs_done_pct?.toFixed(2) ?? '-'}%
                                                    </span>
                                                </CTableDataCell>
                                            </CTableRow>
                                        ))
                                    ) : (
                                        <CTableRow>
                                            <CTableDataCell colSpan={19} className="text-center p-5">
                                                <p className="mb-0 text-muted">No data available</p>
                                            </CTableDataCell>
                                        </CTableRow>
                                    )}
                                </CTableBody>
                            </CTable>
                        </div>
                    </CCardBody>
                </CCard>
            </CContainer>
        </div>
    )
}

export default AssemblyCasteDetail
