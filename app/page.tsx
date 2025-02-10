"use client";

import dynamic from "next/dynamic";
import "@/utils/pdf-worker-polyfills";
import { usePDFDownload } from "@/hooks/use-pdf-download";

const PDF_URL =
  "https://kr.object.ncloudstorage.com/workvisa/id-photo/8opvktzeu6r-1738456560277.pdf";

const PDFPage = dynamic(
  () =>
    import("react-pdf").then((mod) => {
      const { Document, Page, pdfjs } = mod;

      if (typeof window !== "undefined") {
        pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.mjs`;
      }

      function PDFComponent() {
        const { isLoading, handleDownload } = usePDFDownload();

        return (
          <div style={{ position: "relative" }}>
            <Document
              file={PDF_URL}
              loading={
                <div style={{ padding: "20px" }}>PDF 문서를 불러오는 중...</div>
              }
            >
              <Page
                pageNumber={1}
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            </Document>

            <button
              className="gap-16pxr text-16pxr text-blueDefault hover:text-blackLight max700:text-grayDark flex cursor-pointer items-center leading-6 font-bold"
              type="button"
              onClick={handleDownload}
              disabled={isLoading}
            >
              {isLoading ? "다운로드 대기 중" : "pdf 다운로드"}
            </button>
          </div>
        );
      }
      return PDFComponent;
    }),
  {
    ssr: false,
  },
);

export default PDFPage;
