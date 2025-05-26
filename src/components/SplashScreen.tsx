// src/components/SplashScreen.tsx
import React, { useEffect } from "react";
import "../scss/components/SplashScreen.scss";
import splashVideo from "../assets/splashVideo.mp4";
import logo from "../assets/img/vape-logo.png";

interface Props {
  onFinish: () => void;
}

const SplashScreen: React.FC<Props> = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="splash-screen">
      <video
        className="smoke-video"
        src={splashVideo}
        autoPlay
        loop
        muted
        playsInline
      />
      <img src={logo} alt="Brand Logo" className="logo" />
    </div>
  );
};

export default SplashScreen;
