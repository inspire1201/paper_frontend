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
    const [chartType, setChartType] = useState('assembly') // 'assembly' or 'parliament'
    const [bjpResults, setBjpResults] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)

    // Track window resize for responsive chart options
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth)
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

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

    // Process data for line chart - Based on selected chart type
    const processDataForLineChart = (type = 'assembly') => {
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
        const getSeats = (year, electionType, partyField) => {
            const match = bjpResults.find(r =>
                r.election_year?.toString() === year &&
                (r.election_type?.toLowerCase().includes(electionType) || r.election_type?.toLowerCase() === (electionType === 'assembly' ? 'ac' : 'pc'))
            );
            return match ? match[partyField] || 0 : null; // null keeps gaps clean
        };

        // Use party colors from doughnut chart
        return {
            labels: sortedYears,
            datasets: [
                {
                    label: 'BJP',
                    data: sortedYears.map(y => getSeats(y, type, 'BJP_seats')),
                    borderColor: '#FF8C00',
                    backgroundColor: '#FF8C00',
                    fill: false,
                    tension: 0.1,
                    pointRadius: 5,
                    spanGaps: true,
                },
                {
                    label: 'INC',
                    data: sortedYears.map(y => getSeats(y, type, 'inc_seats')),
                    borderColor: '#228B22',
                    backgroundColor: '#228B22',
                    fill: false,
                    tension: 0.1,
                    pointRadius: 5,
                    spanGaps: true,
                },
                {
                    label: 'BSP',
                    data: sortedYears.map(y => getSeats(y, type, 'bsp_seats')),
                    borderColor: '#4169E1',
                    backgroundColor: '#4169E1',
                    fill: false,
                    tension: 0.1,
                    pointRadius: 5,
                    spanGaps: true,
                },
                {
                    label: 'JCCJ',
                    data: sortedYears.map(y => getSeats(y, type, 'jcc_seats')),
                    borderColor: '#FF69B4',
                    backgroundColor: '#FF69B4',
                    fill: false,
                    tension: 0.1,
                    pointRadius: 5,
                    spanGaps: true,
                },
                {
                    label: 'OTHER',
                    data: sortedYears.map(y => getSeats(y, type, 'other_seats')),
                    borderColor: '#9370DB',
                    backgroundColor: '#9370DB',
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
    const pollStatisticsData = processDataForLineChart(chartType)

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

    // Party colors matching the doughnut chart
    const partyColors = {
        BJP: { bg: '#FF8C00', text: 'white' },
        INC: { bg: '#228B22', text: 'white' },
        BSP: { bg: '#87CEEB', text: 'white' },
        JCCJ: { bg: '#FF69B4', text: 'white' },
        OTHER: { bg: '#9370DB', text: 'white' }
    }

    // Function to get the winning party
    const getWinningParty = (yearData) => {
        if (!yearData) return null

        const parties = [
            { name: 'BJP', seats: yearData.BJP_seats || 0 },
            { name: 'INC', seats: yearData.inc_seats || 0 },
            { name: 'BSP', seats: yearData.bsp_seats || 0 },
            { name: 'JCCJ', seats: yearData.jcc_seats || 0 },
            { name: 'OTHER', seats: yearData.other_seats || 0 }
        ]

        // Find the party with maximum seats
        const winner = parties.reduce((max, party) =>
            party.seats > max.seats ? party : max
            , parties[0])

        return winner.seats > 0 ? winner : null
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
        maintainAspectRatio: windowWidth >= 768, // true on desktop (≥768px), false on mobile (<768px)
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    boxWidth: 15,
                    padding: 10,
                    font: {
                        size: windowWidth < 768 ? 10 : 12 // Smaller font on mobile
                    }
                }
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
                    text: 'Election Year',
                    font: {
                        size: windowWidth < 768 ? 10 : 12
                    }
                },
                ticks: {
                    font: {
                        size: windowWidth < 768 ? 9 : 11
                    }
                }
            },
            y: {
                display: true,
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Seats Won',
                    font: {
                        size: windowWidth < 768 ? 10 : 12
                    }
                },
                ticks: {
                    font: {
                        size: windowWidth < 768 ? 9 : 11
                    }
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
                                style={{ cursor: stat.title === 'Position Wise Analysis' ? 'pointer' : 'default' }}
                                onClick={() => {
                                    if (stat.title === 'Position Wise Analysis') {
                                        navigate('/state-result-dashboard/position-wise-analytics')
                                    }
                                }}
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
                        <div className="d-flex justify-content-between align-items-center flex-wrap">
                            <div>
                                <h5 className="mb-0 fw-semibold text-primary">Poll Statistics</h5>
                                <small className="text-muted">Historical election performance trends</small>
                            </div>
                            <div className="d-flex gap-2 mt-2 mt-md-0">
                                <CButton
                                    color={chartType === 'assembly' ? 'primary' : 'light'}
                                    size="sm"
                                    onClick={() => setChartType('assembly')}
                                    className="fw-semibold"
                                >
                                    Assembly
                                </CButton>
                                <CButton
                                    color={chartType === 'parliament' ? 'primary' : 'light'}
                                    size="sm"
                                    onClick={() => setChartType('parliament')}
                                    className="fw-semibold"
                                >
                                    Parliament
                                </CButton>
                            </div>
                        </div>
                    </CCardHeader>
                    <CCardBody className="p-2 p-md-4">
                        <div style={{
                            minHeight: windowWidth >= 768 ? '400px' : '250px',
                            maxHeight: '600px',
                            position: 'relative'
                        }} className="w-100">
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
                                                <div className="d-flex justify-content-center align-items-center mb-2 flex-wrap">
                                                    <h6 className="mb-0 fw-bold text-primary" style={{ fontSize: '1rem' }}>
                                                        {result.election_year} {result.election_type || 'Election'}
                                                    </h6>
                                                    {(() => {
                                                        const winner = getWinningParty(result)
                                                        return winner && (
                                                            <span
                                                                className="badge ms-2"
                                                                style={{
                                                                    fontSize: '0.7rem',
                                                                    backgroundColor: partyColors[winner.name].bg,
                                                                    color: partyColors[winner.name].text
                                                                }}
                                                            >
                                                                {winner.name} WON
                                                            </span>
                                                        )
                                                    })()}
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
                                                <div className="d-flex justify-content-center align-items-center mb-2 flex-wrap">
                                                    <h6 className="mb-0 fw-bold text-primary" style={{ fontSize: '1rem' }}>
                                                        {result.election_year} {result.election_type || 'Election'}
                                                    </h6>
                                                    {(() => {
                                                        const winner = getWinningParty(result)
                                                        return winner && (
                                                            <span
                                                                className="badge ms-2"
                                                                style={{
                                                                    fontSize: '0.7rem',
                                                                    backgroundColor: partyColors[winner.name].bg,
                                                                    color: partyColors[winner.name].text
                                                                }}
                                                            >
                                                                {winner.name} WON
                                                            </span>
                                                        )
                                                    })()}
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
