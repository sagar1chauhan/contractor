import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, CreditCard, Landmark, DollarSign, History, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const LabourPaymentDetails = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        upiId: '',
        bankName: '',
        accountNumber: '',
        ifsc: ''
    });

    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem('majdhur_labour_payments') || '{}');
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
        localStorage.setItem('majdhur_labour_payments', JSON.stringify(formData));
        toast.success('Payment details updated!');
        navigate(-1);
    };

    const history = [
        { id: 1, from: 'SkyHigh Infra', amount: '₹ 2,400', date: 'Yesterday', status: 'Credited' },
        { id: 2, from: 'BuildWell Ltd', amount: '₹ 800', date: '2 days ago', status: 'Credited' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <div className="p-6 bg-white shadow-sm sticky top-0 z-10 flex items-center gap-3">
                <button onClick={() => navigate(-1)}>
                    <ChevronRight className="w-6 h-6 text-gray-900 rotate-180" />
                </button>
                <h1 className="text-xl font-bold text-gray-900">Payment Settings</h1>
            </div>

            <div className="flex-1 p-6 space-y-6 overflow-y-auto">
                <div className="space-y-4">
                    <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Paryment Methods</h2>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">UPI ID</label>
                        <div className="relative">
                            <DollarSign className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                name="upiId"
                                value={formData.upiId}
                                onChange={handleChange}
                                placeholder="name@upi"
                                className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            />
                        </div>
                    </div>

                    <div className="pt-2">
                        <h3 className="text-xs font-bold text-gray-400 mb-4 border-b pb-2">OR BANK DETAILS</h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Bank Name</label>
                                <div className="relative">
                                    <Landmark className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        name="bankName"
                                        value={formData.bankName}
                                        onChange={handleChange}
                                        placeholder="e.g. SBI, HDFC"
                                        className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Account Number</label>
                                <div className="relative">
                                    <CreditCard className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        name="accountNumber"
                                        value={formData.accountNumber}
                                        onChange={handleChange}
                                        placeholder="Enter account number"
                                        className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-2">
                    <button
                        onClick={handleSave}
                        className="w-full bg-yellow-400 text-gray-900 py-4 rounded-2xl font-bold shadow-lg shadow-yellow-100 hover:bg-yellow-500 transition-colors"
                    >
                        Save Payment Settings
                    </button>
                </div>

                <div className="pt-6">
                    <h2 className="text-sm font-bold text-gray-700 mb-4 flex items-center gap-2">
                        <History className="w-4 h-4 text-gray-400" />
                        Payment History
                    </h2>
                    <div className="bg-white rounded-3xl border border-gray-100 divide-y divide-gray-50 overflow-hidden shadow-sm">
                        {history.map(item => (
                            <div key={item.id} className="p-4 flex justify-between items-center">
                                <div>
                                    <p className="font-bold text-gray-900">{item.from}</p>
                                    <p className="text-xs text-gray-400">{item.date}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-green-600">{item.amount}</p>
                                    <p className="text-[10px] text-green-500 font-medium">{item.status}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LabourPaymentDetails;
