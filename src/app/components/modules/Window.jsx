"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getTestTypes } from "@/app/utils/functions/GetTestType";
import { MoreVertical } from "lucide-react";

export default function TestTypeList({ sidebarOpen, onClose }) {
  const [testTypes, setTestTypes] = useState(null);
  const [selectedTest, setSelectedTest] = useState(null);

  useEffect(() => {
    (async () => {
      const result = await getTestTypes();
      setTestTypes(result);
    })();
  }, []);

  if (!testTypes) return null;

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
            onClick={onClose}
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
            className="fixed left-0 top-0 h-full w-72 mt-16 bg-gradient-radial from-blue-100 via-sky-100 to-purple-100"
          >
            <div className="p-4 space-y-3">
              {testTypes.data.map((testType) => (
                <motion.button
                  key={testType._id}
                  onClick={() => setSelectedTest(testType)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full p-4 rounded-lg text-left font-medium flex items-center justify-between shadow-md transition-all duration-200
                    ${
                      selectedTest?._id === testType._id
                        ? "bg-gradient-to-r from-blue-500 to-sky-500 text-white"
                        : "bg-gradient-radial from-blue-100 via-sky-100  to-purple-100 text-gray-800 hover:from-blue-200 hover:via-sky-200 hover:to-purple-200"
                    }`}
                >
                  <span>{testType.testTypeName}</span>
                  <MoreVertical className="w-4 h-4 opacity-70" />
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}