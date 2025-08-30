"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useProject } from "../../script/Projectcontext";

const ProjectDetails = () => {
  const { selectedProject } = useProject();
  const [projectData, setProjectData] = useState(null);

  useEffect(() => {
    if (selectedProject) {
      const token = localStorage.getItem("token");
      axios
        .get(`http://localhost:5000/api/v1/project/${selectedProject._id}`,
          token ? { headers: { Authorization: `Bearer ${token}` } } : {}
        )
        .then(res => setProjectData(res.data.data))
        .catch(err => console.error("Error fetching project details:", err));
    }
  }, [selectedProject]);

  if (!selectedProject) {
    return <div className="p-6 text-gray-500">Select a project to view details</div>;
  }

  if (!projectData) {
    return <div className="p-6 text-gray-500">Loading project details...</div>;
  }

  return (
    <div className="p-6 flex-1 bg-gray-50">
      <h1 className="text-2xl font-bold">{projectData.projectName}</h1>
      <p className="mt-2 text-gray-700">ID: {projectData._id}</p>
      <p className="mt-2 text-gray-700">Slug: {projectData.slug}</p>
      <p className="mt-2 text-gray-700">Description: {projectData.projectDesc}</p>
      {/* Add more fields as needed */}
    </div>
  );
};

export default ProjectDetails;
