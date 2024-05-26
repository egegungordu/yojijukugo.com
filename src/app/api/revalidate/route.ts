import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const schema = z.object({
  path: z.string(),
  type: z.enum(["page", "layout"]),
});

export async function GET(request: NextRequest) {
  const { success, data } = schema.safeParse(
    Object.fromEntries(request.nextUrl.searchParams),
  );
  if (!success) {
    return NextResponse.json({
      error: "Invalid request",
    });
  }
  revalidatePath(data.path, data.type);
  console.log("revalidated", data.path, data.type);
  return NextResponse.json({
    revalidated: true,
    now: Date.now(),
    cache: "no-store",
  });
}
