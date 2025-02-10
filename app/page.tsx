"use client";

import dynamic from "next/dynamic";

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
        return (
          <Document file={PDF_URL}>
            <Page
              pageNumber={1}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          </Document>
        );
      }
      return PDFComponent;
    }),
  {
    ssr: false,
  },
);

export default PDFPage;
