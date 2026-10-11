import sql from 'mssql';
import bcrypt from 'bcryptjs';

const config: sql.config = {
  user: process.env.DB_USER || 'sa',
  password: process.env.DB_PASSWORD || '',
  server: process.env.DB_SERVER || '127.0.0.1',
  port: parseInt(process.env.DB_PORT || '1433', 10),
  database: process.env.DB_NAME || 'GambleDB',
  options: {
    encrypt: false,
    trustServerCertificate: true,
    enableArithAbort: true,
  },
  pool: {
    max: 15,
    min: 1,
    idleTimeoutMillis: 30000,
  },
};

let pool: sql.ConnectionPool | null = null;
let isInitialized = false;

export async function getDb(): Promise<sql.ConnectionPool> {
  if (pool && pool.connected) {
    if (!isInitialized) {
      await initializeDatabase(pool);
      isInitialized = true;
    }
    return pool;
  }

  try {
    pool = await new sql.ConnectionPool(config).connect();
    if (!isInitialized) {
      await initializeDatabase(pool);
      isInitialized = true;
    }
    return pool;
  } catch (error) {
    console.error('SQL Server Connection Error:', error);
    throw error;
  }
}

export async function initializeDatabase(conn: sql.ConnectionPool) {
  // 1. Users table
  await conn.request().query(`
    IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Users' AND xtype='U')
    CREATE TABLE Users (
      id INT IDENTITY(1,1) PRIMARY KEY,
      fullName NVARCHAR(150) NOT NULL,
      email NVARCHAR(150) UNIQUE NOT NULL,
      passwordHash NVARCHAR(255) NOT NULL,
      phoneNumber NVARCHAR(30) NULL,
      role NVARCHAR(30) DEFAULT 'user',
      createdAt DATETIME DEFAULT GETDATE()
    );
  `);

  // 2. Raffles table
  await conn.request().query(`
    IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Raffles' AND xtype='U')
    CREATE TABLE Raffles (
      id INT IDENTITY(1,1) PRIMARY KEY,
      title NVARCHAR(255) NOT NULL,
      slug NVARCHAR(100) UNIQUE NOT NULL,
      prizeName NVARCHAR(255) NOT NULL,
      prizeDescription NVARCHAR(MAX) NULL,
      prizeSpecs NVARCHAR(MAX) NULL,
      prizeImage NVARCHAR(500) NULL,
      ticketPrice BIGINT NOT NULL DEFAULT 200000,
      totalTickets INT NOT NULL DEFAULT 10000,
      soldTickets INT NOT NULL DEFAULT 0,
      status NVARCHAR(50) DEFAULT 'active', -- active, sold_out, drawing, completed
      winnerTicketNumber INT NULL,
      winnerUserId INT NULL,
      winnerName NVARCHAR(150) NULL,
      winnerAnnouncedAt DATETIME NULL,
      createdAt DATETIME DEFAULT GETDATE()
    );
  `);

  // 3. Orders table
  await conn.request().query(`
    IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Orders' AND xtype='U')
    CREATE TABLE Orders (
      id INT IDENTITY(1,1) PRIMARY KEY,
      userId INT NOT NULL FOREIGN KEY REFERENCES Users(id),
      raffleId INT NOT NULL FOREIGN KEY REFERENCES Raffles(id),
      ticketCount INT NOT NULL,
      totalAmount BIGINT NOT NULL,
      status NVARCHAR(50) DEFAULT 'pending', -- pending, paid, failed
      trackingCode NVARCHAR(100) NULL,
      gatewayRefId NVARCHAR(100) NULL,
      createdAt DATETIME DEFAULT GETDATE(),
      paidAt DATETIME NULL
    );
  `);

  // 4. Tickets table
  await conn.request().query(`
    IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Tickets' AND xtype='U')
    CREATE TABLE Tickets (
      id INT IDENTITY(1,1) PRIMARY KEY,
      raffleId INT NOT NULL FOREIGN KEY REFERENCES Raffles(id),
      userId INT NOT NULL FOREIGN KEY REFERENCES Users(id),
      orderId INT NOT NULL FOREIGN KEY REFERENCES Orders(id),
      ticketNumber INT NOT NULL,
      ticketCode NVARCHAR(50) NOT NULL,
      createdAt DATETIME DEFAULT GETDATE(),
      CONSTRAINT UQ_Raffle_TicketNumber UNIQUE(raffleId, ticketNumber)
    );
  `);

  // 5. EmailOtps table (for Email OTP login and registration)
  await conn.request().query(`
    IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='EmailOtps' AND xtype='U')
    CREATE TABLE EmailOtps (
      id INT IDENTITY(1,1) PRIMARY KEY,
      email NVARCHAR(150) NOT NULL,
      code NVARCHAR(10) NOT NULL,
      expiresAt DATETIME NOT NULL,
      used BIT DEFAULT 0,
      createdAt DATETIME DEFAULT GETDATE()
    );
  `);

  // Seed default admin
  const adminEmail = process.env.ADMIN_EMAIL || '';
  const existingAdmin = await conn
    .request()
    .input('email', sql.NVarChar, adminEmail)
    .query('SELECT id FROM Users WHERE email = @email');

  if (adminEmail && process.env.ADMIN_PASSWORD && existingAdmin.recordset.length === 0) {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD, salt);
    await conn
      .request()
      .input('fullName', sql.NVarChar, 'مدیریت سامانه')
      .input('email', sql.NVarChar, adminEmail)
      .input('passwordHash', sql.NVarChar, passwordHash)
      .input('phoneNumber', sql.NVarChar, '09120000000')
      .input('role', sql.NVarChar, 'admin')
      .query(`
        INSERT INTO Users (fullName, email, passwordHash, phoneNumber, role)
        VALUES (@fullName, @email, @passwordHash, @phoneNumber, @role)
      `);
    console.log('Default admin seeded successfully:', adminEmail);
  }

  // Seed default PS5 Slim Raffle
  const existingRaffle = await conn
    .request()
    .input('slug', sql.NVarChar, 'ps5-slim-bundle')
    .query('SELECT id FROM Raffles WHERE slug = @slug');

  if (existingRaffle.recordset.length === 0) {
    const specs = JSON.stringify({
      model: 'Sony PlayStation 5 Slim (Standard Disc Edition)',
      storage: '1TB Custom High-Speed NVMe SSD',
      color: 'سفید مات اورجینال سونی (Sony White Matte)',
      controller: 'دو عدد دسته بی‌سیم DualSense اورجینال سونی',
      region: 'ریجن اروپا (CFI-2016 / 2000 Group)',
      condition: 'آکبند و پلمپ کارخانه با گارانتی ۱۸ ماهه شرکتی رسمی',
      displaySupport: 'خروجی 4K 120Hz و پشتیبانی از رزولوشن 8K و فناوری HDR و Ray Tracing',
    });

    const description = `فرصت استثنایی برای برنده شدن یکی از قدرتمندترین و پرطرفدارترین کنسول‌های بازی دنیا!
یک دستگاه کنسول سونی پلی‌استیشن ۵ اسلیم دیسک‌خور ۱ ترابایت، به همراه دو عدد دسته بازی اورجینال DualSense، کابل HDMI 2.1 و گارانتی معتبر شرکتی ۱۸ ماهه.
با خرید هر بلیت ۲۰۰ هزار تومانی، یک شماره بلیت یکتا دریافت کنید. به محض تکمیل ۱۰,۰۰۰ بلیت، قرعه‌کشی به صورت زنده و کاملاً شفاف برگزار خواهد شد!`;

    await conn
      .request()
      .input('title', sql.NVarChar, 'قرعه‌کشی کنسول سونی پلی‌استیشن ۵ اسلیم (PS5 Slim) به همراه دسته اضافه')
      .input('slug', sql.NVarChar, 'ps5-slim-bundle')
      .input('prizeName', sql.NVarChar, 'Sony PlayStation 5 Slim 1TB Disc Edition + Extra Controller')
      .input('prizeDescription', sql.NVarChar, description)
      .input('prizeSpecs', sql.NVarChar, specs)
      .input('prizeImage', sql.NVarChar, '/images/ps5.jpg')
      .input('ticketPrice', sql.BigInt, 200000)
      .input('totalTickets', sql.Int, 10000)
      .input('soldTickets', sql.Int, 0)
      .input('status', sql.NVarChar, 'active')
      .query(`
        INSERT INTO Raffles (title, slug, prizeName, prizeDescription, prizeSpecs, prizeImage, ticketPrice, totalTickets, soldTickets, status)
        VALUES (@title, @slug, @prizeName, @prizeDescription, @prizeSpecs, @prizeImage, @ticketPrice, @totalTickets, @soldTickets, @status)
      `);
    console.log('PS5 Slim Raffle seeded successfully!');
  }
}
