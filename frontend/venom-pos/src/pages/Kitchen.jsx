import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Clock,
  CheckCircle,
  AlertCircle,
  Timer,
  ChefHat,
  X,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';

const Kitchen = () => {
  const [orders, setOrders] = useState([
    { id: 1, table: 'A1', items: [{ name: 'Chicken Burger', quantity: 2, notes: 'Extra cheese' }, { name: 'French Fries', quantity: 1 }], status: 'pending', time: '5 min ago', priority: 'high', estimatedTime: 15 },
    { id: 2, table: 'B3', items: [{ name: 'Pizza Margherita', quantity: 1, notes: 'Well done' }], status: 'in-progress', time: '8 min ago', priority: 'medium', estimatedTime: 20, startTime: Date.now() - 300000 },
    { id: 3, table: 'Takeaway', items: [{ name: 'Caesar Salad', quantity: 1 }], status: 'ready', time: '15 min ago', priority: 'low', estimatedTime: 10 },
    { id: 4, table: 'C2', items: [{ name: 'Chicken Wings', quantity: 2, notes: 'Extra spicy' }, { name: 'Pasta Carbonara', quantity: 1 }], status: 'pending', time: '2 min ago', priority: 'high', estimatedTime: 25 }
  ]);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  const updateOrderStatus = (orderId, status) => {
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        if (status === 'in-progress' && !order.startTime) {
          return { ...order, status, startTime: Date.now() };
        }
        return { ...order, status };
      }
      return order;
    }));
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'ready': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock size={16} />;
      case 'in-progress': return <Timer size={16} />;
      case 'ready': return <CheckCircle size={16} />;
      default: return <Clock size={16} />;
    }
  };

  const getElapsedTime = (startTime) => {
    if (!startTime) return 0;
    return Math.floor((Date.now() - startTime) / 1000 / 60);
  };

  const getTimeRemaining = (order) => {
    if (order.status !== 'in-progress' || !order.startTime) return order.estimatedTime;
    const elapsed = getElapsedTime(order.startTime);
    return Math.max(0, order.estimatedTime - elapsed);
  };

  const isOverdue = (order) => {
    if (order.status !== 'in-progress') return false;
    return getTimeRemaining(order) < 0;
  };

  const getFilteredOrders = (status) => {
    return orders.filter(order => order.status === status);
  };

  const sortedOrders = (status) => {
    const filtered = getFilteredOrders(status);
    return filtered.sort((a, b) => {
      // Sort by priority first
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }
      // Then by time (oldest first)
      return new Date(a.time) - new Date(b.time);
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Kitchen Dashboard</h1>
          <p className="text-gray-600">Manage order queue and cooking status</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 bg-blue-100 px-4 py-2 rounded-lg">
            <ChefHat className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">Kitchen Staff</span>
          </div>
        </div>
      </div>

      {/* Kitchen Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Orders</p>
              <p className="text-2xl font-bold text-yellow-600">{getFilteredOrders('pending').length}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">In Progress</p>
              <p className="text-2xl font-bold text-blue-600">{getFilteredOrders('in-progress').length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Timer className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Ready</p>
              <p className="text-2xl font-bold text-green-600">{getFilteredOrders('ready').length}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Overdue</p>
              <p className="text-2xl font-bold text-red-600">{orders.filter(order => isOverdue(order)).length}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Order Queues */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending Orders */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200 bg-yellow-50">
            <h3 className="text-lg font-semibold text-yellow-800 flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Pending Orders ({getFilteredOrders('pending').length})
            </h3>
          </div>
          <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
            {sortedOrders('pending').map((order) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => {
                  setSelectedOrder(order);
                  setShowOrderDetails(true);
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-gray-900">{order.table}</h4>
                    <p className="text-sm text-gray-500">{order.time}</p>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPriorityColor(order.priority)}`}>
                    {order.priority.charAt(0).toUpperCase() + order.priority.slice(1)}
                  </span>
                </div>
                
                <div className="space-y-2 mb-3">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-gray-700">{item.quantity}x {item.name}</span>
                      {item.notes && (
                        <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                          {item.notes}
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Est: {order.estimatedTime} min</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      updateOrderStatus(order.id, 'in-progress');
                    }}
                    className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors flex items-center space-x-1"
                  >
                    <Play size={14} />
                    <span>Start</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* In Progress Orders */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200 bg-blue-50">
            <h3 className="text-lg font-semibold text-blue-800 flex items-center">
              <Timer className="w-5 h-5 mr-2" />
              In Progress ({getFilteredOrders('in-progress').length})
            </h3>
          </div>
          <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
            {sortedOrders('in-progress').map((order) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer ${
                  isOverdue(order) ? 'border-red-300 bg-red-50' : 'border-blue-300 bg-blue-50'
                }`}
                onClick={() => {
                  setSelectedOrder(order);
                  setShowOrderDetails(true);
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-gray-900">{order.table}</h4>
                    <p className="text-sm text-gray-500">{order.time}</p>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPriorityColor(order.priority)}`}>
                    {order.priority.charAt(0).toUpperCase() + order.priority.slice(1)}
                  </span>
                </div>
                
                <div className="space-y-2 mb-3">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-gray-700">{item.quantity}x {item.name}</span>
                      {item.notes && (
                        <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">
                          {item.notes}
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Time Remaining:</span>
                    <span className={`font-medium ${isOverdue(order) ? 'text-red-600' : 'text-blue-600'}`}>
                      {isOverdue(order) ? `${Math.abs(getTimeRemaining(order))} min overdue` : `${getTimeRemaining(order)} min`}
                    </span>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        updateOrderStatus(order.id, 'ready');
                      }}
                      className="flex-1 bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors flex items-center justify-center space-x-1"
                    >
                      <CheckCircle size={14} />
                      <span>Ready</span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        updateOrderStatus(order.id, 'pending');
                      }}
                      className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700 transition-colors flex items-center justify-center"
                    >
                      <Pause size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Ready Orders */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200 bg-green-50">
            <h3 className="text-lg font-semibold text-green-800 flex items-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              Ready ({getFilteredOrders('ready').length})
            </h3>
          </div>
          <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
            {sortedOrders('ready').map((order) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="border border-green-200 rounded-lg p-4 bg-green-50 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => {
                  setSelectedOrder(order);
                  setShowOrderDetails(true);
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-gray-900">{order.table}</h4>
                    <p className="text-sm text-gray-500">{order.time}</p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Ready
                  </span>
                </div>
                
                <div className="space-y-2 mb-3">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-gray-700">{item.quantity}x {item.name}</span>
                      {item.notes && (
                        <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">
                          {item.notes}
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-green-600 font-medium">Order completed!</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      // In real app, this would mark as served/delivered
                      setOrders(prev => prev.filter(o => o.id !== order.id));
                    }}
                    className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors flex items-center space-x-1"
                  >
                    <CheckCircle size={14} />
                    <span>Served</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Order Details Modal */}
      <AnimatePresence>
        {showOrderDetails && selectedOrder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md"
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Order Details</h2>
                <button
                  onClick={() => setShowOrderDetails(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Table {selectedOrder.table}</h3>
                    <p className="text-sm text-gray-500">{selectedOrder.time}</p>
                  </div>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(selectedOrder.priority)}`}>
                    {selectedOrder.priority.charAt(0).toUpperCase() + selectedOrder.priority.slice(1)} Priority
                  </span>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h4 className="font-medium text-gray-900 mb-3">Order Items:</h4>
                  <div className="space-y-2">
                    {selectedOrder.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-start">
                        <div>
                          <span className="font-medium text-gray-900">{item.quantity}x {item.name}</span>
                          {item.notes && (
                            <p className="text-sm text-blue-600 mt-1">{item.notes}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedOrder.status === 'in-progress' && (
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-gray-500">Time Remaining:</span>
                      <span className={`font-medium ${isOverdue(selectedOrder) ? 'text-red-600' : 'text-blue-600'}`}>
                        {isOverdue(selectedOrder) ? `${Math.abs(getTimeRemaining(selectedOrder))} min overdue` : `${getTimeRemaining(selectedOrder)} min`}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          isOverdue(selectedOrder) ? 'bg-red-500' : 'bg-blue-500'
                        }`}
                        style={{ 
                          width: `${Math.max(0, Math.min(100, (getTimeRemaining(selectedOrder) / selectedOrder.estimatedTime) * 100))}%` 
                        }}
                      />
                    </div>
                  </div>
                )}

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex space-x-3">
                    {selectedOrder.status === 'pending' && (
                      <button
                        onClick={() => {
                          updateOrderStatus(selectedOrder.id, 'in-progress');
                          setShowOrderDetails(false);
                        }}
                        className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                      >
                        <Play size={16} />
                        <span>Start Cooking</span>
                      </button>
                    )}
                    
                    {selectedOrder.status === 'in-progress' && (
                      <>
                        <button
                          onClick={() => {
                            updateOrderStatus(selectedOrder.id, 'ready');
                            setShowOrderDetails(false);
                          }}
                          className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                        >
                          <CheckCircle size={16} />
                          <span>Mark Ready</span>
                        </button>
                        <button
                          onClick={() => {
                            updateOrderStatus(selectedOrder.id, 'pending');
                            setShowOrderDetails(false);
                          }}
                          className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center"
                        >
                          <Pause size={16} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Kitchen;
