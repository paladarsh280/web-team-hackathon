import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import QRCode from "react-qr-code";
import { Printer } from "lucide-react";
import { useNavigate } from "react-router-dom";
export default function CaseDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [caseData, setCaseData] = useState(null);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = async () => {
    try {
      const res = await api.get(`/cases/${id}`);
      setCaseData(res.data.caseInfo);
      setProperties(res.data.properties);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) return <div>Loading Details...</div>;
  if (!caseData) return <div>Case not found</div>;

  return (
    <div className="max-w-5xl mx-auto space-y-6">


      <div className="flex justify-between items-start print:hidden">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">FIR #{caseData.crimeNumber}</h1>
          <p className="text-slate-500">{caseData.policeStation} | {caseData.investigatingOfficer}</p>
        </div>
        <button onClick={handlePrint} className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded hover:bg-slate-800">
          <Printer size={18} /> Print QR Codes
        </button>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {properties.map((prop) => (
          <div key={prop._id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex gap-4">


            <div className="flex flex-col items-center justify-center p-2 bg-white border rounded">
              <QRCode
                value={prop.qrCodeString || "N/A"}
                size={100}
                level="M"
              />
              <span className="text-[10px] font-mono mt-1 text-slate-500">{prop.qrCodeString}</span>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => navigate("/dashboard/custody", {
                    state: { propertyId: prop._id, propertyName: prop.category }
                  })}
                  className="text-sm bg-slate-100 text-slate-700 px-3 py-1 rounded hover:bg-slate-200"
                >
                  Manage Custody
                </button>
              </div>
            </div>


            <div className="flex-1">
              <div className="flex justify-between">
                <h3 className="font-bold text-lg text-slate-800">{prop.category}</h3>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full h-fit">
                  {prop.status}
                </span>
              </div>
              <p className="text-sm text-slate-600 mt-1 line-clamp-2">{prop.description}</p>

              <div className="mt-4 text-xs text-slate-500 space-y-1">
                <p>📍 Location: <strong className="text-slate-700">{prop.currentLocation}</strong></p>
                <p>👤 Belonging To: {prop.belongingTo}</p>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}