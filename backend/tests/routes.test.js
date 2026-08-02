// backend/tests/routes.test.js — route + auth integration tests (node:test, no Mongo needed)
const { test, describe } = require("node:test");
const assert = require("node:assert/strict");

// Test env — set before requiring app/routes so auth works
process.env.ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "test-password";
process.env.ADMIN_SECRET = process.env.ADMIN_SECRET || "test-secret";

// Mock the Product model before requiring routes
function MockProduct(data) {
  Object.assign(this, data, { _id: data._id || "mock-id" });
}
MockProduct.prototype.save = async function () {
  return { ...this, toJSON: () => ({ ...this }) };
};
MockProduct.find = () => ({ sort: () => [] });
MockProduct.countDocuments = async () => 0;
MockProduct.distinct = async () => [];
MockProduct.findById = async () => null;
MockProduct.findByIdAndUpdate = async () => null;
MockProduct.findByIdAndDelete = async () => null;

require.cache[require.resolve("../src/models/Product")] = {
  exports: MockProduct,
};

// Mock Coupon model before requiring couponRoutes
const MockCoupon = {
  findOne: async () => null,
  findById: async () => null,
  findByIdAndDelete: async () => null,
  find: () => ({ sort: () => [] }),
  create: async (data) => data,
};
require.cache[require.resolve("../src/models/Coupon")] = {
  exports: MockCoupon,
};

const request = require("supertest");
const app = require("../app");
const { sign } = require("../src/middleware/auth");

describe("GET /", () => {
  test("returns ok message", async () => {
    const res = await request(app).get("/");
    assert.equal(res.status, 200);
    assert.match(res.text, /Cafe Mehras/);
  });
});

describe("GET /api/products", () => {
  test("returns product list (empty with mock)", async () => {
    const res = await request(app).get("/api/products");
    assert.equal(res.status, 200);
    assert.ok(Array.isArray(res.body));
  });
});

describe("POST /api/products (auth required)", () => {
  test("rejects without token → 401", async () => {
    const res = await request(app)
      .post("/api/products")
      .send({ name: "x", category: "y", image: "/images/x.jpg" });
    assert.equal(res.status, 401);
  });

  test("rejects invalid token → 401", async () => {
    const res = await request(app)
      .post("/api/products")
      .set("x-admin-token", "wrong-token")
      .send({ name: "x", category: "y", image: "/images/x.jpg" });
    assert.equal(res.status, 401);
  });

  test("accepts with valid token + valid body → 201", async () => {
    const token = sign("admin");
    const res = await request(app)
      .post("/api/products")
      .set("x-admin-token", token)
      .send({ name: "کاپوچینو", category: "هات درینک", image: "/images/latte-art.jpg", price: 100 });
    assert.equal(res.status, 201);
  });

  test("rejects empty name → 400", async () => {
    const token = sign("admin");
    const res = await request(app)
      .post("/api/products")
      .set("x-admin-token", token)
      .send({ name: "", category: "هات درینک", image: "/images/latte-art.jpg" });
    assert.equal(res.status, 400);
  });

  test("rejects negative price → 400", async () => {
    const token = sign("admin");
    const res = await request(app)
      .post("/api/products")
      .set("x-admin-token", token)
      .send({ name: "x", category: "هات درینک", image: "/images/latte-art.jpg", price: -5 });
    assert.equal(res.status, 400);
  });
});

describe("POST /api/auth/login", () => {
  test("rejects wrong password → 401", async () => {
    const res = await request(app).post("/api/auth/login").send({ password: "nope" });
    assert.equal(res.status, 401);
  });

  test("rejects missing password → 401", async () => {
    const res = await request(app).post("/api/auth/login").send({});
    assert.equal(res.status, 401);
  });

  test("rejects missing ADMIN_PASSWORD env → 500 (fail closed)", async () => {
    const old = process.env.ADMIN_PASSWORD;
    delete process.env.ADMIN_PASSWORD;
    try {
      const res = await request(app).post("/api/auth/login").send({ password: "anything" });
      assert.equal(res.status, 500);
    } finally {
      process.env.ADMIN_PASSWORD = old;
    }
  });
});

describe("GET /api/auth/stats (protected)", () => {
  test("rejects without token → 401", async () => {
    const res = await request(app).get("/api/auth/stats");
    assert.equal(res.status, 401);
  });

  test("returns stats with valid token", async () => {
    const token = sign("admin");
    const res = await request(app).get("/api/auth/stats").set("x-admin-token", token);
    assert.equal(res.status, 200);
    assert.equal(typeof res.body.total, "number");
  });
});

describe("GET /api/coupons/:code", () => {
  test("no active coupon → 404", async () => {
    const res = await request(app).get("/api/coupons/MEHRAS10");
    assert.equal(res.status, 404);
  });
});

describe("POST /api/coupons (auth required)", () => {
  test("rejects without token → 401", async () => {
    const res = await request(app)
      .post("/api/coupons")
      .send({ code: "X", percent: 10 });
    assert.equal(res.status, 401);
  });

  test("rejects invalid percent → 400", async () => {
    const token = sign("admin");
    const res = await request(app)
      .post("/api/coupons")
      .set("x-admin-token", token)
      .send({ code: "X", percent: 150 });
    assert.equal(res.status, 400);
  });

  test("creates with valid body → 201", async () => {
    const token = sign("admin");
    const res = await request(app)
      .post("/api/coupons")
      .set("x-admin-token", token)
      .send({ code: "MEHRAS10", percent: 10, label: "کد کافه" });
    assert.equal(res.status, 201);
  });
});

describe("404 handler", () => {
  test("unknown route → 404 json", async () => {
    const res = await request(app).get("/api/nope");
    assert.equal(res.status, 404);
    assert.equal(typeof res.body.msg, "string");
  });
});
