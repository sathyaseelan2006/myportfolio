# 🚀 Quick Start - Get Your Contact Form Working NOW!

## ⚡ Fastest Method: EmailJS (5 minutes)

### Step 1: Sign Up
1. Go to https://www.emailjs.com/
2. Click "Sign Up" (it's FREE!)
3. Sign up with Google (easiest)

### Step 2: Add Email Service
1. Once logged in, click **"Email Services"** in the sidebar
2. Click **"Add New Service"**
3. Select **"Gmail"** (or your email provider)
4. Click **"Connect Account"** and authorize
5. Click **"Create Service"**
6. ✅ Copy your **Service ID** (looks like: `service_abc123`)

### Step 3: Create Email Template
1. Click **"Email Templates"** in the sidebar
2. Click **"Create New Template"**
3. Template Name: `portfolio_contact`
4. **Edit the template:**
   - Subject: `New Contact from {{from_name}}`
   - Content:
   ```
   You have a new message from your portfolio!
   
   Name: {{from_name}}
   Email: {{from_email}}
   Subject: {{subject}}
   
   Message:
   {{message}}
   ```
5. Click **"Save"**
6. ✅ Copy your **Template ID** (looks like: `template_xyz789`)

### Step 4: Get Your Public Key
1. Click **"Account"** in the sidebar
2. Click **"General"**
3. ✅ Copy your **Public Key** (looks like: `ABCdefGHIjkl123`)

### Step 5: Update Your Website
1. Open `index.html`
2. Find the line `<script src="script.js"></script>` (near the bottom)
3. Add this code **RIGHT BEFORE** it:

```html
<!-- EmailJS Library -->
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
<script>
  (function(){
    emailjs.init("YOUR_PUBLIC_KEY_HERE"); // Replace with your actual public key
  })();
</script>

<script src="script.js"></script>
```

4. Replace `YOUR_PUBLIC_KEY_HERE` with the public key you copied

5. Open `script.js` and find this line (around line 97):
```javascript
await emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form);
```

6. Replace:
   - `YOUR_SERVICE_ID` with your Service ID
   - `YOUR_TEMPLATE_ID` with your Template ID

### Step 6: Test It!
1. Open `index.html` in your browser
2. Scroll to the contact form
3. Fill it out and click "Send Message"
4. Check your email - you should receive the message!

---

## 🎯 That's It! You're Done! 🎉

Your contact form is now **100% WORKING**!

---

## 🧪 Troubleshooting

### Form doesn't send?
1. Check browser console (Press F12)
2. Make sure you replaced ALL three values:
   - Public Key in `index.html`
   - Service ID in `script.js`
   - Template ID in `script.js`

### Still not working?
1. Make sure the EmailJS script is loaded BEFORE `script.js`
2. Check that your email template has these fields:
   - `{{from_name}}`
   - `{{from_email}}`
   - `{{subject}}`
   - `{{message}}`

### Need to change the template?
The form sends these fields to EmailJS:
- `name` → becomes `from_name` in template
- `email` → becomes `from_email` in template
- `subject` → becomes `subject` in template
- `message` → becomes `message` in template

---

## 📧 Free Tier Limits

EmailJS free tier includes:
- ✅ 200 emails per month
- ✅ Unlimited email templates
- ✅ No credit card required

Perfect for a portfolio site! 🚀

---

## 🎨 Bonus: Email Notifications

To receive emails immediately:
1. In EmailJS dashboard, go to your Email Service
2. Make sure your email is verified
3. Check your spam folder first time

---

## 💡 Example Values

Here's what your code should look like after setup:

**In index.html:**
```html
<script>
  (function(){
    emailjs.init("ABCdefGHI123"); // Your actual public key
  })();
</script>
```

**In script.js:**
```javascript
await emailjs.sendForm('service_abc123', 'template_xyz789', form);
```

---

Need more help? Check `CONTACT_FORM_SETUP.md` for detailed guides on other methods!
