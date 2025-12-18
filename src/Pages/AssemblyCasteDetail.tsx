import React, { useState, useEffect, useMemo } from 'react';
import toast from 'react-hot-toast';
import surnameService from '../services/surnameService';
import { useNavigate } from 'react-router-dom';

interface AssemblyCasteDetailData {
    id: number;
    ac_no: number;
    assembly_name: string;
    total_voter: number;
    total_surname: number;
    surname_covered_criteria: number;
    voters_covered_criteria: number;
    voters_null_surname: number;
    voters_pct_covered: number;
    voters_pct_null_surname: number;
    voters_pct_not_covered: number;
    voters_pct_not_to_work: number;
    surname_similar_caste: number | null;
    filled_caste: number | null;
    filled_category: number | null;
    voters_filled_caste: number;
    voters_filled_category: number;
    voters_filled_caste2: number;
    voters_filled_category3: number;
    filled_caste_diff: number | null;
    filled_category_diff: number | null;
    caste_covered_vs_done: number | null;
    caste_covered_vs_done_pct: number | null;
}

interface ApiResponse {
    success: boolean;
    data: AssemblyCasteDetailData[];
}

type SortField = keyof AssemblyCasteDetailData;
type SortDirection = 'asc' | 'desc' | null;

const AssemblyCasteDetail: React.FC = () => {
    const navigate = useNavigate();
    const [data, setData] = useState<AssemblyCasteDetailData[]>([]);
    const [loading, setLoading] = useState(false);
    const [sortField, setSortField] = useState<SortField | null>(null);
    const [sortDirection, setSortDirection] = useState<SortDirection>(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response: ApiResponse = await surnameService.getAllAssemblyCasteDetail();
            if (response.success) {
                setData(response.data);
                toast.success(`Loaded ${response.data.length} records`);
            }
        } catch (error) {
            console.error('Error fetching assembly caste detail:', error);
            toast.error('Failed to load data');
        } finally {
            setLoading(false);
        }
    };

    const handleSort = (field: SortField) => {
        let direction: SortDirection = 'asc';

        if (sortField === field) {
            if (sortDirection === 'asc') {
                direction = 'desc';
            } else if (sortDirection === 'desc') {
                direction = null;
            }
        }

        setSortField(direction ? field : null);
        setSortDirection(direction);
    };

    // Memoize sorted data for better performance
    const sortedData = useMemo(() => {
        if (!sortField || !sortDirection) {
            return data;
        }

        return [...data].sort((a, b) => {
            const aValue = a[sortField];
            const bValue = b[sortField];

            if (aValue === null && bValue === null) return 0;
            if (aValue === null) return sortDirection === 'asc' ? 1 : -1;
            if (bValue === null) return sortDirection === 'asc' ? -1 : 1;

            if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
            return 0;
        });
    }, [data, sortField, sortDirection]);

    const SortIcon = ({ field }: { field: SortField }) => {
        if (sortField !== field) {
            return (
                <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                </svg>
            );
        }

        return sortDirection === 'asc' ? (
            <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
        ) : (
            <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
        );
    };

    const TableHeader = ({ field, children, align = 'left' }: { field: SortField; children: React.ReactNode; align?: 'left' | 'right' }) => (
        <th
            onClick={() => handleSort(field)}
            className={`py-3 px-4 text-xs font-semibold uppercase tracking-wide text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors select-none ${align === 'right' ? 'text-right' : 'text-left'
                }`}
        >
            <div className={`flex items-center gap-1.5 ${align === 'right' ? 'justify-end' : 'justify-start'}`}>
                <span>{children}</span>
                <SortIcon field={field} />
            </div>
        </th>
    );

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 p-4">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white rounded-lg shadow p-12 flex flex-col items-center justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-3 border-gray-200 border-t-indigo-600"></div>
                        <p className="mt-4 text-gray-600">Loading data...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <div className="max-w-[1600px] mx-auto">
                {/* Header */}
                <div className="bg-white rounded-lg shadow mb-4">
                    <div className="bg-indigo-600 p-4 rounded-t-lg">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => navigate(-1)}
                                className="text-white hover:bg-indigo-700 rounded-lg px-3 py-2 transition-colors flex items-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                <span className="text-sm font-medium">Back</span>
                            </button>
                            <div className="flex-1">
                                <h1 className="text-2xl font-bold text-white">Assembly Caste Detail</h1>
                                <p className="text-indigo-100 text-sm mt-0.5">Comprehensive voter statistics</p>
                            </div>
                        </div>
                    </div>

                    {/* Stats Bar */}
                    <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                        <div className="flex items-center justify-between flex-wrap gap-3">
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <span className="text-sm text-gray-600">Total Records:</span>
                                <span className="text-sm font-bold text-indigo-600">{data.length}</span>
                            </div>

                            {sortField && (
                                <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-md border border-gray-200">
                                    <span className="text-xs text-gray-600">
                                        Sorted by: <span className="font-semibold text-indigo-600">{sortField.replace(/_/g, ' ')}</span>
                                    </span>
                                    <button
                                        onClick={() => {
                                            setSortField(null);
                                            setSortDirection(null);
                                        }}
                                        className="text-gray-400 hover:text-red-500 transition-colors"
                                        title="Clear sort"
                                    >
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Info Tip */}
                    <div className="px-4 py-2 bg-blue-50 border-b border-blue-100">
                        <p className="text-xs text-blue-700">
                            💡 Click column headers to sort data
                        </p>
                    </div>
                </div>

                {/* Data Table */}
                {sortedData.length > 0 ? (
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50 sticky top-0">
                                    <tr>
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
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-100">
                                    {sortedData.map((item) => (
                                        <tr
                                            key={item.id}
                                            className="hover:bg-gray-50 transition-colors"
                                        >
                                            <td className="py-3 px-4 text-sm font-semibold text-gray-900 whitespace-nowrap">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded bg-indigo-100 text-indigo-800">
                                                    {item.ac_no === 0 ? 'All' : item.ac_no}
                                                </span>
                                            </td>
                                            <td className="py-3 px-4 text-sm text-gray-900 font-medium whitespace-nowrap">
                                                {item.assembly_name}
                                            </td>
                                            <td className="py-3 px-4 text-sm text-right font-semibold text-gray-900 whitespace-nowrap">
                                                {item.total_voter.toLocaleString()}
                                            </td>
                                            <td className="py-3 px-4 text-sm text-right text-gray-700 whitespace-nowrap">
                                                {item.total_surname.toLocaleString()}
                                            </td>
                                            <td className="py-3 px-4 text-sm text-right text-gray-700 whitespace-nowrap">
                                                {item.surname_covered_criteria.toLocaleString()}
                                            </td>
                                            <td className="py-3 px-4 text-sm text-right text-gray-700 whitespace-nowrap">
                                                {item.voters_covered_criteria.toLocaleString()}
                                            </td>
                                            <td className="py-3 px-4 text-sm text-right whitespace-nowrap">
                                                <span className="inline-flex items-center px-2 py-0.5 rounded bg-green-100 text-green-800 font-semibold text-xs">
                                                    {item.voters_pct_covered.toFixed(2)}%
                                                </span>
                                            </td>
                                            <td className="py-3 px-4 text-sm text-right text-gray-600 whitespace-nowrap">
                                                {item.voters_pct_null_surname.toFixed(2)}%
                                            </td>
                                            <td className="py-3 px-4 text-sm text-right text-gray-600 whitespace-nowrap">
                                                {item.voters_pct_not_covered.toFixed(2)}%
                                            </td>
                                            <td className="py-3 px-4 text-sm text-right text-gray-600 whitespace-nowrap">
                                                {item.voters_pct_not_to_work.toFixed(2)}%
                                            </td>
                                            <td className="py-3 px-4 text-sm text-right text-blue-700 font-medium whitespace-nowrap">
                                                {item.surname_similar_caste?.toLocaleString() ?? '-'}
                                            </td>
                                            <td className="py-3 px-4 text-sm text-right text-blue-700 font-medium whitespace-nowrap">
                                                {item.filled_caste?.toLocaleString() ?? '-'}
                                            </td>
                                            <td className="py-3 px-4 text-sm text-right text-blue-700 font-medium whitespace-nowrap">
                                                {item.filled_category?.toLocaleString() ?? '-'}
                                            </td>
                                            <td className="py-3 px-4 text-sm text-right text-gray-700 whitespace-nowrap">
                                                {item.voters_filled_caste.toLocaleString()}
                                            </td>
                                            <td className="py-3 px-4 text-sm text-right text-gray-700 whitespace-nowrap">
                                                {item.voters_filled_category.toLocaleString()}
                                            </td>
                                            <td className="py-3 px-4 text-sm text-right whitespace-nowrap">
                                                <span className={`font-medium ${item.filled_caste_diff ? 'text-orange-600' : 'text-gray-400'}`}>
                                                    {item.filled_caste_diff?.toLocaleString() ?? '-'}
                                                </span>
                                            </td>
                                            <td className="py-3 px-4 text-sm text-right whitespace-nowrap">
                                                <span className={`font-medium ${item.filled_category_diff ? 'text-orange-600' : 'text-gray-400'}`}>
                                                    {item.filled_category_diff?.toLocaleString() ?? '-'}
                                                </span>
                                            </td>
                                            <td className="py-3 px-4 text-sm text-right text-indigo-700 font-medium whitespace-nowrap">
                                                {item.caste_covered_vs_done?.toLocaleString() ?? '-'}
                                            </td>
                                            <td className="py-3 px-4 text-sm text-right whitespace-nowrap">
                                                <span className="inline-flex items-center px-2 py-0.5 rounded bg-green-100 text-green-800 font-semibold text-xs">
                                                    {item.caste_covered_vs_done_pct?.toFixed(2) ?? '-'}%
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow p-12 text-center">
                        <div className="flex flex-col items-center">
                            <div className="bg-gray-100 rounded-full p-4 mb-3">
                                <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-700 mb-1">No Data Available</h3>
                            <p className="text-sm text-gray-500">There are no assembly caste details to display.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AssemblyCasteDetail;
