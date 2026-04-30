type Result<T> = { ok: true; value: T } | { ok: false; error: string };

interface RecordItem {
  id: string;
  title: string;
  score: number;
  tags: string[];
}

const records: RecordItem[] = [
  { id: "a1", title: "schema_driven_form_builder baseline", score: 72, tags: ["core", "very high"] },
  { id: "b2", title: "operational workflow", score: 88, tags: ["service", "portfolio"] }
];

function rank(items: RecordItem[], minimumScore: number): Result<RecordItem[]> {
  if (!Number.isFinite(minimumScore)) return { ok: false, error: "minimumScore must be numeric" };
  return { ok: true, value: items.filter((item) => item.score >= minimumScore).sort((a, b) => b.score - a.score) };
}

const result = rank(records, 75);
if (!result.ok) {
  console.error(result.error);
  process.exitCode = 1;
} else {
  console.log(JSON.stringify(result.value, null, 2));
}
