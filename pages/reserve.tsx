import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Users, CreditCard, CheckCircle, Award } from 'lucide-react';

const steps = ["Experience", "Date & Time", "Details & Payment", "Confirmation"];

// Mock Data
const ritual = {
  id: 'cena-romantica',
  title: 'Cena Romántica Frente al Chef',
  description: 'Una experiencia exclusiva para dos con vista directa a la acción de nuestra cocina. Incluye un menú degustación de 5 tiempos y una botella de vino.',
  price: 75.00, // por persona
  image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1974&auto=format&fit=crop',
};

export default function ReserveFlow() {
  const [step, setStep] = useState(0);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const nextStep = () => setStep(s => Math.min(s + 1, steps.length - 1));
  const prevStep = () => setStep(s => Math.max(s - 1, 0));

  const today = new Date();
  const fridays = Array.from({ length: 4 }).map((_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() + (5 - today.getDay() + 7) % 7 + (i * 7));
    return date;
  });

  const times = ["6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM"];

  const containerVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  return (
    <div className="min-h-screen bg-abyssal-blue text-ivory-white flex items-center justify-center p-4">
      <div className="w-full max-w-4xl mx-auto bg-[#161b22] border border-ivory-white/10 rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden">
        
        {/* Left Panel / Image */}
        <div className="w-full md:w-1/3 relative">
          <img src={ritual.image} alt={ritual.title} className="w-full h-48 md:h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-abyssal-blue to-transparent md:bg-gradient-to-r"></div>
          <div className="absolute bottom-0 left-0 p-6">
            <h2 className="text-2xl font-bold">{ritual.title}</h2>
            <p className="text-ivory-white/70 mt-2 font-serif">{ritual.description}</p>
          </div>
        </div>

        {/* Right Panel / Flow */}
        <div className="w-full md:w-2/3 p-8 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            {step > 0 && (
              <button onClick={prevStep} className="flex items-center gap-2 text-ivory-white/70 hover:text-ivory-white">
                <ArrowLeft size={16} /> Regresar
              </button>
            )}
            <div className="text-sm text-ivory-white/50">Paso {step + 1} de {steps.length}</div>
          </div>
          
          <h3 className="text-2xl font-bold text-sunset-gold mb-6">{steps[step]}</h3>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="flex-grow"
            >
              {step === 0 && (
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <Users className="text-sunset-gold" />
                    <div>
                      <p className="font-bold">2 Invitados</p>
                      <p className="text-sm text-ivory-white/70">Esta experiencia es para dos personas.</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <CreditCard className="text-sunset-gold" />
                    <div>
                      <p className="font-bold">${ritual.price.toFixed(2)} por persona</p>
                      <p className="text-sm text-ivory-white/70">Pago en línea requerido para confirmar.</p>
                    </div>
                  </div>
                  <button onClick={nextStep} className="w-full mt-8 bg-sunset-gold text-abyssal-blue font-bold py-3 rounded-lg hover:bg-yellow-300 transition-colors">
                    Elegir Fecha
                  </button>
                </div>
              )}

              {step === 1 && (
                <div>
                  <p className="mb-4 font-serif text-ivory-white/80">Selecciona un viernes disponible:</p>
                  <div className="grid grid-cols-2 gap-4">
                    {fridays.map(date => (
                      <button 
                        key={date.toString()} 
                        onClick={() => { setSelectedDate(date); nextStep(); }}
                        className="p-4 border border-ivory-white/20 rounded-lg text-center hover:bg-ivory-white/10 transition-colors"
                      >
                        <p className="font-bold">{date.toLocaleDateString('es-ES', { weekday: 'long' })}</p>
                        <p>{date.toLocaleDateString('es-ES', { day: '2-digit', month: 'long' })}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <p className="mb-4 font-serif text-ivory-white/80">
                    Tu ritual es para el <span className="text-sunset-gold font-bold">{selectedDate?.toLocaleDateString('es-ES', { weekday: 'long', day: '2-digit', month: 'long' })}</span>.
                  </p>
                  <p className="mb-4 font-serif text-ivory-white/80">Selecciona la hora:</p>
                  <div className="grid grid-cols-4 gap-2 mb-6">
                    {times.map(time => (
                      <button 
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`p-2 rounded-md transition-colors ${selectedTime === time ? 'bg-sunset-gold text-abyssal-blue' : 'bg-ivory-white/10 hover:bg-ivory-white/20'}`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>

                  {selectedTime && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <h4 className="font-bold mb-2">Tus Datos</h4>
                      <input type="text" placeholder="Nombre Completo" value={name} onChange={e => setName(e.target.value)} className="w-full bg-abyssal-blue border border-ivory-white/20 p-3 rounded-md mb-2 focus:ring-2 focus:ring-sunset-gold outline-none" />
                      <input type="email" placeholder="Correo Electrónico" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-abyssal-blue border border-ivory-white/20 p-3 rounded-md mb-4 focus:ring-2 focus:ring-sunset-gold outline-none" />
                      
                      <h4 className="font-bold mb-2">Pago (Simulado)</h4>
                      <div className="w-full bg-abyssal-blue border border-ivory-white/20 p-3 rounded-md mb-4 text-ivory-white/50">
                        [Componente simulado de Stripe Elements]
                      </div>
                      
                      <button onClick={nextStep} disabled={!name || !email} className="w-full bg-sunset-gold text-abyssal-blue font-bold py-3 rounded-lg hover:bg-yellow-300 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed">
                        Sellar el Ritual - Pagar ${(ritual.price * 2).toFixed(2)}
                      </button>
                    </motion.div>
                  )}
                </div>
              )}

              {step === 3 && (
                <div className="text-center flex flex-col items-center justify-center h-full">
                  <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}>
                    <CheckCircle className="text-green-400 mx-auto" size={64} />
                  </motion.div>
                  <h2 className="text-3xl font-bold mt-4">¡Ritual Confirmado!</h2>
                  <p className="mt-2 text-ivory-white/80 font-serif">Te esperamos, {name}. Hemos enviado los detalles a {email}.</p>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="mt-8 p-4 border-2 border-dashed border-sunset-gold rounded-lg bg-sunset-gold/10 w-full"
                  >
                    <div className="flex items-center gap-4">
                      <Award size={40} className="text-sunset-gold" />
                      <div>
                        <p className="font-bold text-sunset-gold">LOGRO DESBLOQUEADO</p>
                        <p className="text-sm font-serif">Primer Viaje: ¡Bienvenido a la familia!</p>
                      </div>
                    </div>
                  </motion.div>
                   <a href="/" className="mt-6 text-sunset-gold hover:underline">Volver al Inicio</a>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}