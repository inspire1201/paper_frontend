import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import surnameService from '../../services/surnameService';
import { useNavigate } from 'react-router-dom';

interface CategoryData {
    category_name: string;
    total_count: number;
}

interface AssemblyData {
    assembly_id: number;
    assembly_name: string;
    count: number;
}

interface AssemblyResponse {
    success: boolean;
    category_name: string;
    total_assemblies: number;
    total_count: number;
    data: AssemblyData[];
}

interface CategoryResponse {
    success: boolean;
    total_categories: number;
    data: CategoryData[];
}

const ByCategory: React.FC = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState<CategoryData[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    // Filter state (user input - not yet applied)
    const [filterType, setFilterType] = useState<'none' | 'top' | 'range'>('none');
    const [topN, setTopN] = useState<string>('10');
    const [rangeMin, setRangeMin] = useState<string>('');
    const [rangeMax, setRangeMax] = useState<string>('');

    // Applied filter state (actually used for filtering)
    const [appliedSearchTerm, setAppliedSearchTerm] = useState('');
    const [appliedFilterType, setAppliedFilterType] = useState<'none' | 'top' | 'range'>('none');
    const [appliedTopN, setAppliedTopN] = useState<string>('10');
    const [appliedRangeMin, setAppliedRangeMin] = useState<string>('');
    const [appliedRangeMax, setAppliedRangeMax] = useState<string>('');

    // Modal state
    const [showModal, setShowModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [assemblyData, setAssemblyData] = useState<AssemblyData[]>([]);
    const [modalLoading, setModalLoading] = useState(false);
    const [modalTotalCount, setModalTotalCount] = useState(0);

    useEffect(() => {
        fetchAllCategories();
    }, []);

    const fetchAllCategories = async () => {
        setLoading(true);
        try {
            const response: CategoryResponse = await surnameService.getAllCategoriesByArea();
            if (response.success) {
                setCategories(response.data);
                toast.success(`Loaded ${response.total_categories} categories`);
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
            toast.error('Failed to load category data');
        } finally {
            setLoading(false);
        }
    };

    const fetchAssemblyData = async (categoryName: string) => {
        setModalLoading(true);
        setSelectedCategory(categoryName);
        setShowModal(true);

        try {
            const response: AssemblyResponse = await surnameService.getCategoryAssemblyDistribution(categoryName);

            if (response.success) {
                setAssemblyData(response.data);
                setModalTotalCount(response.total_count);
            }
        } catch (error) {
            console.error('Error fetching assembly data:', error);
            toast.error('Failed to load assembly data');
        } finally {
            setModalLoading(false);
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setAssemblyData([]);
        setSelectedCategory('');
        setModalTotalCount(0);
    };

    // Apply filters using APPLIED values (not current input values)
    const applyFilters = (data: CategoryData[]): CategoryData[] => {
        if (appliedFilterType === 'none') {
            return data;
        }

        if (appliedFilterType === 'top') {
            const n = parseInt(appliedTopN) || 10;
            return [...data]
                .sort((a, b) => b.total_count - a.total_count)
                .slice(0, n);
        }

        if (appliedFilterType === 'range') {
            const min = parseInt(appliedRangeMin) || 0;
            const max = parseInt(appliedRangeMax) || Infinity;
            return data.filter(category => category.total_count >= min && category.total_count <= max);
        }

        return data;
    };

    // Filter categories based on APPLIED search term and filters
    const searchFilteredCategories = categories.filter(category =>
        category.category_name.toLowerCase().includes(appliedSearchTerm.toLowerCase())
    );

    const filteredCategories = applyFilters(searchFilteredCategories);

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-red-600 to-pink-600 p-6">
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
                        <div className="flex-1 text-center">
                            <h1 className="text-3xl font-bold text-white">Search Area - By Category</h1>
                            <p className="text-red-100 mt-2">Click on any category to see assembly-wise distribution</p>
                        </div>
                        <div className="w-20"></div> {/* Spacer for centering */}
                    </div>
                </div>

                <div className="p-8 space-y-6">
                    {/* Control Panel */}
                    <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
                        {/* Panel Header */}
                        <div className="bg-gradient-to-r from-red-600 to-pink-600 px-6 py-4">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                                </svg>
                                Search & Filter
                            </h2>
                            <p className="text-red-100 text-sm mt-1">Search filters automatically - Apply other filters manually</p>
                        </div>

                        <div className="p-6 space-y-5">
                            {/* Search Input */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Search Category
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search category..."
                                        value={searchTerm}
                                        onChange={(e) => {
                                            setSearchTerm(e.target.value);
                                            setAppliedSearchTerm(e.target.value); // Auto-apply search
                                        }}
                                        className="w-full px-3 py-1.5 pl-8 text-sm border border-gray-300 rounded focus:border-red-500 focus:ring-1 focus:ring-red-200"
                                    />
                                    <svg className="w-4 h-4 text-gray-400 absolute left-2 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                            </div>

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
                                            ? 'bg-red-600 text-white'
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                            }`}
                                    >
                                        None
                                    </button>
                                    <button
                                        onClick={() => setFilterType('top')}
                                        className={`px-3 py-1.5 text-sm font-medium rounded transition ${filterType === 'top'
                                            ? 'bg-red-600 text-white'
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                            }`}
                                    >
                                        Top
                                    </button>
                                    <button
                                        onClick={() => setFilterType('range')}
                                        className={`px-3 py-1.5 text-sm font-medium rounded transition ${filterType === 'range'
                                            ? 'bg-red-600 text-white'
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
                                            className="w-24 px-3 py-1.5 text-sm border border-gray-300 rounded focus:border-red-500 focus:ring-1 focus:ring-red-200"
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
                                            className="w-32 px-3 py-1.5 text-sm border border-gray-300 rounded focus:border-red-500 focus:ring-1 focus:ring-red-200"
                                        />
                                        <span className="text-sm text-gray-600">to</span>
                                        <input
                                            type="number"
                                            value={rangeMax}
                                            onChange={(e) => setRangeMax(e.target.value)}
                                            min="0"
                                            placeholder="Max (e.g., 5000)"
                                            className="w-32 px-3 py-1.5 text-sm border border-gray-300 rounded focus:border-red-500 focus:ring-1 focus:ring-red-200"
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Submit and Reset Buttons */}
                            <div className="flex justify-end gap-3">
                                {/* Reset Button */}
                                <button
                                    onClick={() => {
                                        // Reset input values
                                        setSearchTerm('');
                                        setFilterType('none');
                                        setTopN('10');
                                        setRangeMin('');
                                        setRangeMax('');
                                        // Reset applied values
                                        setAppliedSearchTerm('');
                                        setAppliedFilterType('none');
                                        setAppliedTopN('10');
                                        setAppliedRangeMin('');
                                        setAppliedRangeMax('');
                                        toast.success('Filters reset successfully!');
                                    }}
                                    className="px-4 py-2 bg-red-50 text-red-600 border border-red-300 text-sm font-medium rounded hover:bg-red-100 transition flex items-center gap-2"
                                >
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                                    </svg>
                                    Reset
                                </button>

                                {/* Apply Filters Button */}
                                <button
                                    onClick={() => {
                                        // Apply current filter values to applied state (search is auto-applied)
                                        setAppliedFilterType(filterType);
                                        setAppliedTopN(topN);
                                        setAppliedRangeMin(rangeMin);
                                        setAppliedRangeMax(rangeMax);
                                        toast.success('Filters applied successfully!');
                                    }}
                                    className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition flex items-center gap-2"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                                    </svg>
                                    Apply Filters
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Stats Badge */}
                    <div className="flex justify-end gap-4">
                        <div className="bg-gray-100 text-gray-800 py-2 px-6 rounded-full font-semibold">
                            Total: {categories.length} categories
                        </div>
                    </div>

                    {/* Categories Table */}
                    {loading ? (
                        <div className="flex justify-center items-center py-12">
                            <svg className="animate-spin h-10 w-10 text-red-600" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        </div>
                    ) : filteredCategories.length > 0 ? (
                        <>
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white border border-gray-200 shadow-sm rounded-lg">
                                    <thead className="bg-gray-100 sticky top-0 z-10">
                                        <tr>
                                            <th className="py-3 px-6 text-left text-xs font-bold uppercase tracking-wider text-gray-700">SN</th>
                                            <th className="py-3 px-6 text-left text-xs font-bold uppercase tracking-wider text-gray-700">Category Name</th>
                                            <th className="py-3 px-6 text-right text-xs font-bold uppercase tracking-wider text-gray-700">Total Count</th>
                                            <th className="py-3 px-6 text-center text-xs font-bold uppercase tracking-wider text-gray-700">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {filteredCategories.map((category, index) => (
                                            <tr key={index} className="hover:bg-red-50 transition duration-150">
                                                <td className="py-4 px-6 text-sm text-gray-500 font-mono">{index + 1}</td>
                                                <td className="py-4 px-6 text-sm font-semibold text-gray-900">{category.category_name}</td>
                                                <td className="py-4 px-6 text-sm text-right font-bold text-red-700">{category.total_count.toLocaleString()}</td>
                                                <td className="py-4 px-6 text-center">
                                                    <button
                                                        onClick={() => fetchAssemblyData(category.category_name)}
                                                        className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition"
                                                    >
                                                        View Assemblies
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <p className="text-lg mt-4">No categories found</p>
                            <p className="text-sm mt-2">Try adjusting your search or filters</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Assembly Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden">
                        {/* Modal Header */}
                        <div className="bg-gradient-to-r from-pink-600 to-red-600 p-6">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="text-2xl font-bold text-white">Assembly Distribution</h2>
                                    <p className="text-pink-100 mt-1">Category: {selectedCategory}</p>
                                </div>
                                <button
                                    onClick={closeModal}
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
                            {modalLoading ? (
                                <div className="flex justify-center items-center py-12">
                                    <svg className="animate-spin h-10 w-10 text-red-600" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                </div>
                            ) : assemblyData.length > 0 ? (
                                <>
                                    <div className="mb-4 p-4 bg-pink-50 rounded-lg border border-pink-200">
                                        <p className="text-lg font-semibold text-gray-800">
                                            Total Count: <span className="text-pink-600">{modalTotalCount.toLocaleString()}</span>
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
                                                        Assembly Name
                                                    </th>
                                                    <th className="py-3 px-4 text-right text-xs font-bold uppercase tracking-wider text-gray-700 border-b">
                                                        Count
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200">
                                                {assemblyData.map((assembly, idx) => (
                                                    <tr key={idx} className="hover:bg-pink-50 transition">
                                                        <td className="py-3 px-4 text-sm text-gray-500 font-mono">
                                                            {idx + 1}
                                                        </td>
                                                        <td className="py-3 px-4 text-sm font-medium text-gray-900">
                                                            {assembly.assembly_name}
                                                        </td>
                                                        <td className="py-3 px-4 text-sm text-right font-bold text-pink-600">
                                                            {assembly.count.toLocaleString()}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </>
                            ) : (
                                <p className="text-center text-gray-500 py-8">No assembly data available</p>
                            )}
                        </div>

                        {/* Modal Footer */}
                        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                            <button
                                onClick={closeModal}
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

export default ByCategory;