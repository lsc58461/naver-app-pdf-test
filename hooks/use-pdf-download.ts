"use client";

import { useState } from "react";

function usePDFDownload() {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async () => {
    try {
      setIsLoading(true);

      const response = await fetch("/api/pdf", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("PDF 생성 실패");
      }

      // PDF 다운로드
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "pdf-test.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("PDF 다운로드 중 오류:", error);
      throw new Error(`PDF 다운로드 실패 : ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    handleDownload,
  };
}

export { usePDFDownload };
