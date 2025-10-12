<a id="readme-top"></a>

[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![project_license][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<br />
<div align="center">
<h3 align="center">EGG Predict AI</h3>

  <p align="center">
    A mobile healthcare application for remote neurological patient monitoring, connecting epilepsy and Alzheimer's patients with their doctors for real-time symptom tracking, medication management, and seamless communication.
    <br />
    <a href="https://github.com/elfatairy/EGG-Predict-AI/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    &middot;
    <a href="https://github.com/elfatairy/EGG-Predict-AI/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#built-with">Built With</a></li>
    <li><a href="#installation">Installation</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

### Built With

- [![React][React.js]][React-url]
- [![Expo][Expo]][Expo-url]
- [![Stream Chat][Stream-Chat]][Stream-Chat-url]

## Features

### For Patients
- **Daily Health Reports**: Submit condition-specific questionnaires for epilepsy or Alzheimer's tracking
- **Medication Management**: View prescriptions and track medication adherence
- **Real-Time Chat**: Instant messaging with assigned doctors
- **Patient Groups**: Community support and peer interaction
- **Location Tracking**: Share location data for emergency situations

### For Doctors
- **Patient Dashboard**: View and manage all assigned patients
- **Report Monitoring**: Access patient daily reports and health trends
- **Real-Time Communication**: Chat with patients and receive report notifications
- **Patient Search**: Find and filter patients by condition type

### Technical Features
- **Firebase Authentication & Firestore**: Secure data storage and real-time sync
- **Stream Chat Integration**: Professional messaging infrastructure
- **Expo Notifications**: Push notifications for alerts
- **TypeScript & Modern UI**: Type-safe code with React Native Paper components

<!-- Installation -->

## Installation

### Prerequisites
- Node.js >= 18
- npm or yarn
- Expo Go app on your mobile device
- Stream Chat account (sign up at [getstream.io](https://getstream.io))

### Setup

1. Clone the repo
   ```sh
   git clone https://github.com/elfatairy/containment.git
   cd containment
   ```

2. Install dependencies
   ```sh
   npm install
   ```

3. Configure Stream Chat
   
   Create a `streamConfig.js` file in the root directory:
   ```javascript
   export const STREAM_API_KEY = 'your_stream_api_key';
   export const STREAM_APP_ID = 'your_stream_app_id';
   ```
   
   Or create a `.env` file:
   ```env
   STREAM_API_KEY=your_stream_api_key
   STREAM_APP_ID=your_stream_app_id
   ```

4. Start the Expo development server
   ```sh
   npx expo start
   ```

5. Run the app
   - Scan the QR code with **Expo Go** (Android) or **Camera** app (iOS)
   - Press `a` for Android emulator
   - Press `i` for iOS simulator (macOS only)
   - Press `w` to run in web browser

## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->

## Contact

Omar Hassan - [@omar_elfat76510](https://x.com/omar_elfat76510) - elfatairy@omarhassan.net

Project Link: [https://github.com/elfatairy/EGG-Predict-AI](https://github.com/elfatairy/EGG-Predict-AI)

EGG-Predict-AI: [https://omarhassan.net](https://omarhassan.net)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/elfatairy/EGG-Predict-AI.svg?style=for-the-badge
[contributors-url]: https://github.com/elfatairy/EGG-Predict-AI/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/elfatairy/EGG-Predict-AI.svg?style=for-the-badge
[forks-url]: https://github.com/elfatairy/EGG-Predict-AI/network/members
[stars-shield]: https://img.shields.io/github/stars/elfatairy/EGG-Predict-AI.svg?style=for-the-badge
[stars-url]: https://github.com/elfatairy/EGG-Predict-AI/stargazers
[issues-shield]: https://img.shields.io/github/issues/elfatairy/EGG-Predict-AI.svg?style=for-the-badge
[issues-url]: https://github.com/elfatairy/EGG-Predict-AI/issues
[license-shield]: https://img.shields.io/github/license/elfatairy/EGG-Predict-AI.svg?style=for-the-badge
[license-url]: https://github.com/elfatairy/EGG-Predict-AI/blob/main/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/omar-hassan-81888320b/
[HTML5]: https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white
[HTML5-url]: https://developer.mozilla.org/en-US/docs/Web/HTML
[CSS3]: https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white
[CSS3-url]: https://developer.mozilla.org/en-US/docs/Web/CSS
[JavaScript]: https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black
[JavaScript-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript
[Python]: https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white
[Python-url]: https://www.python.org/
[Pydub]: https://img.shields.io/badge/Pydub-FF6600?style=for-the-badge&logo=python&logoColor=white
[Pydub-url]: https://github.com/jiaaro/pydub
[Expo]: https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white
[Expo-url]: https://expo.dev/
[React-Native]: https://img.shields.io/badge/React%20Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-Native-url]: https://reactnative.dev/
[Formik]: https://img.shields.io/badge/Formik-172B4D?style=for-the-badge&logo=formik&logoColor=white
[Formik-url]: https://formik.org/
[Yup]: https://img.shields.io/badge/Yup-2D3748?style=for-the-badge&logo=yup&logoColor=white
[Yup-url]: https://github.com/jquense/yup
[Arduino]: https://img.shields.io/badge/Arduino-00979D?style=for-the-badge&logo=arduino&logoColor=white
[Arduino-url]: https://www.arduino.cc/
[Node.js]: https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white
[Node-url]: https://nodejs.org/
[react-i18next]: https://img.shields.io/badge/react--i18next-26A69A?style=for-the-badge&logo=i18next&logoColor=white
[react-i18next-url]: https://react.i18next.com/
[Stream-Chat]: https://img.shields.io/badge/Stream%20Chat-005FFF?style=for-the-badge&logo=stream&logoColor=white
[Stream-Chat-url]: https://getstream.io/chat/
[ESP32]: https://img.shields.io/badge/ESP32-000000?style=for-the-badge&logo=espressif&logoColor=white
[ESP32-url]: https://www.espressif.com/en/products/socs/esp32
[Express.js]: https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white
[Express-url]: https://expressjs.com/
[Firebase]: https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black
[Firebase-url]: https://firebase.google.com/
[React-Router]: https://img.shields.io/badge/React%20Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white
[React-Router-url]: https://reactrouter.com/
[Three.js]: https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white
[Three-url]: https://threejs.org/
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Typescript.js]: https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=D9E8F5
[Typescript-url]: https://www.typescriptlang.org
[Supabase]: https://img.shields.io/badge/Supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=ffffff
[Supabase-url]: https://supabase.com
[Tailwind]: https://img.shields.io/badge/Tailwind-3178C6?style=for-the-badge&logo=tailwindcss&logoColor=ffffff
[Tailwind-url]: https://tailwindcss.com
[Flutter]: https://img.shields.io/badge/Flutter-02569B?style=for-the-badge&logo=flutter&logoColor=white
[Flutter-url]: https://flutter.dev/
[Dart]: https://img.shields.io/badge/Dart-0175C2?style=for-the-badge&logo=dart&logoColor=white
[Dart-url]: https://dart.dev/
[C++]: https://img.shields.io/badge/C++-00599C?style=for-the-badge&logo=cplusplus&logoColor=white
[C++-url]: https://isocpp.org/
[Qt]: https://img.shields.io/badge/Qt-41CD52?style=for-the-badge&logo=qt&logoColor=white
[Qt-url]: https://www.qt.io/
[Motion.dev]: https://img.shields.io/badge/Motion-000000?style=for-the-badge&logo=framer&logoColor=white
[Motion-url]: https://motion.dev/
[i18next]: https://img.shields.io/badge/i18next-26A69A?style=for-the-badge&logo=i18next&logoColor=white
[i18next-url]: https://www.i18next.com/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com
