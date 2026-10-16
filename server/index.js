import "dotenv/config";
import Fastify from "fastify";
import cookie from "@fastify/cookie";
import helmet from "@fastify/helmet";
import rateLimit from "@fastify/rate-limit";
import staticFiles from "@fastify/static";
import Database from "better-sqlite3";
import nodemailer from "nodemailer";
import {
  createHash,
  createHmac,
  randomBytes,
  randomInt,
  scrypt as scryptCallback,
  timingSafeEqual,
} from "node:crypto";
import { promisify } from "node:util";
import { existsSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { getProductPrice } from "./product-prices.js";

const scrypt = promisify(scryptCallback);
const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const frontendDirectory = resolve(projectRoot, "dist");
const sessionCookieName = "mnc_customer_session";
const adminSessionCookieName = "mnc_admin_session";
const sessionLifetimeSeconds = 60 * 60 * 24 * 7;
const verificationLifetimeMs = 10 * 60 * 1000;
const verificationMaximumAttempts = 5;
const verificationSecret = process.env.OTP_SECRET || randomBytes(32);
const passwordKeyLength = 64;
const passwordCost = {
  N: 16_384,
  r: 8,
  p: 1,
  maxmem: 64 * 1024 * 1024,
};

const registerBodySchema = {
  type: "object",
  additionalProperties: false,
  required: ["name", "email", "mobile", "password"],
  properties: {
    name: { type: "string", minLength: 2, maxLength: 100 },
    email: { type: "string", format: "email", maxLength: 254 },
    mobile: { type: "string", pattern: "^[6-9][0-9]{9}$" },
    password: { type: "string", minLength: 12, maxLength: 128 },
  },
};

const loginBodySchema = {
  type: "object",
  additionalProperties: false,
  required: ["identifier", "password"],
  properties: {
    identifier: { type: "string", minLength: 1, maxLength: 254 },
    password: { type: "string", minLength: 1, maxLength: 128 },
  },
};

const sendVerificationBodySchema = {
  type: "object",
  additionalProperties: false,
  required: ["channel", "value"],
  properties: {
    channel: { type: "string", enum: ["email"] },
    value: { type: "string", minLength: 3, maxLength: 254 },
  },
};

const verifyCodeBodySchema = {
  type: "object",
  additionalProperties: false,
  required: ["channel", "value", "code"],
  properties: {
    channel: { type: "string", enum: ["email"] },
    value: { type: "string", minLength: 3, maxLength: 254 },
    code: { type: "string", pattern: "^[0-9]{6}$" },
  },
};

const resetPasswordBodySchema = {
  type: "object",
  additionalProperties: false,
  required: ["channel", "value", "newPassword"],
  properties: {
    channel: { type: "string", enum: ["email"] },
    value: { type: "string", minLength: 3, maxLength: 254 },
    newPassword: { type: "string", minLength: 12, maxLength: 128 },
  },
};

const userFields =
  "users.id, users.name, users.email, users.mobile, users.created_at AS createdAt";

async function deliverVerificationCode({ channel, destination, code }) {
  if (channel !== "email") {
    throw new Error("Only email verification is enabled.");
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS, SMTP_FROM } =
    process.env;

  if (!SMTP_HOST || !SMTP_FROM || Boolean(SMTP_USER) !== Boolean(SMTP_PASS)) {
    throw new Error("Email delivery is not configured.");
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT || 587),
    secure: SMTP_SECURE === "true" || Number(SMTP_PORT) === 465,
    auth: SMTP_USER ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
  });

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #059669, #0f766e); padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 24px;">Shri Radhe</h1>
    <h3 style="color: white; margin: 0; font-size: 14px;">Wellness</h3>
    <p style="color: #a7f3d0; margin: 10px 0 0;">Premium Nutrition & Wellness</p>
  </div>
  <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 12px 12px; border: 1px solid #e2e8f0;">
    <h2 style="color: #1e293b; margin-top: 0;">Verify Your Email</h2>
    <p style="font-size: 16px;">Welcome to Shri Radhe Wellness! Please use the code below to verify your email address:</p>
    <div style="background: #059669; color: white; font-size: 32px; font-weight: bold; letter-spacing: 8px; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0; font-family: monospace;">
      ${code}
    </div>
    <p style="color: #64748b; font-size: 14px;">This code expires in <strong>10 minutes</strong>.</p>
    <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;">
    <p style="color: #94a3b8; font-size: 12px;">If you didn't request this code, please ignore this email or contact support.</p>
    <p style="color: #94a3b8; font-size: 12px;">— The Shri Radhe Wellness Team</p>
  </div>
</body>
</html>
  `;

  await transporter.sendMail({
    from: `"Shri Radhe Wellness Centre" <${SMTP_FROM}>`,
    to: destination,
    subject: "Welcome to Shri Radhe Wellness Centre",
    text: `Your Shri Radhe Wellness verification code is ${code}.
    It expires in 10 minutes.`,
    html: htmlContent,
    headers: {
      'X-Priority': '3',
      'X-Mailer': 'Shri Radhe Wellness',
      'Precedence': 'bulk',
      'List-Unsubscribe': '<mailto:unsubscribe@mayleen.com>',
    }
  });
}

function normalizeUser(row) {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    mobile: row.mobile,
    createdAt: row.createdAt,
  };
}

function hashToken(token) {
  return createHash("sha256").update(token).digest("hex");
}

function hashVerificationCode(channel, value, code) {
  return createHmac("sha256", verificationSecret)
    .update(`${channel}:${value}:${code}`)
    .digest("hex");
}

function matchesHash(expectedHex, actualHex) {
  const expected = Buffer.from(expectedHex, "hex");
  const actual = Buffer.from(actualHex, "hex");

  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

async function hashPassword(password) {
  const salt = randomBytes(16);
  const derivedKey = await scrypt(password, salt, passwordKeyLength, passwordCost);

  return {
    salt: salt.toString("hex"),
    hash: derivedKey.toString("hex"),
  };
}

async function verifyPassword(password, saltHex, expectedHex) {
  const salt = Buffer.from(saltHex, "hex");
  const expected = Buffer.from(expectedHex, "hex");
  const actual = await scrypt(password, salt, passwordKeyLength, passwordCost);

  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

function setSessionCookie(reply, token, secure) {
  reply.setCookie(sessionCookieName, token, {
    httpOnly: true,
    secure,
    sameSite: "strict",
    path: "/",
    maxAge: sessionLifetimeSeconds,
  });
}

function setAdminSessionCookie(reply, token, secure) {
  reply.setCookie(adminSessionCookieName, token, {
    httpOnly: true,
    secure,
    sameSite: "strict",
    path: "/",
    maxAge: sessionLifetimeSeconds,
  });
}

export async function createAuthServer({
  databasePath,
  cookieSecure = process.env.NODE_ENV === "production",
  verificationSender = deliverVerificationCode,
  staticRoot = existsSync(resolve(frontendDirectory, "index.html"))
    ? frontendDirectory
    : null,
  logger = false,
} = {}) {
  if (process.env.NODE_ENV === "production" && !process.env.OTP_SECRET) {
    throw new Error("OTP_SECRET must be configured in production.");
  }

  const requestedDatabasePath =
    databasePath || process.env.DATABASE_PATH || "data/mayleen.sqlite";
  const resolvedDatabasePath =
    requestedDatabasePath === ":memory:"
      ? requestedDatabasePath
      : resolve(projectRoot, requestedDatabasePath);

  if (resolvedDatabasePath !== ":memory:") {
    mkdirSync(dirname(resolvedDatabasePath), { recursive: true });
  }

  const database = new Database(resolvedDatabasePath);
  database.pragma("journal_mode = WAL");
  database.pragma("foreign_keys = ON");
  database.pragma("busy_timeout = 5000");
  database.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE COLLATE NOCASE,
      mobile TEXT NOT NULL UNIQUE,
      password_salt TEXT NOT NULL,
      password_hash TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS sessions (
      token_hash TEXT PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      expires_at INTEGER NOT NULL,
      created_at INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS verification_codes (
      channel TEXT NOT NULL CHECK(channel IN ('email', 'mobile')),
      destination TEXT NOT NULL,
      code_hash TEXT NOT NULL,
      expires_at INTEGER NOT NULL,
      attempts INTEGER NOT NULL DEFAULT 0,
      verified_at INTEGER,
      PRIMARY KEY (channel, destination)
    );

    CREATE TABLE IF NOT EXISTS password_reset_codes (
      channel TEXT NOT NULL CHECK(channel IN ('email', 'mobile')),
      destination TEXT NOT NULL,
      code_hash TEXT NOT NULL,
      expires_at INTEGER NOT NULL,
      attempts INTEGER NOT NULL DEFAULT 0,
      verified_at INTEGER,
      PRIMARY KEY (channel, destination)
    );

    -- Cart tables for persistent customer carts
    CREATE TABLE IF NOT EXISTS carts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      created_at INTEGER NOT NULL,
      updated_at INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS cart_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      cart_id INTEGER NOT NULL REFERENCES carts(id) ON DELETE CASCADE,
      product_id TEXT NOT NULL,
      product_name TEXT NOT NULL,
      product_category TEXT NOT NULL,
      product_pack_size TEXT,
      product_color TEXT,
      quantity INTEGER NOT NULL DEFAULT 1,
      unit_price INTEGER,
      created_at INTEGER NOT NULL,
      updated_at INTEGER NOT NULL,
      UNIQUE(cart_id, product_id)
    );

    -- Order tables
    CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY,
      user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
      status TEXT NOT NULL DEFAULT 'pending',
      payment_status TEXT NOT NULL DEFAULT 'pending',
      customer_name TEXT NOT NULL,
      customer_email TEXT NOT NULL,
      customer_mobile TEXT NOT NULL,
      shipping_address TEXT NOT NULL,
      shipping_city TEXT NOT NULL,
      shipping_state TEXT NOT NULL,
      shipping_pincode TEXT NOT NULL,
      subtotal INTEGER NOT NULL,
      total INTEGER NOT NULL,
      currency TEXT NOT NULL DEFAULT 'INR',
      created_at INTEGER NOT NULL,
      updated_at INTEGER NOT NULL,
      paid_at INTEGER,
      shipped_at INTEGER,
      delivered_at INTEGER,
      cancelled_at INTEGER,
      tracking_number TEXT,
      carrier TEXT
    );

    CREATE TABLE IF NOT EXISTS order_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id TEXT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
      product_id TEXT NOT NULL,
      product_name TEXT NOT NULL,
      product_category TEXT NOT NULL,
      product_pack_size TEXT,
      quantity INTEGER NOT NULL,
      unit_price INTEGER NOT NULL,
      line_total INTEGER NOT NULL
    );

    -- Payment tables
    CREATE TABLE IF NOT EXISTS payments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id TEXT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
      provider TEXT NOT NULL DEFAULT 'Razorpay',
      provider_order_id TEXT,
      provider_payment_id TEXT,
      provider_signature TEXT,
      amount INTEGER NOT NULL,
      currency TEXT NOT NULL DEFAULT 'INR',
      status TEXT NOT NULL DEFAULT 'pending',
      created_at INTEGER NOT NULL,
      verified_at INTEGER
    );

    -- Addresses table for saved shipping addresses
    CREATE TABLE IF NOT EXISTS addresses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      address TEXT NOT NULL,
      city TEXT NOT NULL,
      state TEXT NOT NULL,
      pincode TEXT NOT NULL,
      is_default INTEGER NOT NULL DEFAULT 0,
      created_at INTEGER NOT NULL,
      updated_at INTEGER NOT NULL
    );

    -- Products table for catalog
    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      mrp TEXT NOT NULL,  -- Stored as "₹2,499" format for display
      pack_size TEXT,
      image TEXT,
      video TEXT,
      short_description TEXT,
      description TEXT,
      highlights TEXT,  -- JSON array
      ingredients TEXT, -- JSON array
      stock INTEGER NOT NULL DEFAULT 999,
      created_at INTEGER NOT NULL,
      updated_at INTEGER NOT NULL
    );

    CREATE INDEX IF NOT EXISTS sessions_user_id_idx ON sessions(user_id);
    CREATE INDEX IF NOT EXISTS sessions_expires_at_idx ON sessions(expires_at);
    CREATE INDEX IF NOT EXISTS carts_user_id_idx ON carts(user_id);
    CREATE INDEX IF NOT EXISTS cart_items_cart_id_idx ON cart_items(cart_id);
    CREATE INDEX IF NOT EXISTS orders_user_id_idx ON orders(user_id);
    CREATE INDEX IF NOT EXISTS orders_status_idx ON orders(status);
    CREATE INDEX IF NOT EXISTS order_items_order_id_idx ON order_items(order_id);
    CREATE INDEX IF NOT EXISTS payments_order_id_idx ON payments(order_id);
    CREATE INDEX IF NOT EXISTS addresses_user_id_idx ON addresses(user_id);
    CREATE INDEX IF NOT EXISTS products_category_idx ON products(category);
    CREATE INDEX IF NOT EXISTS products_stock_idx ON products(stock);

    -- Admin users table
    CREATE TABLE IF NOT EXISTS admins (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE COLLATE NOCASE,
      name TEXT NOT NULL,
      password_salt TEXT NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'admin',
      is_active INTEGER NOT NULL DEFAULT 1,
      last_login_at INTEGER,
      created_at INTEGER NOT NULL,
      updated_at INTEGER NOT NULL
    );

    -- Admin sessions
    CREATE TABLE IF NOT EXISTS admin_sessions (
      token_hash TEXT PRIMARY KEY,
      admin_id INTEGER NOT NULL REFERENCES admins(id) ON DELETE CASCADE,
      expires_at INTEGER NOT NULL,
      created_at INTEGER NOT NULL
    );

    -- Audit logs
    CREATE TABLE IF NOT EXISTS audit_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      admin_id INTEGER REFERENCES admins(id) ON DELETE SET NULL,
      action TEXT NOT NULL,
      entity_type TEXT NOT NULL,
      entity_id TEXT,
      old_data TEXT,
      new_data TEXT,
      ip_address TEXT,
      user_agent TEXT,
      created_at INTEGER NOT NULL
    );

    CREATE INDEX IF NOT EXISTS admin_sessions_admin_id_idx ON admin_sessions(admin_id);
    CREATE INDEX IF NOT EXISTS admin_sessions_expires_at_idx ON admin_sessions(expires_at);
    CREATE INDEX IF NOT EXISTS audit_logs_admin_id_idx ON audit_logs(admin_id);
    CREATE INDEX IF NOT EXISTS audit_logs_entity_idx ON audit_logs(entity_type, entity_id);
    CREATE INDEX IF NOT EXISTS audit_logs_created_at_idx ON audit_logs(created_at);

  `);
  database.prepare("DELETE FROM sessions WHERE expires_at <= ?").run(Date.now());

  const app = Fastify({
    logger,
    bodyLimit: 16_384,
    trustProxy: process.env.TRUST_PROXY === "true",
  });

  await app.register(cookie);
  await app.register(helmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "https:"],
        mediaSrc: ["'self'", "https:"],
        fontSrc: ["'self'", "data:", "https:"],
        connectSrc: ["'self'", "https:"],
        objectSrc: ["'none'"],
        frameAncestors: ["'none'"],
        baseUri: ["'self'"],
        formAction: ["'self'"],
        upgradeInsecureRequests: process.env.NODE_ENV === "production" ? [] : null,
      },
    },
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    },
    referrerPolicy: { policy: "strict-origin-when-cross-origin" },
    crossOriginEmbedderPolicy: false,
    crossOriginOpenerPolicy: { policy: "same-origin" },
    crossOriginResourcePolicy: { policy: "same-origin" },
    dnsPrefetchControl: { allow: false },
    expectCt: { maxAge: 86400, enforce: true },
    frameguard: { action: "deny" },
    hidePoweredBy: true,
    ieNoOpen: true,
    noSniff: true,
    originAgentCluster: true,
    permittedCrossDomainPolicies: false,
    xssFilter: true,
  });
  await app.register(rateLimit, {
    max: 120,
    timeWindow: "1 minute",
    keyGenerator: (request) => request.ip,
  });

  // Performance: Response compression
  await app.register(import("@fastify/compress"), {
    global: true,
    threshold: 1024,
  });

  // Performance: ETags for static assets
  if (staticRoot) {
    await app.register(staticFiles, {
      root: resolve(staticRoot),
      prefix: "/",
      etag: true,
      lastModified: true,
      maxAge: "1y",
      immutable: true,
    });
  }

  // Performance: Database connection pooling (better-sqlite3 handles this)
  // Add query timeout protection
  const DB_QUERY_TIMEOUT = 5000;

  // Performance: Request timing header
  app.addHook("onResponse", async (request, reply) => {
    const startTime = request.startTime || Date.now();
    const duration = Date.now() - startTime;
    reply.header("X-Response-Time", `${duration}ms`);
    
    // Log slow queries
    if (duration > 1000) {
      console.warn(`[SLOW] ${request.method} ${request.url} took ${duration}ms`);
    }
  });

  // Performance: Request start time
  app.addHook("onRequest", async (request) => {
    request.startTime = Date.now();
  });

  app.addHook("onClose", async () => {
    database.close();
  });

  // Security: Log failed authentication attempts
  app.addHook("onError", async (request, reply, error) => {
    if (error.statusCode === 401 || error.statusCode === 403) {
      const logEntry = {
        timestamp: new Date().toISOString(),
        ip: request.ip,
        method: request.method,
        url: request.url,
        statusCode: error.statusCode,
        error: error.message,
        userAgent: request.headers["user-agent"],
      };
      // In production, send to security monitoring system
      console.warn("[SECURITY] Auth failure:", JSON.stringify(logEntry));
    }
  });

  // Security: Sanitize error responses in production
  app.setErrorHandler(async (error, request, reply) => {
    const statusCode = error.statusCode || 500;
    
    // Log all server errors
    if (statusCode >= 500) {
      console.error("[ERROR]", {
        timestamp: new Date().toISOString(),
        ip: request.ip,
        method: request.method,
        url: request.url,
        error: error.message,
        stack: error.stack,
      });
    }

    // Sanitize error response for production
    if (process.env.NODE_ENV === "production" && statusCode >= 500) {
      return reply.code(statusCode).send({
        error: "Internal server error. Please try again later.",
      });
    }

    return reply.code(statusCode).send({
      error: error.message || "Internal server error",
    });
  });

  app.get("/api/health", async (_request, reply) => {
    reply.header("Cache-Control", "no-store");
    
    // Check database connectivity
    let dbStatus = "ok";
    try {
      database.prepare("SELECT 1").get();
    } catch {
      dbStatus = "error";
    }
    
    const memUsage = process.memoryUsage();
    
    return {
      status: dbStatus === "ok" ? "ok" : "degraded",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      database: dbStatus,
      memory: {
        heapUsed: Math.round(memUsage.heapUsed / 1024 / 1024) + "MB",
        heapTotal: Math.round(memUsage.heapTotal / 1024 / 1024) + "MB",
        rss: Math.round(memUsage.rss / 1024 / 1024) + "MB",
      },
      version: process.version,
    };
  });

  app.post(
    "/api/auth/verification/send",
    {
      config: { rateLimit: { max: 4, timeWindow: "15 minutes" } },
      schema: { body: sendVerificationBodySchema },
    },
    async (request, reply) => {
      reply.header("Cache-Control", "no-store");
      const { channel } = request.body;
      const destination =
        channel === "email"
          ? request.body.value.trim().toLowerCase()
          : request.body.value.replace(/\D/g, "");

      if (
        (channel === "email" &&
          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(destination)) ||
        (channel === "mobile" && !/^[6-9][0-9]{9}$/.test(destination))
      ) {
        return reply.code(400).send({
          error:
            channel === "email"
              ? "Enter a valid email address."
              : "Enter a valid 10-digit mobile number.",
        });
      }

      const contactColumn = channel === "email" ? "email" : "mobile";
      const existingUser = database
        .prepare(`SELECT id FROM users WHERE ${contactColumn} = ?`)
        .get(destination);

      if (existingUser) {
        return reply.code(409).send({
          error: "This email or mobile number is already registered. Log in or use Forgot password?",
        });
      }

      const code = String(randomInt(0, 1_000_000)).padStart(6, "0");

      try {
        await verificationSender({ channel, destination, code });
      } catch {
        return reply.code(503).send({
          error: "Verification delivery is unavailable. Configure email/SMS delivery and try again.",
        });
      }

      const now = Date.now();
      database
        .prepare("DELETE FROM verification_codes WHERE expires_at <= ?")
        .run(now);
      database
        .prepare(`
          INSERT INTO verification_codes
            (channel, destination, code_hash, expires_at, attempts, verified_at)
          VALUES (?, ?, ?, ?, 0, NULL)
          ON CONFLICT(channel, destination) DO UPDATE SET
            code_hash = excluded.code_hash,
            expires_at = excluded.expires_at,
            attempts = 0,
            verified_at = NULL
        `)
        .run(
          channel,
          destination,
          hashVerificationCode(channel, destination, code),
          now + verificationLifetimeMs
        );

      return reply.code(202).send({
        message: "If this contact can be used, a verification code has been sent.",
      });
    },
  );

  app.post(
    "/api/auth/verification/verify",
    {
      config: { rateLimit: { max: 10, timeWindow: "15 minutes" } },
      schema: { body: verifyCodeBodySchema },
    },
    async (request, reply) => {
      reply.header("Cache-Control", "no-store");
      const { channel, code } = request.body;
      const destination =
        channel === "email"
          ? request.body.value.trim().toLowerCase()
          : request.body.value.replace(/\D/g, "");
      const challenge = database
        .prepare(`
          SELECT code_hash AS codeHash, expires_at AS expiresAt,
            attempts, verified_at AS verifiedAt
          FROM verification_codes
          WHERE channel = ? AND destination = ?
        `)
        .get(channel, destination);

      if (
        !challenge ||
        challenge.expiresAt <= Date.now() ||
        challenge.attempts >= verificationMaximumAttempts
      ) {
        return reply.code(400).send({
          error: "That code is expired or unavailable. Request a new code.",
        });
      }

      const codeMatches = matchesHash(
        challenge.codeHash,
        hashVerificationCode(channel, destination, code)
      );

      database
        .prepare(`
          UPDATE verification_codes
          SET attempts = attempts + 1
          WHERE channel = ? AND destination = ?
        `)
        .run(channel, destination);

      if (!codeMatches) {
        return reply.code(400).send({ error: "The verification code is incorrect." });
      }

      database
        .prepare(`
          UPDATE verification_codes
          SET verified_at = ?
          WHERE channel = ? AND destination = ?
        `)
        .run(Date.now(), channel, destination);

      return { verified: true, channel };
    },
  );

  app.post(
    "/api/auth/password-reset/send",
    {
      config: { rateLimit: { max: 4, timeWindow: "15 minutes" } },
      schema: { body: sendVerificationBodySchema },
    },
    async (request, reply) => {
      reply.header("Cache-Control", "no-store");
      const { channel } = request.body;
      const destination =
        channel === "email"
          ? request.body.value.trim().toLowerCase()
          : request.body.value.replace(/\D/g, "");

      if (
        (channel === "email" &&
          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(destination)) ||
        (channel === "mobile" && !/^[6-9][0-9]{9}$/.test(destination))
      ) {
        return reply.code(400).send({
          error:
            channel === "email"
              ? "Enter a valid email address."
              : "Enter a valid 10-digit mobile number.",
        });
      }

      const contactColumn = channel === "email" ? "email" : "mobile";
      const existingUser = database
        .prepare(`SELECT id FROM users WHERE ${contactColumn} = ?`)
        .get(destination);

      if (existingUser) {
        const code = String(randomInt(0, 1_000_000)).padStart(6, "0");

        try {
          await verificationSender({ channel, destination, code });
        } catch {
          return reply.code(503).send({
            error: "Password recovery delivery is unavailable. Please try again later.",
          });
        }

        const now = Date.now();
        database
          .prepare("DELETE FROM password_reset_codes WHERE expires_at <= ?")
          .run(now);
        database
          .prepare(`
            INSERT INTO password_reset_codes
              (channel, destination, code_hash, expires_at, attempts, verified_at)
            VALUES (?, ?, ?, ?, 0, NULL)
            ON CONFLICT(channel, destination) DO UPDATE SET
              code_hash = excluded.code_hash,
              expires_at = excluded.expires_at,
              attempts = 0,
              verified_at = NULL
          `)
          .run(
            channel,
            destination,
            hashVerificationCode(`password-reset-${channel}`, destination, code),
            now + verificationLifetimeMs
          );
      }

      return reply.code(202).send({
        message: "If an account matches that contact, a recovery code has been sent.",
      });
    },
  );

  app.post(
    "/api/auth/password-reset/verify",
    {
      config: { rateLimit: { max: 10, timeWindow: "15 minutes" } },
      schema: { body: verifyCodeBodySchema },
    },
    async (request, reply) => {
      reply.header("Cache-Control", "no-store");
      const { channel, code } = request.body;
      const destination =
        channel === "email"
          ? request.body.value.trim().toLowerCase()
          : request.body.value.replace(/\D/g, "");
      const challenge = database
        .prepare(`
          SELECT code_hash AS codeHash, expires_at AS expiresAt,
            attempts, verified_at AS verifiedAt
          FROM password_reset_codes
          WHERE channel = ? AND destination = ?
        `)
        .get(channel, destination);

      if (
        !challenge ||
        challenge.expiresAt <= Date.now() ||
        challenge.attempts >= verificationMaximumAttempts
      ) {
        return reply.code(400).send({
          error: "That recovery code is expired or unavailable. Request a new code.",
        });
      }

      const codeMatches = matchesHash(
        challenge.codeHash,
        hashVerificationCode(`password-reset-${channel}`, destination, code)
      );

      database
        .prepare(`
          UPDATE password_reset_codes
          SET attempts = attempts + 1
          WHERE channel = ? AND destination = ?
        `)
        .run(channel, destination);

      if (!codeMatches) {
        return reply.code(400).send({ error: "The recovery code is incorrect." });
      }

      database
        .prepare(`
          UPDATE password_reset_codes
          SET verified_at = ?
          WHERE channel = ? AND destination = ?
        `)
        .run(Date.now(), channel, destination);

      return { verified: true, channel };
    },
  );

  app.post(
    "/api/auth/password-reset/complete",
    {
      config: { rateLimit: { max: 5, timeWindow: "15 minutes" } },
      schema: { body: resetPasswordBodySchema },
    },
    async (request, reply) => {
      reply.header("Cache-Control", "no-store");
      const { channel, newPassword } = request.body;
      const destination =
        channel === "email"
          ? request.body.value.trim().toLowerCase()
          : request.body.value.replace(/\D/g, "");
      const challenge = database
        .prepare(`
          SELECT expires_at AS expiresAt, verified_at AS verifiedAt,
            attempts
          FROM password_reset_codes
          WHERE channel = ? AND destination = ?
        `)
        .get(channel, destination);

      if (
        !challenge?.verifiedAt ||
        challenge.expiresAt <= Date.now() ||
        challenge.attempts > verificationMaximumAttempts
      ) {
        return reply.code(400).send({
          error: "Verify a current recovery code before changing your password.",
        });
      }

      const contactColumn = channel === "email" ? "email" : "mobile";
      const user = database
        .prepare(`SELECT id, email, mobile FROM users WHERE ${contactColumn} = ?`)
        .get(destination);

      if (!user) {
        return reply.code(400).send({
          error: "Verify a current recovery code before changing your password.",
        });
      }

      const password = await hashPassword(newPassword);
      const updatePassword = database.transaction(() => {
        const consumedChallenge = database
          .prepare(`
            DELETE FROM password_reset_codes
            WHERE channel = ? AND destination = ?
              AND verified_at IS NOT NULL
              AND expires_at > ?
              AND attempts <= ?
          `)
          .run(
            channel,
            destination,
            Date.now(),
            verificationMaximumAttempts
          );

        if (consumedChallenge.changes !== 1) {
          return false;
        }

        database
          .prepare(`
            UPDATE users
            SET password_salt = ?, password_hash = ?
            WHERE id = ?
          `)
          .run(password.salt, password.hash, user.id);
        database.prepare("DELETE FROM sessions WHERE user_id = ?").run(user.id);
        database
          .prepare(`
            DELETE FROM password_reset_codes
            WHERE (channel = 'email' AND destination = ?)
              OR (channel = 'mobile' AND destination = ?)
          `)
          .run(user.email, user.mobile);

        return true;
      });

      if (!updatePassword()) {
        return reply.code(400).send({
          error: "Verify a current recovery code before changing your password.",
        });
      }

      return { success: true };
    },
  );

  app.post(
    "/api/auth/register",
    {
      config: { rateLimit: { max: 5, timeWindow: "15 minutes" } },
      schema: { body: registerBodySchema },
    },
    async (request, reply) => {
      reply.header("Cache-Control", "no-store");

      const name = request.body.name.trim();
      const email = request.body.email.trim().toLowerCase();
      const mobile = request.body.mobile.replace(/\s/g, "");

      if (name.length < 2) {
        return reply.code(400).send({ error: "Enter your full name." });
      }

      if (!/^[6-9][0-9]{9}$/.test(mobile)) {
        return reply.code(400).send({ error: "Enter a valid 10-digit mobile number." });
      }

      const now = Date.now();
      const emailVerification = database
        .prepare(`
          SELECT verified_at AS verifiedAt, expires_at AS expiresAt
          FROM verification_codes
          WHERE channel = 'email' AND destination = ?
        `)
        .get(email);
      if (
        !emailVerification?.verifiedAt ||
        emailVerification.expiresAt <= now
      ) {
        return reply.code(400).send({
          error: "Verify your email address before creating an account.",
        });
      }

      const existingUser = database
        .prepare("SELECT id FROM users WHERE email = ? OR mobile = ?")
        .get(email, mobile);

      if (existingUser) {
        return reply
          .code(409)
          .send({ error: "An account with that email or mobile number already exists." });
      }

      const password = await hashPassword(request.body.password);
      let result;

      try {
        result = database
          .prepare(`
            INSERT INTO users (name, email, mobile, password_salt, password_hash)
            VALUES (?, ?, ?, ?, ?)
          `)
          .run(name, email, mobile, password.salt, password.hash);
      } catch (error) {
        if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
          return reply
            .code(409)
            .send({ error: "An account with that email or mobile number already exists." });
        }

        throw error;
      }

      const user = database
        .prepare(`SELECT ${userFields} FROM users WHERE id = ?`)
        .get(result.lastInsertRowid);
      const token = randomBytes(32).toString("base64url");
      const expiresAt = Date.now() + sessionLifetimeSeconds * 1000;

      database
        .prepare(`
          INSERT INTO sessions (token_hash, user_id, expires_at, created_at)
          VALUES (?, ?, ?, ?)
        `)
        .run(hashToken(token), user.id, expiresAt, Date.now());

      database
        .prepare(`
          DELETE FROM verification_codes
          WHERE channel = 'email' AND destination = ?
        `)
        .run(email);

      setSessionCookie(reply, token, cookieSecure);
      return reply.code(201).send({ user: normalizeUser(user) });
    },
  );

  app.post(
    "/api/auth/login",
    {
      config: { rateLimit: { max: 5, timeWindow: "15 minutes" } },
      schema: { body: loginBodySchema },
    },
    async (request, reply) => {
      reply.header("Cache-Control", "no-store");

      const identifier = request.body.identifier.trim();
      const mobile = identifier.replace(/\s/g, "");
      const isMobile = /^[0-9]{10}$/.test(mobile);
      const normalizedIdentifier = isMobile ? mobile : identifier.toLowerCase();
      const user = database
        .prepare(`
          SELECT id, name, email, mobile, password_salt, password_hash,
            created_at AS createdAt
          FROM users
          WHERE ${isMobile ? "mobile" : "email"} = ?
        `)
        .get(normalizedIdentifier);

      const dummySalt = Buffer.alloc(16).toString("hex");
      const dummyHash = Buffer.alloc(passwordKeyLength).toString("hex");
      const passwordMatches = await verifyPassword(
        request.body.password,
        user?.password_salt || dummySalt,
        user?.password_hash || dummyHash,
      );

      if (!user || !passwordMatches) {
        return reply.code(401).send({ error: "Email/mobile or password is incorrect." });
      }

      const token = randomBytes(32).toString("base64url");
      const expiresAt = Date.now() + sessionLifetimeSeconds * 1000;

      database
        .prepare("DELETE FROM sessions WHERE expires_at <= ?")
        .run(Date.now());
      database
        .prepare(`
          INSERT INTO sessions (token_hash, user_id, expires_at, created_at)
          VALUES (?, ?, ?, ?)
        `)
        .run(hashToken(token), user.id, expiresAt, Date.now());

      setSessionCookie(reply, token, cookieSecure);
      return { user: normalizeUser(user) };
    },
  );

  app.get("/api/auth/session", async (request, reply) => {
    reply.header("Cache-Control", "no-store");
    const token = request.cookies[sessionCookieName];

    if (!token) {
      return { user: null };
    }

    const session = database
      .prepare(`
        SELECT ${userFields}, sessions.expires_at AS expiresAt
        FROM sessions
        JOIN users ON users.id = sessions.user_id
        WHERE sessions.token_hash = ? AND sessions.expires_at > ?
      `)
      .get(hashToken(token), Date.now());

    if (!session) {
      database
        .prepare("DELETE FROM sessions WHERE token_hash = ?")
        .run(hashToken(token));
      reply.clearCookie(sessionCookieName, { path: "/", secure: cookieSecure });
      return { user: null };
    }

    return { user: normalizeUser(session) };
  });

  app.post("/api/auth/logout", async (request, reply) => {
    reply.header("Cache-Control", "no-store");
    const token = request.cookies[sessionCookieName];

    if (token) {
      database
        .prepare("DELETE FROM sessions WHERE token_hash = ?")
        .run(hashToken(token));
    }

    reply.clearCookie(sessionCookieName, { path: "/", secure: cookieSecure });
    return { success: true };
  });

  // ============================================================
  // ADMIN AUTHENTICATION ENDPOINTS
  // ============================================================

  const adminLoginBodySchema = {
    type: "object",
    additionalProperties: false,
    required: ["email", "password"],
    properties: {
      email: { type: "string", format: "email", maxLength: 254 },
      password: { type: "string", minLength: 1, maxLength: 128 },
    },
  };

  function hashAdminToken(token) {
    return createHash("sha256").update(token).digest("hex");
  }

  // Admin login
  app.post(
    "/api/admin/auth/login",
    {
      config: { rateLimit: { max: 5, timeWindow: "15 minutes" } },
      schema: { body: adminLoginBodySchema },
    },
    async (request, reply) => {
      reply.header("Cache-Control", "no-store");
      const { email, password } = request.body;
      const normalizedEmail = email.trim().toLowerCase();

      const admin = database
        .prepare(
          `SELECT id, name, email, password_salt, password_hash, role, is_active
           FROM admins WHERE email = ?`
        )
        .get(normalizedEmail);

      const dummySalt = Buffer.alloc(16).toString("hex");
      const dummyHash = Buffer.alloc(passwordKeyLength).toString("hex");
      const passwordMatches = await verifyPassword(
        password,
        admin?.password_salt || dummySalt,
        admin?.password_hash || dummyHash
      );

      if (!admin || !passwordMatches || admin.is_active !== 1) {
        return reply.code(401).send({ error: "Invalid credentials." });
      }

      const token = randomBytes(32).toString("base64url");
      const expiresAt = Date.now() + sessionLifetimeSeconds * 1000;

      database
        .prepare("DELETE FROM admin_sessions WHERE expires_at <= ?")
        .run(Date.now());
      database
        .prepare(
          `INSERT INTO admin_sessions (token_hash, admin_id, expires_at, created_at)
           VALUES (?, ?, ?, ?)`
        )
        .run(hashAdminToken(token), admin.id, expiresAt, Date.now());

      database
        .prepare(`UPDATE admins SET last_login_at = ? WHERE id = ?`)
        .run(Date.now(), admin.id);

      setAdminSessionCookie(reply, token, cookieSecure);

      return {
        admin: {
          id: admin.id,
          name: admin.name,
          email: admin.email,
          role: admin.role,
        },
      };
    }
  );

  // Admin session check
  app.get("/api/admin/auth/session", async (request, reply) => {
    reply.header("Cache-Control", "no-store");
    const token = request.cookies[adminSessionCookieName];

    if (!token) {
      return { admin: null };
    }

    const session = database
      .prepare(
        `SELECT a.id, a.name, a.email, a.role, a.is_active, s.expires_at AS expiresAt
         FROM admin_sessions s
         JOIN admins a ON a.id = s.admin_id
         WHERE s.token_hash = ? AND s.expires_at > ? AND a.is_active = 1`
      )
      .get(hashAdminToken(token), Date.now());

    if (!session) {
      database
        .prepare("DELETE FROM admin_sessions WHERE token_hash = ?")
        .run(hashAdminToken(token));
      reply.clearCookie(adminSessionCookieName, { path: "/", secure: cookieSecure });
      return { admin: null };
    }

    return { admin: { id: session.id, name: session.name, email: session.email, role: session.role } };
  });

  // Admin logout
  app.post("/api/admin/auth/logout", async (request, reply) => {
    reply.header("Cache-Control", "no-store");
    const token = request.cookies[adminSessionCookieName];

    if (token) {
      database
        .prepare("DELETE FROM admin_sessions WHERE token_hash = ?")
        .run(hashAdminToken(token));
    }

    reply.clearCookie(adminSessionCookieName, { path: "/", secure: cookieSecure });
    return { success: true };
  });

  // Admin middleware - check admin session
  async function requireAdmin(request, reply) {
    const token = request.cookies[adminSessionCookieName];
    if (!token) {
      return reply.code(401).send({ error: "Admin authentication required." });
    }

    const session = database
      .prepare(
        `SELECT a.id, a.name, a.email, a.role, a.is_active, s.expires_at AS expiresAt
         FROM admin_sessions s
         JOIN admins a ON a.id = s.admin_id
         WHERE s.token_hash = ? AND s.expires_at > ? AND a.is_active = 1`
      )
      .get(hashAdminToken(token), Date.now());

    if (!session) {
      reply.clearCookie(adminSessionCookieName, { path: "/", secure: cookieSecure });
      return reply.code(401).send({ error: "Admin session expired." });
    }

    request.admin = session;
  }

  // Audit log helper
  async function logAudit(adminId, action, entityType, entityId, oldData, newData, request) {
    database
      .prepare(`
        INSERT INTO audit_logs (admin_id, action, entity_type, entity_id, old_data, new_data, ip_address, user_agent, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `)
      .run(
        adminId,
        action,
        entityType,
        entityId,
        oldData ? JSON.stringify(oldData) : null,
        newData ? JSON.stringify(newData) : null,
        request?.ip || null,
        request?.headers?.["user-agent"] || null,
        Date.now()
      );
  }

  // ============================================================
  // CART ENDPOINTS
  // ============================================================

  const cartBodySchema = {
    type: "object",
    additionalProperties: false,
    required: ["productId", "productName", "productCategory", "quantity"],
    properties: {
      productId: { type: "string", minLength: 1, maxLength: 100 },
      productName: { type: "string", minLength: 1, maxLength: 255 },
      productCategory: { type: "string", minLength: 1, maxLength: 100 },
      productPackSize: { type: "string", maxLength: 100 },
      productColor: { type: "string", maxLength: 50 },
      quantity: { type: "integer", minimum: 1, maximum: 99 },
    },
  };

  const cartUpdateBodySchema = {
    type: "object",
    additionalProperties: false,
    required: ["quantity"],
    properties: {
      quantity: { type: "integer", minimum: 0, maximum: 99 },
    },
  };

  async function getOrCreateCart(userId) {
    let cart = database.prepare("SELECT id FROM carts WHERE user_id = ?").get(userId);
    const now = Date.now();
    if (!cart) {
      const result = database
        .prepare("INSERT INTO carts (user_id, created_at, updated_at) VALUES (?, ?, ?)")
        .run(userId, now, now);
      cart = { id: result.lastInsertRowid };
    }
    return cart;
  }

  // Get cart
  app.get("/api/cart", async (request, reply) => {
    reply.header("Cache-Control", "no-store");
    const token = request.cookies[sessionCookieName];
    if (!token) {
      return reply.code(401).send({ error: "Not authenticated." });
    }

    const session = database
      .prepare(
        `SELECT user_id FROM sessions WHERE token_hash = ? AND expires_at > ?`
      )
      .get(hashToken(token), Date.now());

    if (!session) {
      return reply.code(401).send({ error: "Session expired." });
    }

    const cart = await getOrCreateCart(session.user_id);
    const items = database
      .prepare(
        `SELECT id, product_id AS productId, product_name AS productName,
          product_category AS productCategory, product_pack_size AS productPackSize,
          product_color AS productColor, quantity, unit_price AS unitPrice,
          created_at AS createdAt, updated_at AS updatedAt
        FROM cart_items WHERE cart_id = ?`
      )
      .all(cart.id);

    return { items };
  });

  // Add item to cart
  app.post(
    "/api/cart",
    {
      schema: { body: cartBodySchema },
    },
    async (request, reply) => {
      reply.header("Cache-Control", "no-store");
      const token = request.cookies[sessionCookieName];
      if (!token) {
        return reply.code(401).send({ error: "Not authenticated." });
      }

      const session = database
        .prepare(
          `SELECT user_id FROM sessions WHERE token_hash = ? AND expires_at > ?`
        )
        .get(hashToken(token), Date.now());

      if (!session) {
        return reply.code(401).send({ error: "Session expired." });
      }

      const cart = await getOrCreateCart(session.user_id);
      const { productId, productName, productCategory, productPackSize, productColor, quantity } = request.body;

      // Get server-side price for validation
      const unitPrice = getProductPrice(productId);

      const now = Date.now();
      database
        .prepare(`
          INSERT INTO cart_items (cart_id, product_id, product_name, product_category, product_pack_size, product_color, quantity, unit_price, created_at, updated_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          ON CONFLICT(cart_id, product_id) DO UPDATE SET
            quantity = quantity + excluded.quantity,
            updated_at = excluded.updated_at
        `)
        .run(cart.id, productId, productName, productCategory, productPackSize || null, productColor || null, quantity, unitPrice, now, now);

      database.prepare("UPDATE carts SET updated_at = ? WHERE id = ?").run(now, cart.id);

      return reply.code(201).send({ success: true });
    }
  );

  // Update cart item quantity
  app.patch(
    "/api/cart/:productId",
    {
      schema: { body: cartUpdateBodySchema },
    },
    async (request, reply) => {
      reply.header("Cache-Control", "no-store");
      const token = request.cookies[sessionCookieName];
      if (!token) {
        return reply.code(401).send({ error: "Not authenticated." });
      }

      const session = database
        .prepare(
          `SELECT user_id FROM sessions WHERE token_hash = ? AND expires_at > ?`
        )
        .get(hashToken(token), Date.now());

      if (!session) {
        return reply.code(401).send({ error: "Session expired." });
      }

      const cart = database.prepare("SELECT id FROM carts WHERE user_id = ?").get(session.user_id);
      if (!cart) {
        return reply.code(404).send({ error: "Cart not found." });
      }

      const { productId } = request.params;
      const { quantity } = request.body;
      const now = Date.now();

      if (quantity === 0) {
        database.prepare("DELETE FROM cart_items WHERE cart_id = ? AND product_id = ?").run(cart.id, productId);
      } else {
        const result = database
          .prepare("UPDATE cart_items SET quantity = ?, updated_at = ? WHERE cart_id = ? AND product_id = ?")
          .run(quantity, now, cart.id, productId);
        if (result.changes === 0) {
          return reply.code(404).send({ error: "Item not in cart." });
        }
      }

      database.prepare("UPDATE carts SET updated_at = ? WHERE id = ?").run(now, cart.id);
      return { success: true };
    }
  );

  // Remove item from cart
  app.delete(
    "/api/cart/:productId",
    async (request, reply) => {
      reply.header("Cache-Control", "no-store");
      const token = request.cookies[sessionCookieName];
      if (!token) {
        return reply.code(401).send({ error: "Not authenticated." });
      }

      const session = database
        .prepare(
          `SELECT user_id FROM sessions WHERE token_hash = ? AND expires_at > ?`
        )
        .get(hashToken(token), Date.now());

      if (!session) {
        return reply.code(401).send({ error: "Session expired." });
      }

      const cart = database.prepare("SELECT id FROM carts WHERE user_id = ?").get(session.user_id);
      if (!cart) {
        return reply.code(404).send({ error: "Cart not found." });
      }

      const { productId } = request.params;
      database.prepare("DELETE FROM cart_items WHERE cart_id = ? AND product_id = ?").run(cart.id, productId);

      const now = Date.now();
      database.prepare("UPDATE carts SET updated_at = ? WHERE id = ?").run(now, cart.id);
      return { success: true };
    }
  );

  // Clear cart
  app.delete(
    "/api/cart",
    async (request, reply) => {
      reply.header("Cache-Control", "no-store");
      const token = request.cookies[sessionCookieName];
      if (!token) {
        return reply.code(401).send({ error: "Not authenticated." });
      }

      const session = database
        .prepare(
          `SELECT user_id FROM sessions WHERE token_hash = ? AND expires_at > ?`
        )
        .get(hashToken(token), Date.now());

      if (!session) {
        return reply.code(401).send({ error: "Session expired." });
      }

      const cart = database.prepare("SELECT id FROM carts WHERE user_id = ?").get(session.user_id);
      if (cart) {
        database.prepare("DELETE FROM cart_items WHERE cart_id = ?").run(cart.id);
        const now = Date.now();
        database.prepare("UPDATE carts SET updated_at = ? WHERE id = ?").run(now, cart.id);
      }
      return { success: true };
    }
  );

  // ============================================================
  // ORDER ENDPOINTS
  // ============================================================

  const orderBodySchema = {
    type: "object",
    additionalProperties: false,
    required: ["shippingAddress", "shippingCity", "shippingState", "shippingPincode"],
    properties: {
      shippingAddress: { type: "string", minLength: 5, maxLength: 500 },
      shippingCity: { type: "string", minLength: 2, maxLength: 100 },
      shippingState: { type: "string", minLength: 2, maxLength: 100 },
      shippingPincode: { type: "string", pattern: "^[1-9][0-9]{5}$" },
    },
  };

  // Create order from cart
  app.post(
    "/api/orders",
    {
      schema: { body: orderBodySchema },
    },
    async (request, reply) => {
      reply.header("Cache-Control", "no-store");
      const token = request.cookies[sessionCookieName];
      if (!token) {
        return reply.code(401).send({ error: "Not authenticated." });
      }

      const session = database
        .prepare(
          `SELECT user_id FROM sessions WHERE token_hash = ? AND expires_at > ?`
        )
        .get(hashToken(token), Date.now());

      if (!session) {
        return reply.code(401).send({ error: "Session expired." });
      }

      const user = database
        .prepare(`SELECT id, name, email, mobile FROM users WHERE id = ?`)
        .get(session.user_id);

      if (!user) {
        return reply.code(404).send({ error: "User not found." });
      }

      const cart = database.prepare("SELECT id FROM carts WHERE user_id = ?").get(session.user_id);
      if (!cart) {
        return reply.code(400).send({ error: "Cart is empty." });
      }

      const cartItems = database
        .prepare(
          `SELECT product_id, product_name, product_category, product_pack_size, quantity, unit_price
           FROM cart_items WHERE cart_id = ?`
        )
        .all(cart.id);

      if (cartItems.length === 0) {
        return reply.code(400).send({ error: "Cart is empty." });
      }

      // Server-side price calculation
      let subtotal = 0;
      for (const item of cartItems) {
        const serverPrice = getProductPrice(item.product_id);
        if (serverPrice !== null && item.unit_price !== serverPrice) {
          // Price mismatch - use server price
          item.unit_price = serverPrice;
        }
        subtotal += item.unit_price * item.quantity;
      }

      const total = subtotal; // No shipping/tax for now
      const orderId = "ORD-" + Date.now() + "-" + randomBytes(4).toString("hex");
      const now = Date.now();

      const createOrder = database.transaction(() => {
        // Create order
        database
          .prepare(`
            INSERT INTO orders (
              id, user_id, status, payment_status,
              customer_name, customer_email, customer_mobile,
              shipping_address, shipping_city, shipping_state, shipping_pincode,
              subtotal, total, currency, created_at, updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          `)
          .run(
            orderId,
            user.id,
            "pending",
            "pending",
            user.name,
            user.email,
            user.mobile,
            request.body.shippingAddress,
            request.body.shippingCity,
            request.body.shippingState,
            request.body.shippingPincode,
            subtotal,
            total,
            "INR",
            now,
            now
          );

        // Create order items
        for (const item of cartItems) {
          database
            .prepare(`
              INSERT INTO order_items (order_id, product_id, product_name, product_category, product_pack_size, quantity, unit_price, line_total)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `)
            .run(
              orderId,
              item.product_id,
              item.product_name,
              item.product_category,
              item.product_pack_size,
              item.quantity,
              item.unit_price,
              item.unit_price * item.quantity
            );
        }

        // Clear cart
        database.prepare("DELETE FROM cart_items WHERE cart_id = ?").run(cart.id);
        database.prepare("UPDATE carts SET updated_at = ? WHERE id = ?").run(now, cart.id);
      });

      createOrder();

      return reply.code(201).send({
        orderId,
        subtotal,
        total,
        currency: "INR",
      });
    }
  );

  // Get order history
  app.get("/api/orders", async (request, reply) => {
    reply.header("Cache-Control", "no-store");
    const token = request.cookies[sessionCookieName];
    if (!token) {
      return reply.code(401).send({ error: "Not authenticated." });
    }

    const session = database
      .prepare(
        `SELECT user_id FROM sessions WHERE token_hash = ? AND expires_at > ?`
      )
      .get(hashToken(token), Date.now());

    if (!session) {
      return reply.code(401).send({ error: "Session expired." });
    }

    const orders = database
      .prepare(`
        SELECT id, status, payment_status, subtotal, total, currency, created_at AS createdAt
        FROM orders WHERE user_id = ? ORDER BY created_at DESC
      `)
      .all(session.user_id);

    return { orders };
  });

  // Get order details
  app.get("/api/orders/:orderId", async (request, reply) => {
    reply.header("Cache-Control", "no-store");
    const token = request.cookies[sessionCookieName];
    if (!token) {
      return reply.code(401).send({ error: "Not authenticated." });
    }

    const session = database
      .prepare(
        `SELECT user_id FROM sessions WHERE token_hash = ? AND expires_at > ?`
      )
      .get(hashToken(token), Date.now());

    if (!session) {
      return reply.code(401).send({ error: "Session expired." });
    }

    const { orderId } = request.params;
    const order = database
      .prepare(`
        SELECT id, status, payment_status, customer_name, customer_email, customer_mobile,
          shipping_address, shipping_city, shipping_state, shipping_pincode,
          subtotal, total, currency, created_at AS createdAt, paid_at AS paidAt
        FROM orders WHERE id = ? AND user_id = ?
      `)
      .get(orderId, session.user_id);

    if (!order) {
      return reply.code(404).send({ error: "Order not found." });
    }

    const items = database
      .prepare(`
        SELECT product_id, product_name, product_category, product_pack_size, quantity, unit_price, line_total
        FROM order_items WHERE order_id = ?
      `)
      .all(orderId);

    const payment = database
      .prepare(`
        SELECT provider, provider_order_id, provider_payment_id, amount, status, created_at, verified_at
        FROM payments WHERE order_id = ?
      `)
      .get(orderId);

    return { order: { ...order, items, payment } };
  });

  // ============================================================
  // PAYMENT ENDPOINTS (Razorpay Integration)
  // ============================================================

  const razorpayKeyId = process.env.RAZORPAY_KEY_ID || "rzp_test_demo";
  const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET || "";

  // Create Razorpay order for payment
  app.post(
    "/api/payments/create-order",
    async (request, reply) => {
      reply.header("Cache-Control", "no-store");
      const token = request.cookies[sessionCookieName];
      if (!token) {
        return reply.code(401).send({ error: "Not authenticated." });
      }

      const session = database
        .prepare(
          `SELECT user_id FROM sessions WHERE token_hash = ? AND expires_at > ?`
        )
        .get(hashToken(token), Date.now());

      if (!session) {
        return reply.code(401).send({ error: "Session expired." });
      }

      const { orderId } = request.body;
      if (!orderId) {
        return reply.code(400).send({ error: "Order ID required." });
      }

      const order = database
        .prepare(
          `SELECT id, total, currency, payment_status FROM orders WHERE id = ? AND user_id = ?`
        )
        .get(orderId, session.user_id);

      if (!order) {
        return reply.code(404).send({ error: "Order not found." });
      }

      if (order.payment_status === "paid") {
        return reply.code(400).send({ error: "Order already paid." });
      }

      if (!razorpayKeySecret) {
        return reply.code(503).send({ error: "Payment provider not configured." });
      }

      // Create Razorpay order via their API
      const rpOrderRes = await fetch("https://api.razorpay.com/v1/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + Buffer.from(razorpayKeyId + ":" + razorpayKeySecret).toString("base64"),
        },
        body: JSON.stringify({
          amount: order.total,
          currency: order.currency,
          receipt: order.id,
          notes: { order_id: order.id },
        }),
      });

      if (!rpOrderRes.ok) {
        const err = await rpOrderRes.json().catch(() => ({}));
        return reply.code(502).send({ error: "Failed to create payment order.", details: err });
      }

      const rpOrder = await rpOrderRes.json();

      // Store payment record
      const now = Date.now();
      database
        .prepare(`
          INSERT INTO payments (order_id, provider, provider_order_id, amount, currency, status, created_at)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `)
        .run(order.id, "Razorpay", rpOrder.id, order.total, order.currency, "created", now);

      return {
        razorpayOrderId: rpOrder.id,
        amount: rpOrder.amount,
        currency: rpOrder.currency,
        keyId: razorpayKeyId,
      };
    }
  );

  // Verify payment signature
  app.post(
    "/api/payments/verify",
    async (request, reply) => {
      reply.header("Cache-Control", "no-store");
      const token = request.cookies[sessionCookieName];
      if (!token) {
        return reply.code(401).send({ error: "Not authenticated." });
      }

      const session = database
        .prepare(
          `SELECT user_id FROM sessions WHERE token_hash = ? AND expires_at > ?`
        )
        .get(hashToken(token), Date.now());

      if (!session) {
        return reply.code(401).send({ error: "Session expired." });
      }

      const { razorpayOrderId, razorpayPaymentId, razorpaySignature, orderId } = request.body;

      if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature || !orderId) {
        return reply.code(400).send({ error: "Missing payment verification fields." });
      }

      const order = database
        .prepare(
          `SELECT id, total, payment_status FROM orders WHERE id = ? AND user_id = ?`
        )
        .get(orderId, session.user_id);

      if (!order) {
        return reply.code(404).send({ error: "Order not found." });
      }

      if (order.payment_status === "paid") {
        return reply.code(400).send({ error: "Order already paid." });
      }

      if (!razorpayKeySecret) {
        return reply.code(503).send({ error: "Payment provider not configured." });
      }

      // Verify signature
      const expectedSignature = createHmac("sha256", razorpayKeySecret)
        .update(razorpayOrderId + "|" + razorpayPaymentId)
        .digest("hex");

      if (!timingSafeEqual(Buffer.from(expectedSignature), Buffer.from(razorpaySignature))) {
        return reply.code(400).send({ error: "Invalid payment signature." });
      }

      // Fetch payment details from Razorpay to confirm
      const rpPaymentRes = await fetch(`https://api.razorpay.com/v1/payments/${razorpayPaymentId}`, {
        headers: {
          Authorization: "Basic " + Buffer.from(razorpayKeyId + ":" + razorpayKeySecret).toString("base64"),
        },
      });

      if (!rpPaymentRes.ok) {
        return reply.code(502).send({ error: "Failed to verify payment with provider." });
      }

      const rpPayment = await rpPaymentRes.json();

      if (rpPayment.status !== "captured" && rpPayment.status !== "authorized") {
        return reply.code(400).send({ error: "Payment not successful.", details: rpPayment });
      }

      if (rpPayment.amount !== order.total || rpPayment.currency !== order.currency) {
        return reply.code(400).send({ error: "Payment amount mismatch." });
      }

      // Update payment and order atomically
      const now = Date.now();
      const updatePayment = database.transaction(() => {
        database
          .prepare(`
            UPDATE payments
            SET provider_payment_id = ?, provider_signature = ?, status = ?, verified_at = ?
            WHERE provider_order_id = ? AND order_id = ?
          `)
          .run(razorpayPaymentId, razorpaySignature, "paid", now, razorpayOrderId, order.id);

        database
          .prepare(`
            UPDATE orders
            SET payment_status = ?, status = ?, paid_at = ?, updated_at = ?
            WHERE id = ?
          `)
          .run("paid", "confirmed", now, now, order.id);
      });

      updatePayment();

      return { success: true, paymentId: razorpayPaymentId };
    }
  );

  // Payment webhook (for async notifications)
  app.post(
    "/api/payments/webhook",
    async (request, reply) => {
      const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
      const signature = request.headers["x-razorpay-signature"];

      if (webhookSecret && signature) {
        const expectedSignature = createHmac("sha256", webhookSecret)
          .update(JSON.stringify(request.body))
          .digest("hex");

        if (!timingSafeEqual(Buffer.from(expectedSignature), Buffer.from(signature))) {
          return reply.code(400).send({ error: "Invalid webhook signature." });
        }
      }

      const event = request.body;
      const payment = event.payload?.payment?.entity;

      if (payment && payment.order_id) {
        const providerOrderId = payment.order_id;
        const providerPaymentId = payment.id;
        const status = payment.status;

        const paymentRecord = database
          .prepare(`SELECT * FROM payments WHERE provider_order_id = ?`)
          .get(providerOrderId);

        if (paymentRecord && paymentRecord.status !== "paid") {
          if (status === "captured" || status === "authorized") {
            const now = Date.now();
            database
              .prepare(`
                UPDATE payments
                SET provider_payment_id = ?, status = ?, verified_at = ?
                WHERE provider_order_id = ?
              `)
              .run(providerPaymentId, "paid", now, providerOrderId);

            database
              .prepare(`
                UPDATE orders
                SET payment_status = ?, status = ?, paid_at = ?, updated_at = ?
                WHERE id = ?
              `)
              .run("paid", "confirmed", now, now, paymentRecord.order_id);
          } else if (status === "failed") {
            const now = Date.now();
            database
              .prepare(`
                UPDATE payments
                SET status = ?, verified_at = ?
                WHERE provider_order_id = ?
              `)
              .run("failed", now, providerOrderId);

            database
              .prepare(`
                UPDATE orders
                SET payment_status = ?, updated_at = ?
                WHERE id = ?
              `)
              .run("failed", now, paymentRecord.order_id);
          }
        }
      }

      return { received: true };
    }
  );

  // ============================================================
  // CUSTOMER ACCOUNT ENDPOINTS
  // ============================================================

  const profileUpdateSchema = {
    type: "object",
    additionalProperties: false,
    properties: {
      name: { type: "string", minLength: 2, maxLength: 100 },
    },
  };

  const addressSchema = {
    type: "object",
    additionalProperties: false,
    required: ["name", "phone", "address", "city", "state", "pincode"],
    properties: {
      name: { type: "string", minLength: 2, maxLength: 100 },
      phone: { type: "string", pattern: "^[6-9][0-9]{9}$" },
      address: { type: "string", minLength: 5, maxLength: 500 },
      city: { type: "string", minLength: 2, maxLength: 100 },
      state: { type: "string", minLength: 2, maxLength: 100 },
      pincode: { type: "string", pattern: "^[1-9][0-9]{5}$" },
      isDefault: { type: "boolean" },
    },
  };

  // Get profile
  app.get("/api/account/profile", async (request, reply) => {
    reply.header("Cache-Control", "no-store");
    const token = request.cookies[sessionCookieName];
    if (!token) {
      return reply.code(401).send({ error: "Not authenticated." });
    }

    const session = database
      .prepare(
        `SELECT user_id FROM sessions WHERE token_hash = ? AND expires_at > ?`
      )
      .get(hashToken(token), Date.now());

    if (!session) {
      return reply.code(401).send({ error: "Session expired." });
    }

    const user = database
      .prepare(`SELECT id, name, email, mobile, created_at AS createdAt FROM users WHERE id = ?`)
      .get(session.user_id);

    if (!user) {
      return reply.code(404).send({ error: "User not found." });
    }

    return { user };
  });

  // Update profile (name only)
  app.patch(
    "/api/account/profile",
    { schema: { body: profileUpdateSchema } },
    async (request, reply) => {
      reply.header("Cache-Control", "no-store");
      const token = request.cookies[sessionCookieName];
      if (!token) {
        return reply.code(401).send({ error: "Not authenticated." });
      }

      const session = database
        .prepare(
          `SELECT user_id FROM sessions WHERE token_hash = ? AND expires_at > ?`
        )
        .get(hashToken(token), Date.now());

      if (!session) {
        return reply.code(401).send({ error: "Session expired." });
      }

      const { name } = request.body;
      database
        .prepare(`UPDATE users SET name = ? WHERE id = ?`)
        .run(name, session.user_id);

      const user = database
        .prepare(`SELECT id, name, email, mobile, created_at AS createdAt FROM users WHERE id = ?`)
        .get(session.user_id);

      return { user };
    }
  );

  // Get saved addresses
  app.get("/api/account/addresses", async (request, reply) => {
    reply.header("Cache-Control", "no-store");
    const token = request.cookies[sessionCookieName];
    if (!token) {
      return reply.code(401).send({ error: "Not authenticated." });
    }

    const session = database
      .prepare(
        `SELECT user_id FROM sessions WHERE token_hash = ? AND expires_at > ?`
      )
      .get(hashToken(token), Date.now());

    if (!session) {
      return reply.code(401).send({ error: "Session expired." });
    }

    const addresses = database
      .prepare(`SELECT * FROM addresses WHERE user_id = ? ORDER BY is_default DESC, created_at DESC`)
      .all(session.user_id);

    return { addresses };
  });

  // Add address
  app.post(
    "/api/account/addresses",
    { schema: { body: addressSchema } },
    async (request, reply) => {
      reply.header("Cache-Control", "no-store");
      const token = request.cookies[sessionCookieName];
      if (!token) {
        return reply.code(401).send({ error: "Not authenticated." });
      }

      const session = database
        .prepare(
          `SELECT user_id FROM sessions WHERE token_hash = ? AND expires_at > ?`
        )
        .get(hashToken(token), Date.now());

      if (!session) {
        return reply.code(401).send({ error: "Session expired." });
      }

      const { name, phone, address, city, state, pincode, isDefault } = request.body;
      const now = Date.now();

      // If this is default, unset other defaults
      if (isDefault) {
        database.prepare(`UPDATE addresses SET is_default = 0 WHERE user_id = ?`).run(session.user_id);
      }

      const result = database
        .prepare(`
          INSERT INTO addresses (user_id, name, phone, address, city, state, pincode, is_default, created_at, updated_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `)
        .run(session.user_id, name, phone, address, city, state, pincode, isDefault ? 1 : 0, now, now);

      const newAddress = database.prepare(`SELECT * FROM addresses WHERE id = ?`).get(result.lastInsertRowid);
      return reply.code(201).send({ address: newAddress });
    }
  );

  // Update address
  app.patch(
    "/api/account/addresses/:addressId",
    { schema: { body: addressSchema } },
    async (request, reply) => {
      reply.header("Cache-Control", "no-store");
      const token = request.cookies[sessionCookieName];
      if (!token) {
        return reply.code(401).send({ error: "Not authenticated." });
      }

      const session = database
        .prepare(
          `SELECT user_id FROM sessions WHERE token_hash = ? AND expires_at > ?`
        )
        .get(hashToken(token), Date.now());

      if (!session) {
        return reply.code(401).send({ error: "Session expired." });
      }

      const { addressId } = request.params;
      const { name, phone, address, city, state, pincode, isDefault } = request.body;
      const now = Date.now();

      const existing = database
        .prepare(`SELECT * FROM addresses WHERE id = ? AND user_id = ?`)
        .get(addressId, session.user_id);

      if (!existing) {
        return reply.code(404).send({ error: "Address not found." });
      }

      // If this is default, unset other defaults
      if (isDefault) {
        database.prepare(`UPDATE addresses SET is_default = 0 WHERE user_id = ?`).run(session.user_id);
      }

      database
        .prepare(`
          UPDATE addresses
          SET name = ?, phone = ?, address = ?, city = ?, state = ?, pincode = ?, is_default = ?, updated_at = ?
          WHERE id = ? AND user_id = ?
        `)
        .run(name, phone, address, city, state, pincode, isDefault ? 1 : 0, now, addressId, session.user_id);

      const updated = database.prepare(`SELECT * FROM addresses WHERE id = ?`).get(addressId);
      return { address: updated };
    }
  );

  // Delete address
  app.delete(
    "/api/account/addresses/:addressId",
    async (request, reply) => {
      reply.header("Cache-Control", "no-store");
      const token = request.cookies[sessionCookieName];
      if (!token) {
        return reply.code(401).send({ error: "Not authenticated." });
      }

      const session = database
        .prepare(
          `SELECT user_id FROM sessions WHERE token_hash = ? AND expires_at > ?`
        )
        .get(hashToken(token), Date.now());

      if (!session) {
        return reply.code(401).send({ error: "Session expired." });
      }

      const { addressId } = request.params;
      const existing = database
        .prepare(`SELECT * FROM addresses WHERE id = ? AND user_id = ?`)
        .get(addressId, session.user_id);

      if (!existing) {
        return reply.code(404).send({ error: "Address not found." });
      }

      database.prepare(`DELETE FROM addresses WHERE id = ? AND user_id = ?`).run(addressId, session.user_id);
      return { success: true };
    }
  );

  // Get order history (already exists at GET /api/orders)
  // Get order details (already exists at GET /api/orders/:orderId)

  // Logout all sessions
  app.post(
    "/api/account/logout-all",
    async (request, reply) => {
      reply.header("Cache-Control", "no-store");
      const token = request.cookies[sessionCookieName];
      if (!token) {
        return reply.code(401).send({ error: "Not authenticated." });
      }

      const session = database
        .prepare(
          `SELECT user_id FROM sessions WHERE token_hash = ? AND expires_at > ?`
        )
        .get(hashToken(token), Date.now());

      if (!session) {
        return reply.code(401).send({ error: "Session expired." });
      }

      database.prepare(`DELETE FROM sessions WHERE user_id = ?`).run(session.user_id);
      reply.clearCookie(sessionCookieName, { path: "/", secure: cookieSecure });
      return { success: true, message: "Logged out from all devices." };
    }
  );

  // ============================================================
  // PRODUCT ENDPOINTS
  // ============================================================

  function parseJsonField(field) {
    if (!field) return [];
    try {
      return JSON.parse(field);
    } catch {
      return [];
    }
  }

  function parsePrice(mrp) {
    if (!mrp) return null;
    const match = mrp.replace(/[₹,\s]/g, "").match(/^(\d+)/);
    return match ? parseInt(match[1], 10) * 100 : null;
  }

  // Product list with optional category filter
  app.get("/api/products", async (request, reply) => {
    reply.header("Cache-Control", "no-store");
    const { category, available } = request.query;

    let query = `
      SELECT id, name, category, mrp, pack_size AS packSize,
             image, video, short_description AS shortDescription,
             description, highlights, ingredients, stock,
             created_at AS createdAt, updated_at AS updatedAt
      FROM products
    `;
    const params = [];

    if (category) {
      query += ` WHERE category = ?`;
      params.push(category);
    }

    if (available === "true") {
      query += category ? ` AND stock > 0` : ` WHERE stock > 0`;
    }

    query += ` ORDER BY category, name`;

    const products = database.prepare(query).all(...params);

    // Convert prices to paise and parse JSON fields
    const formattedProducts = products.map(p => ({
      ...p,
      price: parsePrice(p.mrp),
      inStock: p.stock > 0,
      highlights: parseJsonField(p.highlights),
      ingredients: parseJsonField(p.ingredients),
      mrp: undefined, // Don't expose raw MRP string
    }));

    return { products: formattedProducts };
  });

  // Get product by ID
  app.get("/api/products/:productId", async (request, reply) => {
    reply.header("Cache-Control", "no-store");
    const { productId } = request.params;

    const product = database.prepare(`
      SELECT id, name, category, mrp, pack_size AS packSize,
             image, video, short_description AS shortDescription,
             description, highlights, ingredients, stock,
             created_at AS createdAt, updated_at AS updatedAt
      FROM products WHERE id = ?
    `).get(productId);

    if (!product) {
      return reply.code(404).send({ error: "Product not found." });
    }

    return {
      product: {
        ...product,
        price: parsePrice(product.mrp),
        inStock: product.stock > 0,
        highlights: parseJsonField(product.highlights),
        ingredients: parseJsonField(product.ingredients),
        mrp: undefined,
      }
    };
  });

  // Get categories
  app.get("/api/products/categories", async (request, reply) => {
    reply.header("Cache-Control", "no-store");
    const categories = database.prepare(`
      SELECT DISTINCT category FROM products ORDER BY category
    `).all();

    return { categories: categories.map(c => c.category) };
  });

  // Admin: Create product
  app.post(
    "/api/admin/products",
    { preHandler: requireAdmin },
    async (request, reply) => {
      reply.header("Cache-Control", "no-store");
      const { id, name, category, mrp, packSize, image, video, shortDescription, description, highlights, ingredients, stock } = request.body;

      if (!id || !name || !category || !mrp) {
        return reply.code(400).send({ error: "Missing required fields." });
      }

      const now = Date.now();
      const oldData = null;
      try {
        database.prepare(`
          INSERT INTO products (id, name, category, mrp, pack_size, image, video, short_description, description, highlights, ingredients, stock, created_at, updated_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).run(id, name, category, mrp, packSize || null, image || null, video || null, shortDescription || null, description || null, highlights || null, ingredients || null, stock || 999, now, now);
      } catch (e) {
        if (e.code === "SQLITE_CONSTRAINT_UNIQUE") {
          return reply.code(409).send({ error: "Product ID already exists." });
        }
        throw e;
      }

      await logAudit(request.admin.id, "create", "product", id, oldData, { id, name, category, mrp, packSize, stock: stock || 999 }, request);
      return reply.code(201).send({ success: true });
    }
  );

  // Admin: Update product
  app.patch(
    "/api/admin/products/:productId",
    { preHandler: requireAdmin },
    async (request, reply) => {
      reply.header("Cache-Control", "no-store");
      const { productId } = request.params;
      const body = request.body;

      const oldProduct = database.prepare(`SELECT * FROM products WHERE id = ?`).get(productId);
      if (!oldProduct) {
        return reply.code(404).send({ error: "Product not found." });
      }

      // Build dynamic update query based on provided fields
      const allowedFields = ['name', 'category', 'mrp', 'packSize', 'image', 'video', 'shortDescription', 'description', 'highlights', 'ingredients', 'stock'];
      const updates = [];
      const values = [];

      for (const field of allowedFields) {
        if (body[field] !== undefined) {
          const dbField = field === 'packSize' ? 'pack_size' : 
                          field === 'shortDescription' ? 'short_description' : field;
          updates.push(`${dbField} = ?`);
          values.push(body[field]);
        }
      }

      if (updates.length === 0) {
        return reply.code(400).send({ error: "No fields to update." });
      }

      updates.push("updated_at = ?");
      values.push(Date.now());
      values.push(productId);

      const result = database.prepare(`
        UPDATE products SET ${updates.join(", ")} WHERE id = ?
      `).run(...values);

      if (result.changes === 0) {
        return reply.code(404).send({ error: "Product not found." });
      }

      const newProduct = database.prepare(`SELECT * FROM products WHERE id = ?`).get(productId);
      await logAudit(request.admin.id, "update", "product", productId, oldProduct, newProduct, request);
      return { success: true };
    }
  );

  // Admin: Update stock
  app.patch(
    "/api/admin/products/:productId/stock",
    { preHandler: requireAdmin },
    async (request, reply) => {
      reply.header("Cache-Control", "no-store");
      const { productId } = request.params;
      const { stock } = request.body;

      if (typeof stock !== "number" || stock < 0) {
        return reply.code(400).send({ error: "Invalid stock value." });
      }

      const oldProduct = database.prepare(`SELECT * FROM products WHERE id = ?`).get(productId);
      if (!oldProduct) {
        return reply.code(404).send({ error: "Product not found." });
      }

      const result = database.prepare(`
        UPDATE products SET stock = ?, updated_at = ? WHERE id = ?
      `).run(stock, Date.now(), productId);

      if (result.changes === 0) {
        return reply.code(404).send({ error: "Product not found." });
      }

      const newProduct = database.prepare(`SELECT * FROM products WHERE id = ?`).get(productId);
      await logAudit(request.admin.id, "update_stock", "product", productId, { stock: oldProduct.stock }, { stock }, request);
      return { success: true, stock };
    }
  );

  // Admin: Delete product
  app.delete(
    "/api/admin/products/:productId",
    { preHandler: requireAdmin },
    async (request, reply) => {
      reply.header("Cache-Control", "no-store");
      const { productId } = request.params;

      const oldProduct = database.prepare(`SELECT * FROM products WHERE id = ?`).get(productId);
      if (!oldProduct) {
        return reply.code(404).send({ error: "Product not found." });
      }

      const result = database
        .prepare(`DELETE FROM products WHERE id = ?`)
        .run(productId);

      if (result.changes === 0) {
        return reply.code(404).send({ error: "Product not found." });
      }

      await logAudit(request.admin.id, "delete", "product", productId, oldProduct, null, request);
      return { success: true };
    }
  );

  // ============================================================
  // SHIPPING & FULFILLMENT ENDPOINTS
  // ============================================================

  // Shipping rates calculation
  app.get("/api/shipping/rates", async (request, reply) => {
    reply.header("Cache-Control", "no-store");
    const { pincode, subtotal } = request.query;

    if (!pincode) {
      return reply.code(400).send({ error: "Pincode required." });
    }

    // Mayleen shipping policy: Free shipping above ₹1000, else ₹99
    // Serviceable pincodes: All India (simplified)
    const sub = parseInt(subtotal || "0", 10);
    const isFreeShipping = sub >= 100000; // ₹1000 in paise
    const shippingCost = isFreeShipping ? 0 : 9900; // ₹99 in paise

    // Check if pincode is serviceable (simplified - all 6-digit pincodes)
    const pincodeStr = String(pincode);
    const isServiceable = /^[1-9][0-9]{5}$/.test(pincodeStr);

    return {
      serviceable: isServiceable,
      shippingCost,
      freeShippingThreshold: 100000,
      estimatedDays: isServiceable ? "3-7" : null,
      message: isFreeShipping
        ? "Free shipping on orders above ₹1,000"
        : "Shipping: ₹99 (Free on orders above ₹1,000)",
    };
  });

  // Validate shipping address
  app.post(
    "/api/shipping/validate-address",
    {
      schema: {
        body: {
          type: "object",
          additionalProperties: false,
          required: ["pincode", "city", "state"],
          properties: {
            pincode: { type: "string", pattern: "^[1-9][0-9]{5}$" },
            city: { type: "string", minLength: 2, maxLength: 100 },
            state: { type: "string", minLength: 2, maxLength: 100 },
          },
        },
      },
    },
    async (request, reply) => {
      reply.header("Cache-Control", "no-store");
      const { pincode, city, state } = request.body;

      // Basic validation - in production, integrate with pincode API
      const isValidPincode = /^[1-9][0-9]{5}$/.test(pincode);
      const isValidCity = city && city.length >= 2;
      const isValidState = state && state.length >= 2;

      return {
        valid: isValidPincode && isValidCity && isValidState,
        serviceable: isValidPincode,
        message: isValidPincode
          ? "Address is serviceable"
          : "We currently don't deliver to this pincode",
      };
    }
  );

  // Get order tracking status
  app.get("/api/orders/:orderId/tracking", async (request, reply) => {
    reply.header("Cache-Control", "no-store");
    const token = request.cookies[sessionCookieName];
    if (!token) {
      return reply.code(401).send({ error: "Not authenticated." });
    }

    const session = database
      .prepare(
        `SELECT user_id FROM sessions WHERE token_hash = ? AND expires_at > ?`
      )
      .get(hashToken(token), Date.now());

    if (!session) {
      return reply.code(401).send({ error: "Session expired." });
    }

    const { orderId } = request.params;
    const order = database
      .prepare(
        `SELECT id, status, payment_status, created_at, updated_at, paid_at, shipped_at, delivered_at
         FROM orders WHERE id = ? AND user_id = ?`
      )
      .get(orderId, session.user_id);

    if (!order) {
      return reply.code(404).send({ error: "Order not found." });
    }

    // Define status timeline
    const statusTimeline = [
      { status: "pending", label: "Order Placed", completed: true },
      { status: "confirmed", label: "Order Confirmed", completed: ["confirmed", "shipped", "delivered"].includes(order.status) },
      { status: "shipped", label: "Shipped", completed: ["shipped", "delivered"].includes(order.status) },
      { status: "delivered", label: "Delivered", completed: order.status === "delivered" },
    ];

    return {
      orderId: order.id,
      currentStatus: order.status,
      paymentStatus: order.payment_status,
      timeline: statusTimeline,
      dates: {
        placed: order.created_at,
        confirmed: order.paid_at,
        shipped: order.shipped_at,
        delivered: order.delivered_at,
      },
    };
  });

  // Admin: Update order status (ship, deliver, cancel)
  app.patch(
    "/api/admin/orders/:orderId/status",
    { preHandler: requireAdmin },
    async (request, reply) => {
      reply.header("Cache-Control", "no-store");
      const { orderId } = request.params;
      const { status, trackingNumber, carrier } = request.body;

      const validStatuses = ["pending", "confirmed", "shipped", "delivered", "cancelled"];
      if (!validStatuses.includes(status)) {
        return reply.code(400).send({ error: "Invalid status." });
      }

      const oldOrder = database.prepare(`SELECT * FROM orders WHERE id = ?`).get(orderId);
      if (!oldOrder) {
        return reply.code(404).send({ error: "Order not found." });
      }

      const now = Date.now();
      const updates = { status, updated_at: now };

      if (status === "shipped") {
        updates.shipped_at = now;
        if (trackingNumber) updates.tracking_number = trackingNumber;
        if (carrier) updates.carrier = carrier;
      } else if (status === "delivered") {
        updates.delivered_at = now;
      } else if (status === "cancelled") {
        updates.cancelled_at = now;
      }

      const setClause = Object.keys(updates).map(k => `${k} = ?`).join(", ");
      const values = [...Object.values(updates), orderId];

      const result = database
        .prepare(`UPDATE orders SET ${setClause} WHERE id = ?`)
        .run(...values);

      if (result.changes === 0) {
        return reply.code(404).send({ error: "Order not found." });
      }

      const newOrder = database.prepare(`SELECT * FROM orders WHERE id = ?`).get(orderId);
      await logAudit(request.admin.id, "update_status", "order", orderId, oldOrder, newOrder, request);
      return { success: true, status };
    }
  );

  // Return/Refund request
  app.post(
    "/api/orders/:orderId/return",
    {
      schema: {
        body: {
          type: "object",
          additionalProperties: false,
          required: ["reason"],
          properties: {
            reason: { type: "string", minLength: 5, maxLength: 500 },
            items: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  orderItemId: { type: "integer" },
                  quantity: { type: "integer", minimum: 1 },
                },
                required: ["orderItemId", "quantity"],
              },
            },
          },
        },
      },
    },
    async (request, reply) => {
      reply.header("Cache-Control", "no-store");
      const token = request.cookies[sessionCookieName];
      if (!token) {
        return reply.code(401).send({ error: "Not authenticated." });
      }

      const session = database
        .prepare(
          `SELECT user_id FROM sessions WHERE token_hash = ? AND expires_at > ?`
        )
        .get(hashToken(token), Date.now());

    if (!session) {
      return reply.code(401).send({ error: "Session expired." });
    }

    const { orderId } = request.params;
    const { reason, items } = request.body;

    const order = database
      .prepare(
        `SELECT id, status, payment_status, total FROM orders WHERE id = ? AND user_id = ?`
      )
      .get(orderId, session.user_id);

    if (!order) {
      return reply.code(404).send({ error: "Order not found." });
    }

    // Mayleen return policy: 7 days from delivery, only for unopened items
    if (order.status !== "delivered") {
      return reply.code(400).send({ error: "Only delivered orders can be returned." });
    }

    if (order.payment_status !== "paid") {
      return reply.code(400).send({ error: "Only paid orders can be returned." });
    }

    // Check if within 7 days of delivery
    const deliveredAt = database
      .prepare(`SELECT delivered_at FROM orders WHERE id = ?`)
      .get(orderId);
    if (deliveredAt?.delivered_at) {
      const daysSinceDelivery = (Date.now() - deliveredAt.delivered_at) / (1000 * 60 * 60 * 24);
      if (daysSinceDelivery > 7) {
        return reply.code(400).send({ error: "Return window expired (7 days from delivery)." });
      }
    }

    const returnId = "RET-" + Date.now() + "-" + randomBytes(4).toString("hex");
    const now = Date.now();

    // Create return record (reuse payments table with negative amount or create returns table)
    // For now, just update order status
    database
      .prepare(`UPDATE orders SET status = 'return_requested', updated_at = ? WHERE id = ?`)
      .run(now, orderId);

    // In production, create a returns table with items, reason, status, etc.

    return {
      returnId,
      status: "requested",
      message: "Return request submitted. Our team will contact you within 24 hours.",
      policy: "Returns accepted within 7 days of delivery for unopened items only. Refund issued to original payment method within 5-7 business days after pickup.",
    };
  });

  // Get return/refund policy
  app.get("/api/policies/return-refund", async (request, reply) => {
    reply.header("Cache-Control", "no-store");
    return {
      policy: {
        returnWindowDays: 7,
        condition: "Items must be unopened, unused, and in original packaging with seals intact.",
        process: [
          "Submit return request via My Account > Orders > Request Return",
          "Our team reviews and approves within 24 hours",
          "Pickup arranged by our logistics partner",
          "Refund processed to original payment method within 5-7 business days after pickup",
        ],
        nonReturnable: [
          "Opened or used products",
          "Products with broken seals",
          "Damaged due to customer mishandling",
          "Accessories and merchandise",
          "Sale/discounted items (unless defective)",
        ],
        refundMethod: "Original payment method only",
        shippingCost: "Customer bears return shipping unless item is defective or wrong item shipped",
      },
      shipping: {
        freeThreshold: 100000, // ₹1000 in paise
        standardCost: 9900,    // ₹99 in paise
        estimatedDays: "3-7 business days",
        serviceable: "All India (serviceable pincodes)",
      },
    };
  });

  // Get shipping policy
  app.get("/api/policies/shipping", async (request, reply) => {
    reply.header("Cache-Control", "no-store");
    return {
      policy: {
        freeShippingThreshold: 100000, // ₹1000 in paise
        standardShippingCost: 9900,    // ₹99 in paise
        estimatedDelivery: "3-7 business days",
        serviceablePincodes: "All India (subject to logistics partner coverage)",
        orderProcessing: "Orders placed before 2 PM shipped same day, next day otherwise",
        tracking: "Tracking number provided via email/SMS once shipped",
        codAvailable: false,
        internationalShipping: false,
      },
    };
  });

  // ============================================================
  // ADMIN MANAGEMENT ENDPOINTS
  // ============================================================

  // Admin: List users
  app.get(
    "/api/admin/users",
    { preHandler: requireAdmin },
    async (request, reply) => {
      reply.header("Cache-Control", "no-store");
      const { page = 1, limit = 20, search } = request.query;
      const offset = (page - 1) * limit;

      let query = `SELECT id, name, email, mobile, created_at AS createdAt FROM users`;
      const params = [];

      if (search) {
        query += ` WHERE name LIKE ? OR email LIKE ? OR mobile LIKE ?`;
        const searchTerm = `%${search}%`;
        params.push(searchTerm, searchTerm, searchTerm);
      }

      query += ` ORDER BY created_at DESC LIMIT ? OFFSET ?`;
      params.push(limit, offset);

      const users = database.prepare(query).all(...params);

      // Get total count
      let countQuery = `SELECT COUNT(*) as total FROM users`;
      const countParams = [];
      if (search) {
        countQuery += ` WHERE name LIKE ? OR email LIKE ? OR mobile LIKE ?`;
        countParams.push(searchTerm, searchTerm, searchTerm);
      }
      const total = database.prepare(countQuery).get(...countParams).total;

      return { users, total, page: Number(page), limit: Number(limit) };
    }
  );

  // Admin: Get user details
  app.get(
    "/api/admin/users/:userId",
    { preHandler: requireAdmin },
    async (request, reply) => {
      reply.header("Cache-Control", "no-store");
      const { userId } = request.params;

      const user = database
        .prepare(`SELECT id, name, email, mobile, created_at AS createdAt FROM users WHERE id = ?`)
        .get(userId);

      if (!user) {
        return reply.code(404).send({ error: "User not found." });
      }

      // Get user's orders
      const orders = database
        .prepare(`SELECT id, status, payment_status, total, created_at AS createdAt FROM orders WHERE user_id = ? ORDER BY created_at DESC`)
        .all(userId);

      // Get user's addresses
      const addresses = database
        .prepare(`SELECT * FROM addresses WHERE user_id = ?`)
        .all(userId);

      return { user: { ...user, orders, addresses } };
    }
  );

  // Admin: Update user (status, role)
  app.patch(
    "/api/admin/users/:userId",
    { preHandler: requireAdmin },
    async (request, reply) => {
      reply.header("Cache-Control", "no-store");
      const { userId } = request.params;
      const { is_active, name } = request.body;

      const oldUser = database.prepare(`SELECT * FROM users WHERE id = ?`).get(userId);
      if (!oldUser) {
        return reply.code(404).send({ error: "User not found." });
      }

      const updates = [];
      const values = [];

      if (name !== undefined) {
        updates.push("name = ?");
        values.push(name);
      }

      if (updates.length > 0) {
        values.push(userId);
        database.prepare(`UPDATE users SET ${updates.join(", ")}, updated_at = ? WHERE id = ?`).run(...values, Date.now(), userId);
      }

      const newUser = database.prepare(`SELECT id, name, email, mobile, created_at AS createdAt FROM users WHERE id = ?`).get(userId);
      await logAudit(request.admin.id, "update", "user", userId, oldUser, newUser, request);
      return { user: newUser };
    }
  );

  // Admin: List all orders
  app.get(
    "/api/admin/orders",
    { preHandler: requireAdmin },
    async (request, reply) => {
      reply.header("Cache-Control", "no-store");
      const { page = 1, limit = 20, status, payment_status, search } = request.query;
      const offset = (page - 1) * limit;

      let query = `SELECT o.id, o.status, o.payment_status, o.customer_name, o.customer_email, o.customer_mobile, o.subtotal, o.total, o.currency, o.created_at AS createdAt
                   FROM orders o`;
      const params = [];

      const conditions = [];
      if (status) {
        conditions.push("o.status = ?");
        params.push(status);
      }
      if (payment_status) {
        conditions.push("o.payment_status = ?");
        params.push(payment_status);
      }
      if (search) {
        conditions.push("(o.customer_name LIKE ? OR o.customer_email LIKE ? OR o.id LIKE ?)");
        const searchTerm = `%${search}%`;
        params.push(searchTerm, searchTerm, searchTerm);
      }

      if (conditions.length > 0) {
        query += ` WHERE ` + conditions.join(" AND ");
      }

      query += ` ORDER BY o.created_at DESC LIMIT ? OFFSET ?`;
      params.push(limit, offset);

      const orders = database.prepare(query).all(...params);

      // Get total count
      let countQuery = `SELECT COUNT(*) as total FROM orders o`;
      const countParams = [];
      if (conditions.length > 0) {
        countQuery += ` WHERE ` + conditions.join(" AND ");
        countParams.push(...params.slice(0, -2));
      }
      const total = database.prepare(countQuery).get(...countParams).total;

      return { orders, total, page: Number(page), limit: Number(limit) };
    }
  );

  // Admin: Get order details
  app.get(
    "/api/admin/orders/:orderId",
    { preHandler: requireAdmin },
    async (request, reply) => {
      reply.header("Cache-Control", "no-store");
      const { orderId } = request.params;

      const order = database
        .prepare(`
          SELECT id, status, payment_status, customer_name, customer_email, customer_mobile,
            shipping_address, shipping_city, shipping_state, shipping_pincode,
            subtotal, total, currency, created_at AS createdAt, updated_at AS updatedAt,
            paid_at AS paidAt, shipped_at AS shippedAt, delivered_at AS deliveredAt,
            cancelled_at AS cancelledAt, tracking_number AS trackingNumber, carrier
          FROM orders WHERE id = ?
        `)
        .get(orderId);

      if (!order) {
        return reply.code(404).send({ error: "Order not found." });
      }

      const items = database
        .prepare(`
          SELECT product_id, product_name, product_category, product_pack_size, quantity, unit_price, line_total
          FROM order_items WHERE order_id = ?
        `)
        .all(orderId);

      const payment = database
        .prepare(`
          SELECT provider, provider_order_id, provider_payment_id, provider_signature, amount, status, created_at, verified_at
          FROM payments WHERE order_id = ?
        `)
        .get(orderId);

      return { order: { ...order, items, payment } };
    }
  );

  // Admin: List payments
  app.get(
    "/api/admin/payments",
    { preHandler: requireAdmin },
    async (request, reply) => {
      reply.header("Cache-Control", "no-store");
      const { page = 1, limit = 20, status, search } = request.query;
      const offset = (page - 1) * limit;

      let query = `SELECT p.id, p.provider, p.provider_order_id, p.provider_payment_id, p.amount, p.currency, p.status, p.created_at, p.verified_at,
                          o.id as order_id, o.customer_name, o.customer_email
                   FROM payments p
                   JOIN orders o ON o.id = p.order_id`;
      const params = [];

      const conditions = [];
      if (status) {
        conditions.push("p.status = ?");
        params.push(status);
      }
      if (search) {
        conditions.push("(p.provider_order_id LIKE ? OR p.provider_payment_id LIKE ? OR o.customer_email LIKE ?)");
        const searchTerm = `%${search}%`;
        params.push(searchTerm, searchTerm, searchTerm);
      }

      if (conditions.length > 0) {
        query += ` WHERE ` + conditions.join(" AND ");
      }

      query += ` ORDER BY p.created_at DESC LIMIT ? OFFSET ?`;
      params.push(limit, offset);

      const payments = database.prepare(query).all(...params);

      // Get total count
      let countQuery = `SELECT COUNT(*) as total FROM payments p JOIN orders o ON o.id = p.order_id`;
      const countParams = [];
      if (conditions.length > 0) {
        countQuery += ` WHERE ` + conditions.join(" AND ");
        countParams.push(...params.slice(0, -2));
      }
      const total = database.prepare(countQuery).get(...countParams).total;

      return { payments, total, page: Number(page), limit: Number(limit) };
    }
  );

  // Admin: Get audit logs
  app.get(
    "/api/admin/audit-logs",
    { preHandler: requireAdmin },
    async (request, reply) => {
      reply.header("Cache-Control", "no-store");
      const { page = 1, limit = 50, admin_id, entity_type, entity_id, start_date, end_date } = request.query;
      const offset = (page - 1) * limit;

      let query = `SELECT al.id, al.action, al.entity_type, al.entity_id, al.old_data, al.new_data,
                          al.ip_address, al.user_agent, al.created_at,
                          a.name as admin_name, a.email as admin_email
                   FROM audit_logs al
                   LEFT JOIN admins a ON a.id = al.admin_id`;
      const params = [];

      const conditions = [];
      if (admin_id) {
        conditions.push("al.admin_id = ?");
        params.push(admin_id);
      }
      if (entity_type) {
        conditions.push("al.entity_type = ?");
        params.push(entity_type);
      }
      if (entity_id) {
        conditions.push("al.entity_id = ?");
        params.push(entity_id);
      }
      if (start_date) {
        conditions.push("al.created_at >= ?");
        params.push(Number(start_date));
      }
      if (end_date) {
        conditions.push("al.created_at <= ?");
        params.push(Number(end_date));
      }

      if (conditions.length > 0) {
        query += ` WHERE ` + conditions.join(" AND ");
      }

      query += ` ORDER BY al.created_at DESC LIMIT ? OFFSET ?`;
      params.push(limit, offset);

      const logs = database.prepare(query).all(...params);

      // Parse JSON data
      const formattedLogs = logs.map(log => ({
        ...log,
        old_data: log.old_data ? JSON.parse(log.old_data) : null,
        new_data: log.new_data ? JSON.parse(log.new_data) : null,
      }));

      // Get total count
      let countQuery = `SELECT COUNT(*) as total FROM audit_logs al`;
      const countParams = [];
      if (conditions.length > 0) {
        countQuery += ` WHERE ` + conditions.join(" AND ");
        countParams.push(...params);
      }
      const total = database.prepare(countQuery).get(...countParams).total;

      return { logs: formattedLogs, total, page: Number(page), limit: Number(limit) };
    }
  );

  app.setNotFoundHandler((request, reply) => {
    const isApiRequest = request.url.startsWith("/api/");
    const urlPath = request.url.split("?")[0];
    const hasFileExtension = /\.[a-z0-9]+$/i.test(urlPath);
    const isDirectoryPath = urlPath.endsWith("/");

    if (!isApiRequest && !hasFileExtension && !isDirectoryPath && staticRoot) {
      return reply.type("text/html").sendFile("index.html");
    }

    return reply.code(404).send({ error: "Not found." });
  });

  return app;
}

const isMainModule =
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isMainModule) {
  const app = await createAuthServer();
  const port = Number(process.env.PORT || 3001);
  const host = process.env.HOST || "0.0.0.0";

  try {
    await app.listen({ port, host });
  } catch (error) {
    app.log.error(error);
    await app.close();
    process.exitCode = 1;
  }
}