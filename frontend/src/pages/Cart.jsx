import React, { useState, useRef, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import CheckoutForm from '../components/CheckoutForm';
import { Printer, Check, ArrowLeft, Download, ShoppingBag, Trash2, Plus, Minus, RefreshCw, AlertCircle } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';


const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, total, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [isPrinting, setIsPrinting] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [removeAnimation, setRemoveAnimation] = useState(null);
  const [highlightedItem, setHighlightedItem] = useState(null);
  const receiptRef = useRef();
  const navigate = useNavigate();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  
  // Calculate tax and final total
  const taxRate = 0.05; // 5% tax
  const subtotal = total;
  const tax = subtotal * taxRate;
  const finalTotal = subtotal + tax;

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle item removal with animation
  const handleRemoveItem = (itemId) => {
    setRemoveAnimation(itemId);
    setTimeout(() => {
      removeFromCart(itemId);
      setRemoveAnimation(null);
    }, 300);
  };

  // Handle quantity change with highlighting effect
  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity > 0) {
      updateQuantity(itemId, newQuantity);
      setHighlightedItem(itemId);
      setTimeout(() => setHighlightedItem(null), 800);
    } else {
      handleRemoveItem(itemId);
    }
  };

  if (cartItems.length === 0 && !orderComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-8 text-red-500 opacity-60">
            <ShoppingBag size={80} className="mx-auto" />
          </div>
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Add some delicious items to get started!</p>
          <button
            onClick={() => navigate('/menu')}
            className="bg-red-600 text-white px-8 py-3 rounded-full hover:bg-red-700 transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center justify-center mx-auto"
          >
            <ShoppingBag size={18} className="mr-2" />
            Browse Menu
          </button>
          
          <div className="mt-12 bg-amber-50 p-6 rounded-xl border border-amber-200 max-w-lg mx-auto">
            <div className="flex items-start">
              <AlertCircle size={24} className="text-amber-500 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-amber-800 mb-1">Chef's Recommendation</h3>
                <p className="text-amber-700 text-sm">Try our special South Indian Thali - a delightful combination of authentic flavors in one platter!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleCheckout = () => {
    setShowCheckoutForm(true);
    // Smooth scroll to checkout form
    setTimeout(() => {
      document.getElementById('checkout-form-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handlePrint = () => {
    setIsPrinting(true);
    setTimeout(() => {
      setIsPrinting(false);
      window.print();
    }, 1000);
  };

  // Function to generate PDF with proper alignment
  const generatePDF = () => {
    setIsGeneratingPDF(true);

    try {
      // Create a new PDF document with proper dimensions
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
      });

      // Set document metadata
      doc.setProperties({
        title: 'Hotel Saravana Bhavan Receipt',
        subject: 'Food Order Receipt',
        creator: 'Saravana Bhavan App'
      });

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 20; // Standard margin

      // Add decorative border with consistent thickness
      doc.setDrawColor(220, 20, 60); // Crimson red
      doc.setLineWidth(1);
      doc.rect(5, 5, pageWidth - 10, pageHeight - 10);

      // Add header with consistent color and spacing
      doc.setFillColor(220, 20, 60); // Crimson red for main header
      doc.rect(0, 0, pageWidth, 35, 'F');
      doc.setFillColor(180, 10, 30); // Darker red for bottom accent
      doc.rect(0, 35, pageWidth, 5, 'F');

      // Add restaurant name with proper positioning
      doc.setFontSize(26);
      doc.setFont("helvetica", "bold");
      // Shadow effect with exact positioning
      doc.setTextColor(180, 10, 30); // Darker red for shadow
      doc.text("Hotel Saravana Bhavan", pageWidth / 2 + 0.5, 15 + 0.5, { align: "center" });
      // Main text with exact positioning
      doc.setTextColor(255, 255, 255); // White
      doc.text("Hotel Saravana Bhavan", pageWidth / 2, 15, { align: "center" });

      // Add tagline with proper spacing
      doc.setFontSize(12);
      doc.setFont("helvetica", "italic");
      doc.text("VegTables", pageWidth / 2, 23, { align: "center" });

      // Add receipt title with proper positioning
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text("FOOD ORDER RECEIPT", pageWidth / 2, 32, { align: "center" });

      // Add order information section with proper spacing and alignment
      doc.setDrawColor(220, 20, 60); // Crimson red
      doc.setLineWidth(0.1);
      doc.setFillColor(252, 245, 245); // Very light red background
      doc.roundedRect(margin - 5, 45, pageWidth - 2 * (margin - 5), 15, 2, 2, 'FD');

      const orderInfoY = 55;
      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0); // Black

      // Format order date
      const orderDate = new Date().toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });

      // Order details section with two-column layout and exact positioning
      doc.setFont("helvetica", "bold");
      doc.text("Order Date:", margin, orderInfoY);
      doc.setFont("helvetica", "normal");
      doc.text(orderDate, margin + 25, orderInfoY);

      doc.setFont("helvetica", "bold");
      const orderIdX = pageWidth - margin - 50;
      doc.text("Order ID:", orderIdX, orderInfoY);
      doc.setFont("helvetica", "normal");
      const orderIdValueX = pageWidth - margin;
      doc.text(`#${orderDetails.orderCode}`, orderIdValueX, orderInfoY, { align: "right" });

      // Customer Information section with proper spacing and alignment
      const customerInfoY = orderInfoY + 20;

      // Section title with proper positioning
      doc.setFillColor(220, 20, 60); // Crimson red
      doc.roundedRect(margin - 5, customerInfoY - 9, 60, 9, 1, 1, 'F');
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(255, 255, 255); // White
      doc.text("Customer Information", margin, customerInfoY - 3);

      // Customer info box with proper spacing and consistent borders
      doc.setDrawColor(220, 20, 60, 0.5); // Light crimson border
      doc.setLineWidth(0.3);
      doc.setFillColor(252, 245, 245); // Very light red background
      doc.roundedRect(margin - 5, customerInfoY, pageWidth - 2 * (margin - 5), 30, 3, 3, 'FD');

      const customerDetailY = customerInfoY + 12;
      doc.setFontSize(11);
      doc.setTextColor(60, 60, 60); // Dark gray for better readability

      // Define columns for customer info with proper spacing and alignment
      const col1 = margin;
      const col2 = pageWidth / 2 + 5;

      // Add consistent icons for labels
      const iconSize = 3;
      doc.setFillColor(220, 20, 60); // Crimson red

      // Name field with proper alignment
      doc.circle(col1, customerDetailY - 3, iconSize / 2, 'F');
      doc.setFont("helvetica", "bold");
      doc.setTextColor(80, 80, 80); // Dark gray
      doc.text("Name:", col1 + 5, customerDetailY);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(0, 0, 0); // Black for value
      doc.text(orderDetails.customerName, col1 + 20, customerDetailY);

      // Email field with proper alignment
      doc.circle(col1, customerDetailY + 10 - 3, iconSize / 2, 'F');
      doc.setFont("helvetica", "bold");
      doc.setTextColor(80, 80, 80); // Dark gray
      doc.text("Email:", col1 + 5, customerDetailY + 10);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(0, 0, 0); // Black for value
      doc.text(orderDetails.email, col1 + 20, customerDetailY + 10);

      // Age field with proper alignment
      doc.circle(col2, customerDetailY - 3, iconSize / 2, 'F');
      doc.setFont("helvetica", "bold");
      doc.setTextColor(80, 80, 80); // Dark gray
      doc.text("Age:", col2 + 5, customerDetailY);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(0, 0, 0); // Black for value
      doc.text(`${orderDetails.age} years`, col2 + 20, customerDetailY);

      // Bus Number field with proper alignment
      doc.circle(col2, customerDetailY + 10 - 3, iconSize / 2, 'F');
      doc.setFont("helvetica", "bold");
      doc.setTextColor(80, 80, 80); // Dark gray
      doc.text("Bus Number:", col2 + 5, customerDetailY + 10);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(0, 0, 0); // Black for value
      doc.text(orderDetails.busNumber, col2 + 35, customerDetailY + 10);

      // Order Details Section with proper spacing and alignment
      const orderTitleY = customerInfoY + 40;

      // Section title with proper positioning
      doc.setFillColor(220, 20, 60); // Crimson red
      doc.roundedRect(margin - 5, orderTitleY - 9, 40, 9, 1, 1, 'F');
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(255, 255, 255); // White
      doc.text("Order Details", margin, orderTitleY - 3);

      // Setup table with proper column widths and alignment
      const tableColumn = ["Item", "Qty", "Price (₹)", "Subtotal (₹)"];
      const tableRows = orderDetails.items.map(item => [
        item.name,
        item.quantity,
        item.price.toFixed(2),
        (item.price * item.quantity).toFixed(2)
      ]);

      // Generate the table with proper spacing and alignment
      autoTable(doc, {
        startY: orderTitleY,
        head: [tableColumn],
        body: tableRows,
        theme: 'grid',
        headStyles: {
          fillColor: [220, 20, 60], // Crimson red
          textColor: [255, 255, 255],
          fontStyle: 'bold',
          halign: 'center',
          fontSize: 12,
          cellPadding: 6
        },
        bodyStyles: {
          fontSize: 11,
          lineWidth: 0.3,
          cellPadding: 5,
          fontStyle: 'normal',
          lineColor: [220, 20, 60, 0.3]
        },
        alternateRowStyles: {
          fillColor: [252, 245, 245] // Very light red for alternate rows
        },
        columnStyles: {
          0: { cellWidth: 'auto', halign: 'left', fontStyle: 'normal' },
          1: { cellWidth: 20, halign: 'center', fontStyle: 'normal' },
          2: { cellWidth: 35, halign: 'right', fontStyle: 'normal' },
          3: { cellWidth: 35, halign: 'right', fontStyle: 'normal' }
        },
        margin: { left: margin - 5, right: margin - 5 },
        didDrawPage: function(data) {
          doc.lastAutoTableEndPosY = data.cursor.y;
        }
      });

      // Financial summary section with proper alignment
      const summaryY = doc.lastAutoTableEndPosY + 15;

      // Add a balanced background for the financial summary with proper positioning
      doc.setFillColor(252, 245, 245); // Very light red background
      doc.setDrawColor(220, 20, 60, 0.5); // Light crimson border
      doc.roundedRect(pageWidth / 2, summaryY - 10, pageWidth / 2 - margin + 5, 40, 3, 3, 'FD');

      // Ensure financial values are right-aligned with consistent spacing
      const summaryLeftX = pageWidth - margin - 50;
      const summaryRightX = pageWidth - margin;

      // Calculate financial values
      const subtotal = orderDetails.totalAmount;
      const taxRate = 0.05;
      const tax = subtotal * taxRate;
      const finalTotal = subtotal + tax;

      // Draw financial summary with proper right alignment for values
      doc.setFontSize(11);
      doc.setTextColor(80, 80, 80); // Dark gray for labels
      doc.setFont("helvetica", "bold");

      doc.text("Subtotal:", summaryLeftX, summaryY, { align: "right" });
      doc.setFont("helvetica", "normal");
      doc.setTextColor(0, 0, 0); // Black for values
      doc.text(`₹${subtotal.toFixed(2)}`, summaryRightX, summaryY, { align: "right" });

      doc.setFont("helvetica", "bold");
      doc.setTextColor(80, 80, 80); // Dark gray for labels
      doc.text("Tax (5%):", summaryLeftX, summaryY + 10, { align: "right" });
      doc.setFont("helvetica", "normal");
      doc.setTextColor(0, 0, 0); // Black for values
      doc.text(`₹${tax.toFixed(2)}`, summaryRightX, summaryY + 10, { align: "right" });

      // Add a decorative line before the total with proper positioning
      doc.setDrawColor(220, 20, 60); // Crimson red
      doc.setLineWidth(0.7);
      doc.line(pageWidth / 2 + 50, summaryY + 15, summaryRightX, summaryY + 15);

      // Total amount with proper alignment and emphasis
      doc.setFontSize(13);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(220, 20, 60); // Crimson red
      doc.text("Total Amount:", summaryLeftX, summaryY + 25, { align: "right" });
      doc.text(`₹${finalTotal.toFixed(2)}`, summaryRightX, summaryY + 25, { align: "right" });

      // Add decorative design element with proper positioning
      const designY = summaryY + 45;
      doc.setDrawColor(220, 20, 60); // Crimson red
      doc.setLineWidth(1);

      // Decorative wave-like pattern with consistent spacing
      let waveX = margin - 5;
      const waveWidth = 10;
      const waveCount = Math.floor((pageWidth - 2 * (margin - 5)) / waveWidth);

      doc.setDrawColor(220, 20, 60, 0.6); // Semi-transparent red
      doc.setLineWidth(1);

      for (let i = 0; i < waveCount; i++) {
        doc.line(waveX, designY, waveX + waveWidth/2, designY - 3);
        doc.line(waveX + waveWidth/2, designY - 3, waveX + waveWidth, designY);
        waveX += waveWidth;
      }

      // Add footer with proper spacing and alignment
      const footerY = pageHeight - 35;

      // Footer background with balanced spacing
      doc.setFillColor(250, 250, 250);
      doc.setDrawColor(220, 20, 60, 0.3);
      doc.roundedRect(margin - 5, footerY - 5, pageWidth - 2 * (margin - 5), 30, 3, 3, 'FD');

      // Contact info with centered alignment
      doc.setFontSize(10);
      doc.setTextColor(80, 80, 80); // Dark gray
      doc.setFont("helvetica", "normal");
      doc.text("For any questions about your order, please contact us at:", pageWidth / 2, footerY, { align: "center" });

      // Add emphasis to contact details with proper spacing
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(220, 20, 60); // Crimson red for contact details
      doc.text("support@saravanabhavan.com | +91 98765 43210", pageWidth / 2, footerY + 8, { align: "center" });

      // Add thank you message with proper positioning
      doc.setFontSize(13);
      doc.setTextColor(180, 10, 30); // Darker red
      doc.setFont("helvetica", "bolditalic");
      doc.text("Thank you for your business!", pageWidth / 2, footerY + 20, { align: "center" });

      // Add QR code placeholder with consistent size and positioning
      doc.setFillColor(80, 80, 80);
      doc.roundedRect(margin, footerY - 5, 25, 25, 2, 2, 'F');
      doc.setFontSize(6);
      doc.setTextColor(255, 255, 255);
      doc.text("QR Code", margin + 12.5, footerY + 7.5, { align: "center" });

      // Add restaurant logo placeholder with balanced positioning
      doc.setFillColor(220, 20, 60);
      doc.roundedRect(pageWidth - margin - 25, footerY - 5, 25, 25, 2, 2, 'F');
      doc.setFontSize(6);
      doc.setTextColor(255, 255, 255);
      doc.text("Logo", pageWidth - margin - 12.5, footerY + 7.5, { align: "center" });

      // Save the PDF with properly formatted name
      doc.save(`SaravanaBhavan_Receipt_${orderDetails.orderCode}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("There was an error generating your PDF receipt. Please try again.");
    } finally {
      setIsGeneratingPDF(false);
    }
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
        // Scroll to top on order completion
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
    const orderDate = new Date().toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const subtotal = orderDetails.totalAmount;
    const taxRate = 0.05;
    const tax = subtotal * taxRate;
    const finalTotal = subtotal + tax;

    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 mb-8 text-center shadow-lg animate-fadeIn">
            <div className="inline-flex items-center justify-center bg-green-100 rounded-full p-3 mb-4">
              <Check size={32} className="text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Order Confirmed!</h2>
            <p className="text-green-700 mt-2">Your order has been successfully placed and is being processed.</p>
          </div>

          <div
            ref={receiptRef}
            className="bg-white rounded-xl shadow-xl overflow-hidden transform transition-all duration-500 hover:shadow-2xl"
          >
            {/* Receipt Header with Saravana Bhavan Logo */}
            <div className="bg-red-600 text-center p-6 relative">
              {/* Logo container */}
              <div className="mb-2">
                <img
                  src="/path/to/saravana-bhavan-logo.png"
                  alt="Hotel Saravana Bhavan"
                  className="h-16 mx-auto"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.style.display = 'none';
                    document.getElementById('logo-fallback').style.display = 'block';
                  }}
                />
                <div id="logo-fallback" style={{display: 'none'}}>
                  <h2 className="text-3xl font-bold text-white">Hotel Saravana Bhavan</h2>
                </div>
              </div>
              <p className="text-sm italic text-red-100">VegTables</p>
              <h3 className="text-xl font-bold text-white mt-2">FOOD ORDER RECEIPT</h3>
            </div>

            <div className="p-8 bg-white border-b border-gray-100">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-700"><span className="font-medium">Order Date:</span> {orderDate}</p>
                </div>
                <div>
                  <p className="text-lg font-semibold text-red-600">#{orderDetails.orderCode}</p>
                </div>
              </div>
            </div>

            <div className="p-8 border-b border-gray-100 bg-gray-50">
              <h4 className="text-lg font-semibold text-red-600 mb-4">Customer Information</h4>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-sm text-gray-500 mb-1">Name</p>
                  <p className="font-medium">{orderDetails.customerName}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-sm text-gray-500 mb-1">Email</p>
                  <p className="font-medium">{orderDetails.email}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-sm text-gray-500 mb-1">Age</p>
                  <p className="font-medium">{orderDetails.age} years</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-sm text-gray-500 mb-1">Bus Number</p>
                  <p className="font-medium">{orderDetails.busNumber}</p>
                </div>
              </div>
            </div>

            <div className="p-8">
              <h4 className="text-lg font-semibold text-red-600 mb-4">Order Details</h4>
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="w-full">
                  <thead className="bg-red-600 text-white">
                    <tr>
                      <th className="py-3 px-4 text-left font-semibold">Item</th>
                      <th className="py-3 px-4 text-center font-semibold">Qty</th>
                      <th className="py-3 px-4 text-right font-semibold">Price</th>
                      <th className="py-3 px-4 text-right font-semibold">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderDetails.items.map((item, index) => (
                      <tr key={index} className={`border-b border-gray-100 ${index % 2 === 0 ? 'bg-red-50' : 'bg-white'}`}>
                        <td className="py-4 px-4">{item.name}</td>
                        <td className="py-4 px-4 text-center">{item.quantity}</td>
                        <td className="py-4 px-4 text-right">₹{item.price.toFixed(2)}</td>
                        <td className="py-4 px-4 text-right">₹{(item.price * item.quantity).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
                <div className="space-y-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax (5%)</span>
                    <span>₹{tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-xl pt-3 border-t-2 border-red-100 text-red-600">
                    <span>Total Amount</span>
                    <span>₹{finalTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="mt-12 text-center text-gray-500 p-6 bg-gray-50 rounded-lg">
                <p>For any questions about your order, please contact us at</p>
                <p className="font-medium">support@saravanabhavan.com | +91 98765 43210</p>
                <p className="mt-4 italic text-red-600 font-medium">Thank you for your business!</p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              onClick={generatePDF}
              disabled={isGeneratingPDF}
              className="flex items-center justify-center bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition duration-300 shadow-lg disabled:opacity-70 transform hover:scale-105"
            >
              {isGeneratingPDF ? (
                <span className="flex items-center">
                  <RefreshCw size={18} className="mr-2 animate-spin" />
                  Generating PDF...
                </span>
              ) : (
                <>
                  <Download size={18} className="mr-2" />
                  Download Receipt (PDF)
                </>
              )}
            </button>

            <button
              onClick={() => navigate('/menu')}
              className="flex items-center justify-center border-2 border-red-600 text-red-600 px-6 py-3 rounded-lg hover:bg-red-50 transition duration-300 transform hover:scale-105"
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
      <div className="max-w-6xl mx-auto">
        {/* Header section with animated badge */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <div className="flex items-center mb-4 sm:mb-0">
            <h1 className="text-4xl font-bold text-gray-800">Your Cart</h1>
            {totalItems > 0 && (
              <span className="inline-flex items-center justify-center ml-3 bg-red-600 text-white rounded-full h-7 w-7 text-sm animate-pulse">
                {totalItems}
              </span>
            )}
          </div>
          <button
            onClick={() => navigate('/menu')}
            className="flex items-center text-red-600 hover:text-red-700 font-medium"
          >
            <ArrowLeft size={16} className="mr-1" />
            Continue Shopping
          </button>
        </div>

        {/* Check if cart is not empty */}
        {cartItems.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart items column */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">Order Items</h2>

                {/* Cart items list */}
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item._id}
                      className={`bg-white border rounded-xl overflow-hidden transform transition-all duration-300 
                      ${removeAnimation === item._id ? 'opacity-0 scale-95' : 'opacity-100'} 
                      ${highlightedItem === item._id ? 'border-red-500 shadow-lg' : 'border-gray-200 hover:border-red-300'}`}
                    >
                      <div className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                        <div className="flex flex-1 items-center mb-4 sm:mb-0">
                          {/* Image placeholder */}
                          <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center text-red-500 mr-4 flex-shrink-0">
                            <span className="font-bold">{item.name.charAt(0)}</span>
                          </div>

                          <div>
                            <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                            <p className="text-sm text-gray-500 mt-1">₹{item.price} per serving</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-6 w-full sm:w-auto">
                          {/* Quantity controls */}
                          <div className="flex items-center">
                            <button
                              onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-red-100 flex items-center justify-center transition-colors duration-200"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={16} className="text-gray-600" />
                            </button>

                            <span className="font-medium text-lg mx-3 min-w-[20px] text-center">{item.quantity}</span>

                            <button
                              onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-red-100 flex items-center justify-center transition-colors duration-200"
                              aria-label="Increase quantity"
                            >
                              <Plus size={16} className="text-gray-600" />
                            </button>
                          </div>

                          {/* Price */}
                          <div className="text-right">
                            <p className="font-bold text-lg text-red-600">₹{(item.price * item.quantity).toFixed(2)}</p>
                          </div>

                          {/* Remove button */}
                          <button
                            onClick={() => handleRemoveItem(item._id)}
                            className="text-gray-400 hover:text-red-600 transition-colors duration-200"
                            aria-label="Remove item"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended items section */}
              <div className="bg-amber-50 rounded-xl shadow-md p-6 border border-amber-200">
                <h3 className="text-lg font-semibold text-amber-800 mb-3">Customers Also Enjoyed</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-3 flex items-center shadow-sm border border-amber-100">
                    <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600 mr-3">S</div>
                    <div>
                      <p className="font-medium">Sweet Lassi</p>
                      <p className="text-sm text-gray-500">Refreshing companion</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Checkout form when displayed */}
              {showCheckoutForm && (
                <div id="checkout-form-section" className="mt-8 bg-white rounded-xl shadow-md p-6 animate-fadeIn">
                  <h2 className="text-2xl font-semibold mb-4 text-gray-800">Checkout Details</h2>
                  <CheckoutForm
                    onSubmit={handleOrderSubmit}
                    isLoading={isCheckingOut}
                  />
                </div>
              )}
            </div>

            {/* Order summary column */}
            <div className="lg:col-span-1">
              <div className="bg-white shadow-xl rounded-xl overflow-hidden sticky top-4">
                {/* Summary header */}
                <div className="bg-red-600 text-white p-6">
                  <h3 className="text-xl font-semibold">Order Summary</h3>
                  <p className="text-red-100 text-sm mt-1">
                    {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
                  </p>
                </div>

                {/* Summary content */}
                <div className="p-6">
                  {/* Items summary */}
                  <div className="border-b border-gray-200 pb-4 mb-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Tax (5%)</span>
                      <span className="font-medium">₹{tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Delivery</span>
                      <span>Free</span>
                    </div>
                  </div>

                  {/* Total amount */}
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-lg font-bold">Total</span>
                    <span className="text-xl font-bold text-red-600">₹{finalTotal.toFixed(2)}</span>
                  </div>

                  {/* Action buttons */}
                  {!showCheckoutForm ? (
                    <button
                      onClick={handleCheckout}
                      className="w-full py-3 px-4 rounded-lg text-white font-medium bg-red-600 hover:bg-red-700 transition duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center"
                    >
                      <ShoppingBag size={18} className="mr-2" />
                      Proceed to Checkout
                    </button>
                  ) : (
                    <button
                      onClick={() => setShowCheckoutForm(false)}
                      className="w-full py-3 px-4 rounded-lg border border-red-600 text-red-600 hover:bg-red-50 transition duration-300 mb-4 flex items-center justify-center"
                    >
                      <ArrowLeft size={18} className="mr-2" />
                      Back to Cart
                    </button>
                  )}

                  {/* Security badge */}
                  <div className="mt-6 flex items-center justify-center text-gray-500 text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Secure Checkout
                  </div>
                </div>

                {/* Promo box */}
                <div className="bg-gray-50 p-6 border-t border-gray-200">
                  <p className="text-sm font-medium text-gray-700 mb-2">Have a special request?</p>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Add any special instructions here..."
                    rows="2"
                  ></textarea>
                </div>
              </div>

              {/* Help section */}
              <div className="mt-6 bg-white rounded-xl p-6 shadow-md">
                <h4 className="font-medium text-gray-800 mb-2">Need Help?</h4>
                <p className="text-sm text-gray-600 mb-4">Our customer support team is here to assist you with your order.</p>
                <a href="#" className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center">
                  <span>Contact Support</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;