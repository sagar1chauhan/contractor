import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ChevronRight, User, Phone, Mail, MapPin, Briefcase } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const ApplicationDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const type = searchParams.get('type'); // 'user' or 'labour'
    const [application, setApplication] = useState(null);

    useEffect(() => {
        let items = [];
        if (type === 'labour') {
            items = JSON.parse(localStorage.getItem('majdhur_labour_work_requests') || '[]');
        } else {
            items = JSON.parse(localStorage.getItem('majdhur_project_applications') || '[]');
        }
        const found = items.find(i => i.id.toString() === id);
        setApplication(found);
    }, [id, type]);

    const updateStatus = (newStatus) => {
        let items = [];
        const storageKey = type === 'labour' ? 'majdhur_labour_work_requests' : 'majdhur_project_applications';

        if (type === 'labour') {
            items = JSON.parse(localStorage.getItem(storageKey) || '[]');
        } else {
            items = JSON.parse(localStorage.getItem(storageKey) || '[]');
        }

        const updatedItems = items.map(item => {
            if (item.id.toString() === id) {
                return { ...item, status: newStatus };
            }
            return item;
        });

        localStorage.setItem(storageKey, JSON.stringify(updatedItems));
        toast.success(`Application ${newStatus.toLowerCase()} successfully`);
        navigate(-1);
    };

    if (!application) {
        return <div className="p-6 text-center text-gray-500">Loading details...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <div className="p-6 bg-white shadow-sm sticky top-0 z-10 flex items-center gap-3">
                <button onClick={() => navigate(-1)}>
                    <ChevronRight className="w-6 h-6 text-gray-900 rotate-180" />
                </button>
                <h1 className="text-xl font-medium text-gray-900">Application Details</h1>
            </div>

            <div className="flex-1 p-6 overflow-y-auto space-y-6">

                {/* Profile Card */}
                <div className="bg-white p-6 rounded-3xl shadow-sm flex flex-col items-center">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-4">
                        <User className="w-12 h-12" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">
                        {type === 'labour' ? application.labourName : application.applicantName}
                    </h2>
                    <p className="text-blue-600 font-medium text-sm">
                        {type === 'labour' ? 'Labour Request' : `Applied for: ${application.projectTitle}`}
                    </p>
                    <span className="mt-2 text-xs text-gray-400">Applied on {application.date}</span>
                </div>

                {/* Details */}
                <div className="bg-white p-5 rounded-3xl shadow-sm space-y-4">
                    <h3 className="font-bold text-gray-900 border-b pb-2">Contact Information</h3>

                    <div className="flex items-center gap-3 text-gray-600">
                        <Phone className="w-5 h-5 text-gray-400" />
                        <span>+91 98765 43210</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                        <Mail className="w-5 h-5 text-gray-400" />
                        <span>example@email.com</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                        <MapPin className="w-5 h-5 text-gray-400" />
                        <span>Vadodara, Gujarat</span>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4 mt-4">
                    <button
                        onClick={() => updateStatus('Declined')}
                        className="flex-1 py-4 rounded-xl bg-red-50 text-red-600 font-bold border border-red-100 hover:bg-red-100 transition-colors"
                    >
                        Decline
                    </button>
                    <button
                        onClick={() => updateStatus('Accepted')}
                        className="flex-1 py-4 rounded-xl bg-green-600 text-white font-bold hover:bg-green-700 shadow-lg shadow-green-200 transition-colors"
                    >
                        Accept
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ApplicationDetails;
