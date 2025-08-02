import DashboardSection from './components/dashboard/DashboardSection';
import InvitationDashboard from './components/invitation/InvitationDashboard';

const Mydashboard = () => {
  return (
    <div className="bg-taskify-neutral-200 min-h-screen">
      <div className="mx-auto flex max-w-[330px] flex-col gap-1 pt-[150px] pb-6 md:ml-10 md:block md:h-auto md:max-w-none md:gap-6 md:pt-22 lg:ml-10 lg:pt-20">
        <DashboardSection />
        <InvitationDashboard />
      </div>
    </div>
  );
};

export default Mydashboard;
