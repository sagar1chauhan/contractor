import { useNavigate, useParams } from 'react-router-dom';
import { ChevronRight, MapPin, Calendar, Briefcase, FileText } from 'lucide-react';
import { useEffect, useState } from 'react';

const ContractorProjectDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [project, setProject] = useState(null);

    useEffect(() => {
        const projects = JSON.parse(localStorage.getItem('majdhur_projects') || '[]');
        const foundProject = projects.find(p => p.id.toString() === id);
        setProject(foundProject);
    }, [id]);

    if (!project) {
        return <div className="p-6 text-center text-gray-500">Loading project details...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <div className="p-6 bg-white shadow-sm sticky top-0 z-10 flex items-center gap-3">
                <button onClick={() => navigate(-1)}>
                    <ChevronRight className="w-6 h-6 text-gray-900 rotate-180" />
                </button>
                <h1 className="text-xl font-medium text-gray-900">Project Details</h1>
            </div>

            <div className="flex-1 p-6 overflow-y-auto space-y-6">

                {/* Status Card */}
                <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 flex justify-between items-center">
                    <div>
                        <h2 className="text-sm text-gray-500 mb-1">Status</h2>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${project.status === 'Open' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                            {project.status.toUpperCase()}
                        </span>
                    </div>
                    <div>
                        <h2 className="text-sm text-gray-500 mb-1">Posted On</h2>
                        <p className="font-bold text-gray-900 text-sm">{project.date}</p>
                    </div>
                </div>

                {/* Main Details */}
                <div className="bg-white p-5 rounded-3xl shadow-sm space-y-6">
                    <div>
                        <h2 className="font-bold text-xl text-gray-900 mb-2">{project.title}</h2>
                        <div className="flex items-center text-gray-500 text-sm mb-4">
                            <Briefcase className="w-4 h-4 mr-2" />
                            <span>{project.company}</span>
                        </div>
                        <div className="flex items-center text-gray-500 text-sm">
                            <MapPin className="w-4 h-4 mr-2" />
                            <span>{project.state} • {project.details?.city}</span>
                        </div>
                    </div>

                    <div className="border-t pt-4">
                        <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                            <FileText className="w-4 h-4 text-yellow-600" />
                            Description / Details
                        </h3>
                        <div className="grid grid-cols-1 gap-3 text-sm text-gray-600">
                            <p><span className="font-medium text-gray-800">Industry:</span> {project.industry}</p>
                            <p><span className="font-medium text-gray-800">Job Type:</span> {project.type}</p>
                            <p><span className="font-medium text-gray-800">Contact Person:</span> {project.details?.contactName}</p>
                            <p><span className="font-medium text-gray-800">Contact Number:</span> {project.details?.mobile}</p>
                        </div>
                    </div>

                    <div className="border-t pt-4">
                        <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-yellow-600" />
                            Site Address
                        </h3>
                        <p className="text-sm text-gray-600">
                            {project.details?.address1}, {project.details?.address2}<br />
                            {project.details?.landmark}<br />
                            {project.details?.city}, {project.details?.state} - {project.details?.pincode}
                        </p>
                    </div>
                </div>

                <button
                    className="w-full py-4 rounded-full bg-gray-900 text-white font-semibold text-lg hover:bg-gray-800 transition-colors"
                >
                    Close Project (Mark as Done)
                </button>
            </div>
        </div>
    );
};

export default ContractorProjectDetails;
