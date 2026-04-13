import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { personalInfo, education, experience, skills, projects, targetRole } = await req.json();

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const prompt = `You are a professional resume writer. Generate a polished, ATS-friendly resume in structured JSON format.

Input data:
- Name: ${personalInfo?.name || "N/A"}
- Email: ${personalInfo?.email || "N/A"}
- Phone: ${personalInfo?.phone || "N/A"}
- Location: ${personalInfo?.location || "N/A"}
- LinkedIn: ${personalInfo?.linkedin || "N/A"}
- GitHub: ${personalInfo?.github || "N/A"}
- Portfolio: ${personalInfo?.portfolio || "N/A"}

- Target Role: ${targetRole || "Software Engineer"}

- Education: ${JSON.stringify(education || [])}
- Experience: ${JSON.stringify(experience || [])}
- Skills: ${skills || "N/A"}
- Projects: ${JSON.stringify(projects || [])}

Generate a professional resume. For each experience and project, write strong, quantified bullet points using action verbs. Write a compelling professional summary. Organize skills into categories.

Return ONLY valid JSON with this exact structure:
{
  "summary": "2-3 sentence professional summary",
  "experience": [{ "company": "", "role": "", "duration": "", "bullets": ["..."] }],
  "education": [{ "institution": "", "degree": "", "year": "", "gpa": "" }],
  "skills": { "category_name": ["skill1", "skill2"] },
  "projects": [{ "name": "", "description": "", "tech": "", "bullets": ["..."] }]
}`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: "You are a professional resume writer. Return ONLY valid JSON, no markdown." },
          { role: "user", content: prompt },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited. Please try again in a moment." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI error:", response.status, t);
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";

    // Extract JSON from response
    let resumeData;
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      resumeData = JSON.parse(jsonMatch ? jsonMatch[0] : content);
    } catch {
      resumeData = { summary: content, experience: [], education: [], skills: {}, projects: [] };
    }

    return new Response(JSON.stringify({ resume: resumeData }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Resume generation error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
