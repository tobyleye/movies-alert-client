"use client";

import { useEffect } from "react";

export function ScrollToTop() {
  useEffect(() => {
    window.scrollTo({
      behavior: "smooth",
      top: 0,
    });
  }, []);
  return null;
}
