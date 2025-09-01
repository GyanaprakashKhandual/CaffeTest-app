"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getTestTypes } from "@/app/utils/functions/GetTestType";

export default function TestTypeList() {
  const [testTypes, setTestTypes] = useState(null);
  const [selectedTest, setSelectedTest] = useState(null);

  useEffect(() => {
    (async () => {
      const result = await getTestTypes();
      setTestTypes(result);
    })();
  }, []);

  if (!testTypes) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-lg font-medium text-gray-600"
        >
          Loading test types...
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gradient-radial from-white via-sky-50 to-blue-50">
      {/* Sidebar */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-60 min-w-60 max-w-60 bg-white shadow-lg border-r border-gray-200 overflow-y-auto"
      >
        <div className="p-2">
          <div className="space-y-2">
            {testTypes.data.map((testType, index) => (
              <motion.button
                key={testType._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedTest(testType)}
                className={`w-full p-3 rounded-lg text-sm font-medium transition-all duration-200 break-words flex items-center justify-between group ${
                  selectedTest?._id === testType._id
                    ? "bg-blue-500 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <span className="truncate flex-1">{testType.testTypeName}</span>
                <div className="flex space-x-0.5 ml-2">
                  <div className={`w-1 h-1 rounded-full ${
                    selectedTest?._id === testType._id ? "bg-white" : "bg-gray-400"
                  }`}></div>
                  <div className={`w-1 h-1 rounded-full ${
                    selectedTest?._id === testType._id ? "bg-white" : "bg-gray-400"
                  }`}></div>
                  <div className={`w-1 h-1 rounded-full ${
                    selectedTest?._id === testType._id ? "bg-white" : "bg-gray-400"
                  }`}></div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <AnimatePresence mode="wait">
          {selectedTest ? (
            <motion.div
              key={selectedTest._id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl mx-auto"
            >
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl shadow-lg p-8 border border-blue-100 backdrop-blur-sm"
              >
                <motion.h1
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent mb-6"
                >
                  {selectedTest.testTypeName}
                </motion.h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-4"
                  >
                    <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                      <h3 className="font-semibold text-blue-900 mb-2">Test Details</h3>
                      <p className="text-sm text-blue-800">
                        <span className="font-medium">Test Type ID:</span> {selectedTest.testType_id}
                      </p>
                      <p className="text-sm text-blue-800 mt-1">
                        <span className="font-medium">Framework:</span> {selectedTest.testFramework}
                      </p>
                    </div>

                    <div className="bg-sky-50 border border-sky-200 p-4 rounded-lg">
                      <h3 className="font-semibold text-sky-900 mb-2">Project Information</h3>
                      <p className="text-sm text-sky-800">
                        <span className="font-medium">Project ID:</span> {selectedTest.project._id}
                      </p>
                      <p className="text-sm text-sky-800 mt-1">
                        <span className="font-medium">Project Name:</span> {selectedTest.project.projectName}
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm"
                  >
                    <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                    <p className="text-gray-700 leading-relaxed">
                      {selectedTest.testTypeDesc}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center h-full"
            >
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <svg
                    className="w-8 h-8 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </motion.div>
                <motion.h2
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-xl font-semibold text-gray-800 mb-2"
                >
                  Select a Test Type
                </motion.h2>
                <motion.p
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-gray-600"
                >
                  Choose a test type from the sidebar to view its details
                </motion.p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}