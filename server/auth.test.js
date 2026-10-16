import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { createAuthServer } from "./index.js";

let app;
let deliveredCodes;

before(async () => {
  deliveredCodes = new Map();
  app = await createAuthServer({
    databasePath: ":memory:",
    cookieSecure: false,
    staticRoot: null,
    verificationSender: async ({ channel, destination, code }) => {
      deliveredCodes.set(`${channel}:${destination}`, code);
    },
  });
});

after(async () => {
  await app.close();
});

function cookiePair(response) {
  const cookieHeader = response.headers["set-cookie"];
  const firstCookie = Array.isArray(cookieHeader)
    ? cookieHeader[0]
    : cookieHeader;

  return firstCookie.split(";", 1)[0];
}

test("register, login, restore, and revoke a customer session", async () => {
  const password = "correct horse battery staple";
  const mobileCodeRequest = await app.inject({
    method: "POST",
    url: "/api/auth/verification/send",
    payload: { channel: "mobile", value: "9876543210" },
  });

  assert.equal(mobileCodeRequest.statusCode, 400);

  const emailCodeRequest = await app.inject({
    method: "POST",
    url: "/api/auth/verification/send",
    payload: { channel: "email", value: "customer@example.com" },
  });

  assert.equal(emailCodeRequest.statusCode, 202);

  const blockedRegistration = await app.inject({
    method: "POST",
    url: "/api/auth/register",
    payload: {
      name: "Mayleen Customer",
      email: "customer@example.com",
      mobile: "9876543210",
      password,
    },
  });

  assert.equal(blockedRegistration.statusCode, 400);

  const emailCode = deliveredCodes.get("email:customer@example.com");
  const incorrectCode = emailCode === "000000" ? "000001" : "000000";
  const incorrectVerification = await app.inject({
    method: "POST",
    url: "/api/auth/verification/verify",
    payload: {
      channel: "email",
      value: "customer@example.com",
      code: incorrectCode,
    },
  });

  assert.equal(incorrectVerification.statusCode, 400);

  const emailVerifyResponse = await app.inject({
    method: "POST",
    url: "/api/auth/verification/verify",
    payload: {
      channel: "email",
      value: "customer@example.com",
      code: deliveredCodes.get("email:customer@example.com"),
    },
  });

  assert.equal(emailVerifyResponse.statusCode, 200);
  assert.equal(emailVerifyResponse.json().verified, true);

  const registration = await app.inject({
    method: "POST",
    url: "/api/auth/register",
    payload: {
      name: "Mayleen Customer",
      email: "customer@example.com",
      mobile: "9876543210",
      password,
    },
  });

  assert.equal(registration.statusCode, 201);
  assert.equal(registration.json().user.email, "customer@example.com");
  assert.equal(JSON.stringify(registration.json()).includes(password), false);
  assert.match(registration.headers["set-cookie"], /HttpOnly/i);
  assert.match(registration.headers["set-cookie"], /SameSite=Strict/i);

  const existingEmailCodeRequest = await app.inject({
    method: "POST",
    url: "/api/auth/verification/send",
    payload: {
      channel: "email",
      value: "customer@example.com",
    },
  });

  assert.equal(existingEmailCodeRequest.statusCode, 409);
  assert.match(existingEmailCodeRequest.json().error, /already registered/i);

  const registrationCookie = cookiePair(registration);
  const restoredSession = await app.inject({
    method: "GET",
    url: "/api/auth/session",
    headers: { cookie: registrationCookie },
  });

  assert.equal(restoredSession.statusCode, 200);
  assert.equal(restoredSession.json().user.email, "customer@example.com");

  const badLogin = await app.inject({
    method: "POST",
    url: "/api/auth/login",
    payload: {
      identifier: "customer@example.com",
      password: "incorrect password",
    },
  });

  assert.equal(badLogin.statusCode, 401);

  const login = await app.inject({
    method: "POST",
    url: "/api/auth/login",
    payload: {
      identifier: "9876543210",
      password,
    },
  });

  assert.equal(login.statusCode, 200);
  assert.equal(login.json().user.mobile, "9876543210");

  const loginCookie = cookiePair(login);
  const resetRequest = await app.inject({
    method: "POST",
    url: "/api/auth/password-reset/send",
    payload: {
      channel: "email",
      value: "CUSTOMER@example.com",
    },
  });

  assert.equal(resetRequest.statusCode, 202);

  const resetVerify = await app.inject({
    method: "POST",
    url: "/api/auth/password-reset/verify",
    payload: {
      channel: "email",
      value: "customer@example.com",
      code: deliveredCodes.get("email:customer@example.com"),
    },
  });

  assert.equal(resetVerify.statusCode, 200);

  const newPassword = "new secure password phrase";
  const resetComplete = await app.inject({
    method: "POST",
    url: "/api/auth/password-reset/complete",
    payload: {
      channel: "email",
      value: "customer@example.com",
      newPassword,
    },
  });

  assert.equal(resetComplete.statusCode, 200);

  const replayedReset = await app.inject({
    method: "POST",
    url: "/api/auth/password-reset/complete",
    payload: {
      channel: "email",
      value: "customer@example.com",
      newPassword: "replayed reset password",
    },
  });

  assert.equal(replayedReset.statusCode, 400);

  const unverifiedReset = await app.inject({
    method: "POST",
    url: "/api/auth/password-reset/complete",
    payload: {
      channel: "mobile",
      value: "9876543210",
      newPassword: "another secure password",
    },
  });

  assert.equal(unverifiedReset.statusCode, 400);

  const oldPasswordLogin = await app.inject({
    method: "POST",
    url: "/api/auth/login",
    payload: {
      identifier: "customer@example.com",
      password,
    },
  });

  assert.equal(oldPasswordLogin.statusCode, 401);

  const newPasswordLogin = await app.inject({
    method: "POST",
    url: "/api/auth/login",
    payload: {
      identifier: "customer@example.com",
      password: newPassword,
    },
  });

  assert.equal(newPasswordLogin.statusCode, 200);

  const oldSession = await app.inject({
    method: "GET",
    url: "/api/auth/session",
    headers: { cookie: loginCookie },
  });

  assert.equal(oldSession.json().user, null);

  const mobileResetRequest = await app.inject({
    method: "POST",
    url: "/api/auth/password-reset/send",
    payload: {
      channel: "mobile",
      value: "9876543210",
    },
  });

  assert.equal(mobileResetRequest.statusCode, 400);

  const logout = await app.inject({
    method: "POST",
    url: "/api/auth/logout",
    headers: { cookie: loginCookie },
  });

  assert.equal(logout.statusCode, 200);

  const revokedSession = await app.inject({
    method: "GET",
    url: "/api/auth/session",
    headers: { cookie: loginCookie },
  });

  assert.equal(revokedSession.json().user, null);
});

test("reject registration with a short password", async () => {
  const response = await app.inject({
    method: "POST",
    url: "/api/auth/register",
    payload: {
      name: "Another Customer",
      email: "short-password@example.com",
      mobile: "9123456789",
      password: "short",
    },
  });

  assert.equal(response.statusCode, 400);
});