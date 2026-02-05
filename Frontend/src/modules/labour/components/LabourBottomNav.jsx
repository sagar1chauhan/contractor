import { useNavigate, useLocation } from 'react-router-dom';
import { Briefcase, Settings as SettingsIcon } from 'lucide-react';

const LabourBottomNav = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Helper to check if active
    const isActive = (path) => location.pathname === path;

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#1f1f1f] text-gray-400 px-6 py-3 rounded-full flex gap-12 shadow-2xl items-center z-50">
            <div
                onClick={() => navigate('/labour/find-projects')}
                className={`flex flex-col items-center gap-1 cursor-pointer transition-colors ${isActive('/labour/find-projects') ? 'text-yellow-400' : 'hover:text-white'}`}
            >
                <Briefcase className="w-5 h-5" />
                <span className="text-[10px]">Find projects</span>
            </div>
            <div
                onClick={() => navigate('/labour/settings')}
                className={`flex flex-col items-center gap-1 cursor-pointer transition-colors ${isActive('/labour/settings') ? 'text-yellow-400' : 'hover:text-white'}`}
            >
                <SettingsIcon className="w-5 h-5" />
                <span className="text-[10px]">Settings</span>
            </div>
        </div>
    );
};

export default LabourBottomNav;
