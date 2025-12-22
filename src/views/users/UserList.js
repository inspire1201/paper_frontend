import React, { useState } from 'react'
import {
    CAvatar,
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CBadge,
    CFormInput,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPeople, cilUserFollow } from '@coreui/icons'

const UserList = () => {
    const [users] = useState([
        {
            id: 1,
            name: 'Manish Keer',
            email: 'manish.keer@example.com',
            role: 'Full Stack Developer',
            status: 'active',
            registered: 'Jan 15, 2024',
            lastLogin: '2 hours ago',
            avatar: 'MK',
            avatarColor: 'primary',
        },
        {
            id: 2,
            name: 'Vishal Rajput',
            email: 'vishal.rajput@example.com',
            role: 'Backend Developer',
            status: 'active',
            registered: 'Feb 20, 2024',
            lastLogin: '5 minutes ago',
            avatar: 'VR',
            avatarColor: 'info',
        },
        {
            id: 3,
            name: 'Sargam Dhangar',
            email: 'sargam.dhangar@example.com',
            role: 'Frontend Developer',
            status: 'active',
            registered: 'Mar 10, 2024',
            lastLogin: '1 hour ago',
            avatar: 'SD',
            avatarColor: 'success',
        },
        {
            id: 4,
            name: 'Priya Sharma',
            email: 'priya.sharma@example.com',
            role: 'UI/UX Designer',
            status: 'active',
            registered: 'Apr 5, 2024',
            lastLogin: '3 hours ago',
            avatar: 'PS',
            avatarColor: 'warning',
        },
        {
            id: 5,
            name: 'Rahul Verma',
            email: 'rahul.verma@example.com',
            role: 'DevOps Engineer',
            status: 'inactive',
            registered: 'May 12, 2024',
            lastLogin: '2 days ago',
            avatar: 'RV',
            avatarColor: 'danger',
        },
        {
            id: 6,
            name: 'Ananya Patel',
            email: 'ananya.patel@example.com',
            role: 'Product Manager',
            status: 'active',
            registered: 'Jun 18, 2024',
            lastLogin: '30 minutes ago',
            avatar: 'AP',
            avatarColor: 'secondary',
        },
    ])

    const [searchTerm, setSearchTerm] = useState('')
    const [filterStatus, setFilterStatus] = useState('all')

    const filteredUsers = users.filter((user) => {
        const matchesSearch =
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.role.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesStatus = filterStatus === 'all' || user.status === filterStatus
        return matchesSearch && matchesStatus
    })

    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>User Management</strong>
                        <small className="ms-2">Team Members List</small>
                    </CCardHeader>
                    <CCardBody>
                        {/* Search and Filter Section */}
                        <CRow className="mb-3">
                            <CCol md={6}>
                                <CFormInput
                                    type="text"
                                    placeholder="Search by name, email, or role..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </CCol>
                            <CCol md={6} className="d-flex justify-content-end gap-2">
                                <CButton
                                    color={filterStatus === 'all' ? 'primary' : 'secondary'}
                                    onClick={() => setFilterStatus('all')}
                                    size="sm"
                                >
                                    All ({users.length})
                                </CButton>
                                <CButton
                                    color={filterStatus === 'active' ? 'success' : 'secondary'}
                                    onClick={() => setFilterStatus('active')}
                                    size="sm"
                                >
                                    Active ({users.filter((u) => u.status === 'active').length})
                                </CButton>
                                <CButton
                                    color={filterStatus === 'inactive' ? 'danger' : 'secondary'}
                                    onClick={() => setFilterStatus('inactive')}
                                    size="sm"
                                >
                                    Inactive ({users.filter((u) => u.status === 'inactive').length})
                                </CButton>
                                <CButton color="info" size="sm">
                                    <CIcon icon={cilUserFollow} className="me-1" />
                                    Add User
                                </CButton>
                            </CCol>
                        </CRow>

                        {/* Users Table */}
                        <CTable align="middle" className="mb-0 border" hover responsive>
                            <CTableHead className="text-nowrap">
                                <CTableRow>
                                    <CTableHeaderCell className="bg-body-tertiary text-center">
                                        <CIcon icon={cilPeople} />
                                    </CTableHeaderCell>
                                    <CTableHeaderCell className="bg-body-tertiary">User</CTableHeaderCell>
                                    <CTableHeaderCell className="bg-body-tertiary">Role</CTableHeaderCell>
                                    <CTableHeaderCell className="bg-body-tertiary text-center">
                                        Status
                                    </CTableHeaderCell>
                                    <CTableHeaderCell className="bg-body-tertiary">Registered</CTableHeaderCell>
                                    <CTableHeaderCell className="bg-body-tertiary">Last Login</CTableHeaderCell>
                                    <CTableHeaderCell className="bg-body-tertiary text-center">
                                        Actions
                                    </CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {filteredUsers.length > 0 ? (
                                    filteredUsers.map((user) => (
                                        <CTableRow key={user.id}>
                                            <CTableDataCell className="text-center">
                                                <CAvatar
                                                    color={user.avatarColor}
                                                    textColor="white"
                                                    status={user.status === 'active' ? 'success' : 'danger'}
                                                >
                                                    {user.avatar}
                                                </CAvatar>
                                            </CTableDataCell>
                                            <CTableDataCell>
                                                <div className="fw-semibold">{user.name}</div>
                                                <div className="small text-body-secondary">{user.email}</div>
                                            </CTableDataCell>
                                            <CTableDataCell>
                                                <div className="text-nowrap">{user.role}</div>
                                            </CTableDataCell>
                                            <CTableDataCell className="text-center">
                                                <CBadge color={user.status === 'active' ? 'success' : 'danger'}>
                                                    {user.status.toUpperCase()}
                                                </CBadge>
                                            </CTableDataCell>
                                            <CTableDataCell>
                                                <div className="small text-body-secondary text-nowrap">
                                                    {user.registered}
                                                </div>
                                            </CTableDataCell>
                                            <CTableDataCell>
                                                <div className="small text-body-secondary">Last login</div>
                                                <div className="fw-semibold text-nowrap">{user.lastLogin}</div>
                                            </CTableDataCell>
                                            <CTableDataCell className="text-center">
                                                <CButton color="primary" variant="ghost" size="sm" className="me-1">
                                                    View
                                                </CButton>
                                                <CButton color="info" variant="ghost" size="sm" className="me-1">
                                                    Edit
                                                </CButton>
                                                <CButton color="danger" variant="ghost" size="sm">
                                                    Delete
                                                </CButton>
                                            </CTableDataCell>
                                        </CTableRow>
                                    ))
                                ) : (
                                    <CTableRow>
                                        <CTableDataCell colSpan="7" className="text-center py-4">
                                            <div className="text-body-secondary">
                                                <h5>No users found</h5>
                                                <p>Try adjusting your search or filter criteria</p>
                                            </div>
                                        </CTableDataCell>
                                    </CTableRow>
                                )}
                            </CTableBody>
                        </CTable>

                        {/* Summary Footer */}
                        <div className="mt-3 text-body-secondary small">
                            Showing {filteredUsers.length} of {users.length} users
                        </div>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default UserList


