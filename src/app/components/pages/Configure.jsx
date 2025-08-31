'use client'
import React, { useState, useEffect } from 'react';
import { Plus, Edit3, Trash2, Eye, FileText, CheckCircle, XCircle } from 'lucide-react';

const TestConfigurationDashboard = () => {
  // Simulated project context (replace with your actual useProject hook)
  const selectedProject = {
    _id: "68b1b6e00da2f92e4d185079",
    name: "Sample Project"
  };

  const [activeTab, setActiveTab] = useState('overview');
  const [testConfigurations, setTestConfigurations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    testTypeName: '',
    testTypeDesc: '',
    testFramework: 'Selenium'
  });
  const [editingConfig, setEditingConfig] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Fetch test configurations
  const fetchTestConfigurations = async () => {
    if (!selectedProject) return;
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/v1/test/${selectedProject._id}/test-types`,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        }
      );
      const data = await response.json();
      if (data.success) {
        setTestConfigurations(Array.isArray(data.data) ? data.data : [data.data]);
      }
    } catch (error) {
      console.error("Error fetching test configurations:", error);
    }
    setLoading(false);
  };

  // Add test configuration
  const addTestConfiguration = async () => {
    if (!selectedProject || !formData.testTypeName.trim()) return;
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/v1/test/${selectedProject._id}/test-types`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {})
          },
          body: JSON.stringify(formData)
        }
      );
      const data = await response.json();
      if (data.success) {
        setTestConfigurations(prev => [...prev, data.data]);
        setFormData({ testTypeName: '', testTypeDesc: '', testFramework: 'Selenium' });
        setShowForm(false);
        setActiveTab('overview');
      }
    } catch (error) {
      console.error("Error adding test configuration:", error);
    }
    setLoading(false);
  };

  // Update test configuration
  const updateTestConfiguration = async () => {
    if (!editingConfig || !formData.testTypeName.trim()) return;
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/v1/test/${selectedProject._id}/test-types/${editingConfig.testType_id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {})
          },
          body: JSON.stringify(formData)
        }
      );
      const data = await response.json();
      if (data.success) {
        setTestConfigurations(prev =>
          prev.map(config =>
            config.testType_id === editingConfig.testType_id ? data.data : config
          )
        );
        setFormData({ testTypeName: '', testTypeDesc: '', testFramework: 'Selenium' });
        setEditingConfig(null);
        setShowForm(false);
        setActiveTab('overview');
      }
    } catch (error) {
      console.error("Error updating test configuration:", error);
    }
    setLoading(false);
  };

  // Delete test configuration
  const deleteTestConfiguration = async (configId) => {
    if (!selectedProject) return;
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/v1/test/${selectedProject._id}/test-types/${configId}`,
        {
          method: 'DELETE',
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        }
      );
      if (response.ok) {
        setTestConfigurations(prev =>
          prev.filter(config => config.testType_id !== configId)
        );
      }
    } catch (error) {
      console.error("Error deleting test configuration:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTestConfigurations();
  }, [selectedProject]);

  const handleEdit = (config) => {
    setEditingConfig(config);
    setFormData({
      testTypeName: config.testTypeName,
      testTypeDesc: config.testTypeDesc,
      testFramework: config.testFramework
    });
    setShowForm(true);
    setActiveTab('edit');
  };

  const handleAdd = () => {
    setEditingConfig(null);
    setFormData({ testTypeName: '', testTypeDesc: '', testFramework: 'Selenium' });
    setShowForm(true);
    setActiveTab('add');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingConfig) {
      updateTestConfiguration();
    } else {
      addTestConfiguration();
    }
  };

  const navItems = [
    { key: 'overview', label: 'View', icon: Eye },
    { key: 'add', label: 'Add', icon: Plus },
    { key: 'edit', label: 'Edit', icon: Edit3 },
    { key: 'delete', label: 'Delete', icon: Trash2 },
    { key: 'documentation', label: 'Documentation', icon: FileText }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="w-full min-w-full max-w-full space-y-6">
            <div className="flex justify-between items-center w-full">
              <h2 className="text-2xl font-bold text-gray-800">Test Configurations</h2>
              <button
                onClick={handleAdd}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-300 transform hover:scale-105"
              >
                <Plus size={20} />
                Add New
              </button>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-40 w-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <div className="grid gap-4 w-full">
                {testConfigurations.length === 0 ? (
                  <div className="text-center py-12 bg-white rounded-lg border border-gray-200 w-full">
                    <Eye size={48} className="mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-600">No test configurations found</p>
                    <button
                      onClick={handleAdd}
                      className="mt-4 text-blue-600 hover:text-blue-800 transition-colors duration-200"
                    >
                      Add your first test configuration
                    </button>
                  </div>
                ) : (
                  testConfigurations.map((config) => (
                    <div
                      key={config.testType_id}
                      className="w-full bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-300"
                    >
                      <div className="flex justify-between items-start w-full">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-800 mb-2">{config.testTypeName}</h3>
                          <p className="text-gray-600 mb-3">{config.testTypeDesc}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full">
                              {config.testFramework}
                            </span>
                            <span>Created: {new Date(config.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <button
                            onClick={() => handleEdit(config)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                          >
                            <Edit3 size={18} />
                          </button>
                          <button
                            onClick={() => deleteTestConfiguration(config.testType_id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        );

      case 'add':
      case 'edit':
        return (
          <div className="w-full min-w-full max-w-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {editingConfig ? 'Edit Test Configuration' : 'Add Test Configuration'}
            </h2>
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm w-full">
              <div className="space-y-6 w-full">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Test Type Name *
                  </label>
                  <input
                    type="text"
                    value={formData.testTypeName}
                    onChange={(e) => setFormData(prev => ({ ...prev, testTypeName: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter test type name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.testTypeDesc}
                    onChange={(e) => setFormData(prev => ({ ...prev, testTypeDesc: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter test description"
                    rows={4}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Test Framework
                  </label>
                  <select
                    value={formData.testFramework}
                    onChange={(e) => setFormData(prev => ({ ...prev, testFramework: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="Selenium">Selenium</option>
                    <option value="Cypress">Cypress</option>
                    <option value="Jest">Jest</option>
                    <option value="Playwright">Playwright</option>
                    <option value="TestNG">TestNG</option>
                  </select>
                </div>

                <div className="flex gap-4 pt-4 w-full">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading || !formData.testTypeName.trim()}
                    className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105 disabled:transform-none"
                  >
                    {loading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    ) : (
                      <>
                        <CheckCircle size={20} />
                        {editingConfig ? 'Update Configuration' : 'Add Configuration'}
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingConfig(null);
                      setFormData({ testTypeName: '', testTypeDesc: '', testFramework: 'Selenium' });
                      setActiveTab('overview');
                    }}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 flex items-center gap-2"
                  >
                    <XCircle size={20} />
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'delete':
        return (
          <div className="w-full min-w-full max-w-full space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Delete Test Configuration</h2>
            {testConfigurations.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg border border-gray-200 w-full">
                <Trash2 size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600">No test configurations to delete</p>
              </div>
            ) : (
              <div className="grid gap-4 w-full">
                {testConfigurations.map((config) => (
                  <div key={config.testType_id} className="bg-white p-6 rounded-lg border border-red-200 hover:border-red-300 transition-all duration-300 w-full">
                    <div className="flex justify-between items-start w-full">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">{config.testTypeName}</h3>
                        <p className="text-gray-600 mb-3">{config.testTypeDesc}</p>
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm">
                          {config.testFramework}
                        </span>
                      </div>
                      <button
                        onClick={() => deleteTestConfiguration(config.testType_id)}
                        className="ml-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-300 transform hover:scale-105"
                      >
                        <Trash2 size={18} />
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 'documentation':
        return (
          <div className="w-full min-w-full max-w-full space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Documentation</h2>
            <div className="bg-white p-6 rounded-lg border border-gray-200 w-full">
              <div className="prose max-w-none">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Test Configuration Management</h3>
                <div className="space-y-4 text-gray-600">
                  <div>
                    <h4 className="font-medium text-gray-800">Adding Test Configurations</h4>
                    <p>Use the "Add Test Configuration" tab to create new test configurations for your project. Specify the test type name, description, and framework.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Editing Configurations</h4>
                    <p>Click the edit icon on any configuration in the overview to modify its details. All fields can be updated.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Deleting Configurations</h4>
                    <p>Use the delete tab to remove unwanted test configurations. This action cannot be undone.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Supported Frameworks</h4>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Selenium - Web automation testing</li>
                      <li>Cypress - Modern web testing</li>
                      <li>Jest - JavaScript testing framework</li>
                      <li>Playwright - Cross-browser testing</li>
                      <li>TestNG - Java testing framework</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="w-full min-w-full max-w-full text-center py-12">
            <h2 className="text-2xl font-bold text-gray-800">Welcome to Test Configuration Dashboard</h2>
            <p className="text-gray-600 mt-4">Select an option from the navigation to get started.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen max-h-screen bg-gradient-to-br from-blue-50 to-green-100 flex flex-col overflow-hidden w-full min-w-full max-w-full">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 w-full min-w-full max-w-full">
        <div className="w-full min-w-full max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 w-full">
            <div className="flex items-center space-x-8 w-full">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                {selectedProject?.name || 'Project Dashboard'}
              </h1>
              <div className="hidden md:flex space-x-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.key}
                      onClick={() => {
                        setActiveTab(item.key);
                        if (item.key !== 'add' && item.key !== 'edit') {
                          setShowForm(false);
                          setEditingConfig(null);
                        }
                      }}
                      className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-300 ${
                        activeTab === item.key
                          ? 'bg-blue-100 text-blue-700 font-semibold scale-105'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon size={18} />
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </nav>
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8 w-full min-w-full max-w-full">
        {showForm && (activeTab === 'add' || activeTab === 'edit')
          ? renderContent()
          : renderContent()}
      </main>
    </div>
  );
};

export default TestConfigurationDashboard;
