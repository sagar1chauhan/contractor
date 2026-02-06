import UserBottomNav from '../components/UserBottomNav';
import { User, Bell, Shield, HelpCircle, LogOut, ChevronRight, Phone, FileText, Trash2, Briefcase, Hammer } from 'lucide-react';
import { Link } from 'react-router-dom';

const MenuItem = ({ icon, label, link, textColor = "text-gray-900" }) => (
    <Link to={link || "#"} className="flex items-center justify-between p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors">
        <div className="flex items-center gap-4">
            <div className="text-gray-900">
                {icon}
            </div>
            <span className={`text-base font-medium ${textColor}`}>{label}</span>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-400" />
    </Link>
);

const Settings = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <div className="p-6 bg-white shadow-sm sticky top-0 z-10 flex items-center gap-3">
                <Link to="/user/dashboard">
                    <ChevronRight className="w-6 h-6 text-gray-900 rotate-180" />
                </Link>
                <h1 className="text-xl font-bold text-gray-900">Settings</h1>
            </div>

            <div className="flex-1 overflow-y-auto">
                {/* Lists */}
                <div className="bg-white mt-1">
                    <MenuItem icon={<User className="w-5 h-5" />} label="Personal" link="/user/personal-details" />
                    <MenuItem icon={<Briefcase className="w-5 h-5" />} label="Business" link="/contractor/business-details" />
                    <MenuItem icon={<Hammer className="w-5 h-5" />} label="Projects" link="/user/add-project" />
                </div>

                <div className="bg-white mt-4">
                    <MenuItem icon={<Phone className="w-5 h-5" />} label="Contact us" link="/user/contact-us" />
                    <MenuItem icon={<HelpCircle className="w-5 h-5" />} label="About us" link="#" />
                </div>



                <div className="bg-white mt-4">
                    <MenuItem icon={<Trash2 className="w-5 h-5 text-red-500" />} label="Delete Profile" link="#" textColor="text-red-500" />
                    <MenuItem icon={<LogOut className="w-5 h-5 text-red-500" />} label="Log out" link="/" textColor="text-red-500" />
                </div>
            </div>

            <UserBottomNav />
        </div>
    );
};

export default Settings;
