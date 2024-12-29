
# 🌐 E-Commerce Frontend (Angular)

## Overview
This repository contains the **frontend** of an E-Commerce platform built with **Angular**. It interacts seamlessly with the **ASP.NET Web API** backend to deliver a user-friendly and feature-rich experience for managing carts, processing payments, and tracking orders.  

### Note 📝
This documentation highlights **my personal contributions** to this project, showcasing the components, services, and features I implemented. The project is a team effort, and additional features or functionalities may exist in the final product.


---
## 🌟 Live Demo Video

Watch my contribution to the **project demonstration video** [here](https://drive.google.com/file/d/1N8LeN7Ragu1HMKAmmTb6Rnr_fhtFYsIf/view?usp=sharing).  

---

## Related Repositories
- **Backend Repository**: The Angular frontend interacts with the backend repository to handle all data storage, order processing, and payment logic.  
  👉 [Visit the Backend Repository](https://github.com/Nourhan123Essam/B-Tech_API-Dashboard_ITI_graduation_project)

---
## Features

### 🛒 **Cart Management**
- **Cart Component**:
  -  Displays cart items stored in the database and dynamically updates the **total price** and **item count** based on user actions.
  -  **User Authentication Check**:
    - If the user is not logged in, displays a popup with two options:
      - **Log in**: Navigate to the login page.
      - **Continue Exploring**: Navigate back to the homepage.
  -  **Empty Cart Handling**:
    - If no items are present in the cart:
      - A friendly message informs the user.
      - Includes a button to navigate to the homepage and start shopping.
  - **Functionalities**:
    -  **Delete Items**: Remove items from the cart.
    -  **Update Quantity**: Adjust item quantities and view real-time updates to the total price and item count.
    -  **Navigate to Payment**: Proceed to the payment page.

---

### 💳 **Payment Workflow**
- **Payment Component**:
  - ** Right Section**:
    - Displays a summary of cart items, including:
      -  Images
      -  Quantities
      -  Prices
  - **Left Section**:
    - Collects **delivery information** and **payment details** through a step-by-step flow:
      - Each section unlocks after completing the previous one.
  - **Payment Options**:
    -  **Cash on Delivery**: Simple order placement without online payment.
    -  **PayPal Integration**:
      - Calls the backend to handle PayPal payments.
      - **PayPal Buttons**: Displays secure PayPal buttons for payment completion.
  -  **Order Finalization**:
    - Calls the backend to confirm the payment and finalize the order.

- **City Sidebar Component**:
  -  A visually appealing sidebar for selecting cities during the delivery information phase.

---

### 📜 **Order History**
- **My Orders Component**:
  -  Displays a detailed list of the user’s past orders.
  - **Order Actions**:
    -  **Cancel Orders**: If the order hasn’t been shipped yet, users can cancel it.
    -  **View Details**: Navigate to a detailed breakdown of items in each order.
- **Order Items Component**:
  -  Displays individual items for a specific order, including quantity and price.

---

## Components and Services

### 📦 **Main Components**
1.  **Cart Component** (`cart.component.ts`)
2.  **Payment Component** (`payment.component.ts`)
3.  **PayPal Buttons Component** (`paypal-buttons.component.ts`)
4.  **City Sidebar Component** (`city-side-bar.component.ts`)
5.  **My Orders Component** (`my-orders.component.ts`)
6.  **Order Items Component** (`my-orders-items.component.ts`)

### 🔗 **Order Service**
- **OrderService** (`order.service.ts`):
  - Handles backend communication for:
    -  Fetching user cart items and orders.
    -  Updating cart details (e.g., adding, deleting, or modifying items).
    -  Initiating PayPal payments via the backend API.

---

## Routing
The application implements **Angular Routing** to ensure smooth navigation across the platform:
-  **Cart** (`cart`): View and manage cart items.
-  **Payment** (`payment/:orderId`): Enter delivery and payment details, finalize orders.
-  **Order History** (`my-orders`): View past orders with detailed breakdowns.
-  **Order Items** (`my-orders-items`): Allows users to view individual item details, such as quantity, price for a secific order.

---

## Highlights
-  **Dynamic Cart Updates**: Real-time adjustments to total amount and item count.
-  **Step-by-Step Payment Flow**: Ensures a clear and user-friendly process.
-  **PayPal Integration**: Secure and efficient payment handling.
-  **Order History with Details**: Provides users with transparency and control over their orders.

---

## Technologies Used
- **Angular**
- **TypeScript**
- **HTML/CSS** (for UI design)
- **Bootstrap** (for responsive design)
- **PayPal JavaScript SDK** (for PayPal integration)
  
---

## 📸 Screenshots

### Before logging trying to add to cart:
![Home Page Screenshot](https://github.com/Nourhan123Essam/B-Tech_public_website_ITI_graduation_project/blob/main/Demo%20Images%20of%20the%20project/not%20loggin%20add%20to%20cart.png)

### Before logging trying to see to cart:
![Home Page Screenshot](https://github.com/Nourhan123Essam/B-Tech_public_website_ITI_graduation_project/blob/main/Demo%20Images%20of%20the%20project/not%20logging%20see%20cart.png)

### Add to cart:
![Home Page Screenshot](https://github.com/Nourhan123Essam/B-Tech_public_website_ITI_graduation_project/blob/main/Demo%20Images%20of%20the%20project/add%20to%20cart.png)


### Cart:
![Home Page Screenshot](https://github.com/Nourhan123Essam/B-Tech_public_website_ITI_graduation_project/blob/main/Demo%20Images%20of%20the%20project/cart.png)

### Empty cart:
![Home Page Screenshot](https://github.com/Nourhan123Essam/B-Tech_public_website_ITI_graduation_project/blob/main/Demo%20Images%20of%20the%20project/empty%20cart.png)

### Checkout:
![Home Page Screenshot](https://github.com/Nourhan123Essam/B-Tech_public_website_ITI_graduation_project/blob/main/Demo%20Images%20of%20the%20project/payment.png)
![Home Page Screenshot](https://github.com/Nourhan123Essam/B-Tech_public_website_ITI_graduation_project/blob/main/Demo%20Images%20of%20the%20project/payment%202.png)

### Cities side bar to choose from in checkout page:
![Home Page Screenshot](https://github.com/Nourhan123Essam/B-Tech_public_website_ITI_graduation_project/blob/main/Demo%20Images%20of%20the%20project/cities%20sidebar.png)

### Complete delivery info:
![Home Page Screenshot](https://github.com/Nourhan123Essam/B-Tech_public_website_ITI_graduation_project/blob/main/Demo%20Images%20of%20the%20project/delivery%20info.png)

### Payment options:
![Home Page Screenshot](https://github.com/Nourhan123Essam/B-Tech_public_website_ITI_graduation_project/blob/main/Demo%20Images%20of%20the%20project/paypal.png)

### Data Completed:
![Home Page Screenshot](https://github.com/Nourhan123Essam/B-Tech_public_website_ITI_graduation_project/blob/main/Demo%20Images%20of%20the%20project/completing%20data.png)

### Now the place order button become active:
![Home Page Screenshot](https://github.com/Nourhan123Essam/B-Tech_public_website_ITI_graduation_project/blob/main/Demo%20Images%20of%20the%20project/active%20order.png)

### Successful payment:
![Home Page Screenshot](https://github.com/Nourhan123Essam/B-Tech_public_website_ITI_graduation_project/blob/main/Demo%20Images%20of%20the%20project/after%20place%20payment.png)

### My orders page:
![Home Page Screenshot](https://github.com/Nourhan123Essam/B-Tech_public_website_ITI_graduation_project/blob/main/Demo%20Images%20of%20the%20project/My%20orders.png)

### Order Items:
![Home Page Screenshot](https://github.com/Nourhan123Essam/B-Tech_public_website_ITI_graduation_project/blob/main/Demo%20Images%20of%20the%20project/order%20detials.png)

### No orders:
![Home Page Screenshot](https://github.com/Nourhan123Essam/B-Tech_public_website_ITI_graduation_project/blob/main/Demo%20Images%20of%20the%20project/empty%20orders.png)

### Orders in Dashboard:
![Home Page Screenshot](https://github.com/Nourhan123Essam/B-Tech_public_website_ITI_graduation_project/blob/main/Demo%20Images%20of%20the%20project/dashboard.png)

### Order details in Dashboard:
![Home Page Screenshot](https://github.com/Nourhan123Essam/B-Tech_public_website_ITI_graduation_project/blob/main/Demo%20Images%20of%20the%20project/dashboard%202.png)

### Edit status of the order:
![Home Page Screenshot](https://github.com/Nourhan123Essam/B-Tech_public_website_ITI_graduation_project/blob/main/Demo%20Images%20of%20the%20project/dashboard%203.png)


---

## 💡 How to Run

### Prerequisites
- **Node.js** and **npm** installed on your system.  
- **Angular CLI** installed globally.  
- Clone the **backend repository** and run the backend API as mentioned [here](https://github.com/Nourhan123Essam/B-Tech_API-Dashboard_ITI_graduation_project).

### Steps:
1. Clone this repository:
   ```bash
   git clone https://github.com/Nourhan123Essam/Employee-Management-System-Angular.git

2. Install dependencies:
  ```bach
    npm install
  ```
3. Update the environment.development.ts file with the API URL of your backend:
   ```bach
   export const environment = {
    API_URL: "https://localhost:7094/api/"
    };
4. Run the project:
   ```bach
   ng serve --open

## 📬 **Let's Connect**  

- [LinkedIn](https://www.linkedin.com/in/nourhan-essam123/)  
- [LeetCode](https://leetcode.com/u/norhan123/)  
- [GitHub](https://github.com/Nourhan123Essam)
- [Gmail](nourhan.essam.makhlouf@gmail.com)
