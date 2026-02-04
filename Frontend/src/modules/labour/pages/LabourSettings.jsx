import { useNavigate } from 'react-router-dom';
import { User, ChevronRight, Briefcase, Activity, Shield, CreditCard, LogOut, Phone, HelpCircle, FileText, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';

const MenuItem = ({ icon, label, link, onClick, textColor = "text-gray-900", extra }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => link ? navigate(link) : onClick && onClick()}
            className="flex items-center justify-between p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer"
        >
            <div className="flex items-center gap-4">
                <div className="text-gray-900">
                    {icon}
                </div>
                <span className={`text-base font-medium ${textColor}`}>{label}</span>
            </div>
            <div className="flex items-center gap-2">
                {extra}
                <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
        </div>
    );
};

const LabourSettings = () => {
    const navigate = useNavigate();
    const [isAvailable, setIsAvailable] = useState(true);

    useEffect(() => {
        const savedStatus = localStorage.getItem('majdhur_labour_status');
        if (savedStatus !== null) {
            setIsAvailable(JSON.parse(savedStatus));
        }
    }, []);

    const toggleStatus = () => {
        const newStatus = !isAvailable;
        setIsAvailable(newStatus);
        localStorage.setItem('majdhur_labour_status', JSON.stringify(newStatus));
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <div className="p-6 bg-white shadow-sm sticky top-0 z-10 flex items-center gap-3">
                <button onClick={() => navigate('/labour/dashboard')}>
                    <ChevronRight className="w-6 h-6 text-gray-900 rotate-180" />
                </button>
                <h1 className="text-xl font-bold text-gray-900">Labour Settings</h1>
            </div>

            <div className="flex-1 overflow-y-auto">
                {/* Profile Sections */}
                <div className="bg-white mt-1">
                    <MenuItem
                        icon={<User className="w-5 h-5" />}
                        label="Personal"
                        link="/labour/personal-details"
                    />
                    <MenuItem
                        icon={<Briefcase className="w-5 h-5" />}
                        label="Work"
                        link="/labour/work-details"
                    />
                    <MenuItem
                        icon={<Activity className="w-5 h-5" />}
                        label="Status"
                        onClick={toggleStatus}
                        extra={
                            <div className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out ${isAvailable ? 'bg-yellow-400' : 'bg-gray-300'}`}>
                                <div className={`bg-white w-4 h-4 rounded-full shadow-sm transform transition-transform duration-200 ease-in-out ${isAvailable ? 'translate-x-6' : 'translate-x-0'}`} />
                            </div>
                        }
                    />
                    <MenuItem
                        icon={<Shield className="w-5 h-5" />}
                        label="Legal"
                        link="/labour/legal-details"
                    />
                    <MenuItem
                        icon={<CreditCard className="w-5 h-5" />}
                        label="Payments"
                        link="/labour/payment-details"
                    />
                </div>

                <div className="bg-white mt-4">
                    <MenuItem icon={<Phone className="w-5 h-5" />} label="Contact us" link="/user/contact-us" />
                    <MenuItem icon={<HelpCircle className="w-5 h-5" />} label="About us" link="#" />
                </div>

                <div className="bg-white mt-4">
                    <MenuItem icon={<FileText className="w-5 h-5" />} label="App manual" link="#" />
                </div>

                <div className="bg-white mt-4">
                    <MenuItem icon={<Trash2 className="w-5 h-5 text-red-500" />} label="Delete Profile" link="#" textColor="text-red-500" />
                    <MenuItem icon={<LogOut className="w-5 h-5 text-red-500" />} label="Log out" link="/" textColor="text-red-500" />
                </div>
            </div>
        </div>
    );
};

export default LabourSettings;
