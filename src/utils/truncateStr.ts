export default function truncateStr(str: string, max = 180): string {
  if (str.length <= max) return str;

  let shortStr: string = str.slice(0, max);
  const lastSpaceIdx = shortStr.lastIndexOf(" ");
  shortStr = shortStr.slice(0, lastSpaceIdx);

  return `${shortStr}...`;
}
