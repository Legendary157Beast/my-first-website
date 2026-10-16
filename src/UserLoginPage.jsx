import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const OFFICIAL_SITE =
  "https://mayleennutricare.com";

function UserLoginPage({
  onLogin,
  onBrandPartnerLogin,
}) {
  const [mode, setMode] =
    useState("login");

  const [recoveryOpen, setRecoveryOpen] =
    useState(false);

  const [recoveryValue, setRecoveryValue] =
    useState("");

  const [recoveryCode, setRecoveryCode] =
    useState("");

  const [recoveryCodeSent, setRecoveryCodeSent] =
    useState(false);

  const [recoveryVerified, setRecoveryVerified] =
    useState(false);

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmNewPassword, setConfirmNewPassword] =
    useState("");

  const [showNewPassword, setShowNewPassword] =
    useState(false);

  const [showConfirmNewPassword, setShowConfirmNewPassword] =
    useState(false);

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [mobile, setMobile] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [verificationLoading, setVerificationLoading] =
    useState("");

  const [verificationMessage, setVerificationMessage] =
    useState("");

  const [emailCode, setEmailCode] =
    useState("");

  const [emailCodeSent, setEmailCodeSent] =
    useState(false);

  const [emailVerified, setEmailVerified] =
    useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const switchMode = (nextMode) => {
    setMode(nextMode);
    setRecoveryOpen(false);

    setError("");
    setVerificationMessage("");

    setName("");
    setEmail("");
    setMobile("");
    setPassword("");
    setConfirmPassword("");
    setEmailCode("");
    setEmailCodeSent(false);
    setEmailVerified(false);
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const openPasswordRecovery = () => {
    setRecoveryOpen(true);
    setRecoveryValue("");
    setRecoveryCode("");
    setRecoveryCodeSent(false);
    setRecoveryVerified(false);
    setNewPassword("");
    setConfirmNewPassword("");
    setError("");
    setVerificationMessage("");
  };

  const sendRecoveryCode = async () => {
    setError("");
    setVerificationMessage("");

    const value = recoveryValue.trim().toLowerCase();

    if (!validateEmail(value)) {
      setError("Enter a valid email address.");
      return;
    }

    setVerificationLoading("recovery-send");

    try {
      const response = await fetch("/api/auth/password-reset/send", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          channel: "email",
          value,
        }),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.error || "Unable to send a recovery code.");
      }

      setRecoveryValue(value);
      setRecoveryCodeSent(true);
      setRecoveryVerified(false);
      setVerificationMessage(
        result.message || "If an account matches, a recovery code has been sent."
      );
    } catch (requestError) {
      setError(
        requestError instanceof TypeError
          ? "Unable to reach the server. Please try again."
          : requestError.message || "Unable to send a recovery code."
      );
    } finally {
      setVerificationLoading("");
    }
  };

  const verifyRecoveryCode = async () => {
    setError("");
    setVerificationMessage("");

    if (!/^\d{6}$/.test(recoveryCode)) {
      setError("Enter the 6-digit recovery code.");
      return;
    }

    setVerificationLoading("recovery-verify");

    try {
      const response = await fetch("/api/auth/password-reset/verify", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          channel: "email",
          value: recoveryValue,
          code: recoveryCode,
        }),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.error || "Unable to verify this recovery code.");
      }

      setRecoveryVerified(true);
      setVerificationMessage("Contact verified. Choose a new password.");
    } catch (requestError) {
      setError(
        requestError instanceof TypeError
          ? "Unable to reach the server. Please try again."
          : requestError.message || "Unable to verify this recovery code."
      );
    } finally {
      setVerificationLoading("");
    }
  };

  const completePasswordRecovery = async (event) => {
    event.preventDefault();
    setError("");
    setVerificationMessage("");

    if (newPassword.length < 12) {
      setError("Password must contain at least 12 characters.");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setError("Passwords do not match.");
      return;
    }

    setVerificationLoading("recovery-complete");

    try {
      const response = await fetch("/api/auth/password-reset/complete", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          channel: "email",
          value: recoveryValue,
          newPassword,
        }),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.error || "Unable to reset the password.");
      }

      setEmail(recoveryValue);
      setPassword("");
      setRecoveryOpen(false);
      setVerificationMessage("Password updated. Log in with your new password.");
    } catch (requestError) {
      setError(
        requestError instanceof TypeError
          ? "Unable to reach the server. Please try again."
          : requestError.message || "Unable to reset the password."
      );
    } finally {
      setVerificationLoading("");
    }
  };

  const validateEmail = (value) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      value.trim()
    );
  };

  const validateMobile = (value) => {
    return /^[6-9]\d{9}$/.test(
      value.replace(/\s/g, "")
    );
  };

  const sendVerificationCode = async () => {
    setError("");
    setVerificationMessage("");

    const value = email.trim().toLowerCase();

    if (!validateEmail(value)) {
      setError("Please enter a valid email address first.");
      return;
    }

    setVerificationLoading("email-send");

    try {
      const response = await fetch("/api/auth/verification/send", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ channel: "email", value }),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.error || "Unable to send a verification code.");
      }

      setEmailCodeSent(true);
      setEmailVerified(false);

      setVerificationMessage("A verification code has been sent to your email.");
    } catch (requestError) {
      setError(
        requestError instanceof TypeError
          ? "Unable to reach the server. Please try again."
          : requestError.message || "Unable to send a verification code."
      );
    } finally {
      setVerificationLoading("");
    }
  };

  const verifyCode = async () => {
    setError("");
    setVerificationMessage("");

    const value = email.trim().toLowerCase();
    const code = emailCode;

    if (!/^\d{6}$/.test(code)) {
      setError("Enter the 6-digit verification code.");
      return;
    }

    setVerificationLoading("email-verify");

    try {
      const response = await fetch("/api/auth/verification/verify", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ channel: "email", value, code }),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.error || "Unable to verify this code.");
      }

      setEmailVerified(true);

      setVerificationMessage("Email verified.");
    } catch (requestError) {
      setError(
        requestError instanceof TypeError
          ? "Unable to reach the server. Please try again."
          : requestError.message || "Unable to verify this code."
      );
    } finally {
      setVerificationLoading("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    /* ==========================================
       CREATE ACCOUNT
    ========================================== */

    if (mode === "signup") {
      if (name.trim().length < 2) {
        setError(
          "Please enter your full name."
        );
        return;
      }

      if (!validateEmail(email)) {
        setError(
          "Please enter a valid email address."
        );
        return;
      }

      if (!validateMobile(mobile)) {
        setError(
          "Please enter a valid 10-digit mobile number."
        );
        return;
      }

      if (password.length < 12) {
        setError(
          "Password must contain at least 12 characters."
        );
        return;
      }

      if (
        password !== confirmPassword
      ) {
        setError(
          "Passwords do not match."
        );
        return;
      }

      if (!emailVerified) {
        setError("Verify your email address first.");
        return;
      }

    }

    /* ==========================================
       LOGIN
    ========================================== */

    if (
      email.trim() === "" &&
      mobile.trim() === ""
    ) {
      setError(
        "Enter your email or mobile number."
      );
      return;
    }

    if (password.length < 6) {
      setError(
        "Please enter your password."
      );
      return;
    }

    setLoading(true);

    try {
      const isSignup = mode === "signup";
      const response = await fetch(
        `/api/auth/${isSignup ? "register" : "login"}`,
        {
          method: "POST",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            isSignup
              ? {
                  name: name.trim(),
                  email: email.trim().toLowerCase(),
                  mobile: mobile.replace(/\s/g, ""),
                  password,
                }
              : {
                  identifier:
                    email.trim() ||
                    mobile.replace(/\s/g, ""),
                  password,
                }
          ),
        }
      );
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          result.error || result.message || "Unable to authenticate. Please try again."
        );
      }

      if (typeof onLogin === "function") {
        onLogin(result.user);
      }
    } catch (requestError) {
      setError(
        requestError instanceof TypeError
          ? "Unable to reach the server. Please try again."
          : requestError.message || "Unable to authenticate. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`

        :root {
          --mnc-green: #176b45;
          --mnc-green-dark: #0e4e32;
          --mnc-green-soft: #e7f2eb;
          --mnc-green-light: #d1fae5;
          --mnc-text: #14231c;
          --mnc-text-muted: #6b7c6f;
          --mnc-text-light: #9caaa1;
          --mnc-border: rgba(23,107,69,0.12);
          --mnc-border-focus: rgba(23,107,69,0.4);
          --mnc-white: #ffffff;
          --mnc-surface: #fbfdfb;
          --mnc-surface-elevated: #ffffff;
          --shadow-sm: 0 1px 2px rgba(20,76,48,0.04);
          --shadow-md: 0 4px 12px rgba(20,76,48,0.08);
          --shadow-lg: 0 12px 32px rgba(20,76,48,0.12);
          --shadow-xl: 0 24px 48px rgba(20,76,48,0.16);
          --radius-sm: 8px;
          --radius-md: 12px;
          --radius-lg: 16px;
          --radius-xl: 20px;
          --radius-full: 9999px;
          --transition-fast: 120ms ease;
          --transition-normal: 200ms ease;
          --transition-slow: 300ms ease;
        }

        * {
          box-sizing: border-box;
        }

        /* Background Video - At The Very Back */
        .mnc-user-bg-video {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 0;
          opacity: 0.5;
          pointer-events: none;
        }

        /* Mobile Optimization - Reduce video impact on small screens */
        @media (max-width: 767px) {
          .mnc-user-bg-video {
            opacity: 0.3; /* More subtle on mobile */
          }
        }

        /* Very small screens - hide video, use poster instead */
        @media (max-width: 480px) {
          .mnc-user-bg-video {
            display: none;
          }
          .mnc-user-page {
            background-image: url('/login-bg-poster.jpg');
            background-size: cover;
            background-position: center;
          }
        }

        /* Respect reduced motion preference */
        @media (prefers-reduced-motion: reduce) {
          .mnc-user-bg-video {
            display: none;
          }
          .mnc-user-page {
            background-image: url('/login-bg-poster.jpg');
            background-size: cover;
            background-position: center;
          }
        }

        .mnc-user-page {
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;

          color: var(--mnc-text);

          background: transparent;

          font-family:
            Inter,
            ui-sans-serif,
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;
        }

        .mnc-user-layer {
          position: relative;
          z-index: 1;
        }

        /* =====================================
           HEADER
        ===================================== */

        .mnc-user-header {
          padding: 14px 16px 0;
        }

        .mnc-user-header-inner {
          max-width: 1320px;
          min-height: 82px;
          margin: 0 auto;
          padding: 15px 22px;

          display: flex;
          align-items: center;
          justify-content: space-between;

          border:
            1px solid rgba(255,255,255,0.92);

          border-radius: 26px;

          background:
            rgba(255,255,255,0.76);

          box-shadow:
            0 18px 50px
              rgba(17,72,44,0.07),
            inset 0 1px 0
              rgba(255,255,255,0.95);

          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }

        .mnc-user-brand {
          text-decoration: none;
          color: inherit;
        }

        .mnc-user-brand-title {
          font-size: 23px;
          font-weight: 700;
          letter-spacing: -0.7px;
        }

        .mnc-user-brand-subtitle {
          margin-top: 7px;
          color: #7a887f;
          font-size: 9px;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .mnc-user-header-link {
          color: #45534c;
          text-decoration: none;
          font-size: 12px;
          font-weight: 500;
        }

        .mnc-user-header-link:hover {
          color: var(--mnc-green);
        }

        /* =====================================
           MAIN
        ===================================== */

        .mnc-user-main {
          padding: 52px 20px 72px;
        }

        .mnc-user-shell {
          max-width: 1160px;
          margin: 0 auto;

          display: grid;
          grid-template-columns:
            0.92fr 1.08fr;

          gap: 30px;
        }

        /* =====================================
           VISUAL SIDE
        ===================================== */

        .mnc-user-visual {
          position: relative;
          min-height: 625px;
          overflow: hidden;

          border-radius: 38px;
          border:
            1px solid rgba(255,255,255,0.9);

          background:
            radial-gradient(
              circle at 50% 27%,
              rgba(255,255,255,0.98),
              rgba(234,245,237,0.94) 43%,
              rgba(214,235,221,0.9) 100%
            );

          box-shadow:
            0 30px 70px
              rgba(20,76,48,0.09),
            inset 0 1px 0
              rgba(255,255,255,0.95);
        }

        .mnc-user-visual-label {
          position: absolute;
          top: 28px;
          left: 28px;

          padding: 8px 12px;

          border-radius: 999px;

          color: #536159;

          background:
            rgba(255,255,255,0.58);

          border:
            1px solid rgba(255,255,255,0.95);

          font-size: 10px;
          letter-spacing: 1.4px;
          text-transform: uppercase;
        }


/----------------------
   ANIMATION
------------------------------------- */

@keyframes mncRadheFloat {
  0%,
  100% {
    transform:
      translate3d(0,0,0)
      rotateX(8deg)
      rotateY(-5deg);
  }

  50% {
    transform:
      translate3d(0,-9px,0)
      rotateX(10deg)
      rotateY(4deg);
  }
}

@keyframes mncFeatherFloat {
  0%,
  100% {
    transform:
      translate(-50%, -54%)
      rotate(-12deg);
  }

  50% {
    transform:
      translate(-50%, -57%)
      rotate(-8deg);
  }
}

        /* =====================================
           AUTH CARD
        ===================================== */

        .mnc-user-card {
          position: relative;

          min-height: 625px;

          padding: 56px 58px;
          }

          /* =====================================
   SHRI RADHE PREMIUM 3D EMBLEM
===================================== */

.mnc-radhe-stage {
  position: absolute;
  inset: 55px 15px 50px;

  display: flex;
  align-items: center;
  justify-content: center;

  overflow: hidden;
}

.mnc-radhe-image {
  position: absolute;

  width: 310px;
  max-width: 78%;
  height: auto;

  left: 50%;
  top: 50%;

  transform:
    translate(-50%, -51%)
    rotate(-8deg);

  object-fit: contain;

  opacity: 1;

  z-index: 1;

  filter:
    drop-shadow(
      0 18px 25px
      rgba(20,80,55,0.14)
    );

  pointer-events: none;
}

.mnc-radhe-text {
  position: relative;

  z-index: 5;

  width: 100%;
  max-width: 470px;

  padding: 20px;

  text-align: center;

  transform:
    perspective(1000px)
    rotateX(5deg)
    rotateY(-4deg);

  animation:
    radhe-text-float
    5.5s
    ease-in-out
    infinite;
}

.mnc-radhe-title {
  color: #173f2b;

  font-family:
    "Segoe Script",
    "Brush Script MT",
    "URW Chancery L",
    cursive;

  font-size: clamp(
    45px,
    5vw,
    64px
  );

  line-height: 0.92;

  font-weight: 700;

  letter-spacing: -1px;

  text-shadow:
    1px 1px 0 #ffffff,
    3px 3px 0 rgba(60,100,75,0.22),
    6px 7px 0 rgba(60,100,75,0.13),
    10px 16px 24px
      rgba(20,65,43,0.18);
}

.mnc-radhe-title span {
  display: block;

  margin-top: 8px;

  font-size: clamp(
    29px,
    3.4vw,
    42px
  );
}

.mnc-radhe-subtitle {
  margin-top: 17px;

  color: #5d7668;

  font-size: 10px;

  font-weight: 700;

  letter-spacing: 0.22em;

  text-transform: uppercase;
}

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

@keyframes radhe-text-float {
  0%,
  100% {
    transform:
      perspective(1000px)
      translate3d(0,0,0)
      rotateX(5deg)
      rotateY(-4deg);
  }

  50% {
    transform:
      perspective(1000px)
      translate3d(0,-7px,0)
      rotateX(7deg)
      rotateY(3deg);
  }
}


/* -------------------------------------
   TEXT
------------------------------------- */

.mnc-radhe-text {
  position: relative;

  z-index: 5;

  width: 100%;
  max-width: 430px;

  padding: 20px;

  text-align: center;

  transform:
    rotateX(8deg)
    rotateY(-5deg);

  transform-style: preserve-3d;

  animation:
    mncRadheFloat
    5.5s
    ease-in-out
    infinite;
}

/* Main calligraphy */

.mnc-radhe-title {
  color: #173f2b;

  font-family:
    "Segoe Script",
    "Brush Script MT",
    "URW Chancery L",
    cursive;

  font-size:
    clamp(42px, 5vw, 60px);

  line-height: 0.95;

  font-weight: 700;

  letter-spacing: -1px;

  text-align: center;

  text-shadow:
    1px 1px 0 #ffffff,
    2px 2px 0 rgba(61,102,78,0.26),
    4px 4px 0 rgba(61,102,78,0.18),
    6px 7px 0 rgba(61,102,78,0.10),
    10px 16px 22px
      rgba(23,63,43,0.19);
}

/* second line */

.mnc-radhe-title span {
  display: block;

  margin-top: 7px;

  font-size:
    clamp(28px, 3.2vw, 39px);

  letter-spacing: -0.5px;
}

/* subtle 3D back layer */

.mnc-radhe-title::after {
  content: "";

  position: absolute;

  left: 0;
  right: 0;

  z-index: -1;

  transform:
    translate3d(
      6px,
      8px,
      -12px
    );

  color:
    rgba(67,108,84,0.12);

  filter: blur(0.5px);

  pointer-events: none;
}

.mnc-radhe-subtitle {
  margin-top: 18px;

  color: #5d7769;

  font-size: 10px;

  font-weight: 700;

  letter-spacing:
    0.26em;

  text-transform: uppercase;
}

.mnc-radhe-line {
  width: 68px;
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

/* Card layout is defined in the responsive overrides below. */

        .mnc-user-content {
          width: 100%;
          max-width: 475px;
          margin: 0 auto;
        }

        .mnc-user-eyebrow {
          display: inline-flex;
          align-items: center;

          margin-bottom: 18px;

          color: var(--mnc-green);

          font-size: 10px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .mnc-user-eyebrow::before {
          content: "";

          width: 26px;
          height: 1px;

          margin-right: 8px;

          background:
            var(--mnc-green);
        }

        .mnc-user-title {
          margin: 0;

          color: #14231c;

          font-size:
            clamp(28px, 3vw, 39px);

          line-height: 1.1;
          font-weight: 650;
          letter-spacing: -1.3px;
        }

        .mnc-user-highlight {
          display: block;

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

        .mnc-user-rule {
          width: 56px;
          height: 3px;

          margin: 22px 0 28px;

          border-radius: 999px;

          background:
            linear-gradient(
              90deg,
              var(--mnc-green),
              #8ab69b
            );
        }

        /* =====================================
           TABS
        ===================================== */

        .mnc-user-tabs {
          display: grid;
          grid-template-columns: 1fr 1fr;

          padding: 4px;

          border-radius: 14px;

          background: #edf3ef;

          margin-bottom: 25px;
        }

        .mnc-user-tab {
          min-height: 42px;

          border: 0;
          border-radius: 11px;

          background: transparent;

          color: #718078;

          font-size: 12px;
          font-weight: 700;

          cursor: pointer;

          transition:
            background 0.2s ease,
            color 0.2s ease,
            transform 0.2s ease;
        }

        .mnc-user-tab:hover {
          color: var(--mnc-green);
        }

        .mnc-user-tab.active {
          background: #ffffff;
          color: var(--mnc-green);

          box-shadow:
            0 5px 15px
              rgba(20,76,48,0.07);
        }

        .mnc-user-tab:active {
          transform: scale(0.98);
        }

        /* =====================================
           INPUT
        ===================================== */

        .mnc-user-field {
          margin-bottom: 14px;
        }

        .mnc-user-field-label {
          display: block;

          margin-bottom: 7px;

          color: #4e5c54;

          font-size: 11px;
          font-weight: 700;
        }

        .mnc-user-input {
          width: 100%;
          height: 55px;

          padding: 0 16px;

          border:
            1px solid
            rgba(23,107,69,0.12);

          border-radius: 16px;

          outline: none;

          background:
            rgba(255,255,255,0.78);

          color: #26332c;

          font-size: 14px;

          box-shadow:
            inset 0 1px 0
              rgba(255,255,255,0.9),
            0 8px 26px
              rgba(21,74,47,0.035);

          transition:
            border-color 0.25s ease,
            box-shadow 0.25s ease,
            background 0.25s ease;
        }

        .mnc-user-input:focus {
          border-color:
            rgba(23,107,69,0.4);

          background: #ffffff;

          box-shadow:
            0 0 0 4px
              rgba(23,107,69,0.07),
            0 12px 30px
              rgba(21,74,47,0.07);
        }

        .mnc-user-password-wrap {
          position: relative;
        }

        .mnc-user-password-wrap .mnc-user-input {
          padding-right: 54px;
        }

        .mnc-user-password-toggle {
          position: absolute;
          top: 50%;
          right: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          padding: 0;
          transform: translateY(-50%);
          border: 0;
          border-radius: 8px;
          background: transparent;
          color: #66756c;
          cursor: pointer;
        }

        .mnc-user-password-toggle:hover {
          color: var(--mnc-green);
        }

        .mnc-user-identifier-hint {
          margin: -5px 0 14px;
          color: #b42318;
          font-size: 12px;
          font-weight: 700;
        }

        .mnc-user-verification-controls {
          display: grid;
          gap: 8px;
          margin-top: 9px;
        }

        .mnc-user-code-row {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          gap: 8px;
        }

        .mnc-user-code-input {
          width: 100%;
          min-width: 0;
          height: 44px;
          padding: 0 13px;
          border: 1px solid rgba(23,107,69,0.18);
          border-radius: 12px;
          background: #fff;
          color: #26332c;
          font-size: 14px;
        }

        .mnc-user-verify-button {
          min-height: 42px;
          padding: 0 14px;
          border: 1px solid rgba(23,107,69,0.18);
          border-radius: 12px;
          background: #fff;
          color: var(--mnc-green);
          font-size: 11px;
          font-weight: 700;
          cursor: pointer;
        }

        .mnc-user-verify-button.primary {
          border-color: var(--mnc-green);
          background: var(--mnc-green);
          color: #fff;
        }

        .mnc-user-verify-button:disabled {
          cursor: default;
          opacity: 0.75;
        }

        .mnc-user-verified {
          color: #176b45;
          font-size: 12px;
          font-weight: 700;
        }

        .mnc-user-status {
          margin-top: 10px;
          color: #176b45;
          font-size: 12px;
          line-height: 1.5;
        }

        /* =====================================
           ERROR
        ===================================== */

        .mnc-user-error {
          margin-top: 12px;

          padding: 12px 14px;

          border-radius: 14px;

          background: #fff2f2;

          border:
            1px solid #f2cccc;

          color: #a33f3f;

          font-size: 12px;
          line-height: 1.5;
        }

        /* =====================================
           BUTTON
        ===================================== */

        .mnc-user-button {
          width: 100%;
          min-height: 55px;

          margin-top: 18px;

          border: 0;
          border-radius: 16px;

          cursor: pointer;

          color: #ffffff;

          background:
            linear-gradient(
              135deg,
              #154e33,
              #23794f
            );

          box-shadow:
            0 13px 30px
              rgba(23,107,69,0.23);

          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.35px;

          transition:
            transform 0.2s ease,
            box-shadow 0.2s ease;
        }

        .mnc-user-button:hover {
          transform: translateY(-2px);

          box-shadow:
            0 18px 36px
              rgba(23,107,69,0.28);
        }

        .mnc-user-button:active {
          transform: translateY(0);
        }

        .mnc-user-button:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }

        /* =====================================
           LINKS
        ===================================== */

        .mnc-user-switch {
          margin-top: 22px;

          text-align: center;

          color: #68756e;

          font-size: 12px;
        }

        .mnc-user-switch button {
          border: 0;
          background: transparent;

          color: var(--mnc-green);

          font-weight: 700;

          cursor: pointer;
        }

        .mnc-user-switch button:hover {
          text-decoration: underline;
        }

       

        /* =====================================
           MOBILE
        ===================================== */

        @media (max-width: 980px) {

          .mnc-user-shell {
            grid-template-columns: 1fr;
            max-width: 720px;
          }

          .mnc-user-visual {
            min-height: 470px;
          }

          .mnc-user-card {
            min-height: auto;
          }

        }

        @media (max-width: 680px) {

          .mnc-user-header {
            padding: 10px 12px 0;
          }

          .mnc-user-header-inner {
            min-height: 68px;
            padding: 12px 15px;
            border-radius: 20px;
          }

          .mnc-user-brand-title {
            font-size: 19px;
          }

          .mnc-user-brand-subtitle {
            font-size: 7px;
            letter-spacing: 1.5px;
          }

          .mnc-user-main {
            padding: 35px 12px 55px;
          }

          .mnc-user-visual {
            min-height: 390px;
            border-radius: 28px;
          }

          .mnc-user-product-stage {
            inset: 75px 25px 85px;
          }

          .mnc-user-product {
            transform:
              scale(0.82)
              rotateY(-12deg)
              rotateX(3deg);
          }

          .mnc-user-card {
            padding: 35px 22px;
            border-radius: 28px;
          }

          .mnc-user-title {
            font-size: 29px;
          }
        .mnc-radhe-stage {
  inset: 45px 8px 45px;
}

.mnc-radhe-feather {
  width: 175px;
  height: 265px;

  opacity: 0.28;

  transform:
    translate(-50%, -56%)
    rotate(-9deg);
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

  letter-spacing:
    0.18em;
}

.mnc-radhe-line {
  width: 52px;
}

  .mnc-radhe-stage {
    inset: 40px 4px 40px;
  }

  .mnc-radhe-image {
    width: 230px;
    max-width: 72%;
  }

  .mnc-radhe-text {
    max-width: 100%;
    padding: 12px;
  }

  .mnc-radhe-title {
    font-size: 40px;
  }

  .mnc-radhe-title span {
    font-size: 27px;
  }

  .mnc-radhe-subtitle {
    font-size: 7px;
    letter-spacing: 0.15em;
  }

@keyframes mncRadheFloat {
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

        }


        @media (max-width: 430px) {

          .mnc-user-header {
            padding: 10px 10px 0;
          }

          .mnc-user-header-inner {
            min-height: 62px;
            padding: 10px 13px;
            border-radius: 18px;
          }

          .mnc-user-brand-title {
            font-size: 17px;
          }

          .mnc-user-brand-subtitle {
            font-size: 6.5px;
            letter-spacing: 1.2px;
          }

          .mnc-user-header-link {
            font-size: 10px;
          }

          .mnc-user-main {
            padding: 28px 10px 48px;
          }

          .mnc-user-shell {
            gap: 12px;
          }

          .mnc-user-visual {
            min-height: 330px;
            border-radius: 24px;
          }

          .mnc-user-visual-label {
            top: 18px;
            left: 18px;
            font-size: 8px;
            padding: 7px 10px;
          }

          .mnc-user-product-stage {
            inset: 62px 18px 72px;
          }

          .mnc-user-product {
            transform:
              scale(0.72)
              rotateY(-10deg)
              rotateX(2deg);
          }

          .mnc-user-product-copy {
            bottom: 25px;
            left: 18px;
            right: 18px;
          }

          .mnc-user-product-copy strong {
            font-size: 13px;
          }

          .mnc-user-product-copy span {
            font-size: 9px;
          }

          .mnc-user-card {
            padding: 28px 17px;
            border-radius: 24px;
          }

          .mnc-user-title {
            font-size: 27px;
          }

          .mnc-user-rule {
            margin: 18px 0 22px;
          }

          .mnc-user-tabs {
            margin-bottom: 20px;
          }

          .mnc-user-input,
          .mnc-user-button {
            min-height: 52px;
            height: 52px;
          }
        }

        @media (max-width: 360px) {

          .mnc-user-brand-subtitle,
          .mnc-user-header-link {
            display: none;
          }

          .mnc-user-visual {
            min-height: 300px;
          }

          .mnc-user-product-stage {
            inset: 55px 12px 62px;
          }

          .mnc-user-product {
            transform:
              scale(0.64)
              rotateY(-8deg)
              rotateX(2deg);
          }

          .mnc-user-card {
            padding: 24px 14px;
          }

          .mnc-user-title {
            font-size: 25px;
          }
        }

        /* =====================================================
           LAYOUT-ONLY RESPONSIVE OVERRIDES
           Existing content, links, handlers and behavior unchanged.
        ====================================================== */

        .mnc-user-header-inner {
          width: 100%;
          min-width: 0;
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

        .mnc-login-content {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 475px;
          margin: 0 auto;
        }
        
        .mnc-login-content {
          min-width: 0;
        }

        .mnc-login-content {
          min-width: 100%;
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

        .mnc-user-shell {
          width: 100%;
          max-width: 1200px;
          grid-template-columns: minmax(0, 0.96fr) minmax(0, 1.04fr);
          align-items: stretch;
        }

        .mnc-user-visual,
        .mnc-user-card,
        .mnc-user-content {
          width: 100%;
          min-width: 0;
        }

        /* Restore the intended auth-card layout that is currently interrupted
           by an existing malformed CSS comment; no JSX or behavior is changed. */
        .mnc-user-card {
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
            0 30px 70px rgba(20,76,48,0.075),
            inset 0 1px 0 rgba(255,255,255,0.95);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }

        .mnc-user-content {
          max-width: 475px;
          margin: 0 auto;
        }

        .mnc-user-code-row {
          min-width: 0;
          width: 100%;
        }

        .mnc-user-code-input,
        .mnc-user-input,
        .mnc-user-button,
        .mnc-user-verify-button {
          max-width: 100%;
        }

        @media (max-width: 1024px) {
          .mnc-user-shell {
            max-width: 820px;
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .mnc-user-visual {
            min-height: 500px;
          }

          .mnc-user-card {
            min-height: auto;
          }
        }

        @media (max-width: 680px) {
          .mnc-user-header {
            padding-left: 10px;
            padding-right: 10px;
          }

          .mnc-user-main {
            padding: 28px 10px 46px;
          }

          .mnc-user-shell {
            width: 100%;
            gap: 14px;
          }

          .mnc-user-visual {
            width: 100%;
            min-height: 340px;
            height: auto;
            aspect-ratio: 1 / 0.96;
            border-radius: 24px;
          }

          .mnc-radhe-stage {
            inset: 38px 4px 24px;
          }

          .mnc-radhe-image {
            width: auto;
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

          .mnc-user-card {
            min-height: auto;
            padding: 30px 18px;
            border-radius: 24px;
          }

          .mnc-user-content {
            max-width: 100%;
          }

          .mnc-user-code-row {
            grid-template-columns: minmax(0, 1fr) auto;
          }
        }

        @media (max-width: 430px) {
          .mnc-user-main {
            padding: 24px 8px 38px;
          }

          .mnc-user-visual {
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

          .mnc-user-card {
            padding: 26px 14px;
          }

          .mnc-user-code-row {
            grid-template-columns: 1fr;
          }

          .mnc-user-verify-button {
            width: 100%;
          }
        }

        @media (max-width: 360px) {
          .mnc-user-header-inner {
            padding-left: 10px;
            padding-right: 10px;
          }

          .mnc-user-card {
            padding-left: 12px;
            padding-right: 12px;
          }
        }

        .mnc-user-visual .mnc-radhe-image {
          opacity: 1;
        }

        @media (max-width: 680px) {
          .mnc-user-visual .mnc-radhe-image {
            height: 84%;
            max-width: 80%;
          }
        }

        @media (max-width: 430px) {
          .mnc-user-visual .mnc-radhe-image {
            height: 80%;
            max-width: 78%;
          }
        }

        @media (max-width: 360px) {
          .mnc-user-visual .mnc-radhe-image {
            height: 76%;
            max-width: 76%;
          }
        }

        .mnc-user-visual {
          align-self: center;
          width: min(100%, 420px);
          max-width: 420px;
          min-height: 0;
          height: auto;
          aspect-ratio: 0.74;
        }

        @media (max-width: 680px) {
          .mnc-user-visual {
            width: min(100%, 280px);
            max-width: 280px;
          }

          .mnc-user-visual .mnc-radhe-stage {
            inset: 14px;
          }

          .mnc-user-visual .mnc-radhe-image {
            width: auto;
            height: 90%;
            max-width: 90%;
          }
        }

        @media (max-width: 430px) {
          .mnc-user-visual {
            width: min(100%, 250px);
            max-width: 250px;
          }
        }

        @media (max-width: 360px) {
          .mnc-user-visual {
            width: min(100%, 230px);
            max-width: 230px;
          }
        }

  `}</style>

      <div className="mnc-user-page">

        {/* Background Video - At The Very Back */}
        <video
          className="mnc-user-bg-video"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/login-bg-poster.jpg"
          aria-hidden="true"
        >
          <source src="/login-bg.mp4" type="video/mp4" />
        </video>

        <div className="mnc-user-layer">

          {/* ==================================
              HEADER
          ================================== */}

          <header className="mnc-user-header">

            <div className="mnc-user-header-inner">

              <a
                href={OFFICIAL_SITE}
                className="mnc-user-brand"
              >
                <div className="mnc-user-brand-title">
                  Shri Radhe Wellness Centre
                </div>

                <div className="mnc-user-brand-subtitle">
                  Glow From Inside, Shine Outside.
                </div>
              </a>

             
            </div>

          </header>


          {/* ==================================
              MAIN
          ================================== */}

          <main className="mnc-user-main">

            <div className="mnc-user-shell">

              {/* ==================================
                  VISUAL
              ================================== */}

              <section className="mnc-user-visual">

          <div className="mnc-radhe-stage">

  <img
    src="/peacock-feather.png"
    alt=""
    aria-hidden="true"
    className="mnc-radhe-image"
  />

</div>

              </section>


              {/* ==================================
                  LOGIN / SIGNUP
              ================================== */}

              <section className="mnc-user-card">

                <div className="mnc-user-content">

                  <div className="mnc-user-eyebrow">
                    Customer Account
                  </div>

                  <h1 className="mnc-user-title">

                    {recoveryOpen
                      ? "Forgot password,"
                      : mode === "login"
                        ? "Welcome Back."
                        : "Create Your Account."}

                    <span className="mnc-user-highlight">

                      {recoveryOpen
                        ? "Don't worry ;)"
                        : mode === "login"
                          ? "Continue Shopping."
                          : "Start Shopping."}

                    </span>

                  </h1>

                  <div className="mnc-user-rule" />


                  {/* TABS */}

                  {!recoveryOpen && (
                  <div className="mnc-user-tabs">

                    <button
                      type="button"
                      className={`
                        mnc-user-tab
                        ${
                          mode === "login"
                            ? "active"
                            : ""
                        }
                      `}
                      onClick={() =>
                        switchMode("login")
                      }
                    >
                      Login
                    </button>

                    <button
                      type="button"
                      className={`
                        mnc-user-tab
                        ${
                          mode === "signup"
                            ? "active"
                            : ""
                        }
                      `}
                      onClick={() =>
                        switchMode("signup")
                      }
                    >
                      Create Account
                    </button>

                  </div>
                  )}


                  {recoveryOpen ? (
                    <div>
                      <p className="mnc-user-status">
                        Choose a registered email or mobile number to receive a recovery code.
                      </p>

                      <div className="mnc-user-field">
                        <label className="mnc-user-field-label" htmlFor="recovery-email">
                          Registered email address
                        </label>
                        <input
                          id="recovery-email"
                          name="recoveryEmail"
                          className="mnc-user-input"
                          type="email"
                          value={recoveryValue}
                          onChange={(event) => {
                            setRecoveryValue(event.target.value);
                            setRecoveryCode("");
                            setRecoveryCodeSent(false);
                            setRecoveryVerified(false);
                            setError("");
                          }}
                          placeholder="Enter your registered email"
                          autoComplete="email"
                          disabled={recoveryCodeSent}
                        />
                      </div>

                      {!recoveryCodeSent && (
                        <button
                          type="button"
                          className="mnc-user-button"
                          disabled={verificationLoading !== ""}
                          onClick={sendRecoveryCode}
                        >
                          {verificationLoading === "recovery-send"
                            ? "Sending code..."
                            : "Send recovery code"}
                        </button>
                      )}

                      {recoveryCodeSent && !recoveryVerified && (
                        <div className="mnc-user-field">
                          <label className="mnc-user-field-label" htmlFor="recovery-code">
                            6-digit recovery code
                          </label>
                          <div className="mnc-user-code-row">
                            <input
                              id="recovery-code"
                              name="recoveryCode"
                              className="mnc-user-code-input"
                              type="text"
                              value={recoveryCode}
                              onChange={(event) =>
                                setRecoveryCode(
                                  event.target.value.replace(/\D/g, "").slice(0, 6)
                                )
                              }
                              placeholder="Enter your code"
                              inputMode="numeric"
                              autoComplete="one-time-code"
                            />
                            <button
                              type="button"
                              className="mnc-user-verify-button primary"
                              disabled={verificationLoading !== ""}
                              onClick={verifyRecoveryCode}
                            >
                              {verificationLoading === "recovery-verify"
                                ? "Checking..."
                                : "Verify code"}
                            </button>
                          </div>
                          <button
                            type="button"
                            className="mnc-user-verify-button"
                            disabled={verificationLoading !== ""}
                            onClick={() => {
                              setRecoveryCodeSent(false);
                              setRecoveryCode("");
                              setVerificationMessage("");
                            }}
                          >
                            Change email
                          </button>
                        </div>
                      )}

                      {recoveryVerified && (
                        <form onSubmit={completePasswordRecovery}>
                          <div className="mnc-user-field">
                            <label className="mnc-user-field-label" htmlFor="recovery-new-password">
                              New password
                            </label>
                            <div className="mnc-user-password-wrap">
                              <input
                                id="recovery-new-password"
                                name="recoveryNewPassword"
                                className="mnc-user-input"
                                type={showNewPassword ? "text" : "password"}
                                value={newPassword}
                                onChange={(event) => setNewPassword(event.target.value)}
                                placeholder="At least 12 characters"
                                autoComplete="new-password"
                                minLength={12}
                                maxLength={128}
                                required
                              />
                              <button
                                type="button"
                                className="mnc-user-password-toggle"
                                onClick={() => setShowNewPassword((visible) => !visible)}
                                aria-label={showNewPassword ? "Hide new password" : "Show new password"}
                              >
                                {showNewPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                              </button>
                            </div>
                          </div>

                          <div className="mnc-user-field">
                            <label className="mnc-user-field-label" htmlFor="recovery-confirm-new-password">
                              Confirm new password
                            </label>
                            <div className="mnc-user-password-wrap">
                              <input
                                id="recovery-confirm-new-password"
                                name="recoveryConfirmNewPassword"
                                className="mnc-user-input"
                                type={showConfirmNewPassword ? "text" : "password"}
                                value={confirmNewPassword}
                                onChange={(event) =>
                                  setConfirmNewPassword(event.target.value)
                                }
                                placeholder="Enter your new password again"
                                autoComplete="new-password"
                                minLength={12}
                                maxLength={128}
                                required
                              />
                              <button
                                type="button"
                                className="mnc-user-password-toggle"
                                onClick={() =>
                                  setShowConfirmNewPassword((visible) => !visible)
                                }
                                aria-label={
                                  showConfirmNewPassword
                                    ? "Hide confirm new password"
                                    : "Show confirm new password"
                                }
                              >
                                {showConfirmNewPassword
                                  ? <EyeOff size={19} />
                                  : <Eye size={19} />}
                              </button>
                            </div>
                          </div>

                          <button
                            type="submit"
                            className="mnc-user-button"
                            disabled={verificationLoading !== ""}
                          >
                            {verificationLoading === "recovery-complete"
                              ? "Updating password..."
                              : "Update password"}
                          </button>
                        </form>
                      )}

                      {error && <div className="mnc-user-error">{error}</div>}
                      {verificationMessage && (
                        <div className="mnc-user-status" role="status">
                          {verificationMessage}
                        </div>
                      )}

                      <div className="mnc-user-switch">
                        <button
                          type="button"
                          onClick={() => {
                            setRecoveryOpen(false);
                            setError("");
                            setVerificationMessage("");
                          }}
                        >
                          Back to login
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                  <form
                    onSubmit={handleSubmit}
                  >

                    {/* NAME */}

                    {mode === "signup" && (
                      <div className="mnc-user-field">

                        <label className="mnc-user-field-label" htmlFor="signup-full-name">
                          Full Name
                        </label>

                        <input
                          id="signup-full-name"
                          name="name"
                          className="mnc-user-input"
                          type="text"
                          value={name}
                          onChange={(event) =>
                            setName(
                              event.target.value
                            )
                          }
                          placeholder="Enter your full name"
                          autoComplete="name"
                        />

                      </div>
                    )}


                    {/* EMAIL */}

                    <div className="mnc-user-field">

                      <label className="mnc-user-field-label" htmlFor="customer-email">
                        Email Address
                      </label>

                      <input
                        id="customer-email"
                        name="email"
                        className="mnc-user-input"
                        type="email"
                        value={email}
                        onChange={(event) => {
                          setEmail(event.target.value);
                          setEmailCode("");
                          setEmailCodeSent(false);
                          setEmailVerified(false);
                        }}
                        placeholder="Enter your email"
                        autoComplete="email"
                      />

                      {mode === "signup" && (
                        <div className="mnc-user-verification-controls">
                          {emailVerified ? (
                            <span className="mnc-user-verified" role="status">
                              Email verified
                            </span>
                          ) : (
                            <>
                              <button
                                type="button"
                                className="mnc-user-verify-button primary"
                                disabled={verificationLoading !== ""}
                                onClick={sendVerificationCode}
                              >
                                {verificationLoading === "email-send"
                                  ? "Sending..."
                                  : emailCodeSent
                                    ? "Resend email code"
                                    : "Send email code"}
                              </button>

                              {emailCodeSent && (
                                <div className="mnc-user-code-row">
                                  <label className="sr-only" htmlFor="signup-email-code">Email verification code</label>
                                  <input
                                    id="signup-email-code"
                                    name="emailVerificationCode"
                                    className="mnc-user-code-input"
                                    type="text"
                                    value={emailCode}
                                    onChange={(event) =>
                                      setEmailCode(
                                        event.target.value.replace(/\D/g, "").slice(0, 6)
                                      )
                                    }
                                    placeholder="6-digit email code"
                                    inputMode="numeric"
                                    autoComplete="one-time-code"
                                    aria-label="Email verification code"
                                  />
                                  <button
                                    type="button"
                                    className="mnc-user-verify-button"
                                    disabled={verificationLoading !== ""}
                                    onClick={verifyCode}
                                  >
                                    {verificationLoading === "email-verify"
                                      ? "Checking..."
                                      : "Verify email"}
                                  </button>
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      )}

                    </div>

                    {mode === "login" && (
                      <p className="mnc-user-identifier-hint">
                        Enter either your email or mobile number to log in.
                      </p>
                    )}


                    {/* MOBILE */}

                    {mode === "signup" && (
                      <div className="mnc-user-field">

                        <label className="mnc-user-field-label" htmlFor="signup-mobile">
                          Mobile Number
                        </label>

                        <input
                          id="signup-mobile"
                          name="mobile"
                          className="mnc-user-input"
                          type="tel"
                          value={mobile}
                          onChange={(event) => {
                            setMobile(
                              event.target.value.replace(/\D/g, "").slice(0, 10)
                            );
                          }}
                          placeholder="10-digit mobile number"
                          inputMode="numeric"
                          autoComplete="tel"
                        />

                      </div>
                    )}


                    {/* LOGIN MOBILE OPTION */}

                    {mode === "login" && (
                      <div className="mnc-user-field">

                        <label className="mnc-user-field-label" htmlFor="login-mobile">
                          Mobile Number
                        </label>

                        <input
                          id="login-mobile"
                          name="mobile"
                          className="mnc-user-input"
                          type="tel"
                          value={mobile}
                            onChange={(event) =>
                              setMobile(
                                event.target.value.replace(/\D/g, "").slice(0, 10)
                              )
                            }
                          placeholder="10-digit mobile number"
                          inputMode="numeric"
                          autoComplete="tel"
                        />

                      </div>
                    )}


                    {/* PASSWORD */}

                    <div className="mnc-user-field">

                      <label className="mnc-user-field-label" htmlFor="customer-password">
                        Password
                      </label>

                      <div className="mnc-user-password-wrap">
                        <input
                          id="customer-password"
                          name="password"
                          className="mnc-user-input"
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(event) => setPassword(event.target.value)}
                          placeholder="Enter your password"
                          autoComplete={
                            mode === "login"
                              ? "current-password"
                              : "new-password"
                          }
                        />
                        <button
                          type="button"
                          className="mnc-user-password-toggle"
                          onClick={() => setShowPassword((visible) => !visible)}
                          aria-label={showPassword ? "Hide password" : "Show password"}
                          aria-pressed={showPassword}
                        >
                          {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                        </button>
                      </div>

                    </div>


                    {/* CONFIRM PASSWORD */}

                    {mode === "signup" && (
                      <div className="mnc-user-field">

                        <label className="mnc-user-field-label" htmlFor="confirm-password">
                          Confirm Password
                        </label>

                        <div className="mnc-user-password-wrap">
                          <input
                            id="confirm-password"
                            name="confirmPassword"
                            className="mnc-user-input"
                            type={showConfirmPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(event) =>
                              setConfirmPassword(event.target.value)
                            }
                            placeholder="Confirm your password"
                            autoComplete="new-password"
                          />
                          <button
                            type="button"
                            className="mnc-user-password-toggle"
                            onClick={() =>
                              setShowConfirmPassword((visible) => !visible)
                            }
                            aria-label={
                              showConfirmPassword
                                ? "Hide confirm password"
                                : "Show confirm password"
                            }
                            aria-pressed={showConfirmPassword}
                          >
                            {showConfirmPassword
                              ? <EyeOff size={19} />
                              : <Eye size={19} />}
                          </button>
                        </div>

                      </div>
                    )}


                    {/* ERROR */}

                    {error && (
                      <div className="mnc-user-error">
                        {error}
                      </div>
                    )}

                    {verificationMessage && (
                      <div className="mnc-user-status" role="status">
                        {verificationMessage}
                      </div>
                    )}


                    {/* SUBMIT */}

                    <button
                      type="submit"
                      className="mnc-user-button"
                      disabled={loading}
                    >
                      {loading
                        ? "Please Wait..."
                        : mode === "login"
                          ? "Login & Continue"
                          : "Create Account & Continue"}
                    </button>

                  </form>


                  {/* SWITCH */}

                  <div className="mnc-user-switch">

                    {mode === "login"
                      ? "Don't have an account? "
                      : "Already have an account? "}

                    <button
                      type="button"
                      onClick={() =>
                        switchMode(
                          mode === "login"
                            ? "signup"
                            : "login"
                        )
                      }
                    >
                      {mode === "login"
                        ? "Create Account"
                        : "Login"}
                    </button>

                  </div>

                  {mode === "login" && (
                    <div className="mnc-user-switch">
                      <button type="button" onClick={openPasswordRecovery}>
                        Forgot password?
                      </button>
                    </div>
                  )}

                    </>
                  )}


                </div>

              </section>

            </div>

          </main>

        </div>

      </div>
    </>
  );
}

export default UserLoginPage;