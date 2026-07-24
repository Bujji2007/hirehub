import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";

export async function parseResumeAgent(resumeText: string) {
  const { object } = await generateObject({
    model: openai("gpt-4o"),
    schema: z.object({
      name: z.string(),
      email: z.string(),
      skills: z.array(z.string()),
      experienceYrs: z.number(),
    }),
    prompt: `Extract candidate details from this resume text:\n${resumeText}`,
  });
  return object;
}

export async function matchCandidateAgent(candidateSkills: string[], jobDescription: string) {
  const { object } = await generateObject({
    model: openai("gpt-4o"),
    schema: z.object({
      atsScore: z.number().min(0).max(100),
      summary: z.string(),
      recommendation: z.enum(["HIRE", "MAYBE", "REJECT"]),
    }),
    prompt: `Evaluate these candidate skills: ${candidateSkills.join(", ")} against Job Description: ${jobDescription}`,
  });
  return object;
}
