export default function filterTags(tagList: { tag: string }[]): string[] {
  const filteredTags = tagList
    .map((entity: { tag: string }) => entity.tag)
    .filter((x: string) => x !== "");
  const s = new Set(filteredTags);

  return Array.from(s);
}
