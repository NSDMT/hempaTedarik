import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// Returns the logged-in user's discount rate (used by checkout page)
export async function GET() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id?: string } | undefined)?.id;

  if (!userId) return NextResponse.json({ discountRate: 0 });

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { discountRate: true },
  });

  return NextResponse.json({ discountRate: user?.discountRate ?? 0 });
}
