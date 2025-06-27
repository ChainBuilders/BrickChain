import { TrendingUp } from "lucide-react";

function Activities() {
  const recentActivity = [
    {
      id: 1,
      type: "New Investment",
      property: "Lagos Luxury Duplex",
      investor: "Adebayo O.",
      amount: "₦50,000",
      date: "2024-01-25",
      commission: "₦2,500",
    },
    {
      id: 2,
      type: "Property Funded",
      property: "Abuja Modern Apartments",
      amount: "₦95,000,000",
      date: "2024-01-24",
      commission: "₦475,000",
    },
    {
      id: 3,
      type: "New Investment",
      property: "Lekki Waterfront Villa",
      investor: "Kemi A.",
      amount: "₦100,000",
      date: "2024-01-23",
      commission: "₦5,000",
    },
  ];

  return (
    <div className="border-0 bg-white p-6 rounded-md shadow-lg animate-in slide-in-from-right duration-700 delay-200">
      <div>
        <div className="text-2xl  font-semibold">Recent Activity</div>
      </div>
      <div className="mt-5">
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div
              key={activity.id}
              className="flex items-start space-x-3 animate-in fade-in duration-500"
              style={{ animationDelay: `${index * 100 + 800}ms` }}
            >
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-[17px]  font-medium text-slate-900">
                  {activity.type}
                </p>
                <p className="text-sm text-slate-500">{activity.property}</p>
                {activity.investor && (
                  <p className="text-sm text-slate-500">
                    by {activity.investor}
                  </p>
                )}
                <div className="flex items-center justify-between mt-1">
                  <span className="text-sm font-semibold text-slate-900">
                    {activity.amount}
                  </span>
                  <span className="text-sm text-slate-500">
                    {activity.date}
                  </span>
                </div>
                {activity.commission && (
                  <p className="text-sm text-emerald-600 font-medium">
                    +{activity.commission} commission
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Activities;
