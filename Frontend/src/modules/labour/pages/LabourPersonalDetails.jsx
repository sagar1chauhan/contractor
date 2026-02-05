import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Camera, User, Phone, Globe } from 'lucide-react';
import toast from 'react-hot-toast';

const LabourPersonalDetails = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        language: 'Hindi',
        photo: null
    });

    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem('majdhur_labour_profile') || '{}');
        const loginPhone = localStorage.getItem('majdhur_user_phone') || ''; // Assuming this key exists from login/registration

        setFormData(prev => ({
            ...prev,
            ...savedData,
            phone: savedData.phone || loginPhone // Prioritize saved phone, then login phone
        }));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, photo: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        if (!formData.name || !formData.phone) {
            toast.error('Please fill all required fields');
            return;
        }
        localStorage.setItem('majdhur_labour_profile', JSON.stringify(formData));

        // Sync with global list
        const allLabours = JSON.parse(localStorage.getItem('majdhur_all_labours') || '[]');
        const updatedLabours = allLabours.map(labour => {
            if (labour.phone === formData.phone) {
                return { ...labour, name: formData.name, image: formData.photo };
            }
            return labour;
        });
        localStorage.setItem('majdhur_all_labours', JSON.stringify(updatedLabours));

        toast.success('Personal details updated!');
        navigate(-1);
    };

    const triggerFileInput = () => {
        document.getElementById('profilePhotoInput').click();
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <div className="p-6 bg-white shadow-sm sticky top-0 z-10 flex items-center gap-3">
                <button onClick={() => navigate(-1)}>
                    <ChevronRight className="w-6 h-6 text-gray-900 rotate-180" />
                </button>
                <h1 className="text-xl font-bold text-gray-900">Personal Details</h1>
            </div>

            <div className="flex-1 p-6 space-y-6 overflow-y-auto">
                {/* Profile Photo */}
                <div className="flex flex-col items-center gap-4">
                    <div className="relative">
                        <input
                            type="file"
                            id="profilePhotoInput"
                            className="hidden"
                            accept="image/*"
                            onChange={handlePhotoChange}
                        />
                        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden border-2 border-white shadow-md">
                            {formData.photo ? (
                                <img src={formData.photo} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <User className="w-12 h-12 text-gray-400" />
                            )}
                        </div>
                        <button
                            onClick={triggerFileInput}
                            className="absolute bottom-0 right-0 bg-yellow-400 p-2 rounded-full shadow-lg border-2 border-white hover:bg-yellow-500 transition-colors"
                        >
                            <Camera className="w-4 h-4 text-gray-900" />
                        </button>
                    </div>
                    <p className="text-sm font-medium text-gray-500">Change Profile Photo</p>
                </div>

                {/* Form */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            className="w-full p-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                        <div className="relative">
                            <Phone className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Enter phone number"
                                className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Preferred Language</label>
                        <div className="relative">
                            <Globe className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                            <select
                                name="language"
                                value={formData.language}
                                onChange={handleChange}
                                className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-400 appearance-none text-gray-700"
                            >
                                <option value="Hindi">Hindi</option>
                                <option value="Gujarati">Gujarati</option>
                                <option value="English">English</option>
                                <option value="Marathi">Marathi</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="pt-6 pb-10">
                    <button
                        onClick={handleSave}
                        className="w-full bg-yellow-400 text-gray-900 py-4 rounded-2xl font-bold shadow-lg shadow-yellow-100 hover:bg-yellow-500 transition-colors"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LabourPersonalDetails;
