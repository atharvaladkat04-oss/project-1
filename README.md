# Guardian Way

Build a mobile-first Progressive Web App (PWA) shell for a Landslide Early Warning System (LEWS) using React, Vite, Tailwind CSS, and lucide-react icons.

Context: Designed for rural/mountainous regions (Western Ghats) with poor connectivity.

Focus: Set up the app structure, styling, navigation, and mock data foundation.

1. Layout:

- Mobile-first frame with a top emergency status banner.

- Bottom navigation bar with 5 tabs: Map, My Area, Safe Route, Report, Community.

2. Architecture & Data Foundation:

- Create a `src/types/lews.ts` defining TypeScript interfaces for: Alert, RiskZone, SensorData, CitizenReport, SavedLocation.

- Create a `src/data/mockLewsData.ts` populated with realistic dummy data for Maharashtra/Western Ghats hills. Include:

  * 3 hazard zones (Critical, Warning, Normal).

  * 3 citizen reports with geotags and status ('community', 'panchayat_verified', 'geologist_confirmed').

  * 2 evacuation shelters with coordinates.

- Create a persistent React hook `useOfflineStore` using localStorage to simulate offline data caching (saving last known location, active alerts, and offline mode toggle).

3. UX Rule to Enforce Globally:

- Multi-modal alerts: Every risk indicator must combine an Icon + Text Label + Color (e.g., Red Triangle + "CRITICAL EVACUATION"). Never rely on color alone.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/0cbc38a6-1604-4bdc-befb-d66596c74ea5).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
