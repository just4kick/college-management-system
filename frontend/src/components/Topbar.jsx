import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"; // Use ShadCN's button component
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

const Topbar = () => {
  const [currentTime, setCurrentTime] = useState("");
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
      setCurrentTime(formattedTime);
    };

    updateTime();
    const timer = setInterval(updateTime, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-background text-foreground border-b">
      <div className="container mx-auto flex items-center justify-between py-2 px-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src="/logo_msit.png" // Replace with your logo's path
            alt="College Logo"
            className="h-10 w-10"
          />
          <span className="font-semibold text-primary text-lg">
            IIT-Anandapur
          </span>
        </div>

        {/* Info */}
        <div className="flex items-center gap-4 text-sm">
          <span className="text-muted-foreground">{currentTime}</span>
          <span className="text-muted-foreground">📞 +91 98765 43210</span>
          <span className="text-muted-foreground">ID: CMS-1234</span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="text-xs"
            onClick={() =>
              setTheme(theme === "light" ? "dark" : "light")
            }
          >
            {theme === "light" ? (
              <Moon className="w-4 h-4" />
            ) : (
              <Sun className="w-4 h-4" />
            )}
          </Button>
          <Button variant="outline" className="text-xs">
            Help
          </Button>
          <Button className="text-xs">Contact</Button>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
