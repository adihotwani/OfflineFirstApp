# Offline-First CRUD App with RxDB and CouchDB

This React Native application demonstrates offline-first functionality with RxDB and CouchDB replication.

## Features

- Create, Read businesses and articles
- Offline-first functionality
- Automatic sync with CouchDB when online
- SQLite local storage

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up CouchDB:
   - Install CouchDB
   - Create databases: `businesses` and `articles`
   - Update sync URL in `src/database.js`
4. Run the app:
   - iOS: `npx react-native run-ios`
   - Android: `npx react-native run-android`

## Configuration

The app is configured to:
- Use SQLite for local storage
- Sync with CouchDB when online
- Handle all CRUD operations offline
- Automatically resolve conflicts during sync

## Testing Offline Functionality

1. Turn off your device's internet connection
2. Perform CRUD operations
3. Turn internet back on
4. Observe data sync with CouchDB
