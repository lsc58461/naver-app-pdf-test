"use client";

import { useState } from "react";
import { toast } from "react-toastify";

interface UsePDFDownloadOptions {
  fileName?: string;
}

function usePDFDownload(options: UsePDFDownloadOptions = {}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async () => {
    try {
      toast.info("PDF 다운로드 중입니다. 잠시만 기다려주세요.");
      setIsLoading(true);

      if (window.navigator.userAgent.includes("naver")) {
        throw new Error(
          "네이버 브라우저에서는 PDF 다운로드가 지원되지 않습니다. 크롬 브라우저를 이용해주세요.",
        );
      }

      const response = await fetch("/api/pdf", {
        method: "GET",
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage =
          errorData?.error?.message || "PDF 다운로드에 실패했습니다.";
        console.log(errorData.error.message);
        throw new Error(errorMessage);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = options.fileName || "pdf-test.pdf";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success("PDF 다운로드가 완료되었습니다.");
    } catch (error) {
      console.error(error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "알 수 없는 오류가 발생했습니다.";
      toast.error(errorMessage);
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
