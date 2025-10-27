# Contact Form Setup Guide

Your contact forms are now fully functional! Here are **3 different methods** you can use:

---

## 🎯 Method 1: EmailJS (Recommended - Easiest & Free)

EmailJS lets you send emails directly from JavaScript without a backend server.

### Setup Steps:

1. **Create an Account**
   - Go to [https://www.emailjs.com/](https://www.emailjs.com/)
   - Sign up for a free account (300 emails/month free)

2. **Add Email Service**
   - In EmailJS dashboard, go to "Email Services"
   - Click "Add New Service"
   - Choose Gmail, Outlook, or any email provider
   - Connect your email account

3. **Create Email Template**
   - Go to "Email Templates"
   - Click "Create New Template"
   - Use these template variables:
     ```
     From: {{from_name}} ({{from_email}})
     Subject: {{subject}}
     Message: {{message}}
     ```

4. **Get Your Keys**
   - Go to "Account" → "General"
   - Copy your **Public Key**
   - Copy your **Service ID** and **Template ID**

5. **Add EmailJS to Your Site**
   
   Add this script in your `index.html` before the closing `</body>` tag:
   ```html
   <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
   <script>
     (function(){
       emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your public key
     })();
   </script>
   ```

6. **Update script.js**
   
   Replace `YOUR_SERVICE_ID` and `YOUR_TEMPLATE_ID` in the EmailJS section of the code.

✅ **Done!** Your form will now send emails directly to your inbox!

---

## 🌐 Method 2: Netlify Forms (If hosted on Netlify)

If you deploy your site on Netlify, forms work automatically!

### Setup Steps:

1. **Deploy to Netlify**
   - Push your code to GitHub
   - Go to [netlify.com](https://netlify.com)
   - Import your repository
   - Deploy!

2. **Your forms are already set up!** The HTML already has:
   ```html
   <form data-netlify="true" name="contact">
   ```

3. **View Submissions**
   - Go to Netlify Dashboard → Your Site → Forms
   - See all submissions there
   - Set up email notifications in Form settings

✅ **That's it!** Netlify handles everything automatically.

---

## 🖥️ Method 3: Your Express Backend (If you want to use your server)

Your backend server is already set up in `server/index.js`!

### Setup Steps:

1. **Install Dependencies**
   ```bash
   cd server
   npm install
   ```

2. **Start the Server**
   ```bash
   npm start
   ```
   Server runs on: http://localhost:5000

3. **Update API Endpoint (Optional)**
   
   If deploying the backend, update the fetch URLs in `script.js`:
   ```javascript
   // Change from:
   fetch('http://localhost:5000/api/contact', ...)
   
   // To your deployed URL:
   fetch('https://your-backend-url.com/api/contact', ...)
   ```

4. **View Submissions**
   - Submissions are saved in `server/data/contact-submissions.json`
   - View them at: http://localhost:5000/api/admin/contact

5. **Add Email Notifications (Optional)**
   
   Install nodemailer:
   ```bash
   npm install nodemailer
   ```
   
   Add to `server/index.js`:
   ```javascript
   const nodemailer = require('nodemailer');
   
   const transporter = nodemailer.createTransport({
     service: 'gmail',
     auth: {
       user: 'your-email@gmail.com',
       pass: 'your-app-password'
     }
   });
   
   // In /api/contact route, add:
   await transporter.sendMail({
     from: email,
     to: 'ksathyaseelan34@gmail.com',
     subject: `Portfolio Contact: ${subject}`,
     text: `From: ${name} (${email})\n\n${message}`
   });
   ```

✅ **Done!** Backend is fully functional.

---

## 🧪 Testing Your Forms

1. Open your portfolio in a browser
2. Fill out the contact form
3. Submit it
4. You should see a success message
5. Check your email or dashboard for the submission

---

## 🎨 Current Features

✅ Real-time validation (as you type)
✅ Error messages for invalid inputs
✅ Loading state with spinner
✅ Success/Error notifications
✅ Form reset after successful submission
✅ Works with both Contact and Project Request forms

---

## 📝 Need Help?

If you encounter any issues:
1. Check browser console (F12) for errors
2. Make sure all scripts are loaded
3. Verify your API keys/endpoints
4. Test with simple data first

**Recommended for beginners:** Use **Method 1 (EmailJS)** - it's the easiest and requires no backend!

---

## 🚀 Quick Start (EmailJS - 5 minutes)

1. Sign up at emailjs.com
2. Connect your Gmail
3. Create a template
4. Copy your Public Key
5. Add the script to index.html
6. Test your form!

That's it! 🎉
