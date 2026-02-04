import { useNavigate } from 'react-router-dom';

const GetStarted = () => {
    const navigate = useNavigate();

    return (
        <div className="h-screen flex flex-col relative bg-gray-50">
            {/* Background Image Section - using a placeholder or color for now since we don't have the exact image asset */}
            <div className="flex-1 bg-gray-200 relative">
                <img
                    src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=2070&auto=format&fit=crop"
                    alt="Worker"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Yellow Bottom Section */}
            <div className="bg-[#fbbf24] p-8 rounded-t-3xl -mt-6 relative z-10 flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold text-white mb-2">
                    Your All-in-One Hiring Solution
                </h1>
                <p className="text-white/90 text-sm mb-8 px-4">
                    Find and hire the best talent for your work from anywhere in India.
                </p>

                <button
                    onClick={() => navigate('/mobile-login')}
                    className="w-full bg-gray-100 text-gray-900 font-semibold py-4 rounded-full shadow-lg hover:bg-white transition-colors"
                >
                    Get Started
                </button>
            </div>
        </div>
    );
};

export default GetStarted;
