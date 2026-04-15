# PPT-Events: Content Management System Guide

Welcome to the new **Payload CMS v3** integration for the PPT-Events platform! This guide will walk you through accessing the admin panel, managing your events, and understanding how the SQLite database operates.

---

## 1. Navigating the CMS
Payload CMS is fully embedded into your Next.js application, meaning there is no separate app to deploy or maintain.

**To Access the Dashboard**:
1. Ensure your local server is running (`npm run dev`).
2. Go to **[http://localhost:3000/admin](http://localhost:3000/admin)** in your browser.
3. If this is your first time, the CMS will prompt you to create the **First User**. This user automatically becomes an Administrator.
4. Input your email and a secure password to log in.

> [!TIP]
> If you deploy the site to production (like Vercel or a VPS), the admin panel will live at `your-domain.com/admin` using the exact same structure!

---

## 2. Managing Events
The homepage and the `/veranstaltungen` listings pull directly from the database. 

### Adding a New Event
1. Click on **Events** on the left-hand sidebar inside the Admin interface.
2. Click **Create New** (top right corner).
3. Fill out the necessary fields:
   - **Title**: The main event heading.
   - **Start & End Date**: Ensure accuracy, as these power the dynamic calendar thumbnails (e.g. *14 NOV*).
   - **Location & Speaker**: Used for the filtering mechanism on the `/veranstaltungen` page.
   - **Image**: Upload a cover photo for the event thumbnail.
4. **Publishing**: 
   - Ensure you toggle the `Status` field on the right sidebar to **Published**.
   - Draft events are purposefully hidden from the frontend!

---

## 3. How the SQLite Database Works
Unlike heavy database systems like PostgreSQL or MongoDB that require Docker or external hosting configurations, we configured your project to use **SQLite** via `@payloadcms/db-sqlite`.

### What does this mean?
- **Zero Configuration**: There is no database server to maintain.
- **Portability**: Your entire database structure, users, and content are saved dynamically into a single file located at the root of your project: `payload.db`
- **Data Protection**: Make sure you **do not accidentally delete** the `payload.db` file, as it contains all website content. It is automatically excluded from `.gitignore` so your actual production host generates its own secure instance when deployed. 

> [!WARNING]
> If you delete `payload.db`, your CMS resets exactly as if it was brand new, and you will be asked to create the admin account again.

### Backing Up Data
If you want to manually back up your CMS, simply copy and paste `payload.db` to a safe location.

---

## 4. Need to Filter Events?
The `/veranstaltungen` subpage automatically recognizes the attributes you type into the CMS. For instance, if you add an event located in *"Hamburg"*, the filter dropdown on the frontend automatically adds *"Hamburg"* to the options. Everything is powered by the Payload Local API instantaneously.
