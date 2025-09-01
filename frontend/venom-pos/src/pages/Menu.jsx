import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { 
  Search, 
  Filter, 
  Star, 
  Plus, 
  Minus, 
  ShoppingCart,
  Clock,
  Tag,
  Utensils,
  Coffee,
  Pizza,
  Salad,
  IceCream,
  Wine,
  Beer,
  X,
  Check,
  AlertCircle
} from 'lucide-react';

const Menu = () => {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showOrderPanel, setShowOrderPanel] = useState(false);
  const [currentOrder, setCurrentOrder] = useState({
    table: '',
    customer: '',
    items: [],
    notes: '',
    type: 'dine-in'
  });

  // Menu categories
  const categories = [
    { id: 'all', name: 'All Items', icon: Utensils, color: 'from-blue-500 to-blue-600' },
    { id: 'burgers', name: 'Burgers', icon: Utensils, color: 'from-orange-500 to-orange-600' },
    { id: 'drinks', name: 'Drinks', icon: Coffee, color: 'from-green-500 to-green-600' },
    { id: 'sushi', name: 'Sushi', icon: Utensils, color: 'from-purple-500 to-purple-600' },
    { id: 'salads', name: 'Salads', icon: Salad, color: 'from-emerald-500 to-emerald-600' },
    { id: 'pizza', name: 'Pizza', icon: Pizza, color: 'from-red-500 to-red-600' },
    { id: 'desserts', name: 'Desserts', icon: IceCream, color: 'from-pink-500 to-pink-600' },
    { id: 'alcohol', name: 'Alcohol', icon: Wine, color: 'from-amber-500 to-amber-600' }
  ];

  // Enhanced menu items with modifiers and categories
  const menuItems = [
    {
      id: 1,
      name: 'Classic Cheeseburger',
      description: 'Juicy beef patty with cheese, lettuce, tomato, and special sauce',
      price: 12.99,
      originalPrice: 15.99,
      category: 'burgers',
      image: '🍔',
      available: true,
      popular: true,
      modifiers: [
        { name: 'Remove Onion', price: 0 },
        { name: 'Extra Cheese', price: 1.50 },
        { name: 'Bacon', price: 2.00 },
        { name: 'Side Fries', price: 3.99 }
      ],
      sizes: [
        { name: 'Regular', price: 0 },
        { name: 'Large', price: 2.00 }
      ]
    },
    {
      id: 2,
      name: 'Margherita Pizza',
      description: 'Fresh mozzarella, tomato sauce, and basil',
      price: 18.99,
      originalPrice: 22.99,
      category: 'pizza',
      image: '🍕',
      available: true,
      popular: true,
      modifiers: [
        { name: 'Extra Cheese', price: 2.00 },
        { name: 'Pepperoni', price: 3.00 },
        { name: 'Mushrooms', price: 1.50 }
      ],
      sizes: [
        { name: 'Medium (12")', price: 0 },
        { name: 'Large (16")', price: 4.00 }
      ]
    },
    {
      id: 3,
      name: 'Caesar Salad',
      description: 'Fresh romaine lettuce, parmesan cheese, croutons, and caesar dressing',
      price: 9.99,
      originalPrice: 12.99,
      category: 'salads',
      image: '🥗',
      available: true,
      popular: false,
      modifiers: [
        { name: 'Extra Dressing', price: 0.50 },
        { name: 'Grilled Chicken', price: 4.00 },
        { name: 'Shrimp', price: 5.00 }
      ]
    },
    {
      id: 4,
      name: 'Iced Latte',
      description: 'Smooth espresso with cold milk and ice',
      price: 4.99,
      originalPrice: 5.99,
      category: 'drinks',
      image: '☕',
      available: true,
      popular: true,
      modifiers: [
        { name: 'Extra Shot', price: 1.00 },
        { name: 'Vanilla Syrup', price: 0.50 },
        { name: 'Caramel Syrup', price: 0.50 },
        { name: 'Whipped Cream', price: 0.75 }
      ],
      sizes: [
        { name: 'Regular', price: 0 },
        { name: 'Large', price: 1.00 }
      ]
    },
    {
      id: 5,
      name: 'California Roll',
      description: 'Crab, avocado, and cucumber roll',
      price: 14.99,
      originalPrice: 16.99,
      category: 'sushi',
      image: '🍣',
      available: true,
      popular: true,
      modifiers: [
        { name: 'Extra Avocado', price: 1.50 },
        { name: 'Spicy Mayo', price: 0.50 },
        { name: 'Soy Sauce', price: 0 }
      ]
    },
    {
      id: 6,
      name: 'Chocolate Lava Cake',
      description: 'Warm chocolate cake with molten center, served with vanilla ice cream',
      price: 8.99,
      originalPrice: 10.99,
      category: 'desserts',
      image: '🍰',
      available: true,
      popular: true,
      modifiers: [
        { name: 'Extra Ice Cream', price: 1.50 },
        { name: 'Strawberry Sauce', price: 0.75 },
        { name: 'Whipped Cream', price: 0.50 }
      ]
    },
    {
      id: 7,
      name: 'Craft Beer Selection',
      description: 'Local craft beers on tap',
      price: 6.99,
      originalPrice: 7.99,
      category: 'alcohol',
      image: '🍺',
      available: true,
      popular: false,
      modifiers: [
        { name: 'Pint', price: 0 },
        { name: 'Half Pint', price: -1.00 }
      ]
    }
  ];

  // Special offers
  const specialOffers = [
    {
      id: 1,
      title: 'Lunch Special',
      description: '20% off all burgers and salads',
      discount: '20% OFF',
      validUntil: '2:00 PM',
      color: 'from-orange-400 to-orange-600'
    },
    {
      id: 2,
      title: 'Happy Hour',
      description: 'Buy 1 get 1 free on all drinks',
      discount: 'BOGO',
      validUntil: '7:00 PM',
      color: 'from-purple-400 to-purple-600'
    },
    {
      id: 3,
      title: 'Weekend Deal',
      description: 'Free dessert with any main course',
      discount: 'FREE',
      validUntil: 'Sunday',
      color: 'from-pink-400 to-pink-600'
    }
  ];

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToOrder = (item, selectedModifiers = [], selectedSize = null) => {
    const orderItem = {
      id: Date.now(),
      menuItem: item,
      quantity: 1,
      modifiers: selectedModifiers,
      size: selectedSize,
      notes: '',
      totalPrice: item.price + selectedModifiers.reduce((sum, mod) => sum + mod.price, 0) + (selectedSize?.price || 0)
    };

    setCurrentOrder(prev => ({
      ...prev,
      items: [...prev.items, orderItem]
    }));
  };

  const updateItemQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      setCurrentOrder(prev => ({
        ...prev,
        items: prev.items.filter(item => item.id !== itemId)
      }));
      return;
    }

    setCurrentOrder(prev => ({
      ...prev,
      items: prev.items.map(item =>
        item.id === itemId
          ? { ...item, quantity: newQuantity, totalPrice: (item.menuItem.price + item.modifiers.reduce((sum, mod) => sum + mod.price, 0) + (item.size?.price || 0)) * newQuantity }
          : item
      )
    }));
  };

  const removeFromOrder = (itemId) => {
    setCurrentOrder(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== itemId)
    }));
  };

  const getOrderTotal = () => {
    return currentOrder.items.reduce((sum, item) => sum + item.totalPrice, 0);
  };

  const getTaxAmount = () => {
    return getOrderTotal() * 0.08; // 8% tax
  };

  const getFinalTotal = () => {
    return getOrderTotal() + getTaxAmount();
  };

  const placeOrder = () => {
    if (currentOrder.table && currentOrder.items.length > 0) {
      // Here you would typically send the order to your backend
      console.log('Placing order:', currentOrder);
      
      // Reset order
      setCurrentOrder({
        table: '',
        customer: '',
        items: [],
        notes: '',
        type: 'dine-in'
      });
      
      setShowOrderPanel(false);
      
      // Show success message
      alert('Order placed successfully!');
    } else {
      alert('Please select a table and add items to the order.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Menu & Ordering</h1>
          <p className="text-gray-600">Browse menu items and place orders for your tables</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowOrderPanel(true)}
            className="relative inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
            <span>View Order</span>
            {currentOrder.items.length > 0 && (
              <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {currentOrder.items.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Special Offers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {specialOffers.map((offer) => (
          <motion.div
            key={offer.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`bg-gradient-to-r ${offer.color} rounded-xl p-4 text-white`}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold">{offer.title}</h3>
              <span className="bg-white bg-opacity-20 px-2 py-1 rounded-full text-sm font-bold">
                {offer.discount}
              </span>
            </div>
            <p className="text-sm opacity-90 mb-2">{offer.description}</p>
            <div className="flex items-center text-xs opacity-75">
              <Clock className="w-3 h-3 mr-1" />
              Valid until {offer.validUntil}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search menu items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="text-sm text-gray-500 flex items-center">
            <Filter className="w-4 h-4 mr-2" />
            {filteredItems.length} items found
          </div>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <category.icon className="w-4 h-4" />
              <span className="font-medium">{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow"
          >
            {/* Item Image */}
            <div className="h-32 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-4xl">
              {item.image}
            </div>

            {/* Item Content */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-900 text-sm">{item.name}</h3>
                {item.popular && (
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                )}
              </div>
              
              <p className="text-xs text-gray-600 mb-3 line-clamp-2">{item.description}</p>
              
              {/* Price */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-gray-900">${item.price}</span>
                  {item.originalPrice > item.price && (
                    <span className="text-sm text-gray-500 line-through">${item.originalPrice}</span>
                  )}
                </div>
                {item.originalPrice > item.price && (
                  <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
                    {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
                  </span>
                )}
              </div>

              {/* Modifiers Preview */}
              {item.modifiers && item.modifiers.length > 0 && (
                <div className="mb-3">
                  <p className="text-xs text-gray-500 mb-1">Customizable options available</p>
                  <div className="flex flex-wrap gap-1">
                    {item.modifiers.slice(0, 3).map((modifier, index) => (
                      <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {modifier.name}
                      </span>
                    ))}
                    {item.modifiers.length > 3 && (
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        +{item.modifiers.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Add to Order Button */}
              <button
                onClick={() => addToOrder(item)}
                disabled={!item.available}
                className={`w-full flex items-center justify-center space-x-2 py-2 px-4 rounded-lg font-medium transition-colors ${
                  item.available
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <Plus className="w-4 h-4" />
                <span>{item.available ? 'Add to Order' : 'Unavailable'}</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Order Panel */}
      {showOrderPanel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Current Order</h2>
              <button
                onClick={() => setShowOrderPanel(false)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-hidden flex">
              {/* Order Details */}
              <div className="flex-1 p-6 overflow-y-auto">
                <div className="space-y-4">
                  {/* Order Info */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Table</label>
                      <select
                        value={currentOrder.table}
                        onChange={(e) => setCurrentOrder(prev => ({ ...prev, table: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select Table</option>
                        {user?.assignedTables?.map(table => (
                          <option key={table} value={table}>{table}</option>
                        ))}
                        <option value="takeaway">Takeaway</option>
                        <option value="delivery">Delivery</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Customer Name</label>
                      <input
                        type="text"
                        value={currentOrder.customer}
                        onChange={(e) => setCurrentOrder(prev => ({ ...prev, customer: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter customer name"
                      />
                    </div>
                  </div>

                  {/* Order Items */}
                  {currentOrder.items.length > 0 ? (
                    <div className="space-y-3">
                      <h3 className="font-medium text-gray-900">Order Items</h3>
                      {currentOrder.items.map((item) => (
                        <div key={item.id} className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-gray-900">{item.menuItem.name}</h4>
                            <button
                              onClick={() => removeFromOrder(item.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                          
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                                className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-300"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-8 text-center font-medium">{item.quantity}</span>
                              <button
                                onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                                className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-300"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                            <span className="font-semibold text-gray-900">${item.totalPrice.toFixed(2)}</span>
                          </div>

                          {/* Modifiers */}
                          {item.modifiers.length > 0 && (
                            <div className="text-sm text-gray-600">
                              <p className="font-medium mb-1">Modifiers:</p>
                              <div className="space-y-1">
                                {item.modifiers.map((modifier, index) => (
                                  <div key={index} className="flex items-center justify-between">
                                    <span>{modifier.name}</span>
                                    <span>{modifier.price > 0 ? `+$${modifier.price.toFixed(2)}` : 'Free'}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Size */}
                          {item.size && (
                            <div className="text-sm text-gray-600">
                              <span className="font-medium">Size: </span>
                              <span>{item.size.name}</span>
                              {item.size.price > 0 && <span className="ml-1">(+${item.size.price.toFixed(2)})</span>}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                      <p>No items in order yet</p>
                      <p className="text-sm">Add items from the menu to get started</p>
                    </div>
                  )}

                  {/* Notes */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Order Notes</label>
                    <textarea
                      value={currentOrder.notes}
                      onChange={(e) => setCurrentOrder(prev => ({ ...prev, notes: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={3}
                      placeholder="Special instructions, allergies, or other notes..."
                    />
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="w-80 bg-gray-50 p-6 border-l border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>${getOrderTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax (8%)</span>
                    <span>${getTaxAmount().toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-2">
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>${getFinalTotal().toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={placeOrder}
                    disabled={!currentOrder.table || currentOrder.items.length === 0}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Place Order
                  </button>
                  
                  <button
                    onClick={() => setShowOrderPanel(false)}
                    className="w-full bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Menu;
