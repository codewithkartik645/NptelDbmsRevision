import {
  ERContactUser,
  ERWindowsRoom,
  ERAnimals,
  ERGroupParticipant,
  Tree234Final,
  Tree234Search,
  WaitForGraph,
  WAIT_FOR_EDGES,
  RecoveryTimeline,
  QueryTreesW8Q6,
} from "./diagrams/Diagrams.jsx";

const REGISTRY = {
  ERContactUser,
  ERWindowsRoom,
  ERAnimals,
  ERGroupParticipant,
  Tree234Final,
  Tree234Search,
  RecoveryTimeline,
  QueryTreesW8Q6,
};

export default function DiagramRenderer({ diagram }) {
  if (!diagram) return null;
  const Component = REGISTRY[diagram];
  if (!Component) return null;
  return <Component />;
}

// Small wait-for-graph diagram used inline inside an option button (Week 7, Q3).
export function OptionDiagram({ diagramKey }) {
  if (!diagramKey || !diagramKey.startsWith("waitfor-")) return null;
  const variant = diagramKey.replace("waitfor-", "");
  const edges = WAIT_FOR_EDGES[variant];
  if (!edges) return null;
  return <WaitForGraph edges={edges} id={variant} />;
}
