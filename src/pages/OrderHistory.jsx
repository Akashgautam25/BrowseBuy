import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

const OrderHistory = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      const allOrders = JSON.parse(localStorage.getItem('orders')) || [];
      const userOrders = allOrders.filter(order => order.userId === user.uid);
      setOrders(userOrders);
    }
  }, [user]);

  if (!user) return <p className="text-center mt-10 text-gray-600">Please login to see your orders.</p>;

  if (orders.length === 0)
    return <p className="text-center mt-10 text-gray-600">You have not placed any orders yet.</p>;

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6">
      <h1 className="text-3xl font-bold mb-6 text-black text-center">My Orders</h1>

      <div className="flex flex-col gap-6">
        {orders.map(order => (
          <div key={order.id} className="border rounded-xl p-4 bg-white shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-black">Order ID: {order.id}</span>
              <span className="text-sm text-gray-500">{new Date(order.date).toLocaleString()}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-black">Name:</span>
              <span className="text-gray-700">{order.name}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-black">Phone:</span>
              <span className="text-gray-700">{order.phone}</span>
            </div>
            <div className="mb-2">
              <span className="text-black font-medium">Items:</span>
              <ul className="list-disc list-inside">
                {order.items.map(item => (
                  <li key={item.id}>
                    {item.name} x {item.quantity} - ₹{item.price * item.quantity}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-between font-semibold text-black border-t pt-2 mt-2">
              <span>Total:</span>
              <span>₹{order.total}</span>
            </div>
            <div className="mt-2">
              <span className="text-sm text-gray-600">Payment: {order.paymentMethod}</span>
            </div>
            <div className="mt-1">
              <span className="text-sm text-gray-600">Status: {order.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
