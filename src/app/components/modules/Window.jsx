"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getTestTypes } from "@/app/utils/functions/GetTestType";

export default function TestTypeList({ sidebarOpen }) {
  const [testTypes, setTestTypes] = useState(null);
  const [selectedTest, setSelectedTest] = useState(null);

  useEffect(() => {
    (async () => {
      const result = await getTestTypes();
      setTestTypes(result);
    })();
  }, []);

  if (!testTypes) return <p>Loading test types...</p>;

  return (
    <div className="flex h-screen bg-gradient-radial from-white via-sky-50 to-blue-50">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="w-60 min-w-60 max-w-60 bg-white shadow-lg border-r border-gray-200 overflow-y-auto"
          >
            <div className="p-2 space-y-2">
              {testTypes.data.map((testType, index) => (
                <motion.button
                  key={testType._id}
                  onClick={() => setSelectedTest(testType)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full p-3 rounded-lg text-sm font-medium ${
                    selectedTest?._id === testType._id
                      ? "bg-blue-500 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {testType.testTypeName}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 p-6">{/* your content */}</div>
    </div>
  );
}