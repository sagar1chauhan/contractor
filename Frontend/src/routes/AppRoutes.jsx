import { Routes, Route } from 'react-router-dom';

// Auth Pages
import GetStarted from '../modules/auth/pages/GetStarted';
import MobileInput from '../modules/auth/pages/MobileInput';
import OTPVerification from '../modules/auth/pages/OTPVerification';
import CompleteProfile from '../modules/auth/pages/CompleteProfile';

// User Pages
import UserDashboard from '../modules/user/pages/UserDashboard';
import HireWorkers from '../modules/user/pages/HireWorkers';
import Settings from '../modules/user/pages/Settings';
import PersonalDetails from '../modules/user/pages/PersonalDetails';
import AddProject from '../modules/user/pages/AddProject';
import ContactUs from '../modules/user/pages/ContactUs';

// Contractor Pages
import BusinessDetails from '../modules/contractor/pages/BusinessDetails';
import ContractorDashboard from '../modules/contractor/pages/ContractorDashboard';
import ContractorSettings from '../modules/contractor/pages/ContractorSettings';
import ContractorProjectDetails from '../modules/contractor/pages/ContractorProjectDetails';
import ApplicationDetails from '../modules/contractor/pages/ApplicationDetails';

// Labour Pages
import LabourDetails from '../modules/labour/pages/LabourDetails';
import LabourDashboard from '../modules/labour/pages/LabourDashboard';
import LabourSettings from '../modules/labour/pages/LabourSettings';
import LabourPersonalDetails from '../modules/labour/pages/LabourPersonalDetails';
import LabourWorkDetails from '../modules/labour/pages/LabourWorkDetails';
import LabourLegalDetails from '../modules/labour/pages/LabourLegalDetails';
import LabourPaymentDetails from '../modules/labour/pages/LabourPaymentDetails';

// Utils
import ProtectedRoute from './ProtectedRoute';

const AppRoutes = () => {
    return (
        <Routes>
            {/* Public / Auth Routes */}
            <Route path="/" element={<GetStarted />} />
            <Route path="/mobile-login" element={<MobileInput />} />
            <Route path="/otp-verify" element={<OTPVerification />} />
            <Route path="/complete-profile" element={<CompleteProfile />} />

            {/* User Routes */}
            <Route
                path="/user/dashboard"
                element={
                    <ProtectedRoute role="User">
                        <UserDashboard />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/user/hire"
                element={
                    <ProtectedRoute role="User">
                        <HireWorkers />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/user/settings"
                element={
                    <ProtectedRoute role="User">
                        <Settings />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/user/personal-details"
                element={
                    <ProtectedRoute role="User">
                        <PersonalDetails />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/user/add-project"
                element={
                    <ProtectedRoute role="User">
                        <AddProject />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/user/contact-us"
                element={
                    <ProtectedRoute role="User">
                        <ContactUs />
                    </ProtectedRoute>
                }
            />

            {/* Contractor Routes */}
            <Route path="/contractor/business-details" element={<BusinessDetails />} />
            <Route
                path="/contractor/dashboard"
                element={
                    <ProtectedRoute role="Contractor">
                        <ContractorDashboard />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/contractor/hire"
                element={
                    <ProtectedRoute role="Contractor">
                        <HireWorkers isContractor={true} />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/contractor/settings"
                element={
                    <ProtectedRoute role="Contractor">
                        <ContractorSettings />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/contractor/add-project"
                element={
                    <ProtectedRoute role="Contractor">
                        <AddProject />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/contractor/project/:id"
                element={
                    <ProtectedRoute role="Contractor">
                        <ContractorProjectDetails />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/contractor/application/:id"
                element={
                    <ProtectedRoute role="Contractor">
                        <ApplicationDetails />
                    </ProtectedRoute>
                }
            />

            {/* Labour Routes */}
            <Route path="/labour/details" element={<LabourDetails />} />
            <Route
                path="/labour/dashboard"
                element={
                    <ProtectedRoute role="Labour">
                        <LabourDashboard />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/labour/settings"
                element={
                    <ProtectedRoute role="Labour">
                        <LabourSettings />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/labour/personal-details"
                element={
                    <ProtectedRoute role="Labour">
                        <LabourPersonalDetails />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/labour/work-details"
                element={
                    <ProtectedRoute role="Labour">
                        <LabourWorkDetails />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/labour/legal-details"
                element={
                    <ProtectedRoute role="Labour">
                        <LabourLegalDetails />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/labour/payment-details"
                element={
                    <ProtectedRoute role="Labour">
                        <LabourPaymentDetails />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
};

export default AppRoutes;
