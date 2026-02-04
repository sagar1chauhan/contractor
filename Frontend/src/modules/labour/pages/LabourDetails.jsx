import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import toast from 'react-hot-toast';

const LabourDetails = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        skills: 'Plumber',
        dailyRate: '',
        experience: '',
        availability: 'Full Time'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleContinue = () => {
        if (!formData.dailyRate) {
            toast.error('Daily wage is required');
            return;
        }

        // Save work details
        localStorage.setItem('majdhur_labour_work', JSON.stringify(formData));

        // Register in global labour list for contractors/users to see
        const personalProfile = JSON.parse(localStorage.getItem('majdhur_labour_profile') || '{}');
        const phone = localStorage.getItem('majdhur_user_phone') || 'no-phone';

        const fullLabourProfile = {
            id: Date.now(),
            phone: phone,
            name: personalProfile.name || 'Anonymous',
            image: personalProfile.photo || 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&fit=crop',
            location: 'Gujarat, India', // Default or from profile
            role: formData.skills,
            rate: formData.dailyRate,
            exp: `${formData.experience} Year exp`,
            availability: formData.availability
        };

        const allLabours = JSON.parse(localStorage.getItem('majdhur_all_labours') || '[]');
        // Avoid duplicates by phone
        const filteredLabours = allLabours.filter(l => l.phone !== phone);
        localStorage.setItem('majdhur_all_labours', JSON.stringify([fullLabourProfile, ...filteredLabours]));

        toast.success('Work profile created and published!');
        navigate('/labour/dashboard');
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Labour Details</h1>

            <div className="flex-1 overflow-y-auto space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Skill Type <span className="text-red-500">*required</span></label>
                    <select
                        name="skills"
                        value={formData.skills}
                        onChange={handleChange}
                        className="w-full bg-gray-200 border-none rounded-lg p-3 text-gray-700 focus:ring-2 focus:ring-yellow-400"
                    >
                        <option value="Plumber">Plumber</option>
                        <option value="Electrician">Electrician</option>
                        <option value="Mason">Mason</option>
                        <option value="Carpenter">Carpenter</option>
                        <option value="Painter">Painter</option>
                        <option value="Welder">Welder</option>
                        <option value="Daily Wager">Daily Wager</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Daily Wage (₹) <span className="text-red-500">*required</span></label>
                    <input
                        type="number"
                        name="dailyRate"
                        value={formData.dailyRate}
                        onChange={handleChange}
                        placeholder="e.g. 500"
                        className="w-full bg-gray-200 border-none rounded-lg p-3 text-gray-700 focus:ring-2 focus:ring-yellow-400"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Experience (Years)</label>
                    <input
                        type="number"
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        placeholder="e.g. 5"
                        className="w-full bg-gray-200 border-none rounded-lg p-3 text-gray-700 focus:ring-2 focus:ring-yellow-400"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
                    <div className="flex gap-4 mt-2">
                        <label className="flex items-center space-x-2">
                            <input
                                type="radio"
                                name="availability"
                                value="Full Time"
                                checked={formData.availability === 'Full Time'}
                                onChange={handleChange}
                                className="text-yellow-500 focus:ring-yellow-400"
                            />
                            <span>Full Time</span>
                        </label>
                        <label className="flex items-center space-x-2">
                            <input
                                type="radio"
                                name="availability"
                                value="Part Time"
                                checked={formData.availability === 'Part Time'}
                                onChange={handleChange}
                                className="text-yellow-500 focus:ring-yellow-400"
                            />
                            <span>Part Time</span>
                        </label>
                    </div>
                </div>
            </div>

            <button
                onClick={handleContinue}
                className="w-full py-4 rounded-full bg-[#fbbf24] hover:bg-yellow-500 text-gray-900 font-semibold text-lg transition-colors mt-6"
            >
                Continue
            </button>
        </div>
    );
};

export default LabourDetails;
