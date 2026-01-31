import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search, Eye, Plus } from "lucide-react";
import api from "../../services/api";

export default function CaseList() {
  const [cases, setCases] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {
    let isMounted = true;

    const fetchCases = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await api.get("/cases/all");
        const data = Array.isArray(res.data) ? res.data : [];

        if (isMounted) {
          setCases(data);
        }
      } catch (err) {
        console.error("Error fetching cases:", err);
        if (isMounted) {
          setError("Failed to load case records");
          setCases([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchCases();

    return () => {
      isMounted = false;
    };
  }, []);


  const filteredCases = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();

    if (!term) return cases;

    return cases.filter((c) =>
      (c.crimeNumber || "").toLowerCase().includes(term) ||
      (c.policeStation || "").toLowerCase().includes(term)
    );
  }, [cases, searchTerm]);


  return (
    <div className="space-y-6">

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
          Case Records
        </h1>

        <Link
          to="/dashboard/add-case"
          className="bg-slate-900 text-white px-4 py-2.5 rounded-lg hover:bg-slate-800 transition flex items-center gap-2 font-medium"
        >
          <Plus size={18} />
          New Entry
        </Link>
      </div>


      <div className="relative">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          size={20}
        />
        <input
          type="text"
          placeholder="Search by FIR Number or Station..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none text-black"
        />
      </div>


      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase text-xs font-semibold">
              <tr>
                <th className="px-6 py-4">FIR / Crime #</th>
                <th className="px-6 py-4">Station</th>
                <th className="px-6 py-4 hidden md:table-cell">IO Name</th>
                <th className="px-6 py-4 hidden lg:table-cell">Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">

              {loading && (
                <tr>
                  <td colSpan="6" className="text-center p-8 text-slate-500">
                    <div className="flex justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-slate-300 border-t-slate-700 rounded-full animate-spin" />
                      Loading cases...
                    </div>
                  </td>
                </tr>
              )}


              {!loading && error && (
                <tr>
                  <td colSpan="6" className="text-center p-8 text-red-600">
                    {error}
                  </td>
                </tr>
              )}


              {!loading && !error && filteredCases.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center p-8 text-slate-500">
                    {cases.length ? "No matches found" : "No cases in database"}
                  </td>
                </tr>
              )}


              {!loading &&
                !error &&
                filteredCases.map((c) => (
                  <tr key={c._id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium text-slate-800">
                      {c.crimeNumber || "N/A"}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {c.policeStation || "N/A"}
                    </td>
                    <td className="px-6 py-4 text-slate-600 hidden md:table-cell">
                      {c.investigatingOfficer || "N/A"}
                    </td>
                    <td className="px-6 py-4 text-slate-500 hidden lg:table-cell">
                      {c.createdAt
                        ? new Date(c.createdAt).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${c.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                          }`}
                      >
                        {c.status || "Unknown"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        to={`/dashboard/cases/${c._id}`}
                        className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm"
                      >
                        <Eye size={16} />
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
