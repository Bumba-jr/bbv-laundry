# Customer History Pagination Guide

## Overview
The customer history table now displays customers in pages of 5 at a time, making it easier to browse through large customer lists.

## Features

### Pagination Controls
Located at the bottom of the Customer History table:

- **"Showing X to Y of Z"**: Displays the current range of visible customers
- **"Page X of Y"**: Shows current page number and total pages
- **Prev Button**: Go to previous page (disabled on first page)
- **Next Button**: Go to next page (disabled on last page)

### How It Works

1. **Initial Load**: First 5 customers are shown (sorted by total spending)
2. **Navigation**: Click "Next" to see customers 6-10, "Prev" to go back
3. **Search Integration**: When you search, pagination resets to page 1
4. **Automatic Calculation**: Total pages are calculated based on number of customers

### Example Scenarios

#### Scenario 1: 12 Customers Total
- Page 1: Customers 1-5
- Page 2: Customers 6-10
- Page 3: Customers 11-12

#### Scenario 2: Searching with 8 Results
- Search results show first 5 customers
- Click "Next" to see remaining 3 customers

#### Scenario 3: Less than 5 Customers
- All customers shown on single page
- Pagination controls show "Page 1 of 1"
- Both Prev and Next buttons are disabled

## Technical Details

### Configuration
- **Customers per page**: 5 (defined in `customersPerPage` constant)
- **Current page**: Tracked in `currentCustomerPage` variable
- **Reset behavior**: Search resets to page 1

### Key Functions
```javascript
changeCustomerPage(delta)          // Navigate pages (+1 or -1)
updateCustomerPaginationButtons()  // Enable/disable buttons
renderCustomerTable()              // Renders current page only
```

### Button States
- Buttons are disabled when:
  - "Prev" on first page (currentPage <= 1)
  - "Next" on last page (currentPage >= totalPages)
- Visual indicator: opacity reduced, cursor shows "not-allowed"

## User Experience

### Benefits
✅ Faster page load with many customers  
✅ Easier to scan through customer list  
✅ Clear indication of position (X of Y)  
✅ Smooth navigation with disabled state feedback  

### Best Practices
- Use search to quickly find specific customers
- Pagination info shows exactly how many customers match your filter
- Page number helps you track your position in large lists

## Customization

To change the number of customers per page, modify this line in the code:
```javascript
const customersPerPage = 5;  // Change this number
```

Common alternatives:
- `10` - Standard for many applications
- `20` - For faster browsing with more screen space
- `25` - Maximum before scrolling becomes an issue

## Notes

- Pagination persists while searching (filtered results are paginated)
- Total customer count includes all matches, not just current page
- Disabled buttons have reduced opacity and cannot be clicked
- Page resets to 1 whenever search query changes
