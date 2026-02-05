import { Search, Building2, Phone, Briefcase, MapPin, Clock, ThumbsUp, ChevronRight, MessageCircle, Play } from 'lucide-react';
import toast from 'react-hot-toast';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LabourBottomNav from '../components/LabourBottomNav';

const LabourDashboard = () => {
    const navigate = useNavigate();
    const [requests, setRequests] = useState([]);
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const storedProfile = JSON.parse(localStorage.getItem('majdhur_labour_profile') || 'null');
        setProfile(storedProfile);

        const currentPhone = localStorage.getItem('majdhur_user_phone');
        const allRequests = JSON.parse(localStorage.getItem('majdhur_hire_requests') || '[]');
        const myRequests = allRequests.filter(r =>
            r.status === 'Pending' &&
            (r.workerPhone === currentPhone || (!r.workerPhone && r.workerName === storedProfile?.name))
        );
        setRequests(myRequests);
    }, []);

    return (
        <div className="min-h-screen bg-[#f8fafc] flex flex-col pb-24">
            {/* Header */}
            <header className="bg-white px-6 py-4 flex justify-between items-center sticky top-0 z-30 border-b border-gray-100">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full border-2 border-yellow-400 p-0.5 overflow-hidden">
                        {profile?.photo ? (
                            <img src={profile.photo} alt="Profile" className="w-full h-full object-cover rounded-full" />
                        ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-full text-gray-500 font-bold">
                                {profile?.name ? profile.name[0] : 'L'}
                            </div>
                        )}
                    </div>
                    <div>
                        <div className="flex items-center gap-1.5">
                            <span className="text-xl">🙏</span>
                            <span className="text-gray-500 text-sm">नमस्ते,</span>
                        </div>
                        <h2 className="font-bold text-gray-900 -mt-1 leading-tight text-lg">
                            {profile?.name || 'Fjfjf'}
                        </h2>
                    </div>
                </div>
                <button className="flex items-center gap-2 text-blue-600 font-semibold px-4 py-2 hover:bg-blue-50 transition-colors">
                    <span>फॉलो करें</span>
                    <ThumbsUp className="w-5 h-5" />
                </button>
            </header>

            {/* Placement News Banner */}
            <div className="bg-blue-50 px-6 py-4 flex items-center justify-between mx-0 mt-1">
                <p className="text-blue-800 text-sm font-medium leading-relaxed max-w-[65%]">
                    पृथ्वी चंद को मिला ₹880 में प्लम्बर का काम।
                </p>
                <button className="bg-blue-600 text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-md hover:bg-blue-700 transition-all">
                    अभी अप्लाई करें
                </button>
            </div>

            <div className="flex-1 overflow-y-auto">
                {/* Horizontal Promotion Cards */}
                <div className="flex overflow-x-auto gap-4 px-6 py-6 no-scrollbar snap-x">
                    {[
                        { title: 'सामान्य लेबर', job: 'की जॉब', price: '₹15,000 तक', bg: 'bg-indigo-50', img: '👷' },
                        { title: 'फैक्ट्री वर्कर', job: 'की जॉब', price: '₹16,500 तक', bg: 'bg-blue-50', img: '🏭' }
                    ].map((promo, idx) => (
                        <div key={idx} className={`${promo.bg} min-w-[85%] rounded-[32px] p-6 relative overflow-hidden snap-center`}>
                            <div className="relative z-10 w-2/3">
                                <h3 className="text-red-500 font-bold text-xl leading-tight">
                                    {promo.title} <span className="text-gray-900 font-bold">{promo.job}</span>
                                </h3>
                                <p className="text-sm font-medium text-gray-700 mt-1">करके कमायें</p>
                                <div className="inline-block relative">
                                    <span className="text-blue-600 font-bold text-xl block mt-1">{promo.price}</span>
                                    <div className="h-1 bg-blue-600 w-full mt-0.5 rounded-full opacity-30"></div>
                                </div>
                                <button className="mt-6 bg-white px-4 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 shadow-sm border border-gray-100 hover:shadow-md transition-all">
                                    अभी अप्लाई करें <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="absolute right-0 bottom-0 top-0 w-1/2 flex items-center justify-center text-8xl grayscale opacity-20 select-none">
                                {promo.img}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Trending Jobs Section */}
                <section className="mb-8">
                    <div className="px-6 flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-gray-900 tracking-tight">ट्रेंडिंग नौकरियाँ</h2>
                    </div>
                    <div className="flex overflow-x-auto gap-4 px-6 no-scrollbar cursor-grab active:cursor-grabbing">
                        {[
                            { title: 'Labour (लेबर) की आवश्यकता है', loc: 'Nashik, MAHARASHTRA', price: '₹17,280 प्रति महीने' },
                            { title: 'Factory Hand Needed', loc: 'Pune, MAHARASHTRA', price: '₹18,500 प्रति महीने' }
                        ].map((job, idx) => (
                            <div key={idx} className="min-w-[85%] h-64 rounded-[32px] relative overflow-hidden flex flex-col justify-end p-6 bg-gray-900 shadow-xl group">
                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10"></div>
                                {/* Placeholder Background */}
                                <div className="absolute inset-0 bg-green-800 opacity-60"></div>

                                <div className="relative z-20">
                                    <h3 className="text-white font-bold text-xl leading-snug mb-2 group-hover:scale-105 transition-transform duration-300 origin-left">{job.title}</h3>
                                    <div className="flex items-center gap-1.5 text-gray-300 text-xs mb-4">
                                        <MapPin className="w-4 h-4 text-gray-400" />
                                        <span>{job.loc}</span>
                                    </div>
                                    <div className="flex justify-between items-end">
                                        <span className="text-yellow-400 font-bold text-lg">{job.price}</span>
                                        <button
                                            onClick={() => navigate(`/labour/job-details/${idx}`)}
                                            className="bg-[#fbbf24] text-gray-900 px-6 py-2.5 rounded-2xl font-bold text-sm shadow-lg hover:bg-yellow-500 transition-all hover:scale-105 active:scale-95"
                                        >
                                            नौकरी देखें
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* New Jobs Section */}
                <section className="mb-8">
                    <div className="px-6 flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-gray-900 tracking-tight">नई नौकरियाँ</h2>
                    </div>
                    <div className="flex overflow-x-auto gap-4 px-6 no-scrollbar">
                        {[
                            { title: 'Labour (लेबर) की आवश्यकता है', loc: 'Jalna, MAHARASHTRA', price: '₹15,000 प्रति महीने' },
                            { title: 'Site Helper Required', loc: 'Sambhajinagar, MH', price: '₹14,500 प्रति महीने' }
                        ].map((job, idx) => (
                            <div key={idx} className="min-w-[80%] bg-white rounded-[40px] border border-gray-100 shadow-lg overflow-hidden flex flex-col">
                                <div className="h-44 bg-gray-100 flex items-center justify-center relative overflow-hidden">
                                    <div className="absolute inset-0 bg-orange-500/20"></div>
                                    <div className="text-4xl">🏗️</div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-lg font-bold text-gray-900 mb-2 truncate">{job.title}</h3>
                                    <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-3">
                                        <MapPin className="w-3.5 h-3.5" />
                                        <span>{job.loc}</span>
                                    </div>
                                    <p className="text-red-500 font-bold text-lg mb-4">{job.price}</p>
                                    <button
                                        onClick={() => navigate(`/labour/job-details/new-${idx}`)}
                                        className="w-full bg-[#dbeafe] text-[#2563eb] py-3.5 rounded-2xl font-bold text-sm hover:bg-blue-100 transition-colors"
                                    >
                                        नौकरी देखें
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* WhatsApp Join Banner */}
                <div className="px-6 mb-8">
                    <div className="border-2 border-dashed border-green-500 rounded-[32px] p-6 flex items-center justify-between bg-white/50 backdrop-blur-sm group cursor-pointer hover:border-green-600 transition-all active:scale-[0.98]">
                        <p className="text-green-700 font-bold text-lg leading-snug">
                            हमारे साथ व्हाट्स एप्प पर जुड़ें।
                        </p>
                        <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-100 group-hover:scale-110 transition-transform">
                            <MessageCircle className="w-8 h-8 text-white fill-white" />
                        </div>
                    </div>
                </div>

                {/* Video Section */}
                <section className="mb-8">
                    <div className="px-6 mb-4">
                        <h2 className="text-xl font-bold text-gray-900 tracking-tight">हमारी वीडियो देखें</h2>
                    </div>
                    <div className="flex overflow-x-auto gap-4 px-6 no-scrollbar">
                        {[1, 2].map((v) => (
                            <div key={v} className="min-w-[70%] space-y-3">
                                <div className="h-48 rounded-[32px] bg-gray-200 relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                                            <Play className="w-6 h-6 text-gray-900 fill-gray-900 ml-1" />
                                        </div>
                                    </div>
                                </div>
                                <button className="w-full py-3 px-6 rounded-2xl border-2 border-blue-600 text-blue-600 font-bold text-sm hover:bg-blue-600 hover:text-white transition-all active:scale-95">
                                    अभी अप्लाई करें
                                </button>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            {/* Bottom Navigation */}
            <LabourBottomNav />
        </div>
    );
};

export default LabourDashboard;

