# My Personal Site

[hammerle.us](https://hammerle.us/) is my personal site. It is a simple profile page with links to my work and social accounts.

![Preview of my personal site](./public/og-image.png)

## Features

- Works on web, iOS, and Android
- Light and dark mode
- Links to my GitHub, X, email, and any side projects I am working on

## Built With

- [Expo SDK 56](https://docs.expo.dev/versions/v56.0.0/)
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

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm start`       | Start the Expo development server    |
| `npm run web`     | Start the site in a browser          |
| `npm run ios`     | Start the app in the iOS Simulator   |
| `npm run android` | Start the app in an Android emulator |
| `npm run lint`    | Run Expo's ESLint configuration      |

## Production Web Build

Build the static website with:

```bash
npx expo export --platform web
```

The finished build is placed in `dist/`.

## Deployment

After this GitHub repository is connected to the EAS project, pushing to `master` runs [`.eas/workflows/deploy-web.yml`](./.eas/workflows/deploy-web.yml) and deploys the updated site to [hammerle.us](https://hammerle.us/).
