import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import surnameService from '../services/surnameService';
import { useNavigate } from 'react-router-dom';

interface Assembly {
    id: number;
    assembly_id: number;
    assembly_name: string;
}

interface CasteStat {
    surname_caste: string;
    total_count: number;
    total_similar: number;
}

interface AssemblyData {
    assembly: Assembly;
    stats: CasteStat[];
}

interface SurnameDetail {
    surname_similar: string;
    count: number;
}

interface SurnameDetailsResponse {
    caste: string;
    total_surnames: number;
    surnames: SurnameDetail[];
}

const CasteSearch: React.FC = () => {
    const navigate = useNavigate();
    const [assemblies, setAssemblies] = useState<Assembly[]>([]);
    const [selectedAssemblies, setSelectedAssemblies] = useState<number[]>([]);
    const [selectAll, setSelectAll] = useState(false);
    const [results, setResults] = useState<AssemblyData[]>([]);
    const [loading, setLoading] = useState(false);
    const [viewMode, setViewMode] = useState<'separate' | 'combined'>('separate');
    const [searchTerm, setSearchTerm] = useState(''); // Search filter for assemblies

    // Filter state
    const [filterType, setFilterType] = useState<'none' | 'top' | 'range'>('none');
    const [topN, setTopN] = useState<string>('10');
    const [rangeMin, setRangeMin] = useState<string>('');
    const [rangeMax, setRangeMax] = useState<string>('');

    // Surname details modal state
    const [showSurnameModal, setShowSurnameModal] = useState(false);
    const [surnameDetails, setSurnameDetails] = useState<SurnameDetailsResponse | null>(null);
    const [surnameLoading, setSurnameLoading] = useState(false);
    const [selectedCaste, setSelectedCaste] = useState<string>('');
    const [currentAssemblyParam, setCurrentAssemblyParam] = useState<string>(''); // Track current search params

    // Fetch Assemblies on load
    useEffect(() => {
        fetchAssemblies();
    }, []);

    const fetchAssemblies = async () => {
        try {
            const response = await surnameService.getAssemblies();
            if (response.success) {
                setAssemblies(response.data);
            }
        } catch (error) {
            console.error("Error fetching assemblies:", error);
            toast.error("Failed to load assemblies.");
        }
    };

    const handleSearch = async () => {
        setLoading(true);
        try {
            let assemblyParam = '';
            if (selectAll) {
                assemblyParam = 'all';
            } else if (selectedAssemblies.length > 0) {
                assemblyParam = selectedAssemblies.join(',');
            } else {
                toast.error('Please select at least one assembly.');
                setLoading(false);
                return;
            }

            const data = await surnameService.getCasteStats(assemblyParam, viewMode);

            // Store the assembly param for use in modal
            setCurrentAssemblyParam(assemblyParam);

            // Handle both array and single object responses
            let resultData = data;
            if (!Array.isArray(resultData)) {
                resultData = [resultData];
            }

            setResults(resultData);

            if (viewMode === 'combined') {
                toast.success('Combined caste data loaded successfully!');
            } else {
                toast.success('Caste statistics loaded successfully!');
            }
        } catch (error: any) {
            console.error("Error fetching caste stats:", error);
            toast.error("Failed to load caste statistics.");
        } finally {
            setLoading(false);
        }
    };

    const getTotalCount = (stats: CasteStat[]) => {
        return stats.reduce((sum, stat) => sum + stat.total_count, 0);
    };

    // Apply filters to stats
    const applyFilters = (stats: CasteStat[]): CasteStat[] => {
        if (filterType === 'none') {
            return stats;
        }

        if (filterType === 'top') {
            const n = parseInt(topN) || 10;
            return [...stats]
                .sort((a, b) => b.total_count - a.total_count)
                .slice(0, n);
        }

        if (filterType === 'range') {
            const min = parseInt(rangeMin) || 0;
            const max = parseInt(rangeMax) || Infinity;
            return stats.filter(stat => stat.total_count >= min && stat.total_count <= max);
        }

        return stats;
    };


    const fetchSurnameDetails = async (caste: string, assemblyId?: number, assemblyIdsString?: string) => {
        setSurnameLoading(true);
        setSelectedCaste(caste);
        setShowSurnameModal(true);

        try {
            // If assemblyIdsString is provided (combined view), use it
            // Otherwise use the single assemblyId
            let assembly_param: string | number;
            if (assemblyIdsString) {
                assembly_param = assemblyIdsString;
            } else if (assemblyId === 0 || !assemblyId) {
                assembly_param = 'all';
            } else {
                assembly_param = assemblyId;
            }

            const data = await surnameService.getSurnameDetails(caste, assembly_param as any);
            setSurnameDetails(data);
        } catch (error: any) {
            console.error("Error fetching surname details:", error);
            toast.error("Failed to load surname details.");
        } finally {
            setSurnameLoading(false);
        }
    };

    const closeSurnameModal = () => {
        setShowSurnameModal(false);
        setSurnameDetails(null);
        setSelectedCaste('');
    };

    // Filter assemblies based on search term
    const filteredAssemblies = assemblies.filter(assembly =>
        assembly.assembly_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-6">
                    <div className="flex items-center justify-between">
                        <button
                            onClick={() => navigate(-1)}
                            className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition flex items-center gap-2"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            <span className="text-sm font-medium">Back</span>
                        </button>
                        <h1 className="text-3xl font-bold text-white flex-1 text-center">Caste Search</h1>
                        <div className="w-20"></div> {/* Spacer for centering */}
                    </div>
                </div>

                <div className="p-8 space-y-6">
                    {/* Assembly Selection Section */}
                    <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-4">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                                Select Assemblies
                            </h2>
                            <p className="text-blue-100 text-sm mt-1">Choose one or more assemblies to view statistics</p>
                        </div>

                        <div className="p-6 space-y-5">
                            {/* Quick Actions Row */}
                            <div className="flex items-center justify-between gap-4 p-4 bg-gray-50 rounded-lg">
                                {/* Select All Checkbox */}
                                <div className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        id="selectAll"
                                        checked={selectAll}
                                        onChange={(e) => {
                                            setSelectAll(e.target.checked);
                                            if (e.target.checked) {
                                                setSelectedAssemblies([]);
                                            }
                                        }}
                                        className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                                    />
                                    <label htmlFor="selectAll" className="text-sm font-semibold text-gray-900 cursor-pointer flex items-center gap-2">
                                        <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                                            <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        Select All Assemblies
                                    </label>
                                </div>

                                {/* Reset Button */}
                                {(selectAll || selectedAssemblies.length > 0) && (
                                    <button
                                        onClick={() => {
                                            setSelectAll(false);
                                            setSelectedAssemblies([]);
                                            setViewMode('separate');
                                        }}
                                        className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 border border-red-300 rounded-lg hover:bg-red-100 transition flex items-center gap-2"
                                    >
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                                        </svg>
                                        Reset Selection
                                    </button>
                                )}
                            </div>

                            {/* Assembly Selection - Compact Dropdown */}
                            {!selectAll && (
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Select Assemblies
                                    </label>

                                    {/* Compact Dropdown */}
                                    <div className="relative">
                                        <div className="border-2 border-gray-300 rounded-lg p-2 bg-white">
                                            {/* Search Input */}
                                            <div className="relative mb-2">
                                                <input
                                                    type="text"
                                                    placeholder="Search assemblies..."
                                                    value={searchTerm}
                                                    onChange={(e) => setSearchTerm(e.target.value)}
                                                    className="w-full px-3 py-1.5 pl-8 text-sm border border-gray-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
                                                />
                                                <svg className="w-4 h-4 text-gray-400 absolute left-2 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                </svg>
                                            </div>

                                            {/* Compact Assembly List */}
                                            <div className="max-h-48 overflow-y-auto space-y-1">
                                                {filteredAssemblies.length > 0 ? filteredAssemblies.map((assembly) => (
                                                    <label
                                                        key={assembly.id}
                                                        className={`flex items-center gap-2 px-2 py-1.5 rounded cursor-pointer transition text-sm ${selectedAssemblies.includes(assembly.assembly_id)
                                                            ? 'bg-blue-100 text-blue-900'
                                                            : 'hover:bg-gray-100'
                                                            }`}
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedAssemblies.includes(assembly.assembly_id)}
                                                            onChange={(e) => {
                                                                if (e.target.checked) {
                                                                    setSelectedAssemblies([...selectedAssemblies, assembly.assembly_id]);
                                                                } else {
                                                                    setSelectedAssemblies(selectedAssemblies.filter(id => id !== assembly.assembly_id));
                                                                }
                                                            }}
                                                            className="w-3.5 h-3.5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                                        />
                                                        <span className="flex-1">{assembly.assembly_name}</span>
                                                    </label>
                                                )) : (
                                                    <div className="text-center py-4 text-gray-500 text-sm">
                                                        No assemblies found
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Selected Count Badge */}
                            {!selectAll && selectedAssemblies.length > 0 && (
                                <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-sm font-semibold text-blue-900">
                                        <span className="text-blue-600 text-lg">{selectedAssemblies.length}</span> {selectedAssemblies.length === 1 ? 'assembly' : 'assemblies'} selected
                                    </span>
                                </div>
                            )}

                            {/* Filter Section */}
                            <div className="space-y-3">
                                <label className="text-sm font-semibold text-gray-700">
                                    Filter by Total Count:
                                </label>

                                {/* Filter Type Selection */}
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setFilterType('none')}
                                        className={`px-3 py-1.5 text-sm font-medium rounded transition ${filterType === 'none'
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                            }`}
                                    >
                                        None
                                    </button>
                                    <button
                                        onClick={() => setFilterType('top')}
                                        className={`px-3 py-1.5 text-sm font-medium rounded transition ${filterType === 'top'
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                            }`}
                                    >
                                        Top
                                    </button>
                                    <button
                                        onClick={() => setFilterType('range')}
                                        className={`px-3 py-1.5 text-sm font-medium rounded transition ${filterType === 'range'
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                            }`}
                                    >
                                        Range
                                    </button>
                                </div>

                                {/* Top N Input */}
                                {filterType === 'top' && (
                                    <div className="flex items-center gap-2">
                                        <label className="text-sm text-gray-600">Show top:</label>
                                        <input
                                            type="number"
                                            value={topN}
                                            onChange={(e) => setTopN(e.target.value)}
                                            min="1"
                                            placeholder="10"
                                            className="w-24 px-3 py-1.5 text-sm border border-gray-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
                                        />
                                        <span className="text-sm text-gray-600">records</span>
                                    </div>
                                )}

                                {/* Range Inputs */}
                                {filterType === 'range' && (
                                    <div className="flex items-center gap-2">
                                        <label className="text-sm text-gray-600">Count between:</label>
                                        <input
                                            type="number"
                                            value={rangeMin}
                                            onChange={(e) => setRangeMin(e.target.value)}
                                            min="0"
                                            placeholder="Min (e.g., 1000)"
                                            className="w-32 px-3 py-1.5 text-sm border border-gray-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
                                        />
                                        <span className="text-sm text-gray-600">to</span>
                                        <input
                                            type="number"
                                            value={rangeMax}
                                            onChange={(e) => setRangeMax(e.target.value)}
                                            min="0"
                                            placeholder="Max (e.g., 5000)"
                                            className="w-32 px-3 py-1.5 text-sm border border-gray-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
                                        />
                                    </div>
                                )}
                            </div>

                            {/* View Mode Toggle Buttons - Small Simple Buttons */}
                            {(selectAll || selectedAssemblies.length > 1) && (
                                <div className="flex items-center gap-3">
                                    <label className="text-sm font-semibold text-gray-700">
                                        View:
                                    </label>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setViewMode('separate')}
                                            className={`px-3 py-1.5 text-sm font-medium rounded transition ${viewMode === 'separate'
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                                }`}
                                        >
                                            From Each
                                        </button>
                                        <button
                                            onClick={() => setViewMode('combined')}
                                            className={`px-3 py-1.5 text-sm font-medium rounded transition ${viewMode === 'combined'
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                                }`}
                                        >
                                            From All
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Submit Button - Small and Simple */}
                            <div className="flex justify-end">
                                <button
                                    onClick={handleSearch}
                                    disabled={loading || (!selectAll && selectedAssemblies.length === 0)}
                                    className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                >
                                    {loading ? (
                                        <>
                                            <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Loading...
                                        </>
                                    ) : (
                                        'Submit'
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Results Section */}
                    {results.length > 0 && (
                        <div className="mt-8 border-t pt-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-gray-800">Caste Statistics</h2>
                                <span className="bg-blue-100 text-blue-800 py-2 px-4 rounded-full font-semibold">
                                    {results.length} Assembly/Assemblies
                                </span>
                            </div>

                            {/* Assembly Cards */}
                            <div className="space-y-6">
                                {results.map((assemblyData, index) => (
                                    <div
                                        key={assemblyData.assembly?.assembly_id || index}
                                        className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
                                    >
                                        {/* Assembly Header */}
                                        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-4">
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <h3 className="text-xl font-bold text-white">
                                                        {assemblyData.assembly?.assembly_name || 'Unknown Assembly'}
                                                    </h3>
                                                    <p className="text-blue-100 text-sm">
                                                        Assembly ID: {assemblyData.assembly?.assembly_id}
                                                    </p>
                                                </div>
                                                <div className=" bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-lg">
                                                    <p className="text-white text-sm font-semibold">Total Count</p>
                                                    <p className="text-white text-2xl font-bold">
                                                        {getTotalCount(assemblyData.stats).toLocaleString()}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Caste Table */}
                                        <div className="p-4">
                                            <table className="min-w-full bg-white">
                                                <thead className="bg-gray-100">
                                                    <tr>
                                                        <th className="py-3 px-6 text-left text-xs font-bold uppercase tracking-wider text-gray-700">
                                                            SN
                                                        </th>
                                                        <th className="py-3 px-6 text-left text-xs font-bold uppercase tracking-wider text-gray-700">
                                                            Caste
                                                        </th>
                                                        <th className="py-3 px-6 text-right text-xs font-bold uppercase tracking-wider text-gray-700">
                                                            Total Count
                                                        </th>
                                                        <th className="py-3 px-6 text-center text-xs font-bold uppercase tracking-wider text-gray-700">
                                                            Total Surname Details
                                                        </th>
                                                        <th className="py-3 px-6 text-right text-xs font-bold uppercase tracking-wider text-gray-700">
                                                            Percentage
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-200">
                                                    {applyFilters(assemblyData.stats).map((stat, idx) => {
                                                        const totalCount = getTotalCount(assemblyData.stats);
                                                        const percentage = ((stat.total_count / totalCount) * 100).toFixed(2);

                                                        return (
                                                            <tr key={idx} className="hover:bg-blue-50 transition duration-150">
                                                                <td className="py-4 px-6 text-sm text-gray-500 font-mono">
                                                                    {idx + 1}
                                                                </td>
                                                                <td className="py-4 px-6 text-sm font-semibold text-gray-900">
                                                                    {stat.surname_caste}
                                                                </td>
                                                                <td className="py-4 px-6 text-sm text-right font-bold text-blue-700">
                                                                    {stat.total_count.toLocaleString()}
                                                                </td>
                                                                <td className="py-4 px-6 text-center">
                                                                    <button
                                                                        onClick={() => {
                                                                            // In combined view (assembly_id = 0), pass the original assembly param
                                                                            // In separate view, pass the specific assembly ID
                                                                            if (assemblyData.assembly?.assembly_id === 0) {
                                                                                fetchSurnameDetails(stat.surname_caste, undefined, currentAssemblyParam);
                                                                            } else {
                                                                                fetchSurnameDetails(stat.surname_caste, assemblyData.assembly?.assembly_id);
                                                                            }
                                                                        }}
                                                                        className="text-lg font-bold text-cyan-600 hover:text-cyan-800 hover:underline transition cursor-pointer"
                                                                    >
                                                                        {stat.total_similar}
                                                                    </button>
                                                                </td>
                                                                <td className="py-4 px-6 text-sm text-right text-gray-600">
                                                                    <div className="flex items-center justify-end gap-2">
                                                                        <div className="w-24 bg-gray-200 rounded-full h-2">
                                                                            <div
                                                                                className="bg-blue-600 h-2 rounded-full"
                                                                                style={{ width: `${percentage}%` }}
                                                                            ></div>
                                                                        </div>
                                                                        <span className="font-semibold">{percentage}%</span>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* No Results Message */}
                    {!loading && results.length === 0 && (
                        <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                            <svg
                                className="mx-auto h-12 w-12 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                />
                            </svg>
                            <p className="text-lg mt-4">No results yet.</p>
                            <p className="text-sm mt-2">Select assemblies and click "Submit" to view data.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Surname Details Modal */}
            {showSurnameModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden">
                        {/* Modal Header */}
                        <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-6">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="text-2xl font-bold text-white">Surname Similar Details</h2>
                                    <p className="text-cyan-100 mt-1">Caste: {selectedCaste}</p>
                                </div>
                                <button
                                    onClick={closeSurnameModal}
                                    className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
                            {surnameLoading ? (
                                <div className="flex justify-center items-center py-12">
                                    <svg className="animate-spin h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                </div>
                            ) : surnameDetails ? (
                                <>
                                    <div className="mb-4 p-4 bg-cyan-50 rounded-lg border border-cyan-200">
                                        <p className="text-lg font-semibold text-gray-800">
                                            Total Surnames: <span className="text-cyan-600">{surnameDetails.total_surnames}</span>
                                        </p>
                                    </div>

                                    <div className="overflow-x-auto">
                                        <table className="min-w-full bg-white border border-gray-200">
                                            <thead className="bg-gray-100">
                                                <tr>
                                                    <th className="py-3 px-4 text-left text-xs font-bold uppercase tracking-wider text-gray-700 border-b">
                                                        SN
                                                    </th>
                                                    <th className="py-3 px-4 text-left text-xs font-bold uppercase tracking-wider text-gray-700 border-b">
                                                        Surname Similar
                                                    </th>
                                                    <th className="py-3 px-4 text-right text-xs font-bold uppercase tracking-wider text-gray-700 border-b">
                                                        Count
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200">
                                                {surnameDetails.surnames.map((surname, idx) => (
                                                    <tr key={idx} className="hover:bg-cyan-50 transition">
                                                        <td className="py-3 px-4 text-sm text-gray-500 font-mono">
                                                            {idx + 1}
                                                        </td>
                                                        <td className="py-3 px-4 text-sm font-medium text-gray-900">
                                                            {surname.surname_similar}
                                                        </td>
                                                        <td className="py-3 px-4 text-sm text-right font-bold text-cyan-600">
                                                            {surname.count.toLocaleString()}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </>
                            ) : (
                                <p className="text-center text-gray-500 py-8">No data available</p>
                            )}
                        </div>

                        {/* Modal Footer */}
                        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                            <button
                                onClick={closeSurnameModal}
                                className="w-full px-4 py-2 bg-gray-600 text-white font-medium rounded-md hover:bg-gray-700 transition"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CasteSearch;
