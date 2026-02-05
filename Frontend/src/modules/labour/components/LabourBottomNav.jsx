import { Home, Search, Settings, Briefcase } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const LabourBottomNav = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const tabs = [
        { id: 'home', label: 'Home', icon: Home, path: '/labour/dashboard' },
        { id: 'jobs', label: 'Find Job', icon: Search, path: '/labour/dashboard' },
        { id: 'applied', label: 'Applied Job', icon: Briefcase, path: '/labour/applied-jobs' },
        { id: 'settings', label: 'Settings', icon: Settings, path: '/labour/settings' },
    ];

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] bg-[#1a1c1e] rounded-[32px] p-2 shadow-2xl z-50">
            <div className="flex justify-around items-center h-14">
                {tabs.map((tab) => {
                    const isActive = location.pathname === tab.path;
                    const Icon = tab.icon;

                    return (
                        <button
                            key={tab.id}
                            onClick={() => navigate(tab.path)}
                            className={`flex flex-col items-center justify-center transition-all duration-300 ${isActive ? 'text-yellow-400 scale-110' : 'text-gray-400 opacity-60'
                                }`}
                        >
                            <Icon className={`w-6 h-6 ${isActive ? 'stroke-[2.5px]' : 'stroke-[2px]'}`} />
                            <span className="text-[10px] mt-1 font-medium">{tab.label}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default LabourBottomNav;
