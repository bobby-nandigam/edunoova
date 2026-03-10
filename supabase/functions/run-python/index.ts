import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { code, testCases, problemTitle } = await req.json();

    if (!code || typeof code !== "string") {
      return new Response(
        JSON.stringify({ error: "Code is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "AI service not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const testCaseStr = testCases && testCases.length > 0
      ? testCases.map((tc: any, i: number) => `Test ${i + 1}: Input: ${tc.input} | Expected: ${tc.expected}`).join("\n")
      : "No specific test cases provided. Generate 3-5 representative test cases including edge cases.";

    const prompt = `You are a Python code executor and analyzer. Analyze this Python code and respond with ONLY a JSON object (no markdown, no code blocks).

Problem: ${problemTitle || "General Python Program"}

Code:
\`\`\`python
${code}
\`\`\`

Test Cases:
${testCaseStr}

Respond with EXACTLY this JSON format (no extra text):
{
  "output": "the actual stdout output when running the code (simulate execution accurately)",
  "testResults": [
    {
      "id": 1,
      "input": "description of input",
      "expected": "expected output",
      "actual": "actual output from the code",
      "passed": true,
      "executionTime": "12ms"
    }
  ],
  "timeComplexity": "O(n)",
  "timeExplanation": "brief explanation of why",
  "spaceComplexity": "O(1)",
  "spaceExplanation": "brief explanation of why",
  "executionTime": "45ms",
  "errors": null
}

Rules:
- Simulate Python execution ACCURATELY. Trace through the code step by step.
- If there's a syntax/runtime error, set "errors" to the error message and "output" to the traceback.
- For test results, actually trace the code with each input to get the real output.
- Be precise with complexity analysis.
- executionTime should be a realistic estimate.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: "You are a precise Python code executor. Always respond with valid JSON only. No markdown formatting." },
          { role: "user", content: prompt },
        ],
        temperature: 0.1,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("AI Gateway error:", errText);
      return new Response(
        JSON.stringify({ error: "Failed to analyze code" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const aiResponse = await response.json();
    const content = aiResponse.choices?.[0]?.message?.content || "";

    // Extract JSON from response (handle potential markdown wrapping)
    let parsed;
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsed = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("No JSON found");
      }
    } catch {
      console.error("Failed to parse AI response:", content);
      parsed = {
        output: content,
        testResults: [],
        timeComplexity: "Unknown",
        timeExplanation: "Could not analyze",
        spaceComplexity: "Unknown",
        spaceExplanation: "Could not analyze",
        executionTime: "N/A",
        errors: null,
      };
    }

    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Edge function error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
