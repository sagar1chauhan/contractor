import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Shield, FileCheck, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const LabourLegalDetails = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        aadhaar: '',
        license: '',
        documentPhoto: null,
        verified: false
    });

    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem('majdhur_labour_legal') || '{}');
        setFormData(prev => ({
            ...prev,
            ...savedData
        }));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, documentPhoto: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        localStorage.setItem('majdhur_labour_legal', JSON.stringify(formData));
        toast.success('Legal details saved for verification!');
        navigate(-1);
    };

    const triggerFileInput = () => {
        document.getElementById('docInput').click();
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <div className="p-6 bg-white shadow-sm sticky top-0 z-10 flex items-center gap-3">
                <button onClick={() => navigate(-1)}>
                    <ChevronRight className="w-6 h-6 text-gray-900 rotate-180" />
                </button>
                <h1 className="text-xl font-bold text-gray-900">Legal Verification</h1>
            </div>

            <div className="flex-1 p-6 space-y-6 overflow-y-auto">
                <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 flex gap-3 text-blue-700 text-sm">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <p>Verified labourers get 2x more job requests. Your documents are stored securely.</p>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Aadhaar Number (12 Digit)</label>
                        <div className="relative">
                            <Shield className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                name="aadhaar"
                                value={formData.aadhaar}
                                onChange={handleChange}
                                maxLength={12}
                                placeholder="0000 0000 0000"
                                className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-400 font-mono tracking-widest"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Driving License / Other ID (Optional)</label>
                        <div className="relative">
                            <FileCheck className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                name="license"
                                value={formData.license}
                                onChange={handleChange}
                                placeholder="Enter license number"
                                className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            />
                        </div>
                    </div>

                    <div
                        onClick={triggerFileInput}
                        className="p-4 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center gap-2 text-gray-500 cursor-pointer hover:border-yellow-400 hover:bg-yellow-50 transition-all"
                    >
                        <input
                            type="file"
                            id="docInput"
                            className="hidden"
                            accept="image/*,.pdf"
                            onChange={handleFileChange}
                        />
                        {formData.documentPhoto ? (
                            <div className="flex items-center gap-2 text-green-600 font-medium text-sm">
                                <FileCheck className="w-5 h-5" />
                                <span>Document Uploaded Successfully</span>
                            </div>
                        ) : (
                            <>
                                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                                    +
                                </div>
                                <span className="text-xs font-medium">Upload Document Photos</span>
                            </>
                        )}
                    </div>
                </div>

                <div className="pt-6 pb-10">
                    <button
                        onClick={handleSave}
                        className="w-full bg-yellow-400 text-gray-900 py-4 rounded-2xl font-bold shadow-lg shadow-yellow-100 hover:bg-yellow-500 transition-colors"
                    >
                        Submit for Verification
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LabourLegalDetails;
