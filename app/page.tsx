"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

const PDF_URL =
  "https://kr.object.ncloudstorage.com/workvisa/id-photo/8opvktzeu6r-1738456560277.pdf";

const PDFPage = dynamic(
  () =>
    import("react-pdf").then((mod) => {
      const { Document, Page, pdfjs } = mod;

      if (typeof window !== "undefined") {
        pdfjs.GlobalWorkerOptions.workerSrc =
          "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.8.69/pdf.worker.min.mjs";
      }

      function PDFComponent() {
        const [error, setError] = useState<Error | null>(null);
        const [isLoading, setIsLoading] = useState(true);

        return (
          <div style={{ position: "relative" }}>
            {error ? (
              <div
                style={{
                  padding: "20px",
                  color: "red",
                  border: "1px solid red",
                  borderRadius: "4px",
                }}
              >
                PDF 로딩 실패: {error.message}
              </div>
            ) : (
              <Document
                file={PDF_URL}
                onLoadError={(error) => {
                  console.error(error);
                  setError(error);
                }}
                onLoadSuccess={() => setIsLoading(false)}
                loading={
                  <div style={{ padding: "20px" }}>
                    PDF 문서를 불러오는 중...
                  </div>
                }
              >
                <Page
                  pageNumber={1}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  onError={(error) => {
                    console.error(error);
                    setError(error);
                  }}
                />
              </Document>
            )}
            {isLoading && !error && (
              <div style={{ padding: "20px" }}>PDF 문서를 불러오는 중...</div>
            )}
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
