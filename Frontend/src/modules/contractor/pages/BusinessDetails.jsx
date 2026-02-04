import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const BusinessDetails = () => {
    const navigate = useNavigate();
    const [pincode, setPincode] = useState('');
    const [postOffices, setPostOffices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedPostOffice, setSelectedPostOffice] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');

    useEffect(() => {
        if (pincode.length === 6) {
            const fetchPostOffices = async () => {
                setLoading(true);
                try {
                    const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
                    const data = await response.json();

                    if (data[0].Status === 'Success') {
                        setPostOffices(data[0].PostOffice);
                        // Auto-fill city and state from the first result
                        if (data[0].PostOffice.length > 0) {
                            setCity(data[0].PostOffice[0].District);
                            setState(data[0].PostOffice[0].State);
                        }
                        toast.success('Post offices fetched successfully');
                    } else {
                        setPostOffices([]);
                        setCity('');
                        setState('');
                        toast.error('Invalid Pincode');
                    }
                } catch (error) {
                    console.error('Error fetching post offices:', error);
                    toast.error('Failed to fetch post offices');
                } finally {
                    setLoading(false);
                }
            };

            fetchPostOffices();
        } else {
            setPostOffices([]);
            setCity('');
            setState('');
        }
    }, [pincode]);

    const [businessData, setBusinessData] = useState({
        businessType: 'Proprietorship',
        businessName: '',
        authPersonName: '',
        contactNumber: '',
        altContactNumber: '',
        panGst: '',
        email: '',
        altEmail: '',
        addressLine1: '',
        addressLine2: '',
        landmark: ''
    });

    useEffect(() => {
        const storedProfile = JSON.parse(localStorage.getItem('majdhur_contractor_profile') || '{}');
        if (storedProfile.businessDetails) {
            setBusinessData(prev => ({ ...prev, ...storedProfile.businessDetails }));
            setPincode(storedProfile.businessDetails.pincode || '');
            setCity(storedProfile.businessDetails.city || '');
            setState(storedProfile.businessDetails.state || '');
            setSelectedPostOffice(storedProfile.businessDetails.postOffice || '');
        }
    }, []);

    const handleSave = () => {
        const storedProfile = JSON.parse(localStorage.getItem('majdhur_contractor_profile') || '{}');
        const updatedProfile = {
            ...storedProfile,
            businessDetails: {
                ...businessData,
                pincode,
                city,
                state,
                postOffice: selectedPostOffice
            }
        };
        localStorage.setItem('majdhur_contractor_profile', JSON.stringify(updatedProfile));
        toast.success('Business details saved successfully!');
        navigate('/contractor/dashboard');
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <div className="p-6 bg-white shadow-sm sticky top-0 z-10 flex items-center gap-3">
                <button onClick={() => navigate(-1)}>
                    <ChevronRight className="w-6 h-6 text-gray-900 rotate-180" />
                </button>
                <h1 className="text-xl font-medium text-gray-900">Business details</h1>
            </div>

            <div className="flex-1 p-6 overflow-y-auto pb-24 space-y-6">

                {/* Business Info */}
                <div className="bg-white p-5 rounded-3xl shadow-sm space-y-4">
                    <h2 className="font-bold text-gray-900 mb-2">Enter business detail</h2>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Business type <span className="text-red-500">*required</span></label>
                        <select
                            value={businessData.businessType}
                            onChange={(e) => setBusinessData({ ...businessData, businessType: e.target.value })}
                            className="w-full bg-gray-100 border-none rounded-xl p-3 text-gray-900 focus:ring-2 focus:ring-yellow-400 appearance-none"
                        >
                            <option>Proprietorship</option>
                            <option>LLP</option>
                            <option>Private Limited</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Business name <span className="text-red-500">*required</span></label>
                        <input
                            type="text"
                            value={businessData.businessName}
                            onChange={(e) => setBusinessData({ ...businessData, businessName: e.target.value })}
                            className="w-full bg-gray-100 border-none rounded-xl p-3 text-gray-900 focus:ring-2 focus:ring-yellow-400"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Authorize person name <span className="text-red-500">*required</span></label>
                        <input
                            type="text"
                            value={businessData.authPersonName}
                            onChange={(e) => setBusinessData({ ...businessData, authPersonName: e.target.value })}
                            className="w-full bg-gray-100 border-none rounded-xl p-3 text-gray-900 focus:ring-2 focus:ring-yellow-400"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Contact number <span className="text-red-500">*required</span></label>
                        <input
                            type="tel"
                            value={businessData.contactNumber}
                            onChange={(e) => setBusinessData({ ...businessData, contactNumber: e.target.value })}
                            className="w-full bg-gray-100 border-none rounded-xl p-3 text-gray-900 focus:ring-2 focus:ring-yellow-400"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Alternate contact number</label>
                        <input
                            type="tel"
                            value={businessData.altContactNumber}
                            onChange={(e) => setBusinessData({ ...businessData, altContactNumber: e.target.value })}
                            className="w-full bg-gray-100 border-none rounded-xl p-3 text-gray-900 focus:ring-2 focus:ring-yellow-400"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">PAN/GST Number</label>
                        <input
                            type="text"
                            value={businessData.panGst}
                            onChange={(e) => setBusinessData({ ...businessData, panGst: e.target.value })}
                            className="w-full bg-gray-100 border-none rounded-xl p-3 text-gray-900 focus:ring-2 focus:ring-yellow-400"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email address <span className="text-red-500">*required</span></label>
                        <input
                            type="email"
                            value={businessData.email}
                            onChange={(e) => setBusinessData({ ...businessData, email: e.target.value })}
                            className="w-full bg-gray-100 border-none rounded-xl p-3 text-gray-900 focus:ring-2 focus:ring-yellow-400"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Alternate email address</label>
                        <input
                            type="email"
                            value={businessData.altEmail}
                            onChange={(e) => setBusinessData({ ...businessData, altEmail: e.target.value })}
                            className="w-full bg-gray-100 border-none rounded-xl p-3 text-gray-900 focus:ring-2 focus:ring-yellow-400"
                        />
                    </div>
                </div>

                {/* Address Info */}
                <div className="bg-white p-5 rounded-3xl shadow-sm space-y-4">
                    <h2 className="font-bold text-gray-900 mb-2">Enter business address</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Pincode <span className="text-red-500">*required</span></label>
                            <input
                                type="text"
                                value={pincode}
                                onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                maxLength={6}
                                className="w-full bg-gray-100 border-none rounded-xl p-3 text-gray-900 focus:ring-2 focus:ring-yellow-400"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Post office <span className="text-red-500">*required</span></label>
                            <select
                                value={selectedPostOffice}
                                onChange={(e) => setSelectedPostOffice(e.target.value)}
                                disabled={loading || postOffices.length === 0}
                                className="w-full bg-gray-100 border-none rounded-xl p-3 text-gray-900 focus:ring-2 focus:ring-yellow-400 appearance-none disabled:opacity-50"
                            >
                                <option value="">Select Post Office</option>
                                {postOffices.map((office, index) => (
                                    <option key={index} value={office.Name}>
                                        {office.Name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                            <input type="text" value={city} readOnly className="w-full bg-gray-100 border-none rounded-xl p-3 text-gray-900 focus:ring-2 focus:ring-yellow-400" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                            <input type="text" value={state} readOnly className="w-full bg-gray-100 border-none rounded-xl p-3 text-gray-900 focus:ring-2 focus:ring-yellow-400" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Address line 1 <span className="text-red-500">*required</span></label>
                        <input
                            type="text"
                            value={businessData.addressLine1}
                            onChange={(e) => setBusinessData({ ...businessData, addressLine1: e.target.value })}
                            className="w-full bg-gray-100 border-none rounded-xl p-3 text-gray-900 focus:ring-2 focus:ring-yellow-400"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Address line 2</label>
                        <input
                            type="text"
                            value={businessData.addressLine2}
                            onChange={(e) => setBusinessData({ ...businessData, addressLine2: e.target.value })}
                            className="w-full bg-gray-100 border-none rounded-xl p-3 text-gray-900 focus:ring-2 focus:ring-yellow-400"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Landmark</label>
                        <input
                            type="text"
                            value={businessData.landmark}
                            onChange={(e) => setBusinessData({ ...businessData, landmark: e.target.value })}
                            className="w-full bg-gray-100 border-none rounded-xl p-3 text-gray-900 focus:ring-2 focus:ring-yellow-400"
                        />
                    </div>
                </div>

                <div className="mt-8 mb-4">
                    <button
                        onClick={handleSave}
                        className="w-full py-4 rounded-full bg-[#fbbf24] text-gray-900 font-semibold text-lg hover:bg-yellow-500 transition-colors"
                    >
                        Save business details
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BusinessDetails;
