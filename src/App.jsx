import { useEffect, useMemo, useState } from "react";
import "./style.css";

const STORAGE_KEY = "ksf_board_strategy_hybrid_v1";

const seed = {
  title: "Board Strategy & Execution Dashboard",
  subtitle: "A living board operating system for governance, development, program buildout, and community engagement.",
  eyebrow: "Kent Schools Foundation · BoardHub",
  quickActions: [
  {
    id: "video",
    icon: "🎥",
    label: "Start Video",
    note: "Open the standing board Zoom meeting.",
    url: "https://washingtonea.zoom.us/j/97126324578?pwd=a7MGapZ9OPaJOfi4o5Ej47Ak1urbxj.1",
    type: "link"
  },
  {
    id: "minutes",
    icon: "📝",
    label: "New Minutes Doc",
    note: "Create a fresh Google Doc for board minutes.",
    url: "https://docs.new",
    type: "link"
  },
  {
    id: "minutes-folder",
    icon: "📚",
    label: "Minutes Folder",
    note: "Open prior board meeting minutes.",
    url: "https://drive.google.com/drive/folders/1D-oPPGI11afEjPJkgxlxmifj167FWkFx",
    type: "link"
  },
  {
    id: "poll",
    icon: "📋",
    label: "Create Poll",
    note: "Copy a board poll prompt.",
    url: "",
    type: "prompt",
    prompt: "Create a board poll with a clear decision question, 3–5 response options, and a deadline for responses."
  },
  {
    id: "slides",
    icon: "🎨",
    label: "Board Deck",
    note: "Open the current board meeting deck.",
    url: "https://drive.google.com/file/d/14RSnRiHFleDcO_4U-nUHb2l9Ud8qUv1R/view?usp=drive_link",
    type: "link"
  },
  {
    id: "docs",
    icon: "📁",
    label: "Documents",
    note: "Open the full board Google Drive library.",
    url: "",
    type: "link"
  },
],
  metrics: [
    { label: "Active Workstreams", value: "4", note: "Board-facing priorities" },
    { label: "Near-Term Actions", value: "10", note: "Due before next meeting" },
    { label: "Next Meeting", value: "May 15", note: "12:00 PM · Stevens Room / Zoom" },
    { label: "Board Focus", value: "Execution", note: "Decisions, ownership, follow-through" },
  ],
  phases: [
    { id: "stabilize", label: "Stabilize", date: "May", text: "Finance, filings, board roles, meeting rhythm" },
    { id: "align", label: "Align", date: "June", text: "Priorities, dashboards, governance calendar" },
    { id: "activate", label: "Activate", date: "Summer", text: "Development, Repp CTE design, partner outreach" },
    { id: "sustain", label: "Sustain", date: "Fall", text: "Board engagement, campaigns, reporting cadence" },
  ],
  workstreams: [
    {
      id: "governance",
      phase: "stabilize",
      title: "Governance & Board Engagement",
      tagline: "Clarify roles, strengthen cadence, and move board work from discussion to action.",
      status: "Active",
      owner: "Alan Sutliff / Marquise Dixon",
      boardFocus: "Confirm board commitments, treasurer path, and September board presentation direction.",
      sections: [
        { title: "Key Decisions", items: ["Determine next Treasurer recruitment approach.", "Finalize land acknowledgement action steps beyond meeting recitation.", "Confirm board presentation priorities for September."] },
        { title: "Active Work", items: ["Board members schedule 30-45 minute onboarding conversations with Marquise.", "Review board commitment forms and identify gaps.", "Prepare May meeting agenda with decision points separated from updates."] },
        { title: "Risks / Watch Items", items: ["Treasurer vacancy could slow financial oversight and approvals.", "Board action items may remain distributed across email without a central follow-up tool."] },
      ],
    },
    {
      id: "finance",
      phase: "stabilize",
      title: "Finance, Compliance & Infrastructure",
      tagline: "Complete filings, clean up accounting, and stabilize the operating backbone.",
      status: "Urgent",
      owner: "Jenny Buron / Allison Parker / Alan Sutliff",
      boardFocus: "Support timely completion of state filings, bank access, and accounting clean-up decisions.",
      sections: [
        { title: "Immediate Actions", items: ["Complete WA Charitable Solicitation and Trust filings.", "Deliver Mechanics Bank paperwork.", "Move forward on CPA tax prep and accounting clean-up within approved parameters."] },
        { title: "Board Oversight", items: ["Review monthly financial report in a dashboard format.", "Track expense account and technology purchase against approved budget.", "Clarify who owns finance follow-up between meetings."] },
        { title: "Dependencies", items: ["Treasurer recruitment or interim finance lead.", "Updated records and access across bank, Schwab, and accounting systems."] },
      ],
    },
    {
      id: "development",
      phase: "activate",
      title: "Development & Community Visibility",
      tagline: "Build the fundraising engine, donor confidence, and community-facing presence.",
      status: "Building",
      owner: "Marquise Dixon / Board Development",
      boardFocus: "Use board relationships to activate donor introductions, business sponsors, and community visibility moments.",
      sections: [
        { title: "Strategic Moves", items: ["Align board dashboard with the development roadmap and revenue goals.", "Use Kent International Festival as a visibility and list-building opportunity.", "Create a board-ready donor and sponsor pipeline view."] },
        { title: "Communications", items: ["Finalize website review and launch updates.", "Clarify donation tool/app updates and business donation levels.", "Package key stories from scholarships, classroom grants, and KSD impact."] },
        { title: "Board Actions Needed", items: ["Identify warm business introductions.", "Share potential donor and sponsor names.", "Attend priority events and help with follow-up."] },
      ],
    },
    {
      id: "programs",
      phase: "activate",
      title: "Scholarships, Grants & Repp CTE Program",
      tagline: "Connect current scholarship/grant operations with the longer-term Repp CTE program design.",
      status: "Designing",
      owner: "Connie Compton / Marilyn Boxly / Marquise Dixon",
      boardFocus: "Protect donor intent while shaping a clear, rigorous, student-centered CTE pathway.",
      sections: [
        { title: "Current Program Work", items: ["Prepare for May 21 Scholarship Event.", "Finalize KW grant carryover communication.", "Review classroom enrichment grant reporting and application improvements."] },
        { title: "Repp CTE Design Questions", items: ["Define eligibility, selection criteria, and CTE alignment.", "Determine annual award structure and student support model.", "Map connections to mentors, internships, and workforce partners."] },
        { title: "Next Milestones", items: ["Create a Repp CTE briefing for board review.", "Develop timeline from design workshop to spring launch.", "Identify board members or partners who can support workforce connections."] },
      ],
    },
  ],
  meetings: [
    { title: "Board Meeting – May 15, 2026", time: "12:00 PM", location: "KSD Administration Center – Stevens Room / Zoom", focus: "Treasurer leads, festival planning, land acknowledgement action, September presentation planning" },
    { title: "Scholarship Event", time: "May 21, 2026 · 5:30 PM", location: "Kent Covenant Church", focus: "Board presence and student celebration" },
    { title: "Kent International Festival", time: "May 30, 2026 · 10 AM–5 PM", location: "Showare", focus: "KSF booth planning and community visibility" },
  ],
  tasks: [
    { title: "Complete WA Charitable Solicitation & Trust state filings", status: "Open", owner: "Allison Parker", due: "May 15, 2026", priority: "High" },
    { title: "Identify Treasurer candidates – update at May meeting", status: "Open", owner: "All Board", due: "May 15, 2026", priority: "High" },
    { title: "Deliver Mechanics Bank paperwork", status: "Open", owner: "Alan Sutliff", due: "May 8, 2026", priority: "High" },
    { title: "Notify educator re: KW grant carryover decision", status: "Open", owner: "Connie Compton", due: "May 8, 2026", priority: "Medium" },
    { title: "Send teacher appreciation week email to KSD staff", status: "Open", owner: "Marquise Dixon", due: "May 9, 2026", priority: "Medium" },
    { title: "Schedule 30–45 minute meetings with Marquise", status: "Open", owner: "All Board", due: "May 15, 2026", priority: "Medium" },
    { title: "Plan KSF booth for Kent International Festival", status: "Open", owner: "Allyson Johnson / Alan Sutliff", due: "May 15, 2026", priority: "Medium" },
    { title: "Review native-land.ca for land acknowledgement discussion", status: "Open", owner: "All Board", due: "May 15, 2026", priority: "Low" },
    { title: "Explore credit card with cash back for bookkeeper/ED", status: "Open", owner: "Jenny Buron", due: "May 30, 2026", priority: "Low" },
    { title: "Attend May 21 Scholarship Event", status: "Open", owner: "Randy, Marilyn, Allyson, Connie", due: "May 21, 2026", priority: "Medium" },
  ],
  members: [
    { name: "Alan Sutliff", role: "President", initials: "AS", email: "president@kentschoolsfoundation.org",
      bio: "Alan and his partner have lived in the Kent School District for over twenty years. He currently works for the Washington Education Association representing educators in Renton. A founding member of KSF, Alan believes strongly in equitable funding for public education." },
    { name: "Allyson Johnson", role: "Past President", initials: "AJ", email: "ptamom@q.com",
      bio: "Allyson has been a tireless advocate for kids and public education for over 13 years with KSF. She raised 3 children in the Kent School District and worked for KSD as a Health Tech and Administrative Assistant for 15 years." },
    { name: "Randy Heath", role: "VP Board Development", initials: "RH", email: "randyheath@seattleymca.org",
      bio: "Randy worked in public schools in Washington for 33 years, retiring from KSD in June 2024 as Executive Director/Associate Superintendent. He now serves as Executive Director of the Washington State Alliance of YMCAs." },
    { name: "Connie Compton", role: "Secretary", initials: "CC", email: "richcompton2@comcast.net",
      bio: "Connie taught special education in Kent from 1983 through retirement in 2023. She served as Kent Education Association president in 2011, a term that directly led to the founding of KSF. She is passionate about strong public schools and equitable opportunities for all students." },
    { name: "Marilyn Boxly", role: "VP Classroom Grants", initials: "MB", email: "mobotea@comcast.net",
      bio: "Marilyn taught at Jenkins Creek Elementary School for 32 years after joining KSD in 1990. She is an active member of the Kent Educators of Color Network and deeply committed to ensuring opportunities are accessible to every child regardless of zip code or background." },
    { name: "Sharn Shoker", role: "VP Communications", initials: "SS", email: "sharnkaur15@gmail.com",
      bio: "Sharn is a lifelong Kent resident and proud KSD graduate. She attended Emerald Park Elementary, Meeker Middle School, and Kent Ridge High School. She is now raising a future KSD student and is honored to give back to the system that shaped her." },
    { name: "Marquise Dixon", role: "Executive Director", initials: "MD", email: "ed@kentschoolsfoundation.org",
      bio: "Marquise brings visionary nonprofit leadership to KSF, most recently serving as CEO of a Tacoma nonprofit serving 1,500+ students and families annually. He expanded employer partnerships, grew programming, and strengthened organizational sustainability." },
  ],
  documents: [
    { name: "KSF Board Minutes – April 17, 2026", category: "Minutes", uploaded: "Apr 17, 2026", owner: "Alan Sutliff", url: "https://drive.google.com/file/d/1NpsHr2mZMTU-bAceVqwVaBi1Yz20BQCN/view" },
    { name: "Statement of Financial Position – March 2026", category: "Finance", uploaded: "Apr 16, 2026", owner: "Jenny Buron", url: "https://drive.google.com/file/d/1Zzkueif5aqumHQMwyyF-_V1O-zTuWYk3/view" },
    { name: "Statement of Financial Position – March 2026 (Detail)", category: "Finance", uploaded: "Apr 17, 2026", owner: "Jenny Buron", url: "https://drive.google.com/file/d/1wZMn1QqC_tRhbhCuFRpfooHFYgJnJeR5/view" },
    { name: "Donor Restricted Funds Summary", category: "Finance", uploaded: "Apr 30, 2026", owner: "Jenny Buron", url: "https://drive.google.com/file/d/1CNvDBcn6HmGDLMEXvzHU01B0IIZaRfdF/view" },
    { name: "Statement of Financial Position – February 2026", category: "Finance", uploaded: "Mar 24, 2026", owner: "Jenny Buron", url: "https://drive.google.com/file/d/14yCCxYMdxPd0cth7qeUJnmijrq-lC7gh/view" },
    { name: "KSF Board Job Description", category: "Governance", uploaded: "Jan 16, 2026", owner: "Alan Sutliff", url: "https://drive.google.com/file/d/1xW75atR83Gf1rfSPnYLhhEx_1Usef4MV/view" },
    { name: "Executive Director Job Description", category: "Governance", uploaded: "Jan 8, 2026", owner: "Alan Sutliff", url: "https://drive.google.com/file/d/1aEcHkp7f9NCayJw1Pd9t1Ul55CiNKWxM/view" },
    { name: "Board Commitment Form (Blank)", category: "Governance", uploaded: "Nov 26, 2025", owner: "Alan Sutliff", url: "https://drive.google.com/file/d/15_jZYZI5jX-_4L7l5QJ2fsZOvb3Tg64G/view" },
    { name: "Teacher Appreciation Email Draft", category: "Communications", uploaded: "Apr 25, 2026", owner: "Marquise Dixon", url: "https://docs.google.com/document/d/1RMz53glGPmmDz5U9rdHc5GuVAXezMGnJUr8DbX4vYCw/edit" },
    { name: "Business Donation Levels", category: "Communications", uploaded: "Apr 19, 2026", owner: "Sharn Shoker", url: "https://drive.google.com/file/d/1hCF3vUfAhOWvXZU0gRQqBWCLViOPCNjj/view" },
    { name: "Classroom Enrichment Grant Report – May 2026", category: "Grants", uploaded: "May 2, 2026", owner: "Connie Compton", url: "https://drive.google.com/file/d/1xUcRu491irCqJiSzCXUd-PgUo5esWXVF/view" },
  ],
};

function clone(x){ return JSON.parse(JSON.stringify(x)); }
function load(){ try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || clone(seed); } catch { return clone(seed); } }
function save(data){ try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch {} }

function Editable({ value, onChange, editMode, className="", multiline=false }){
  if(!editMode) return multiline ? <span className={className}>{value}</span> : <span className={className}>{value}</span>;
  const Tag = multiline ? "textarea" : "input";
  return <Tag className={`editable-field ${className}`} value={value} onChange={e=>onChange(e.target.value)} />;
}

function Pill({ children, tone="green" }){ return <span className={`pill ${tone}`}>{children}</span>; }


function MemberCard({ m, i, update, editMode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={"member" + (open ? " member-open" : "")}>
      <div className="avatar">
        <Editable value={m.initials} onChange={v => update(["members", i, "initials"], v)} editMode={editMode} />
      </div>
      <div className="member-info">
        <div className="member-header" onClick={() => setOpen(o => !o)}>
          <div>
            <strong><Editable value={m.name} onChange={v => update(["members", i, "name"], v)} editMode={editMode} /></strong>
            <span><Editable value={m.role} onChange={v => update(["members", i, "role"], v)} editMode={editMode} /></span>
          </div>
          <span className="member-toggle">{open ? "▲" : "▼"}</span>
        </div>
        {open && (
          <div className="member-details">
            {m.email && <a href={"mailto:" + m.email} className="member-email">{m.email}</a>}
            {m.bio && <p className="member-bio">{m.bio}</p>}
          </div>
        )}
      </div>
    </div>
  );
}

export default function App(){
  const [data,setData] = useState(load);
  const [editMode,setEditMode] = useState(false);
  const [filter,setFilter] = useState("all");
  const [openCards,setOpenCards] = useState({ governance:true });
  const [openSections,setOpenSections] = useState({});
  const [saved,setSaved] = useState(false);

  useEffect(()=>{ save(data); setSaved(true); const t=setTimeout(()=>setSaved(false),900); return ()=>clearTimeout(t); },[data]);

  const filteredWorkstreams = useMemo(()=> data.workstreams.filter(w => filter === "all" || w.phase === filter), [data.workstreams, filter]);
  const completedCount = data.tasks.filter(t => String(t.status || "").toLowerCase() === "complete").length;
  const progress = Math.round((completedCount / Math.max(data.tasks.length,1))*100);
  const docsByCategory = useMemo(() => {
    return (data.documents || []).reduce((acc, doc) => {
      const key = doc.category || "Other";
      acc[key] = acc[key] || [];
      acc[key].push(doc);
      return acc;
    }, {});
  }, [data.documents]);

  const update = (path, value) => {
    setData(prev => {
      const next = clone(prev);
      let obj = next;
      for(let i=0;i<path.length-1;i++) obj = obj[path[i]];
      obj[path[path.length-1]] = value;
      return next;
    });
  };

  const addItem = (wIdx, sIdx) => update(["workstreams", wIdx, "sections", sIdx, "items"], [...data.workstreams[wIdx].sections[sIdx].items, "New item — click edit mode to update."]);
  const removeItem = (wIdx, sIdx, iIdx) => update(["workstreams", wIdx, "sections", sIdx, "items"], data.workstreams[wIdx].sections[sIdx].items.filter((_,i)=>i!==iIdx));
  const addTask = () => update(["tasks"], [...data.tasks, { title:"New task", status:"Open", owner:"Owner", due:"Date", priority:"Medium" }]);
  const addDocument = () => update(["documents"], [...(data.documents || []), { name:"New board document", category:"Governance", uploaded:"Date", owner:"Owner", url:"https://drive.google.com/" }]);
  const removeDocument = (idx) => update(["documents"], (data.documents || []).filter((_,i)=>i!==idx));
  const handleQuickAction = async (action) => {
    if (action.type === "scroll") {
      const target = document.querySelector(action.url || "#documents");
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    if (action.url && action.url.trim()) {
      window.open(action.url, "_blank", "noopener,noreferrer");
      return;
    }
    if (action.prompt) {
      try {
        await navigator.clipboard.writeText(action.prompt);
        alert(`${action.label} prompt copied. Paste it into your AI tool or meeting workspace.`);
      } catch {
        alert(action.prompt);
      }
    }
  };
  const addWorkstream = () => update(["workstreams"], [...data.workstreams, { id:`new-${Date.now()}`, phase:"align", title:"New Workstream", tagline:"Describe the strategic purpose.", status:"New", owner:"Owner", boardFocus:"Board focus here.", sections:[{title:"Key Work", items:["New item"]}] }]);
  const addQuickAction = () => update(["quickActions"], [...(data.quickActions || []), { id:`quick-${Date.now()}`, icon:"✨", label:"New Action", note:"Describe this shortcut.", url:"", type:"link", prompt:"" }]);
  const removeQuickAction = (idx) => update(["quickActions"], (data.quickActions || []).filter((_,i)=>i!==idx));

  const exportEdits = () => {
    const blob = new Blob([JSON.stringify(data,null,2)], {type:"application/json"});
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob); a.download = "ksf-board-dashboard-edits.json"; a.click();
  };
  const importEdits = (e) => {
    const f = e.target.files?.[0]; if(!f) return;
    const r = new FileReader();
    r.onload = () => { try { setData(JSON.parse(r.result)); } catch { alert("Could not import this JSON file."); } };
    r.readAsText(f);
  };

  return <div>
    <div className="topbar">
      <div className="brand">KSF BoardHub</div>
      <button onClick={()=>setEditMode(!editMode)} className={editMode?"btn gold":"btn"}>{editMode ? "Exit edit mode" : "Edit mode"}</button>
      <button className="btn ghost" onClick={exportEdits}>Export edits</button>
      <button className="btn ghost signout" onClick={()=>{localStorage.removeItem("ksf_auth");window.location.reload();}}>Sign Out</button>
      <label className="btn ghost file-label">Import edits<input type="file" accept="application/json" onChange={importEdits}/></label>
      <button className="btn ghost" onClick={()=>{ localStorage.removeItem("ksf_auth"); window.location.reload(); }}>Logout</button>
      <button className="btn danger" onClick={()=>{ if(confirm("Reset dashboard to default content?")){ localStorage.removeItem(STORAGE_KEY); setData(clone(seed)); }}}>Reset</button>
      <span className={`save ${saved?"show":""}`}>Saved</span>
    </div>

    <main className="page">
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow"><Editable value={data.eyebrow} onChange={v=>update(["eyebrow"],v)} editMode={editMode}/></div>
          <h1><Editable value={data.title} onChange={v=>update(["title"],v)} editMode={editMode}/></h1>
          <p><Editable value={data.subtitle} onChange={v=>update(["subtitle"],v)} editMode={editMode} multiline/></p>
        </div>
        <div className="hero-panel">
          <div className="panel-title">Execution Health</div>
          <div className="progress-row"><span>Board actions completed</span><strong>{completedCount}/{data.tasks.length} · {progress}%</strong></div>
          <div className="progress"><div style={{width:`${progress}%`}} /></div>
          <p className="small">Check off action items below and this updates automatically.</p>
        </div>
      </section>

      <section className="quick-actions-panel">
        <div className="panel-header quick-actions-header">
          <div>
            <div className="section-kicker">Quick Actions</div>
            <h3>Board Meeting Tools</h3>
          </div>
          {editMode && <button className="btn" onClick={addQuickAction}>+ Add shortcut</button>}
        </div>
        <div className="quick-actions-grid">
          {(data.quickActions || []).map((action,i)=><div className="quick-action-card" key={action.id || i}>
            <button className="quick-action-button" onClick={()=>handleQuickAction(action)} title={action.note || action.label}>
              <span className="quick-icon"><Editable value={action.icon} onChange={v=>update(["quickActions",i,"icon"],v)} editMode={editMode}/></span>
              <strong><Editable value={action.label} onChange={v=>update(["quickActions",i,"label"],v)} editMode={editMode}/></strong>
              <small><Editable value={action.note} onChange={v=>update(["quickActions",i,"note"],v)} editMode={editMode} multiline/></small>
            </button>
            {editMode && <div className="quick-edit-fields">
              <label>Type <Editable value={action.type || "link"} onChange={v=>update(["quickActions",i,"type"],v)} editMode={editMode}/></label>
              <label>URL <Editable value={action.url || ""} onChange={v=>update(["quickActions",i,"url"],v)} editMode={editMode}/></label>
              <label>Prompt <Editable value={action.prompt || ""} onChange={v=>update(["quickActions",i,"prompt"],v)} editMode={editMode} multiline/></label>
              <button className="mini danger-text" onClick={()=>removeQuickAction(i)}>remove shortcut</button>
            </div>}
          </div>)}
        </div>
      </section>

      <section className="metrics-grid">
        {data.metrics.map((m,i)=><div className="metric" key={i}>
          <Editable value={m.value} onChange={v=>update(["metrics",i,"value"],v)} editMode={editMode} className="metric-value" />
          <Editable value={m.label} onChange={v=>update(["metrics",i,"label"],v)} editMode={editMode} className="metric-label" />
          <Editable value={m.note} onChange={v=>update(["metrics",i,"note"],v)} editMode={editMode} className="metric-note" />
        </div>)}
      </section>

      <section className="timeline-card">
        <div className="section-kicker">Strategic Arc</div>
        <div className="phase-timeline">
          {data.phases.map((p,i)=><button key={p.id} className={`phase ${filter===p.id?"active":""}`} onClick={()=>setFilter(filter===p.id?"all":p.id)}>
            <span className="phase-num">{i+1}</span>
            <span className="phase-main"><Editable value={p.label} onChange={v=>update(["phases",i,"label"],v)} editMode={editMode}/></span>
            <span className="phase-date"><Editable value={p.date} onChange={v=>update(["phases",i,"date"],v)} editMode={editMode}/></span>
            <span className="phase-text"><Editable value={p.text} onChange={v=>update(["phases",i,"text"],v)} editMode={editMode}/></span>
          </button>)}
        </div>
      </section>

      <div className="controls-row">
        <div className="filter-pills">
          <button className={filter==="all"?"active":""} onClick={()=>setFilter("all")}>All workstreams</button>
          {data.phases.map(p=><button key={p.id} className={filter===p.id?"active":""} onClick={()=>setFilter(p.id)}>{p.label}</button>)}
        </div>
        {editMode && <button className="btn" onClick={addWorkstream}>+ Add workstream</button>}
      </div>

      <section className="workstreams">
        {filteredWorkstreams.map((w)=>{
          const wIdx = data.workstreams.findIndex(x=>x.id===w.id);
          const isOpen = !!openCards[w.id];
          return <article className={`work-card ${isOpen?"open":""}`} key={w.id}>
            <div className="work-head" onClick={()=>setOpenCards(o=>({...o,[w.id]:!o[w.id]}))}>
              <div className="accent" />
              <div className="work-title-block">
                <div className="work-meta"><Pill tone={w.status.toLowerCase()==="urgent"?"gold":"green"}>{w.status}</Pill><span>{w.owner}</span></div>
                <h2 onClick={e=>e.stopPropagation()}><Editable value={w.title} onChange={v=>update(["workstreams",wIdx,"title"],v)} editMode={editMode}/></h2>
                <p onClick={e=>e.stopPropagation()}><Editable value={w.tagline} onChange={v=>update(["workstreams",wIdx,"tagline"],v)} editMode={editMode} multiline/></p>
              </div>
              <div className="chev">⌄</div>
            </div>
            {isOpen && <div className="work-body">
              <div className="board-focus"><strong>Board Focus:</strong> <Editable value={w.boardFocus} onChange={v=>update(["workstreams",wIdx,"boardFocus"],v)} editMode={editMode} multiline/></div>
              <div className="subsections">
                {w.sections.map((s,sIdx)=>{
                  const key = `${w.id}-${sIdx}`;
                  const secOpen = openSections[key] !== false;
                  return <div className="subsection" key={key}>
                    <button className="subsection-head" onClick={()=>setOpenSections(o=>({...o,[key]:!secOpen}))}>
                      <span><Editable value={s.title} onChange={v=>update(["workstreams",wIdx,"sections",sIdx,"title"],v)} editMode={editMode}/></span>
                      <span>{secOpen?"−":"+"}</span>
                    </button>
                    {secOpen && <div className="subsection-body">
                      {s.items.map((item,iIdx)=><div className="item-row" key={iIdx}>
                        <span className="dot" />
                        <Editable value={item} onChange={v=>update(["workstreams",wIdx,"sections",sIdx,"items",iIdx],v)} editMode={editMode} multiline />
                        {editMode && <button className="mini danger-text" onClick={()=>removeItem(wIdx,sIdx,iIdx)}>remove</button>}
                      </div>)}
                      {editMode && <button className="mini" onClick={()=>addItem(wIdx,sIdx)}>+ Add item</button>}
                    </div>}
                  </div>
                })}
              </div>
            </div>}
          </article>
        })}
      </section>

      <section className="two-col">
        <div className="panel">
          <div className="panel-header"><div><div className="section-kicker">Upcoming Board Moments</div><h3>Meetings & Events</h3></div></div>
          {data.meetings.map((m,i)=><div className="meeting" key={i}>
            <strong><Editable value={m.title} onChange={v=>update(["meetings",i,"title"],v)} editMode={editMode}/></strong>
            <span><Editable value={m.time} onChange={v=>update(["meetings",i,"time"],v)} editMode={editMode}/></span>
            <span><Editable value={m.location} onChange={v=>update(["meetings",i,"location"],v)} editMode={editMode}/></span>
            <p><Editable value={m.focus} onChange={v=>update(["meetings",i,"focus"],v)} editMode={editMode} multiline/></p>
          </div>)}
        </div>
        <div className="panel">
          <div className="panel-header"><div><div className="section-kicker">Board Composition</div><h3>Members</h3></div></div>
          <div className="member-grid">
            {data.members.map((m,i)=><MemberCard key={i} m={m} i={i} update={update} editMode={editMode}/>)}
          </div>
        </div>
      </section>

      <section className="panel docs-panel" id="documents">
        <div className="panel-header"><div><div className="section-kicker">Board Documents</div><h3>Google Drive Library</h3></div>{editMode && <button className="btn" onClick={addDocument}>+ Add document</button>}</div>
        <p className="muted-note">Links open directly in Google Drive. Use edit mode to update titles, categories, owners, dates, or Drive URLs.</p>
        <div className="docs-grid">
          {Object.entries(docsByCategory).map(([category, docs]) => <div className="doc-category" key={category}>
            <div className="doc-category-title">{category}</div>
            {docs.map((doc) => {
              const dIdx = data.documents.findIndex(x => x === doc);
              return <div className="doc-row" key={`${category}-${doc.name}-${dIdx}`}>
                <div className="doc-main">
                  <strong><Editable value={doc.name} onChange={v=>update(["documents",dIdx,"name"],v)} editMode={editMode}/></strong>
                  <span><Editable value={doc.uploaded} onChange={v=>update(["documents",dIdx,"uploaded"],v)} editMode={editMode}/> · <Editable value={doc.owner} onChange={v=>update(["documents",dIdx,"owner"],v)} editMode={editMode}/></span>
                  {editMode && <label className="url-edit">Drive URL <Editable value={doc.url} onChange={v=>update(["documents",dIdx,"url"],v)} editMode={editMode}/></label>}
                </div>
                <div className="doc-actions">
                  {editMode && <Editable value={doc.category} onChange={v=>update(["documents",dIdx,"category"],v)} editMode={editMode} className="doc-cat-input"/>}
                  <a className="drive-link" href={doc.url || "#"} target="_blank" rel="noopener noreferrer">Open ↗</a>
                  {editMode && <button className="mini danger-text" onClick={()=>removeDocument(dIdx)}>remove</button>}
                </div>
              </div>
            })}
          </div>)}
        </div>
      </section>

      <section className="panel action-panel">
        <div className="panel-header"><div><div className="section-kicker">Action Tracker</div><h3>Near-Term Board Actions</h3></div>{editMode && <button className="btn" onClick={addTask}>+ Add task</button>}</div>
        <div className="task-table">
          <div className="task-head"><span>Status</span><span>Action</span><span>Owner</span><span>Due</span><span>Priority</span></div>
          {data.tasks.map((t,i)=><div className={`task-row ${String(t.status).toLowerCase()==="complete"?"done":""}`} key={i}>
            <span className="status-cell"><label className="check-wrap"><input type="checkbox" checked={String(t.status || "").toLowerCase()==="complete"} onChange={e=>update(["tasks",i,"status"], e.target.checked ? "Complete" : "Open")} /><b>{String(t.status || "Open")}</b></label></span>
            <span><Editable value={t.title} onChange={v=>update(["tasks",i,"title"],v)} editMode={editMode} multiline/></span>
            <span><Editable value={t.owner} onChange={v=>update(["tasks",i,"owner"],v)} editMode={editMode}/></span>
            <span><Editable value={t.due} onChange={v=>update(["tasks",i,"due"],v)} editMode={editMode}/></span>
            <span><Pill tone={String(t.priority).toLowerCase()==="high"?"gold":"green"}><Editable value={t.priority} onChange={v=>update(["tasks",i,"priority"],v)} editMode={editMode}/></Pill></span>
          </div>)}
        </div>
      </section>
    </main>
  </div>;
}
