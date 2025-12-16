import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const Home = () => {
    const navigate = useNavigate();
    const user = authService.getCurrentUser();

    const handleLogout = () => {
        authService.logout();
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-xl font-semibold text-gray-900">Welcome, {user?.name || 'User'}!</h1>
                        <button
                            onClick={handleLogout}
                            className="px-3 py-1.5 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-6xl mx-auto px-4 py-8">
                {/* Title */}
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Surname Data Management
                    </h2>
                    <p className="text-gray-600">
                        Choose your search type
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* LEFT SECTION: In Area */}
                    <div className="bg-white rounded-lg p-6 shadow border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">In Area</h3>

                        <div className="space-y-3">
                            {/* Search Surname */}
                            <button
                                onClick={() => navigate('/surname-similar-search')}
                                className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-green-50 border border-gray-200 hover:border-green-300 rounded-md transition text-left"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center flex-shrink-0">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-900">Search Surname</h4>
                                        <p className="text-xs text-gray-500">View surname entries</p>
                                    </div>
                                </div>
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>

                            {/* Search Caste */}
                            <button
                                onClick={() => navigate('/caste-search')}
                                className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-md transition text-left"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center flex-shrink-0">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-900">Search Caste</h4>
                                        <p className="text-xs text-gray-500">View caste statistics</p>
                                    </div>
                                </div>
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>

                            {/* Search Category */}
                            <button
                                onClick={() => navigate('/category-search')}
                                className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-purple-50 border border-gray-200 hover:border-purple-300 rounded-md transition text-left"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-purple-500 rounded flex items-center justify-center flex-shrink-0">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-900">Search Category</h4>
                                        <p className="text-xs text-gray-500">View category statistics</p>
                                    </div>
                                </div>
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* RIGHT SECTION: Search Area */}
                    <div className="bg-white rounded-lg p-6 shadow border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Search Area</h3>

                        <div className="space-y-3">
                            {/* By Surname */}
                            <button
                                onClick={() => navigate('/in-area/by-surname')}
                                className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-amber-50 border border-gray-200 hover:border-amber-300 rounded-md transition text-left"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-amber-500 rounded flex items-center justify-center flex-shrink-0">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-900">By Surname</h4>
                                        <p className="text-xs text-gray-500">Browse by surname</p>
                                    </div>
                                </div>
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>

                            {/* By Caste */}
                            <button
                                onClick={() => navigate('/in-area/by-caste')}
                                className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-orange-50 border border-gray-200 hover:border-orange-300 rounded-md transition text-left"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center flex-shrink-0">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-900">By Caste</h4>
                                        <p className="text-xs text-gray-500">Browse by caste</p>
                                    </div>
                                </div>
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>

                            {/* By Category */}
                            <button
                                onClick={() => navigate('/in-area/by-category')}
                                className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-red-50 border border-gray-200 hover:border-red-300 rounded-md transition text-left"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center flex-shrink-0">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-900">By Category</h4>
                                        <p className="text-xs text-gray-500">Browse by category</p>
                                    </div>
                                </div>
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Home;
