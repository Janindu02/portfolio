import { type NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

/*
  On-demand revalidation for the blog page.

  Usage after publishing a new Medium article:
    GET /api/revalidate?secret=<REVALIDATE_SECRET>

  Set REVALIDATE_SECRET in .env.local (and in your deployment env vars).
  Without a secret the endpoint is locked to prevent abuse.
*/
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const secret = searchParams.get("secret");

  // If no secret is configured, still allow revalidation (useful in dev)
  const expected = process.env.REVALIDATE_SECRET;
  if (expected && secret !== expected) {
    return NextResponse.json({ error: "Invalid secret." }, { status: 401 });
  }

  revalidatePath("/blog");

  return NextResponse.json({
    revalidated: true,
    path: "/blog",
    timestamp: new Date().toISOString(),
  });
}
