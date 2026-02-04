import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

const AddProject = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        projectName: '',
        contactName: '',
        mobile: '',
        altMobile: '',
        email: '',
        altEmail: '',
        pincode: '',
        postOffice: '',
        city: '',
        state: '',
        address1: '',
        address2: '',
        landmark: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        if (!formData.projectName || !formData.contactName || !formData.mobile) {
            toast.error('Please fill required fields');
            return;
        }

        const contractorProfile = JSON.parse(localStorage.getItem('majdhur_contractor_profile') || '{}');
        const newProject = {
            id: Date.now(),
            contractorId: contractorProfile.mobile || 'unknown', // Use mobile as unique ID for simplicity
            company: contractorProfile.businessDetails?.businessName || 'Independent Contractor',
            title: formData.projectName,
            industry: 'Construction', // Default or add field
            type: 'General',
            state: formData.state || 'Gujarat',
            tags: ['New Project'],
            details: formData,
            date: new Date().toLocaleDateString(),
            status: 'Open'
        };

        const projects = JSON.parse(localStorage.getItem('majdhur_projects') || '[]');
        localStorage.setItem('majdhur_projects', JSON.stringify([newProject, ...projects]));

        toast.success('Project added successfully!');
        navigate(-1);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <div className="p-6 bg-white shadow-sm sticky top-0 z-10 flex items-center gap-3">
                <button onClick={() => navigate(-1)}>
                    <ChevronRight className="w-6 h-6 text-gray-900 rotate-180" />
                </button>
                <h1 className="text-xl font-medium text-gray-900">Add new project</h1>
            </div>

            <div className="flex-1 p-6 overflow-y-auto pb-24 space-y-6">

                {/* Project Info */}
                <div className="bg-white p-5 rounded-3xl shadow-sm space-y-4">
                    <h2 className="font-bold text-gray-900 mb-2">Project Details</h2>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Project name <span className="text-red-500">*required</span></label>
                        <input name="projectName" value={formData.projectName} onChange={handleChange} type="text" className="w-full bg-gray-100 border-none rounded-xl p-3 text-gray-900 focus:ring-2 focus:ring-yellow-400" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Project contact person name <span className="text-red-500">*required</span></label>
                        <input name="contactName" value={formData.contactName} onChange={handleChange} type="text" className="w-full bg-gray-100 border-none rounded-xl p-3 text-gray-900 focus:ring-2 focus:ring-yellow-400" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Mobile number <span className="text-red-500">*required</span></label>
                        <input name="mobile" value={formData.mobile} onChange={handleChange} type="tel" className="w-full bg-gray-100 border-none rounded-xl p-3 text-gray-900 focus:ring-2 focus:ring-yellow-400" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Alternate mobile number</label>
                        <input name="altMobile" value={formData.altMobile} onChange={handleChange} type="tel" className="w-full bg-gray-100 border-none rounded-xl p-3 text-gray-900 focus:ring-2 focus:ring-yellow-400" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email address <span className="text-red-500">*required</span></label>
                        <input name="email" value={formData.email} onChange={handleChange} type="email" className="w-full bg-gray-100 border-none rounded-xl p-3 text-gray-900 focus:ring-2 focus:ring-yellow-400" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Alternate email address</label>
                        <input name="altEmail" value={formData.altEmail} onChange={handleChange} type="email" className="w-full bg-gray-100 border-none rounded-xl p-3 text-gray-900 focus:ring-2 focus:ring-yellow-400" />
                    </div>
                </div>

                {/* Address Info */}
                <div className="bg-white p-5 rounded-3xl shadow-sm space-y-4">
                    <h2 className="font-bold text-gray-900 mb-2">Project Address</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Pincode <span className="text-red-500">*required</span></label>
                            <input name="pincode" value={formData.pincode} onChange={handleChange} type="text" className="w-full bg-gray-100 border-none rounded-xl p-3 text-gray-900 focus:ring-2 focus:ring-yellow-400" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Post office</label>
                            <select name="postOffice" value={formData.postOffice} onChange={handleChange} className="w-full bg-gray-100 border-none rounded-xl p-3 text-gray-900 focus:ring-2 focus:ring-yellow-400 appearance-none">
                                <option>Select</option>
                                <option>Vadodara HO</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                            <input name="city" value={formData.city} onChange={handleChange} type="text" className="w-full bg-gray-100 border-none rounded-xl p-3 text-gray-900 focus:ring-2 focus:ring-yellow-400" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                            <input name="state" value={formData.state} onChange={handleChange} type="text" className="w-full bg-gray-100 border-none rounded-xl p-3 text-gray-900 focus:ring-2 focus:ring-yellow-400" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Address line 1 <span className="text-red-500">*required</span></label>
                        <input name="address1" value={formData.address1} onChange={handleChange} type="text" className="w-full bg-gray-100 border-none rounded-xl p-3 text-gray-900 focus:ring-2 focus:ring-yellow-400" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Address line 2</label>
                        <input name="address2" value={formData.address2} onChange={handleChange} type="text" className="w-full bg-gray-100 border-none rounded-xl p-3 text-gray-900 focus:ring-2 focus:ring-yellow-400" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Landmark <span className="text-red-500">*required</span></label>
                        <input name="landmark" value={formData.landmark} onChange={handleChange} type="text" className="w-full bg-gray-100 border-none rounded-xl p-3 text-gray-900 focus:ring-2 focus:ring-yellow-400" />
                    </div>
                </div>

                <div className="flex gap-4 mt-8 mb-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex-1 py-4 rounded-full border border-red-500 text-red-500 font-semibold text-lg hover:bg-red-50 transition-colors"
                    >
                        Close
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="flex-1 py-4 rounded-full bg-[#fbbf24] text-gray-900 font-semibold text-lg hover:bg-yellow-500 transition-colors"
                    >
                        Add project
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddProject;
