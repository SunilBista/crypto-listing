# Crypto Listing

A modern cryptocurrency listing application built with React, TypeScript, and Material-UI. This application provides real-time cryptocurrency data with a clean, responsive interface for tracking digital assets.

## Features

- **Real-time Crypto Data**: Display live cryptocurrency prices and market data
- **Search & Filter**: Advanced search functionality to find specific cryptocurrencies
- **Modern UI**: Clean and intuitive interface built with Material-UI components
- **Fast Performance**: Built with Vite for lightning-fast development and build times

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (version 16.0 or higher)
- npm package manager
- Git

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/SunilBista/crypto-listing.git
   cd crypto-listing
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

## Environment Setup

Create a `.env` file in the root directory of your project and add the following variables:

```env
VITE_COIN_GECKO_BASE_URL = https://api.coingecko.com/api/v3
```

### Environment Variables Explanation

- `VITE_COIN_GECKO_BASE_URL`: Base URL for the cryptocurrency API

> **Note**: All environment variables must be prefixed with `VITE_` to be accessible in the client-side code.

## Running the Application

### Development Mode

Start the development server with hot reload:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Testing

### Run All Tests

```bash
npm run test
```
