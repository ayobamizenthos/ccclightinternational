# Church Website - Production Ready

A modern, responsive church website built with React, TypeScript, and Vite. Features PWA capabilities, offline support, and comprehensive production optimizations.

## 🚀 Features

- **Progressive Web App (PWA)** - Installable, offline-capable
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Performance Optimized** - Code splitting, lazy loading, caching
- **Error Monitoring** - Sentry integration for production error tracking
- **Analytics** - Google Analytics and Firebase Analytics
- **SEO Optimized** - Meta tags, sitemap, structured data
- **Accessibility** - WCAG compliant with keyboard navigation
- **Security** - HTTPS enforcement, CSP headers, secure defaults

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Framer Motion
- **State Management**: React Query, Context API
- **Backend**: Firebase (Auth, Firestore, Analytics)
- **PWA**: Workbox, Service Workers
- **Deployment**: Vercel/Netlify/Docker ready

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- Firebase project (for backend services)

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cccakokoparish
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Development**
   ```bash
   npm run dev
   ```

5. **Build for Production**
   ```bash
   npm run build
   ```

6. **Preview Production Build**
   ```bash
   npm run preview
   ```

## 🔧 Environment Variables

Create a `.env` file with the following variables:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=your-app-id

# Analytics
VITE_GA_TRACKING_ID=GA_MEASUREMENT_ID

# Stripe (for donations)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_or_live_key

# Environment
VITE_NODE_ENV=production

# Sentry Error Monitoring
VITE_SENTRY_DSN=https://your-sentry-dsn@sentry.io/project-id
```

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:analyze` - Build with bundle analyzer
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run type-check` - Run TypeScript type checking
- `npm run clean` - Clean build directory

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push

### Netlify
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Configure environment variables

### Docker
```bash
# Build Docker image
docker build -t church-website .

# Run with Docker Compose
docker-compose up -d
```

## 🔍 Performance Monitoring

The application includes comprehensive performance monitoring:

- **Web Vitals** - CLS, FID, LCP tracking
- **Resource Loading** - Monitor slow assets
- **Navigation Timing** - Page load performance
- **Memory Usage** - JavaScript heap monitoring
- **Error Tracking** - Sentry integration

## 🗄️ Caching Strategy

- **Service Worker** - Workbox-powered caching
- **Static Assets** - Long-term caching (1 year)
- **Images** - Cache-first with expiration (30 days)
- **API Responses** - Network-first with short cache (30 min)
- **Pages** - Network-first for fresh content

## 🔒 Security Features

- **HTTPS Enforcement** - Automatic redirect to HTTPS
- **Content Security Policy** - Strict CSP headers
- **Security Headers** - HSTS, X-Frame-Options, etc.
- **Environment Variables** - Sensitive data protection
- **Code Splitting** - Reduced attack surface

## 📱 Progressive Web App

- **Offline Support** - Service worker caching
- **Install Prompt** - Add to home screen
- **Background Sync** - Offline data synchronization
- **Push Notifications** - Church announcements

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built for Celestial Church of Christ Akoko Parish
- Special thanks to the development team and contributors
