
---

### 2. **Frontend Repository README (Angular)**

This README will explain the frontend components you created, their purpose, and how to run the application.

---

# E-Commerce Frontend (Angular)

## Overview
This repository contains the frontend for an E-Commerce platform built with **Angular**. The frontend integrates with an **ASP.NET Web API** backend to provide users with a seamless experience for managing orders, viewing cart items, making payments, and more.

## Features
### Cart and Payment Flow
- **Cart Component**:
   - Displays items in the cart and allows users to update quantities or delete items.
   - If the user is not logged in, a popup is shown with options to either log in or continue exploring.
   - If the cart is empty, users are informed and can navigate back to the home page.
   
- **Payment Component**:
   - Displays a summary of the items in the cart, including their images, quantities, and prices.
   - Allows users to provide delivery information and choose a payment method.
   - **Cash on Delivery**: Allows users to place an order without online payment.
   - **PayPal**: Integrates with the backend to handle PayPal payments.

- **PayPal Buttons**:
   - Displays PayPal payment buttons and handles the integration for finalizing payments.

- **City Sidebar Component**:
   - A dynamic sidebar for selecting a city during the delivery info phase.

- **My Orders Component**:
   - Allows users to view their past orders, with options to cancel orders (if not shipped yet) and view order details.

### Components
- **Cart Component** (`cart.component.ts`)
- **Payment Component** (`payment.component.ts`)
- **PayPal Buttons Component** (`paypal-buttons.component.ts`)
- **City Sidebar Component** (`city-side-bar.component.ts`)
- **My Orders Component** (`my-orders.component.ts`)
- **Order Items Component** (`my-orders-items.component.ts`)

### Routing
The app includes routing to manage navigation between pages such as the cart, payment page, and order history.

### Order Service
- **OrderService**: This service handles communication with the backend API to fetch orders, update cart items, and process payments via PayPal.

---

## 🌟 Live Demo Video

Watch my contribution to the **project demonstration video** [here](https://drive.google.com/file/d/1N8LeN7Ragu1HMKAmmTb6Rnr_fhtFYsIf/view?usp=sharing).  

---

## Technologies Used
- **Angular**
- **TypeScript**
- **HTML/CSS** (for UI design)
- **Bootstrap** (for responsive design)
- **PayPal JavaScript SDK** (for PayPal integration)
  
---

## 💡 How to Run

### Prerequisites
- **Node.js** and **npm** installed on your system.  
- **Angular CLI** installed globally.  
- Clone the **backend repository** and run the backend API as mentioned [here](https://github.com/Nourhan123Essam/Employee-Management-System-API-ASP.Net).

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
