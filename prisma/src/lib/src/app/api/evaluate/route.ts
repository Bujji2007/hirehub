import { NextResponse } from "next/server";
import { parseResumeAgent, matchCandidateAgent } from "@/lib/agents";

export async function POST(req: Request) {
  try {
    const { resumeText, jobDescription } = await req.json();

    const candidateData = await parseResumeAgent(resumeText);
    const evaluation = await matchCandidateAgent(candidateData.skills, jobDescription);

    return NextResponse.json({
      success: true,
      candidate: candidateData,
      evaluation,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
