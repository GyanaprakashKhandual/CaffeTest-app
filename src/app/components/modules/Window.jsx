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
    <>
      {/* Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed left-0 top-0 h-full w-72 mt-15"
          >
            <div className="p-4 space-y-3 mt-16">
              {testTypes.data.map((testType, index) => (
                <motion.button
                  key={testType._id}
                  onClick={() => setSelectedTest(testType)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full p-4 rounded-lg text-left font-medium ${
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
    </>
  );
}