"use client";

import { PdfViewer } from "@naverpay/react-pdf";
import { useCallback } from "react";

const PDF_URL =
  "https://kr.object.ncloudstorage.com/workvisa/id-photo/8opvktzeu6r-1738456560277.pdf";

function Home() {
  const handleRenderPDFError = useCallback((e: unknown) => {
    // error logging
    console.error(e);

    // 접속 기기
    const userAgent = navigator.userAgent;
    console.log(userAgent);
  }, []);

  return (
    <main>
      <PdfViewer pdfUrl={PDF_URL} onErrorPDFRender={handleRenderPDFError} />
    </main>
  );
}

export default Home;
