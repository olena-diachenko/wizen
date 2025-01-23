## Name

Wizen Front

## Description

This project is a frontend for relocants services support agency website in Poland.

## Installation

1. **Clone the repository:**

   - Clone with SSH:

   ```bash
   git clone git@gitlab.marsnetsolutions.com:wizen/wizen-front.git
   ```

2. **Navigate to the project directory:**
   ```bash
   cd wizen-front
   ```
3. **Install dependencies using npm:**
   ```bash
   npm install
   ```

## Usage

1. **To run the development server with live reload:**
   ```bash
   gulp develop
   ```
2. **To build the project for production, run:**

   ```bash
   gulp build
   ```

   Once the build process is complete, the optimized files will be available in the "build" directory.
   You can now deploy the contents of the build directory to your web server or hosting service.

### Features

- **Integration with Third-Party Libraries:**
  - Utilizes [Swiper](https://swiperjs.com/) for smooth carousel functionality.
  - Integrates [FancyBox](https://fancyapps.com/fancybox/) for displaying images in a lightbox.
  - Utilizes [Bootstrap](https://getbootstrap.com/) for modal dialogs.
  - Implements [International Telephone Input](https://intl-tel-input.com/) for handling international phone number inputs.
  - Utilizes [IMask](https://imask.js.org/) for input masking to enhance user experience.
