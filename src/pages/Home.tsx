import { ArrowRight, CheckCircle2, Sparkles, ShieldCheck, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Home() {
  const services = [
    {
      title: 'Industrial Cleaning',
      description: 'Comprehensive cleaning solutions for factories, warehouses, and industrial facilities.',
      icon: <Sparkles className="h-8 w-8 text-blue-600" />
    },
    {
      title: 'Facade Cleaning',
      description: 'Professional exterior building cleaning, restoring the pristine look of your property.',
      icon: <ShieldCheck className="h-8 w-8 text-blue-600" />
    },
    {
      title: 'Pest Control',
      description: 'Advanced pest management solutions to keep your environment safe and hygienic.',
      icon: <CheckCircle2 className="h-8 w-8 text-blue-600" />
    },
    {
      title: 'Residential Cleaning',
      description: 'Deep cleaning services for homes, ensuring a spotless and healthy living space.',
      icon: <Clock className="h-8 w-8 text-blue-600" />
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-blue-900 text-white py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
              Experience the Future of <span className="text-blue-400">Cleaning</span>
            </h1>
            <p className="text-xl text-blue-100 mb-10 leading-relaxed">
              Trusted cleaning services company offering professional cleaning, hygiene products, and pest management solutions.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/book" 
                className="bg-white text-blue-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transition-colors flex items-center gap-2"
              >
                Book a Service <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Professional Services</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We have dedication to providing outstanding customer service and quality finished results.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="bg-blue-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <img 
              src="https://i.pinimg.com/1200x/69/b3/6f/69b36fbfbbec3ca767a5cd86a99bc08f.jpg" 
              alt="Cleaning Team" 
              className="rounded-3xl shadow-2xl object-cover w-full h-[400px]"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Your Trusted Partner in Cleanliness</h2>
            <p className="text-lg text-gray-600 mb-8">
              With over 30 years of industry expertise, we focus on the entire process, from concept through completion.
            </p>
            <ul className="space-y-6">
              {[
                'Honesty & Commitment in every job',
                'Strict Quality Policy & Service Standards',
                'Health, Safety & Environmental Policy compliance',
                'Innovative Technologies & Equipment'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <CheckCircle2 className="h-6 w-6 text-green-500 shrink-0" />
                  <span className="text-gray-700 font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
