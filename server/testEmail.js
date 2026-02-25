// Test Gmail functionality
// Run this file with: node testEmail.js

import { SendVerificationEmail, SendWelcomeEmail, SendForgotPasswordEmail } from './mailtrap/emails.js';
import dotenv from 'dotenv';

dotenv.config();

const testEmail = async () => {
    console.log('Testing Gmail functionality...');
    
    // Test verification email
    const verificationResult = await SendVerificationEmail('test@example.com', '123456');
    console.log('Verification email result:', verificationResult);
    
    // Test welcome email
    const welcomeResult = await SendWelcomeEmail('test@example.com', 'John', 'Doe', 'HR-Admin');
    console.log('Welcome email result:', welcomeResult);
    
    // Test forgot password email
    const forgotResult = await SendForgotPasswordEmail('test@example.com', 'http://localhost:5173/reset-password?token=test123');
    console.log('Forgot password email result:', forgotResult);
    
    console.log('Email testing completed!');
};

testEmail();