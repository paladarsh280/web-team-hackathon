import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { Plus, Trash, Save, ArrowRight, ArrowLeft } from "lucide-react";

export default function AddCase() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);


  const [caseInfo, setCaseInfo] = useState({
    policeStation: "",
    crimeNumber: "",
    sectionOfLaw: "",
    investigatingOfficer: "",
    dateOfOccurrence: "",
  });

  const [properties, setProperties] = useState([]);


  const [currentProp, setCurrentProp] = useState({
    category: "Electronics",
    description: "",
    location: "",
    belongingTo: "Unknown",
  });


  const handleCaseChange = (e) => {
    setCaseInfo({ ...caseInfo, [e.target.name]: e.target.value });
  };

  const handlePropChange = (e) => {
    setCurrentProp({ ...currentProp, [e.target.name]: e.target.value });
  };

  const addPropertyToList = () => {
    if (!currentProp.description || !currentProp.location) {
      alert("Please fill description and location");
      return;
    }
    setProperties([...properties, currentProp]);

    setCurrentProp({
      category: "Electronics",
      description: "",
      location: "",
      belongingTo: "Unknown",
    });
  };

  const removeProperty = (index) => {
    const newProps = properties.filter((_, i) => i !== index);
    setProperties(newProps);
  };

  const handleSubmit = async () => {
    if (properties.length === 0) {
      alert("Please add at least one property");
      return;
    }

    setLoading(true);
    try {

      const formData = new FormData();
      formData.append("caseData", JSON.stringify(caseInfo));
      formData.append("propertiesData", JSON.stringify(properties));

      await api.post("/cases/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Case Created Successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Failed to create case");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">New Case Entry</h1>
        <div className="flex items-center gap-2 mt-2">
          <div className={`h-2 w-1/3 rounded ${step >= 1 ? 'bg-blue-600' : 'bg-slate-200'}`}></div>
          <div className={`h-2 w-1/3 rounded ${step >= 2 ? 'bg-blue-600' : 'bg-slate-200'}`}></div>
          <div className={`h-2 w-1/3 rounded ${step >= 3 ? 'bg-blue-600' : 'bg-slate-200'}`}></div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">


        {step === 1 && (
          <div className="space-y-4 animate-in fade-in">
            <h2 className="text-xl font-semibold mb-4">Step 1: Case Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <input name="policeStation" placeholder="Police Station Name" className="input-field" onChange={handleCaseChange} value={caseInfo.policeStation} />
              <input name="crimeNumber" placeholder="Crime / FIR Number" className="input-field" onChange={handleCaseChange} value={caseInfo.crimeNumber} />
              <input name="sectionOfLaw" placeholder="Section of Law (e.g. 379 IPC)" className="input-field" onChange={handleCaseChange} value={caseInfo.sectionOfLaw} />
              <input name="investigatingOfficer" placeholder="IO Name" className="input-field" onChange={handleCaseChange} value={caseInfo.investigatingOfficer} />
              <input type="date" name="dateOfOccurrence" className="input-field" onChange={handleCaseChange} value={caseInfo.dateOfOccurrence} />
            </div>
            <div className="flex justify-end mt-6">
              <button onClick={() => setStep(2)} className="btn-primary flex items-center gap-2">
                Next <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}


        {step === 2 && (
          <div className="space-y-6 animate-in fade-in">
            <h2 className="text-xl font-semibold">Step 2: Add Seized Properties</h2>


            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 grid grid-cols-2 gap-4">
              <select name="category" className="input-field" value={currentProp.category} onChange={handlePropChange}>
                <option>Electronics</option>
                <option>Jewelry</option>
                <option>Vehicle</option>
                <option>Documents</option>
                <option>Weapons</option>
                <option>Other</option>
              </select>
              <select name="belongingTo" className="input-field" value={currentProp.belongingTo} onChange={handlePropChange}>
                <option>Unknown</option>
                <option>Accused</option>
                <option>Complainant</option>
              </select>
              <input name="location" placeholder="Storage Location (e.g. Locker A)" className="input-field col-span-2" value={currentProp.location} onChange={handlePropChange} />
              <textarea name="description" placeholder="Item Description" className="input-field col-span-2 h-20" value={currentProp.description} onChange={handlePropChange}></textarea>

              <button onClick={addPropertyToList} className="col-span-2 bg-slate-800 text-white py-2 rounded-lg hover:bg-slate-900 flex items-center justify-center gap-2">
                <Plus size={18} /> Add Property
              </button>
            </div>


            {properties.length > 0 && (
              <div className="space-y-2 mt-4">
                <h3 className="font-medium text-slate-700">Added Items ({properties.length})</h3>
                {properties.map((p, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-blue-50 p-3 rounded border border-blue-100">
                    <div>
                      <span className="font-bold text-sm text-blue-800">{p.category}</span>
                      <p className="text-xs text-slate-600">{p.description} | {p.location}</p>
                    </div>
                    <button onClick={() => removeProperty(idx)} className="text-red-500 hover:text-red-700">
                      <Trash size={18} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-between mt-6">
              <button onClick={() => setStep(1)} className="btn-secondary">Back</button>
              <button onClick={() => setStep(3)} className="btn-primary">Review & Submit</button>
            </div>
          </div>
        )}


        {step === 3 && (
          <div className="animate-in fade-in text-black">
            <h2 className="text-xl font-semibold mb-4">Step 3: Confirm Details</h2>

            <div className="bg-slate-50 p-4 rounded mb-6">
              <h3 className="font-bold text-slate-700 mb-2">Case Summary</h3>
              <p><strong>Station:</strong> {caseInfo.policeStation}</p>
              <p><strong>FIR #:</strong> {caseInfo.crimeNumber}</p>
              <p><strong>Total Items:</strong> {properties.length}</p>
            </div>

            <div className="flex justify-between mt-6">
              <button onClick={() => setStep(2)} className="btn-secondary">Back</button>
              <button onClick={handleSubmit} disabled={loading} className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2">
                {loading ? "Saving..." : <><Save size={18} /> Submit Case</>}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}