const __import_meta_url = require('url').pathToFileURL(__filename);
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// server/cpanel.ts
var cpanel_exports = {};
__export(cpanel_exports, {
  default: () => cpanel_default
});
module.exports = __toCommonJS(cpanel_exports);
var import_dotenv = __toESM(require("dotenv"), 1);
var import_path6 = __toESM(require("path"), 1);

// server/createApp.ts
var import_config = require("dotenv/config");
var import_crypto2 = __toESM(require("crypto"), 1);
var import_express = __toESM(require("express"), 1);
var import_cors = __toESM(require("cors"), 1);
var import_path5 = __toESM(require("path"), 1);
var import_url = require("url");

// server/firebase.ts
var import_fs = __toESM(require("fs"), 1);
var import_path = __toESM(require("path"), 1);
var import_app = require("firebase-admin/app");
var import_firestore = require("firebase-admin/firestore");
var import_storage = require("firebase-admin/storage");
var initialized = false;
function loadServiceAccount() {
  const accountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;
  if (accountPath) {
    const candidates = import_path.default.isAbsolute(accountPath) ? [accountPath] : [
      import_path.default.resolve(process.cwd(), accountPath),
      import_path.default.resolve(process.cwd(), "firebase-service-account.json")
    ];
    for (const resolved of candidates) {
      if (!import_fs.default.existsSync(resolved)) continue;
      const json = JSON.parse(import_fs.default.readFileSync(resolved, "utf8"));
      if (json.project_id && json.client_email && json.private_key) {
        return {
          projectId: json.project_id,
          clientEmail: json.client_email,
          privateKey: json.private_key
        };
      }
    }
  }
  const cwdDefault = import_path.default.resolve(process.cwd(), "firebase-service-account.json");
  if (import_fs.default.existsSync(cwdDefault)) {
    const json = JSON.parse(import_fs.default.readFileSync(cwdDefault, "utf8"));
    if (json.project_id && json.client_email && json.private_key) {
      return {
        projectId: json.project_id,
        clientEmail: json.client_email,
        privateKey: json.private_key
      };
    }
  }
  if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY) {
    return {
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
    };
  }
  return null;
}
function isFirebaseEnabled() {
  return loadServiceAccount() !== null;
}
function initFirebase() {
  const creds = loadServiceAccount();
  if (!creds || initialized) return;
  if ((0, import_app.getApps)().length === 0) {
    (0, import_app.initializeApp)({
      credential: (0, import_app.cert)({
        projectId: creds.projectId,
        clientEmail: creds.clientEmail,
        privateKey: creds.privateKey
      }),
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET || `${creds.projectId}.firebasestorage.app`
    });
  }
  initialized = true;
}
function getFirestore() {
  initFirebase();
  return (0, import_firestore.getFirestore)();
}
function getStorageBucket() {
  initFirebase();
  return (0, import_storage.getStorage)().bucket();
}

// server/errors.ts
function extractErrorMessage(err, fallback) {
  if (err instanceof Error && err.message) return err.message;
  if (typeof err === "string" && err.trim()) return err;
  if (err && typeof err === "object") {
    const record = err;
    const message = typeof record.message === "string" ? record.message : "";
    const code = record.code !== void 0 ? String(record.code) : "";
    const details = typeof record.details === "string" ? record.details : "";
    if (message && code) return `${code}: ${message}`;
    if (message) return message;
    if (details) return details;
    try {
      const json = JSON.stringify(err);
      if (json && json !== "{}") return json.slice(0, 400);
    } catch {
    }
  }
  return fallback;
}

// server/storage/fileStorage.ts
var fileStorage_exports = {};
__export(fileStorage_exports, {
  deleteMemorial: () => deleteMemorial,
  getMemorialById: () => getMemorialById,
  readMemorials: () => readMemorials,
  upsertMemorial: () => upsertMemorial
});
var import_fs2 = __toESM(require("fs"), 1);
var import_path2 = __toESM(require("path"), 1);

// src/seededData.ts
var SEEDED_MEMORIALS = [
  {
    id: "gogo-thandiwe",
    name: "Gogo Thandiwe Sibanda (Khumalo)",
    birthDate: "1940-08-12",
    deathDate: "2024-03-15",
    epitaph: "A tree whose branches shaded generations; a heart whose love nourished entire communities.",
    biography: "Gogo Thandiwe Khumalo was the cornerstone of our community in Soweto, Johannesburg. Born in rural KwaZulu-Natal, she migrated to Johannesburg in her early twenties carrying nothing but a fierce determination and her grandmother\u2019s traditional bread recipe. Over six decades, she raised five children, twelve grandchildren, and countess foster youth. In 1984, during times of great neighborhood hardship, she founded the 'Siyazama Ubuntu Garden', transforming a derelict rubble heap into a thriving organic cooperative feeding eighty families daily. She was known for her resounding hum while baking, her wisdom in resolving family squabbles, and her unyielding belief that 'Umuntu ngumuntu ngabantu'\u2014a person is a person through other people.",
    profileImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400&h=400",
    headerImage: "https://images.unsplash.com/photo-1500627869374-13cd993b1115?auto=format&fit=crop&q=80&w=1600&h=900",
    milestones: [
      {
        id: "m1",
        year: "1940",
        title: "Birth in Eshowe",
        description: "Born into a farming household, where she learned the art of sustainable soil agriculture from her mother."
      },
      {
        id: "m2",
        year: "1962",
        title: "The Journey to Soweto",
        description: "Relocated to Orlando West, starting as a seamstress and local community baker."
      },
      {
        id: "m3",
        year: "1984",
        title: "Founded Siyazama Ubuntu Garden",
        description: "Organized neighborhood grandmothers to clear empty municipal lands, planting sweet potatoes, spinach, and maize to sustain families."
      },
      {
        id: "m4",
        year: "2012",
        title: "Centennial Lifetime Award",
        description: "Received Johannesburg City Council's Civic Merit Star for active dedication to local food safety and youth mentoring."
      }
    ],
    tributes: [
      {
        id: "t1",
        visitorName: "Zola Khumalo",
        relation: "Grandson",
        message: "Gogo, your legacy continues to bloom in the garden every spring. We still bake your honey bread every Sunday morning. We miss you every day.",
        date: "2025-05-12T14:30:00Z",
        flowerType: "rose_white",
        candleLit: true
      },
      {
        id: "t2",
        visitorName: "Lerato Mokoena",
        relation: "Neighbor & Friend",
        message: "An incredible woman who saved my family from starvation during the difficult winter of 1988. Rest in perfect peace, our mother of Soweto.",
        date: "2026-02-10T09:15:00Z",
        flowerType: "sunflower",
        candleLit: true
      }
    ],
    plateStyle: "ceramic",
    themeID: "sage",
    status: "paid_active",
    referenceNo: "ETB-9021-SOW",
    ownerEmail: "family.khumalo@gmail.com",
    createdAt: "2025-01-10T12:00:00Z"
  },
  {
    id: "kofi-ndlovu",
    name: "Baba Kofi Biko Ndlovu",
    birthDate: "1952-04-03",
    deathDate: "2023-11-28",
    epitaph: "Music was his language, education his rebellion, and the mountains his sanctuary.",
    biography: "Baba Kofi Ndlovu was a legendary high school history educator and self-taught acoustic jazz guitarist whose passion electrified Durban classrooms for 37 years. Resolutely refusing to teach rigid, dry curriculum, Kofi brought historical figures to life with dramatic dialogues, acoustic guitar ballads, and field trips to the coastal hills of KwaZulu-Natal. Outside school, he established the 'Durban Sands Youth Ensemble', offering free music and percussion workshops to kids who couldn\u2019t afford formal instruments or academy tuition, constructing guitars out of oil canisters and driftwood. Kofi loved hiking during coastal storms, reading dense philosophical essays, and making thick Zulu beef stews for anyone who walked through his door.",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=400",
    headerImage: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=1600&h=900",
    milestones: [
      {
        id: "k1",
        year: "1952",
        title: "Born in Durban",
        description: "Born near the bustling docks of Durban, capturing his lifelong love for coastal shipping rhythms and blue oceans."
      },
      {
        id: "k2",
        year: "1975",
        title: "First Music School",
        description: "Began offering Saturday guitar lessons under the shade of a massive blue gum tree behind his boarding house."
      },
      {
        id: "k3",
        year: "1995",
        title: "Appointed Head of History",
        description: "Became Lead Educator at Phambili High, transforming average history pass rates from 45% to ninety-eight percent."
      },
      {
        id: "k4",
        year: "2018",
        title: "Retirement and Ocean Hike",
        description: "Retired to complete a solo coast trail hike, documenting local coastal birds and recording natural waves on tape."
      }
    ],
    tributes: [
      {
        id: "tk1",
        visitorName: "Sipho Ndlovu",
        relation: "Son",
        message: "Your old canister guitar is hanging proudly in the living room, Dad. Every time I hit a chord, I can hear your deep laugh in the background. Farewell traveler.",
        date: "2024-11-28T18:45:00Z",
        flowerType: "lily",
        candleLit: true
      },
      {
        id: "tk2",
        visitorName: "Themba Dlamini",
        relation: "Former Student",
        message: "The reason I became a history professor is entirely because of Baba Kofi. He taught us that history is a living, breathing song, not a list of dead names. Salute, Teach!",
        date: "2025-08-01T11:20:00Z",
        flowerType: "rose_red",
        candleLit: false
      }
    ],
    plateStyle: "bronze",
    themeID: "amber",
    status: "paid_active",
    referenceNo: "ETB-7712-DUR",
    ownerEmail: "sipho.ndlovu@gmail.com",
    createdAt: "2024-02-12T08:30:00Z"
  },
  {
    id: "joyce-naidoo",
    name: "Mama Joyce Naidoo",
    birthDate: "1948-05-18",
    deathDate: "2024-01-20",
    epitaph: "A gentle hand, an infinitely healing touch; her courage gave sight to hope.",
    biography: "Mama Joyce Naidoo was a pioneer clinical nurse and community organizer in Chatsworth, Durban, who devoted 45 years to public health excellence. Born in Chatsworth, Joyce was among the first batch of Indian women to secure a medical nursing diploma during restrictive eras. Her patient-first resolve brought medicine and safety into underprivileged neighborhoods. She was beloved for her delicious traditional Durban curries, her sharp wit, and her relentless efforts to protect and educate local single mothers.",
    profileImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=400",
    headerImage: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&q=80&w=1600&h=900",
    milestones: [
      {
        id: "jn1",
        year: "1948",
        title: "Born in Chatsworth",
        description: "Raised in Durban during high-growth urban expansion."
      },
      {
        id: "jn2",
        year: "1972",
        title: "Clinical Nursing Graduate",
        description: "Completed nursing degree among top-tier state honors list."
      },
      {
        id: "jn3",
        year: "1998",
        title: "Chatsworth Mothers Trust",
        description: "Founded a cooperative support clinic assisting 400+ infant welfare cases yearly."
      }
    ],
    tributes: [],
    plateStyle: "obsidian",
    themeID: "navy",
    status: "verifying",
    // Pending ledger check for Admin
    referenceNo: "ETB-4433-CHA",
    ownerEmail: "joyce.family@gmail.com",
    proofOfPaymentName: "pop_fnb_transfer_naidoo.pdf",
    createdAt: "2024-03-01T10:15:00Z"
  },
  {
    id: "jabulani-khumalo",
    name: "Baba Jabulani Khumalo",
    birthDate: "1960-11-22",
    deathDate: "2025-02-14",
    epitaph: "His hands molded steel, his soul embraced the soil.",
    biography: "Baba Jabulani Khumalo was a master metal artisan, passionate trade union safety steward, and local Soweto soccer coach. He dedicated his off-work evenings to manufacturing robust playground gym gear from discarded structural frames to create a safe park for local Soweto children.",
    profileImage: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?auto=format&fit=crop&q=80&w=400&h=400",
    headerImage: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1600&h=900",
    milestones: [
      {
        id: "jk1",
        year: "1960",
        title: "Birth in Soweto",
        description: "Born into Johannesburg's mining fabrication heartland."
      },
      {
        id: "jk2",
        year: "1994",
        title: "Founded Soweto Lions Youth Club",
        description: "Launched local soccer club supporting 120 youngsters, providing athletic boot sponsorships and homework mentoring."
      }
    ],
    tributes: [],
    plateStyle: "bronze",
    themeID: "charcoal",
    status: "draft",
    // Pending payment upload
    referenceNo: "ETB-2150-SOW",
    ownerEmail: "jabu.k@gmail.com",
    createdAt: "2025-05-30T14:22:00Z"
  }
];

// server/storage/fileStorage.ts
var DATA_DIR = process.env.DATA_DIR || import_path2.default.join(process.cwd(), "data");
var DATA_FILE = import_path2.default.join(DATA_DIR, "memorials.json");
function ensureDataFile() {
  if (!import_fs2.default.existsSync(DATA_DIR)) {
    import_fs2.default.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!import_fs2.default.existsSync(DATA_FILE)) {
    import_fs2.default.writeFileSync(DATA_FILE, JSON.stringify(SEEDED_MEMORIALS, null, 2), "utf-8");
    return;
  }
  const raw = import_fs2.default.readFileSync(DATA_FILE, "utf-8");
  const parsed = JSON.parse(raw);
  if (Array.isArray(parsed) && parsed.length === 0) {
    import_fs2.default.writeFileSync(DATA_FILE, JSON.stringify(SEEDED_MEMORIALS, null, 2), "utf-8");
  }
}
async function readMemorials() {
  ensureDataFile();
  const raw = import_fs2.default.readFileSync(DATA_FILE, "utf-8");
  return JSON.parse(raw);
}
async function writeMemorials(memorials) {
  ensureDataFile();
  import_fs2.default.writeFileSync(DATA_FILE, JSON.stringify(memorials, null, 2), "utf-8");
  return memorials;
}
async function getMemorialById(id) {
  const memorials = await readMemorials();
  return memorials.find((m) => m.id === id);
}
async function upsertMemorial(memorial) {
  const memorials = await readMemorials();
  const index = memorials.findIndex((m) => m.id === memorial.id);
  if (index >= 0) {
    memorials[index] = memorial;
  } else {
    memorials.unshift(memorial);
  }
  await writeMemorials(memorials);
  return memorial;
}
async function deleteMemorial(id) {
  const memorials = await readMemorials();
  const filtered = memorials.filter((m) => m.id !== id);
  if (filtered.length === memorials.length) return false;
  await writeMemorials(filtered);
  return true;
}

// server/storage/firestoreStorage.ts
var firestoreStorage_exports = {};
__export(firestoreStorage_exports, {
  deleteMemorial: () => deleteMemorial2,
  getMemorialById: () => getMemorialById2,
  readMemorials: () => readMemorials2,
  upsertMemorial: () => upsertMemorial2
});
var COLLECTION = "memorials";
function docToMemorial(id, data) {
  return { id, ...data };
}
function stripUndefined(data) {
  const out = {};
  for (const [key, value] of Object.entries(data)) {
    if (value !== void 0) out[key] = value;
  }
  return out;
}
async function readMemorials2() {
  const db = getFirestore();
  const snap = await db.collection(COLLECTION).orderBy("createdAt", "desc").get();
  return snap.docs.map((doc) => docToMemorial(doc.id, doc.data()));
}
async function getMemorialById2(id) {
  const db = getFirestore();
  const doc = await db.collection(COLLECTION).doc(id).get();
  if (!doc.exists) return void 0;
  return docToMemorial(doc.id, doc.data());
}
async function upsertMemorial2(memorial) {
  const db = getFirestore();
  const { id, ...data } = memorial;
  await db.collection(COLLECTION).doc(id).set(stripUndefined(data), {
    merge: true
  });
  return memorial;
}
async function deleteMemorial2(id) {
  const db = getFirestore();
  const ref = db.collection(COLLECTION).doc(id);
  const doc = await ref.get();
  if (!doc.exists) return false;
  await ref.delete();
  return true;
}

// server/storage/sqlStorage.ts
var sqlStorage_exports = {};
__export(sqlStorage_exports, {
  deleteMemorial: () => deleteMemorial3,
  ensureSchema: () => ensureSchema,
  getMemorialById: () => getMemorialById3,
  isSqlEnabled: () => isSqlEnabled,
  readMemorials: () => readMemorials3,
  upsertMemorial: () => upsertMemorial3
});
var import_pg = __toESM(require("pg"), 1);
var { Pool } = import_pg.default;
var pool = null;
var schemaReady = null;
function getDatabaseUrl() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not configured");
  }
  return databaseUrl;
}
function getPool() {
  if (!pool) {
    pool = new Pool({
      connectionString: getDatabaseUrl(),
      ssl: process.env.DATABASE_SSL === "true" ? { rejectUnauthorized: process.env.DATABASE_SSL_REJECT_UNAUTHORIZED !== "false" } : void 0
    });
  }
  return pool;
}
function isSqlEnabled() {
  return Boolean(process.env.DATABASE_URL);
}
async function ensureSchema() {
  if (!schemaReady) {
    schemaReady = getPool().query(`
        CREATE TABLE IF NOT EXISTS memorials (
          id TEXT PRIMARY KEY,
          data JSONB NOT NULL,
          created_at TIMESTAMPTZ DEFAULT now(),
          updated_at TIMESTAMPTZ DEFAULT now()
        );

        CREATE INDEX IF NOT EXISTS memorials_created_at_idx
          ON memorials ((data->>'createdAt') DESC);
      `).then(() => void 0);
  }
  return schemaReady;
}
function rowToMemorial(row) {
  return { ...row.data, id: row.id };
}
async function readMemorials3() {
  await ensureSchema();
  const result = await getPool().query(
    `
      SELECT id, data
      FROM memorials
      ORDER BY (data->>'createdAt') DESC NULLS LAST, id DESC
    `
  );
  return result.rows.map(rowToMemorial);
}
async function getMemorialById3(id) {
  await ensureSchema();
  const result = await getPool().query(
    "SELECT id, data FROM memorials WHERE id = $1 LIMIT 1",
    [id]
  );
  return result.rows[0] ? rowToMemorial(result.rows[0]) : void 0;
}
async function upsertMemorial3(memorial) {
  await ensureSchema();
  await getPool().query(
    `
      INSERT INTO memorials (id, data, updated_at)
      VALUES ($1, $2::jsonb, now())
      ON CONFLICT (id)
      DO UPDATE SET data = EXCLUDED.data, updated_at = now()
    `,
    [memorial.id, JSON.stringify(memorial)]
  );
  return memorial;
}
async function deleteMemorial3(id) {
  await ensureSchema();
  const result = await getPool().query("DELETE FROM memorials WHERE id = $1", [id]);
  return (result.rowCount ?? 0) > 0;
}

// server/storage/index.ts
var store = () => {
  const mode = (process.env.STORAGE_MODE || "").toLowerCase();
  if (mode === "file") return fileStorage_exports;
  if (isSqlEnabled()) return sqlStorage_exports;
  return isFirebaseEnabled() ? firestoreStorage_exports : fileStorage_exports;
};
function getStorageBackend() {
  const mode = (process.env.STORAGE_MODE || "").toLowerCase();
  if (mode === "file") return "file";
  if (isSqlEnabled()) return "sql";
  return isFirebaseEnabled() ? "firestore" : "file";
}
async function readMemorials4() {
  return store().readMemorials();
}
async function getMemorialById4(id) {
  return store().getMemorialById(id);
}
async function upsertMemorial4(memorial) {
  const backend = store();
  try {
    return await backend.upsertMemorial(memorial);
  } catch (err) {
    const primaryError = extractErrorMessage(err, String(err));
    console.error(`${getStorageBackend()} upsert failed:`, primaryError);
    if (backend !== fileStorage_exports) {
      try {
        console.warn("Retrying memorial save with local file storage");
        return await upsertMemorial(memorial);
      } catch (fileErr) {
        const fileError = extractErrorMessage(fileErr, String(fileErr));
        throw new Error(`Save failed \u2014 Firestore: ${primaryError}; File: ${fileError}`);
      }
    }
    throw new Error(primaryError);
  }
}
async function deleteMemorial4(id) {
  return store().deleteMemorial(id);
}

// server/auth.ts
var import_crypto = __toESM(require("crypto"), 1);
var import_fs3 = __toESM(require("fs"), 1);
var import_path3 = __toESM(require("path"), 1);
var SESSIONS_FILE = process.env.SESSIONS_FILE || import_path3.default.join(process.cwd(), "data", "sessions.json");
var ADMIN_EMAIL = (process.env.ADMIN_EMAIL || "consult@e-thombe.co.za").toLowerCase();
var ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin";
var SESSION_TTL_MS = 24 * 60 * 60 * 1e3;
var sessions = /* @__PURE__ */ new Map();
function loadAuthAccounts() {
  const accounts = [
    { email: ADMIN_EMAIL, password: ADMIN_PASSWORD, role: "admin" }
  ];
  const raw = process.env.STAFF_ACCOUNTS;
  if (raw?.trim()) {
    try {
      const parsed = JSON.parse(raw);
      for (const account of parsed) {
        if (!account.email || !account.password || !account.role) continue;
        const email = account.email.trim().toLowerCase();
        const role = account.role === "admin" ? "admin" : "registrar";
        const index = accounts.findIndex((a) => a.email === email);
        const entry = { email, password: account.password, role };
        if (index >= 0) accounts[index] = entry;
        else accounts.push(entry);
      }
    } catch {
      console.warn("STAFF_ACCOUNTS is not valid JSON \u2014 using ADMIN_EMAIL only");
    }
  }
  return accounts;
}
function loadSessions() {
  try {
    if (!import_fs3.default.existsSync(SESSIONS_FILE)) return;
    const raw = JSON.parse(import_fs3.default.readFileSync(SESSIONS_FILE, "utf-8"));
    const now = Date.now();
    for (const [token, session] of Object.entries(raw)) {
      if (session.expiresAt > now) {
        sessions.set(token, {
          email: session.email,
          role: session.role === "registrar" ? "registrar" : "admin",
          expiresAt: session.expiresAt
        });
      }
    }
  } catch {
  }
}
function saveSessions() {
  const dir = import_path3.default.dirname(SESSIONS_FILE);
  import_fs3.default.mkdirSync(dir, { recursive: true });
  const obj = Object.fromEntries(sessions.entries());
  import_fs3.default.writeFileSync(SESSIONS_FILE, JSON.stringify(obj, null, 2), "utf-8");
}
loadSessions();
function login(email, password) {
  const normalized = email.trim().toLowerCase();
  const account = loadAuthAccounts().find(
    (entry) => entry.email === normalized && entry.password === password
  );
  if (!account) return null;
  const token = import_crypto.default.randomBytes(32).toString("hex");
  sessions.set(token, {
    email: account.email,
    role: account.role,
    expiresAt: Date.now() + SESSION_TTL_MS
  });
  saveSessions();
  return { token, email: account.email, role: account.role };
}
function validateToken(token) {
  return getSession(token) !== null;
}
function getSession(token) {
  const session = sessions.get(token);
  if (!session) return null;
  if (session.expiresAt < Date.now()) {
    sessions.delete(token);
    saveSessions();
    return null;
  }
  return session;
}
function requireAdmin(req, res, next) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    res.status(401).json({ error: "Staff authentication required" });
    return;
  }
  const token = header.slice(7);
  if (!validateToken(token)) {
    res.status(401).json({ error: "Invalid or expired session" });
    return;
  }
  next();
}

// server/email.ts
var import_nodemailer = __toESM(require("nodemailer"), 1);
var SMTP_HOST = process.env.SMTP_HOST || "smtp.gmail.com";
var SMTP_PORT = Number(process.env.SMTP_PORT || 587);
var SMTP_SECURE = process.env.SMTP_SECURE === void 0 ? SMTP_PORT === 465 : process.env.SMTP_SECURE === "true";
var SMTP_USER = process.env.SMTP_USER || "";
var SMTP_PASS = process.env.SMTP_PASS || "";
var SMTP_FROM = process.env.SMTP_FROM || "consult@e-thombe.co.za";
var SMTP_TLS_REJECT_UNAUTHORIZED = process.env.SMTP_TLS_REJECT_UNAUTHORIZED !== "false";
var ADMIN_NOTIFY = process.env.ADMIN_NOTIFY_EMAIL || "LHlongwane81@gmail.com";
var APP_URL = process.env.APP_URL || "http://localhost:3000";
var useFunctionsEmail = process.env.FIREBASE_USE_FUNCTIONS_EMAIL !== "false" && isFirebaseEnabled();
function isSmtpConfigured() {
  return Boolean(SMTP_USER && SMTP_PASS);
}
function isEmailConfigured() {
  return isSmtpConfigured() || useFunctionsEmail;
}
function isUsingFunctionsEmail() {
  return useFunctionsEmail && !isSmtpConfigured();
}
function getEmailMode() {
  if (isSmtpConfigured()) return "smtp";
  if (useFunctionsEmail) return "functions";
  return "console";
}
function createTransporter() {
  return import_nodemailer.default.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_SECURE,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
    tls: SMTP_TLS_REJECT_UNAUTHORIZED ? void 0 : { rejectUnauthorized: false },
    connectionTimeout: 12e3,
    greetingTimeout: 12e3,
    socketTimeout: 2e4
  });
}
async function sendViaSmtp(to, subject, text, html) {
  const transporter = createTransporter();
  await transporter.sendMail({
    from: `"E-Thombe" <${SMTP_FROM}>`,
    to,
    subject,
    text,
    html: html || text.replace(/\n/g, "<br>")
  });
}
async function queueEmail(type, payload, to, subject, text) {
  const db = getFirestore();
  if (!db) throw new Error("Firestore not available");
  await db.collection("mailQueue").add({
    type,
    to,
    subject,
    text,
    payload,
    status: "pending",
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  });
}
async function deliverEmail(type, payload, to, subject, text) {
  try {
    if (isSmtpConfigured()) {
      await sendViaSmtp(to, subject, text);
      return;
    }
    if (useFunctionsEmail) {
      await queueEmail(type, payload, to, subject, text);
      return;
    }
    console.log(`[email:${type}] (not configured) To: ${to}
${text}`);
  } catch (err) {
    console.error(`[email:${type}] delivery failed:`, err);
  }
}
async function verifySmtpConnection() {
  if (!isSmtpConfigured()) {
    return { ok: false, error: "SMTP_USER and SMTP_PASS are not set in .env" };
  }
  try {
    const transporter = createTransporter();
    await transporter.verify();
    return { ok: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { ok: false, error: message };
  }
}
async function sendTestEmail(to) {
  const verify = await verifySmtpConnection();
  if (!verify.ok) return verify;
  const recipient = to || ADMIN_NOTIFY;
  try {
    await sendViaSmtp(
      recipient,
      "E-Thombe \u2014 SMTP test",
      `This is a test email from E-Thombe.

Mode: direct SMTP
Time: ${(/* @__PURE__ */ new Date()).toISOString()}

If you received this, email delivery is working.`
    );
    return { ok: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { ok: false, error: message };
  }
}
async function notifyContactForm(email, message) {
  const text = `New contact form submission

Email: ${email}

Message:
${message}`;
  await deliverEmail("contact", { email, message }, ADMIN_NOTIFY, `[E-Thombe] Contact from ${email}`, text);
}
async function notifyNewMemorial(memorial) {
  const text = `New memorial created: ${memorial.name}
ID: ${memorial.id}
Status: ${memorial.status}
Dashboard: ${APP_URL}/#/dashboard?id=${memorial.id}`;
  await deliverEmail(
    "new_memorial",
    { memorialId: memorial.id },
    ADMIN_NOTIFY,
    `[E-Thombe] New memorial: ${memorial.name}`,
    text
  );
}
async function notifyTribute(memorial, tribute) {
  const text = `New tribute on ${memorial.name}
From: ${tribute.visitorName}
Relation: ${tribute.relation || "\u2014"}

${tribute.message}`;
  await deliverEmail(
    "tribute",
    { memorialId: memorial.id },
    ADMIN_NOTIFY,
    `[E-Thombe] Tribute on ${memorial.name}`,
    text
  );
}
async function notifyProofOfPayment(memorial, fileName) {
  const text = `Proof of payment uploaded for ${memorial.name} (${memorial.id}).
File: ${fileName || memorial.proofOfPaymentName || "\u2014"}
Please verify in the registrar dashboard.`;
  await deliverEmail(
    "proof_of_payment",
    { memorialId: memorial.id },
    ADMIN_NOTIFY,
    `[E-Thombe] PoP uploaded: ${memorial.name}`,
    text
  );
}
async function notifyMemorialUpdated(memorial, detail) {
  const text = `Memorial updated: ${memorial.name} (${memorial.id})${detail ? `

${detail}` : ""}`;
  await deliverEmail(
    "memorial_updated",
    { memorialId: memorial.id },
    ADMIN_NOTIFY,
    `[E-Thombe] Memorial updated: ${memorial.name}`,
    text
  );
}
async function notifyStatusActivated(memorial) {
  const text = `Memorial activated: ${memorial.name}
Public URL: ${APP_URL}/#/memorial/${memorial.id}`;
  await deliverEmail(
    "status_activated",
    { memorialId: memorial.id },
    ADMIN_NOTIFY,
    `[E-Thombe] Memorial live: ${memorial.name}`,
    text
  );
}
async function notifyOrderPlaced(memorial, customerPhone, packageName) {
  const workspaceUrl = memorial.workspaceToken ? `${APP_URL}/?id=${memorial.id}&token=${memorial.workspaceToken}#/upload` : `${APP_URL}/?id=${memorial.id}#/upload`;
  const adminText = `New order (EFT pending)
Package: ${packageName}
Deceased: ${memorial.name}
Customer email: ${memorial.ownerEmail}
Phone/WhatsApp: ${customerPhone}
Reference: ${memorial.referenceNo}
Workspace: ${workspaceUrl}`;
  await deliverEmail(
    "order_admin",
    { memorialId: memorial.id },
    ADMIN_NOTIFY,
    `[E-Thombe] New order: ${memorial.name}`,
    adminText
  );
  if (memorial.ownerEmail) {
    const customerText = `Thank you for choosing E-Thombe.

Your memorial workspace for ${memorial.name} is ready (${packageName} package).
Reference: ${memorial.referenceNo}

Open your workspace:
${workspaceUrl}

Complete payment via EFT using the banking details on the order page. After payment, upload proof of payment in your workspace.

Questions? Reply to this email or contact consult@e-thombe.co.za`;
    await deliverEmail(
      "order_customer",
      { memorialId: memorial.id },
      memorial.ownerEmail,
      `Your E-Thombe workspace \u2014 ${memorial.name}`,
      customerText
    );
  }
}

// server/upload.ts
async function uploadToFirebaseStorage(memorialId, folder, buffer, filename, contentType) {
  if (!isFirebaseEnabled()) {
    throw new Error("Firebase Storage is not configured");
  }
  const bucket = getStorageBucket();
  const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, "_");
  const objectPath = `memorials/${memorialId}/${folder}/${Date.now()}-${safeName}`;
  const file = bucket.file(objectPath);
  await file.save(buffer, {
    metadata: { contentType, cacheControl: "public, max-age=31536000" }
  });
  await file.makePublic();
  return `https://storage.googleapis.com/${bucket.name}/${objectPath}`;
}
function parseBase64Input(input) {
  const dataUrlMatch = input.match(/^data:([^;]+);base64,(.+)$/);
  if (dataUrlMatch) {
    return {
      contentType: dataUrlMatch[1],
      buffer: Buffer.from(dataUrlMatch[2], "base64")
    };
  }
  return {
    contentType: "application/octet-stream",
    buffer: Buffer.from(input, "base64")
  };
}

// server/localUpload.ts
var import_fs4 = __toESM(require("fs"), 1);
var import_path4 = __toESM(require("path"), 1);
var UPLOADS_DIR = process.env.UPLOADS_DIR || import_path4.default.join(process.cwd(), "data", "uploads");
function ensureUploadDir(memorialId, folder) {
  const dir = import_path4.default.join(UPLOADS_DIR, "memorials", memorialId, folder);
  import_fs4.default.mkdirSync(dir, { recursive: true });
  return dir;
}
async function uploadToLocalStorage(memorialId, folder, buffer, filename) {
  const dir = ensureUploadDir(memorialId, folder);
  const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, "_");
  const storedName = `${Date.now()}-${safeName}`;
  const filePath = import_path4.default.join(dir, storedName);
  import_fs4.default.writeFileSync(filePath, buffer);
  const relative = `memorials/${memorialId}/${folder}/${storedName}`;
  return `/api/uploads/${relative}`;
}
function getUploadsRoot() {
  return UPLOADS_DIR;
}

// server/createApp.ts
var __dirname = import_path5.default.dirname((0, import_url.fileURLToPath)(__import_meta_url.href));
function createWorkspaceToken() {
  return import_crypto2.default.randomBytes(24).toString("hex");
}
function sanitizeMemorial(memorial, includeWorkspaceToken = false) {
  if (includeWorkspaceToken) return memorial;
  const { workspaceToken: _workspaceToken, ...publicMemorial } = memorial;
  return publicMemorial;
}
async function ensureWorkspaceToken(memorial) {
  if (memorial.workspaceToken) return memorial;
  const updated = { ...memorial, workspaceToken: createWorkspaceToken() };
  return upsertMemorial4(updated);
}
var DEFAULT_PROFILE = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400&h=400";
var DEFAULT_HEADER = "https://images.unsplash.com/photo-1500627869374-13cd993b1115?auto=format&fit=crop&q=80&w=1600&h=900";
function packageToPlateStyle(pkg) {
  if (pkg === "Premium") return "bronze";
  return "ceramic";
}
function createApp(options = {}) {
  const { serveUploads = true, serveStatic = false, staticDir: staticDir2 } = options;
  const app2 = (0, import_express.default)();
  function serializeMemorial(memorial, req) {
    return sanitizeMemorial(memorial, isAdminRequest(req));
  }
  function getBearerToken(req) {
    const header = req.headers.authorization;
    return header?.startsWith("Bearer ") ? header.slice(7) : "";
  }
  function isAdminRequest(req) {
    const token = getBearerToken(req);
    return Boolean(token && validateToken(token));
  }
  function canEditMemorial(req, memorial) {
    if (isAdminRequest(req)) return true;
    const workspaceToken = req.header("x-workspace-token");
    return Boolean(memorial.workspaceToken && workspaceToken === memorial.workspaceToken);
  }
  initFirebase();
  app2.use((0, import_cors.default)());
  app2.use(import_express.default.json({ limit: "50mb" }));
  if (serveUploads) {
    app2.use("/api/uploads", import_express.default.static(getUploadsRoot()));
  }
  app2.get("/api/health", async (_req, res) => {
    const emailMode = getEmailMode();
    let firestoreWrite = "skipped";
    if (isFirebaseEnabled() && getStorageBackend() === "firestore") {
      try {
        const db = getFirestore();
        await db.collection("_health").doc("ping").set(
          { ok: true, at: (/* @__PURE__ */ new Date()).toISOString() },
          { merge: true }
        );
        firestoreWrite = "ok";
      } catch (err) {
        firestoreWrite = extractErrorMessage(err, "write failed");
      }
    }
    res.json({
      ok: true,
      firebase: isFirebaseEnabled(),
      storage: getStorageBackend(),
      firestoreWrite,
      emailConfigured: isEmailConfigured(),
      emailViaFunctions: isUsingFunctionsEmail(),
      emailMode,
      passenger: Boolean(
        process.env.PASSENGER_APP_ENV || process.env.PASSENGER_SPAWN_WORK_DIR || process.env.PHUSION_PASSENGER
      ),
      cwd: process.cwd(),
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
  });
  app2.post("/api/admin/test-email", requireAdmin, async (req, res) => {
    const { to } = req.body;
    const mode = getEmailMode();
    if (mode === "console") {
      res.status(400).json({
        ok: false,
        error: "Email not configured. Set SMTP_USER and SMTP_PASS in .env, or enable Firebase Functions email.",
        mode
      });
      return;
    }
    if (mode === "functions") {
      res.status(400).json({
        ok: false,
        error: "Server is queueing email via Firestore. Use npm run test:email after setting SMTP in .env, or deploy Cloud Functions with SMTP_PASS secret.",
        mode
      });
      return;
    }
    const verify = await verifySmtpConnection();
    if (!verify.ok) {
      res.status(502).json({ ok: false, error: verify.error, mode });
      return;
    }
    const result = await sendTestEmail(to);
    if (!result.ok) {
      res.status(502).json({ ok: false, error: result.error, mode });
      return;
    }
    res.json({
      ok: true,
      mode,
      sentTo: to || process.env.ADMIN_NOTIFY_EMAIL || "admin notify address"
    });
  });
  app2.post("/api/auth/login", (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ error: "Email and password are required" });
      return;
    }
    const result = login(email, password);
    if (!result) {
      res.status(401).json({ error: "Invalid registrar credentials" });
      return;
    }
    res.json(result);
  });
  app2.get("/api/auth/session", (req, res) => {
    const header = req.headers.authorization;
    const token = header?.startsWith("Bearer ") ? header.slice(7) : "";
    const session = token ? getSession(token) : null;
    if (session) {
      res.json({ valid: true, role: session.role, email: session.email });
      return;
    }
    res.status(401).json({ valid: false });
  });
  app2.post("/api/contact", async (req, res) => {
    try {
      const { email, message } = req.body;
      if (!email?.trim() || !message?.trim()) {
        res.status(400).json({ error: "Email and message are required" });
        return;
      }
      await notifyContactForm(email.trim(), message.trim());
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      const message = err instanceof Error ? err.message : "Failed to send contact message";
      res.status(500).json({ error: message });
    }
  });
  app2.post("/api/orders", async (req, res) => {
    try {
      const { email, whatsapp, packageName, deceasedName } = req.body;
      if (!email?.trim() || !whatsapp?.trim()) {
        res.status(400).json({ error: "Email and WhatsApp number are required" });
        return;
      }
      const pkg = packageName?.trim() || "Standard";
      const referenceNo = `ETB-${Math.floor(1e3 + Math.random() * 9e3)}-ORD`;
      const memorialId = `order-${Date.now().toString(36)}`;
      const memorial = {
        id: memorialId,
        name: deceasedName?.trim() || "Memorial (name pending)",
        birthDate: "",
        deathDate: "",
        epitaph: "In loving memory.",
        biography: "Upload your loved one's biography in your customer workspace.",
        profileImage: DEFAULT_PROFILE,
        headerImage: DEFAULT_HEADER,
        milestones: [],
        tributes: [],
        plateStyle: packageToPlateStyle(pkg),
        themeID: "charcoal",
        status: "pending_eft",
        referenceNo,
        ownerEmail: email.trim().toLowerCase(),
        ownerWhatsApp: whatsapp.trim(),
        selectedPackage: pkg,
        workspaceToken: createWorkspaceToken(),
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      const saved = await upsertMemorial4(memorial);
      try {
        await notifyOrderPlaced(saved, whatsapp.trim(), pkg);
      } catch (emailErr) {
        console.error("Order saved but notification email failed:", emailErr);
      }
      const appUrl = process.env.APP_URL || "http://localhost:3000";
      res.status(201).json({
        success: true,
        memorialId: saved.id,
        referenceNo: saved.referenceNo,
        workspaceUrl: `${appUrl}/?id=${saved.id}&token=${saved.workspaceToken}#/upload`
      });
    } catch (err) {
      console.error("Order failed:", err);
      res.status(500).json({ error: extractErrorMessage(err, "Failed to place order") });
    }
  });
  app2.get("/api/memorials", async (req, res) => {
    try {
      let memorials = await readMemorials4();
      if (isAdminRequest(req)) {
        memorials = await Promise.all(memorials.map(ensureWorkspaceToken));
      }
      res.json(memorials.map((memorial) => serializeMemorial(memorial, req)));
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to load memorials" });
    }
  });
  app2.get("/api/memorials/:id", async (req, res) => {
    try {
      let memorial = await getMemorialById4(req.params.id);
      if (!memorial) {
        res.status(404).json({ error: "Memorial not found" });
        return;
      }
      if (isAdminRequest(req)) {
        memorial = await ensureWorkspaceToken(memorial);
      }
      res.json(serializeMemorial(memorial, req));
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to load memorial" });
    }
  });
  app2.post("/api/memorials/:id/upload", async (req, res) => {
    try {
      const existing = await getMemorialById4(req.params.id);
      if (existing && !canEditMemorial(req, existing)) {
        res.status(403).json({ error: "Workspace access required" });
        return;
      }
      if (!existing && !isAdminRequest(req)) {
        res.status(404).json({ error: "Memorial not found" });
        return;
      }
      const { fileBase64, filename, folder, contentType } = req.body;
      if (!fileBase64 || !filename || !folder) {
        res.status(400).json({ error: "fileBase64, filename, and folder are required" });
        return;
      }
      const parsed = parseBase64Input(fileBase64);
      if (isFirebaseEnabled()) {
        try {
          const url2 = await uploadToFirebaseStorage(
            req.params.id,
            folder,
            parsed.buffer,
            filename,
            contentType || parsed.contentType
          );
          res.json({ url: url2, storage: "firebase" });
          return;
        } catch (err) {
          console.warn("Firebase Storage upload failed, using local fallback:", err);
        }
      }
      const url = await uploadToLocalStorage(
        req.params.id,
        folder,
        parsed.buffer,
        filename
      );
      res.json({ url });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Upload failed" });
    }
  });
  app2.post("/api/memorials", requireAdmin, async (req, res) => {
    try {
      const memorial = {
        ...req.body,
        workspaceToken: req.body.workspaceToken || createWorkspaceToken()
      };
      if (!memorial?.id || !memorial?.name) {
        res.status(400).json({ error: "Invalid memorial data" });
        return;
      }
      const saved = await upsertMemorial4(memorial);
      await notifyNewMemorial(saved);
      res.status(201).json(saved);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to create memorial" });
    }
  });
  app2.put("/api/memorials/:id", async (req, res) => {
    try {
      const existing = await getMemorialById4(req.params.id);
      if (!existing) {
        res.status(404).json({ error: "Memorial not found" });
        return;
      }
      if (!canEditMemorial(req, existing)) {
        res.status(403).json({ error: "Workspace access required" });
        return;
      }
      const updated = {
        ...existing,
        ...req.body,
        id: existing.id,
        workspaceToken: existing.workspaceToken
      };
      const wasActive = existing.status === "paid_active";
      const isNowActive = updated.status === "paid_active";
      const popUploaded = !existing.proofOfPaymentName && updated.proofOfPaymentName;
      const mediaChanged = existing.biography !== updated.biography || existing.epitaph !== updated.epitaph || (updated.gallery?.length ?? 0) !== (existing.gallery?.length ?? 0) || existing.videoUrl !== updated.videoUrl;
      const saved = await upsertMemorial4(updated);
      if (popUploaded && updated.proofOfPaymentName) {
        await notifyProofOfPayment(saved, updated.proofOfPaymentName);
      } else if (!wasActive && isNowActive) {
        await notifyStatusActivated(saved);
      } else if (mediaChanged) {
        await notifyMemorialUpdated(saved, "A family member updated memorial content (bio, photos, or video).");
      } else if (existing.status !== updated.status) {
        await notifyMemorialUpdated(saved, `Memorial status changed to ${updated.status}.`);
      }
      res.json(serializeMemorial(saved, req));
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to update memorial" });
    }
  });
  app2.delete("/api/memorials/:id", requireAdmin, async (req, res) => {
    try {
      const deleted = await deleteMemorial4(req.params.id);
      if (!deleted) {
        res.status(404).json({ error: "Memorial not found" });
        return;
      }
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to delete memorial" });
    }
  });
  app2.post("/api/memorials/:id/tributes", async (req, res) => {
    try {
      const memorial = await getMemorialById4(req.params.id);
      if (!memorial) {
        res.status(404).json({ error: "Memorial not found" });
        return;
      }
      const tribute = req.body;
      if (!tribute?.visitorName?.trim() || !tribute?.message?.trim()) {
        res.status(400).json({ error: "Visitor name and message are required" });
        return;
      }
      const newTribute = {
        ...tribute,
        id: tribute.id || `tribute_${Date.now()}`,
        date: tribute.date || (/* @__PURE__ */ new Date()).toISOString()
      };
      const updated = {
        ...memorial,
        tributes: [newTribute, ...memorial.tributes]
      };
      const saved = await upsertMemorial4(updated);
      await notifyTribute(saved, newTribute);
      res.status(201).json(saved);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to add tribute" });
    }
  });
  if (serveStatic) {
    const distPath = staticDir2 || import_path5.default.join(__dirname, "../dist");
    app2.use(import_express.default.static(distPath));
    app2.get("*", (req, res) => {
      if (!req.path.startsWith("/api")) {
        res.sendFile(import_path5.default.join(distPath, "index.html"));
      }
    });
  }
  return app2;
}

// server/cpanel.ts
import_dotenv.default.config({ path: import_path6.default.resolve(process.cwd(), ".env") });
var PORT = Number(process.env.PORT || 3001);
var staticDir = process.env.STATIC_DIR || import_path6.default.join(process.cwd(), "dist");
var app = createApp({
  serveUploads: true,
  serveStatic: true,
  staticDir
});
var isPassenger = Boolean(
  process.env.PASSENGER_APP_ENV || process.env.PASSENGER_SPAWN_WORK_DIR || process.env.PHUSION_PASSENGER
);
var runStandalone = process.env.RUN_STANDALONE === "1" || !isPassenger;
if (runStandalone) {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`eThombe server listening on ${PORT}`);
    console.log(`Static site: ${staticDir}`);
    console.log(`Storage: ${getStorageBackend()} | Email: ${getEmailMode()}`);
  });
} else {
  console.log("Exported for Passenger (cPanel Node.js App)");
  console.log(`Static site: ${staticDir}`);
  console.log(`Storage: ${getStorageBackend()} | Email: ${getEmailMode()}`);
}
var cpanel_default = app;
module.exports = app;
