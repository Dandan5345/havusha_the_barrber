/* =============================================
   Havusha The Barber — Firebase Configuration
   Shared config module for all pages
   ============================================= */

const firebaseConfig = {
    apiKey: "AIzaSyBkov9f0uC5MKdUFuwtjj7yu_ZYiE_koZ4",
    authDomain: "havushathebarrber.firebaseapp.com",
    projectId: "havushathebarrber",
    storageBucket: "havushathebarrber.firebasestorage.app",
    messagingSenderId: "114437493888",
    appId: "1:114437493888:web:09e79cba2ac449ccad8265",
    measurementId: "G-E55LDNMSJN"
};

/* =============================================
   Firebase Data Service
   Helper functions for reading/writing data
   ============================================= */

/**
 * Firebase Data Service
 * Provides CRUD operations for site content managed via admin panel
 * 
 * Firestore Collections Structure:
 * 
 * - products/         → Shop products
 *   - id, name, description, price, category, imageUrl, badge, order, active
 * 
 * - reviews/          → Customer reviews
 *   - id, author, text, rating, avatar, date, active
 * 
 * - gallery/          → Gallery images
 *   - id, imageUrl, title, description, category, order, active
 * 
 * - courses/          → Course information
 *   - id, title, description, icon, available, order
 * 
 * - siteSettings/     → General site settings
 *   - heroTitle, heroSubtitle, aboutText, footerText, etc.
 * 
 * - contactMessages/  → Messages from contact form
 *   - name, phone, email, subject, message, date, read
 * 
 * - subscribers/      → Email subscribers (courses notification)
 *   - email, date
 */

// Export config for use in other modules
export { firebaseConfig };
