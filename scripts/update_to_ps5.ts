import { getDb } from '../src/lib/db';

async function main() {
  const db = await getDb();

  const specs = JSON.stringify({
    model: 'PlayStation 5 Slim (Disc Edition)',
    storage: '1TB Ultra-High Speed SSD',
    controller: 'دسته اصلی DualSense + دسته دوم اضافه اورجینال سونی',
    resolution: 'پشتیبانی از 4K 120Hz و خروجی 8K HDR با رهگیری پرتو (Ray Tracing)',
    audio: 'فناوری اختصاصی صدای سه‌بعدی Tempest 3D AudioTech',
    region: 'ریجن اروپا (CFI-2016A) استاندارد پلمپ کارخانه',
    warranty: '۱۸ ماه گارانتی شرکتی معتبر همراه با فاکتور رسمی',
  });

  const desc = 'فرصت طلایی و هیجان‌انگیز برای برنده شدن پرطرفدارترین کنسول بازی جهان! یک دستگاه Sony PlayStation 5 Slim دیسک‌خور با حافظه ۱ ترابایت SSD پرسرعت، همراه با یک عدد دسته اضافه اورجینال DualSense و ۱۸ ماه گارانتی تعویض. به محض تکمیل ۱۰,۰۰۰ بلیت، قرعه‌کشی به صورت زنده برگزار و کنسول تحویل برنده خواهد شد.';

  await db
    .request()
    .input('title', 'قرعه‌کشی بزرگ کنسول پلی‌استیشن ۵ (Sony PS5 Slim 1TB)')
    .input('slug', 'ps5-standard-1tb')
    .input('prizeName', 'Sony PlayStation 5 Slim 1TB + دسته اضافه DualSense')
    .input('prizeDescription', desc)
    .input('prizeSpecs', specs)
    .input('prizeImage', '/images/ps5.jpg')
    .query(`
      UPDATE Raffles
      SET 
        title = @title,
        slug = @slug,
        prizeName = @prizeName,
        prizeDescription = @prizeDescription,
        prizeSpecs = @prizeSpecs,
        prizeImage = @prizeImage
      WHERE id = 1
    `);

  // Update existing tickets to PS5 prefix
  await db.request().query(`
    UPDATE Tickets 
    SET ticketCode = 'PS5-' + RIGHT('00000' + CAST(ticketNumber AS VARCHAR(5)), 5)
  `);

  console.log('SUCCESS: PS5 database update finished successfully!');
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
