
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Filter, Calendar, ArrowUpDown } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export function MembersTab() {
  const [viewMode, setViewMode] = useState<"table" | "cards">("table");
  
  const members = [
    { 
      id: 1, 
      name: "Sofia Ricci", 
      email: "sofia.r@example.com",
      membershipType: "Premium",
      status: "Active",
      joinDate: "Jan 15, 2023",
      trainingSessions: 48,
      lastActive: "Today",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=160&h=160&q=80" 
    },
    { 
      id: 2, 
      name: "Luca Marino", 
      email: "luca.m@example.com",
      membershipType: "Standard",
      status: "Active",
      joinDate: "Mar 3, 2023",
      trainingSessions: 32,
      lastActive: "Yesterday",
      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=160&h=160&q=80" 
    },
    { 
      id: 3, 
      name: "Elena Costa", 
      email: "elena.c@example.com",
      membershipType: "Premium",
      status: "Away",
      joinDate: "Nov 12, 2022",
      trainingSessions: 56,
      lastActive: "4 days ago",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=160&h=160&q=80" 
    },
    { 
      id: 4, 
      name: "Roberto Ferrari", 
      email: "roberto.f@example.com",
      membershipType: "Standard",
      status: "Active",
      joinDate: "Feb 28, 2023",
      trainingSessions: 28,
      lastActive: "2 days ago",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=160&h=160&q=80" 
    },
    { 
      id: 5, 
      name: "Martina Russo", 
      email: "martina.r@example.com",
      membershipType: "Premium",
      status: "Active",
      joinDate: "Dec 10, 2022",
      trainingSessions: 42,
      lastActive: "Today",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=160&h=160&q=80" 
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-50 text-green-700 border-green-200";
      case "Away":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Inactive":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getMembershipColor = (type: string) => {
    switch (type) {
      case "Premium":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "Standard":
        return "bg-blue-50 text-blue-700 border-blue-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Members Management</h1>
          <p className="text-muted-foreground">Manage your gym's members and clients</p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search members..."
              className="pl-8 w-full md:w-[200px] lg:w-[300px]"
            />
          </div>
          
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          
          <Button>
            <Plus className="mr-1 h-4 w-4" />
            Add Member
          </Button>
        </div>
      </div>
      
      <div className="bg-white rounded-md border">
        <div className="p-4 border-b flex justify-between items-center">
          <div className="flex items-center gap-2">
            <p className="font-medium">All Members</p>
            <Badge variant="outline">{members.length}</Badge>
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant={viewMode === "table" ? "default" : "outline"} 
              size="sm"
              onClick={() => setViewMode("table")}
              className="py-1 h-8"
            >
              <ArrowUpDown className="mr-1 h-4 w-4" />
              Table
            </Button>
            <Button 
              variant={viewMode === "cards" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("cards")}
              className="py-1 h-8"
            >
              <Calendar className="mr-1 h-4 w-4" />
              Cards
            </Button>
          </div>
        </div>
        
        {viewMode === "table" ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Member</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Membership</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {members.map(member => (
                  <TableRow key={member.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={member.image} alt={member.name} />
                          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{member.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{member.email}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getMembershipColor(member.membershipType)}>
                        {member.membershipType}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusColor(member.status)}>
                        {member.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{member.joinDate}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">View</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {members.map(member => (
              <Card key={member.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={member.image} alt={member.name} />
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{member.name}</h3>
                        <p className="text-sm text-muted-foreground">{member.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge variant="outline" className={getMembershipColor(member.membershipType)}>
                        {member.membershipType}
                      </Badge>
                      <Badge variant="outline" className={getStatusColor(member.status)}>
                        {member.status}
                      </Badge>
                    </div>
                    
                    <div className="text-sm space-y-1 mb-4">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Member since:</span>
                        <span>{member.joinDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Sessions:</span>
                        <span>{member.trainingSessions}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Last active:</span>
                        <span>{member.lastActive}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">Profile</Button>
                      <Button size="sm" className="flex-1">Manage</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
