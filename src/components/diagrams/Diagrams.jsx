// Diagrams reconstructed to match the original PDF images as closely as
// possible (entity boxes, attribute ellipses, relationship diamonds, tree
// structures, and directed graphs). Everything uses stroke/fill="currentColor"
// so it automatically follows the surrounding text color in both themes —
// no separate light/dark palette needed for these line-art diagrams.

function Frame({ viewBox, className = "", children, maxWidth = 420 }) {
  return (
    <div className={`my-3 flex justify-center text-[var(--color-ink)] dark:text-[var(--color-paper-dark)] ${className}`}>
      <svg viewBox={viewBox} style={{ maxWidth, width: "100%" }} className="h-auto">
        {children}
      </svg>
    </div>
  );
}

function Box({ x, y, w, h, title, lines = [], titleUnderline = true }) {
  const lineH = 22;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill="currentColor" fillOpacity="0.04" stroke="currentColor" strokeWidth="1.5" />
      <text x={x + w / 2} y={y + 18} textAnchor="middle" fontSize="13" fontWeight="700">
        {title}
      </text>
      {titleUnderline && <line x1={x} y1={y + 26} x2={x + w} y2={y + 26} stroke="currentColor" strokeWidth="1" />}
      {lines.map((l, i) => (
        <text key={i} x={x + w / 2} y={y + 26 + lineH * (i + 1) - 6} textAnchor="middle" fontSize="12">
          {typeof l === "string" ? l : l.text}
        </text>
      ))}
      {lines.map(
        (l, i) =>
          typeof l !== "string" &&
          l.underline && (
            <line
              key={"u" + i}
              x1={x + w / 2 - l.underlineWidth / 2}
              y1={y + 26 + lineH * (i + 1) - 2}
              x2={x + w / 2 + l.underlineWidth / 2}
              y2={y + 26 + lineH * (i + 1) - 2}
              stroke="currentColor"
              strokeWidth="1"
            />
          )
      )}
    </g>
  );
}

function Diamond({ cx, cy, hw, hh, label, double = false }) {
  const pts = (o) => `${cx - hw + o},${cy} ${cx},${cy - hh + o} ${cx + hw - o},${cy} ${cx},${cy + hh - o}`;
  return (
    <g>
      <polygon points={pts(0)} fill="currentColor" fillOpacity="0.04" stroke="currentColor" strokeWidth="1.5" />
      {double && <polygon points={pts(6)} fill="none" stroke="currentColor" strokeWidth="1.5" />}
      <text x={cx} y={cy + 4} textAnchor="middle" fontSize="12" fontWeight="600">
        {label}
      </text>
    </g>
  );
}

function Ellipse({ cx, cy, label, rx = 46, ry = 18, underline = false }) {
  return (
    <g>
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="currentColor" fillOpacity="0.04" stroke="currentColor" strokeWidth="1.2" />
      <text x={cx} y={cy + 4} textAnchor="middle" fontSize="11">
        {label}
      </text>
      {underline && (
        <line x1={cx - rx * 0.5} y1={cy + 8} x2={cx + rx * 0.5} y2={cy + 8} stroke="currentColor" strokeWidth="1" />
      )}
    </g>
  );
}

function ArrowDefs({ id }) {
  return (
    <defs>
      <marker id={id} markerWidth="9" markerHeight="9" refX="7" refY="4" orient="auto">
        <path d="M0,0 L8,4 L0,8 Z" fill="currentColor" />
      </marker>
    </defs>
  );
}

// ---------------------------------------------------------------------------
// Week 3, Q3 — Contact / User ER diagram with Personal / Professional ISA
// ---------------------------------------------------------------------------
export function ERContactUser() {
  return (
    <Frame viewBox="0 0 480 300">
      <Box x={20} y={20} w={140} h={90} title="Contact" lines={[{ text: "Name" }, { text: "Number", underline: true, underlineWidth: 56 }]} />
      <Box x={360} y={20} w={100} h={90} title="User" lines={[{ text: "ID", underline: true, underlineWidth: 18 }, { text: "UName" }]} />
      <line x1={160} y1={65} x2={190} y2={65} stroke="currentColor" strokeWidth="1.5" />
      <Diamond cx={260} cy={65} hw={70} hh={40} label="Maintains" />
      <line x1={330} y1={65} x2={360} y2={65} stroke="currentColor" strokeWidth="1.5" />
      {/* ISA triangle below Contact */}
      <line x1={90} y1={110} x2={90} y2={140} stroke="currentColor" strokeWidth="1.5" />
      <polygon points="75,140 105,140 90,155" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <line x1={90} y1={155} x2={90} y2={175} stroke="currentColor" strokeWidth="1.5" />
      <line x1={75} y1={175} x2={225} y2={175} stroke="currentColor" strokeWidth="1.5" />
      <line x1={75} y1={175} x2={75} y2={200} stroke="currentColor" strokeWidth="1.5" />
      <line x1={225} y1={175} x2={225} y2={200} stroke="currentColor" strokeWidth="1.5" />
      <Box x={20} y={200} w={110} h={60} title="Personal" lines={["Social_site"]} />
      <Box x={165} y={200} w={130} h={60} title="Professional" lines={["Email"]} />
    </Frame>
  );
}

// ---------------------------------------------------------------------------
// Week 3, Q4 — Windows / Room / Occupant ER diagram
// ---------------------------------------------------------------------------
export function ERWindowsRoom() {
  return (
    <Frame viewBox="0 0 520 360" maxWidth={460}>
      <ArrowDefs id="arrowW3Q4" />
      <Box
        x={20}
        y={20}
        w={130}
        h={80}
        title="Windows"
        lines={[
          { text: "Count", underline: true, underlineWidth: 40 },
          { text: "GlassType", underline: true, underlineWidth: 66 },
        ]}
      />
      {/* Double line = total participation */}
      <line x1={150} y1={56} x2={190} y2={56} stroke="currentColor" strokeWidth="1.3" />
      <line x1={150} y1={64} x2={190} y2={64} stroke="currentColor" strokeWidth="1.3" />
      <Diamond cx={260} cy={70} hw={70} hh={35} label="Room_Win" double />
      <line x1={330} y1={70} x2={385} y2={70} stroke="currentColor" strokeWidth="1.5" markerEnd="url(#arrowW3Q4)" />
      <Box
        x={390}
        y={20}
        w={120}
        h={120}
        title="Room"
        lines={[
          { text: "RNo", underline: true, underlineWidth: 26 },
          { text: "BedCount" },
          { text: "WallColor" },
          { text: "DecorType" },
        ]}
      />
      <line x1={450} y1={140} x2={450} y2={195} stroke="currentColor" strokeWidth="1.5" />
      <Diamond cx={450} cy={230} hw={65} hh={35} label="Room_Occ" />
      <line x1={320} y1={250} x2={385} y2={240} stroke="currentColor" strokeWidth="1.5" />
      <Box
        x={200}
        y={200}
        w={120}
        h={100}
        title="Occupant"
        lines={[{ text: "OID", underline: true, underlineWidth: 22 }, { text: "FamCount" }, { text: "Phone" }]}
      />
    </Frame>
  );
}

// ---------------------------------------------------------------------------
// Week 3, Q6 — Animals specialization hierarchy
// ---------------------------------------------------------------------------
export function ERAnimals() {
  return (
    <Frame viewBox="0 0 480 340" maxWidth={420}>
      <ArrowDefs id="arrowW3Q6" />
      <Box x={175} y={20} w={130} h={70} title="ANIMALS" lines={["SCNAME", "LOCATION"]} />
      <Box x={10} y={150} w={110} h={60} title="OMNIVORES" lines={["HABITAT"]} />
      <Box x={185} y={150} w={110} h={60} title="CARNIVORES" lines={["FOODCHOICE"]} />
      <Box x={360} y={150} w={110} h={60} title="HERBIVORES" lines={["USE"]} />
      <line x1={65} y1={150} x2={200} y2={95} stroke="currentColor" strokeWidth="1.3" markerEnd="url(#arrowW3Q6)" />
      <line x1={240} y1={150} x2={240} y2={95} stroke="currentColor" strokeWidth="1.3" markerEnd="url(#arrowW3Q6)" />
      <line x1={415} y1={150} x2={280} y2={95} stroke="currentColor" strokeWidth="1.3" markerEnd="url(#arrowW3Q6)" />
      <Box x={185} y={260} w={110} h={60} title="DOGS" lines={["BREED"]} />
      <line x1={240} y1={260} x2={240} y2={215} stroke="currentColor" strokeWidth="1.3" markerEnd="url(#arrowW3Q6)" />
    </Frame>
  );
}

// ---------------------------------------------------------------------------
// Week 5, Q7 — Group / Participate / Participant ER diagram
// ---------------------------------------------------------------------------
export function ERGroupParticipant() {
  return (
    <Frame viewBox="0 0 620 220" maxWidth={460}>
      <Ellipse cx={70} cy={30} label="GName" />
      <Ellipse cx={70} cy={185} label="AgeLimit" />
      <Box x={30} y={70} w={110} h={60} title="Group" lines={[]} />
      <line x1={70} y1={48} x2={70} y2={70} stroke="currentColor" strokeWidth="1.2" />
      <line x1={70} y1={130} x2={70} y2={167} stroke="currentColor" strokeWidth="1.2" />
      <line x1={140} y1={100} x2={190} y2={100} stroke="currentColor" strokeWidth="1.5" />
      <text x={162} y={94} fontSize="11" fontWeight="700">
        1
      </text>
      <Diamond cx={280} cy={100} hw={90} hh={45} label="Participate" />
      <Ellipse cx={280} cy={25} label="Result" />
      <line x1={280} y1={55} x2={280} y2={65} stroke="currentColor" strokeWidth="1.2" />
      <line x1={370} y1={100} x2={430} y2={100} stroke="currentColor" strokeWidth="1.5" />
      <text x={398} y={94} fontSize="11" fontWeight="700">
        n
      </text>
      <Box x={430} y={70} w={110} h={60} title="Participant" lines={[]} />
      <Ellipse cx={455} cy={25} label="PID" />
      <Ellipse cx={545} cy={25} label="Name" />
      <Ellipse cx={500} cy={185} label="Age" />
      <line x1={455} y1={43} x2={465} y2={70} stroke="currentColor" strokeWidth="1.2" />
      <line x1={530} y1={43} x2={505} y2={70} stroke="currentColor" strokeWidth="1.2" />
      <line x1={500} y1={167} x2={500} y2={130} stroke="currentColor" strokeWidth="1.2" />
    </Frame>
  );
}

// ---------------------------------------------------------------------------
// Week 6, Q4 & Q6 — 2-3-4 tree diagrams
// ---------------------------------------------------------------------------
function TreeNode({ x, y, label }) {
  const w = Math.max(34, label.length * 11 + 14);
  return (
    <g>
      <rect x={x - w / 2} y={y - 16} width={w} height={32} rx={4} fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeWidth="1.3" />
      <text x={x} y={y + 5} textAnchor="middle" fontSize="13" fontWeight="600" fontFamily="ui-monospace, monospace">
        {label}
      </text>
    </g>
  );
}

export function Tree234Final() {
  const nodes = {
    root: { x: 200, y: 30, label: "38" },
    c24: { x: 90, y: 110, label: "24" },
    c5159: { x: 310, y: 110, label: "51 59" },
    l11: { x: 40, y: 190, label: "11" },
    l31: { x: 140, y: 190, label: "31" },
    l45: { x: 230, y: 190, label: "45" },
    l52: { x: 300, y: 190, label: "52" },
    l6673: { x: 385, y: 190, label: "66 73" },
  };
  const edges = [
    ["root", "c24"],
    ["root", "c5159"],
    ["c24", "l11"],
    ["c24", "l31"],
    ["c5159", "l45"],
    ["c5159", "l52"],
    ["c5159", "l6673"],
  ];
  return (
    <Frame viewBox="0 0 420 220" maxWidth={400}>
      {edges.map(([a, b], i) => (
        <line key={i} x1={nodes[a].x} y1={nodes[a].y + 16} x2={nodes[b].x} y2={nodes[b].y - 16} stroke="currentColor" strokeWidth="1.3" />
      ))}
      {Object.values(nodes).map((n, i) => (
        <TreeNode key={i} {...n} />
      ))}
    </Frame>
  );
}

export function Tree234Search() {
  const nodes = {
    root: { x: 240, y: 30, label: "J" },
    c: { x: 110, y: 110, label: "C" },
    nt: { x: 380, y: 110, label: "N T" },
    a: { x: 50, y: 190, label: "A" },
    egh: { x: 165, y: 190, label: "E G H" },
    kl: { x: 300, y: 190, label: "K L" },
    p: { x: 380, y: 190, label: "P" },
    uy: { x: 450, y: 190, label: "U Y" },
  };
  const edges = [
    ["root", "c"],
    ["root", "nt"],
    ["c", "a"],
    ["c", "egh"],
    ["nt", "kl"],
    ["nt", "p"],
    ["nt", "uy"],
  ];
  return (
    <Frame viewBox="0 0 500 220" maxWidth={460}>
      {edges.map(([a, b], i) => (
        <line key={i} x1={nodes[a].x} y1={nodes[a].y + 16} x2={nodes[b].x} y2={nodes[b].y - 16} stroke="currentColor" strokeWidth="1.3" />
      ))}
      {Object.values(nodes).map((n, i) => (
        <TreeNode key={i} {...n} />
      ))}
    </Frame>
  );
}

// ---------------------------------------------------------------------------
// Week 7, Q3 — wait-for graph options (edges verified pixel-by-pixel against
// the source PDF image rather than guessed)
// ---------------------------------------------------------------------------
const WAIT_FOR_POSITIONS = {
  T1: { x: 70, y: 40 },
  T2: { x: 230, y: 40 },
  T4: { x: 70, y: 160 },
  T3: { x: 230, y: 160 },
};

export function WaitForGraph({ edges, id }) {
  const r = 26;
  return (
    <Frame viewBox="0 0 300 200" maxWidth={220}>
      <ArrowDefs id={`arrow-${id}`} />
      {edges.map(([from, to], i) => {
        const a = WAIT_FOR_POSITIONS[from];
        const b = WAIT_FOR_POSITIONS[to];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const len = Math.sqrt(dx * dx + dy * dy);
        const ux = dx / len;
        const uy = dy / len;
        const x1 = a.x + ux * r;
        const y1 = a.y + uy * r;
        const x2 = b.x - ux * (r + 8);
        const y2 = b.y - uy * (r + 8);
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="currentColor"
            strokeWidth="1.5"
            markerEnd={`url(#arrow-${id})`}
          />
        );
      })}
      {Object.entries(WAIT_FOR_POSITIONS).map(([label, p]) => (
        <g key={label}>
          <circle cx={p.x} cy={p.y} r={r} fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeWidth="1.5" />
          <text x={p.x} y={p.y + 5} textAnchor="middle" fontSize="13" fontWeight="700">
            {label}
          </text>
        </g>
      ))}
    </Frame>
  );
}

export const WAIT_FOR_EDGES = {
  a: [
    ["T4", "T1"],
    ["T3", "T1"],
    ["T4", "T3"],
    ["T3", "T2"],
  ],
  b: [
    ["T4", "T1"],
    ["T3", "T1"],
    ["T4", "T3"],
    ["T2", "T3"],
  ],
  c: [
    ["T1", "T4"],
    ["T1", "T3"],
    ["T2", "T3"],
    ["T3", "T4"],
  ],
  d: [
    ["T4", "T1"],
    ["T1", "T3"],
    ["T4", "T3"],
    ["T2", "T3"],
  ],
};

// ---------------------------------------------------------------------------
// Week 8, Q5 — recovery timeline against two checkpoints + system failure
// ---------------------------------------------------------------------------
export function RecoveryTimeline() {
  const cp1 = 180;
  const cp2 = 340;
  const fail = 500;
  const rows = [
    { label: "T1", x1: 30, x2: 110, y: 50 },
    { label: "T2", x1: 45, x2: 180, y: 78 },
    { label: "T3", x1: 200, x2: 300, y: 106 },
    { label: "T4", x1: 320, x2: 430, y: 134 },
    { label: "T5", x1: 310, x2: 500, y: 162 },
    { label: "T6", x1: 300, x2: 500, y: 190 },
  ];
  return (
    <Frame viewBox="0 0 560 260" maxWidth={480}>
      <ArrowDefs id="arrowTimeline" />
      <line x1={15} y1={20} x2={545} y2={20} stroke="currentColor" strokeWidth="1.5" markerEnd="url(#arrowTimeline)" />
      {[cp1, cp2, fail].map((x, i) => (
        <line key={i} x1={x} y1={20} x2={x} y2={225} stroke="currentColor" strokeWidth="1.3" />
      ))}
      {rows.map((r, i) => (
        <g key={i}>
          <line x1={r.x1} y1={r.y} x2={r.x2} y2={r.y} stroke="currentColor" strokeWidth="1.3" />
          <line x1={r.x1} y1={r.y - 6} x2={r.x1} y2={r.y + 6} stroke="currentColor" strokeWidth="1.3" />
          <line x1={r.x2} y1={r.y - 6} x2={r.x2} y2={r.y + 6} stroke="currentColor" strokeWidth="1.3" />
          <text x={(r.x1 + r.x2) / 2} y={r.y - 8} textAnchor="middle" fontSize="11" fontWeight="600">
            {r.label}
          </text>
        </g>
      ))}
      <text x={cp1} y={240} textAnchor="middle" fontSize="10.5" fontWeight="700">
        Check Point 1
      </text>
      <text x={cp2} y={240} textAnchor="middle" fontSize="10.5" fontWeight="700">
        Check Point 2
      </text>
      <text x={fail} y={240} textAnchor="middle" fontSize="10.5" fontWeight="700">
        System Failure
      </text>
    </Frame>
  );
}

// ---------------------------------------------------------------------------
// Week 8, Q6 — the two query-optimization trees, side by side
// ---------------------------------------------------------------------------
function QueryTree({ ox, nodes, edges, caption }) {
  return (
    <g transform={`translate(${ox},0)`}>
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].x}
          y1={nodes[a].y + 8}
          x2={nodes[b].x}
          y2={nodes[b].y - 12}
          stroke="currentColor"
          strokeWidth="1.2"
        />
      ))}
      {Object.entries(nodes).map(([k, n]) => (
        <text key={k} x={n.x} y={n.y} textAnchor="middle" fontSize="11.5" fontWeight="400">
          {n.label}
        </text>
      ))}
      <text x={135} y={295} textAnchor="middle" fontSize="12.5" fontWeight="700">
        {caption}
      </text>
    </g>
  );
}

export function QueryTreesW8Q6() {
  const fig1Nodes = {
    proj: { x: 135, y: 20, label: "Π vehicle_name, owner_name" },
    sel: { x: 135, y: 60, label: "σ service_cost > 5000" },
    join2: { x: 135, y: 100, label: "⋈" },
    join1: { x: 75, y: 160, label: "⋈" },
    owner: { x: 210, y: 160, label: "Owner" },
    vehicle: { x: 30, y: 220, label: "Vehicle" },
    service: { x: 130, y: 220, label: "Service_Record" },
  };
  const fig1Edges = [
    ["proj", "sel"],
    ["sel", "join2"],
    ["join2", "join1"],
    ["join2", "owner"],
    ["join1", "vehicle"],
    ["join1", "service"],
  ];
  const fig2Nodes = {
    proj: { x: 135, y: 20, label: "Π vehicle_name, owner_name" },
    join2: { x: 135, y: 70, label: "⋈" },
    join1: { x: 75, y: 130, label: "⋈" },
    owner: { x: 215, y: 130, label: "Owner" },
    vehicle: { x: 30, y: 190, label: "Vehicle" },
    sel: { x: 135, y: 190, label: "σ service_cost > 5000" },
    service: { x: 135, y: 230, label: "Service_Record" },
  };
  const fig2Edges = [
    ["proj", "join2"],
    ["join2", "join1"],
    ["join2", "owner"],
    ["join1", "vehicle"],
    ["join1", "sel"],
    ["sel", "service"],
  ];
  return (
    <Frame viewBox="0 0 560 310" maxWidth={560}>
      <QueryTree ox={0} nodes={fig1Nodes} edges={fig1Edges} caption="Figure 1" />
      <line x1={290} y1={10} x2={290} y2={280} stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />
      <QueryTree ox={290} nodes={fig2Nodes} edges={fig2Edges} caption="Figure 2" />
    </Frame>
  );
}
