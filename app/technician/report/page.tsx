'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DateRangePickerWithRange } from "@/components/ui/date-range-picker"
import { DateRange } from "react-day-picker"
import { addDays, format } from "date-fns"
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts'
import { Download, Filter, Calendar, TrendingUp, Users, CheckCircle, Clock, AlertCircle } from 'lucide-react'

// Types
type Technician = {
  id: string;
  name: string;
  region: string;
  completedTasks: number;
  pendingTasks: number;
  averageRating: number;
  efficiency: number;
  status: 'Active' | 'On Leave' | 'Training';
}

type PerformanceMetric = {
  name: string;
  value: number;
  change: number;
  icon: React.ReactNode;
  color: string;
}

// Sample data
const initialTechnicians: Technician[] = [
  { id: '1', name: 'John Doe', region: 'North', completedTasks: 45, pendingTasks: 5, averageRating: 4.7, efficiency: 92, status: 'Active' },
  { id: '2', name: 'Jane Smith', region: 'South', completedTasks: 38, pendingTasks: 3, averageRating: 4.5, efficiency: 88, status: 'Active' },
  { id: '3', name: 'Bob Johnson', region: 'East', completedTasks: 52, pendingTasks: 0, averageRating: 4.9, efficiency: 95, status: 'Active' },
  { id: '4', name: 'Alice Williams', region: 'West', completedTasks: 41, pendingTasks: 7, averageRating: 4.3, efficiency: 85, status: 'On Leave' },
  { id: '5', name: 'Charlie Brown', region: 'North', completedTasks: 36, pendingTasks: 4, averageRating: 4.6, efficiency: 90, status: 'Training' },
];

const monthlyPerformance = [
  { month: 'Jan', tasks: 120, efficiency: 88 },
  { month: 'Feb', tasks: 132, efficiency: 89 },
  { month: 'Mar', tasks: 141, efficiency: 90 },
  { month: 'Apr', tasks: 138, efficiency: 91 },
  { month: 'May', tasks: 145, efficiency: 92 },
  { month: 'Jun', tasks: 160, efficiency: 93 },
  { month: 'Jul', tasks: 170, efficiency: 94 },
  { month: 'Aug', tasks: 168, efficiency: 93 },
  { month: 'Sep', tasks: 175, efficiency: 95 },
  { month: 'Oct', tasks: 190, efficiency: 96 },
  { month: 'Nov', tasks: 185, efficiency: 94 },
  { month: 'Dec', tasks: 195, efficiency: 95 },
];

const taskDistribution = [
  { name: 'Installation', value: 45 },
  { name: 'Repair', value: 30 },
  { name: 'Maintenance', value: 15 },
  { name: 'Consultation', value: 10 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function ReportPage() {
  const [dateRange, setDateRange] = useState<DateRange>({
    from: addDays(new Date(), -30),
    to: new Date(),
  });
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [technicians, setTechnicians] = useState<Technician[]>(initialTechnicians);
  
  // Performance metrics
  const performanceMetrics: PerformanceMetric[] = [
    { 
      name: 'Total Tasks', 
      value: 1670, 
      change: 12.5, 
      icon: <CheckCircle className="h-5 w-5" />, 
      color: 'bg-blue-50 text-blue-600' 
    },
    { 
      name: 'Active Technicians', 
      value: 24, 
      change: 4.2, 
      icon: <Users className="h-5 w-5" />, 
      color: 'bg-green-50 text-green-600' 
    },
    { 
      name: 'Avg. Efficiency', 
      value: 92, 
      change: 3.1, 
      icon: <TrendingUp className="h-5 w-5" />, 
      color: 'bg-purple-50 text-purple-600' 
    },
    { 
      name: 'Response Time', 
      value: 2.4, 
      change: -8.3, 
      icon: <Clock className="h-5 w-5" />, 
      color: 'bg-orange-50 text-orange-600' 
    },
  ];

  // Filter technicians by region
  const filteredTechnicians = selectedRegion === 'all' 
    ? technicians 
    : technicians.filter(tech => tech.region === selectedRegion);

  // Load completed tasks from localStorage
  useEffect(() => {
    const completedTasks = JSON.parse(localStorage.getItem('completedTasks') || '[]');
    
    // Calculate performance metrics based on completed tasks
    if (completedTasks.length > 0) {
      // Group tasks by technician
      const technicianPerformance = completedTasks.reduce((acc: any, task: any) => {
        if (!acc[task.technicianId]) {
          acc[task.technicianId] = {
            completedTasks: 0,
            regions: {},
            efficiency: 0
          };
        }
        
        acc[task.technicianId].completedTasks++;
        
        // Track regions
        if (!acc[task.technicianId].regions[task.region]) {
          acc[task.technicianId].regions[task.region] = 0;
        }
        acc[task.technicianId].regions[task.region]++;
        
        return acc;
      }, {});
      
      // Update technician data with real performance
      const updatedTechnicians = initialTechnicians.map(tech => {
        const performance = technicianPerformance[tech.id];
        if (performance) {
          return {
            ...tech,
            completedTasks: performance.completedTasks,
            // Calculate other metrics as needed
          };
        }
        return tech;
      });
      
      // Update state with real data
      setTechnicians(updatedTechnicians);
    }
  }, []);

  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Technician Performance Report</h2>
          <p className="text-muted-foreground">
            Analyze technician performance metrics and trends
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <DateRangePickerWithRange date={dateRange} setDate={setDateRange} />
          <Button className="inline-flex items-center justify-center rounded-xl px-6 py-3 font-medium text-white bg-gradient-to-r from-[#ff4e00] to-[#ff8700] hover:from-[#e64600] hover:to-[#e67700] transition-all duration-200 shadow-lg hover:shadow-xl">
            <Download className="mr-2 h-4 w-4" /> Export Report
          </Button>
        </div>
      </div>

      {/* Performance Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {performanceMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-lg ${metric.color}`}>
                  {metric.icon}
                </div>
                <Badge variant={metric.change >= 0 ? "success" : "destructive"} className="ml-auto">
                  {metric.change >= 0 ? '+' : ''}{metric.change}%
                </Badge>
              </div>
              <div className="mt-3">
                <h3 className="text-sm font-medium text-gray-500">{metric.name}</h3>
                <p className="text-2xl font-bold mt-1">
                  {metric.name === 'Response Time' ? `${metric.value} hrs` : metric.name === 'Avg. Efficiency' ? `${metric.value}%` : metric.value}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="technicians">Technicians</TabsTrigger>
          <TabsTrigger value="regions">Regions</TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Monthly Performance Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Performance</CardTitle>
                <CardDescription>Task completion and efficiency over time</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={monthlyPerformance}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" domain={[80, 100]} />
                    <Tooltip />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="tasks" stroke="#ff4e00" activeDot={{ r: 8 }} />
                    <Line yAxisId="right" type="monotone" dataKey="efficiency" stroke="#0088FE" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Task Distribution Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Task Distribution</CardTitle>
                <CardDescription>Types of tasks performed by technicians</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={taskDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {taskDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Top Performers */}
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Technicians</CardTitle>
              <CardDescription>Technicians with highest efficiency ratings</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Region</TableHead>
                    <TableHead>Completed Tasks</TableHead>
                    <TableHead>Efficiency</TableHead>
                    <TableHead>Rating</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {technicians
                    .sort((a, b) => b.efficiency - a.efficiency)
                    .slice(0, 3)
                    .map((tech) => (
                      <TableRow key={tech.id}>
                        <TableCell className="font-medium">{tech.name}</TableCell>
                        <TableCell>{tech.region}</TableCell>
                        <TableCell>{tech.completedTasks}</TableCell>
                        <TableCell>{tech.efficiency}%</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <span className="text-yellow-500 mr-1">★</span>
                            {tech.averageRating.toFixed(1)}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Technicians Tab */}
        <TabsContent value="technicians" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center">
              <div>
                <CardTitle>Technician Performance</CardTitle>
                <CardDescription>Detailed performance metrics for all technicians</CardDescription>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Regions</SelectItem>
                    <SelectItem value="North">North</SelectItem>
                    <SelectItem value="South">South</SelectItem>
                    <SelectItem value="East">East</SelectItem>
                    <SelectItem value="West">West</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Region</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Completed</TableHead>
                    <TableHead>Pending</TableHead>
                    <TableHead>Efficiency</TableHead>
                    <TableHead>Rating</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTechnicians.map((tech) => (
                    <TableRow key={tech.id}>
                      <TableCell className="font-medium">{tech.name}</TableCell>
                      <TableCell>{tech.region}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            tech.status === 'Active' ? 'success' : 
                            tech.status === 'On Leave' ? 'destructive' : 
                            'secondary'
                          }
                        >
                          {tech.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{tech.completedTasks}</TableCell>
                      <TableCell>{tech.pendingTasks}</TableCell>
                      <TableCell>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="bg-[#ff4e00] h-2.5 rounded-full" 
                            style={{ width: `${tech.efficiency}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-500 mt-1">{tech.efficiency}%</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <span className="text-yellow-500 mr-1">★</span>
                          {tech.averageRating.toFixed(1)}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Regions Tab */}
        <TabsContent value="regions" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Regional Performance</CardTitle>
              <CardDescription>Performance metrics by region</CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { name: 'North', tasks: 420, efficiency: 92 },
                    { name: 'South', tasks: 380, efficiency: 88 },
                    { name: 'East', tasks: 450, efficiency: 94 },
                    { name: 'West', tasks: 420, efficiency: 90 },
                  ]}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" orientation="left" />
                  <YAxis yAxisId="right" orientation="right" domain={[80, 100]} />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="tasks" name="Total Tasks" fill="#ff4e00" />
                  <Bar yAxisId="right" dataKey="efficiency" name="Efficiency %" fill="#0088FE" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

