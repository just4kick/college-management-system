import { motion } from "framer-motion";
import { Button } from "../ui/button";

export const DashboardSidebar = ({ sidebarOpen, setSidebarOpen, groups, onSelectGroup, activeGroup, setActiveGroup, expandedGroup, setExpandedGroup }) => {

  const handleGroupClick = (group, item = null) => {
    if (!sidebarOpen) return; // Prevent interactions when collapsed
    setActiveGroup(group);
    setExpandedGroup(expandedGroup === group.label ? null : group.label);
    if (item) {
      onSelectGroup(group, item);
    } else {
      onSelectGroup(group);
    }
  };

  return (
    <aside
      className={`bg-gray-800 text-white w-64 fixed h-screen top-0 left-0 transform duration-300 ease-in-out ${
        sidebarOpen ? "translate-x-0" : "-translate-x-64"
      }`}
    >
      <div className="p-4">
        {groups.map((group) => (
          <div key={group.label} onClick={() => handleGroupClick(group)}>
            <Button variant="ghost" className="w-full justify-start text-xs mb-2">
              {group.label}
            </Button>
            {sidebarOpen && expandedGroup === group.label && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
                className="ml-4 overflow-hidden"
              >
                {group.items.map((item, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="w-full justify-start text-xs mb-2"
                    onClick={() => handleGroupClick(group, item)}
                  >
                    {item.label}
                  </Button>
                ))}
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
};



