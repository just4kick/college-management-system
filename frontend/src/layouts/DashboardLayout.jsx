import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible"
import {  ChevronRight, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const DashboardLayout = ({ sidebarConfig, children, user }) => {
  const [activeItem, setActiveItem] = useState(null);

  const renderSidebarItem = (item, index) => (
    <Collapsible key={index} className="mb-4">
      <CollapsibleTrigger className="flex items-center justify-between w-full p-2 rounded-md hover:bg-accent group">
        <div className="flex items-center">
          {item.icon && <item.icon className="mr-2" />}
          <span className="font-semibold">{item.label}</span>
        </div>
        <ChevronRight className="h-4 w-4 transition-transform duration-300 ease-in-out group-data-[state=open]:rotate-90" />
      </CollapsibleTrigger>
      <CollapsibleContent className="pl-4 mt-2 space-y-2 overflow-hidden transition-all duration-300 ease-in-out">
        {item.items.map((subItem, subIndex) => (
          <Button
            key={subIndex}
            variant="ghost"
            className="w-full justify-start"
            onClick={() => setActiveItem(subItem)}
          >
            {subItem.label}
          </Button>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );

  const handleLogout = () => {
    // Implement logout logic here
    console.log('Logging out...');
  };

  return (
    <div className="flex h-screen">
      <aside className="w-80 bg-background text-foreground p-4 flex flex-col border overflow-x-hidden rounded-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Dashboard</h1>
        <div className="flex-grow overflow-y-auto">
          {sidebarConfig.map(renderSidebarItem)}
        </div>
        <div className="mt-auto">
          <div className="flex items-center space-x-4 mb-4 p-2 bg-accent rounded-lg">
            <Avatar>
              <AvatarImage src={user.avatarUrl} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.role}</p>
            </div>
          </div>
          <Button
            variant="destructive"
            className="w-full justify-start"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>
      <main className="flex-1 p-8 bg-background text-foreground overflow-y-auto min-w-0 rounded-lg">
        {activeItem ? <activeItem.component /> : children}
      </main>
    </div>
  );
};



export default DashboardLayout;

