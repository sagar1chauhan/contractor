import { useNavigate, useLocation } from 'react-router-dom';
import { Briefcase, MapPin, Settings as SettingsIcon } from 'lucide-react';

const UserBottomNav = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Helper to check if active
    const isActive = (path) => location.pathname === path;

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#1f1f1f] text-gray-400 px-6 py-3 rounded-full flex gap-8 shadow-2xl items-center z-50">
            <div
                onClick={() => navigate('/user/hire')}
                className={`flex flex-col items-center gap-1 cursor-pointer transition-colors ${isActive('/user/hire') ? 'text-yellow-400' : 'hover:text-white'}`}
            >
                <Briefcase className="w-5 h-5" />
                <span className="text-[10px]">Hire workers</span>
            </div>
            <div
                onClick={() => navigate('/user/dashboard')}
                className={`flex flex-col items-center gap-1 cursor-pointer transition-colors ${isActive('/user/dashboard') ? 'text-yellow-400' : 'hover:text-white'}`}
            >
                <MapPin className="w-5 h-5" />
                <span className="text-[10px]">Find projects</span>
            </div>
            <div
                onClick={() => navigate('/user/settings')}
                className={`flex flex-col items-center gap-1 cursor-pointer transition-colors ${isActive('/user/settings') ? 'text-yellow-400' : 'hover:text-white'}`}
            >
                <SettingsIcon className="w-5 h-5" />
                <span className="text-[10px]">Settings</span>
            </div>
        </div>
    );
};

export default UserBottomNav;
