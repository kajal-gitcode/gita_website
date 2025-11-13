export const go = (path) => {
  // 1. Remove all leading slashes
  let clean = path.replace(/^\/+/, "");

  // 2. Remove ANY number of repeated gitasupersite/ prefixes
  clean = clean.replace(/^(gitasupersite\/)+/g, "");

  // 3. Prevent accidental extra slashes
  clean = clean.replace(/^\/+/, "");

  // 4. Return final internal path (Router basename will prepend /gitasupersite automatically)
  return `/${clean}`;
};
