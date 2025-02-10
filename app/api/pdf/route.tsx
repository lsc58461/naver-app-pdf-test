import { NextResponse } from "next/server";
import { ResumePDFTemplate } from "@/components/pdf-template";
import { renderToBuffer } from "@react-pdf/renderer";
import { toast } from "react-toastify";

export async function GET() {
  try {
    const pdfBuffer = await renderToBuffer(<ResumePDFTemplate />);

    // buffer로 변환 제대로 되었는지 검증
    const isBuffer = Buffer.isBuffer(pdfBuffer);

    if (!isBuffer) {
      throw new Error("PDF 생성 실패: Buffer 변환 실패");
    }

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=resume.pdf",
      },
    });
  } catch (error) {
    console.error("PDF 생성 중 오류:", error);

    return NextResponse.json(
      { error: { massage: `PDF 생성 실패 ${error}` } },
      { status: 500 },
    );
  }
}
