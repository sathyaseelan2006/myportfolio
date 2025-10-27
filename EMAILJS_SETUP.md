# 📧 EmailJS Setup Guide - 5 Minutes

## Step 1: Create EmailJS Account

1. Go to **https://www.emailjs.com/**
2. Click **"Sign Up"** (it's FREE!)
3. Sign up with your email or Google account
4. Verify your email

---

## Step 2: Add Email Service

1. Go to **"Email Services"** in the dashboard
2. Click **"Add New Service"**
3. Choose **Gmail** (recommended) or any email provider
4. Click **"Connect Account"**
5. Sign in with your email account
6. **Copy the Service ID** (looks like: `service_abc123`)

---

## Step 3: Create Email Template

1. Go to **"Email Templates"**
2. Click **"Create New Template"**
3. Use this template content:

### Subject:
```
New Contact Form Message from {{from_name}}
```

### Content:
```
You have a new message from your portfolio contact form!

From: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
Sent from your portfolio website
```

4. Click **"Save"**
5. **Copy the Template ID** (looks like: `template_xyz789`)

---

## Step 4: Get Public Key

1. Go to **"Account"** → **"General"**
2. Find **"Public Key"** section
3. **Copy your Public Key** (looks like: `Abc123XyZ-DEF456`)

---

## Step 5: Update Your Website

Now I'll update your `script.js` file with your credentials.

**You'll need:**
- ✅ Service ID
- ✅ Template ID  
- ✅ Public Key

Just give me these 3 values and I'll configure everything!

---

## Example Values:

```javascript
Service ID: service_abc123
Template ID: template_xyz789
Public Key: Abc123XyZ-DEF456
```

---

## That's It! 🎉

Once configured, your contact form will:
- ✅ Send emails to your inbox
- ✅ Show success messages
- ✅ Work instantly
- ✅ Be completely free (up to 200 emails/month)

---

## Need Help?

Just tell me:
1. Your Service ID
2. Your Template ID
3. Your Public Key

I'll update the code for you! 🚀
