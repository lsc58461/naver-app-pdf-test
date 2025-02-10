import { NextResponse } from "next/server";
import { ResumePDFTemplate } from "@/components/pdf-template";
import { renderToBuffer } from "@react-pdf/renderer";

export async function GET() {
  try {
    console.log("PDF 생성 시작...");
    const pdfBuffer = await renderToBuffer(<ResumePDFTemplate />);
    console.log("PDF 버퍼 생성 완료:", { bufferSize: pdfBuffer.length });

    const isBuffer = Buffer.isBuffer(pdfBuffer);
    console.log("Buffer 검증 결과:", { isBuffer });

    if (!isBuffer) {
      console.error("Buffer 변환 실패:", {
        receivedType: typeof pdfBuffer,
        value: pdfBuffer,
      });
      throw new Error(
        `Buffer 변환 실패 ${JSON.stringify({
          receivedType: typeof pdfBuffer,
          value: pdfBuffer,
        })}`,
      );
    }

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'inline; filename="resume.pdf"',
        "Content-Length": pdfBuffer.length.toString(),
        "Cache-Control": "no-cache",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  } catch (err) {
    if (err instanceof Error) {
      console.error("PDF 생성 중 오류:", {
        name: err.name,
        message: err.message,
        stack: err.stack,
        cause: err.cause,
      });

      return NextResponse.json(
        { error: { message: err.message } },
        { status: 500 },
      );
    }
  }
}
