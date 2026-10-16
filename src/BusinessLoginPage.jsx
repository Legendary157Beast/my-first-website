import React, { useState } from "react";

const OFFICIAL_SITE = "https://mayleennutricare.com";

function BusinessLoginPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeInfoModal, setActiveInfoModal] = useState(null);

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  const onOpenModal = (modalName) => {
    setActiveInfoModal(modalName);
  };

  return (
    <>
      <style>{`
        :root {
          --mnc-green: #176b45;
          --mnc-green-dark: #0e4e32;
          --mnc-green-soft: #e7f2eb;
          --mnc-text: #14231c;
          --mnc-muted: #718078;
          --mnc-border: rgba(23, 107, 69, 0.12);
          --mnc-white-glass: rgba(255, 255, 255, 0.76);
        }
          .mnc-radhe-stage {
  inset: 45px 8px 45px;
}

.mnc-radhe-feather {
  width: 175px;
  height: 265px;
  opacity: 0.28;
}

.mnc-radhe-text {
  max-width: 100%;
  padding: 12px;

  transform:
    rotateX(5deg)
    rotateY(-3deg);
}

.mnc-radhe-title {
  font-size: 39px;
  line-height: 0.95;
}

.mnc-radhe-title span {
  margin-top: 5px;
  font-size: 28px;
}

.mnc-radhe-subtitle {
  margin-top: 14px;
  font-size: 8px;
  letter-spacing: 0.18em;
}

.mnc-radhe-line {
  width: 52px;
}

@keyframes mncBusinessRadheFloat {
  0%,
  100% {
    transform:
      translate3d(0,0,0)
      rotateX(5deg)
      rotateY(-3deg);
  }

  50% {
    transform:
      translate3d(0,-6px,0)
      rotateX(6deg)
      rotateY(2deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .mnc-radhe-text,
  .mnc-radhe-feather {
    animation: none;
  }
}

        * {
          box-sizing: border-box;
        }

        .mnc-login-page {
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
          color: var(--mnc-text);
          background:
            radial-gradient(
              circle at 12% 8%,
              rgba(159, 205, 175, 0.24),
              transparent 27%
            ),
            radial-gradient(
              circle at 88% 22%,
              rgba(221, 239, 228, 0.65),
              transparent 32%
            ),
            linear-gradient(
              180deg,
              #fbfdfb 0%,
              #f5faf6 48%,
              #ffffff 100%
            );
          font-family:
            Inter,
            ui-sans-serif,
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;
        }

        .mnc-login-page::before {
          content: "";
          position: fixed;
          inset: 0;
          pointer-events: none;
          background:
            radial-gradient(
              circle at 50% 30%,
              rgba(255,255,255,0.82),
              transparent 34%
            );
          z-index: 0;
        }

        .mnc-page-layer {
          position: relative;
          z-index: 1;
        }

        /* =====================================================
           TOP BAR
        ====================================================== */

        .mnc-topbar {
          padding: 12px 20px;
        }

        .mnc-topbar-inner {
          max-width: 1320px;
          margin: 0 auto;
          min-height: 44px;
          padding: 0 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;

          background: rgba(255, 255, 255, 0.72);
          border: 1px solid rgba(255, 255, 255, 0.95);
          border-radius: 18px;
          box-shadow:
            0 10px 35px rgba(24, 74, 48, 0.05),
            inset 0 1px 0 rgba(255,255,255,0.95);

          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }

        .mnc-welcome {
          color: #506057;
          font-size: 13px;
          font-weight: 500;
        }

        .mnc-top-links {
          display: flex;
          align-items: center;
          gap: 22px;
        }

        .mnc-top-links a {
          color: #44524b;
          text-decoration: none;
          font-size: 13px;
          font-weight: 500;
          transition:
            color 0.25s ease,
            transform 0.25s ease;
        }

        .mnc-top-links a:hover {
          color: var(--mnc-green);
          transform: translateY(-1px);
        }

        /* =====================================================
           HEADER
        ====================================================== */

        .mnc-header {
          padding: 5px 20px 0;
          position: relative;
          z-index: 20;
        }

        .mnc-header-inner {
          max-width: 1320px;
          min-height: 82px;
          margin: 0 auto;
          padding: 15px 22px;

          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 30px;

          background: var(--mnc-white-glass);
          border: 1px solid rgba(255, 255, 255, 0.92);
          border-radius: 26px;

          box-shadow:
            0 18px 50px rgba(17, 72, 44, 0.07),
            inset 0 1px 0 rgba(255,255,255,0.95);

          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }

        .mnc-brand {
          flex-shrink: 0;
        }

        .mnc-brand a {
          display: block;
          color: inherit;
          text-decoration: none;
        }

        .mnc-brand-title {
          font-size: 23px;
          line-height: 1;
          font-weight: 700;
          letter-spacing: -0.7px;
        }

        .mnc-brand-subtitle {
          margin-top: 7px;
          color: #7a887f;
          font-size: 9px;
          letter-spacing: 2.1px;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .mnc-nav {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 20px;
        }

        .mnc-nav > a,
        .mnc-dropdown-label {
          color: #425048;
          text-decoration: none;
          font-size: 12px;
          font-weight: 500;
          white-space: nowrap;
          transition:
            color 0.25s ease,
            transform 0.25s ease;
        }

        .mnc-nav > a:hover,
        .mnc-dropdown-label:hover {
          color: var(--mnc-green);
          transform: translateY(-1px);
        }

        .mnc-dropdown {
          position: relative;
        }

        .mnc-dropdown-label {
          cursor: pointer;
        }

        .mnc-dropdown-menu {
          position: absolute;
          top: calc(100% + 15px);
          left: -15px;
          min-width: 215px;
          padding: 10px;

          background: rgba(255,255,255,0.94);
          border: 1px solid rgba(23,107,69,0.09);
          border-radius: 18px;
          box-shadow:
            0 20px 50px rgba(17,72,44,0.12),
            inset 0 1px 0 rgba(255,255,255,0.9);

          opacity: 0;
          visibility: hidden;
          transform: translateY(8px);
          transition: all 0.25s ease;

          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
        }

        .mnc-dropdown:hover .mnc-dropdown-menu {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        .mnc-dropdown-menu a {
          display: block;
          padding: 9px 11px;
          border-radius: 10px;
          color: #47554d;
          text-decoration: none;
          font-size: 12px;
        }

        .mnc-dropdown-menu a:hover {
          background: #edf6f0;
          color: var(--mnc-green);
        }

        .mnc-menu-button {
          display: none;
          width: 42px;
          height: 42px;
          border: 1px solid var(--mnc-border);
          border-radius: 13px;
          background: rgba(255,255,255,0.85);
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
        }

        .mnc-menu-button span {
          width: 18px;
          height: 1.5px;
          background: #304239;
          border-radius: 999px;
        }

        /* =====================================================
           LOGIN HERO
        ====================================================== */

        .mnc-login-area {
          position: relative;
          padding: 58px 20px 72px;
        }

        .mnc-floating-orb {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          filter: blur(1px);
        }

        .mnc-orb-one {
          width: 160px;
          height: 160px;
          top: 120px;
          left: -60px;
          background:
            radial-gradient(
              circle at 35% 30%,
              rgba(255,255,255,0.95),
              rgba(191,221,201,0.5) 42%,
              rgba(144,189,158,0.08) 70%
            );
          box-shadow:
            0 20px 70px rgba(48, 119, 77, 0.08);
        }

        .mnc-orb-two {
          width: 230px;
          height: 230px;
          right: -100px;
          top: 65px;
          background:
            radial-gradient(
              circle at 35% 28%,
              rgba(255,255,255,0.95),
              rgba(221,237,226,0.58) 40%,
              rgba(145,193,160,0.08) 72%
            );
        }

        .mnc-login-shell {
          position: relative;
          max-width: 1160px;
          margin: 0 auto;

          display: grid;
          grid-template-columns: 0.92fr 1.08fr;
          align-items: stretch;
          gap: 30px;
        }

        /* =====================================================
           VISUAL SIDE
        ====================================================== */

        .mnc-visual-card {
          position: relative;
          min-height: 625px;
          overflow: hidden;

          border-radius: 38px;
          border: 1px solid rgba(255,255,255,0.9);

          background:
            radial-gradient(
              circle at 50% 27%,
              rgba(255,255,255,0.98),
              rgba(234,245,237,0.94) 43%,
              rgba(214,235,221,0.9) 100%
            );

          box-shadow:
            0 30px 70px rgba(20, 76, 48, 0.09),
            inset 0 1px 0 rgba(255,255,255,0.95);
        }

        .mnc-visual-card::before {
          content: "";
          position: absolute;
          width: 330px;
          height: 330px;
          left: 50%;
          top: 31%;
          transform: translate(-50%, -50%);
          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              rgba(255,255,255,0.92) 0%,
              rgba(255,255,255,0.42) 35%,
              rgba(255,255,255,0) 72%
            );
        }

        .mnc-visual-card::after {
          content: "";
          position: absolute;
          width: 280px;
          height: 40px;
          left: 50%;
          bottom: 100px;
          transform: translateX(-50%);
          border-radius: 50%;

          background: rgba(50, 90, 63, 0.14);
          filter: blur(17px);
        }

        .mnc-visual-label {
          position: absolute;
          top: 28px;
          left: 28px;

          padding: 8px 12px;
          border-radius: 999px;
          color: #536159;
          background: rgba(255,255,255,0.58);
          border: 1px solid rgba(255,255,255,0.95);

          font-size: 10px;
          letter-spacing: 1.4px;
          text-transform: uppercase;

          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

    
/* =====================================================
   SHRI RADHE BRAND VISUAL
   Real feather image + 3D-style calligraphy
===================================================== */

.mnc-radhe-stage {
  position: absolute;

  inset: 72px 18px 58px;

  display: flex;
  align-items: center;
  justify-content: center;

  overflow: hidden;

  perspective: 1200px;
}


/* =====================================================
   REAL PEACOCK FEATHER
===================================================== */

.mnc-radhe-image {
  position: absolute;

  left: 50%;
  top: 50%;

  width: auto;

  /*
    Control primarily by height so the complete
    portrait feather remains visible.
  */
  height: min(78%, 540px);

  max-width: 68%;

  transform:
    translate(-50%, -51%)
    rotate(-7deg);

  object-fit: contain;
  object-position: center;

  opacity: 0.34;

  z-index: 1;

  filter:
    drop-shadow(
      0 22px 30px
      rgba(22, 79, 53, 0.14)
    );

  pointer-events: none;

  animation:
    mnc-radhe-feather-float
    7s
    ease-in-out
    infinite;
}


/* =====================================================
   BRAND TEXT
===================================================== */

.mnc-radhe-text {
  position: relative;

  z-index: 5;

  width: min(
    100%,
    500px
  );

  padding: 20px 15px;

  text-align: center;

  transform:
    perspective(1000px)
    rotateX(6deg)
    rotateY(-4deg);

  transform-style: preserve-3d;

  animation:
    mnc-radhe-text-float
    5.5s
    ease-in-out
    infinite;
}


/* Main calligraphy */

.mnc-radhe-title {
  position: relative;

  color: #173f2b;

  font-family:
    "Segoe Script",
    "Brush Script MT",
    "URW Chancery L",
    "Lucida Calligraphy",
    cursive;

  font-size:
    clamp(
      44px,
      5.2vw,
      62px
    );

  line-height: 0.94;

  font-weight: 700;

  letter-spacing: -1px;

  white-space: nowrap;

  text-shadow:
    1px 1px 0 #ffffff,
    3px 3px 0
      rgba(61, 102, 78, 0.22),
    6px 8px 0
      rgba(61, 102, 78, 0.13),
    10px 16px 25px
      rgba(23, 63, 43, 0.18);
}


/* Second line */

.mnc-radhe-title span {
  display: block;

  margin-top: 7px;

  font-family:
    "Segoe Script",
    "Brush Script MT",
    "URW Chancery L",
    cursive;

  font-size:
    clamp(
      28px,
      3.5vw,
      41px
    );

  line-height: 1;

  letter-spacing: -0.6px;
}


/* Small tagline */

.mnc-radhe-subtitle {
  margin-top: 16px;

  color: #5d7668;

  font-size: 10px;

  font-weight: 700;

  letter-spacing: 0.22em;

  line-height: 1.45;

  text-transform: uppercase;
}


/* Decorative line */

.mnc-radhe-line {
  width: 70px;
  height: 2px;

  margin: 13px auto 0;

  border-radius: 999px;

  background:
    linear-gradient(
      90deg,
      transparent,
      #176b45,
      transparent
    );
}


/* =====================================================
   LIGHT 3D MOVEMENT
===================================================== */

@keyframes mnc-radhe-feather-float {

  0%,
  100% {
    transform:
      translate(-50%, -51%)
      rotate(-7deg);
  }

  50% {
    transform:
      translate(-50%, -54%)
      rotate(-3.5deg);
  }
}


@keyframes mnc-radhe-text-float {

  0%,
  100% {
    transform:
      perspective(1000px)
      translate3d(0, 0, 0)
      rotateX(6deg)
      rotateY(-4deg);
  }

  50% {
    transform:
      perspective(1000px)
      translate3d(0, -7px, 0)
      rotateX(8deg)
      rotateY(3deg);
  }
}


        /* =====================================================
           LOGIN PANEL
        ====================================================== */

        .mnc-login-card {
          position: relative;
          min-height: 625px;
          padding: 56px 58px;

          display: flex;
          flex-direction: column;
          justify-content: center;

          border-radius: 38px;
          border: 1px solid rgba(255,255,255,0.95);

          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,0.93),
              rgba(248,252,249,0.82)
            );

          box-shadow:
            0 30px 70px rgba(20, 76, 48, 0.075),
            inset 0 1px 0 rgba(255,255,255,0.95);

          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }

        .mnc-login-card::before {
          content: "";
          position: absolute;
          width: 180px;
          height: 180px;
          top: -65px;
          right: -65px;
          border-radius: 50%;
          background:
            radial-gradient(
              circle,
              rgba(207,231,214,0.54),
              rgba(207,231,214,0)
            );
          pointer-events: none;
        }

        .mnc-login-content {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 475px;
          margin: 0 auto;
        }

        .mnc-login-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 18px;
          color: var(--mnc-green);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .mnc-login-eyebrow::before {
          content: "";
          width: 26px;
          height: 1px;
          background: var(--mnc-green);
        }

        .mnc-login-title {
          margin: 0;
          color: #14231c;
          font-size: clamp(28px, 3vw, 39px);
          line-height: 1.1;
          font-weight: 650;
          letter-spacing: -1.3px;
        }

        .mnc-login-title-highlight {
          background:
            linear-gradient(
              90deg,
              #113b27,
              #23794f
            );
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .mnc-login-rule {
          width: 56px;
          height: 3px;
          margin: 22px 0 32px;
          border-radius: 999px;
          background:
            linear-gradient(
              90deg,
              var(--mnc-green),
              #8ab69b
            );
        }

        .mnc-input-wrap {
          position: relative;
        }

        .mnc-input {
          width: 100%;
          height: 56px;
          padding: 0 18px;

          border: 1px solid rgba(23,107,69,0.12);
          border-radius: 16px;
          outline: none;

          background:
            rgba(255,255,255,0.78);

          color: #26332c;
          font-size: 14px;

          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.9),
            0 8px 26px rgba(21,74,47,0.035);

          transition:
            border-color 0.25s ease,
            box-shadow 0.25s ease,
            background 0.25s ease;
        }

        .mnc-input:focus {
          border-color: rgba(23,107,69,0.4);
          background: #ffffff;
          box-shadow:
            0 0 0 4px rgba(23,107,69,0.07),
            0 12px 30px rgba(21,74,47,0.07);
        }

        .mnc-forgot {
          display: flex;
          justify-content: flex-end;
          margin-top: 11px;

          color: #68776f;
          font-size: 12px;
          text-decoration: none;
        }

        .mnc-forgot:hover {
          color: var(--mnc-green);
        }

        .mnc-login-button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          min-height: 55px;
          margin-top: 25px;
          padding: 0 20px;

          border: 0;
          border-radius: 16px;
          cursor: pointer;

          color: #ffffff;
          text-align: center;
          text-decoration: none;
          background:
            linear-gradient(
              135deg,
              #154e33,
              #23794f
            );

          box-shadow:
            0 13px 30px rgba(23,107,69,0.23);

          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.35px;

          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease,
            filter 0.25s ease;
        }

        .mnc-login-button:hover {
          transform: translateY(-2px);
          box-shadow:
            0 18px 36px rgba(23,107,69,0.28);
          filter: brightness(1.03);
        }

        .mnc-login-button:active {
          transform: translateY(0);
        }

        .mnc-alert {
          margin: 24px auto 0;
          color: #7a877f;
          font-size: 11px;
          line-height: 1.7;
          text-align: center;
          max-width: 430px;
        }

        .mnc-separator {
          height: 1px;
          margin: 27px 0 23px;
          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(23,107,69,0.12),
              transparent
            );
        }

        .mnc-signup {
          color: #68756e;
          text-align: center;
          font-size: 13px;
        }

        .mnc-signup a {
          color: var(--mnc-green);
          font-weight: 700;
          text-decoration: none;
        }

        .mnc-signup a:hover {
          text-decoration: underline;
        }

        .mnc-description {
          margin: 36px auto 0;
          max-width: 790px;

          color: #738079;
          font-size: 12px;
          line-height: 1.85;
          text-align: center;
        }

        /* =====================================================
           FOOTER
        ====================================================== */

        .mnc-footer {
          padding: 0 20px 20px;
        }

        .mnc-footer-inner {
          max-width: 1320px;
          margin: 0 auto;
          padding: 55px 42px 28px;

          border-radius: 34px 34px 24px 24px;

          color: #dce8df;

          background:
            radial-gradient(
              circle at 75% 10%,
              rgba(76,137,99,0.15),
              transparent 28%
            ),
            linear-gradient(
              145deg,
              #12261b,
              #0c1912
            );

          box-shadow:
            0 25px 65px rgba(14,48,30,0.13),
            inset 0 1px 0 rgba(255,255,255,0.04);
        }

        .mnc-footer-grid {
          display: grid;
          grid-template-columns:
            0.95fr
            0.9fr
            1.15fr
            1.55fr;
          gap: 50px;
        }

        .mnc-footer-column h3 {
          margin: 0 0 18px;
          color: #ffffff;
          font-size: 14px;
          font-weight: 650;
        }

        .mnc-footer-column a {
          display: block;
          width: fit-content;
          margin-bottom: 10px;

          color: #aebfb4;
          text-decoration: none;
          font-size: 12px;
          line-height: 1.45;

          transition:
            color 0.2s ease,
            transform 0.2s ease;
        }

        .mnc-footer-column a:hover {
          color: #ffffff;
          transform: translateX(2px);
        }

        .mnc-footer-column p {
          margin: 0 0 10px;
          color: #aebfb4;
          font-size: 12px;
          line-height: 1.7;
        }

        .mnc-footer-office {
          color: #ffffff !important;
          font-weight: 650;
        }

        .mnc-footer-bottom {
          margin-top: 38px;
          padding-top: 20px;

          border-top: 1px solid rgba(255,255,255,0.08);

          color: #819489;
          font-size: 11px;
          text-align: center;
        }

        /* =====================================================
   RESPONSIVE
===================================================== */

/* =====================================================
   TABLET / SMALL DESKTOP
===================================================== */

@media (max-width: 1180px) {

  .mnc-nav {
    gap: 13px;
  }

  .mnc-nav > a,
  .mnc-dropdown-label {
    font-size: 11px;
  }

  .mnc-login-shell {
    grid-template-columns:
      0.82fr
      1.18fr;
  }

  .mnc-login-card {
    padding: 48px 42px;
  }

  .mnc-radhe-image {
    height: min(76%, 500px);
    max-width: 70%;
  }

  .mnc-radhe-title {
    font-size: clamp(
      42px,
      5vw,
      58px
    );
  }

  .mnc-radhe-title span {
    font-size: clamp(
      27px,
      3.5vw,
      39px
    );
  }
}


/* =====================================================
   TABLET
===================================================== */

@media (max-width: 980px) {

  .mnc-navigation-desktop {
    display: none;
  }

  .mnc-menu-button {
    display: flex;
  }


  /* MOBILE / TABLET NAV */

  .mnc-nav {
    position: absolute;

    top:
      calc(
        100% + 8px
      );

    left: 20px;
    right: 20px;

    display: none;

    flex-direction: column;
    align-items: stretch;

    gap: 0;

    padding: 12px;

    border-radius: 22px;

    border:
      1px solid
      rgba(255,255,255,0.92);

    background:
      rgba(255,255,255,0.96);

    box-shadow:
      0 25px 55px
      rgba(20,76,48,0.13);

    backdrop-filter:
      blur(18px);

    -webkit-backdrop-filter:
      blur(18px);
  }

  .mnc-nav.mnc-nav-open {
    display: flex;
  }

  .mnc-nav > a,
  .mnc-dropdown-label {
    display: block;

    padding:
      11px 12px;

    font-size: 13px;
  }


  .mnc-dropdown-menu {
    position: static;

    display: none;

    opacity: 1;
    visibility: visible;

    transform: none;

    border: 0;

    box-shadow: none;

    background:
      transparent;

    padding:
      2px 0 8px 12px;
  }

  .mnc-dropdown:hover
  .mnc-dropdown-menu {
    display: block;
  }


  /* STACK AUTH */

  .mnc-login-shell {
    grid-template-columns: 1fr;

    max-width: 720px;

    gap: 22px;
  }


  /* VISUAL */

  .mnc-visual-card {
    min-height: 480px;
  }


  /* LOGIN */

  .mnc-login-card {
    min-height: auto;
  }
}


/* =====================================================
   MOBILE
===================================================== */

@media (max-width: 680px) {

  /* -----------------------------------------------
     TOP BAR
  ------------------------------------------------ */

  .mnc-topbar {
    display: none;
  }


  /* -----------------------------------------------
     HEADER
  ------------------------------------------------ */

  .mnc-header {
    padding:
      8px 10px 0;
  }

  .mnc-header-inner {
    min-height: 64px;

    padding:
      11px 13px;

    border-radius: 18px;

    gap: 10px;
  }

  .mnc-brand-title {
    font-size: 19px;
  }

  .mnc-brand-subtitle {
    font-size: 7px;

    letter-spacing:
      1.4px;
  }


  /* -----------------------------------------------
     MAIN AREA
  ------------------------------------------------ */

  .mnc-login-area {
    padding:
      28px 10px 46px;
  }

  .mnc-login-shell {
    gap: 12px;
  }


  /* -----------------------------------------------
     VISUAL CARD
  ------------------------------------------------ */

  .mnc-visual-card {
    width: 100%;

    min-height: 350px;
    height: 350px;

    border-radius: 24px;

    overflow: hidden;
  }


  /* Remove old product positioning */
  .mnc-product-stage,
  .mnc-product,
  .mnc-product-copy {
    display: none;
  }


  /* -----------------------------------------------
     VISUAL LABEL
  ------------------------------------------------ */

  .mnc-visual-label {
    top: 16px;
    left: 16px;

    max-width:
      calc(100% - 32px);

    padding:
      7px 10px;

    font-size: 7px;

    letter-spacing:
      0.9px;

    white-space: nowrap;

    overflow: hidden;

    text-overflow: ellipsis;

    z-index: 20;
  }


  /* -----------------------------------------------
     RADHE STAGE
  ------------------------------------------------ */

  .mnc-radhe-stage {
    inset:
      38px 4px 26px;
  }


  /* -----------------------------------------------
     REAL FEATHER
  ------------------------------------------------ */

  .mnc-radhe-image {
    height: 72%;

    max-width: 69%;

    left: 50%;
    top: 51%;

    transform:
      translate(-50%, -50%)
      rotate(-6deg);

    opacity: 0.28;

    filter:
      drop-shadow(
        0 14px 18px
        rgba(22,79,53,0.10)
      );
  }


  /* -----------------------------------------------
     CALLIGRAPHY
  ------------------------------------------------ */

  .mnc-radhe-text {
    width: 100%;

    max-width: 350px;

    padding:
      8px 5px;

    transform:
      perspective(800px)
      rotateX(4deg)
      rotateY(-2deg);
  }

  .mnc-radhe-title {
    font-size:
      clamp(
        34px,
        10.5vw,
        43px
      );

    line-height:
      0.96;

    letter-spacing:
      -0.7px;

    white-space:
      normal;
  }

  .mnc-radhe-title span {
    margin-top: 5px;

    font-size:
      clamp(
        24px,
        7.8vw,
        31px
      );

    line-height:
      1;
  }

  .mnc-radhe-subtitle {
    margin-top: 12px;

    max-width: 270px;

    margin-left: auto;
    margin-right: auto;

    font-size: 6.5px;

    line-height: 1.45;

    letter-spacing:
      0.13em;
  }

  .mnc-radhe-line {
    width: 50px;

    height: 2px;

    margin-top: 10px;
  }


  /* -----------------------------------------------
     LOGIN CARD
  ------------------------------------------------ */

  .mnc-login-card {
    min-height: auto;

    padding:
      30px 18px;

    border-radius: 24px;
  }

  .mnc-login-title {
    font-size: 28px;

    line-height: 1.08;
  }

  .mnc-login-rule {
    margin:
      18px 0 27px;
  }


  /* -----------------------------------------------
     INPUTS / BUTTON
  ------------------------------------------------ */

  .mnc-input,
  .mnc-login-button {
    min-height: 52px;
  }


  /* -----------------------------------------------
     FOOTER
  ------------------------------------------------ */

  .mnc-footer {
    padding:
      0 10px 10px;
  }

  .mnc-footer-inner {
    padding:
      38px 20px 22px;

    border-radius:
      26px 26px 18px 18px;
  }

  .mnc-footer-grid {
    grid-template-columns: 1fr;

    gap: 28px;
  }
}


/* =====================================================
   VERY SMALL PHONES
===================================================== */

@media (max-width: 420px) {

  .mnc-header-inner {
    padding:
      10px 12px;
  }

  .mnc-brand-title {
    font-size: 18px;
  }

  .mnc-brand-subtitle {
    font-size: 6.5px;

    letter-spacing:
      1.2px;
  }


  .mnc-login-area {
    padding:
      24px 8px 40px;
  }


  .mnc-visual-card {
    min-height: 320px;
    height: 320px;

    border-radius: 22px;
  }


  .mnc-radhe-stage {
    inset:
      34px 2px 22px;
  }


  .mnc-radhe-image {
    height: 68%;

    max-width: 67%;

    opacity: 0.25;
  }


  .mnc-radhe-text {
    max-width: 320px;
  }


  .mnc-radhe-title {
    font-size: 34px;
  }

  .mnc-radhe-title span {
    font-size: 23px;
  }


  .mnc-radhe-subtitle {
    font-size: 6px;

    letter-spacing:
      0.11em;

    max-width: 240px;
  }


  .mnc-radhe-line {
    width: 45px;
  }


  .mnc-visual-label {
    top: 13px;
    left: 13px;

    max-width:
      calc(100% - 26px);

    font-size: 6.5px;

    padding:
      6px 8px;
  }


  .mnc-login-card {
    padding:
      25px 14px;
  }

  .mnc-login-title {
    font-size: 25px;
  }
}


/* =====================================================
   TOUCH DEVICES
===================================================== */

@media (hover: none) and (pointer: coarse) {

  .mnc-radhe-image,
  .mnc-radhe-text {
    animation: none;
  }

  .mnc-login-button {
    transition:
      background-color
      0.2s ease,
      transform
      0.15s ease;
  }

  .mnc-login-button:hover {
    transform: none;
  }

  .mnc-login-button:active {
    transform:
      scale(0.98);
  }
}


/* =====================================================
   REDUCED MOTION
===================================================== */

@media (prefers-reduced-motion: reduce) {

  .mnc-radhe-image,
  .mnc-radhe-text {
    animation: none;
  }

  .mnc-login-button,
  .mnc-top-links a,
  .mnc-nav > a,
  .mnc-dropdown-label,
  .mnc-footer-column a {
    transition: none;
  }
}
       
        /* =====================================================
           LAYOUT-ONLY RESPONSIVE OVERRIDES
           Existing content, links, handlers and behavior unchanged.
        ====================================================== */

        .mnc-header-inner,
        .mnc-topbar-inner,
        .mnc-footer-inner {
          width: 100%;
        }

        .mnc-login-shell {
          width: 100%;
          max-width: 1200px;
          grid-template-columns: minmax(0, 0.96fr) minmax(0, 1.04fr);
          align-items: stretch;
        }

        .mnc-visual-card,
        .mnc-login-card {
          width: 100%;
          min-width: 0;
        }

        .mnc-radhe-stage {
          min-width: 0;
        }

        .mnc-radhe-image {
          max-width: 72%;
        }

        .mnc-login-content {
          min-width: 0;
        }

        .mnc-footer-grid > * {
          min-width: 0;
        }

        @media (max-width: 1024px) {
          .mnc-login-shell {
            max-width: 820px;
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .mnc-visual-card {
            min-height: 500px;
          }

          .mnc-login-card {
            min-height: auto;
          }

          .mnc-radhe-image {
            height: min(76%, 500px);
            max-width: 70%;
          }
        }

        @media (max-width: 680px) {
          .mnc-header,
          .mnc-login-area,
          .mnc-footer {
            padding-left: 10px;
            padding-right: 10px;
          }

          .mnc-header-inner {
            width: 100%;
            min-width: 0;
          }

          .mnc-nav {
            left: 10px;
            right: 10px;
          }

          .mnc-login-area {
            padding-top: 28px;
            padding-bottom: 44px;
          }

          .mnc-login-shell {
            width: 100%;
            gap: 14px;
          }

          .mnc-visual-card {
            min-height: 340px;
            height: auto;
            aspect-ratio: 1 / 0.96;
            border-radius: 24px;
          }

          .mnc-radhe-stage {
            inset: 38px 4px 24px;
          }

          .mnc-radhe-image {
            height: 72%;
            max-width: 70%;
          }

          .mnc-radhe-text {
            width: 100%;
            max-width: 100%;
            min-width: 0;
            padding-left: 4px;
            padding-right: 4px;
          }

          .mnc-login-card {
            padding-left: 18px;
            padding-right: 18px;
            border-radius: 24px;
          }

          .mnc-login-content {
            max-width: 100%;
          }

          .mnc-footer-inner {
            width: 100%;
            padding-left: 20px;
            padding-right: 20px;
          }

          .mnc-footer-grid {
            grid-template-columns: 1fr;
            gap: 28px;
          }
        }

        @media (max-width: 420px) {
          .mnc-login-area {
            padding-top: 24px;
            padding-bottom: 38px;
          }

          .mnc-visual-card {
            min-height: 310px;
            aspect-ratio: 1 / 0.92;
            border-radius: 22px;
          }

          .mnc-radhe-stage {
            inset: 34px 2px 20px;
          }

          .mnc-radhe-image {
            height: 68%;
            max-width: 68%;
          }

          .mnc-radhe-text {
            padding-left: 0;
            padding-right: 0;
          }

          .mnc-login-card {
            padding-left: 14px;
            padding-right: 14px;
          }

          .mnc-login-button {
            padding-left: 14px;
            padding-right: 14px;
          }
        }

  `}</style>

      <div className="mnc-login-page">
        <div className="mnc-page-layer">

          {/* =================================================
             HEADER — OFFICIAL CONTENT UNCHANGED
          ================================================== */}

          <header className="mnc-header">
            <div className="mnc-header-inner">

              <div className="mnc-brand">
                <a href={OFFICIAL_SITE}>
                  <div className="mnc-brand-title">
                    Shri Radhe Wellness Centre
                  </div>

                  <div className="mnc-brand-subtitle">
                    Glow From Inside, Shine Outside.
                  </div>
                </a>
              </div>

              <button
                type="button"
                className="mnc-menu-button"
                aria-label="Open navigation"
                aria-expanded={mobileMenuOpen}
                onClick={() =>
                  setMobileMenuOpen((current) => !current)
                }
              >
                <span />
                <span />
                <span />
              </button>

              <nav
                className={`mnc-nav ${
                  mobileMenuOpen ? "mnc-nav-open" : ""
                }`}
              >
                <a href={OFFICIAL_SITE} onClick={closeMenu}>
                  Home
                </a>

                <a
                  href={`${OFFICIAL_SITE}/shop`}
                  onClick={closeMenu}
                >
                  Shop
                </a>

                <div className="mnc-dropdown">
                  <span className="mnc-dropdown-label">
                    abc
                  </span>

                  <div className="mnc-dropdown-menu">
                    <a href={`${OFFICIAL_SITE}/mission`}>
                      Our Mission
                    </a>

                    <a href={`${OFFICIAL_SITE}/vision`}>
                      Our Vision
                    </a>

                    <a href={`${OFFICIAL_SITE}/legals`}>
                      
                    </a>

                    <a href={`${OFFICIAL_SITE}/nodal-officer`}>
                      
                    </a>

                    <a href={`${OFFICIAL_SITE}/it-return`}>
                     
                    </a>

                    <a href={`${OFFICIAL_SITE}/financial`}>
                     
                    </a>
                  </div>
                </div>

                <a
                  href={`${OFFICIAL_SITE}/science`}
                  onClick={closeMenu}
                >
                  Science
                </a>

                <a
                  href={`${OFFICIAL_SITE}/support-center`}
                  onClick={closeMenu}
                >
                  Need Help
                </a>
              </nav>
            </div>
          </header>

          {/* =================================================
             LOGIN SECTION
             
             CONTENT PRESERVED:
             Health and Success this Way !!
             Input
             Forgot Password?
             Brand Partner Login
             Alert text
             Sign Up
             Official description
          ================================================== */}

          <main className="mnc-login-area">

            <div className="mnc-floating-orb mnc-orb-one" />
            <div className="mnc-floating-orb mnc-orb-two" />

            <div className="mnc-login-shell">

              {/* 3D-STYLE VISUAL ONLY
                  No official wording/content changed. */}

            

                <section className="mnc-visual-card">

  <div className="mnc-visual-label">
    Shri Radhe Wellness Centre
  </div>

<div className="mnc-radhe-stage">

  <img
    src="/peacock-feather.png"
    alt=""
    aria-hidden="true"
    className="mnc-radhe-image"
  />

  <div className="mnc-radhe-text">

    <div className="mnc-radhe-title">
      Shri Radhe

      <span>
        Wellness Centre
      </span>
    </div>

    <div className="mnc-radhe-subtitle">
      Glow From Inside, Shine Outside.
    </div>

    <div className="mnc-radhe-line" />

  </div>

</div>

</section>
              {/* LOGIN */}

              <section className="mnc-login-card">

                <div className="mnc-login-content">

                  <div className="mnc-login-eyebrow">
                    Brand Partner
                  </div>

                  <h1 className="mnc-login-title">
                    Health and{" "}
                    <span className="mnc-login-title-highlight">
                      Success this Way !!
                    </span>
                  </h1>

                  <div className="mnc-login-rule" />

                  <div>

                   

                    <a
                      href="mailto:Support@mayleennutricare.com?subject=Brand%20Partner%20Password%20Assistance"
                      className="mnc-forgot"
                    >
                      Forgot Password?
                    </a>

                    <a
                      href="https://share.google/yfAGNigisTXmfV8n5"
                      className="mnc-login-button"
                    >
                      Become Our Brand Partner Here
                    </a>
                  </div>

                 

                  <div className="mnc-separator" />

                  <p className="mnc-description">
                    
                  </p>

                </div>

              </section>
            </div>
          </main>

          {/* =================================================
             FOOTER — OFFICIAL CONTENT UNCHANGED
          ================================================== */}

          <footer className="mnc-footer">
            <div className="mnc-footer-inner">

              <div className="mnc-footer-grid">

                <div className="mnc-footer-column">
                  <h3>Useful Links</h3>

                  <a href={`${OFFICIAL_SITE}/about-us`}>
                    About Us
                  </a>

                  <a href={`${OFFICIAL_SITE}/gallery`}>
                    Gallery
                  </a>


                  <a href={`${OFFICIAL_SITE}/disclaimer`}>
                    Disclaimer
                  </a>
                </div>

                <div className="mnc-footer-column">
                  <h3>Policies</h3>

                  <a href={`${OFFICIAL_SITE}/refund-policy`}>
                    Refund Policy
                  </a>

                  <a href={`${OFFICIAL_SITE}/terms-conditions`}>
                    Terms &amp; Conditions
                  </a>
                  <button
                   type="button"
                onClick={() => onOpenModal("privacy")}>
                  <a >
                    Privacy Policy
                  </a>
                  </button>

                  <a href={`${OFFICIAL_SITE}/shipping-policy`}>
                    Shipping Policy
                  </a>
                </div>

                <div className="mnc-footer-column">
                  <h3>Contact Us</h3>

                  <p className="mnc-footer-office">
                    Office :
                  </p>

                  <p>
                    Shri Radhe Wellness Centre
                  </p>

                  <p>
                    Rawatpur Officer's Colony,
                    Kanpur Nagar, Kanpur,
                    Uttar Pradesh – India.
                  </p>

                  <p className="mnc-footer-office">
                    Company's Registered Office :
                    Hyderabad
                  </p>

                  <p>
                    1800-2744-700
                  </p>

                  <p>
                    Support@mayleennutricare.com
                  </p>

                  
                </div>

              </div>

            </div>
          </footer>

        </div>
      </div>
    </>
  );
}

export default BusinessLoginPage;