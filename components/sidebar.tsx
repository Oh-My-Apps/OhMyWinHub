"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  Settings,
  Palette,
  Layout,
  ChevronRight,
  MonitorPlay,
  ChevronDown,
  Laptop,
  Users,
  Bell,
  Boxes,
  Paintbrush,
  Sliders,
  UserCircle,
  LogOut,
  CircleUser,
  MoreHorizontal,
  User,
  CreditCard,
  Mail,
  MessageSquare,
  PlusCircle,
  UserPlus,
  Settings2,
  HelpCircle,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

interface MenuItem {
  title: string;
  icon: any;
  href?: string;
  badge?: string;
  submenu?: {
    title: string;
    href: string;
    icon: any;
    badge?: string;
  }[];
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openMenus, setOpenMenus] = useState<string[]>([]);

  const items: MenuItem[] = [
    {
      title: "Programmes",
      icon: MonitorPlay,
      badge: "3",
      submenu: [
        { title: "Applications", href: "/programmes/apps", icon: Laptop, badge: "New" },
        { title: "Utilisateurs", href: "/programmes/users", icon: Users },
        { title: "Notifications", href: "/programmes/notifications", icon: Bell, badge: "2" },
      ],
    },
    {
      title: "Configuration",
      icon: Layout,
      submenu: [
        { title: "Système", href: "/configuration/system", icon: Boxes },
        { title: "Intégrations", href: "/configuration/integrations", icon: Sliders, badge: "Beta" },
      ],
    },
    {
      title: "Customisation",
      icon: Palette,
      submenu: [
        { title: "Thèmes", href: "/customisation/themes", icon: Paintbrush },
        { title: "Styles", href: "/customisation/styles", icon: Palette },
      ],
    },
    {
      title: "Paramètres",
      icon: Settings,
      submenu: [
        { title: "Profil", href: "/settings/profile", icon: UserCircle },
        { title: "Préférences", href: "/settings/preferences", icon: Settings },
      ],
    },
  ];

  const toggleMenu = (title: string) => {
    setOpenMenus((current) =>
      current.includes(title)
        ? current.filter((item) => item !== title)
        : [...current, title]
    );
  };

  return (
    <div
      className={cn(
        "relative flex flex-col border-r bg-background transition-all duration-300",
        isCollapsed ? "w-[60px]" : "w-[240px]",
        className
      )}
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-4 top-4 z-20 rounded-full border bg-background"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <ChevronRight
          className={cn("h-4 w-4 transition-transform", 
            isCollapsed ? "" : "rotate-180"
          )}
        />
      </Button>

      {/* Sidebar Header with Dropdown */}
      <div className={cn(
        "flex h-16 items-center border-b px-4",
        isCollapsed ? "justify-center" : "justify-between"
      )}>
        {isCollapsed ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <CircleUser className="h-6 w-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-xs text-muted-foreground">admin@example.com</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCard className="mr-2 h-4 w-4" />
                  <span>Facturation</span>
                  <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Paramètres</span>
                  <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-medium">John Doe</span>
                <span className="text-xs text-muted-foreground">Admin</span>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" forceMount>
                <DropdownMenuLabel>Mon Compte</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCard className="mr-2 h-4 w-4" />
                  <span>Facturation</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Paramètres</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>

      <ScrollArea className="flex-1">
        <div className="space-y-4 py-4">
          <div className="px-3 py-2">
            <div className="space-y-1">
              {items.map((item) => (
                <Collapsible
                  key={item.title}
                  open={!isCollapsed && openMenus.includes(item.title)}
                  onOpenChange={() => !isCollapsed && toggleMenu(item.title)}
                >
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-between px-3 py-2 text-sm font-medium",
                        isCollapsed && "justify-center px-2"
                      )}
                    >
                      <div className="flex items-center">
                        <item.icon className={cn("h-5 w-5", 
                          isCollapsed ? "mr-0" : "mr-2"
                        )} />
                        {!isCollapsed && (
                          <span className="flex-1">{item.title}</span>
                        )}
                        {!isCollapsed && item.badge && (
                          <Badge variant="secondary" className="ml-2">
                            {item.badge}
                          </Badge>
                        )}
                      </div>
                      {!isCollapsed && (
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 transition-transform",
                            openMenus.includes(item.title) && "rotate-180"
                          )}
                        />
                      )}
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-1">
                    {!isCollapsed && item.submenu?.map((subitem) => (
                      <Link
                        key={subitem.href}
                        href={subitem.href}
                        className={cn(
                          "flex items-center justify-between rounded-md px-8 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                          pathname === subitem.href ? "bg-accent" : "transparent"
                        )}
                      >
                        <div className="flex items-center">
                          <subitem.icon className="mr-2 h-4 w-4" />
                          <span>{subitem.title}</span>
                        </div>
                        {subitem.badge && (
                          <Badge variant="secondary" className="ml-2">
                            {subitem.badge}
                          </Badge>
                        )}
                      </Link>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>

      {/* Sidebar Footer with Dropdown */}
      <div className={cn(
        "border-t p-4",
        isCollapsed ? "flex justify-center" : ""
      )}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              className={cn(
                "w-full justify-start",
                isCollapsed && "justify-center px-2"
              )}
            >
              <LogOut className={cn("h-5 w-5", isCollapsed ? "mr-0" : "mr-2")} />
              {!isCollapsed && <span>Options</span>}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <UserPlus className="mr-2 h-4 w-4" />
                <span>Inviter des utilisateurs</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <PlusCircle className="mr-2 h-4 w-4" />
                <span>Nouveau projet</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <MessageSquare className="mr-2 h-4 w-4" />
                <span>Support</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Settings2 className="mr-2 h-4 w-4" />
              <span>Paramètres</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <HelpCircle className="mr-2 h-4 w-4" />
              <span>Aide</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Déconnexion</span>
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}