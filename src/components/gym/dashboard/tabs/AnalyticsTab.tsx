import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell
} from "recharts";

export function AnalyticsTab() {
  // Sample data for the charts
  const membershipData = [
    { name: "Jan", premium: 32, standard: 45 },
    { name: "Feb", premium: 38, standard: 48 },
    { name: "Mar", premium: 42, standard: 50 },
    { name: "Apr", premium: 40, standard: 53 },
    { name: "May", premium: 45, standard: 55 },
    { name: "Jun", premium: 50, standard: 58 },
    { name: "Jul", premium: 55, standard: 60 }
  ];
  
  const revenueData = [
    { name: "Jan", revenue: 15400 },
    { name: "Feb", revenue: 16800 },
    { name: "Mar", revenue: 18200 },
    { name: "Apr", revenue: 17600 },
    { name: "May", revenue: 19500 },
    { name: "Jun", revenue: 21000 },
    { name: "Jul", revenue: 22500 }
  ];
  
  const pieData = [
    { name: "Membership Fees", value: 60 },
    { name: "Personal Training", value: 25 },
    { name: "Group Classes", value: 10 },
    { name: "Other", value: 5 }
  ];
  
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-700 mt-1">Analizza le performance e i trend della tua palestra</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="col-span-1 bg-white shadow-md border border-gray-200">
          <CardHeader className="bg-gray-50 border-b border-gray-200">
            <CardTitle className="text-xl font-semibold text-gray-900">Crescita Membri</CardTitle>
          </CardHeader>
          <CardContent className="p-6 bg-white">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={membershipData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" tick={{ fill: '#374151', fontSize: 12 }} />
                  <YAxis tick={{ fill: '#374151', fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#ffffff', 
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      color: '#111827'
                    }} 
                  />
                  <Bar dataKey="premium" name="Membri Premium" stackId="a" fill="#3b82f6" />
                  <Bar dataKey="standard" name="Membri Standard" stackId="a" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1 bg-white shadow-md border border-gray-200">
          <CardHeader className="bg-gray-50 border-b border-gray-200">
            <CardTitle className="text-xl font-semibold text-gray-900">Fatturato Mensile</CardTitle>
          </CardHeader>
          <CardContent className="p-6 bg-white">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={revenueData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" tick={{ fill: '#374151', fontSize: 12 }} />
                  <YAxis tick={{ fill: '#374151', fontSize: 12 }} />
                  <Tooltip 
                    formatter={(value) => [`€${value}`, 'Fatturato']} 
                    contentStyle={{ 
                      backgroundColor: '#ffffff', 
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      color: '#111827'
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#3b82f6"
                    activeDot={{ r: 8, fill: '#3b82f6' }}
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1 bg-white shadow-md border border-gray-200">
          <CardHeader className="bg-gray-50 border-b border-gray-200">
            <CardTitle className="text-xl font-semibold text-gray-900">Suddivisione Fatturato</CardTitle>
          </CardHeader>
          <CardContent className="p-6 bg-white">
            <div className="flex items-center justify-center min-h-[300px] gap-6">
              {/* Legend on the left */}
              <div className="space-y-3">
                {pieData.map((entry, index) => (
                  <div key={`legend-${index}`} className="flex items-center">
                    <div 
                      className="w-4 h-4 mr-3 rounded" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <div className="text-sm">
                      <div className="font-medium text-gray-900">{entry.name}</div>
                      <div className="text-gray-600">{entry.value}%</div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Pie chart on the right */}
              <div className="h-64 w-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#ffffff', 
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        color: '#111827'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1 bg-white shadow-md border border-gray-200">
          <CardHeader className="bg-gray-50 border-b border-gray-200">
            <CardTitle className="text-xl font-semibold text-gray-900">Metriche Chiave</CardTitle>
          </CardHeader>
          <CardContent className="p-6 bg-white">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <p className="text-sm font-medium text-gray-600">Check-in Giornalieri Medi</p>
                  <h3 className="text-2xl font-bold mt-1 text-gray-900">78</h3>
                  <p className="text-xs text-green-600 flex items-center mt-1 font-medium">
                    <span className="mr-1">📈</span>
                    +12% dal mese scorso
                  </p>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <p className="text-sm font-medium text-gray-600">Conversione Nuovi Membri</p>
                  <h3 className="text-2xl font-bold mt-1 text-gray-900">32%</h3>
                  <p className="text-xs text-green-600 flex items-center mt-1 font-medium">
                    <span className="mr-1">📈</span>
                    +5% dal mese scorso
                  </p>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <p className="text-sm font-medium text-gray-600">Partecipazione ai Corsi</p>
                  <h3 className="text-2xl font-bold mt-1 text-gray-900">68%</h3>
                  <p className="text-xs text-amber-600 flex items-center mt-1 font-medium">
                    <span className="mr-1">📉</span>
                    -2% dal mese scorso
                  </p>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <p className="text-sm font-medium text-gray-600">Retention Membri</p>
                  <h3 className="text-2xl font-bold mt-1 text-gray-900">92%</h3>
                  <p className="text-xs text-green-600 flex items-center mt-1 font-medium">
                    <span className="mr-1">📈</span>
                    +3% dal mese scorso
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
