import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CContainer,
    CRow,
    CWidgetStatsA,
    CNav,
    CNavItem,
    CNavLink,
    CTabContent,
    CTabPane,
    CSpinner,
} from '@coreui/react'
import { CChartLine, CChartDoughnut } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import {
    cilArrowLeft,
    cilChartPie,
    cilEnvelopeClosed,
    cilUser,
    cilFile,
} from '@coreui/icons'
import bjpResultsService from '../services/bjpResultsService'

const StateResultDashboard = () => {
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState(1)
    const [bjpResults, setBjpResults] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // Fetch BJP results on component mount
    useEffect(() => {
        fetchBjpResults()
    }, [])

    const fetchBjpResults = async () => {
        try {
            setLoading(true)
            const response = await bjpResultsService.getAllResults()
            console.log('BJP Results Response:', response) // Debug log
            if (response.success) {
                console.log('BJP Results Data:', response.data) // Debug log
                setBjpResults(response.data)
            } else {
                setError('Failed to fetch BJP results')
            }
        } catch (err) {
            console.error('Error fetching BJP results:', err)
            setError('Error fetching data from server')
        } finally {
            setLoading(false)
        }
    }

    // Process data for line chart - Separate AC and PC lines
    const processDataForLineChart = () => {
        if (!bjpResults || bjpResults.length === 0) {
            return {
                labels: [],
                datasets: [],
            }
        }

        // Get all unique years and sort them
        const allYearsSet = new Set(bjpResults.map(r => r.election_year?.toString()).filter(y => y));
        const sortedYears = Array.from(allYearsSet).sort((a, b) => parseInt(a) - parseInt(b));

        // Helper to get seats by year and type
        const getSeats = (year, type, partyField) => {
            const match = bjpResults.find(r =>
                r.election_year?.toString() === year &&
                (r.election_type?.toLowerCase().includes(type) || r.election_type?.toLowerCase() === (type === 'assembly' ? 'ac' : 'pc'))
            );
            return match ? match[partyField] || 0 : null; // null keeps gaps clean
        };

        return {
            labels: sortedYears,
            datasets: [
                {
                    label: 'BJP (Assembly)',
                    data: sortedYears.map(y => getSeats(y, 'assembly', 'BJP_seats')),
                    borderColor: 'rgb(54, 162, 235)',
                    backgroundColor: 'rgb(54, 162, 235)',
                    fill: false,
                    tension: 0.1,
                    pointRadius: 5,
                    spanGaps: true,
                },
                {
                    label: 'BJP (Parliament)',
                    data: sortedYears.map(y => getSeats(y, 'parliament', 'BJP_seats')),
                    borderColor: 'rgb(54, 162, 235)',
                    borderDash: [6, 4], // Dashed line
                    backgroundColor: 'rgb(54, 162, 235)',
                    fill: false,
                    tension: 0.1,
                    pointRadius: 5,
                    spanGaps: true,
                },
                {
                    label: 'INC (Assembly)',
                    data: sortedYears.map(y => getSeats(y, 'assembly', 'inc_seats')),
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgb(255, 99, 132)',
                    fill: false,
                    tension: 0.1,
                    pointRadius: 5,
                    spanGaps: true,
                },
                {
                    label: 'INC (Parliament)',
                    data: sortedYears.map(y => getSeats(y, 'parliament', 'inc_seats')),
                    borderColor: 'rgb(255, 99, 132)',
                    borderDash: [6, 4], // Dashed line
                    backgroundColor: 'rgb(255, 99, 132)',
                    fill: false,
                    tension: 0.1,
                    pointRadius: 5,
                    spanGaps: true,
                }
            ],
        }
    }

    // Calculate statistics
    const calculateStats = () => {
        if (!bjpResults || bjpResults.length === 0) {
            return {
                totalBjpSeats: 0,
                avgBjpSeats: 0,
                maxBjpSeats: 0,
                totalElections: 0,
            }
        }

        const totalBjpSeats = bjpResults.reduce((sum, r) => sum + (r.BJP_seats || 0), 0)
        const avgBjpSeats = Math.round(totalBjpSeats / bjpResults.length)
        const maxBjpSeats = Math.max(...bjpResults.map(r => r.BJP_seats || 0))
        const totalElections = bjpResults.length

        return { totalBjpSeats, avgBjpSeats, maxBjpSeats, totalElections }
    }

    const stats = calculateStats()
    const pollStatisticsData = processDataForLineChart()

    // Statistics data
    const statsData = [
        {
            title: 'BJP Performance',
            icon: cilChartPie,
            color: 'primary',
            progressValue: 75,
        },
        {
            title: 'Position Wise Analysis',
            icon: cilEnvelopeClosed,
            color: 'info',
            progressValue: 60,
        },
        {
            title: 'Vote % Wise Analysis',
            icon: cilUser,
            color: 'warning',
            progressValue: 85,
        },
        {
            title: 'Vote Margin and % Filters',
            icon: cilFile,
            color: 'danger',
            progressValue: 45,
        },
    ]

    // Function to check if BJP won (has maximum seats)
    const isBjpWinner = (yearData) => {
        if (!yearData) return false
        const bjpSeats = yearData.BJP_seats || 0
        const incSeats = yearData.inc_seats || 0
        const bspSeats = yearData.bsp_seats || 0
        const jccSeats = yearData.jcc_seats || 0
        const otherSeats = yearData.other_seats || 0

        return bjpSeats > incSeats && bjpSeats > bspSeats && bjpSeats > jccSeats && bjpSeats > otherSeats
    }

    // Function to create doughnut chart data for each year
    const createDoughnutChartData = (yearData) => {
        if (!yearData) return { labels: [], datasets: [] }

        // Always show all parties, even with 0 seats
        const labels = []
        const data = []
        const colors = []
        const hoverColors = []

        // BJP
        labels.push(`BJP-${yearData.BJP_seats || 0}`)
        data.push(yearData.BJP_seats || 0)
        colors.push('#FF8C00')
        hoverColors.push('#e67e00')

        // INC
        labels.push(`INC-${yearData.inc_seats || 0}`)
        data.push(yearData.inc_seats || 0)
        colors.push('#228B22')
        hoverColors.push('#1a6b1a')

        // BSP
        labels.push(`BSP-${yearData.bsp_seats || 0}`)
        data.push(yearData.bsp_seats || 0)
        colors.push('#87CEEB')
        hoverColors.push('#6fb8d9')

        // JCC
        labels.push(`JCC-${yearData.jcc_seats || 0}`)
        data.push(yearData.jcc_seats || 0)
        colors.push('#FF69B4')
        hoverColors.push('#ff4da6')

        // Others
        labels.push(`Others-${yearData.other_seats || 0}`)
        data.push(yearData.other_seats || 0)
        colors.push('#9370DB')
        hoverColors.push('#7b5bc9')

        return {
            labels: labels,
            datasets: [
                {
                    data: data,
                    backgroundColor: colors,
                    hoverBackgroundColor: hoverColors,
                },
            ],
        }
    }

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            },
        },
        scales: {
            x: {
                display: true,
                title: {
                    display: true,
                    text: 'Election Year'
                }
            },
            y: {
                display: true,
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Seats Won'
                }
            },
        },
    }

    const doughnutOptions = {
        maintainAspectRatio: true,
        plugins: {
            legend: {
                display: true,
                position: 'bottom',
                labels: {
                    boxWidth: 18,
                    padding: 15,
                    font: {
                        size: 13,
                        weight: '600',
                    },
                    usePointStyle: true,
                    pointStyle: 'circle',
                },
            },
            tooltip: {
                enabled: true,
                backgroundColor: 'rgba(0, 0, 0, 0.9)',
                padding: 15,
                titleFont: {
                    size: 15,
                    weight: 'bold',
                },
                bodyFont: {
                    size: 14,
                },
                callbacks: {
                    label: function (context) {
                        let label = context.label || '';
                        if (label) {
                            label += ': ';
                        }
                        const value = context.parsed || 0;
                        const total = context.dataset.data.reduce((a, b) => a + b, 0);
                        const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
                        label += value + ' seats (' + percentage + '%)';
                        return label;
                    }
                }
            },
        },
        // Remove cutout to make it a full pie chart instead of doughnut
        cutout: '40%',
    }

    if (loading) {
        return (
            <div className="bg-body-tertiary min-vh-100 d-flex justify-content-center align-items-center">
                <CSpinner color="primary" size="lg" />
            </div>
        )
    }

    if (error) {
        return (
            <div className="bg-body-tertiary min-vh-100 d-flex justify-content-center align-items-center">
                <CCard>
                    <CCardBody>
                        <h5 className="text-danger">{error}</h5>
                        <CButton color="primary" onClick={fetchBjpResults}>
                            Retry
                        </CButton>
                    </CCardBody>
                </CCard>
            </div>
        )
    }

    // Filter results by election type (Assembly/AC and Parliament/PC)
    const displayAssemblyResults = bjpResults.filter(result => {
        const type = result.election_type?.toLowerCase() || '';
        return type.includes('assembly') || type === 'ac';
    });

    const displayParliamentResults = bjpResults.filter(result => {
        const type = result.election_type?.toLowerCase() || '';
        return type.includes('parliament') || type === 'pc';
    });

    console.log('Assembly (AC) Results:', displayAssemblyResults)
    console.log('Parliament (PC) Results:', displayParliamentResults)

    return (
        <div className="bg-body-tertiary min-vh-100">
            <CContainer fluid>
                {/* Statistics Cards */}
                <CRow className="g-3 mb-4">
                    {statsData.map((stat, index) => (
                        <CCol xs={12} sm={6} lg={3} key={index}>
                            <CWidgetStatsA
                                className="pb-3"
                                color={stat.color}
                                title={stat.title}
                                action={
                                    <CIcon icon={stat.icon} className="text-white" size="xl" />
                                }
                                chart={
                                    <div style={{ height: '70px' }}>
                                        <div
                                            className="position-absolute bottom-0 start-0 w-100 bg-white bg-opacity-25"
                                            style={{
                                                height: `${stat.progressValue}%`,
                                                transition: 'height 0.3s ease',
                                            }}
                                        />
                                    </div>
                                }
                            />
                        </CCol>
                    ))}
                </CRow>

                {/* Navigation Tabs */}
                <CCard className="mb-4">
                    <CCardBody className="p-0">
                        <CNav variant="tabs" role="tablist" className="border-bottom">
                            <CNavItem>
                                <CNavLink
                                    href="#!"
                                    active={activeTab === 1}
                                    onClick={() => setActiveTab(1)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <strong>BJP Results</strong>
                                </CNavLink>
                            </CNavItem>
                            <CNavItem>
                                <CNavLink
                                    href="#!"
                                    active={activeTab === 2}
                                    onClick={() => setActiveTab(2)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <strong>BJP Scenario in Assembly Election</strong>
                                </CNavLink>
                            </CNavItem>
                            <CNavItem>
                                <CNavLink
                                    href="#!"
                                    active={activeTab === 3}
                                    onClick={() => setActiveTab(3)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <strong>BJP Scenario in Parliament Election</strong>
                                </CNavLink>
                            </CNavItem>
                        </CNav>
                    </CCardBody>
                </CCard>

                {/* Poll Statistics Chart */}
                <CCard className="mb-4 shadow-sm">
                    <CCardHeader className="bg-white border-bottom">
                        <h5 className="mb-0 fw-semibold text-primary">Poll Statistics</h5>
                        <small className="text-muted">Historical election performance trends</small>
                    </CCardHeader>
                    <CCardBody className="p-4">
                        <div style={{ height: '400px' }}>
                            <CChartLine
                                data={pollStatisticsData}
                                options={chartOptions}
                            />
                        </div>
                    </CCardBody>
                </CCard>

                {/* Assembly Wise Constituency Result */}
                <CCard className="mb-4 shadow-sm">
                    <CCardHeader className="bg-primary text-white">
                        <h5 className="mb-0 fw-semibold">
                            Assembly Wise Constituency Result (AC)
                        </h5>
                        <small className="opacity-75">Year-wise assembly election (AC) results</small>
                    </CCardHeader>
                    <CCardBody className="bg-light p-4">
                        <CRow className="g-4">
                            {displayAssemblyResults.length > 0 ? (
                                displayAssemblyResults.map((result, index) => (
                                    <CCol xs={12} sm={6} md={4} key={index}>
                                        <CCard className="h-100 shadow-sm border-0">
                                            <CCardBody className="text-center p-4">
                                                <div className="d-flex justify-content-center align-items-center mb-2">
                                                    <h6 className="mb-0 fw-bold text-primary" style={{ fontSize: '1rem' }}>
                                                        {result.election_year} {result.election_type || 'Election'}
                                                    </h6>
                                                    {isBjpWinner(result) && (
                                                        <span className="badge bg-success ms-2" style={{ fontSize: '0.7rem' }}>
                                                            BJP WON
                                                        </span>
                                                    )}
                                                </div>
                                                <div >
                                                    <CChartDoughnut
                                                        data={createDoughnutChartData(result)}
                                                        options={doughnutOptions}
                                                    />
                                                </div>
                                            </CCardBody>
                                        </CCard>
                                    </CCol>
                                ))
                            ) : (
                                <CCol xs={12}>
                                    <p className="text-center text-muted">No assembly election data available</p>
                                </CCol>
                            )}
                        </CRow>
                    </CCardBody>
                </CCard>

                {/* Parliament Wise Constituency Result */}
                <CCard className="mb-4 shadow-sm">
                    <CCardHeader className="bg-primary text-white">
                        <h5 className="mb-0 fw-semibold">
                            Parliament Wise Constituency Result (PC)
                        </h5>
                        <small className="opacity-75">Year-wise parliament election (PC) results</small>
                    </CCardHeader>
                    <CCardBody className="bg-light p-4">
                        <CRow className="g-4">
                            {displayParliamentResults.length > 0 ? (
                                displayParliamentResults.map((result, index) => (
                                    <CCol xs={12} sm={6} md={4} key={index}>
                                        <CCard className="h-100 shadow-sm border-0">
                                            <CCardBody className="text-center p-4">
                                                <div className="d-flex justify-content-center align-items-center mb-2">
                                                    <h6 className="mb-0 fw-bold text-primary" style={{ fontSize: '1rem' }}>
                                                        {result.election_year} {result.election_type || 'Election'}
                                                    </h6>
                                                    {isBjpWinner(result) && (
                                                        <span className="badge bg-success ms-2" style={{ fontSize: '0.7rem' }}>
                                                            BJP WON
                                                        </span>
                                                    )}
                                                </div>
                                                <div >
                                                    <CChartDoughnut
                                                        data={createDoughnutChartData(result)}
                                                        options={doughnutOptions}
                                                    />
                                                </div>
                                            </CCardBody>
                                        </CCard>
                                    </CCol>
                                ))
                            ) : (
                                <CCol xs={12}>
                                    <p className="text-center text-muted">No parliament election data available</p>
                                </CCol>
                            )}
                        </CRow>
                    </CCardBody>
                </CCard>
            </CContainer>
        </div>
    )
}

export default StateResultDashboard
