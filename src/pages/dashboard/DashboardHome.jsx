
import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { Briefcase, CheckCircle, Clock, AlertTriangle } from "lucide-react";


export default function DashboardHome() {
  const [stats, setStats] = useState({
    totalCases: 0,
    disposedCases: 0,
    pendingCases: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await api.get("/dashboard/stats");
      setStats(res.data);
    } catch (err) {
      console.error("Failed to load stats", err);
    } finally {
      setLoading(false);
    }
  };

  const alerts = [
    { id: 1, msg: "Case #402/22 property pending for > 6 months" },
    { id: 2, msg: "Forensic report overdue for Case #110/23" },
  ];

  return (
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">


      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Station Overview</h1>
        <p className="text-slate-500 mt-1">Welcome back, Officer.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-6">
          <StatCard
            title="Total Registered"
            count={stats.totalCases}
            icon={Briefcase}
            color="bg-blue-500"
            loading={loading}
          />
          <StatCard
            title="Disposed / Closed"
            count={stats.disposedCases}
            icon={CheckCircle}
            color="bg-green-500"
            loading={loading}
          />
          <StatCard
            title="Pending Custody"
            count={stats.pendingCases}
            icon={Clock}
            color="bg-orange-500"
            loading={loading}
          />
        </div>

        <div className="mt-8">
          <h3 className="text-base text-black sm:text-lg font-semibold mb-4 flex items-center gap-2">
            <AlertTriangle className=" text-black text-2xl " size={20} />
            Action Required (Optional Feature)
          </h3>
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 divide-y">
            {alerts.map(alert => (
              <div key={alert.id} className="p-3 sm:p-4 hover:bg-slate-50 text-slate-700 text-sm sm:text-base">
                {alert.msg}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, count, icon: Icon, color, loading }) {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-slate-200 flex items-center justify-between">
      <div className="flex-1 min-w-0">
        <p className="text-slate-500 text-xs sm:text-sm font-medium uppercase truncate">{title}</p>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mt-1 sm:mt-2">
          {loading ? "..." : count}
        </h2>
      </div>
      <div className={`p-3 sm:p-4 rounded-full ${color} text-white shadow-lg flex-shrink-0`}>
        <Icon size={20} className="sm:w-6 sm:h-6" />
      </div>
    </div>
  );
}