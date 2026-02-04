import { useState, useEffect } from 'react';
import { Search, MapPin, Users, Hammer, Plus, Briefcase, User, FileText } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const ContractorDashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeTab, setActiveTab] = useState('jobs'); // 'jobs', 'team', 'requests'

    // Read from localStorage or fallback to location state
    const profile = JSON.parse(localStorage.getItem('majdhur_contractor_profile') || 'null') || location.state?.profile;

    // State for requests
    const [labourRequests, setLabourRequests] = useState([]);
    const [userApplications, setUserApplications] = useState([]);
    const [sentHireRequests, setSentHireRequests] = useState([]);
    const [requestFilter, setRequestFilter] = useState('labour'); // 'labour', 'user', or 'sent'

    useEffect(() => {
        // Load data from local storage
        if (activeTab === 'requests') {
            const lReqs = JSON.parse(localStorage.getItem('majdhur_labour_work_requests') || '[]');
            const uApps = JSON.parse(localStorage.getItem('majdhur_project_applications') || '[]');
            const allSent = JSON.parse(localStorage.getItem('majdhur_hire_requests') || '[]');

            // Filter sent requests by current contractor
            const mySent = allSent.filter(r =>
                r.requesterType === 'Contractor' &&
                r.requesterName === (profile?.businessDetails?.businessName || 'BuildWell Constructions')
            );

            setLabourRequests(lReqs);
            setUserApplications(uApps);
            setSentHireRequests(mySent);
        }
    }, [activeTab, profile]);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <div className="bg-white px-6 py-4 shadow-sm sticky top-0 z-10 flex justify-between items-center">
                <div>
                    <h1 className="text-xl font-bold text-gray-900">Contractor Panel</h1>
                    <p className="text-xs text-gray-500">Manage jobs & team</p>
                </div>
                <button
                    onClick={() => navigate('/contractor/settings')}
                    className="w-10 h-10 bg-yellow-100 text-yellow-700 rounded-full flex items-center justify-center font-bold overflow-hidden border border-yellow-200"
                >
                    {profile?.profileImage ? (
                        <img src={profile.profileImage} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                        <span>{profile?.firstName ? profile.firstName[0].toUpperCase() : 'CN'}</span>
                    )}
                </button>
            </div>

            {/* Tabs */}
            <div className="flex bg-white border-t border-gray-100 overflow-x-auto scrollbar-hide">
                <button
                    onClick={() => setActiveTab('jobs')}
                    className={`flex-1 min-w-[100px] py-3 text-sm font-medium ${activeTab === 'jobs' ? 'text-yellow-600 border-b-2 border-yellow-500' : 'text-gray-500'}`}
                >
                    Find Jobs
                </button>
                <button
                    onClick={() => setActiveTab('my_projects')}
                    className={`flex-1 min-w-[100px] py-3 text-sm font-medium ${activeTab === 'my_projects' ? 'text-yellow-600 border-b-2 border-yellow-500' : 'text-gray-500'}`}
                >
                    My Projects
                </button>
                <button
                    onClick={() => setActiveTab('team')}
                    className={`flex-1 min-w-[100px] py-3 text-sm font-medium ${activeTab === 'team' ? 'text-yellow-600 border-b-2 border-yellow-500' : 'text-gray-500'}`}
                >
                    My Labours
                </button>
                <button
                    onClick={() => setActiveTab('requests')}
                    className={`flex-1 min-w-[100px] py-3 text-sm font-medium ${activeTab === 'requests' ? 'text-yellow-600 border-b-2 border-yellow-500' : 'text-gray-500'}`}
                >
                    Requests
                </button>
            </div>

            <div className="flex-1 p-6 overflow-y-auto">

                {/* FIND JOBS SECTION */}
                {activeTab === 'jobs' && (
                    <div className="space-y-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search projects..."
                                className="w-full bg-white pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            />
                        </div>

                        {/* Additional Action Buttons */}
                        <div className="flex gap-2 mb-4">
                            <button
                                onClick={() => navigate('/contractor/hire')}
                                className="flex-1 bg-gray-900 text-white py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2 hover:bg-gray-800"
                            >
                                <Users className="w-4 h-4" />
                                Hire Workers
                            </button>
                            <button
                                onClick={() => navigate('/contractor/add-project')}
                                className="flex-1 bg-yellow-100 text-yellow-800 py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2 hover:bg-yellow-200"
                            >
                                <Plus className="w-4 h-4" />
                                Post Job
                            </button>
                        </div>

                        {/* Job Card */}
                        {[1, 2, 3].map((job) => (
                            <div key={job} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-gray-900">Residential Complex Wiring</h3>
                                    <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-md">Open</span>
                                </div>
                                <div className="flex items-center text-gray-500 text-sm mb-3">
                                    <MapPin className="w-4 h-4 mr-1" />
                                    <span>Vadodara, Gujarat</span>
                                </div>
                                <div className="flex items-center justify-between mt-4">
                                    <div className="text-sm font-medium text-gray-900">₹ 45,000</div>
                                    <button className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800">
                                        Bid Now
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* MY PROJECTS SECTION */}
                {activeTab === 'my_projects' && (
                    <div className="space-y-4">
                        <button
                            onClick={() => navigate('/contractor/add-project')}
                            className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center text-gray-500 hover:border-yellow-400 hover:text-yellow-600 transition-colors"
                        >
                            <Plus className="w-5 h-5 mr-2" />
                            Post New Job
                        </button>

                        {(() => {
                            const allProjects = JSON.parse(localStorage.getItem('majdhur_projects') || '[]');
                            const myProjects = allProjects.filter(p => !profile || p.contractorId === profile.mobile); // Show all if no profile for demo, or match mobile

                            if (myProjects.length === 0) {
                                return (
                                    <div className="text-center py-10 text-gray-500">
                                        <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                        <p>You haven't posted any jobs yet.</p>
                                    </div>
                                );
                            }

                            return myProjects.map((project) => (
                                <div key={project.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h3 className="font-bold text-gray-900">{project.title}</h3>
                                            <p className="text-xs text-gray-500">{project.company}</p>
                                        </div>
                                        <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-md">{project.status}</span>
                                    </div>
                                    <div className="flex items-center text-gray-500 text-sm mb-3">
                                        <MapPin className="w-4 h-4 mr-1" />
                                        <span>{project.state}</span>
                                    </div>
                                    <div className="flex items-center justify-between mt-4 border-t pt-3">
                                        <div className="text-xs font-medium text-gray-500">
                                            Posted on {project.date}
                                        </div>
                                        <button
                                            onClick={() => navigate(`/contractor/project/${project.id}`)}
                                            className="text-yellow-600 text-sm font-medium hover:underline"
                                        >
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            ));
                        })()}
                    </div>
                )}

                {/* MY LABOURS SECTION */}
                {activeTab === 'team' && (
                    <div className="space-y-4">
                        <button className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center text-gray-500 hover:border-yellow-400 hover:text-yellow-600 transition-colors">
                            <Plus className="w-5 h-5 mr-2" />
                            Add Labour to Team
                        </button>

                        {[1, 2].map((labour) => (
                            <div key={labour} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                                    <Hammer className="w-6 h-6 text-gray-500" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-gray-900">Ramesh Kumar</h4>
                                    <p className="text-xs text-gray-500">Electrician • ₹800/day</p>
                                </div>
                                <button className="text-blue-600 text-sm font-medium">
                                    Manage
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {/* REQUESTS SECTION */}
                {activeTab === 'requests' && (
                    <div className="space-y-4">
                        <div className="flex gap-2 p-1 bg-gray-100 rounded-lg mb-4 overflow-x-auto scrollbar-hide">
                            <button
                                onClick={() => setRequestFilter('labour')}
                                className={`flex-1 min-w-[100px] py-1.5 text-xs font-semibold rounded-md transition-all ${requestFilter === 'labour' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'}`}
                            >
                                Received (Labour)
                            </button>
                            <button
                                onClick={() => setRequestFilter('user')}
                                className={`flex-1 min-w-[100px] py-1.5 text-xs font-semibold rounded-md transition-all ${requestFilter === 'user' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'}`}
                            >
                                Received (User)
                            </button>
                            <button
                                onClick={() => setRequestFilter('sent')}
                                className={`flex-1 min-w-[100px] py-1.5 text-xs font-semibold rounded-md transition-all ${requestFilter === 'sent' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'}`}
                            >
                                Sent to Labour
                            </button>
                        </div>

                        {requestFilter === 'labour' ? (
                            labourRequests.length > 0 ? (
                                labourRequests.map((req) => (
                                    <div key={req.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold text-xs">
                                                {req.labourName.substring(0, 2).toUpperCase()}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-gray-900 text-sm">{req.labourName}</h3>
                                                <p className="text-xs text-orange-600 font-medium">Requesting Work</p>
                                            </div>
                                            <span className="ml-auto text-xs text-gray-400">{req.date}</span>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => navigate(`/contractor/application/${req.id}?type=labour`)}
                                                className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg text-xs font-medium"
                                            >
                                                View
                                            </button>
                                            <button
                                                onClick={() => navigate(`/contractor/application/${req.id}?type=labour`)}
                                                className="flex-1 bg-gray-900 text-white py-2 rounded-lg text-xs font-medium"
                                            >
                                                Accept Request
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-10 text-gray-500">
                                    No labour requests yet.
                                </div>
                            )
                        ) : requestFilter === 'user' ? (
                            userApplications.length > 0 ? (
                                userApplications.map((app) => (
                                    <div key={app.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-xs">
                                                {app.applicantName.substring(0, 2).toUpperCase()}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-gray-900 text-sm">{app.applicantName}</h3>
                                                <p className="text-xs text-blue-600 font-medium">Applied for: {app.projectTitle}</p>
                                            </div>
                                            {app.status && (
                                                <span className={`ml-auto text-xs px-2 py-1 rounded-md font-bold ${app.status === 'Accepted' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                                                    {app.status}
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => navigate(`/contractor/application/${app.id}?type=user`)}
                                                className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg text-xs font-medium"
                                            >
                                                View
                                            </button>
                                            <button
                                                onClick={() => navigate(`/contractor/application/${app.id}?type=user`)}
                                                className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-xs font-medium"
                                            >
                                                View Application
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-10 text-gray-500">
                                    No user applications yet.
                                </div>
                            )
                        ) : (
                            sentHireRequests.length > 0 ? (
                                sentHireRequests.map((req) => (
                                    <div key={req.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
                                                {req.workerImage ? (
                                                    <img src={req.workerImage} alt={req.workerName} className="w-full h-full object-cover" />
                                                ) : (
                                                    <User className="w-5 h-5 text-gray-400" />
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-bold text-gray-900 text-sm">{req.workerName}</h3>
                                                <p className="text-xs text-gray-500">{req.workerRole}</p>
                                            </div>
                                            <span className={`px-2 py-1 rounded-md text-[10px] font-bold ${req.status === 'Accepted' ? 'bg-green-100 text-green-700' :
                                                req.status === 'Declined' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                                                }`}>
                                                {req.status.toUpperCase()}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-10 text-gray-500">
                                    No hire requests sent yet.
                                </div>
                            )
                        )}
                    </div>
                )}

            </div>
        </div>
    );
};

export default ContractorDashboard;
