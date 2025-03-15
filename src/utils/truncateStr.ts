export default function truncateStr(str: string, length = 60): string {
  if (str.length <= length) return str;

  let shortStr: string = str.slice(0, length);
  const lastSpaceIdx = shortStr.lastIndexOf(" ");
  shortStr = shortStr.slice(0, lastSpaceIdx);

  return `${shortStr}${length != 13 ? "..." : ""}`;
}
