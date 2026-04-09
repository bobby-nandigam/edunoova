import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const PISTON_URL = "https://emkc.org/api/v2/piston/execute";

const LANG_MAP: Record<string, { language: string; version: string }> = {
  python: { language: "python", version: "3.10.0" },
  typescript: { language: "typescript", version: "5.0.3" },
  java: { language: "java", version: "15.0.2" },
  c: { language: "c", version: "10.2.0" },
  cpp: { language: "c++", version: "10.2.0" },
  go: { language: "go", version: "1.16.2" },
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { code, language = "python", testCases = [], problemTitle = "" } = await req.json();

    if (!code || typeof code !== "string") {
      return jsonResp({ error: "Code is required" }, 400);
    }

    const langConfig = LANG_MAP[language];
    if (!langConfig) {
      return jsonResp({ error: `Unsupported language: ${language}` }, 400);
    }

    // Real execution via Piston API
    const startTime = Date.now();
    const pistonResp = await fetch(PISTON_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        language: langConfig.language,
        version: langConfig.version,
        files: [{ content: code }],
        run_timeout: 10000,
        compile_timeout: 10000,
      }),
    });

    const pistonData = await pistonResp.json();
    const executionTime = `${Date.now() - startTime}ms`;

    const output = pistonData.run?.output?.trim() || "";
    const compileErr = pistonData.compile?.stderr?.trim() || "";
    const runtimeErr = pistonData.run?.stderr?.trim() || "";
    const hasError = !!(compileErr || runtimeErr);

    if (hasError) {
      return jsonResp({
        output: compileErr || runtimeErr,
        testResults: [],
        timeComplexity: "N/A",
        timeExplanation: "",
        spaceComplexity: "N/A",
        spaceExplanation: "",
        executionTime,
        errors: compileErr || runtimeErr,
      });
    }

    // Use AI for test validation and complexity
    const aiResult = await analyzeWithAI(code, output, testCases, problemTitle, language);

    return jsonResp({
      output,
      ...aiResult,
      executionTime,
      errors: null,
    });
  } catch (err: any) {
    return jsonResp({
      output: `Error: ${err.message}`,
      testResults: [],
      timeComplexity: "N/A",
      timeExplanation: "",
      spaceComplexity: "N/A",
      spaceExplanation: "",
      executionTime: "N/A",
      errors: err.message,
    }, 500);
  }
});

function jsonResp(body: any, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

async function analyzeWithAI(code: string, output: string, testCases: any[], problemTitle: string, language: string) {
  const apiKey = Deno.env.get("LOVABLE_API_KEY");
  if (!apiKey) return fallbackResult(testCases);

  const testStr = testCases
    .map((tc: any, i: number) => `Test ${i + 1}: Input: ${tc.input}, Expected: ${tc.expected}`)
    .join("\n");

  const prompt = `You are a strict code judge. Analyze this ${language} solution for "${problemTitle}".

CODE:
\`\`\`${language}
${code}
\`\`\`

ACTUAL STDOUT:
${output || "(empty)"}

TEST CASES:
${testStr}

Based on the code logic, determine if each test case passes. For each test, figure out what the function returns for that input.

Respond with ONLY valid JSON, no markdown:
{
  "testResults": [
    {"id": 1, "input": "...", "expected": "...", "actual": "what function returns", "passed": true, "executionTime": "< 1ms"}
  ],
  "timeComplexity": "O(...)",
  "timeExplanation": "one line",
  "spaceComplexity": "O(...)",
  "spaceExplanation": "one line"
}`;

  try {
    const resp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.1,
      }),
    });

    const data = await resp.json();
    const content = data.choices?.[0]?.message?.content || "";
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return fallbackResult(testCases);
    return JSON.parse(jsonMatch[0]);
  } catch {
    return fallbackResult(testCases);
  }
}

function fallbackResult(testCases: any[]) {
  return {
    testResults: testCases.map((tc: any, i: number) => ({
      id: i + 1, input: tc.input, expected: tc.expected,
      actual: "Unable to verify", passed: false, executionTime: "N/A",
    })),
    timeComplexity: "N/A", timeExplanation: "",
    spaceComplexity: "N/A", spaceExplanation: "",
  };
}
