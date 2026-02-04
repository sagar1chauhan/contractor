import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Hammer, IndianRupee, Clock, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';

const LabourWorkDetails = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        skills: 'Mason',
        dailyRate: '',
        experience: '',
        location: ''
    });

    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem('majdhur_labour_work') || '{}');
        setFormData(prev => ({
            ...prev,
            ...savedData
        }));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        localStorage.setItem('majdhur_labour_work', JSON.stringify(formData));

        // Sync with global list
        const phone = localStorage.getItem('majdhur_user_phone') || 'no-phone';
        const allLabours = JSON.parse(localStorage.getItem('majdhur_all_labours') || '[]');
        const updatedLabours = allLabours.map(labour => {
            if (labour.phone === phone) {
                return {
                    ...labour,
                    role: formData.skills,
                    rate: formData.dailyRate,
                    exp: `${formData.experience} Year exp`,
                    location: formData.location || labour.location
                };
            }
            return labour;
        });
        localStorage.setItem('majdhur_all_labours', JSON.stringify(updatedLabours));

        toast.success('Work profile updated!');
        navigate(-1);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <div className="p-6 bg-white shadow-sm sticky top-0 z-10 flex items-center gap-3">
                <button onClick={() => navigate(-1)}>
                    <ChevronRight className="w-6 h-6 text-gray-900 rotate-180" />
                </button>
                <h1 className="text-xl font-bold text-gray-900">Work Details</h1>
            </div>

            <div className="flex-1 p-6 space-y-6 overflow-y-auto">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Primary Skill</label>
                        <div className="relative">
                            <Hammer className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                            <select
                                name="skills"
                                value={formData.skills}
                                onChange={handleChange}
                                className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-400 appearance-none text-gray-700"
                            >
                                <option value="Mason">Mason (Mistri)</option>
                                <option value="Plumber">Plumber</option>
                                <option value="Electrician">Electrician</option>
                                <option value="Painter">Painter</option>
                                <option value="Carpenter">Carpenter</option>
                                <option value="Helper">Helper (Labour)</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Expected Daily Rate (₹)</label>
                        <div className="relative">
                            <IndianRupee className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                            <input
                                type="number"
                                name="dailyRate"
                                value={formData.dailyRate}
                                onChange={handleChange}
                                placeholder="e.g. 800"
                                className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Experience (Years)</label>
                        <div className="relative">
                            <Clock className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                            <input
                                type="number"
                                name="experience"
                                value={formData.experience}
                                onChange={handleChange}
                                placeholder="e.g. 5"
                                className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Preferred Work Location</label>
                        <div className="relative">
                            <MapPin className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="e.g. Vadodara, Gujarat"
                                className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            />
                        </div>
                    </div>
                </div>

                <div className="pt-6 pb-10">
                    <button
                        onClick={handleSave}
                        className="w-full bg-yellow-400 text-gray-900 py-4 rounded-2xl font-bold shadow-lg shadow-yellow-100 hover:bg-yellow-500 transition-colors"
                    >
                        Save Work Details
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LabourWorkDetails;
