# Nuxt3 Shadcn Layout

A modern, responsive web application built with Nuxt 3, featuring a beautiful sidebar layout, contract management workflow, and comprehensive UI components using Shadcn-vue.

## 🚀 Features

### 📋 Contract Management Workflow

- **File Upload**: Drag & drop PDF file upload with preview
- **Data Extraction**: AI-powered contract data extraction from PDFs
- **Form Editing**: Comprehensive contract form with validation
- **Document Generation**: Generate final contract documents

### 🎨 Modern UI/UX

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark/Light Theme**: System preference detection with manual toggle
- **Sidebar Navigation**: Collapsible sidebar with smooth animations
- **Interactive Components**: Toast notifications, dialogs, and form validation

### 📱 Pages & Navigation

- **Dashboard**: Contract processing workflow with stepper
- **Projects**: Project management with progress tracking
- **Reports**: Analytics and insights dashboard
- **Search**: Advanced search functionality with filters
- **Settings**: User preferences and configuration
- **Calendar**: Event management and scheduling

### 🔧 Technical Features

- **TypeScript**: Full type safety throughout the application
- **Form Validation**: Zod schema validation with Vee-Validate
- **PDF Viewer**: Interactive PDF viewing with zoom and navigation
- **API Integration**: RESTful API integration with CORS handling
- **State Management**: Reactive state with Vue 3 Composition API

## 🛠️ Tech Stack

### Core Framework

- **Nuxt 3** - Vue.js framework with SSR/SSG capabilities
- **Vue 3** - Progressive JavaScript framework
- **TypeScript** - Type-safe JavaScript development

### UI & Styling

- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn-vue** - Beautiful, accessible UI components
- **Lucide Vue** - Modern icon library
- **Reka UI** - Headless UI components

### Form & Validation

- **Vee-Validate** - Form validation library
- **Zod** - TypeScript-first schema validation
- **@vee-validate/zod** - Zod integration for Vee-Validate

### Additional Libraries

- **Vue PDF Embed** - PDF viewing component
- **VueUse** - Vue composition utilities
- **Class Variance Authority** - Component variant management

## 📦 Installation

### Prerequisites

- Node.js 18+
- npm or yarn

### Setup

```bash
# Clone the repository
git clone <repository-url>
cd nuxt3-shadcn-layout

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:3000` (or alternative port if 3000 is occupied).

## 🏗️ Project Structure

```
nuxt3-shadcn-layout/
├── assets/
│   └── css/
│       └── tailwind.css          # Global styles
├── components/
│   ├── ui/                       # Shadcn-vue components
│   │   ├── button/
│   │   ├── dialog/
│   │   ├── form/
│   │   ├── input/
│   │   ├── sidebar/
│   │   └── ...
│   ├── contract/                 # Contract-specific components
│   │   ├── ContractFormDialog.vue
│   │   ├── DataExtractionStep.vue
│   │   ├── FilePreviewDialog.vue
│   │   └── FileUploadStep.vue
│   ├── AppSidebar.vue            # Main navigation sidebar
│   ├── CustomCalendar.vue        # Custom calendar component
│   ├── PdfViewer.vue             # PDF viewing component
│   └── ThemeToggle.vue           # Theme switcher
├── composables/                  # Vue composables
│   ├── useContractForm.ts        # Form management
│   ├── useContractWorkflow.ts    # Workflow logic
│   ├── useFileUpload.ts          # File handling
│   └── useToast.ts               # Toast notifications
├── layouts/
│   └── default.vue               # Default layout
├── pages/                        # Application pages
│   ├── index.vue                 # Dashboard/Home
│   ├── projects.vue              # Projects page
│   ├── reports.vue               # Reports page
│   ├── search.vue                # Search page
│   ├── settings.vue              # Settings page
│   └── calendar.vue              # Calendar page
├── types/
│   └── contract.ts               # TypeScript interfaces
├── utils/
│   └── api/
│       └── pdf.ts                # PDF API utilities
├── nuxt.config.ts                # Nuxt configuration
├── tailwind.config.js            # Tailwind configuration
└── components.json               # Shadcn-vue configuration
```

## 🎯 Key Components

### Contract Workflow

The application features a comprehensive contract management workflow:

1. **File Upload** (`FileUploadStep.vue`)
   - Drag & drop PDF upload
   - File validation and preview
   - Progress indicators

2. **Data Extraction** (`DataExtractionStep.vue`)
   - AI-powered data extraction
   - Loading states and error handling
   - Form preview button

3. **Form Editing** (`ContractFormDialog.vue`)
   - Comprehensive contract form
   - Real-time validation
   - Auto-save functionality

4. **PDF Preview** (`FilePreviewDialog.vue`)
   - Interactive PDF viewer
   - Zoom and navigation controls
   - Mobile-friendly touch support

### Navigation & Layout

- **AppSidebar.vue**: Main navigation with collapsible design
- **ThemeToggle.vue**: Dark/light mode switcher with system detection
- **CustomCalendar.vue**: Full-featured calendar component

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# API Configuration
NUXT_PUBLIC_API_BASE=http://localhost:3001

# Development
NODE_ENV=development
```

### API Proxy

The application includes a development proxy configuration for API calls:

```typescript
// nuxt.config.ts
nitro: {
  devProxy: {
    '/api': {
      target: 'http://localhost:3001',
      changeOrigin: true,
      prependPath: true
    }
  }
}
```

## 📱 Responsive Design

The application is fully responsive with:

- **Mobile-first approach**: Optimized for mobile devices
- **Breakpoint system**: Tailwind CSS responsive utilities
- **Touch-friendly**: Mobile-optimized interactions
- **Adaptive layouts**: Components adjust to screen size

## 🎨 Theming

### Theme System

- **System preference detection**: Automatically detects user's theme preference
- **Manual toggle**: Users can override system preference
- **CSS variables**: Consistent theming across components
- **Smooth transitions**: Animated theme changes

### Color Modes

- **Light mode**: Clean, bright interface
- **Dark mode**: Easy-on-eyes dark interface
- **System mode**: Follows OS preference

## 🚀 Development

### Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Type checking
npm run type-check

# Code formatting
npm run format
```

### Code Quality

- **ESLint**: Code linting and style enforcement
- **Prettier**: Code formatting
- **TypeScript**: Type checking and safety
- **Vue TSC**: Vue-specific TypeScript checking

## 🔌 API Integration

### PDF Processing

The application integrates with a PDF processing API:

```typescript
// Extract data from PDF
const { data } = await extractPdfData({ file })

// Generate document
const { data } = await useFetch('/api/generate-doc', {
  method: 'POST',
  body: formData
})
```

### Error Handling

- **Toast notifications**: User-friendly error messages
- **Loading states**: Visual feedback during API calls
- **Retry mechanisms**: Automatic retry for failed requests
- **CORS handling**: Development proxy for API calls

## 📋 Form Validation

### Schema Definition

Forms use Zod schemas for validation:

```typescript
const formSchema = toTypedSchema(
  z.object({
    buyerName: z.string().optional(),
    buyerEmail: z.string().email().optional(),
    totalAmount: z.string().nullish()
    // ... more fields
  })
)
```

### Validation Features

- **Real-time validation**: Immediate feedback on input
- **Custom error messages**: User-friendly error descriptions
- **Type safety**: TypeScript integration with schemas
- **Null handling**: Proper handling of optional fields

## 🎯 Usage Examples

### Adding a New Page

1. Create a new `.vue` file in the `pages/` directory
2. Add navigation item to `AppSidebar.vue`
3. Follow the established layout pattern

### Creating a New Component

1. Add component to appropriate directory in `components/`
2. Use TypeScript interfaces for props
3. Follow Shadcn-vue component patterns

### Adding Form Validation

1. Define Zod schema in `composables/`
2. Use `useForm` from Vee-Validate
3. Integrate with form components

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **Nuxt Team** - For the amazing Vue.js framework
- **Shadcn** - For the beautiful UI components
- **Tailwind CSS** - For the utility-first CSS framework
- **Vue Community** - For the excellent ecosystem

---

Built with ❤️ using Nuxt 3, Vue 3, and modern web technologies.
