# E-Commerce Website (EliteFinds)

## Introduction

- E-Commerce Website is a modern web application built with React and Next.js, designed to provide a seamless and interactive shopping experience. It features a responsive design, image carousels, and a skeleton loading state to enhance user engagement and improve loading times during data fetching.

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

### Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Next.js**: A React framework for server-side rendering and static site generation.
- **Tailwind CSS**: A utility-first CSS framework for creating custom designs.
- **React Slick**: A carousel component for displaying images in a slider format.
- **Slick Carousel**: Provides carousel functionality in React.
- **Next.js Link**: For client-side navigation within the application.
- **API**: [Next E-Commerce API](https://next-ecommerce-api.vercel.app/products)

### Usage Examples

- **Viewing Products**: When you visit the application, you will see a grid of product cards, each displaying an image, title, and price. Use the image carousel to view multiple images of a product.
- **Searching Products**: Enter a title or part of a title in the search bar to filter the displayed products.
- **Filtering Products**: Select a category from the dropdown to filter the product listing accordingly.
- **Sorting Products**: Choose to sort products by price in ascending or descending order.
- **Sorting Products (Reviews in Detail product page)**: Choose to sort reviews by date or by ratings.
- **Skeleton Loading State**: While product data is being fetched, skeleton loaders will display placeholder content to inform users that data is being loaded.
- **Navigation**: Use the navigation bar at the top of the page to access different sections of the site, including Products, About, and Contact. (no pages at the moment, still in progress)
- **Responsive Design**: The application adjusts its layout based on screen size, ensuring a smooth experience on both desktop and mobile devices.

![Screenshot](/public/images/Screenshot1.png)

![Screenshot](/public/images/Screenshot2.png)

![Screenshot](/public/images/Screenshot3.png)
![Screenshot](/public/images/Screenshot4.png)
![Screenshot](/public/images/Screenshot5.png)

### Installation

To set up the project locally, follow these steps:

- ### **Prerequisites**

  - Node.js (version 14.x or higher)
  - npm (version 6.x or higher) or yarn (version 1.22.x or higher)

- ### **Steps**
  - Clone the Repository
    - **git clone** https://github.com/OmphileMorwane/OMPMOR404_jse2407_Group-b_Omphile-Morwane_FSJ02.git
  - Navigate into the Project Directory
  - **Install Dependencies**
    - npm install
  - **Start the Development Server**
    - npm run dev
  - Then click on the given link to Open Your Browser
