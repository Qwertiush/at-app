# AT-App

Mobile application that allows users to share and discover recipes.

---

## 🚀 Features
### User & Profiles
- User authentication (login / logout)
- User profiles with preferences (profile picture, language, theme)

### Recipes
- Browsing recipes and user profiles
- Creating, editing, and deleting own recipes
- Random recipe selection

### Social
- Upvote system for recipes and users
- Comments under recipes

### Media & Data
- Image upload with Cloudinary
- Custom backend API for media handling
- Persistent login on device

---

## 🛠️ Tech Stack
- React Native
- Expo
- TypeScript
- REST API
- Expo Router
- Firebase Authentication
- Firebase Firestore
- Cloudinary

---

## 🏗️ Architecture Overview
- Firebase Authentication for user management
- Firestore as the main database
- Cloudinary for image storage
- Custom backend API for secure media uploads
- Firestore stores only image URLs returned from Cloudinary

---

## 🧠 Technical Implementation
- Authentication and authorization flow
- Firestore data modeling for users, recipes, comments, and votes
- Custom backend API for Cloudinary integration
- Optimized media handling and storage costs
- Navigation with Expo Router
- State management with React hooks

---

## 📸 Screenshots
<p align="center">
  <a href="screenshots/1.jpg">
    <img src="screenshots/1.jpg" width="300" />
  </a>
  <a href="screenshots/2.jpg">
    <img src="screenshots/2.jpg" width="300" />
  </a>
  <a href="screenshots/3.jpg">
    <img src="screenshots/3.jpg" width="300" />
  </a>
  <a href="screenshots/4.jpg">
    <img src="screenshots/4.jpg" width="300" />
  </a>
</p>


More screenshots available in the `/screenshots` directory.
---

# How to run application 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

# You can run the app on:
- Android emulator
- iOS simulator
- Expo Go
