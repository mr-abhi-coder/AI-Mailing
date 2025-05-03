# Ai-Mailing   live link - http://aimaillive.s3-website.eu-north-1.amazonaws.com/

An AI-powered email assistant that simplifies and accelerates professional email writing and replying using advanced tone and context-based generation. 
The Copy to clipboard is not working as it required money to buy domain and the deployed on Https, currently running on http

## 🚀 Tech Stack

- **Backend:** Spring Boot, Java  
- **Frontend:** React.js, Tailwind CSS  
- **AI Integration:** OpenAI API  
- **Browser Extension:** Chrome Extension (JavaScript DOM Injection)  

---

## ✨ Features

### 1. AI-Powered Email Reply Generator
- Copy any email content, paste it into the frontend.
- Select your desired **tone** (e.g., Formal, Friendly, Persuasive).
- Generate and copy a personalized, well-structured reply instantly.

### 2. Custom Email Composer
- Fill in details: sender name, receiver name, sender role, background, and purpose.
- Choose tone and context.
- Instantly generate a complete, professional email draft.

### 3. Gmail Integration with Chrome Extension
- Adds an **"AI-Reply"** button inside Gmail using DOM injection.
- Reads email body automatically.
- Uses AI to generate a reply and injects it directly into the Gmail compose box.

---

## 📸 Screenshots

> Add screenshots or GIFs below to demonstrate:

- Frontend UI
- Tone Selection & Result
- Gmail Extension in Action

---

## ⚙️ How It Works

1. **Frontend (React + Tailwind):**
   - Input fields and tone selector.
   - Sends requests to the backend for email generation.

2. **Backend (Spring Boot):**
   - Exposes REST APIs.
   - Communicates with OpenAI to generate responses.

3. **Chrome Extension:**
   - Injects button into Gmail.com.
   - Uses content script to interact with the DOM and communicate with the backend.

---

## 📁 Project Structure

```bash
ai-mailing/
│
├── backend/                # Spring Boot app
│   └── src/
├── frontend/               # React + Tailwind frontend
│   └── src/
├── extension/              # Chrome extension files
│   └── content.js
├── README.md
└── ...

Screenshots :
Generate Emails :-
![Screenshot 2025-05-02 032353](https://github.com/user-attachments/assets/53f48c91-0aa4-4978-9972-40c49cf7523b)
![Screenshot 2025-05-02 032409](h![Screenshot 2025-05-02 032727](https://github.com/user-attachments/assets/a3fc9c20-d551-4568-8b82-5fd22a112a91)
ttps://github.com/user-attachments/assets/77af0441-cf62-4be6-a4eb-f6e622e2428f)
![Screenshot 2025-05-02 032752](https://github.com/user-attachments/assets/738b8334-b51b-4348-85f8-acda5c784f6d)
![Screenshot 2025-05-02 034759](https://github.com/user-attachments/assets/f6523f58-68c8-4727-9fa7-57e212b5be47)

Generate Replies
![Screenshot 2025-05-02 032856](https://github.com/user-attachments/assets/ea15dce8-7b39-4187-9a28-2e090e4e03b9)
![Screenshot 2025-05-02 034359](https://github.com/user-attachments/assets/814b06d0-09da-418d-9662-0aa8514195c2)

Using Extension :-
![Screenshot 2025-05-02 032208](https://github.com/user-attachments/assets/91ab0fba-b301-404c-bdee-575cbac2019d)
![Screenshot 2025-05-02 032231](https://github.com/user-attachments/assets/c226dfab-522b-420a-b2ff-4c1fc761a474)
![Screenshot 2025-05-02 032151](https://github.com/user-attachments/assets/4b1dba72-55be-4887-a2f0-e53909b449ac)

