import { useCallback, useEffect, useState } from "react";

export function useSidebarWidth(initialWidth = 300) {
  const [sidebarWidth, setSidebarWidth] = useState(initialWidth);
  const [maxWidth, setMaxWidth] = useState(800);

  const saveSidebarWidth = useCallback((width: number) => {
    document.cookie = `atlas-sidebar-width=${width.toString()}; path=/; max-age=31536000; SameSite=Strict`;
  }, []);

  const updateSidebarWidth = useCallback(
    (width: number) => {
      const clampedWidth = Math.min(width, maxWidth);
      setSidebarWidth(clampedWidth);
      document.documentElement.style.setProperty(
        "--sidebar-width",
        `${clampedWidth}px`,
      );
      saveSidebarWidth(clampedWidth);
    },
    [maxWidth, saveSidebarWidth],
  );

  const calculateMaxWidth = useCallback(() => {
    const windowWidth = window.innerWidth;

    if (windowWidth < 768) {
      return 300;
    }

    const minContentWidth = windowWidth > 1024 ? 755 : 575;

    const maxWidthFromScreen = windowWidth / 2;
    const maxWidthFromContent = windowWidth - minContentWidth;

    return Math.min(maxWidthFromScreen, maxWidthFromContent, 800);
  }, []);

  useEffect(() => {
    const cookies = document.cookie.split(";");
    const widthCookie = cookies.find((cookie) =>
      cookie.trim().startsWith("atlas-sidebar-width="),
    );

    let restoredWidth = initialWidth;
    if (widthCookie) {
      const width = parseInt(widthCookie.split("=")[1]);
      if (!isNaN(width)) {
        restoredWidth = width;
      }
    }

    const initialMaxWidth = calculateMaxWidth();
    setMaxWidth(initialMaxWidth);

    const finalWidth = Math.min(restoredWidth, initialMaxWidth);
    setSidebarWidth(finalWidth);
    document.documentElement.style.setProperty(
      "--sidebar-width",
      `${finalWidth}px`,
    );
  }, [initialWidth, calculateMaxWidth]);

  useEffect(() => {
    const handleResize = () => {
      const newMaxWidth = calculateMaxWidth();
      setMaxWidth(newMaxWidth);

      if (sidebarWidth > newMaxWidth) {
        updateSidebarWidth(newMaxWidth);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [calculateMaxWidth, sidebarWidth, updateSidebarWidth]);
  
  useEffect(() => {
    const handleSidebarResize = (event: Event) => {
      const width = (event as CustomEvent<{ sidebarWidth: number }>).detail
        .sidebarWidth;
      updateSidebarWidth(width);
    };

    document.addEventListener("sidebar:resize", handleSidebarResize);
    return () =>
      document.removeEventListener("sidebar:resize", handleSidebarResize);
  }, [updateSidebarWidth]);

  return {
    sidebarWidth,
    maxWidth,
    updateSidebarWidth,
  };
}
