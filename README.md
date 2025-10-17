# TextComparePro

A professional text comparison tool with advanced diff analysis.

## Features

- 🔤 **Word & Character Mode**: Compare texts at word or character level
- 🔍 **Case Sensitivity**: Toggle case-sensitive comparison
- 📝 **Punctuation Handling**: Include or exclude punctuation marks
- ⚪ **Whitespace Control**: Consider or ignore whitespace differences
- 🎨 **Color-Coded Diff**: Visual highlighting of matches, additions, deletions, and modifications
- 📊 **Statistics Dashboard**: Detailed comparison statistics
- 🌓 **Dark/Light Mode**: Beautiful theme support
- 📱 **Responsive Design**: Works on all devices

## Technology Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Vite
- **Backend**: Express.js, Node.js
- **UI Components**: Radix UI, Lucide Icons
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5000`

### Build for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

## Deploy to Vercel

### Option 1: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Option 2: GitHub Integration

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Vercel will automatically detect settings
5. Click "Deploy"

### Environment Variables

No environment variables required for basic deployment.

## Local Development

```bash
# Development mode (default port 5000)
npm run dev

# Custom port
PORT=4300 npm run dev

# Type checking
npm run check
```

## Project Structure

```
TextComparePro/
├── client/              # React frontend
│   ├── src/
│   │   ├── components/  # UI components
│   │   ├── lib/         # Utilities and logic
│   │   └── pages/       # Page components
│   └── index.html
├── server/              # Express backend
│   ├── index.ts         # Main server file
│   ├── routes.ts        # API routes
│   └── vite.ts          # Vite integration
├── shared/              # Shared types and schemas
└── dist/                # Build output

```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run check` - Run TypeScript type checking

## Author

**Shayan Hashemi**

- GitHub: [@Shayan5422](https://github.com/Shayan5422)
- LinkedIn: [shhshm](https://www.linkedin.com/in/shhshm/)
- Buy Me a Coffee: [@shayanhshm](https://buymeacoffee.com/shayanhshm)

## License

MIT License - © 2025 Shayan Hashemi. All rights reserved.

## Support

If you find this project helpful, consider:
- ⭐ Starring the repository
- ☕ [Buying me a coffee](https://buymeacoffee.com/shayanhshm)
- 🐛 Reporting bugs
- 💡 Suggesting new features

---

Made with ❤️ by Shayan Hashemi
