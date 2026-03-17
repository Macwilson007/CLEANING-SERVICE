import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Clock, Loader2, CheckCircle2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

export default function Booking() {
  const { user, userData, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    serviceType: 'Residential Cleaning',
    date: '',
    time: '09:00',
    address: '',
  });
  
  const [loading, setLoading] = useState(false);
  const [verifyingAddress, setVerifyingAddress] = useState(false);
  const [addressContext, setAddressContext] = useState<string | null>(null);
  const [mapLinks, setMapLinks] = useState<{uri: string, title: string}[]>([]);

  const verifyAddress = async () => {
    if (!formData.address) return;
    
    setVerifyingAddress(true);
    setAddressContext(null);
    setMapLinks([]);
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `I am booking a cleaning service at this address: "${formData.address}". Can you verify this location and provide any relevant context about the area or nearby landmarks?`,
        config: {
          tools: [{ googleMaps: {} }],
        }
      });
      
      setAddressContext(response.text || "Address verified.");
      
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      if (chunks) {
        const links: {uri: string, title: string}[] = [];
        chunks.forEach((chunk: any) => {
          if (chunk.maps?.uri) {
            links.push({ uri: chunk.maps.uri, title: chunk.maps.title || 'View on Maps' });
          }
        });
        setMapLinks(links);
      }
    } catch (error) {
      console.error("Error verifying address:", error);
      setAddressContext("Could not verify address automatically, but you can still proceed.");
    } finally {
      setVerifyingAddress(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !userData) {
      alert("Please sign in to book a service.");
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, 'bookings'), {
        userId: user.uid,
        userName: userData.name,
        serviceType: formData.serviceType,
        date: formData.date,
        time: formData.time,
        address: formData.address,
        status: 'pending',
        createdAt: serverTimestamp()
      });
      
      alert("Booking successful! We will contact you soon.");
      navigate('/');
    } catch (error) {
      console.error("Error creating booking:", error);
      alert("Failed to create booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Sign in to Book</h2>
          <p className="text-gray-600 mb-8">You need an account to book our professional cleaning services.</p>
          <button 
            onClick={signInWithGoogle}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors"
          >
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
          <div className="bg-blue-900 px-8 py-10 text-white">
            <h1 className="text-3xl font-bold mb-2">Book a Service</h1>
            <p className="text-blue-100">Fill out the form below and we'll take care of the rest.</p>
          </div>
          
          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Service Type</label>
                <select 
                  value={formData.serviceType}
                  onChange={(e) => setFormData({...formData, serviceType: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  required
                >
                  <option value="Residential Cleaning">Residential Cleaning</option>
                  <option value="Industrial Cleaning">Industrial Cleaning</option>
                  <option value="Facade Cleaning">Facade Cleaning</option>
                  <option value="Pest Control">Pest Control</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Calendar className="w-4 h-4" /> Date
                  </label>
                  <input 
                    type="date" 
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Clock className="w-4 h-4" /> Time
                  </label>
                  <input 
                    type="time" 
                    value={formData.time}
                    onChange={(e) => setFormData({...formData, time: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> Service Address
                </label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    placeholder="Enter your full address"
                    className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={verifyAddress}
                    disabled={verifyingAddress || !formData.address}
                    className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors disabled:opacity-50 whitespace-nowrap flex items-center gap-2"
                  >
                    {verifyingAddress ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Verify'}
                  </button>
                </div>
                
                {addressContext && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm text-blue-900 whitespace-pre-wrap">{addressContext}</p>
                        {mapLinks.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {mapLinks.map((link, i) => (
                              <a 
                                key={i} 
                                href={link.uri} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-xs font-medium bg-white text-blue-700 px-3 py-1.5 rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors"
                              >
                                {link.title}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Confirm Booking'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
