import { Search, Building2, Phone, Briefcase, MapPin, Clock } from 'lucide-react';
import toast from 'react-hot-toast';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LabourBottomNav from '../components/LabourBottomNav';

const LabourDashboard = () => {
    const navigate = useNavigate();
    const [requests, setRequests] = useState([]);
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const storedProfile = JSON.parse(localStorage.getItem('majdhur_labour_profile') || 'null');
        setProfile(storedProfile);

        const currentPhone = localStorage.getItem('majdhur_user_phone');

        // Load only pending requests for the current labour
        const allRequests = JSON.parse(localStorage.getItem('majdhur_hire_requests') || '[]');
        const myRequests = allRequests.filter(r =>
            r.status === 'Pending' &&
            (r.workerPhone === currentPhone || (!r.workerPhone && r.workerName === storedProfile?.name))
        );
        setRequests(myRequests);
    }, []);

    const handleApplyJob = (project) => {
        const application = {
            id: Date.now(),
            projectId: project.id,
            projectTitle: project.title,
            company: project.company,
            applicantName: profile?.name || 'Labour User',
            labourSkill: profile?.skills || 'Labour', // From labour work details
            status: 'Applied',
            date: new Date().toLocaleDateString()
        };
        const existing = JSON.parse(localStorage.getItem('majdhur_project_applications') || '[]');
        localStorage.setItem('majdhur_project_applications', JSON.stringify([application, ...existing]));
        toast.success(`Applied for ${project.title} successfully!`);
    };

    const handleRespondRequest = (requestId, status) => {
        const allRequests = JSON.parse(localStorage.getItem('majdhur_hire_requests') || '[]');
        const updatedRequests = allRequests.map(req => {
            if (req.id === requestId) {
                return { ...req, status: status };
            }
            return req;
        });
        localStorage.setItem('majdhur_hire_requests', JSON.stringify(updatedRequests));

        // Update local state to remove the card
        setRequests(prev => prev.filter(r => r.id !== requestId));

        toast.success(`Request ${status} successfully!`);
    };

    const handleRequestWork = (contractorName) => {
        const request = {
            id: Date.now(),
            contractorName: contractorName,
            labourName: profile?.name || 'Labour User',
            type: 'Work Request',
            status: 'Pending',
            date: new Date().toLocaleDateString()
        };
        const existing = JSON.parse(localStorage.getItem('majdhur_labour_work_requests') || '[]');
        localStorage.setItem('majdhur_labour_work_requests', JSON.stringify([request, ...existing]));
        toast.success(`Work request sent to ${contractorName}`);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <div className="bg-white px-6 py-4 shadow-sm sticky top-0 z-10 flex justify-between items-center">
                <div>
                    <h1 className="text-xl font-bold text-gray-900">Find Work</h1>
                    <p className="text-xs text-gray-500">Connect with contractors</p>
                </div>
                <button
                    onClick={() => navigate('/labour/settings')}
                    className="w-10 h-10 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold overflow-hidden border border-blue-200"
                >
                    {profile?.photo ? (
                        <img src={profile.photo} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                        <span>{profile?.name ? profile.name[0].toUpperCase() : 'LB'}</span>
                    )}
                </button>
            </div>

            <div className="flex-1 p-6 overflow-y-auto">
                <div className="relative mb-6">
                    <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search jobs or contractors..."
                        className="w-full bg-white pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                </div>

                {/* Newly Posted Jobs Section */}
                {(() => {
                    const postedProjects = JSON.parse(localStorage.getItem('majdhur_projects') || '[]');
                    if (postedProjects.length > 0) {
                        return (
                            <div className="mb-8">
                                <h2 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider flex items-center gap-2">
                                    <Briefcase className="w-4 h-4 text-green-600" />
                                    Recent Job Postings
                                </h2>
                                <div className="space-y-4">
                                    {postedProjects.map((project) => (
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
                                            <button
                                                className="w-full mt-2 bg-green-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                                                onClick={() => handleApplyJob(project)}
                                            >
                                                Apply for Job
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    }
                    return null;
                })()}

                {/* Job Request Section */}
                {requests.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider flex items-center gap-2">
                            <Briefcase className="w-4 h-4 text-blue-600" />
                            Job Request
                        </h2>
                        <div className="space-y-3">
                            {requests.map((req) => (
                                <div key={req.id} className="bg-blue-50 p-4 rounded-xl border border-blue-100 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 bg-blue-500 text-white text-[10px] px-2 py-1 rounded-bl-lg font-medium">
                                        Received {req.date}
                                    </div>
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center text-blue-700 font-bold text-xs">
                                            {req.requesterName ? req.requesterName.substring(0, 2).toUpperCase() : 'RQ'}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 text-sm">{req.requesterName}</h3>
                                            <p className="text-xs text-blue-600 font-medium">Wants to hire you</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleRespondRequest(req.id, 'Declined')}
                                            className="flex-1 bg-white text-gray-700 py-2 rounded-lg text-xs font-bold border border-gray-200 hover:bg-gray-50"
                                        >
                                            Decline
                                        </button>
                                        <button
                                            onClick={() => handleRespondRequest(req.id, 'Accepted')}
                                            className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-xs font-bold hover:bg-blue-700 shadow-md shadow-blue-200"
                                        >
                                            Accept
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Sent Requests Status */}
                {(() => {
                    const myRequests = JSON.parse(localStorage.getItem('majdhur_labour_work_requests') || '[]');
                    if (myRequests.length > 0) {
                        return (
                            <div className="mb-8">
                                <h2 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-orange-500" />
                                    Sent Request Status
                                </h2>
                                <div className="space-y-3">
                                    {myRequests.map(req => (
                                        <div key={req.id} className="bg-orange-50 p-4 rounded-xl border border-orange-100 flex justify-between items-center">
                                            <div>
                                                <h3 className="font-bold text-gray-900">{req.contractorName}</h3>
                                                <p className="text-xs text-gray-500">Request Sent</p>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${req.status === 'Accepted' ? 'bg-green-100 text-green-700' :
                                                req.status === 'Declined' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                                                }`}>
                                                {req.status || 'Pending'}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                    }
                    return null;
                })()}

                <h2 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">Top Contractors</h2>

                <div className="space-y-4">
                    {[
                        { id: 1, name: 'BuildWell Constructions', jobs: 5, loc: 'Vadodara' },
                        { id: 2, name: 'SkyHigh Infra', jobs: 3, loc: 'Ahmedabad' },
                        { id: 3, name: 'City Roads Ltd', jobs: 8, loc: 'Surat' },
                        { id: 4, name: 'Alpha Builders', jobs: 2, loc: 'Rajkot' }
                    ].map((item) => (
                        <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                            <div className="flex items-start gap-3">
                                <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
                                    <Building2 className="w-6 h-6 text-yellow-600" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-gray-900">{item.name}</h3>
                                    <p className="text-xs text-gray-500 mb-2">{item.loc} • {item.jobs} Jobs Available</p>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] bg-gray-100 px-2 py-1 rounded text-gray-600">Commercial</span>
                                        <span className="text-[10px] bg-gray-100 px-2 py-1 rounded text-gray-600">Residential</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => handleRequestWork(item.name)}
                                className="w-full mt-4 flex items-center justify-center gap-2 bg-gray-900 text-white py-3 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
                            >
                                <Phone className="w-4 h-4" />
                                Request Work
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <LabourBottomNav />
        </div>
    );
};

export default LabourDashboard;
