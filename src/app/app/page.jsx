import ProjectSidebar from "../components/modules/Sidebar";

export const metadata = {
  title: "Dashboard - Integrate with code cloud",
  description: "Dashboard page for Calf",
};

function Page() {
  return (
    <div className="flex h-screen">
      <ProjectSidebar />
    </div>
  );
}

export default Page;
