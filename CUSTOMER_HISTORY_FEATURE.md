# Customer History Feature

## Overview
This feature allows you to track and view customer history in your Laundry Management System. It provides insights into customer loyalty, spending patterns, and order history.

## Features Implemented

### 1. Customer List Table
- **Location**: Added above the order records section
- **Pagination**: Shows 5 customers per page with Prev/Next controls
- **Displays**:
  - Customer name with avatar (first letter)
  - Phone number
  - Total number of orders
  - Total amount spent
  - Last order date
  - View History button

### 2. Search Functionality
- Real-time search filter for customers
- Search by:
  - Customer name
  - Phone number
  - Address

### 3. Customer History Modal
When you click "View History" on any customer, a detailed modal opens showing:

#### Customer Statistics
- **Total Orders**: Number of orders placed by the customer
- **Total Spent**: Cumulative amount spent (in NGN)
- **First Order**: Date of the customer's first order

#### Order History List
- All orders from the customer, sorted by date (newest first)
- Each order card shows:
  - Order number
  - Status badge (Pending, In Progress, Ready, Delivered)
  - Order date
  - Total amount
  - List of items with quantities
  - "View Details" link to see full order information

## Technical Implementation

### Data Structure
Customers are identified by their name (case-insensitive). The system:
1. Groups all orders by customer name
2. Aggregates statistics (total orders, total spent)
3. Maintains complete order history per customer

### Key Functions
- `calculateCustomerData()` - Processes all orders and groups by customer
- `renderCustomerTable()` - Displays customer list with pagination (5 per page)
- `handleCustomerSearch()` - Filters customers based on search query
- `changeCustomerPage(delta)` - Navigate between customer pages
- `updateCustomerPaginationButtons()` - Updates pagination button states
- `openCustomerHistory(customerName)` - Opens detailed history modal
- `updateCustomerTable()` - Refreshes customer data when orders change

### Real-time Updates
The customer table automatically updates when:
- New orders are added
- Orders are edited or deleted
- Data syncs from Firebase

## Usage

### Viewing Customer List
1. Scroll to the "Customer History" section on the dashboard
2. Browse the list of customers sorted by total spending (highest first)
3. Use pagination controls (Prev/Next) to navigate through pages (5 customers per page)
4. Use the search box to find specific customers

### Viewing Customer Details
1. Click the "View History" button next to any customer
2. Review their statistics and complete order history
3. Click on "View Details" for any order to see full order information
4. Close the modal when done

### Search Tips
- Search is case-insensitive
- Matches partial text in name, phone, or address
- Results update in real-time as you type
- Pagination resets to page 1 when you search
- Shows "Showing X to Y of Z" to indicate current view

## Benefits

1. **Customer Loyalty Tracking**: Identify your best customers by spending
2. **Quick Access**: Find customer information and order history instantly
3. **Better Service**: Reference past orders when customers call
4. **Business Insights**: Understand customer behavior and patterns
5. **Personalized Service**: Know customer preferences based on order history

## Future Enhancements (Suggestions)

- Add loyalty badges (Gold, Silver, Bronze) based on spending
- Show average order value per customer
- Track customer retention rate
- Add customer notes/preferences
- Export customer data to CSV
- Send promotional offers to top customers
- Show trending items per customer
- Add customer lifetime value calculations

## Notes

- Customers are identified by name (case-insensitive matching)
- If a customer's phone or address changes between orders, the most recent non-empty value is used
- The feature works seamlessly with your existing Firebase Firestore data
- No database schema changes required - it analyzes existing order data
