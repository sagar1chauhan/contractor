import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, Heart, MapPin, Calendar, Clock, User, Phone, Send, CheckCircle2, XCircle } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

const JobDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [isFavorite, setIsFavorite] = useState(false);
    const [showApplyPopup, setShowApplyPopup] = useState(false);

    // Mock data based on the provided images
    const jobData = {
        id: id || '2510250640387091',
        title: 'General Labour (सामान्य लेबर) की आवश्यकता है',
        location: 'Nashik, MAHARASHTRA',
        dateRange: '26 Oct 2025 से 01 Nov 2026 (269 दिन)',
        available: true,
        category: 'Labour (लेबर)',
        requirement: '50',
        dailyPay: '₹576',
        monthlyPay: '₹17,280',
        food: false,
        stay: true,
        esiPf: false,
        time: '07:00 AM - 05:00 PM',
        ageRange: '20 - 50 Years',
        workingDays: 'Mon, Tue, Wed, Thu, Fri, Sat',
        benefits: [
            'बीमा उपलब्ध नहीं है',
            'मेडिकल जांच की आवश्यकता नहीं है',
            'पुलिस सत्यापन की आवश्यकता नहीं है',
            'काम पर आने से पहले बैंक खाता जरूरी है',
            'पी.एफ. अकाउंट आवश्यक नहीं है'
        ],
        accommodationDetails: 'अस्थायी ईंट हाउस सुविधा\nElectricity, Water, Fan, Washroom, Bathroom',
        foodDetails: 'भोजन की उपलब्धता नहीं है',
        recruiter: {
            name: 'Prajwal Gud',
            phone: '9168403916'
        }
    };

    const handleApply = () => {
        // Save to applied jobs in localStorage
        const appliedJobs = JSON.parse(localStorage.getItem('majdhur_applied_jobs') || '[]');
        if (!appliedJobs.find(job => job.id === jobData.id)) {
            localStorage.setItem('majdhur_applied_jobs', JSON.stringify([...appliedJobs, { ...jobData, appliedStatus: 'Applied', appliedDate: new Date().toISOString() }]));
        }
        setShowApplyPopup(true);
        setTimeout(() => setShowApplyPopup(false), 3000);
    };

    const shareOnWhatsApp = () => {
        const text = `Job Alert! 👷\n\n*Job:* ${jobData.title}\n*Location:* ${jobData.location}\n*Salary:* ${jobData.monthlyPay} Per Month\n\nApply now on Majdhur App!`;
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] pb-32">
            {/* Header */}
            <header className="bg-white px-6 py-4 flex justify-between items-center sticky top-0 z-50 border-b border-gray-100">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate(-1)} className="p-1">
                        <ChevronLeft className="w-6 h-6 text-gray-900" />
                    </button>
                    <h1 className="text-lg font-bold text-gray-900">नौकरी की जानकारी</h1>
                </div>
                <button
                    onClick={() => {
                        setIsFavorite(!isFavorite);
                        toast.success(isFavorite ? 'Removed from favorites' : 'Added to favorites');
                    }}
                    className={`flex items-center gap-1.5 text-sm font-medium ${isFavorite ? 'text-red-500' : 'text-red-500 opacity-80'}`}
                >
                    <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                    <span>पसंदीदा में जोड़ें</span>
                </button>
            </header>

            <div className="px-6 py-4 space-y-3">
                {/* Job ID Tag */}
                <div className="inline-block bg-pink-100/50 text-pink-600 px-4 py-1.5 rounded-full text-xs font-bold">
                    Job ID : {jobData.id}
                </div>

                {/* Main Image Container */}
                <div className="w-full h-52 rounded-[40px] overflow-hidden shadow-md relative">
                    <div className="absolute inset-0 bg-green-800/20"></div>
                    <div className="w-full h-full bg-green-100 flex items-center justify-center text-7xl grayscale opacity-30">
                        🍇
                    </div>
                </div>

                {/* Title and Summary Card */}
                <div className="bg-white rounded-[40px] p-5 shadow-sm border border-gray-50 text-center">
                    <h2 className="text-xl font-bold text-gray-900 leading-tight mb-3">
                        {jobData.title}
                    </h2>

                    <div className="space-y-2">
                        <div className="flex items-center justify-center gap-3">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-500 font-medium text-sm">{jobData.location}</span>
                        </div>
                        <div className="flex items-center justify-center gap-3">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-500 font-medium text-sm">{jobData.dateRange}</span>
                        </div>
                    </div>
                </div>

                {/* Availability Status */}
                <div className="bg-white rounded-[32px] p-3 flex justify-around shadow-sm border border-gray-50">
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-50" />
                        <span className="font-bold text-gray-900 text-xs">उपलब्ध है</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <XCircle className="w-5 h-5 text-red-500 fill-red-50" />
                        <span className="font-bold text-gray-400 text-xs">उपलब्ध नहीं है</span>
                    </div>
                </div>

                {/* Job Stats Card */}
                <div className="bg-white rounded-[40px] p-5 shadow-sm border border-gray-50">
                    <div className="bg-indigo-50/50 text-indigo-700 font-bold px-4 py-1.5 rounded-full inline-block mb-4 text-xs">
                        {jobData.category}
                    </div>

                    <h3 className="text-base font-bold text-gray-900 mb-4">{jobData.title}</h3>

                    <div className="grid grid-cols-3 gap-2 border-b border-gray-100 pb-4">
                        <div className="text-center">
                            <p className="text-gray-400 text-[10px] mb-1">आवश्यकता</p>
                            <p className="text-gray-900 font-bold text-sm">{jobData.requirement}</p>
                        </div>
                        <div className="text-center">
                            <p className="text-gray-400 text-[10px] mb-1">प्रति दिन</p>
                            <p className="text-gray-900 font-bold text-sm">{jobData.dailyPay}</p>
                        </div>
                        <div className="text-center">
                            <p className="text-gray-400 text-[10px] mb-1">प्रति महीने</p>
                            <p className="text-gray-900 font-bold text-sm">{jobData.monthlyPay}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 pt-4 text-center">
                        <div>
                            <p className="text-gray-400 text-[10px] mb-1 font-bold">खाना</p>
                            <div className="flex justify-center">
                                {jobData.food ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <XCircle className="w-5 h-5 text-red-500" />}
                            </div>
                        </div>
                        <div>
                            <p className="text-gray-400 text-[10px] mb-1 font-bold">रहना</p>
                            <div className="flex justify-center">
                                {jobData.stay ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <XCircle className="w-5 h-5 text-red-500" />}
                            </div>
                        </div>
                        <div>
                            <p className="text-gray-400 text-[10px] mb-1 font-bold">ई.एस.आई/पी.एफ़</p>
                            <div className="flex justify-center">
                                {jobData.esiPf ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <XCircle className="w-5 h-5 text-red-500" />}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional Info Card */}
                <div className="bg-white rounded-[40px] p-5 shadow-sm border border-gray-50">
                    <h3 className="text-lg font-bold text-indigo-700 mb-4">अतिरिक्त जानकारी</h3>

                    <div className="space-y-3 mb-4">
                        <div className="flex items-center gap-3">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600 font-medium text-sm">{jobData.time}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <User className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600 font-medium text-sm">{jobData.ageRange}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600 font-medium text-sm">{jobData.workingDays}</span>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {jobData.benefits.map((benefit, idx) => (
                            <div key={idx} className="bg-sky-50 text-sky-600 px-3 py-1.5 rounded-xl text-[10px] font-bold border border-sky-100">
                                {benefit}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Facilities Section */}
                <div className="space-y-3">
                    <div className="bg-gray-50 rounded-[32px] p-5 border border-gray-100">
                        <h3 className="text-base font-bold text-pink-600 mb-1">आवास सुविधा</h3>
                        <p className="text-gray-900 font-bold text-xs mb-1">{jobData.accommodationDetails.split('\n')[0]}</p>
                        <p className="text-gray-600 text-[11px] leading-relaxed">{jobData.accommodationDetails.split('\n')[1]}</p>
                    </div>

                    <div className="bg-gray-50 rounded-[32px] p-5 border border-gray-100">
                        <h3 className="text-base font-bold text-pink-600 mb-1">भोजन की सुविधा</h3>
                        <p className="text-gray-600 text-xs">{jobData.foodDetails}</p>
                    </div>
                </div>

                {/* Recruiter Contact Card */}
                <div className="bg-white rounded-[40px] p-5 shadow-sm border border-gray-50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                            <User className="w-6 h-6 text-gray-300" />
                        </div>
                        <div>
                            <p className="font-bold text-gray-900 text-base">{jobData.recruiter.name}</p>
                            <p className="text-gray-900 font-bold tracking-widest text-xs">******3916</p>
                        </div>
                    </div>
                    <a href={`tel:${jobData.recruiter.phone}`} className="bg-pink-50 p-3 rounded-full hover:scale-110 active:scale-95 transition-transform">
                        <Phone className="w-6 h-6 text-pink-500 fill-pink-500" />
                    </a>
                </div>

                {/* Bottom Action Buttons */}
                <div className="pt-2 space-y-3">
                    <button
                        onClick={handleApply}
                        className="w-full bg-[#ffb84d] text-gray-900 py-4 rounded-[24px] font-bold text-lg shadow-lg shadow-orange-100 hover:scale-[1.01] active:scale-[0.99] transition-all"
                    >
                        काम में अप्लाई करें
                    </button>

                    <div className="grid grid-cols-2 gap-3">
                        <button
                            onClick={shareOnWhatsApp}
                            className="flex items-center justify-center gap-2 border-2 border-[#14b8a6] text-[#14b8a6] py-3.5 rounded-[24px] font-bold text-sm hover:bg-[#14b8a6] hover:text-white transition-all"
                        >
                            <Send className="w-4 h-4 rotate-[-20deg]" />
                            अन्य को भेजें
                        </button>
                        <button
                            onClick={shareOnWhatsApp}
                            className="flex items-center justify-center gap-2 border-2 border-[#14b8a6] text-[#14b8a6] py-3.5 rounded-[24px] font-bold text-sm hover:bg-[#14b8a6] hover:text-white transition-all"
                        >
                            <Send className="w-4 h-4 rotate-[-20deg]" />
                            दोस्तों को भेजें
                        </button>
                    </div>
                </div>
            </div>

            {/* Apply Success Modal */}
            {showApplyPopup && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowApplyPopup(false)}></div>
                    <div className="bg-white rounded-[40px] p-8 w-full max-w-sm relative z-10 text-center animate-in zoom-in duration-300">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 className="w-12 h-12 text-green-500" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">सफलतापूर्वक!</h2>
                        <p className="text-gray-500 font-medium">आपने इस काम के लिए सफलतापूर्वक आवेदन कर दिया है।</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default JobDetails;
