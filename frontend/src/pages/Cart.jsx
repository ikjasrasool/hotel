import React, { useState, useRef } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import CheckoutForm from '../components/CheckoutForm';
import { Printer, Check, Download, ArrowLeft } from 'lucide-react';
// Import jsPDF for PDF generation
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, total, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [isPrinting, setIsPrinting] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const receiptRef = useRef();
  const navigate = useNavigate();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (cartItems.length === 0 && !orderComplete) {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Add some delicious items to get started!</p>
            <button
                onClick={() => navigate('/menu')}
                className="bg-red-600 text-white px-8 py-3 rounded-full hover:bg-red-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Browse Menu
            </button>
          </div>
        </div>
    );
  }

  const handleCheckout = () => {
    setShowCheckoutForm(true);
  };

  const handlePrint = () => {
    setIsPrinting(true);

    // You can implement actual printing functionality here
    // For example, using react-to-print library:
    // Example: if you have react-to-print installed:
    // const handlePrint = useReactToPrint({
    //   content: () => receiptRef.current,
    //   documentTitle: `Food_Order_${orderDetails.orderCode}`,
    // });
    // handlePrint();

    // For now, we'll use a timeout to simulate printing
    setTimeout(() => {
      setIsPrinting(false);
      window.print(); // Basic browser print functionality
    }, 1000);
  };

  // Enhanced PDF generation function
  const generatePDF = async () => {
    if (!receiptRef.current) {
      alert("Receipt content not found. Please try again.");
      return;
    }

    setIsGeneratingPDF(true);

    try {
      // Configure html2canvas with optimized settings
      const canvas = await html2canvas(receiptRef.current, {
        scale: 3, // Higher scale for better quality
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        allowTaint: true,
        removeContainer: true,
        imageTimeout: 15000, // Increased timeout for image loading
      });

      // Configure PDF settings
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Create PDF with better quality settings
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true,
        quality: 0.98
      });

      // Add image to PDF with improved quality
      pdf.addImage(
        canvas.toDataURL('image/jpeg', 1.0),
        'JPEG',
        0,
        0,
        imgWidth,
        imgHeight,
        undefined,
        'FAST'
      );

      // Save with error handling
      await pdf.save(`Food_Order_${orderDetails.orderCode}.pdf`);
      
    } catch (error) {
      console.error("PDF Generation Error:", error);
      alert("PDF generation failed. Please check if all images are loaded and try again.");
      
      // Attempt recovery after a short delay
      setTimeout(() => {
        setIsGeneratingPDF(false);
      }, 1000);
      return;
    }

    setIsGeneratingPDF(false);
  };

  const handleOrderSubmit = async (formData) => {
    setIsCheckingOut(true);
    try {
      const response = await fetch('http://localhost:5000/api/orders/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          items: cartItems.map(item => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            _id: item._id
          })),
          totalAmount: total
        }),
      });

      const data = await response.json();
      if (data.success) {
        setOrderDetails(data.order);
        setOrderComplete(true);
        clearCart();
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      alert('Error placing order: ' + error.message);
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (orderComplete && orderDetails) {
    // Format date for receipt
    const orderDate = new Date().toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    // Calculate subtotal, tax and final total
    const subtotal = orderDetails.totalAmount;
    const taxRate = 0.05; // 5% tax
    const tax = subtotal * taxRate;
    const finalTotal = subtotal + tax;

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            {/* Success Message */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8 text-center shadow-sm">
              <div className="inline-flex items-center justify-center bg-green-100 rounded-full p-2 mb-4">
                <Check size={24} className="text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Order Confirmed!</h2>
              <p className="text-green-700 mt-2">Your order has been successfully placed and is being processed.</p>
            </div>

            {/* Actual Receipt - This is what gets printed */}
            <div
                ref={receiptRef}
                className="bg-white rounded-xl shadow-xl overflow-hidden transform transition-all duration-500 hover:shadow-2xl"
            >
              {/* Receipt Header */}
              <div className="bg-red-600 text-white px-8 py-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-2xl font-bold">Food Order Receipt</h3>
                    <p className="opacity-80 mt-1">Thank you for your order!</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{orderDate}</p>
                    <p className="mt-1 text-xl font-bold">#{orderDetails.orderCode}</p>
                  </div>
                </div>
              </div>

              {/* Customer Details */}
              <div className="p-8 border-b">
                <h4 className="text-lg font-semibold text-gray-700 mb-4">Customer Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-medium">{orderDetails.customerName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{orderDetails.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Age</p>
                    <p className="font-medium">{orderDetails.age} years</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Bus Number</p>
                    <p className="font-medium">{orderDetails.busNumber}</p>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-8">
                <h4 className="text-lg font-semibold text-gray-700 mb-4">Order Details</h4>
                <table className="w-full">
                  <thead>
                  <tr className="border-b text-left">
                    <th className="pb-2">Item</th>
                    <th className="pb-2">Qty</th>
                    <th className="pb-2">Price</th>
                    <th className="pb-2 text-right">Subtotal</th>
                  </tr>
                  </thead>
                  <tbody>
                  {orderDetails.items.map((item, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="py-3">{item.name}</td>
                        <td className="py-3">{item.quantity}</td>
                        <td className="py-3">₹{item.price.toFixed(2)}</td>
                        <td className="py-3 text-right">₹{(item.price * item.quantity).toFixed(2)}</td>
                      </tr>
                  ))}
                  </tbody>
                </table>

                {/* Totals */}
                <div className="mt-6 space-y-2">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax (5%)</span>
                    <span>₹{tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2 border-t">
                    <span>Total Amount</span>
                    <span>₹{finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-8 text-center text-gray-500 text-sm">
                  <p>For any questions about your order, please contact us at</p>
                  <p className="font-medium">support@foodservice.com | +91 98765 43210</p>
                  <p className="mt-2">Thank you for your business!</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                  onClick={handlePrint}
                  disabled={isPrinting}
                  className="flex items-center justify-center bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition duration-300 shadow-lg disabled:bg-gray-400"
              >
                <Printer size={18} className="mr-2" />
                {isPrinting ? 'Preparing...' : 'Print Receipt'}
              </button>
              <button
                  onClick={generatePDF}
                  disabled={isGeneratingPDF}
                  className="flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 shadow-lg disabled:bg-blue-400"
              >
                <Download size={18} className="mr-2" />
                {isGeneratingPDF ? 'Generating PDF...' : 'Save as PDF'}
              </button>
              <button
                  onClick={() => navigate('/menu')}
                  className="flex items-center justify-center bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition duration-300 shadow-lg"
              >
                <ArrowLeft size={18} className="mr-2" />
                Return to Menu
              </button>
            </div>
          </div>
        </div>
    );
  }

  return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-gray-800 text-center sm:text-left">Your Cart</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              {cartItems.map((item) => (
                  <div
                      key={item._id}
                      className="bg-white p-6 rounded-xl shadow-md mb-4 transform transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
                      <p className="font-bold text-lg text-red-600">₹{item.price * item.quantity}</p>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center space-x-3">
                        <button
                            onClick={() => updateQuantity(item._id, Math.max(0, item.quantity - 1))}
                            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-200"
                        >
                          -
                        </button>
                        <span className="font-medium text-lg">{item.quantity}</span>
                        <button
                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-200"
                        >
                          +
                        </button>
                      </div>
                      <button
                          onClick={() => removeFromCart(item._id)}
                          className="text-red-600 hover:text-red-800 font-medium transition-colors duration-200"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
              ))}
            </div>

            <div className="md:col-span-1">
              <div className="bg-white shadow-xl rounded-xl p-6 sticky top-4 transform transition-all duration-300 hover:shadow-2xl">
                {showCheckoutForm ? (
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Checkout Details</h3>
                      <CheckoutForm
                          onSubmit={handleOrderSubmit}
                          isLoading={isCheckingOut}
                      />
                    </div>
                ) : (
                    <>
                      <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between">
                          <span>Items ({totalItems})</span>
                          <span>₹{total}</span>
                        </div>
                      </div>
                      <div className="border-t pt-4 mb-4">
                        <div className="flex justify-between font-bold">
                          <span>Total</span>
                          <span>₹{total}</span>
                        </div>
                      </div>
                      <button
                          onClick={handleCheckout}
                          className="w-full py-3 px-4 rounded-lg text-white font-medium bg-red-600 hover:bg-red-700 transition duration-300 shadow-lg hover:shadow-xl"
                      >
                        Proceed to Checkout
                      </button>
                    </>
                )}
                <button
                    onClick={() => navigate('/menu')}
                    className="w-full mt-4 py-3 px-4 rounded-lg border border-red-600 text-red-600 hover:bg-red-50 transition duration-300"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Cart;
