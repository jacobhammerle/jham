# My Personal Site

[hammerle.us](https://hammerle.us/) is my personal site. It is a simple profile page with links to my work and social accounts.

## Features

- Works on web, iOS, and Android
- Light and dark mode
- Links to my GitHub, X, email, and any side projects I am working on

## Built With

- [Expo SDK 58](https://docs.expo.dev/versions/v58.0.0/)
- [Expo Router](https://docs.expo.dev/router/introduction/)
- [NativeWind](https://www.nativewind.dev/)
- TypeScript

## Run Locally

Use Node.js `22.13.x` or newer. Then install dependencies and run the site:

```bash
npm install
npm run web
```

## Scripts

| Command             | Description                          |
| ------------------- | ------------------------------------ |
| `npm start`         | Start the Expo development server    |
| `npm run web`       | Start the site in a browser          |
| `npm run ios`       | Start the app in the iOS Simulator   |
| `npm run android`   | Start the app in an Android emulator |
| `npm run lint`      | Run Expo's ESLint configuration      |
| `npm run typecheck` | Check TypeScript types               |
| `npm run build:web` | Export the production website        |

## Production Web Build

Build the static website with:

```bash
npm run build:web
```

The finished build is placed in `dist/`.

The portrait uses `public/jacob-hammerle-avatar.jpg` on every platform, a 336 × 336 image sized for the largest avatar at 3× pixel density. The full-size original remains in `assets/images/headshot.jpg`. Responsive spacing, typography, and image sizes are defined together in `src/components/profile-layout.ts`.

Web icons are inline SVGs, so the page does not need icon font downloads. They are from Font Awesome Free 6.7.2 ([license and attribution](./public/fontawesome-license.txt)); native platforms use `@expo/vector-icons`.

## Deployment

After this GitHub repository is connected to the EAS project, pushing site code, assets, or build configuration changes to `master` runs [`.eas/workflows/deploy-web.yml`](./.eas/workflows/deploy-web.yml) and deploys the updated site to [hammerle.us](https://hammerle.us/).
