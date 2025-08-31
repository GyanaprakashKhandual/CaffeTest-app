import ProjectSidebar from "../components/modules/Sidebar";
import TestConfigurationDashboard from "../components/pages/Configure";

export const metadata = {
  title: "Dashboard - Integrate with code cloud",
  description: "Dashboard page for Calf",
};

function Page() {
  return (
    <div className="flex h-screen">
      <ProjectSidebar />
      <div className="w-7xl">
        <TestConfigurationDashboard/>
      </div>
    </div>
  );
}

export default Page;
