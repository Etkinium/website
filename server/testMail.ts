import { sendWelcomeEmail } from './sendEmail';

async function testEmail() {
  console.log('📧 Test maili gönderiliyor...');
  
  try {
    const result = await sendWelcomeEmail('berkay.gulcin@etkinium.com');
    console.log('✅ Test maili başarıyla gönderildi!');
    console.log('📊 Sonuç:', result);
  } catch (error) {
    console.error('❌ Test maili gönderilemedi:', error);
    process.exit(1);
  }
}

testEmail();
