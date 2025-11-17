# DocLink

DocLink is a modern patient management and appointment scheduling app built with Next.js and Appwrite.  
It lets patients register, upload ID documents, and request appointments, while providing an admin dashboard to manage and track appointments with real-time SMS notifications.

> Designed for clinics and hospitals that want a simple, web-based patient intake and scheduling flow.

---

## Features

### Patient experience

- **Patient registration**
  - Capture full demographic & contact details
  - Emergency contact and insurance information
  - Support for multiple identification document types
  - Upload and store ID documents in Appwrite Storage

- **Appointment booking**
  - Book new appointments at `/patients/[userId]/new-appointment`
  - Select primary physician from a curated list of doctors
  - Schedule date & time with Indian locale-friendly display (IST)

- **Confirmation screen**
  - Success page with appointment summary and doctor details
  - Clear confirmation message and call-to-action for new appointment

### Admin experience

- **Admin dashboard** (`/admin`)
  - Overview stats:
    - Scheduled appointments
    - Pending appointments
    - Cancelled appointments
  - Recent appointments table with filters/sorting (TanStack Table)
  - Quick view into appointment status and schedule

- **Appointment management**
  - Update appointment status (schedule / cancel)
  - Automatic SMS notifications via Appwrite Messaging:
    - Confirmation messages with date, time, and doctor
    - Cancellation messages with custom reasons
  - Dashboard automatically revalidates after changes

### Under the hood

- **Next.js App Router** (v16) with server components
- **TypeScript-first** codebase
- **UI + UX**
  - Tailwind CSS
  - Radix UI primitives & shadcn-style components
  - Responsive layout with split patient form / hero image pages
- **Forms & validation**
  - react-hook-form
  - zod schemas (for robust validation)
- **Backend**
  - Appwrite Databases, Storage, Users, and Messaging
  - Node Appwrite SDK (`node-appwrite`)

---

## Tech Stack

- **Frontend**
  - Next.js 16 (App Router)
  - React 19
  - TypeScript
  - Tailwind CSS
  - Radix UI / shadcn-style components
- **Backend / Infrastructure**
  - Appwrite (Database, Storage, Users, Messaging)
- **Forms & Data**
  - react-hook-form
  - zod
  - @tanstack/react-table
- **Other**
  - date-fns
  - libphonenumber-js
  - react-datepicker
  - Appwrite SMS for notifications

---

## Getting Started

### Prerequisites

- **Node.js** v18+ (recommended)
- **Package manager**: npm, pnpm, yarn, or bun
- An **Appwrite project** (cloud or self-hosted)

Create an Appwrite project and set up:

- A **database** with:
  - Patient collection
  - Doctor collection
  - Appointment collection
- A **storage bucket** for identification documents
- **API key** with access to Databases, Storage, Users, and Messaging

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/docLink.git
cd docLink
```

### 2. Install dependencies

Using npm (or your preferred package manager):

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root:

```bash
PROJECT_ID=<your_appwrite_project_id>
API_KEY=<your_appwrite_api_key_with_proper_permissions>
DATABASE_ID=<your_appwrite_database_id>

PATIENT_COLLECTION_ID=<your_patient_collection_id>
DOCTOR_COLLECTION_ID=<your_doctor_collection_id>
APPOINTMENT_COLLECTION_ID=<your_appointment_collection_id>

NEXT_PUBLIC_BUCKET_ID=<your_storage_bucket_id>
NEXT_PUBLIC_ENDPOINT=<your_appwrite_endpoint>   # e.g. https://cloud.appwrite.io/v1

NEXT_PUBLIC_ADMIN_PASSKEY=<admin_passkey_for_protecting_admin_routes>
```

> **Note:** Keep these values secret and never commit `.env.local` to version control.

These map directly to `lib/appwrite.config.ts`:

- `NEXT_PUBLIC_ENDPOINT` → `ENDPOINT`
- `PROJECT_ID`
- `API_KEY`
- `DATABASE_ID`
- `PATIENT_COLLECTION_ID`
- `DOCTOR_COLLECTION_ID`
- `APPOINTMENT_COLLECTION_ID`
- `NEXT_PUBLIC_BUCKET_ID` → `BUCKET_ID`

### 4. Run the development server

```bash
npm run dev
```

The app will be available at:  
http://localhost:3000

---

## Scripts

Commonly used scripts (see `package.json`):

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server (after build)
npm run start

# Lint codebase
npm run lint
```

---

## Project Structure

High-level overview of the main folders:

```bash
.
├── app/
│   ├── admin/
│   │   └── page.tsx                 # Admin dashboard
│   └── patients/
│       └── [userId]/
│           ├── register/
│           │   └── page.tsx         # Patient registration
│           └── new-appointment/
│               ├── page.tsx         # Appointment creation
│               └── success/
│                   └── page.tsx     # Appointment success page
├── components/
│   ├── forms/                       # Patient & appointment forms
│   ├── table/                       # Data table & columns
│   └── ui/                          # Reusable UI primitives (button, dialog, etc.)
├── constants/
│   └── index.ts                     # Gender options, identification types, doctors, status icons
├── lib/
│   ├── actions/
│   │   ├── appointment.actions.ts   # CRUD + SMS notifications for appointments
│   │   └── patient.actions.ts       # User/patient creation & registration
│   ├── appwrite.config.ts           # Appwrite client & services
│   └── utils.ts                     # Utilities (formatting, helpers)
├── types/                           # Shared TypeScript types (Appwrite, domain, etc.)
├── public/                          # Static assets (logos, images, icons, GIFs)
└── ...
```

---

## Application Flows

### Patient flow

1. **User creation**  
   A user is created in Appwrite Users (`createUser`) using email/phone/name.

2. **Registration** (`/patients/[userId]/register`)  
   - Fetches existing user (`getUser`)
   - Patient fills in:
     - Personal info, contact, address
     - Emergency contact
     - Insurance details
     - Medical history & allergies
     - Identification type & document upload
   - Data is stored in the patient collection (`registerPatient`)

3. **New appointment** (`/patients/[userId]/new-appointment`)  
   - Fetches patient record (`getPatient`)
   - Patient picks:
     - Doctor (`primaryPhysician`)
     - Schedule (date + time, IST-friendly display via `formatDateTime`)
   - Appointment is saved via `createAppointment`

4. **Success page** (`/patients/[userId]/new-appointment/success`)  
   - Shows appointment summary
   - Displays doctor card (image + name)
   - Shows scheduled date/time using `formatDateTime`
   - Provides button to book another appointment

### Admin flow

1. **Dashboard** (`/admin`)
   - Loads recent appointments via `getRecentAppointmentList`
   - Aggregates counts of scheduled, pending, and cancelled
   - Renders:
     - Stat cards for high-level counts
     - Table of latest appointments

2. **Updating appointments**
   - Admin can update appointment status using `updateAppointment`
   - On schedule/cancel:
     - Sends SMS to the user via `sendSMSNotification`
     - Revalidates `/admin` so the dashboard shows fresh data

> In production, make sure you protect `/admin` with authentication or an admin passkey layer (e.g., using `NEXT_PUBLIC_ADMIN_PASSKEY` or a proper auth/role system).

---

## Styling & UX

- Tailwind CSS with utility classes and layout helpers
- Custom UI components for:
  - Buttons, dialogs, dropdowns, tables, forms, inputs, radios, checkboxes, etc.
- Consistent typography and spacing via shared classes
- Mobile-responsive layout for patient and admin screens

---

## Roadmap / Ideas

Some ideas you might consider next:

- Authentication with Appwrite sessions and role-based access
- Patient portal for viewing past & upcoming appointments
- Email notifications in addition to SMS
- Multi-clinic support (scoping by clinic/branch)
- Exportable appointment reports (CSV/PDF)

---

## Contributing

Contributions, suggestions, and bug reports are welcome.

1. Fork the repo
2. Create a feature branch
3. Commit your changes with clear messages
4. Open a pull request describing your changes

---

Copyright (c) 2025 Debojjo Talukdar
All Rights Reserved.

This software and all associated files are the intellectual property of the 
copyright holder.

Unauthorized copying, modification, distribution, or use of this software,
in whole or in part, is strictly prohibited without prior written permission 
from the owner.

For permissions, contact: talukdardebojjo26@gmail.com
