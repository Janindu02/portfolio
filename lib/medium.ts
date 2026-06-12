export interface MediumPost {
  title: string;
  link: string;
  pubDate: string;
  formattedDate: string;
  description: string;
  categories: string[];
  readTime: string;
  thumbnail: string | null;
}

/* ── Helpers ──────────────────────────────────────────────────── */

function unwrapCDATA(s: string): string {
  const m = s.match(/^<!\[CDATA\[([\s\S]*?)\]\]>$/);
  return m ? m[1].trim() : s.trim();
}

function getTag(xml: string, tag: string): string {
  // matches both plain <tag> and namespace <ns:tag>
  const re = new RegExp(
    `<(?:[a-zA-Z]+:)?${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</(?:[a-zA-Z]+:)?${tag}>`,
    "i",
  );
  const m = xml.match(re);
  return m ? unwrapCDATA(m[1]) : "";
}

function getAllTags(xml: string, tag: string): string[] {
  const re = new RegExp(
    `<(?:[a-zA-Z]+:)?${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</(?:[a-zA-Z]+:)?${tag}>`,
    "gi",
  );
  const out: string[] = [];
  let m;
  while ((m = re.exec(xml)) !== null) out.push(unwrapCDATA(m[1]));
  return out;
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function excerpt(html: string, max = 200): string {
  const plain = stripHtml(html);
  return plain.length > max ? plain.slice(0, max - 1) + "…" : plain;
}

function firstImage(html: string): string | null {
  const m = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return m ? m[1] : null;
}

function readTime(html: string): string {
  const words = stripHtml(html).split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 200))} min read`;
}

function fmtDate(raw: string): string {
  try {
    const d = new Date(raw);
    if (isNaN(d.getTime())) return raw;
    return d.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return raw;
  }
}

/* ── Parser ──────────────────────────────────────────────────── */

function parseRSS(xml: string): MediumPost[] {
  const posts: MediumPost[] = [];
  const itemRe = /<item>([\s\S]*?)<\/item>/gi;
  let m;

  while ((m = itemRe.exec(xml)) !== null) {
    const item = m[1];

    const title = getTag(item, "title");

    // <link> in RSS 2.0 is a plain text element (not an attribute)
    const linkMatch = item.match(/<link>\s*([^\s<]+)\s*<\/link>/i);
    const link = linkMatch ? linkMatch[1] : getTag(item, "guid");

    const pubDate = getTag(item, "pubDate");
    const descHtml = getTag(item, "description");
    const contentHtml = getTag(item, "encoded") || descHtml; // content:encoded

    const categories = getAllTags(item, "category").filter(Boolean);

    if (!title || !link) continue;

    posts.push({
      title,
      link,
      pubDate,
      formattedDate: fmtDate(pubDate),
      description: excerpt(descHtml) || "Read this article on Medium.",
      categories,
      readTime: readTime(contentHtml),
      thumbnail: firstImage(contentHtml) || firstImage(descHtml),
    });
  }

  return posts;
}

/* ── Public API ─────────────────────────────────────────────── */

export async function fetchMediumPosts(
  username: string,
): Promise<MediumPost[]> {
  try {
    const res = await fetch(`https://medium.com/feed/@${username}`, {
      next: { revalidate: 1800 }, // background refresh every 30 min
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; Portfolio/1.0)",
        Accept: "application/rss+xml, application/xml, text/xml, */*",
      },
    });
    if (!res.ok) return [];
    return parseRSS(await res.text());
  } catch {
    return [];
  }
}
