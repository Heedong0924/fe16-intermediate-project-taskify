import DashboardSection from './components/dashboard/DashboardSection';
import InvitationDashboard from './components/invitation/InvitationDashboard';

const Mydashboard = () => {
  return (
    <div className="bg-taskify-neutral-200 min-h-screen">
      <div className="ml-6 h-screen flex-col md:ml-3.5 md:block md:h-auto md:pt-20 lg:ml-10 lg:pt-20">
        <DashboardSection />
        <InvitationDashboard />
      </div>
    </div>
  );
};

export default Mydashboard;
