# E-Commerce Website (EliteFinds)

## Introduction

EliteFinds is a modern e-commerce web application built with React and Next.js, designed to provide a seamless and interactive shopping experience. It features a responsive design, image carousels, and a skeleton loading state to enhance user engagement and improve loading times during data fetching.

### Features

- **Product Listing**: Displays a grid of products with images, titles, and prices.
- **Image Carousel**: Showcases product images in a slider format.
- **Responsive Design**: Adapts to various screen sizes for a mobile-friendly experience.
- **Skeleton Loading**: Provides placeholder content while product data is being fetched.
- **Search Functionality**: Users can search for products by entering a title or part of a title in a search bar.
- **Category Filtering**: Users can filter products by categories.
- **Sorting Options**: Users can sort products by price in ascending or descending order.
- **URL State Reflection**: The URL reflects the current search, filter, and sort options for easy sharing or bookmarking.
- **Pagination**: The application paginates filtered and sorted results if they exceed 20 products.
- **Persistent State**: Applied filtering, sorting, and searching are retained when navigating to a detailed product view and returning.
- **Reset Functionality**: Users can reset filtering, sorting, and searching at once to display the default loaded products.
- **Review Sorting**: Users can sort reviews by date and rating on the product detail page.
- **SEO Optimization**: Dynamic meta tags for improved SEO, including generating dynamic meta data for individual products.
- **Image Optimization**: Utilizes Next.js built-in features for optimizing images and media, improving page load speed.
- **Server Component Caching**: Fetches data in server components using caching strategies to reduce redundant requests and speed up load times.
- **Firebase Integration**: Configure environment variables for Firebase in the Vercel project settings.
- **Continuous Deployment**: Set up Vercel to automatically deploy the Next.js app from the Git repository and implement continuous deployment for automatic updates.
- **Custom Domain and Favicon**: Customize the application's domain (URL) and favicon.
- **Firebase Setup**: Set up a Firebase project in the Firebase Console, initialize Firestore, create Firestore collections/documents for product data, and upload product data.
- **Data Verification**: Verify successful data uploads to Firestore through the Firebase Console.
- **API Endpoints**: Create API endpoints in Next.js to fetch product data and categories from Firebase, and implement search, filter, and sort functionalities for the product API endpoint.
- **Authentication**: Configure Firebase Authentication for user sign-up, sign-in, and sign-out functionalities, managing and displaying the authentication state on the frontend while securing API routes.

### Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Next.js**: A React framework for server-side rendering and static site generation.
- **Tailwind CSS**: A utility-first CSS framework for creating custom designs.
- **React Slick**: A carousel component for displaying images in a slider format.
- **Slick Carousel**: Provides carousel functionality in React.
- **Next.js Link**: For client-side navigation within the application.
- **Firebase**: For backend services, including Firestore for data storage and Firebase Authentication for user management.
- **Vercel**: For deployment and continuous integration, enabling automatic updates from the Git repository.
- **API**: [EliteFinds API](https://localhost3000/app/products)

### Usage Examples

- **Viewing Products**: When you visit the application, you will see a grid of product cards, each displaying an image, title, and price. Use the image carousel to view multiple images of a product.

![Screenshot](/public/images/Screenshot2.png)


- **Searching Products**: Enter a title or part of a title in the search bar to filter the displayed products.
![Screenshot](/public/images/Screenshot1.png)

- **Filtering Products**: Select a category from the dropdown to filter the product listing accordingly.

![Screenshot](/public/images/Screenshot3.png)

- **Sorting Products**: Choose to sort products by price in ascending or descending order.
- **Sorting Reviews**: On the product detail page, you can sort reviews by date or by ratings.
- **Skeleton Loading State**: While product data is being fetched, skeleton loaders will display placeholder content to inform users that data is being loaded.
- **API Interaction**: The application fetches product data from Firebase through defined API endpoints, allowing for efficient search, filter, and sort operations.
- **Authentication Flow**: Users can sign up, sign in, and sign out using Firebase Authentication, with their authentication state managed throughout the app. Secure API routes ensure that only authenticated users can access certain features.

![Screenshot](/public/images/Screenshot5.png)

- **Navigation**: Use the navigation bar at the top of the page to access different sections of the site, including Products, About, and Contact. (No pages at the moment, still in progress)
- **Responsive Design**: The application adjusts its layout based on screen size, ensuring a smooth experience on both desktop and mobile devices.

- **Pagination**: Click on NextPage/PrevPage to paginate through the pages
![Screenshot](/public/images/Screenshot4.png)

### Installation

To set up the project locally, follow these steps:

#### **Prerequisites**

- Node.js (version 14.x or higher)
- npm (version 6.x or higher) or yarn (version 1.22.x or higher)

#### **Steps**

1. Clone the Repository
   ```bash
   git clone [https://github.com/OmphileMorwane/EliteFinds.git](https://github.com/OmphileMorwane/EliteFinds.git)

2. Vercel deployment: [EliteFinds](https://elite-finds-e1gu4qhlo-omphilemorwanes-projects.vercel.app/)
