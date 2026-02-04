import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const PersonalDetails = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        gender: 'Male',
        mobile: '',
        altMobile: '',
        email: '',
        altEmail: ''
    });

    useEffect(() => {
        const storedProfile = JSON.parse(localStorage.getItem('majdhur_contractor_profile') || '{}');
        setFormData(prev => ({
            ...prev,
            ...storedProfile
        }));
    }, []);

    const handleSave = () => {
        if (!formData.firstName.trim()) {
            toast.error('First name is required'); // Assuming toast is imported or available, otherwise use alert
            return;
        }

        const storedProfile = JSON.parse(localStorage.getItem('majdhur_contractor_profile') || '{}');
        localStorage.setItem('majdhur_contractor_profile', JSON.stringify({ ...storedProfile, ...formData }));
        toast.success('Personal details updated!'); // Ensure toast is imported
        navigate(-1);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <div className="p-6 bg-white shadow-sm sticky top-0 z-10 flex items-center gap-3">
                <button onClick={() => navigate(-1)}>
                    <ChevronRight className="w-6 h-6 text-gray-900 rotate-180" />
                </button>
                <h1 className="text-xl font-medium text-gray-900">Personal details</h1>
            </div>

            <div className="flex-1 p-6 overflow-y-auto pb-24">
                <h2 className="text-lg font-bold text-gray-900 mb-6">Enter personal detail</h2>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">First name <span className="text-red-500">*required</span></label>
                        <input
                            type="text"
                            className="w-full bg-gray-200 border-none rounded-xl p-4 text-gray-900 font-medium focus:ring-2 focus:ring-yellow-400"
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Middle name</label>
                            <input
                                type="text"
                                className="w-full bg-gray-200 border-none rounded-xl p-4 text-gray-900 font-medium focus:ring-2 focus:ring-yellow-400"
                                value={formData.middleName}
                                onChange={(e) => setFormData({ ...formData, middleName: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Last name</label>
                            <input
                                type="text"
                                className="w-full bg-gray-200 border-none rounded-xl p-4 text-gray-900 font-medium focus:ring-2 focus:ring-yellow-400"
                                value={formData.lastName}
                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                        <select
                            className="w-full bg-gray-200 border-none rounded-xl p-4 text-gray-900 font-medium focus:ring-2 focus:ring-yellow-400 appearance-none"
                            value={formData.gender}
                            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                        >
                            <option>Male</option>
                            <option>Female</option>
                            <option>Other</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Mobile number <span className="text-red-500">*required</span></label>
                        <input
                            type="tel"
                            className="w-full bg-gray-200 border-none rounded-xl p-4 text-gray-900 font-medium focus:ring-2 focus:ring-yellow-400"
                            value={formData.mobile}
                            onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Alternate mobile Number</label>
                        <input
                            type="tel"
                            className="w-full bg-gray-200 border-none rounded-xl p-4 text-gray-900 font-medium focus:ring-2 focus:ring-yellow-400"
                            value={formData.altMobile}
                            onChange={(e) => setFormData({ ...formData, altMobile: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email address <span className="text-red-500">*required</span></label>
                        <input
                            type="email"
                            className="w-full bg-gray-200 border-none rounded-xl p-4 text-gray-900 font-medium focus:ring-2 focus:ring-yellow-400"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Alternate email Address</label>
                        <input
                            type="email"
                            className="w-full bg-gray-200 border-none rounded-xl p-4 text-gray-900 font-medium focus:ring-2 focus:ring-yellow-400"
                            value={formData.altEmail}
                            onChange={(e) => setFormData({ ...formData, altEmail: e.target.value })}
                        />
                    </div>
                </div>

                <div className="mt-8">
                    <button
                        onClick={handleSave}
                        className="w-full bg-[#fbbf24] text-gray-900 py-4 rounded-full font-semibold text-lg hover:bg-yellow-500 transition-colors"
                    >
                        Save changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PersonalDetails;
