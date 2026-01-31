import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import api from "../../services/api";
import { ArrowDown, MapPin, User, Clock } from "lucide-react";

export default function CustodyManager() {
  const { state } = useLocation();
  const propertyId = state?.propertyId;
  const propertyName = state?.propertyName || "Unknown Item";

  const [history, setHistory] = useState([]);
  const [form, setForm] = useState({
    toLocation: "",
    receiverName: "",
    remarks: "",
    actionType: "Transfer",
  });

  useEffect(() => {
    if (propertyId) fetchHistory();
  }, [propertyId]);

  const fetchHistory = async () => {
    const res = await api.get(`/custody/history/${propertyId}`);
    setHistory(res.data);
  };

  const handleTransfer = async (e) => {
    e.preventDefault();
    try {
      await api.post("/custody/move", { ...form, propertyId });
      alert("Property Moved Successfully!");
      setForm({ toLocation: "", receiverName: "", remarks: "", actionType: "Transfer" });
      fetchHistory();
    } catch (err) {
      alert("Failed to move property");
    }
  };

  if (!propertyId) return <div className="p-6">Please select a property from Case Details first.</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-black">


      <div>
        <h2 className="text-xl font-bold mb-4 text-black">Transfer Custody: {propertyName}</h2>
        <form onSubmit={handleTransfer} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-4">

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Move To</label>
            <select
              className="input-field"
              value={form.toLocation}
              onChange={(e) => setForm({ ...form, toLocation: e.target.value })}
              required
            >
              <option value="">Select Destination</option>
              <option value="Court Hearing">Court Hearing</option>
              <option value="Forensic Lab (FSL)">Forensic Lab (FSL)</option>
              <option value="Malkhana Locker">Return to Malkhana Locker</option>
              <option value="Investigating Officer">Handover to IO</option>
            </select>
          </div>

          <input
            placeholder="Receiver Name (e.g. Constable Rahul)"
            className="input-field"
            value={form.receiverName}
            onChange={(e) => setForm({ ...form, receiverName: e.target.value })}
          />

          <textarea
            placeholder="Purpose / Remarks"
            className="input-field h-24"
            value={form.remarks}
            onChange={(e) => setForm({ ...form, remarks: e.target.value })}
          ></textarea>

          <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-medium">
            Log Movement
          </button>
        </form>
      </div>


      <div>
        <h2 className="text-xl font-bold mb-4">Chain of Custody Log</h2>
        <div className="space-y-6 border-l-2 border-slate-200 ml-3 pl-6">

          {history.length === 0 && <p className="text-slate-400">No movement history yet.</p>}

          {history.map((log) => (
            <div key={log._id} className="relative">

              <span className="absolute -left-[31px] top-1 h-4 w-4 rounded-full bg-slate-300 ring-4 ring-white"></span>

              <div className="bg-white p-4 rounded-lg border border-slate-100 shadow-sm">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-slate-800">{log.actionType}</h4>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock size={12} /> {new Date(log.createdAt).toLocaleString()}
                  </span>
                </div>

                <p className="text-sm text-slate-600 mt-2 flex items-center gap-2">
                  <MapPin size={14} className="text-blue-500" />
                  {log.fromLocation} <ArrowDown size={12} className="rotate-[-90deg]" /> {log.toLocation}
                </p>

                <div className="mt-3 pt-3 border-t border-slate-50 flex justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <User size={12} /> By: {log.actionBy?.name}
                  </span>
                  {log.receiverName && <span>Rcvr: {log.receiverName}</span>}
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}