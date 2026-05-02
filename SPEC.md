# TaskFlow - Production-Grade Task Manager

## Project Overview
- **Project Name**: TaskFlow
- **Type**: Full-Stack SaaS Web Application
- **Core Functionality**: A modern task management application with Kanban board, JWT authentication, and analytics dashboard
- **Target Users**: Individual professionals and small teams needing task organization

---

## Tech Stack

### Backend
- **Framework**: Spring Boot 3.x
- **Database**: MongoDB
- **Authentication**: JWT with BCrypt
- **Architecture**: Layered (Controller → Service → Repository)
- **Build Tool**: Maven

### Frontend
- **Framework**: React 18+ with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context + useReducer
- **HTTP Client**: Axios
- **Routing**: React Router v6
- **Animations**: Framer Motion
- **Drag & Drop**: @hello-pangea/dnd (maintained fork of react-beautiful-dnd)
- **Charts**: Recharts
- **Icons**: Lucide React

---

## UI/UX Specification

### Color Palette

#### Light Mode
- **Background Primary**: `#F8FAFC` (slate-50)
- **Background Secondary**: `#FFFFFF`
- **Background Dark**: `#0F172A` (slate-900)
- **Text Primary**: `#1E293B` (slate-800)
- **Text Secondary**: `#64748B` (slate-500)
- **Accent Primary**: `#6366F1` (indigo-500)
- **Accent Hover**: `#4F46E5` (indigo-600)
- **Success**: `#10B981` (emerald-500)
- **Warning**: `#F59E0B` (amber-500)
- **Danger**: `#EF4444` (red-500)
- **Border**: `#E2E8F0` (slate-200)

#### Dark Mode
- **Background Primary**: `#0F172A` (slate-900)
- **Background Secondary**: `#1E293B` (slate-800)
- **Background Dark**: `#020617` (slate-950)
- **Text Primary**: `#F1F5F9` (slate-100)
- **Text Secondary**: `#94A3B8` (slate-400)
- **Accent Primary**: `#818CF8` (indigo-400)
- **Border**: `#334155` (slate-700)

### Typography
- **Font Family**: `"Inter", system-ui, sans-serif`
- **Headings**:
  - H1: 32px, font-weight: 700
  - H2: 24px, font-weight: 600
  - H3: 18px, font-weight: 600
- **Body**: 14px, font-weight: 400
- **Small**: 12px, font-weight: 400

### Spacing System
- Base unit: 4px
- Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64

### Layout Structure

#### Sidebar (280px width)
- Logo/Brand at top
- Navigation links with icons
- User profile section at bottom
- Collapsible on mobile (hamburger menu)

#### Main Content Area
- Header with page title, search bar, and theme toggle
- Content section with appropriate padding (24px)
- Max content width: 1400px

### Responsive Breakpoints
- **Mobile**: < 640px (sidebar as overlay)
- **Tablet**: 640px - 1024px (sidebar collapsed)
- **Desktop**: > 1024px (full sidebar)

---

## Components Specification

### 1. Authentication Pages

#### Login Page
- Centered card layout with glassmorphism effect
- Email input with validation
- Password input with show/hide toggle
- "Remember me" checkbox
- Login button with loading state
- Link to signup page
- Background: subtle gradient with animated shapes

#### Signup Page
- Similar layout to login
- Name input field
- Confirm password field
- Terms acceptance checkbox

### 2. Dashboard Page

#### Stats Cards Row
- Total Tasks (with count badge)
- In Progress (with progress indicator)
- Completed (with completion percentage)
- Overdue (with urgent styling)
- Each card: icon, label, value, trend indicator

#### Charts Section
- Task completion pie chart (by status)
- Weekly activity bar chart
- Priority distribution chart

#### Recent Tasks List
- Compact task list (last 5 tasks)
- Quick action buttons

### 3. Kanban Board Page

#### Board Header
- Page title "Board"
- Search input
- Filter dropdown (priority, due date)
- Sort dropdown
- "Add Task" button

#### Kanban Columns
- Three columns: To Do, In Progress, Done
- Column header with task count
- Add task button in each column
- Droppable area for drag-and-drop

#### Task Cards
- Priority indicator (colored left border)
- Task title (truncated if long)
- Description preview (2 lines max)
- Due date with icon
- Priority badge
- Edit/Delete icons on hover
- Drag handle

#### Task Modal
- Slide-in from right (400px width)
- Form fields: title, description, priority (select), status (select), due date (date picker)
- Save and Cancel buttons
- Close on backdrop click

### 4. Task List Page

#### Page Header
- Title "Tasks"
- Search bar
- Filter chips (All, Low, Medium, High)
- View toggle (Grid/List)
- Add Task button

#### Task Grid/List
- Grid: 3 columns on desktop, 2 on tablet, 1 on mobile
- List: Single column with more details per row
- Pagination at bottom (10 items per page)
- Loading skeleton during fetch

### 5. Profile Page

#### Profile Card
- Avatar (initials-based)
- Name and email
- Edit button
- Stats (total tasks, completed)

#### Settings Section
- Change password form
- Notification preferences (future)

---

## Functionality Specification

### Authentication
- JWT token stored in localStorage
- Token refresh on app load
- Protected routes redirect to login
- Logout clears token and redirects

### Task CRUD
- Create: Modal form with validation
- Read: Paginated list, filterable, sortable
- Update: Edit modal or inline editing
- Delete: Confirmation dialog

### Drag and Drop
- Smooth animations on drag
- Visual feedback during drag (card opacity, column highlight)
- Optimistic UI update on drop
- API call to update status in background

### Search & Filter
- Real-time search (debounced 300ms)
- Filter by: priority, status, date range
- Sort by: created date, due date, priority

### Dark/Light Mode
- Persisted in localStorage
- System preference detection
- Smooth transition (150ms)

### Toast Notifications
- Position: bottom-right
- Types: success, error, warning, info
- Auto-dismiss: 3 seconds
- Manual dismiss available

### Optimistic Updates
- Immediate UI update on action
- Rollback on API failure
- Loading state during API call

---

## API Endpoints

### Auth
- `POST /api/auth/register` - Create new user
- `POST /api/auth/login` - Authenticate user
- `GET /api/auth/me` - Get current user

### Tasks
- `GET /api/tasks` - Get all tasks (paginated, filtered)
- `POST /api/tasks` - Create task
- `GET /api/tasks/{id}` - Get single task
- `PUT /api/tasks/{id}` - Update task
- `DELETE /api/tasks/{id}` - Delete task
- `PUT /api/tasks/{id}/status` - Update task status (for drag-drop)

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile

---

## Database Schema

### Collection: users
```json
{
  "_id": "ObjectId",
  "name": "String",
  "email": "String (unique)",
  "password": "String (hashed)",
  "role": "String (default: USER)",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Collection: tasks
```json
{
  "_id": "ObjectId",
  "userId": "ObjectId (ref: users)",
  "title": "String",
  "description": "String",
  "status": "String (TODO, IN_PROGRESS, DONE)",
  "priority": "String (LOW, MEDIUM, HIGH)",
  "dueDate": "Date (nullable)",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

---

## Acceptance Criteria

### Authentication
- [ ] User can register with name, email, password
- [ ] User can login with email and password
- [ ] Invalid credentials show error message
- [ ] JWT token is stored and used for API calls

### Task Management
- [ ] User can create task with all fields
- [ ] User can edit existing task
- [ ] User can delete task with confirmation
- [ ] Tasks display in Kanban board
- [ ] Drag-and-drop changes task status
- [ ] Search filters tasks in real-time
- [ ] Priority filter works correctly

### UI/UX
- [ ] Dashboard shows statistics and charts
- [ ] Dark mode toggle works and persists
- [ ] Responsive on mobile, tablet, desktop
- [ ] Animations are smooth and subtle
- [ ] Loading states show skeletons
- [ ] Toast notifications appear for actions

### Performance
- [ ] Initial load < 3 seconds
- [ ] API responses < 500ms
- [ ] Smooth 60fps animations