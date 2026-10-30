import { markdownForPath, notFoundMarkdown } from "@/data/site";

const HEADERS = {
  "Content-Type": "text/markdown; charset=utf-8",
  Vary: "Accept",
  "Cache-Control": "public, max-age=0, s-maxage=3600",
};

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ path?: string[] }> },
) {
  const { path = [] } = await params;
  const pathname = `/${path.map((segment) => decodeURIComponent(segment)).join("/")}`;
  const markdown = markdownForPath(pathname);

  if (markdown === null) {
    return new Response(notFoundMarkdown(pathname), {
      status: 404,
      headers: HEADERS,
    });
  }

  return new Response(markdown, { status: 200, headers: HEADERS });
}
