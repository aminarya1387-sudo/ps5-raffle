-- ==============================================================================
-- پایگاه داده سامانه قرعه‌کشی آیفون ۱۳ پرو (GambleDB)
-- سیستم مدیریت پایگاه داده: Microsoft SQL Server 2022 / 2025
-- ==============================================================================

-- ۱. ساخت پایگاه داده
IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = N'GambleDB')
BEGIN
    CREATE DATABASE GambleDB;
    PRINT N'[موفقیت] پایگاه داده GambleDB ساخته شد.';
END
GO

USE GambleDB;
GO

-- ۲. جدول کاربران (مدیران و شرکت‌کنندگان)
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Users' AND xtype='U')
BEGIN
    CREATE TABLE Users (
        id INT IDENTITY(1,1) PRIMARY KEY,
        fullName NVARCHAR(150) NOT NULL,
        email NVARCHAR(150) UNIQUE NOT NULL,
        passwordHash NVARCHAR(255) NOT NULL,
        phoneNumber NVARCHAR(30) NULL,
        role NVARCHAR(30) DEFAULT 'user', -- 'user' یا 'admin'
        createdAt DATETIME DEFAULT GETDATE()
    );
    CREATE INDEX IX_Users_Email ON Users(email);
    PRINT N'[موفقیت] جدول Users ساخته شد.';
END
GO

-- ۳. جدول قرعه‌کشی‌ها (محصول، ظرفیت و وضعیت برنده)
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Raffles' AND xtype='U')
BEGIN
    CREATE TABLE Raffles (
        id INT IDENTITY(1,1) PRIMARY KEY,
        title NVARCHAR(255) NOT NULL,
        slug NVARCHAR(100) UNIQUE NOT NULL,
        prizeName NVARCHAR(255) NOT NULL,
        prizeDescription NVARCHAR(MAX) NULL,
        prizeSpecs NVARCHAR(MAX) NULL,
        prizeImage NVARCHAR(500) NULL,
        ticketPrice BIGINT NOT NULL DEFAULT 200000, -- قیمت هر بلیت به تومان
        totalTickets INT NOT NULL DEFAULT 10000,   -- ظرفیت کل بلیت‌ها
        soldTickets INT NOT NULL DEFAULT 0,        -- بلیت‌های پایه دیتابیس
        status NVARCHAR(50) DEFAULT 'active',      -- active, sold_out, drawing, completed
        winnerTicketNumber INT NULL,
        winnerUserId INT NULL FOREIGN KEY REFERENCES Users(id),
        winnerName NVARCHAR(150) NULL,
        winnerAnnouncedAt DATETIME NULL,
        createdAt DATETIME DEFAULT GETDATE()
    );
    CREATE INDEX IX_Raffles_Slug ON Raffles(slug);
    PRINT N'[موفقیت] جدول Raffles ساخته شد.';
END
GO

-- ۴. جدول سفارشات و تراکنش‌های بانکی
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Orders' AND xtype='U')
BEGIN
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
    CREATE INDEX IX_Orders_UserId ON Orders(userId);
    PRINT N'[موفقیت] جدول Orders ساخته شد.';
END
GO

-- ۵. جدول بلیت‌های اختصاصی
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Tickets' AND xtype='U')
BEGIN
    CREATE TABLE Tickets (
        id INT IDENTITY(1,1) PRIMARY KEY,
        raffleId INT NOT NULL FOREIGN KEY REFERENCES Raffles(id),
        userId INT NOT NULL FOREIGN KEY REFERENCES Users(id),
        orderId INT NOT NULL FOREIGN KEY REFERENCES Orders(id),
        ticketNumber INT NOT NULL, -- شماره بلیت متوالی (1 تا 10000)
        ticketCode NVARCHAR(50) NOT NULL, -- کد بلیت مانند PS5-00001
        createdAt DATETIME DEFAULT GETDATE(),
        CONSTRAINT UQ_Raffle_TicketNumber UNIQUE(raffleId, ticketNumber)
    );
    CREATE INDEX IX_Tickets_User ON Tickets(userId);
    CREATE INDEX IX_Tickets_Raffle ON Tickets(raffleId);
    PRINT N'[موفقیت] جدول Tickets ساخته شد.';
END
GO
