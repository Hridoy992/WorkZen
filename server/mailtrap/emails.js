import { VERIFICATION_EMAIL_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE } from "./emailtemplates.js"
import { createGmailTransporter, sender } from "./gmail.config.js"

export const SendVerificationEmail = async (email, verificationcode) => {
    try {
        const transporter = createGmailTransporter();
        
        const mailOptions = {
            from: `${sender.name} <${sender.email}>`,
            to: email,
            subject: "Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationcode)
        };

        const result = await transporter.sendMail(mailOptions);
        console.log("Verification email sent successfully", result.messageId);
        return true;
    } catch (error) {
        console.log("Error sending verification email:", error.message);
        return false;
    }
}

export const SendWelcomeEmail = async (email, firstname, lastname, role) => {
    try {
        const transporter = createGmailTransporter();
        
        const welcomeHtml = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(to right, #4CAF50, #45a049); color: white; padding: 20px; text-align: center; }
                .content { background-color: #f9f9f9; padding: 20px; }
                .welcome-badge { background-color: #4CAF50; color: white; padding: 10px 20px; border-radius: 25px; display: inline-block; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Welcome to Employee Management System!</h1>
                </div>
                <div class="content">
                    <h2>Hello ${firstname} ${lastname}!</h2>
                    <p>Welcome to our Employee Management System. Your account has been successfully verified.</p>
                    <div style="text-align: center; margin: 30px 0;">
                        <span class="welcome-badge">Role: ${role || 'Employee'}</span>
                    </div>
                    <p>You can now access all the features available to your role.</p>
                    <p>If you have any questions, feel free to contact our support team.</p>
                    <p>Best regards,<br>Employee Management System Team</p>
                </div>
            </div>
        </body>
        </html>
        `;

        const mailOptions = {
            from: `${sender.name} <${sender.email}>`,
            to: email,
            subject: "Welcome to Employee Management System!",
            html: welcomeHtml
        };

        const result = await transporter.sendMail(mailOptions);
        console.log("Welcome email sent successfully", result.messageId);
        return true;
    } catch (error) {
        console.log("Error sending welcome email:", error.message);
        return false;
    }
}

export const SendForgotPasswordEmail = async (email, resetURL) => {
    try {
        const transporter = createGmailTransporter();
        
        const mailOptions = {
            from: `${sender.name} <${sender.email}>`,
            to: email,
            subject: "Reset Your Password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL)
        };

        const result = await transporter.sendMail(mailOptions);
        console.log("Forgot Password email sent successfully", result.messageId);
        return true;
    } catch (error) {
        console.log("Error sending forgot password email:", error.message);
        return false;
    }
}

export const SendResetPasswordConfimation = async (email) => {
    try {
        const transporter = createGmailTransporter();
        
        const mailOptions = {
            from: `${sender.name} <${sender.email}>`,
            to: email,
            subject: "Password Reset Successfully",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE
        };

        const result = await transporter.sendMail(mailOptions);
        console.log("Reset Password confirmation email sent successfully", result.messageId);
        return true;
    } catch (error) {
        console.log("Error sending reset password confirmation:", error.message);
        return false;
    }
}