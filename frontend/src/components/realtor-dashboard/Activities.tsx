import { DollarSign, FileText, Target, Users } from "lucide-react";

function Activities() {
    const recentActivity = [
    {
      id: 1,
      type: "investment",
      message: "New investment of ₦50,000 in Lagos Luxury Duplex",
      time: "2 hours ago",
      icon: DollarSign,
      color: "text-emerald-600",
    },
    {
      id: 2,
      type: "completion",
      message: "Abuja Executive Apartments reached 92% funding",
      time: "5 hours ago",
      icon: Target,
      color: "text-blue-600",
    },
    {
      id: 3,
      type: "investor",
      message: "15 new investors joined your properties today",
      time: "1 day ago",
      icon: Users,
      color: "text-purple-600",
    },
    {
      id: 4,
      type: "document",
      message: "Property documents updated for Lekki Modern Terrace",
      time: "2 days ago",
      icon: FileText,
      color: "text-orange-600",
    },
  ]

  return (
    

    <div className=" bg-white p-6 rounded-md shadow-lg animate-in slide-in-from-right duration-700 delay-200">
      <div>
        <h1 className="text-2xl  font-semibold">Recent Activity</h1>
      </div>
      <div className="mt-5">
        <div className="space-y-5">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">
                <activity.icon className={`w-4 h-4 ${activity.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-slate-900">{activity.message}</p>
                <p className="text-xs text-slate-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Activities;
