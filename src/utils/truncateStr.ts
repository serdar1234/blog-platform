const MAX_LENGTH = 52;
const MAX_LENGTH_PREVIEW = 90;

export default function truncateStr(str: string, length = MAX_LENGTH): string {
  if (str.length <= length) return str;

  let shortStr: string = str.slice(0, length);
  const lastSpaceIdx = shortStr.lastIndexOf(" ");

  if (lastSpaceIdx === -1 || lastSpaceIdx > length) {
    shortStr = shortStr.slice(0, MAX_LENGTH_PREVIEW);
  } else {
    shortStr = shortStr.slice(0, lastSpaceIdx);
  }

  return `${shortStr}${length != 13 ? "..." : ""}`;
}
