import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`,
        {
            headers: {
                cookie: req.headers.get("cookie") ?? "",
            },
            cache: "no-store",
        }
    );

    if (!res.ok) {
        return NextResponse.json(null, { status: 401 });
    }

    return NextResponse.json(await res.json());
}
