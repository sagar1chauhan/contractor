import { useNavigate } from 'react-router-dom';
import { ChevronLeft, MapPin, Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import LabourBottomNav from '../components/LabourBottomNav';

const AppliedJobs = () => {
    const navigate = useNavigate();
    const [appliedJobs, setAppliedJobs] = useState([]);

    useEffect(() => {
        // Load applied jobs from localStorage
        const savedJobs = JSON.parse(localStorage.getItem('majdhur_applied_jobs') || '[]');
        setAppliedJobs(savedJobs);
    }, []);

    return (
        <div className="min-h-screen bg-[#f8fafc] pb-32">
            {/* Header */}
            <header className="bg-white px-6 py-4 flex items-center gap-4 sticky top-0 z-50 border-b border-gray-100">
                <button onClick={() => navigate(-1)} className="p-1">
                    <ChevronLeft className="w-6 h-6 text-gray-900" />
                </button>
                <h1 className="text-lg font-bold text-gray-900">Applied Jobs ({appliedJobs.length})</h1>
            </header>

            <div className="px-6 py-6">
                {appliedJobs.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6">
                        {appliedJobs.map((job, idx) => (
                            <div key={idx} className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-gray-50 flex flex-col sm:flex-row">
                                {/* Image Section */}
                                <div className="p-4 sm:w-1/3">
                                    <div className="w-full h-32 bg-green-100 rounded-[24px] flex items-center justify-center text-5xl overflow-hidden relative grayscale">
                                        🍇
                                        <div className="absolute inset-0 bg-green-800/10"></div>
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="p-5 flex-1 flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center gap-1.5 text-gray-400 text-[10px] mb-2 font-medium uppercase tracking-wider">
                                            <MapPin className="w-3.5 h-3.5" />
                                            <span>{job.location}</span>
                                        </div>
                                        <h3 className="text-gray-900 font-bold mb-1 text-base">{job.category}</h3>
                                        <p className="text-gray-900 font-bold text-lg leading-snug mb-2">{job.title}</p>
                                        <p className="text-red-500 font-bold text-base mb-4">{job.monthlyPay} Per Month</p>
                                    </div>
                                    <button
                                        onClick={() => navigate(`/labour/job-details/${job.id}`)}
                                        className="w-full bg-[#dbeafe] text-[#2563eb] py-3 rounded-2xl font-bold text-sm hover:bg-blue-100 transition-colors"
                                    >
                                        View Job
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Search className="w-10 h-10 text-gray-300" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">No jobs applied yet</h2>
                        <p className="text-gray-500 font-medium px-10">You'll see the jobs you've applied for listing here.</p>
                        <button
                            onClick={() => navigate('/labour/dashboard')}
                            className="mt-8 bg-blue-600 text-white px-8 py-3 rounded-2xl font-bold text-sm hover:bg-blue-700 transition-colors"
                        >
                            Explore Jobs
                        </button>
                    </div>
                )}
            </div>

            <LabourBottomNav />
        </div>
    );
};

export default AppliedJobs;
