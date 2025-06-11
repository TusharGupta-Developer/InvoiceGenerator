// ===============================
// App.jsx                        
// ===============================
import React from 'react';
import { useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import InvoicePDF from './components/InvoicePDF';

const emptyClient = {
  name: '',
  company: '',
  address: '',
  email: '',
  phone: '',
};

const emptyService = {
  description: '',
  hours: '',
  rate: '',
  total: '',
};

const emptyPayment = {
  method: '',
  transactionId: '',
  type: '',
  remaining: '', // ✅ New field added
};

export default function App() {
  const [client, setClient] = useState(emptyClient);
  const [services, setServices] = useState([{ ...emptyService }]);
  const [payment, setPayment] = useState(emptyPayment);
  const [invoiceDate] = useState(new Date().toISOString().slice(0, 10));

  const handleClientChange = (e) =>
    setClient({ ...client, [e.target.name]: e.target.value });

  const handlePaymentChange = (e) =>
    setPayment({ ...payment, [e.target.name]: e.target.value });

  const handleServiceChange = (idx, field, value) => {
    setServices((prev) => {
      const next = [...prev];
      next[idx] = { ...next[idx], [field]: value };

      const hours = parseFloat(next[idx].hours);
      const rate = parseFloat(next[idx].rate);
      if (!isNaN(hours) && !isNaN(rate)) {
        next[idx].total = (hours * rate).toFixed(2);
      }
      return next;
    });
  };

  const addService = () => setServices((prev) => [...prev, { ...emptyService }]);
  const removeService = (idx) =>
    setServices((prev) => (prev.length === 1 ? prev : prev.filter((_, i) => i !== idx)));

  const subtotal = services
    .reduce((sum, s) => sum + (parseFloat(s.total) || 0), 0)
    .toFixed(2);
  const grandTotal = subtotal;

  return (
    <div className="min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Invoice Generator</h1>

      {/* ---------- Branding & Creator Info Header ---------- */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Your Digital Front</h2>
            <p className="text-gray-600">A Professional Website That Welcomes & Converts Clients</p>
            <p className="mt-2 text-sm text-gray-500 italic">Presented by Tushar Gupta</p>
          </div>
          <div className="text-right">
            <p className="font-semibold text-gray-700">Tushar Gupta</p>
            <p className="text-sm text-gray-600">Software Developer</p>
            <p className="text-sm text-gray-600">📞 +91-9455196697</p>
            <p className="text-sm text-gray-600">🌐 tushar-portfolio-webapp.netlify.app</p>
            <img
              src="/qr-code.png"
              alt="QR to Portfolio"
              className="w-24 h-24 mt-2 inline-block"
            />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* --------------------- FORM --------------------- */}
        <div className="bg-white shadow rounded-lg p-6 space-y-6">
          {/* Client */}
          <section>
            <h2 className="text-xl font-semibold mb-2">Client Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="name" placeholder="Client Name" value={client.name} onChange={handleClientChange} className="w-full border border-gray-300 rounded px-2 py-1" />
              <input name="company" placeholder="Company Name" value={client.company} onChange={handleClientChange} className="w-full border border-gray-300 rounded px-2 py-1" />
              <input name="address" placeholder="Address" value={client.address} onChange={handleClientChange} className="md:col-span-2 w-full border border-gray-300 rounded px-2 py-1" />
              <input type="email" name="email" placeholder="Email" value={client.email} onChange={handleClientChange} className="w-full border border-gray-300 rounded px-2 py-1" />
              <input name="phone" placeholder="Phone" value={client.phone} onChange={handleClientChange} className="w-full border border-gray-300 rounded px-2 py-1" />
            </div>
          </section>

          {/* Services */}
          <section>
            <h2 className="text-xl font-semibold mb-2 flex items-center justify-between">
              Services
              <button onClick={addService} className="px-3 py-1 rounded bg-indigo-600 text-white">+ Add</button>
            </h2>
            {services.map((s, idx) => (
              <div key={idx} className="grid grid-cols-12 gap-2 mb-4 items-center">
                <input className="col-span-5 w-full border border-gray-300 rounded px-2 py-1" placeholder="Description" value={s.description} onChange={(e) => handleServiceChange(idx, 'description', e.target.value)} />
                <input className="col-span-2 w-full border border-gray-300 rounded px-2 py-1" type="number" placeholder="Hours" value={s.hours} onChange={(e) => handleServiceChange(idx, 'hours', e.target.value)} />
                <input className="col-span-2 w-full border border-gray-300 rounded px-2 py-1" type="number" placeholder="Rate" value={s.rate} onChange={(e) => handleServiceChange(idx, 'rate', e.target.value)} />
                <input className="col-span-2 w-full border border-gray-300 rounded px-2 py-1" type="number" placeholder="Total" value={s.total} onChange={(e) => handleServiceChange(idx, 'total', e.target.value)} />
                <button onClick={() => removeService(idx)} className="col-span-1 text-red-600 font-bold">✕</button>
              </div>
            ))}
          </section>

          {/* Payment */}
          <section>
            <h2 className="text-xl font-semibold mb-2">Payment Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="method" placeholder="Payment Method" value={payment.method} onChange={handlePaymentChange} className="w-full border border-gray-300 rounded px-2 py-1" />
              <input name="transactionId" placeholder="Transaction ID" value={payment.transactionId} onChange={handlePaymentChange} className="w-full border border-gray-300 rounded px-2 py-1" />
              <input name="type" placeholder="Payment Type (Advance / Mid / Final)" value={payment.type} onChange={handlePaymentChange} className="w-full border border-gray-300 rounded px-2 py-1" />
              <input name="remaining" placeholder="Remaining Payment" value={payment.remaining} onChange={handlePaymentChange} className="w-full border border-gray-300 rounded px-2 py-1" />
            </div>
          </section>

          {/* PDF Download */}
          <PDFDownloadLink
            document={
              <InvoicePDF
                invoiceDate={invoiceDate}
                client={client}
                services={services}
                payment={payment}
                subtotal={subtotal}
                grandTotal={grandTotal}
              />
            }
            fileName={`invoice-${client.name || 'client'}.pdf`}
            className="inline-block bg-indigo-600 text-white px-4 py-2 rounded"
          >
            {({ loading }) => (loading ? 'Generating PDF…' : 'Download PDF')}
          </PDFDownloadLink>
        </div>

        {/* ----------------- LIVE PREVIEW ---------------- */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Live Preview</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Client</h3>
              <p>{client.name}</p>
              <p>{client.company}</p>
              <p>{client.address}</p>
              <p>{client.email}</p>
              <p>{client.phone}</p>
            </div>

            <table className="w-full text-left border-t">
              <thead>
                <tr>
                  <th className="py-1">Service</th>
                  <th className="py-1">Hours</th>
                  <th className="py-1">Rate</th>
                  <th className="py-1">Total</th>
                </tr>
              </thead>
              <tbody>
                {services.map((s, i) => (
                  <tr key={i} className="border-t">
                    <td className="py-1">{s.description}</td>
                    <td className="py-1 text-right">{s.hours}</td>
                    <td className="py-1 text-right">{s.rate}</td>
                    <td className="py-1 text-right">{s.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="text-right space-y-1">
              <p>Subtotal: <span className="font-semibold">{subtotal}</span></p>
              <p className="text-lg">Grand Total: <span className="font-bold">{grandTotal}</span></p>
              <p>Payment: {payment.method}</p>
              <p>Transaction ID: {payment.transactionId}</p>
              <p>Payment Type: {payment.type}</p>
              <p>Remaining Payment: {payment.remaining}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
