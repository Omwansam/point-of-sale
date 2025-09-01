# 🍽️ Venom POS - Restaurant Management System

A complete, world-class Restaurant POS (Point of Sale) system built with React, Tailwind CSS, and Framer Motion.

## ✨ Features

### 🔐 Authentication & Role Management
- **Admin**: Full access to all features, analytics, and staff management
- **Cashier**: Order taking, billing, refunds, and receipt printing
- **Kitchen Staff**: Order queue management with real-time status updates
- **Inventory Manager**: Stock tracking, supplier management, and alerts

### 🛒 Core POS Features
- **Order Management**: Create, update, cancel, split bills, table assignment
- **Menu Management**: Categories, item search, modifiers, pricing, and availability
- **Real-time Kitchen Queue**: Order status tracking (pending, in-progress, ready)
- **Payment Integration**: Support for cash, card, and mobile payments
- **Inventory Tracking**: Stock levels, expiry dates, supplier database

### 📊 Analytics & Reporting
- **Sales Dashboard**: Real-time metrics and performance insights
- **Order Analytics**: Top items, category performance, growth trends
- **Employee Management**: Staff roles, permissions, and activity logs
- **Export Capabilities**: PDF, Excel, and CSV report generation

### 🎨 Modern UI/UX
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Smooth Animations**: Framer Motion powered micro-interactions
- **Professional Layout**: Inspired by global restaurant brands
- **Dark/Light Themes**: Beautiful color schemes with brand accents

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd venom-pos
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🔑 Demo Credentials

### Admin Access
- **Email**: admin@restaurant.com
- **Password**: admin123

### Cashier Access
- **Email**: cashier@restaurant.com
- **Password**: cashier123

### Kitchen Staff Access
- **Email**: kitchen@restaurant.com
- **Password**: kitchen123

### Inventory Manager Access
- **Email**: inventory@restaurant.com
- **Password**: inventory123

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   └── Layout.jsx      # Main layout with sidebar navigation
├── contexts/           # React contexts for state management
│   └── AuthContext.jsx # Authentication and user management
├── pages/              # Main application pages
│   ├── Login.jsx       # Authentication page
│   ├── Dashboard.jsx   # Role-based dashboard
│   ├── Orders.jsx      # POS order management
│   ├── Menu.jsx        # Menu item management
│   ├── Inventory.jsx   # Stock and supplier management
│   ├── Analytics.jsx   # Business insights and reports
│   ├── Employees.jsx   # Staff management
│   └── Kitchen.jsx     # Kitchen order queue
├── App.jsx             # Main application component
└── main.jsx            # Application entry point
```

## 🎯 Key Components

### Dashboard
- Role-based content and statistics
- Real-time order updates
- Quick action buttons
- Performance metrics

### Orders Management
- Intuitive order creation interface
- Menu browsing with categories
- Real-time order status updates
- Payment method selection
- Table assignment and takeaway options

### Kitchen Dashboard
- Kanban-style order queues
- Priority-based sorting
- Time tracking and alerts
- Order details and notes
- Status management workflow

### Inventory System
- Stock level monitoring
- Low stock alerts
- Supplier management
- Expiry date tracking
- Cost and profit calculations

## 🎨 Design System

### Colors
- **Primary**: Blue (#2563eb)
- **Success**: Green (#16a34a)
- **Warning**: Yellow (#ca8a04)
- **Error**: Red (#dc2626)
- **Neutral**: Gray scale

### Typography
- **Headings**: Inter, bold weights
- **Body**: Inter, regular weights
- **Monospace**: For numbers and codes

### Components
- **Cards**: Rounded corners, subtle shadows
- **Buttons**: Multiple variants with hover states
- **Forms**: Clean inputs with validation
- **Tables**: Responsive with hover effects

## 🔧 Customization

### Adding New Menu Items
1. Navigate to Menu Management
2. Click "Add Menu Item"
3. Fill in details (name, price, category, cost)
4. Set availability status

### Managing Inventory
1. Go to Inventory Management
2. Add new items with quantities and costs
3. Set minimum stock levels
4. Configure suppliers and expiry dates

### Employee Management
1. Access Employees page (Admin only)
2. Add new staff members
3. Assign roles and permissions
4. Manage active/inactive status

## 📱 Responsive Design

The system is fully responsive and optimized for:
- **Desktop**: Full-featured POS terminal experience
- **Tablet**: Touch-friendly interface for waitstaff
- **Mobile**: Essential functions for managers on-the-go

## 🚀 Future Enhancements

### Planned Features
- **Payment Integration**: Stripe and M-Pesa APIs
- **Multi-branch Support**: Centralized management
- **Advanced Analytics**: Machine learning insights
- **Mobile App**: Native iOS and Android apps
- **API Integration**: Third-party delivery platforms

### Technical Improvements
- **Real-time Updates**: WebSocket integration
- **Offline Support**: Service worker implementation
- **Performance**: Code splitting and lazy loading
- **Testing**: Comprehensive test coverage

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**Built with ❤️ for modern restaurants worldwide**
