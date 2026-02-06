import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Bell, Search, Filter, Play, LogOut, ChevronDown, Briefcase, Users } from 'lucide-react';
import UserBottomNav from '../components/UserBottomNav';
import toast from 'react-hot-toast';

const MOCK_PROJECTS = [
    { id: 1, company: 'Maharaja Dehydration Pvt Ltd', industry: 'Food Industry', title: 'Factory worker', type: 'Labour Supply', state: 'Gujarat', tags: ['Labour Supply'] },
    { id: 2, company: 'BuildWell Constructions', industry: 'Construction', title: 'Site Supervisor', type: 'Construction', state: 'Maharashtra', tags: ['Supervision', 'Civil'] },
    { id: 3, company: 'ElectroFix Services', industry: 'Maintenance', title: 'Senior Electrician', type: 'Electrical', state: 'Delhi', tags: ['Wiring', 'Maintenance'] },
    { id: 4, company: 'Green Field Farms', industry: 'Agriculture', title: 'Farm Hands Needed', type: 'Labour Supply', state: 'Gujarat', tags: ['Agriculture'] },
    { id: 5, company: 'PipeMasters Ltd', industry: 'Plumbing', title: 'Industrial Plumber', type: 'Plumbing', state: 'Maharashtra', tags: ['Pipe Fitting'] },
    { id: 6, company: 'TechPark Infra', industry: 'Construction', title: 'Masons Required', type: 'Construction', state: 'Delhi', tags: ['Masonry'] },
];

const UserDashboard = () => {
    const location = useLocation();
    // Initialize profile directly from location state
    const [profile] = useState(location.state?.profile || JSON.parse(localStorage.getItem('majdhur_user_profile') || 'null'));
    const [activeFilter, setActiveFilter] = useState({ work: 'All Work', state: 'All State' });
    const [isWorkDropdownOpen, setIsWorkDropdownOpen] = useState(false);
    const [isStateDropdownOpen, setIsStateDropdownOpen] = useState(false);

    // Filter Logic
    const filteredProjects = [...JSON.parse(localStorage.getItem('majdhur_projects') || '[]'), ...MOCK_PROJECTS].filter(project => {
        const matchesWork = activeFilter.work === 'All Work' || project.type === activeFilter.work;
        const matchesState = activeFilter.state === 'All State' || project.state === activeFilter.state;
        return matchesWork && matchesState;
    });

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <div className="p-6 flex justify-between items-center bg-white shadow-sm sticky top-0 z-10 w-full">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center overflow-hidden">
                        {profile?.profileImage ? (
                            <img src={profile.profileImage} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-white text-xs">IMG</span>
                        )}
                    </div>
                    <div>
                        <p className="text-xs text-gray-500">Welcome Back,</p>
                        <h2 className="font-bold text-gray-900">
                            {profile ? `Namaste, ${profile.firstName}` : 'Namaste, Sagar'}
                        </h2>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button className="p-2 border rounded-full hover:bg-gray-100">
                        <Bell className="w-5 h-5 text-gray-600" />
                    </button>
                    <button className="p-2 border rounded-full hover:bg-gray-100">
                        <LogOut className="w-5 h-5 text-gray-600" />
                    </button>
                </div>
            </div>

            <div className="flex-1 p-6 overflow-y-auto mb-20 scrollbar-hide">
                <h1 className="text-2xl font-bold text-gray-900 leading-tight mb-2">
                    Looking for the Top companies projects
                </h1>
                <p className="text-gray-500 text-sm mb-6">
                    Get Instant Access to India's Leading Companies projects with Just One Click!
                </p>



                {/* Filter Row */}
                <div className="flex justify-between items-center mb-6 z-20 relative">
                    <div className="flex gap-2">
                        <div className="flex items-center gap-2 text-gray-500">
                            <Filter className="w-5 h-5" />
                            <span>Filter</span>
                        </div>
                        <button
                            onClick={() => {
                                // Toggle logic or navigate to a separate route? 
                                // Since I can't easily add a route without context, I'll toggle a state here.
                                // For simplicity/demo: I'll use a modal or just replace the list.
                                // Let's use a simple state toggle: viewMode 'jobs' | 'applications'
                                // But I cannot change state variable names easily without seeing context.
                                // I'll assume I can add a new state `viewMode`. 
                                // Wait, I need to add the state first. 
                                // I will skip adding state here and just add a link to a new filtered view or...
                                // PROPOSAL: Just render the status badge on the project card if user has applied!
                                // That meets "view request and response".
                            }}
                            className="hidden text-sm font-bold text-blue-600"
                        >
                            My Applications
                        </button>
                    </div>

                    <div className="flex gap-4 text-sm font-medium text-gray-600">
                        {/* Work Dropdown */}
                        <div className="relative">
                            <span
                                onClick={() => setIsWorkDropdownOpen(!isWorkDropdownOpen)}
                                className="flex items-center gap-1 cursor-pointer hover:text-gray-900"
                            >
                                {activeFilter.work} <ChevronDown className="w-4 h-4" />
                            </span>
                            {isWorkDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-40 bg-white shadow-xl rounded-lg py-2 border border-gray-100 z-50">
                                    {['All Work', 'Plumbing', 'Electrical', 'Construction'].map((item) => (
                                        <div
                                            key={item}
                                            onClick={() => {
                                                setActiveFilter(prev => ({ ...prev, work: item }));
                                                setIsWorkDropdownOpen(false);
                                            }}
                                            className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-gray-700"
                                        >
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* State Dropdown */}
                        <div className="relative">
                            <span
                                onClick={() => setIsStateDropdownOpen(!isStateDropdownOpen)}
                                className="flex items-center gap-1 cursor-pointer hover:text-gray-900"
                            >
                                {activeFilter.state} <ChevronDown className="w-4 h-4" />
                            </span>
                            {isStateDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-40 bg-white shadow-xl rounded-lg py-2 border border-gray-100 z-50">
                                    {['All State', 'Gujarat', 'Maharashtra', 'Delhi'].map((item) => (
                                        <div
                                            key={item}
                                            onClick={() => {
                                                setActiveFilter(prev => ({ ...prev, state: item }));
                                                setIsStateDropdownOpen(false);
                                            }}
                                            className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-gray-700"
                                        >
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Status Sections */}
                {(() => {
                    const myApps = JSON.parse(localStorage.getItem('majdhur_project_applications') || '[]');
                    const mySentRequests = JSON.parse(localStorage.getItem('majdhur_hire_requests') || '[]');

                    const userName = profile ? `${profile.firstName} ${profile.lastName}` : 'Sagar User';

                    // Filter applications I sent for projects
                    const myFilteredApps = myApps.filter(app => app.applicantName === userName);

                    // Filter hire requests I sent to workers
                    const myFilteredHire = mySentRequests.filter(req =>
                        req.requesterType === 'User' && req.requesterName === userName
                    );

                    return (
                        <div className="space-y-6 mb-6">
                            {myFilteredApps.length > 0 && (
                                <div>
                                    <h2 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider flex items-center gap-2">
                                        <Briefcase className="w-4 h-4 text-blue-600" />
                                        My Project Applications
                                    </h2>
                                    <div className="space-y-3">
                                        {myFilteredApps.map(app => (
                                            <div key={app.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center transition-all hover:shadow-md">
                                                <div>
                                                    <h3 className="font-bold text-gray-900 text-sm">{app.projectTitle}</h3>
                                                    <p className="text-[10px] text-gray-500">{app.company}</p>
                                                </div>
                                                <span className={`px-2 py-1 rounded-md text-[10px] font-bold ${app.status === 'Accepted' ? 'bg-green-100 text-green-700' :
                                                    app.status === 'Declined' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                                                    }`}>
                                                    {(app.status || 'Pending').toUpperCase()}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {myFilteredHire.length > 0 && (
                                <div>
                                    <h2 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider flex items-center gap-2">
                                        <Users className="w-4 h-4 text-purple-600" />
                                        Hired Workers Status
                                    </h2>
                                    <div className="space-y-3">
                                        {myFilteredHire.map(req => (
                                            <div key={req.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center transition-all hover:shadow-md">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-gray-100 overflow-hidden border border-gray-200">
                                                        {req.workerImage ? <img src={req.workerImage} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center font-bold text-[10px] text-gray-400">?</div>}
                                                    </div>
                                                    <div>
                                                        <h3 className="font-bold text-gray-900 text-sm">{req.workerName}</h3>
                                                        <p className="text-[10px] text-gray-500">{req.workerRole}</p>
                                                    </div>
                                                </div>
                                                <span className={`px-2 py-1 rounded-md text-[10px] font-bold ${req.status === 'Accepted' ? 'bg-green-100 text-green-700' :
                                                    req.status === 'Declined' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                                                    }`}>
                                                    {(req.status || 'Pending').toUpperCase()}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })()}

                {/* Job Card */}
                {/* Projects List */}
                <div className="space-y-6">
                    {filteredProjects.length > 0 ? (
                        filteredProjects.map((project) => (
                            <div key={project.id} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                                <div className="w-12 h-12 bg-yellow-50 rounded-full flex items-center justify-center mb-4 text-[10px] font-bold text-yellow-700 border border-yellow-100 uppercase">
                                    {project.company.substring(0, 8)}
                                </div>
                                <div className="mb-2">
                                    <span className="text-sm font-semibold text-gray-900">{project.company}</span>
                                    <span className="text-xs text-gray-500 ml-2">• {project.industry}</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">{project.title}</h3>

                                <div className="flex gap-2 mb-6 flex-wrap">
                                    {project.tags.map((tag, idx) => (
                                        <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-lg font-medium">
                                            {tag}
                                        </span>
                                    ))}
                                    <span className="px-3 py-1 bg-gray-50 text-gray-500 text-xs rounded-lg font-medium border border-gray-100">
                                        {project.state}
                                    </span>
                                </div>

                                <button
                                    onClick={() => {
                                        const application = {
                                            id: Date.now(),
                                            projectId: project.id,
                                            projectTitle: project.title,
                                            company: project.company,
                                            applicantName: profile ? `${profile.firstName} ${profile.lastName}` : 'Sagar User',
                                            status: 'Applied',
                                            date: new Date().toLocaleDateString()
                                        };
                                        const apps = JSON.parse(localStorage.getItem('majdhur_project_applications') || '[]');
                                        localStorage.setItem('majdhur_project_applications', JSON.stringify([application, ...apps]));
                                        toast.success('Application Sent Successfully!');
                                    }}
                                    className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium shadow-lg hover:bg-blue-700 transition-colors"
                                >
                                    Apply now
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-10 text-gray-500">
                            <p>No projects found matching your filters.</p>
                        </div>
                    )}
                </div>
            </div>

            <UserBottomNav />
        </div>
    );
};



export default UserDashboard;
