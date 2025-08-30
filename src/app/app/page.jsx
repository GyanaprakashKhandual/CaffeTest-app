import ProjectSidebar from "../components/modules/Sidebar";
import ProjectDetails from "../components/pages/Configure";

export const metadata = {
  title: "Dashboard - Integrate with code cloud",
  description: "Dashboard page for Calf",
};

function Page() {
  return (
    <div className="flex h-screen">
      <ProjectSidebar />
      <ProjectDetails />
    </div>
  );
}

export default Page;
