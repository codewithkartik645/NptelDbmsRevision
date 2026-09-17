// Many questions embed plain-text tables/schedules (lines with "|").
// On a phone-width screen, wrapping those as normal prose turns them into
// unreadable soup. This splits the text into prose and table segments so
// prose still wraps naturally, while table segments scroll horizontally in
// a monospace block — like a real table — without ever widening the page.
export default function FormattedText({ text, className = "", tableClassName = "" }) {
  const lines = text.split("\n");
  const segments = [];
  let buffer = [];
  let bufferType = null;

  const flush = () => {
    if (buffer.length) segments.push({ type: bufferType, text: buffer.join("\n") });
    buffer = [];
  };

  for (const line of lines) {
    const type = line.includes("|") ? "table" : "prose";
    if (bufferType !== null && bufferType !== type) flush();
    bufferType = type;
    buffer.push(line);
  }
  flush();

  return (
    <div className={className}>
      {segments.map((seg, i) =>
        seg.type === "table" ? (
          <div key={i} className={`my-1.5 overflow-x-auto rounded ${tableClassName}`}>
            <pre className="whitespace-pre font-mono-num text-[12.5px] leading-relaxed">{seg.text}</pre>
          </div>
        ) : (
          <p key={i} className="whitespace-pre-wrap">
            {seg.text}
          </p>
        )
      )}
    </div>
  );
}
