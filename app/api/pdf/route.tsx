import { NextResponse } from "next/server";
import { ResumePDFTemplate } from "@/components/pdf-template";
import { renderToBuffer } from "@react-pdf/renderer";
import { toast } from "react-toastify";

export async function GET() {
  try {
    const pdfBuffer = await renderToBuffer(<ResumePDFTemplate />);

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=resume.pdf",
      },
    });
  } catch (error) {
    console.error("PDF 생성 중 오류:", error);
    toast.error(`PDF 생성 중 오류가 발생했습니다: ${error}`);
    return NextResponse.json({ error: "PDF 생성 실패" }, { status: 500 });
  }
}
