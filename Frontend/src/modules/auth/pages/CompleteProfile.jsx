import { useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import { Camera, User, Hammer, Briefcase } from 'lucide-react';
import toast from 'react-hot-toast';

const CompleteProfile = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const [formData, setFormData] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        gender: 'Male',
        dob: '1970-01-01',
        userType: 'User', // Default
        profileImage: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePhotoClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, profileImage: reader.result }));
                toast.success('Photo added successfully');
            };
            reader.readAsDataURL(file);
        }
    };

    const handleContinue = () => {
        // Photo validation removed as per request

        if (!formData.firstName.trim()) {
            toast.error('First name is required');
            return;
        }

        if (formData.userType === 'User') {
            // Save to localStorage for persistence
            localStorage.setItem('majdhur_user_profile', JSON.stringify(formData));
            navigate('/user/dashboard', { state: { profile: formData } });
        } else if (formData.userType === 'Contractor') {
            // Save to localStorage for persistence
            const existingProfile = JSON.parse(localStorage.getItem('majdhur_contractor_profile') || '{}');
            localStorage.setItem('majdhur_contractor_profile', JSON.stringify({ ...existingProfile, ...formData }));

            navigate('/contractor/business-details');
        } else if (formData.userType === 'Labour') {
            // Save to localStorage for persistence
            const existingProfile = JSON.parse(localStorage.getItem('majdhur_labour_profile') || '{}');
            const labourProfile = {
                ...existingProfile,
                name: `${formData.firstName} ${formData.lastName}`.trim(),
                photo: formData.profileImage,
                gender: formData.gender,
                dob: formData.dob,
                firstName: formData.firstName,
                lastName: formData.lastName
            };
            localStorage.setItem('majdhur_labour_profile', JSON.stringify(labourProfile));

            navigate('/labour/details');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Complete profile</h1>

            {/* Photo Placeholder */}
            <div className="flex justify-center items-center gap-4 mb-8">
                <div className="relative">
                    <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden border-2 border-gray-100">
                        {formData.profileImage ? (
                            <img src={formData.profileImage} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <User className="w-12 h-12 text-gray-500" />
                        )}
                    </div>
                </div>
                <div>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        accept="image/*"
                    />
                    <button
                        onClick={handlePhotoClick}
                        className="bg-gray-200 px-4 py-2 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-300 transition-colors"
                    >
                        {formData.profileImage ? 'Change photo' : 'Add photo'}
                    </button>
                    {/* Photo is now optional */}
                </div>
            </div>

            <div className="flex-1 overflow-y-auto">
                {/* Name Fields */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">First name <span className="text-red-500">*required</span></label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full bg-gray-200 border-none rounded-lg p-3 text-gray-700 focus:ring-2 focus:ring-yellow-400"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Middle name</label>
                        <input
                            type="text"
                            name="middleName"
                            value={formData.middleName}
                            onChange={handleChange}
                            className="w-full bg-gray-200 border-none rounded-lg p-3 text-gray-700 focus:ring-2 focus:ring-yellow-400"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Last name</label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="w-full bg-gray-200 border-none rounded-lg p-3 text-gray-700 focus:ring-2 focus:ring-yellow-400"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="w-full bg-gray-200 border-none rounded-lg p-3 text-gray-700 focus:ring-2 focus:ring-yellow-400"
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date of birth</label>
                        <input
                            type="date"
                            name="dob"
                            value={formData.dob}
                            onChange={handleChange}
                            className="w-full bg-gray-200 border-none rounded-lg p-3 text-gray-700 focus:ring-2 focus:ring-yellow-400"
                        />
                    </div>
                </div>

                {/* User Type Selection */}
                <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
                    <label className="block text-sm font-bold text-gray-900 mb-3">User Type <span className="text-red-500">*</span></label>
                    <div className="grid grid-cols-2 gap-4">
                        <div
                            onClick={() => setFormData(prev => ({ ...prev, userType: 'User' }))}
                            className={`flex items-center p-3 rounded-lg border cursor-pointer ${formData.userType === 'User' ? 'border-yellow-400 bg-yellow-50' : 'border-gray-100 hover:bg-gray-50'}`}
                        >
                            <User className="w-5 h-5 mr-2 text-gray-600" />
                            <span className="text-sm font-medium">User</span>
                        </div>

                        <div
                            onClick={() => setFormData(prev => ({ ...prev, userType: 'Labour' }))}
                            className={`flex items-center p-3 rounded-lg border cursor-pointer ${formData.userType === 'Labour' ? 'border-yellow-400 bg-yellow-50' : 'border-gray-100 hover:bg-gray-50'}`}
                        >
                            <Hammer className="w-5 h-5 mr-2 text-yellow-600" />
                            <span className="text-sm font-medium">Labour</span>
                        </div>

                        <div
                            onClick={() => setFormData(prev => ({ ...prev, userType: 'Contractor' }))}
                            className={`flex items-center p-3 rounded-lg border cursor-pointer ${formData.userType === 'Contractor' ? 'border-yellow-400 bg-yellow-50' : 'border-gray-100 hover:bg-gray-50'}`}
                        >
                            <Briefcase className="w-5 h-5 mr-2 text-gray-600" />
                            <span className="text-sm font-medium">Contractor</span>
                        </div>
                    </div>
                </div>
            </div>

            <button
                onClick={handleContinue}
                className="w-full py-4 rounded-full bg-[#fbbf24] hover:bg-yellow-500 text-gray-900 font-semibold text-lg transition-colors mt-4"
            >
                Continue
            </button>
        </div>
    );
};

export default CompleteProfile;
