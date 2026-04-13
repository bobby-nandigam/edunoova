import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText, Plus, Trash2, Sparkles, Download, ArrowLeft, ArrowRight,
  User, GraduationCap, Briefcase, Code, FolderOpen, Eye, Loader2
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const steps = [
  { id: "personal", label: "Personal Info", icon: User },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "skills", label: "Skills & Projects", icon: Code },
  { id: "preview", label: "AI Resume", icon: Eye },
];

type Education = { institution: string; degree: string; year: string; gpa: string };
type Experience = { company: string; role: string; duration: string; description: string };
type Project = { name: string; description: string; tech: string };

const ResumeMaker = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [resumeData, setResumeData] = useState<any>(null);
  const resumeRef = useRef<HTMLDivElement>(null);

  const [personal, setPersonal] = useState({
    name: "", email: "", phone: "", location: "", linkedin: "", github: "", portfolio: "",
  });
  const [targetRole, setTargetRole] = useState("");
  const [education, setEducation] = useState<Education[]>([{ institution: "", degree: "", year: "", gpa: "" }]);
  const [experience, setExperience] = useState<Experience[]>([{ company: "", role: "", duration: "", description: "" }]);
  const [skills, setSkills] = useState("");
  const [projects, setProjects] = useState<Project[]>([{ name: "", description: "", tech: "" }]);

  const addItem = <T,>(arr: T[], setArr: React.Dispatch<React.SetStateAction<T[]>>, empty: T) =>
    setArr([...arr, empty]);
  const removeItem = <T,>(arr: T[], setArr: React.Dispatch<React.SetStateAction<T[]>>, i: number) =>
    arr.length > 1 && setArr(arr.filter((_, idx) => idx !== i));
  const updateItem = <T,>(arr: T[], setArr: React.Dispatch<React.SetStateAction<T[]>>, i: number, field: keyof T, val: string) =>
    setArr(arr.map((item, idx) => idx === i ? { ...item, [field]: val } : item));

  const generateResume = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-resume", {
        body: { personalInfo: personal, education, experience, skills, projects, targetRole },
      });
      if (error) throw error;
      setResumeData(data.resume);
      toast({ title: "Resume generated!", description: "Your AI-powered resume is ready." });
    } catch (e: any) {
      toast({ title: "Error", description: e.message || "Failed to generate resume", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (step === 3) {
      generateResume();
      setStep(4);
    } else {
      setStep(s => Math.min(s + 1, 4));
    }
  };

  const printResume = () => {
    if (!resumeRef.current) return;
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(`<!DOCTYPE html><html><head><title>${personal.name} Resume</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Georgia', serif; color: #1a1a1a; padding: 40px 50px; max-width: 800px; margin: auto; line-height: 1.5; }
        h1 { font-size: 26px; margin-bottom: 4px; }
        .contact { font-size: 12px; color: #555; margin-bottom: 16px; }
        .contact a { color: #2563eb; }
        h2 { font-size: 14px; text-transform: uppercase; letter-spacing: 1.5px; border-bottom: 1.5px solid #1a1a1a; padding-bottom: 3px; margin: 18px 0 10px; }
        .summary { font-size: 13px; color: #333; margin-bottom: 6px; }
        .entry { margin-bottom: 12px; }
        .entry-header { display: flex; justify-content: space-between; font-size: 13px; font-weight: bold; }
        .entry-sub { font-size: 12px; color: #555; font-style: italic; }
        ul { padding-left: 18px; font-size: 12.5px; }
        li { margin-bottom: 3px; }
        .skills-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; font-size: 12.5px; }
        .skills-grid strong { font-size: 12px; }
        @media print { body { padding: 20px 30px; } }
      </style></head><body>`);
    w.document.write(resumeRef.current.innerHTML);
    w.document.write("</body></html>");
    w.document.close();
    w.print();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-8 pt-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 rounded-xl bg-primary/10">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">AI Resume Maker</h1>
              <p className="text-sm text-muted-foreground">Build an ATS-optimized resume powered by AI</p>
            </div>
          </div>

          {/* Stepper */}
          <div className="flex items-center gap-1 mb-8 overflow-x-auto pb-2">
            {steps.map((s, i) => (
              <button key={s.id} onClick={() => i <= step ? setStep(i) : null}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  i === step ? "bg-primary text-primary-foreground shadow-md" :
                  i < step ? "bg-primary/10 text-primary cursor-pointer" :
                  "bg-muted text-muted-foreground"
                }`}>
                <s.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{s.label}</span>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.2 }}>

              {/* Step 0: Personal */}
              {step === 0 && (
                <Card>
                  <CardHeader><CardTitle className="flex items-center gap-2"><User className="w-5 h-5" /> Personal Information</CardTitle></CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div><label className="text-sm font-medium text-foreground">Full Name *</label><Input value={personal.name} onChange={e => setPersonal({ ...personal, name: e.target.value })} placeholder="John Doe" /></div>
                      <div><label className="text-sm font-medium text-foreground">Email *</label><Input type="email" value={personal.email} onChange={e => setPersonal({ ...personal, email: e.target.value })} placeholder="john@example.com" /></div>
                      <div><label className="text-sm font-medium text-foreground">Phone</label><Input value={personal.phone} onChange={e => setPersonal({ ...personal, phone: e.target.value })} placeholder="+1 234 567 890" /></div>
                      <div><label className="text-sm font-medium text-foreground">Location</label><Input value={personal.location} onChange={e => setPersonal({ ...personal, location: e.target.value })} placeholder="San Francisco, CA" /></div>
                      <div><label className="text-sm font-medium text-foreground">LinkedIn</label><Input value={personal.linkedin} onChange={e => setPersonal({ ...personal, linkedin: e.target.value })} placeholder="linkedin.com/in/johndoe" /></div>
                      <div><label className="text-sm font-medium text-foreground">GitHub</label><Input value={personal.github} onChange={e => setPersonal({ ...personal, github: e.target.value })} placeholder="github.com/johndoe" /></div>
                      <div><label className="text-sm font-medium text-foreground">Portfolio</label><Input value={personal.portfolio} onChange={e => setPersonal({ ...personal, portfolio: e.target.value })} placeholder="johndoe.dev" /></div>
                      <div><label className="text-sm font-medium text-foreground">Target Role</label><Input value={targetRole} onChange={e => setTargetRole(e.target.value)} placeholder="Full Stack Developer" /></div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Step 1: Education */}
              {step === 1 && (
                <Card>
                  <CardHeader><CardTitle className="flex items-center gap-2"><GraduationCap className="w-5 h-5" /> Education</CardTitle></CardHeader>
                  <CardContent className="space-y-4">
                    {education.map((edu, i) => (
                      <div key={i} className="p-4 border border-border rounded-lg space-y-3 relative">
                        {education.length > 1 && (
                          <button onClick={() => removeItem(education, setEducation, i)} className="absolute top-3 right-3 text-destructive hover:text-destructive/80"><Trash2 className="w-4 h-4" /></button>
                        )}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <Input value={edu.institution} onChange={e => updateItem(education, setEducation, i, "institution", e.target.value)} placeholder="University / College" />
                          <Input value={edu.degree} onChange={e => updateItem(education, setEducation, i, "degree", e.target.value)} placeholder="B.Tech Computer Science" />
                          <Input value={edu.year} onChange={e => updateItem(education, setEducation, i, "year", e.target.value)} placeholder="2020 – 2024" />
                          <Input value={edu.gpa} onChange={e => updateItem(education, setEducation, i, "gpa", e.target.value)} placeholder="GPA: 3.8 / 4.0" />
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" size="sm" onClick={() => addItem(education, setEducation, { institution: "", degree: "", year: "", gpa: "" })}>
                      <Plus className="w-4 h-4 mr-1" /> Add Education
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Step 2: Experience */}
              {step === 2 && (
                <Card>
                  <CardHeader><CardTitle className="flex items-center gap-2"><Briefcase className="w-5 h-5" /> Work Experience</CardTitle></CardHeader>
                  <CardContent className="space-y-4">
                    {experience.map((exp, i) => (
                      <div key={i} className="p-4 border border-border rounded-lg space-y-3 relative">
                        {experience.length > 1 && (
                          <button onClick={() => removeItem(experience, setExperience, i)} className="absolute top-3 right-3 text-destructive hover:text-destructive/80"><Trash2 className="w-4 h-4" /></button>
                        )}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <Input value={exp.company} onChange={e => updateItem(experience, setExperience, i, "company", e.target.value)} placeholder="Company Name" />
                          <Input value={exp.role} onChange={e => updateItem(experience, setExperience, i, "role", e.target.value)} placeholder="Software Engineer" />
                          <Input value={exp.duration} onChange={e => updateItem(experience, setExperience, i, "duration", e.target.value)} placeholder="Jun 2023 – Present" />
                        </div>
                        <Textarea value={exp.description} onChange={e => updateItem(experience, setExperience, i, "description", e.target.value)} placeholder="Describe your responsibilities and achievements..." rows={3} />
                      </div>
                    ))}
                    <Button variant="outline" size="sm" onClick={() => addItem(experience, setExperience, { company: "", role: "", duration: "", description: "" })}>
                      <Plus className="w-4 h-4 mr-1" /> Add Experience
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Step 3: Skills & Projects */}
              {step === 3 && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader><CardTitle className="flex items-center gap-2"><Code className="w-5 h-5" /> Skills</CardTitle></CardHeader>
                    <CardContent>
                      <Textarea value={skills} onChange={e => setSkills(e.target.value)} placeholder="React, Node.js, Python, AWS, Docker, PostgreSQL, System Design, REST APIs..." rows={4} />
                      <p className="text-xs text-muted-foreground mt-2">Comma-separated. AI will organize them into categories.</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader><CardTitle className="flex items-center gap-2"><FolderOpen className="w-5 h-5" /> Projects</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                      {projects.map((proj, i) => (
                        <div key={i} className="p-4 border border-border rounded-lg space-y-3 relative">
                          {projects.length > 1 && (
                            <button onClick={() => removeItem(projects, setProjects, i)} className="absolute top-3 right-3 text-destructive hover:text-destructive/80"><Trash2 className="w-4 h-4" /></button>
                          )}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <Input value={proj.name} onChange={e => updateItem(projects, setProjects, i, "name", e.target.value)} placeholder="Project Name" />
                            <Input value={proj.tech} onChange={e => updateItem(projects, setProjects, i, "tech", e.target.value)} placeholder="React, Firebase, Tailwind" />
                          </div>
                          <Textarea value={proj.description} onChange={e => updateItem(projects, setProjects, i, "description", e.target.value)} placeholder="What does it do? What problem does it solve?" rows={2} />
                        </div>
                      ))}
                      <Button variant="outline" size="sm" onClick={() => addItem(projects, setProjects, { name: "", description: "", tech: "" })}>
                        <Plus className="w-4 h-4 mr-1" /> Add Project
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Step 4: Preview */}
              {step === 4 && (
                <div className="space-y-4">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => { setStep(3); }} disabled={loading}>
                      <ArrowLeft className="w-4 h-4 mr-1" /> Edit Details
                    </Button>
                    <Button onClick={generateResume} disabled={loading} variant="outline">
                      <Sparkles className="w-4 h-4 mr-1" /> Regenerate
                    </Button>
                    <Button onClick={printResume} disabled={loading || !resumeData}>
                      <Download className="w-4 h-4 mr-1" /> Download PDF
                    </Button>
                  </div>

                  {loading ? (
                    <Card>
                      <CardContent className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
                        <p className="text-lg font-medium text-foreground">Generating your resume with AI...</p>
                        <p className="text-sm text-muted-foreground">Crafting bullet points, optimizing keywords</p>
                      </CardContent>
                    </Card>
                  ) : resumeData ? (
                    <Card className="shadow-lg">
                      <CardContent className="p-8" ref={resumeRef}>
                        {/* Resume Header */}
                        <div className="text-center mb-4 border-b border-border pb-4">
                          <h1 className="text-2xl font-bold text-foreground">{personal.name}</h1>
                          <div className="flex flex-wrap items-center justify-center gap-2 mt-1 text-sm text-muted-foreground">
                            {personal.email && <span>{personal.email}</span>}
                            {personal.phone && <><span>•</span><span>{personal.phone}</span></>}
                            {personal.location && <><span>•</span><span>{personal.location}</span></>}
                          </div>
                          <div className="flex flex-wrap items-center justify-center gap-2 mt-1 text-sm">
                            {personal.linkedin && <a href={`https://${personal.linkedin}`} className="text-primary hover:underline">{personal.linkedin}</a>}
                            {personal.github && <><span className="text-muted-foreground">•</span><a href={`https://${personal.github}`} className="text-primary hover:underline">{personal.github}</a></>}
                            {personal.portfolio && <><span className="text-muted-foreground">•</span><a href={`https://${personal.portfolio}`} className="text-primary hover:underline">{personal.portfolio}</a></>}
                          </div>
                        </div>

                        {/* Summary */}
                        {resumeData.summary && (
                          <div className="mb-5">
                            <h2 className="text-sm font-bold uppercase tracking-widest text-foreground border-b border-foreground/20 pb-1 mb-2">Professional Summary</h2>
                            <p className="text-sm text-muted-foreground leading-relaxed">{resumeData.summary}</p>
                          </div>
                        )}

                        {/* Experience */}
                        {resumeData.experience?.length > 0 && (
                          <div className="mb-5">
                            <h2 className="text-sm font-bold uppercase tracking-widest text-foreground border-b border-foreground/20 pb-1 mb-3">Experience</h2>
                            {resumeData.experience.map((exp: any, i: number) => (
                              <div key={i} className="mb-3">
                                <div className="flex justify-between items-baseline">
                                  <span className="font-semibold text-sm text-foreground">{exp.role}</span>
                                  <span className="text-xs text-muted-foreground">{exp.duration}</span>
                                </div>
                                <p className="text-xs text-muted-foreground italic">{exp.company}</p>
                                <ul className="list-disc pl-5 mt-1 space-y-0.5">
                                  {exp.bullets?.map((b: string, j: number) => (
                                    <li key={j} className="text-sm text-foreground/80">{b}</li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Education */}
                        {resumeData.education?.length > 0 && (
                          <div className="mb-5">
                            <h2 className="text-sm font-bold uppercase tracking-widest text-foreground border-b border-foreground/20 pb-1 mb-3">Education</h2>
                            {resumeData.education.map((edu: any, i: number) => (
                              <div key={i} className="mb-2">
                                <div className="flex justify-between items-baseline">
                                  <span className="font-semibold text-sm text-foreground">{edu.degree}</span>
                                  <span className="text-xs text-muted-foreground">{edu.year}</span>
                                </div>
                                <p className="text-xs text-muted-foreground">{edu.institution} {edu.gpa && `— ${edu.gpa}`}</p>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Projects */}
                        {resumeData.projects?.length > 0 && (
                          <div className="mb-5">
                            <h2 className="text-sm font-bold uppercase tracking-widest text-foreground border-b border-foreground/20 pb-1 mb-3">Projects</h2>
                            {resumeData.projects.map((p: any, i: number) => (
                              <div key={i} className="mb-3">
                                <div className="flex items-baseline gap-2">
                                  <span className="font-semibold text-sm text-foreground">{p.name}</span>
                                  {p.tech && <span className="text-xs text-muted-foreground">({p.tech})</span>}
                                </div>
                                <ul className="list-disc pl-5 mt-1 space-y-0.5">
                                  {p.bullets?.map((b: string, j: number) => (
                                    <li key={j} className="text-sm text-foreground/80">{b}</li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Skills */}
                        {resumeData.skills && Object.keys(resumeData.skills).length > 0 && (
                          <div>
                            <h2 className="text-sm font-bold uppercase tracking-widest text-foreground border-b border-foreground/20 pb-1 mb-3">Technical Skills</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {Object.entries(resumeData.skills).map(([cat, items]: [string, any]) => (
                                <div key={cat}>
                                  <span className="text-xs font-semibold text-foreground">{cat}: </span>
                                  <span className="text-xs text-muted-foreground">{Array.isArray(items) ? items.join(", ") : items}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ) : (
                    <Card>
                      <CardContent className="flex flex-col items-center justify-center py-20">
                        <Sparkles className="w-10 h-10 text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">Something went wrong. Try regenerating.</p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          {step < 4 && (
            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={() => setStep(s => Math.max(s - 1, 0))} disabled={step === 0}>
                <ArrowLeft className="w-4 h-4 mr-1" /> Back
              </Button>
              <Button onClick={handleNext}>
                {step === 3 ? (<><Sparkles className="w-4 h-4 mr-1" /> Generate Resume</>) : (<>Next <ArrowRight className="w-4 h-4 ml-1" /></>)}
              </Button>
            </div>
          )}
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default ResumeMaker;
