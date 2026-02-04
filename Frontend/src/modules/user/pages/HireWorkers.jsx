import { useState, useEffect } from 'react';
import UserBottomNav from '../components/UserBottomNav';
import { Filter, LogOut, Bell, X, CheckCircle, MapPin, Star } from 'lucide-react';
import toast from 'react-hot-toast';

const MOCK_WORKERS = [
    {
        id: 1,
        name: 'Prashant Ahirwar',
        location: 'Vidisha, MADHYA PRADESH',
        role: 'Supervisor',
        roleHindi: 'सुपरवाइज़र',
        rate: '600',
        exp: '5 Year exp',
        image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&fit=crop'
    },
    {
        id: 2,
        name: 'AjaySharma',
        location: 'Lakhisarai, BIHAR',
        role: 'Supervisor',
        roleHindi: 'सुपरवाइज़र',
        rate: '900',
        exp: '10+ Year exp',
        image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop'
    },
    {
        id: 3,
        name: 'Ishwar Yadav',
        location: 'Gorakhpur, UTTAR PRADESH',
        role: 'Supervisor',
        roleHindi: 'सुपरवाइज़र',
        rate: '750',
        exp: '7 Year exp',
        image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&h=400&fit=crop'
    },
    {
        id: 4,
        name: 'Ramesh Patel',
        location: 'Ahmedabad, GUJARAT',
        role: 'Mason',
        roleHindi: 'मिस्त्री',
        rate: '800',
        exp: '8 Year exp',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop'
    },
    {
        id: 5,
        name: 'Suresh Kumar',
        location: 'Pune, MAHARASHTRA',
        role: 'Electrician',
        roleHindi: 'बिजली मिस्त्री',
        rate: '500',
        exp: '4 Year exp',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop'
    },
    {
        id: 6,
        name: 'Vijay Singh',
        location: 'Delhi, DELHI',
        role: 'Plumber',
        roleHindi: 'नलसाज',
        rate: '650',
        exp: '6 Year exp',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop'
    },
    {
        id: 7,
        name: 'Raju Bhai',
        location: 'Vadodara, GUJARAT',
        role: 'Mason',
        roleHindi: 'मिस्त्री',
        rate: '750',
        exp: '12 Year exp',
        image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop'
    }
];

const HireModal = ({ isOpen, onClose, worker, onConfirm }) => {
    if (!isOpen || !worker) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity animate-fade-in">
            <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl transform transition-all animate-scale-in overflow-hidden">
                {/* Header */}
                <div className="bg-yellow-400 p-6 relative">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 bg-white/20 p-1.5 rounded-full hover:bg-white/30 transition-colors text-yellow-900"
                    >
                        <X className="w-5 h-5" />
                    </button>
                    <div className="flex flex-col items-center">
                        <div className="w-20 h-20 rounded-full border-4 border-white shadow-md overflow-hidden mb-3">
                            <img src={worker.image} alt={worker.name} className="w-full h-full object-cover" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">{worker.name}</h3>
                        <p className="text-yellow-900 font-medium">{worker.role}</p>
                    </div>
                </div>

                {/* Body */}
                <div className="p-6">
                    <div className="space-y-4 mb-6">
                        <div className="flex items-center gap-3 text-gray-600 bg-gray-50 p-3 rounded-xl border border-gray-100">
                            <MapPin className="w-5 h-5 text-gray-400" />
                            <span className="text-sm">{worker.location}</span>
                        </div>
                        <div className="flex justify-between items-center bg-gray-50 p-3 rounded-xl border border-gray-100">
                            <div className="flex items-center gap-2">
                                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                                <span className="text-sm font-semibold text-gray-700">Experience</span>
                            </div>
                            <span className="text-sm text-gray-600">{worker.exp}</span>
                        </div>
                        <div className="flex justify-between items-center bg-green-50 p-3 rounded-xl border border-green-100">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold text-green-700">Daily Rate</span>
                            </div>
                            <span className="text-lg font-bold text-green-700">₹{worker.rate}/day</span>
                        </div>
                    </div>

                    <div className="text-center mb-6">
                        <p className="text-gray-500 text-sm">
                            Are you sure you want to send a hiring request to <span className="font-bold text-gray-800">{worker.name}</span>?
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            className="flex-1 py-3 text-gray-600 font-medium bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            className="flex-1 py-3 bg-gray-900 text-white font-medium rounded-xl shadow-lg shadow-gray-200 hover:bg-gray-800 transition-all flex items-center justify-center gap-2"
                        >
                            Send Request <CheckCircle className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const HireWorkers = ({ isContractor = false }) => {
    const [activeFilter, setActiveFilter] = useState('All');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [selectedWorker, setSelectedWorker] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [allWorkers, setAllWorkers] = useState([...MOCK_WORKERS]);
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const localLabours = JSON.parse(localStorage.getItem('majdhur_all_labours') || '[]');
        setAllWorkers([...localLabours, ...MOCK_WORKERS]);

        const profileKey = isContractor ? 'majdhur_contractor_profile' : 'majdhur_user_profile';
        const storedProfile = JSON.parse(localStorage.getItem(profileKey) || 'null');
        setProfile(storedProfile);
    }, [isContractor]);

    const handleSelectWorker = (worker) => {
        setSelectedWorker(worker);
        setIsModalOpen(true);
    };

    const handleConfirmHire = () => {
        // Create request object
        const requesterName = profile
            ? (profile.businessDetails?.businessName || `${profile.firstName} ${profile.lastName}`)
            : (isContractor ? 'BuildWell Constructions' : 'Sagar User');

        const newRequest = {
            id: Date.now(),
            workerId: selectedWorker.id,
            workerPhone: selectedWorker.phone || null, // Link to real labour user
            workerName: selectedWorker.name,
            workerRole: selectedWorker.role,
            workerImage: selectedWorker.image,
            requesterType: isContractor ? 'Contractor' : 'User',
            requesterName: requesterName,
            status: 'Pending',
            date: new Date().toLocaleDateString()
        };

        // Save to localStorage
        const existingRequests = JSON.parse(localStorage.getItem('majdhur_hire_requests') || '[]');
        localStorage.setItem('majdhur_hire_requests', JSON.stringify([newRequest, ...existingRequests]));

        toast.success(`Request sent to ${selectedWorker.name}`);
        setIsModalOpen(false);
        setSelectedWorker(null);
    };

    const filteredWorkers = allWorkers.filter(worker =>
        activeFilter === 'All' || worker.role === activeFilter
    );

    const filterOptions = [
        { label: 'All', value: 'All' },
        { label: 'Supervisor', value: 'Supervisor' },
        { label: 'Mason', value: 'Mason' },
        { label: 'Electrician', value: 'Electrician' },
        { label: 'Plumber', value: 'Plumber' }
    ];

    const currentFilterLabel = filterOptions.find(f => f.value === activeFilter)?.label || 'All';

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header matches Dashboard Style */}
            <div className="p-6 flex justify-between items-center bg-white shadow-sm sticky top-0 z-10">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center overflow-hidden">
                        {/* Placeholder as we don't share state here yet, typically would come from Context */}
                        <span className="text-white text-xs">IMG</span>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500">Welcome Back,</p>
                        <h2 className="font-bold text-gray-900">{isContractor ? 'Contractor Panel' : 'Namaste, User'}</h2>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button className="p-2 border rounded-full hover:bg-gray-100">
                        <Bell className="w-5 h-5 text-gray-600" />
                    </button>
                    {!isContractor && ( // Hide LogOut for Contractor if embedded
                        <button className="p-2 border rounded-full hover:bg-gray-100">
                            <LogOut className="w-5 h-5 text-gray-600" />
                        </button>
                    )}
                </div>
            </div>

            <div className="flex-1 p-6 overflow-y-auto mb-20 scrollbar-hide">
                {/* Filter Header */}
                <div className="flex justify-between items-center mb-6 z-20 relative">
                    <div className="flex items-center gap-2 text-gray-500">
                        <Filter className="w-5 h-5" />
                        <span>Filter</span>
                    </div>
                    <div className="relative">
                        <span
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            className="flex items-center gap-1 font-semibold text-gray-800 cursor-pointer"
                        >
                            {currentFilterLabel}
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                        </span>

                        {isFilterOpen && (
                            <div className="absolute right-0 mt-2 w-56 bg-white shadow-xl rounded-lg py-2 border border-gray-100 z-50">
                                {filterOptions.map((option) => (
                                    <div
                                        key={option.value}
                                        onClick={() => {
                                            setActiveFilter(option.value);
                                            setIsFilterOpen(false);
                                        }}
                                        className={`px-4 py-3 hover:bg-gray-50 cursor-pointer text-gray-700 flex justify-between items-center ${activeFilter === option.value ? 'bg-gray-50 font-medium' : ''}`}
                                    >
                                        {option.label}
                                        {activeFilter === option.value && <span className="text-blue-500 text-xs">✓</span>}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Workers List */}
                <div className="space-y-4">
                    {filteredWorkers.length > 0 ? (
                        filteredWorkers.map((worker) => (
                            <div key={worker.id} className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
                                <div className="flex gap-4 mb-4">
                                    <img
                                        src={worker.image}
                                        alt={worker.name}
                                        className="w-16 h-16 rounded-full object-cover border border-gray-100"
                                    />
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900">{worker.name}</h3>
                                        <p className="text-xs text-gray-400 mb-1">{worker.location}</p>
                                        <p className="text-pink-600 font-medium text-sm">
                                            {worker.role}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">₹{worker.rate} • {worker.exp}</p>
                                    </div>
                                </div>

                                <button
                                    onClick={() => handleSelectWorker(worker)}
                                    className="w-full bg-[#e8e6ff] text-[#5e4aec] py-3 rounded-2xl font-semibold text-sm hover:bg-[#dcd8ff] transition-colors"
                                >
                                    Select worker
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-10 text-gray-500">
                            <p>No workers found.</p>
                        </div>
                    )}
                </div>
            </div>

            {!isContractor && <UserBottomNav />}

            <HireModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                worker={selectedWorker}
                onConfirm={handleConfirmHire}
            />
        </div>
    );
};

export default HireWorkers;
