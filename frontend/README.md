/**
 * README file for Frontend structure
 * Describes the directory structure and how to use it
 */

# Frontend - Lead Consortium

## 📁 Directory Structure

```
src/
├── components/        # Reusable React components
│   ├── common/       # Atomic components (Button, Input, etc)
│   ├── landing/      # Landing page specific components
│   ├── dashboard/    # Dashboard layout components
│   └── admin/        # Admin specific components
├── pages/            # Full page components
├── forms/            # Form schemas and validators (Zod)
├── services/         # API services
├── hooks/            # Custom React hooks
├── context/          # React Context providers
├── types/            # TypeScript type definitions
├── utils/            # Utility functions
├── styles/           # Global CSS and Tailwind
└── assets/           # Images, icons, etc
```

## 🚀 Getting Started

### Install Dependencies
```bash
npm install
```

### Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Type Check
```bash
npm run type-check
```

### Lint Code
```bash
npm run lint
```

## 📦 Technologies

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **React Router** - Routing
- **Axios** - HTTP client
- **React Hook Form** - Form management
- **Zod** - Validation
- **Framer Motion** - Animations

## ✨ Key Features

- Type-safe with TypeScript
- Path aliases (@/)
- Dark mode ready (Tailwind)
- Responsive design
- Form validation with Zod
- API service layer
- Auth context

## 📝 Code Style

- ESLint + Prettier configured
- 2-space indentation
- Single quotes
- Trailing commas (es5)
- Line width: 100 characters
- Semicolons required

## 🔧 Configuration Files

- `vite.config.ts` - Vite configuration
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.ts` - Tailwind CSS customization
- `.eslintrc.json` - Linting rules
- `.prettierrc` - Code formatting
- `.env.example` - Environment variables template

## 📱 Responsive Breakpoints

- `sm` - 640px (Mobile)
- `md` - 768px (Tablet)
- `lg` - 1024px (Laptop)
- `xl` - 1280px (Desktop)

## 🎨 Colors

- Primary Blue: `#0066CC`
- Primary Green: `#00A86B`
- Background: `#FFFFFF`
- Text: `#2B2B2B`

See `tailwind.config.ts` for complete color palette.

## 📚 Documentation

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [TailwindCSS Documentation](https://tailwindcss.com)
- [React Router Documentation](https://reactrouter.com)
- [Zod Documentation](https://zod.dev)
