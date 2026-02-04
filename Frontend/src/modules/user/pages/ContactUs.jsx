import { useNavigate } from 'react-router-dom';
import { ChevronRight, Phone, Mail, FileText, Facebook, Youtube, Twitter, Instagram } from 'lucide-react';
import { MessageCircle } from 'lucide-react'; // Using Lucide for icon variety

const ContactUs = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <div className="p-6 bg-white shadow-sm sticky top-0 z-10 flex items-center gap-3">
                <button onClick={() => navigate(-1)}>
                    <ChevronRight className="w-6 h-6 text-gray-900 rotate-180" />
                </button>
                <h1 className="text-xl font-medium text-gray-900">Contact us</h1>
            </div>

            <div className="flex-1 p-6 overflow-y-auto space-y-6">

                {/* Contact Cards */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#d1fae5] p-6 rounded-3xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:opacity-90 transition-opacity">
                        <MessageCircle className="w-8 h-8 text-green-600" />
                        <span className="text-green-800 font-medium text-center text-sm">Connect on WhatsApp</span>
                    </div>

                    <div className="bg-[#fee2e2] p-6 rounded-3xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:opacity-90 transition-opacity">
                        <Phone className="w-8 h-8 text-red-500" />
                        <span className="text-red-700 font-medium text-center text-sm">Connect on call</span>
                    </div>
                </div>

                {/* Email Support */}
                <div className="bg-[#dbeafe] p-4 rounded-xl flex items-center gap-3 cursor-pointer">
                    <Mail className="w-6 h-6 text-blue-500" />
                    <span className="text-blue-700 font-medium text-sm">support@digitallabourchowk.com</span>
                </div>

                {/* Policies */}
                <div>
                    <h3 className="font-bold text-gray-900 mb-4">Policies</h3>
                    <div className="bg-white rounded-3xl overflow-hidden shadow-sm">
                        <PolicyItem label="Terms & Conditions" />
                        <PolicyItem label="Privacy Policy" />
                        <PolicyItem label="Cancellation Policy" />
                        <PolicyItem label="Refund policy" isLast />
                    </div>
                </div>

                {/* Social Media */}
                <div>
                    <h3 className="font-bold text-gray-900 mb-4">Social media</h3>
                    <div className="flex gap-6 justify-center">
                        <Facebook className="w-8 h-8 text-blue-600 cursor-pointer hover:scale-110 transition-transform" />
                        <Youtube className="w-8 h-8 text-red-600 cursor-pointer hover:scale-110 transition-transform" />
                        <Instagram className="w-8 h-8 text-pink-600 cursor-pointer hover:scale-110 transition-transform" />
                        <Twitter className="w-8 h-8 text-blue-400 cursor-pointer hover:scale-110 transition-transform" />
                    </div>
                </div>
            </div>
        </div>
    );
};

const PolicyItem = ({ label, isLast }) => (
    <div className={`p-4 flex justify-between items-center hover:bg-gray-50 cursor-pointer ${!isLast ? 'border-b border-gray-100' : ''}`}>
        <span className="text-gray-700 font-medium">{label}</span>
        {/* Determine if arrow needed? Image doesn't show arrows but usually implies navigation. Will leave clean text for now as per image. */}
    </div>
);

export default ContactUs;
