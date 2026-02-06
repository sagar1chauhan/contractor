import { Search, MapPin } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LabourBottomNav from '../components/LabourBottomNav';
import toast from 'react-hot-toast';

const FindProject = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const storedProfile = JSON.parse(localStorage.getItem('majdhur_labour_profile') || 'null');
        setProfile(storedProfile);

        // Load projects
        const allProjects = JSON.parse(localStorage.getItem('majdhur_projects') || '[]');

        // Mock data if no projects exist for demonstration
        const displayProjects = allProjects.length > 0 ? allProjects : [
            { id: 101, title: "Supermarketing painting", company: "Fresher", location: "Madhya Pradesh", type: "Construction", isNew: true },
            { id: 102, title: "Sales marketing painting", company: "Fresher", location: "Madhya Pradesh", type: "Construction", isNew: true }
        ];

        setProjects(displayProjects);
    }, []);

    const handleApply = (project) => {
        const application = {
            id: Date.now(),
            projectId: project.id,
            projectTitle: project.title,
            company: project.company,
            applicantName: profile?.name || 'Labour User',
            labourSkill: profile?.skills || 'Labour',
            status: 'Applied',
            date: new Date().toLocaleDateString()
        };
        const existing = JSON.parse(localStorage.getItem('majdhur_project_applications') || '[]');
        localStorage.setItem('majdhur_project_applications', JSON.stringify([application, ...existing]));
        toast.success(`Applied for ${project.title} successfully!`);
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col pb-24">
            {/* Header */}
            <div className="bg-white px-6 py-4 shadow-sm sticky top-0 z-10 flex justify-between items-center">
                <div>
                    <p className="text-xs text-gray-500">Welcome Back,</p>
                    <h1 className="text-xl font-bold text-gray-900">Namaste, {profile?.name ? profile.name.split(' ')[0] : 'Labour'}</h1>
                </div>
                <div className="flex gap-2">
                    <button className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-600 shadow-sm">
                        <span className="sr-only">Notifications</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                    </button>
                    <button
                        onClick={() => navigate('/labour/settings')}
                        className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-600 shadow-sm">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                    </button>
                    {profile?.photo && (
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 border border-gray-200">
                            <img src={profile.photo} alt="Profile" className="w-full h-full object-cover" />
                        </div>
                    )}
                    {!profile?.photo && (
                        <div className="w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center text-xs font-bold">
                            {profile?.name ? profile.name.substring(0, 2).toUpperCase() : 'LB'}
                        </div>
                    )}
                </div>
            </div>

            <div className="p-6 space-y-6">
                {/* Profile Card / Fresher Badge */}
                {/* As per image 2, there isn't a top profile card, just list of projects. Using similar style. */}

                <div className="space-y-4">
                    {projects.map((project) => (
                        <div key={project.id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                            <div className="flex justify-between items-start mb-4">
                                <div className="w-12 h-12 bg-yellow-50 rounded-full flex items-center justify-center border border-yellow-100 uppercase font-bold text-yellow-700 text-xs">
                                    FRESHER
                                </div>
                            </div>

                            <div className="mb-4">
                                <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                                    <span className="font-medium text-gray-900">{project.company || "Fresher"}</span>
                                    <span>•</span>
                                    <span>{project.type || "Construction"}</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
                            </div>

                            <div className="flex gap-2 mb-6">
                                <span className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg text-sm font-medium">New Project</span>
                                <span className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg text-sm font-medium">{project.location || project.state || "Madhya Pradesh"}</span>
                            </div>

                            <button
                                onClick={() => handleApply(project)}
                                className="w-full bg-blue-600 text-white py-4 rounded-xl font-medium text-base hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
                            >
                                Apply now
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <LabourBottomNav />
        </div>
    );
};

export default FindProject;
