import React, { useState } from "react";
import { useState, useEffect } from "react";
import { axios, head } from 'axios';




const appNavbar = () => {

    const [project, setProject] = useState([]);
    const [projectSelected, setProjectSelected] = useState(null);
    const [token, setToken] = useState(false);

    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        setToken(savedToken);
    }, []);

    const fetchProjects = async () => {
        if (!token) return;
        try {

            const res = await axios.get('http://localhost:5000/api/v1/project', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setProject(res.data.data || []);
        } catch (error) {
            console.error("Error fetching projects", err);
            setProject([]);
        }
        useEffect(() => {
            fetchProjects();
        }, [token]);

    }
    return (
        <div>
            
        </div>
    )
}