// Real signup test to verify email sending
import { SendVerificationEmail } from './mailtrap/emails.js';
import { GenerateVerificationToken } from './utils/generateverificationtoken.js';

const testRealSignup = async () => {
    console.log('🔥 Testing REAL signup flow with email...');
    
    // Generate 6-digit verification code
    const verificationCode = GenerateVerificationToken(6);
    console.log('📱 Generated verification code:', verificationCode);
    
    // Send verification email
    const emailSent = await SendVerificationEmail('asdflk3215@gmail.com', verificationCode);
    
    if (emailSent) {
        console.log('✅ SUCCESS: Verification email sent successfully!');
        console.log('📧 Check your Gmail inbox for the verification code.');
        console.log('🎯 The 6-digit code should be:', verificationCode);
    } else {
        console.log('❌ FAILED: Email could not be sent.');
    }
};

testRealSignup();