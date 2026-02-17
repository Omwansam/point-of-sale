import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Filter, 
  Clock, 
  CheckCircle, 
  X,
  Phone,
  CreditCard,
  DollarSign,
  Table,
  Truck,
  Home,
  Trash2,
  Edit,
  Eye
} from 'lucide-react';

const Orders = () => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      customer: 'John Doe',
      phone: '+1234567890',
      table: 'Table 5',
      type: 'dine-in',
      items: [
        { name: 'Chicken Burger', quantity: 2, price: 12.99, total: 25.98 },
        { name: 'French Fries', quantity: 1, price: 4.99, total: 4.99 },
        { name: 'Coca Cola', quantity: 2, price: 2.99, total: 5.98 }
      ],
      total: 36.95,
      status: 'pending',
      time: '2 min ago',
      paymentMethod: 'pending'
    },
    {
      id: 2,
      customer: 'Jane Smith',
      phone: '+1234567891',
      table: 'Takeaway',
      type: 'takeaway',
      items: [
        { name: 'Pizza Margherita', quantity: 1, price: 18.99, total: 18.99 },
        { name: 'Caesar Salad', quantity: 1, price: 8.99, total: 8.99 }
      ],
      total: 27.98,
      status: 'completed',
      time: '15 min ago',
      paymentMethod: 'card'
    },
    {
      id: 3,
      customer: 'Mike Johnson',
      phone: '+1234567892',
      table: 'Table 3',
      type: 'dine-in',
      items: [
        { name: 'Steak', quantity: 1, price: 24.99, total: 24.99 },
        { name: 'Mashed Potatoes', quantity: 1, price: 6.99, total: 6.99 },
        { name: 'Red Wine', quantity: 1, price: 12.99, total: 12.99 }
      ],
      total: 44.97,
      status: 'in-progress',
      time: '8 min ago',
      paymentMethod: 'pending'
    }
  ]);

  const [showNewOrderModal, setShowNewOrderModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const menuItems = [
    { id: 1, name: 'Chicken Burger', price: 12.99, category: 'Main Course', available: true },
    { id: 2, name: 'Pizza Margherita', price: 18.99, category: 'Main Course', available: true },
    { id: 3, name: 'Steak', price: 24.99, category: 'Main Course', available: true },
    { id: 4, name: 'Caesar Salad', price: 8.99, category: 'Appetizer', available: true },
    { id: 5, name: 'French Fries', price: 4.99, category: 'Side', available: true },
    { id: 6, name: 'Coca Cola', price: 2.99, category: 'Beverage', available: true },
    { id: 7, name: 'Red Wine', price: 12.99, category: 'Beverage', available: true },
    { id: 8, name: 'Mashed Potatoes', price: 6.99, category: 'Side', available: true }
  ];

  const [newOrder, setNewOrder] = useState({
    customer: '',
    phone: '',
    table: '',
    type: 'dine-in',
    items: []
  });

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.table.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesType = typeFilter === 'all' || order.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      'in-progress': 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getTypeIcon = (type) => {
    const icons = {
      'dine-in': Table,
      'takeaway': Truck,
      'delivery': Home
    };
    return icons[type] || Table;
  };

  const addItemToOrder = (item) => {
    const existingItem = newOrder.items.find(orderItem => orderItem.id === item.id);
    if (existingItem) {
      setNewOrder(prev => ({
        ...prev,
        items: prev.items.map(orderItem =>
          orderItem.id === item.id
            ? { ...orderItem, quantity: orderItem.quantity + 1, total: (orderItem.quantity + 1) * orderItem.price }
            : orderItem
        )
      }));
    } else {
      setNewOrder(prev => ({
        ...prev,
        items: [...prev.items, { ...item, quantity: 1, total: item.price }]
      }));
    }
  };

  const removeItemFromOrder = (itemId) => {
    setNewOrder(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== itemId)
    }));
  };

  const updateItemQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      removeItemFromOrder(itemId);
      return;
    }
    
    setNewOrder(prev => ({
      ...prev,
      items: prev.items.map(item =>
        item.id === itemId
          ? { ...item, quantity, total: quantity * item.price }
          : item
      )
    }));
  };

  const createOrder = () => {
    if (newOrder.customer && newOrder.items.length > 0) {
      const order = {
        id: Date.now(),
        ...newOrder,
        total: newOrder.items.reduce((sum, item) => sum + item.total, 0),
        status: 'pending',
        time: 'Just now',
        paymentMethod: 'pending'
      };
      
      setOrders(prev => [order, ...prev]);
      setNewOrder({ customer: '', phone: '', table: '', type: 'dine-in', items: [] });
      setShowNewOrderModal(false);
    }
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const deleteOrder = (orderId) => {
    setOrders(prev => prev.filter(order => order.id !== orderId));
  };

  const getOrderTotal = () => {
    return newOrder.items.reduce((sum, item) => sum + item.total, 0);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Orders Management</h1>
          <p className="text-gray-600">Manage all restaurant orders and track their status</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowNewOrderModal(true)}
          className="inline-flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>New Order</span>
        </motion.button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">All Types</option>
            <option value="dine-in">Dine-in</option>
            <option value="takeaway">Takeaway</option>
            <option value="delivery">Delivery</option>
          </select>
          
          <div className="text-sm text-gray-500 flex items-center">
            <Filter className="w-4 h-4 mr-2" />
            {filteredOrders.length} orders found
          </div>
        </div>
      </div>

      {/* Orders Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredOrders.map((order) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
          >
            {/* Order Header */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${
                    order.status === 'completed' ? 'bg-green-500' :
                    order.status === 'in-progress' ? 'bg-blue-500' :
                    order.status === 'pending' ? 'bg-yellow-500' : 'bg-red-500'
                  }`} />
                  <span className={`text-sm font-medium px-2 py-1 rounded-full ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => {/* View order details */}}
                    className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {/* Edit order */}}
                    className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteOrder(order.id)}
                    className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">{order.customer}</h3>
                  <p className="text-sm text-gray-500">{order.phone}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1 text-gray-500">
                    {React.createElement(getTypeIcon(order.type), { className: "w-4 h-4" })}
                    <span className="text-sm">{order.table}</span>
                  </div>
                  <p className="text-xs text-gray-400">{order.time}</p>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="p-4">
              <div className="space-y-2 mb-4">
                {order.items.slice(0, 2).map((item, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">{item.name} × {item.quantity}</span>
                    <span className="font-medium">${item.total.toFixed(2)}</span>
                  </div>
                ))}
                {order.items.length > 2 && (
                  <p className="text-xs text-gray-400 text-center">
                    +{order.items.length - 2} more items
                  </p>
                )}
              </div>
              
              <div className="border-t border-gray-100 pt-3">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold text-gray-900">Total</span>
                  <span className="text-lg font-bold text-gray-900">${order.total.toFixed(2)}</span>
                </div>
                
                <div className="flex space-x-2">
                  {order.status === 'pending' && (
                    <>
                      <button
                        onClick={() => updateOrderStatus(order.id, 'in-progress')}
                        className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                      >
                        Start Cooking
                      </button>
                      <button
                        onClick={() => setShowPaymentModal(true)}
                        className="flex-1 bg-green-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                      >
                        Complete
                      </button>
                    </>
                  )}
                  
                  {order.status === 'in-progress' && (
                    <button
                      onClick={() => updateOrderStatus(order.id, 'completed')}
                      className="w-full bg-green-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                    >
                      Mark Ready
                    </button>
                  )}
                  
                  {order.status === 'completed' && (
                    <div className="flex items-center justify-center text-green-600">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      <span className="text-sm font-medium">Completed</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* New Order Modal */}
      <AnimatePresence>
        {showNewOrderModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Create New Order</h2>
                <button
                  onClick={() => setShowNewOrderModal(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Order Details */}
                  <div className="space-y-4">
                    <h3 className="font-medium text-gray-900">Order Details</h3>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Customer Name</label>
                      <input
                        type="text"
                        value={newOrder.customer}
                        onChange={(e) => setNewOrder(prev => ({ ...prev, customer: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter customer name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        value={newOrder.phone}
                        onChange={(e) => setNewOrder(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter phone number"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Order Type</label>
                        <select
                          value={newOrder.type}
                          onChange={(e) => setNewOrder(prev => ({ ...prev, type: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        >
                          <option value="dine-in">Dine-in</option>
                          <option value="takeaway">Takeaway</option>
                          <option value="delivery">Delivery</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Table/Location</label>
                        <input
                          type="text"
                          value={newOrder.table}
                          onChange={(e) => setNewOrder(prev => ({ ...prev, table: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder={newOrder.type === 'dine-in' ? 'Table number' : 'Location'}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Menu Selection */}
                  <div className="space-y-4">
                    <h3 className="font-medium text-gray-900">Select Menu Items</h3>
                    
                    <div className="max-h-64 overflow-y-auto space-y-2">
                      {menuItems.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => addItemToOrder(item)}
                          className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-left"
                        >
                          <div>
                            <p className="font-medium text-gray-900">{item.name}</p>
                            <p className="text-sm text-gray-500">{item.category}</p>
                          </div>
                          <span className="font-semibold text-primary-600">${item.price}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Order Summary */}
                {newOrder.items.length > 0 && (
                  <div className="mt-6 border-t border-gray-200 pt-6">
                    <h3 className="font-medium text-gray-900 mb-4">Order Summary</h3>
                    <div className="space-y-2 mb-4">
                      {newOrder.items.map((item) => (
                        <div key={item.id} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <span className="font-medium text-gray-900">{item.name}</span>
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                                className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-300"
                              >
                                -
                              </button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <button
                                onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                                className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-300"
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <span className="font-medium text-gray-900">${item.total.toFixed(2)}</span>
                            <button
                              onClick={() => removeItemFromOrder(item.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex items-center justify-between text-lg font-bold text-gray-900">
                        <span>Total</span>
                        <span>${getOrderTotal().toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => setShowNewOrderModal(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={createOrder}
                    disabled={!newOrder.customer || newOrder.items.length === 0}
                    className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Create Order
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Payment Modal */}
      <AnimatePresence>
        {showPaymentModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md"
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment Method</h2>
                
                <div className="space-y-3 mb-6">
                  <button className="w-full flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors">
                    <CreditCard className="w-5 h-5 text-primary-600" />
                    <span>Credit/Debit Card</span>
                  </button>
                  
                  <button className="w-full flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors">
                    <DollarSign className="w-5 h-5 text-primary-600" />
                    <span>Cash</span>
                  </button>
                  
                  <button className="w-full flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors">
                    <Phone className="w-5 h-5 text-primary-600" />
                    <span>Mobile Payment</span>
                  </button>
                </div>
                
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowPaymentModal(false)}
                    className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setShowPaymentModal(false);
                      // Handle payment processing here
                    }}
                    className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    Process Payment
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Orders;
