"use client";

import { useState } from "react";
import { toast } from "react-toastify";

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
      if (error instanceof Error) {
        console.error("PDF 다운로드 중 오류:", error);
        toast.error(`PDF 다운로드 중 오류가 발생했습니다: ${error.message}`);
      }

      toast.error(`PDF 다운로드 중 알 수 없는 오류가 발생했습니다: ${error}`);
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
