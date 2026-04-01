"use client";
import { useState } from "react";

export default function NewsletterCurationPage() {
  const [niche, setNiche] = useState("");
  const [subscriberCount, setSubscriberCount] = useState("1,000 - 10,000");
  const [goal, setGoal] = useState("Inform and engage");
  const [curationCriteria, setCurationCriteria] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!niche.trim()) return;
    setLoading(true);
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ niche, subscriberCount, goal, curationCriteria }),
    });
    const data = await res.json();
    setOutput(data.result || data.error);
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-fuchsia-950 via-slate-950 to-black text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-fuchsia-300 mb-2">AI Newsletter Curation</h1>
        <p className="text-slate-400 mb-8">Curate compelling content recommendations for your newsletter</p>
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-slate-900/60 border border-fuchsia-500/20 rounded-2xl p-6 space-y-4">
            <div>
              <label className="block text-sm text-slate-300 mb-1">Newsletter Niche *</label>
              <input value={niche} onChange={e => setNiche(e.target.value)} placeholder="e.g., Technology startups, Design trends"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-fuchsia-500" />
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-1">Subscriber Count</label>
              <select value={subscriberCount} onChange={e => setSubscriberCount(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-fuchsia-500">
                {["Under 1,000","1,000 - 10,000","10,000 - 50,000","50,000+"].map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-1">Newsletter Goal</label>
              <select value={goal} onChange={e => setGoal(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-fuchsia-500">
                {["Inform and engage","Grow readership","Drive traffic","Monetize"].map(g => <option key={g}>{g}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-1">Curation Criteria</label>
              <input value={curationCriteria} onChange={e => setCurationCriteria(e.target.value)} placeholder="e.g., Quality, variety, timeliness"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-fuchsia-500" />
            </div>
            <button onClick={handleGenerate} disabled={loading}
              className="w-full bg-fuchsia-600 hover:bg-fuchsia-500 disabled:bg-fuchsia-800 text-white font-semibold py-3 rounded-xl transition-colors">
              {loading ? "Curating..." : "Generate Curation Plan"}
            </button>
          </div>
          <div className="bg-slate-900/60 border border-fuchsia-500/20 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-fuchsia-300 mb-4">Curation Plan</h2>
            {output ? (
              <pre className="text-slate-200 text-sm whitespace-pre-wrap font-sans leading-relaxed max-h-[600px] overflow-y-auto">{output}</pre>
            ) : (
              <div className="text-slate-500 flex items-center justify-center h-64">Curation plan will appear here...</div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
