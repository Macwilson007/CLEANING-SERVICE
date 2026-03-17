import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, Droplets } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const { user, userData, signInWithGoogle, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <Droplets className="h-8 w-8 text-blue-600" />
              <span className="font-bold text-xl text-gray-900 tracking-tight">CLEANING SERVICE</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Home</Link>
            <Link to="/book" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Book Now</Link>
            {userData?.role === 'admin' && (
              <Link to="/admin" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Admin</Link>
            )}
            
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500">Hi, {userData?.name?.split(' ')[0]}</span>
                <button 
                  onClick={logout}
                  className="text-sm font-medium text-gray-600 hover:text-red-600 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button 
                onClick={signInWithGoogle}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Sign In
              </button>
            )}
          </div>

          <div className="flex items-center md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md">Home</Link>
            <Link to="/book" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md">Book Now</Link>
            {userData?.role === 'admin' && (
              <Link to="/admin" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md">Admin</Link>
            )}
            {user ? (
              <button 
                onClick={logout}
                className="block w-full text-left px-3 py-2 text-base font-medium text-red-600 hover:bg-gray-50 rounded-md"
              >
                Logout
              </button>
            ) : (
              <button 
                onClick={signInWithGoogle}
                className="block w-full text-left px-3 py-2 text-base font-medium text-blue-600 hover:bg-gray-50 rounded-md"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
