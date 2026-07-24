"use client";

import { useState } from "react";

export default function SaaSPage() {
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleEvaluate = async () => {
    setLoading(true);
    const res = await fetch("/api/evaluate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ resumeText, jobDescription }),
    });
    const data = await res.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex justify-between items-center border-b border-white/10 pb-6">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              Agentic AI Recruiter
            </h1>
            <p className="text-slate-400 text-sm mt-1">Autonomous Sourcing & Evaluation Platform</p>
          </div>
          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            System Online
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
            <h2 className="text-lg font-semibold">Input Candidate Details</h2>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Job Description</label>
              <textarea
                className="w-full bg-slate-900 border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-blue-500 text-white"
                rows={4}
                placeholder="Paste Job Description..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Resume Content</label>
              <textarea
                className="w-full bg-slate-900 border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-blue-500 text-white"
                rows={6}
                placeholder="Paste Candidate Resume..."
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
              />
            </div>
            <button
              onClick={handleEvaluate}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-500 font-semibold py-3 rounded-xl transition flex items-center justify-center gap-2 text-sm disabled:opacity-50 text-white cursor-pointer"
            >
              {loading ? "Agent Workflow Executing..." : "Run AI Recruiter Agents"}
            </button>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
            <h2 className="text-lg font-semibold">Agent Evaluation Output</h2>
            {result?.success ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center bg-slate-900 p-4 rounded-xl">
                  <div>
                    <h3 className="font-bold text-base">{result.candidate.name}</h3>
                    <p className="text-xs text-slate-400">{result.candidate.email}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-emerald-400">{result.evaluation.atsScore}%</span>
                    <p className="text-xs text-slate-400">ATS Match</p>
                  </div>
                </div>
                <div className="bg-slate-900 p-4 rounded-xl space-y-1">
                  <p className="text-xs text-slate-400 font-semibold">AI Summary:</p>
                  <p className="text-sm text-slate-300">{result.evaluation.summary}</p>
                </div>
              </div>
            ) : (
              <div className="h-64 border border-dashed border-white/10 rounded-xl flex items-center justify-center text-slate-500 text-sm">
                Fill details and click "Run AI Recruiter Agents"
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
