import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Delete, X, ChevronLeft } from 'lucide-react';
import { useState } from 'react';

const MobileInput = () => {
    const navigate = useNavigate();
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleKeyPress = (num) => {
        if (phoneNumber.length < 10) {
            setPhoneNumber(prev => prev + num);
        }
    };

    const handleBackspace = () => {
        setPhoneNumber(prev => prev.slice(0, -1));
    };

    const handleContinue = () => {
        if (phoneNumber.length === 10) {
            navigate('/otp-verify', { state: { phoneNumber } });
        }
    };

    return (
        <div className="h-screen flex flex-col bg-gray-50">
            {/* Header */}
            <div className="p-4 flex items-center">
                <button onClick={() => navigate(-1)} className="p-2">
                    <ChevronLeft className="w-6 h-6 text-gray-800" />
                </button>
            </div>

            <div className="flex-1 px-6 pt-4 flex flex-col">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    Enter your mobile number
                </h1>
                <p className="text-gray-500 text-sm mb-8">
                    We will send you a confirmation code
                </p>

                {/* Number Display */}
                <div className="flex items-center justify-center mb-12">
                    <span className="text-4xl text-gray-400 mr-4">+91</span>
                    <span className="text-4xl text-gray-900 tracking-wider min-h-[40px]">
                        {phoneNumber}
                    </span>
                </div>

                {/* Spacer */}
                <div className="flex-1"></div>

                {/* Keypad */}
                <div className="grid grid-cols-3 gap-y-6 mb-8 text-center">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                        <button
                            key={num}
                            onClick={() => handleKeyPress(num)}
                            className="text-3xl font-medium text-gray-900 py-4 hover:bg-gray-100 rounded-full active:bg-gray-200"
                        >
                            {num}
                        </button>
                    ))}
                    <div className="col-span-1"></div>
                    <button
                        onClick={() => handleKeyPress(0)}
                        className="text-3xl font-medium text-gray-900 py-4 hover:bg-gray-100 rounded-full active:bg-gray-200"
                    >
                        0
                    </button>
                    <button
                        onClick={handleBackspace}
                        className="flex items-center justify-center py-4 text-red-500 hover:bg-gray-100 rounded-full active:bg-gray-200"
                    >
                        <X className="w-8 h-8 rounded border border-red-500 p-1" />
                    </button>
                </div>

                <div className="mb-6">
                    <button
                        onClick={handleContinue}
                        disabled={phoneNumber.length !== 10}
                        className={`w-full py-4 rounded-full text-gray-900 font-semibold text-lg transition-colors
              ${phoneNumber.length === 10 ? 'bg-[#fbbf24] hover:bg-yellow-500' : 'bg-yellow-200 cursor-not-allowed'}
            `}
                    >
                        Continue
                    </button>
                </div>

                {/* Footer Text */}
                <p className="text-center text-xs text-gray-400 mb-4 px-8">
                    By continuing, you agree to our <span className="text-blue-600">terms & conditions</span> and <span className="text-blue-600">privacy policy</span>
                </p>
            </div>
        </div>
    );
};

export default MobileInput;
