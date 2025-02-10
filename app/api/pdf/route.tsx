import { renderToStream } from "@react-pdf/renderer";
import { NextResponse } from "next/server";

import { ResumePDFTemplate } from "@/components/pdf-template";

export const runtime = "nodejs";

export async function GET() {
  try {
    const stream = await renderToStream(<ResumePDFTemplate />);

    // Buffer 타입으로 chunks 배열 선언
    const chunks: Buffer[] = [];

    // Promise를 사용하여 스트림 데이터 수집
    await new Promise((resolve, reject) => {
      stream.on("data", (chunk: Buffer) => chunks.push(chunk));
      stream.on("end", () => resolve(true));
      stream.on("error", (err) => {
        console.error("PDF 스트림 생성 중 오류:", err);
        reject(err);
      });
    });

    const pdfBuffer = Buffer.concat(chunks);

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=resume.pdf",
      },
    });
  } catch (error) {
    console.error("PDF 생성 중 오류:", error);
    return NextResponse.json({ error: "PDF 생성 실패" }, { status: 500 });
  }
}
