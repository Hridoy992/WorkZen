# Gmail Configuration Setup

## How to set up Gmail for sending emails:

### 1. Enable 2-Factor Authentication
- Go to your Google Account settings
- Navigate to Security
- Turn on 2-Step Verification

### 2. Generate App Password
- After enabling 2FA, go to Security settings
- Click on "App passwords"
- Select "Mail" as the app
- Generate a 16-character app password

### 3. Update .env file
Replace the following in your .env file:

```
GMAIL_USER=your-actual-gmail@gmail.com
GMAIL_APP_PASSWORD=your-16-character-app-password
```

### 4. Test Email Functionality
Run the test file to check if emails are working:
```bash
node testEmail.js
```

## Important Notes:
- Never share your app password
- Use a dedicated Gmail account for your application
- Make sure 2FA is enabled on your Gmail account
- The app password should be 16 characters without spaces

## Troubleshooting:
- If emails are not sending, check your Gmail credentials
- Make sure "Less secure app access" is turned off (we're using app passwords instead)
- Verify that your Gmail account has 2FA enabled
- Check the console logs for detailed error messages