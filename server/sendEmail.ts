import sgMail from '@sendgrid/mail';

let connectionSettings: any;

async function getCredentials() {
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found for repl/depl');
  }

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=sendgrid',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  if (!connectionSettings || (!connectionSettings.settings.api_key || !connectionSettings.settings.from_email)) {
    throw new Error('SendGrid not connected');
  }
  return {
    apiKey: connectionSettings.settings.api_key, 
    fromEmail: connectionSettings.settings.from_email
  };
}

// WARNING: Never cache this client.
// Access tokens expire, so a new client must be created each time.
async function getSendGridClient() {
  const { apiKey, fromEmail } = await getCredentials();
  sgMail.setApiKey(apiKey);
  return {
    client: sgMail,
    fromEmail
  };
}

export async function sendWelcomeEmail(toEmail: string) {
  const { client, fromEmail } = await getSendGridClient();
  
  const msg = {
    to: toEmail,
    from: fromEmail,
    subject: 'Etkinium\'a Hoş Geldin!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #111;">
        <div style="background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%); padding: 40px 20px; text-align: center;">
          <h1 style="color: #FFD700; margin: 0; font-size: 32px;">ETKİNİUM'a Hoş Geldiniz!</h1>
        </div>
        
        <div style="padding: 40px 20px; background: #ffffff;">
          <p style="font-size: 16px; line-height: 1.6; color: #333;">
            Merhaba,
          </p>
          
          <p style="font-size: 16px; line-height: 1.6; color: #333;">
            ETKİNİUM ailesine katıldığınız için teşekkür ederiz! Türkiye'nin yeni nesil dijital biletleme ekosisteminde sizi aramızda görmekten mutluluk duyuyoruz.
          </p>
          
          <div style="background: #f8f9fa; border-left: 4px solid #FFD700; padding: 20px; margin: 30px 0;">
            <h3 style="color: #000; margin-top: 0;">🎁 100 Hoş Geldin Puanınız Hazır!</h3>
            <p style="color: #555; margin-bottom: 0;">
              İlk alışverişinizde kullanabileceğiniz 100 puan hesabınıza tanımlandı.
            </p>
          </div>
          
          <h3 style="color: #000; margin-top: 30px;">ETKİNİUM ile neler yapabilirsiniz?</h3>
          <ul style="color: #555; line-height: 1.8;">
            <li>Konser, tiyatro, festival biletlerinizi kolayca alın</li>
            <li>Özel kampanyalardan ve fırsatlardan haberdar olun</li>
            <li>Puanlarınızı biriktirin, indirimlerden faydalanın</li>
            <li>Konaklama ve seyahat hizmetlerine erişin</li>
          </ul>
          
          <div style="text-align: center; margin: 40px 0;">
            <a href="https://etkinium.com" style="display: inline-block; background: #000000; color: #FFD700; padding: 15px 40px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px;">
              Etkinlikleri Keşfet
            </a>
          </div>
          
          <p style="font-size: 16px; line-height: 1.6; color: #333;">
            Herhangi bir sorunuz olursa, <a href="mailto:iletisim@etkinium.com" style="color: #FFD700;">iletisim@etkinium.com</a> adresinden bizimle iletişime geçebilirsiniz.
          </p>
          
          <p style="font-size: 16px; line-height: 1.6; color: #333;">
            Saygılarımızla,<br/>
            <strong style="color: #FFD700;">ETKİNİUM Ekibi</strong>
          </p>
        </div>
        
        <div style="background: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e0e0e0;">
          <p style="font-size: 12px; color: #666; margin: 5px 0;">
            Bu e-posta otomatik olarak gönderilmiştir.
          </p>
          <p style="font-size: 12px; color: #666; margin: 5px 0;">
            © ${new Date().getFullYear()} ETKİNİUM - Tek Platform, Sonsuz Sanat
          </p>
        </div>
      </div>
    `
  };

  try {
    const response = await client.send(msg);
    console.log('Hoş geldin maili gönderildi:', toEmail, 'Status:', response[0].statusCode);
    return { success: true, statusCode: response[0].statusCode };
  } catch (error: any) {
    console.error('Mail gönderme hatası:', error?.response?.body || error);
    throw error;
  }
}
