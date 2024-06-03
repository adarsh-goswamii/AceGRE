/* eslint-disable no-restricted-globals */
import { useEffect, useState } from "react";

function useFullScreen(containerId) {
  const [isFullScreen, setIsFullScreen] = useState(false);

  function enterFullScreen(element) {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullscreen) {
      element.mozRequestFullscreen(); // Firefox
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen(); // Safari
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen(); // IE/Edge
    }
  }

  const exitFullScreen = () => {
    if (document.exitFullScreen) {
      document.exitFullScreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  };

  const fullScreenMode = () => {
    const container = document.getElementById(containerId);
    if (container !== null) {
      enterFullScreen(container);
    }
  };

  const toggleFullScreen = (e = null) => {
    if (e !== null) {
      e.stopPropagation();
    }
    if (isFullScreen) {
      exitFullScreen();
    } else {
      fullScreenMode();
    }
  };

  function isScreenLockSupported() {
    return "wakeLock" in navigator;
  }

  async function getScreenLock() {
    if (isScreenLockSupported()) {
      let screenLock;
      try {
        screenLock = await navigator.wakeLock.request("screen");
      } catch (err) {
        // console.log(err.name, err.message);
      }
      return screenLock;
    }
  }

  async function release() {
    let screenLock = await getScreenLock();
    if (typeof screenLock !== "undefined" && screenLock != null) {
      screenLock.release().then(() => {
        // console.log("Lock released ");
        screenLock = undefined;
      });
    }
  }

  useEffect(() => {
    window.addEventListener("resize", (_evt) => {
      if (window.innerHeight == screen.height) {
        setIsFullScreen(true);
      } else {
        setIsFullScreen(false);
      }
    });

    return () => {
      window.removeEventListener("resize", (_evt) => {
        if (window.innerHeight == screen.height) {
          setIsFullScreen(true);
        } else {
          setIsFullScreen(false);
        }
      });
    };
  }, []);

  useEffect(() => {
    if (isFullScreen) {
      getScreenLock();
    } else {
      release();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFullScreen]);

  return {
    toggleFullScreen,
    isFullScreen,
    exitFullScreen,
  };
}

export default useFullScreen;