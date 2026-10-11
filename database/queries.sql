-- ==============================================================================
-- کوئری‌های کاربردی و گزارش‌گیری برای SSMS
-- دیتابیس: GambleDB
-- ==============================================================================

USE GambleDB;
GO

-- ۱. گزارش تجمیعی: هر کاربر دقیقاً چند بلیت خریده و چقدر پرداخت کرده؟
SELECT 
    u.id AS [شناسه کاربر],
    u.fullName AS [نام خریدار],
    u.phoneNumber AS [شماره همراه],
    u.email AS [ایمیل],
    COUNT(t.id) AS [تعداد کل بلیت‌ها],
    FORMAT(COUNT(t.id) * 200000, 'N0') + ' تومان' AS [مبلغ کل پرداختی],
    MIN(t.ticketNumber) AS [از شماره بلیت],
    MAX(t.ticketNumber) AS [تا شماره بلیت]
FROM Users u
LEFT JOIN Tickets t ON u.id = t.userId
WHERE u.role = 'user'
GROUP BY u.id, u.fullName, u.phoneNumber, u.email
ORDER BY [تعداد کل بلیت‌ها] DESC;
GO


-- ۲. لیست کامل تمام بلیت‌های صادر شده با مشخصات خریدار
SELECT 
    t.ticketNumber AS [شماره بلیت],
    t.ticketCode AS [کد یکتا],
    u.fullName AS [نام خریدار],
    u.phoneNumber AS [تلفن همراه],
    o.trackingCode AS [کد رهگیری بانکی],
    t.createdAt AS [تاریخ و زمان صدور]
FROM Tickets t
JOIN Users u ON t.userId = u.id
JOIN Orders o ON t.orderId = o.id
ORDER BY t.ticketNumber ASC;
GO


-- ۳. آمار کل فروش و وضعیت قرعه‌کشی پلی‌استیشن ۵
SELECT 
    r.title AS [عنوان قرعه‌کشی],
    r.totalTickets AS [ظرفیت کل],
    (SELECT COUNT(*) FROM Tickets) AS [بلیت‌های واقعی فروخته شده],
    FORMAT((SELECT COUNT(*) FROM Tickets) * r.ticketPrice, 'N0') + ' تومان' AS [کل درآمد ریالی],
    CAST(ROUND(((SELECT COUNT(*) FROM Tickets) * 100.0 / r.totalTickets), 2) AS NVARCHAR(10)) + '%' AS [درصد تکمیل ظرفیت],
    r.status AS [وضعیت قرعه‌کشی]
FROM Raffles r
WHERE r.id = 1;
GO


-- ۴. قرعه‌کشی و استخراج یک برنده تصادفی از بین بلیت‌های خریداری‌شده
SELECT TOP 1 
    t.ticketNumber AS [شماره بلیت برنده],
    t.ticketCode AS [کد بلیت برنده],
    u.fullName AS [نام برنده مسابقه],
    u.phoneNumber AS [شماره تماس جهت هماهنگی],
    u.email AS [ایمیل برنده]
FROM Tickets t
JOIN Users u ON t.userId = u.id
ORDER BY NEWID(); -- مرتب‌سازی کاملاً رندوم توسط سرور
GO


-- ۵. در صورت نیاز: صفر کردن بلیت‌های تستی و شروع مجدد از صفر
-- (تنها در صورتی که خواستید کل داده‌های تستی پاک شوند این بخش را اجرا کنید)
/*
DELETE FROM Tickets;
DELETE FROM Orders;
DELETE FROM Users WHERE role = 'user';
UPDATE Raffles SET soldTickets = 0, status = 'active', winnerTicketNumber = NULL, winnerUserId = NULL, winnerName = NULL, winnerAnnouncedAt = NULL;
PRINT N'[اطلاع] داده‌های تستی پاک شدند و سیستم آماده شروع واقعی شد.';
*/
GO


-- ۶. لغو نتیجه قرعه‌کشی و بازگرداندن وضعیت به «در حال فروش» (بدون دست زدن به بلیت‌های کاربران)
UPDATE Raffles 
SET status = 'active', 
    winnerTicketNumber = NULL, 
    winnerUserId = NULL, 
    winnerName = NULL, 
    winnerAnnouncedAt = NULL 
WHERE id = 1;
PRINT N'[اطلاع] وضعیت قرعه‌کشی مجدداً به حالت فعال و آماده قرعه‌کشی تغییر یافت.';
GO
