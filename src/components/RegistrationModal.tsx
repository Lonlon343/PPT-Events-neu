'use client';

import { useActionState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { registerForEvent, type RegistrationState } from '@/actions/registerEvent';
import confetti from 'canvas-confetti';
import { EventRegistrationSummary } from '@/components/EventRegistrationSummary';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: {
    id: string;
    title: string;
    dateFull: string;
    time: string;
    location: string;
  };
}

const initialState: RegistrationState = { status: 'idle' };

function FieldError({ errors }: { errors?: string[] }) {
  if (!errors?.length) return null;
  return <p className="mt-1 text-xs text-red-400">{errors[0]}</p>;
}

export function RegistrationModal({ isOpen, onClose, event }: RegistrationModalProps) {
  const [state, action, isPending] = useActionState(registerForEvent, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  // Confetti + scroll lock
  useEffect(() => {
    if (state.status === 'success') {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#00325B', '#F018D5', '#ffffff'],
      });
    }
  }, [state.status]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      // Reset form when closed
      formRef.current?.reset();
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const fieldErrors = state.status === 'error' ? state.fieldErrors : undefined;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: 'spring', bounce: 0.3, duration: 0.5 }}
              className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div
                className="px-8 pt-8 pb-6 rounded-t-3xl text-white"
                style={{ background: 'linear-gradient(135deg, #00325B 0%, #00325B 60%, #1a0040 100%)' }}
              >
                <button
                  onClick={onClose}
                  className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                  aria-label="Schließen"
                >
                  <X size={18} />
                </button>
                <p className="text-[#F018D5] font-bold uppercase tracking-widest text-xs mb-2">
                  Veranstaltung
                </p>
                <h2 className="text-xl font-extrabold leading-tight mb-4">{event.title}</h2>
                <EventRegistrationSummary
                  dateFull={event.dateFull}
                  time={event.time}
                  location={event.location}
                />
              </div>

              {/* Body */}
              <div className="px-8 py-6">
                <AnimatePresence mode="wait">
                  {state.status === 'success' ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="py-8 text-center"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', bounce: 0.5, delay: 0.1 }}
                        className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4"
                      >
                        <CheckCircle2 size={40} className="text-green-500" />
                      </motion.div>
                      <h3 className="text-ppt-blue text-xl font-extrabold mb-3">Anmeldung erfolgreich!</h3>
                      <p className="text-zinc-500 leading-relaxed mb-6">{state.message}</p>
                      <button
                        onClick={onClose}
                        className="bg-ppt-blue text-white font-bold py-3 px-8 rounded-full hover:bg-ppt-blue/90 transition-transform hover:scale-105"
                      >
                        Schließen
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <h3 className="text-ppt-blue font-extrabold text-lg mb-1">Jetzt anmelden</h3>
                      <p className="text-zinc-500 text-sm mb-6">Sichere dir deinen Platz – kostenlos & unverbindlich.</p>

                      {state.status === 'error' && !fieldErrors && (
                        <div className="flex items-start gap-3 bg-red-50 border border-red-100 rounded-xl p-4 mb-4">
                          <AlertCircle size={18} className="text-red-500 shrink-0 mt-0.5" />
                          <p className="text-red-600 text-sm">{state.message}</p>
                        </div>
                      )}

                      <form ref={formRef} action={action} className="space-y-4">
                        <input type="hidden" name="eventId" value={event.id} />

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-ppt-blue mb-1.5 uppercase tracking-wide">
                              Vorname *
                            </label>
                            <input
                              name="firstName"
                              required
                              placeholder="Max"
                              className={`w-full px-4 py-3 rounded-xl border text-ppt-blue placeholder:text-zinc-400 outline-none transition-all focus:ring-2 focus:ring-ppt-pink/20 focus:border-ppt-pink ${fieldErrors?.firstName ? 'border-red-300 bg-red-50' : 'border-zinc-200 bg-zinc-50'}`}
                            />
                            <FieldError errors={fieldErrors?.firstName} />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-ppt-blue mb-1.5 uppercase tracking-wide">
                              Nachname *
                            </label>
                            <input
                              name="lastName"
                              required
                              placeholder="Mustermann"
                              className={`w-full px-4 py-3 rounded-xl border text-ppt-blue placeholder:text-zinc-400 outline-none transition-all focus:ring-2 focus:ring-ppt-pink/20 focus:border-ppt-pink ${fieldErrors?.lastName ? 'border-red-300 bg-red-50' : 'border-zinc-200 bg-zinc-50'}`}
                            />
                            <FieldError errors={fieldErrors?.lastName} />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-ppt-blue mb-1.5 uppercase tracking-wide">
                            E-Mail *
                          </label>
                          <input
                            name="email"
                            type="email"
                            required
                            placeholder="max@beispiel.de"
                            className={`w-full px-4 py-3 rounded-xl border text-ppt-blue placeholder:text-zinc-400 outline-none transition-all focus:ring-2 focus:ring-ppt-pink/20 focus:border-ppt-pink ${fieldErrors?.email ? 'border-red-300 bg-red-50' : 'border-zinc-200 bg-zinc-50'}`}
                          />
                          <FieldError errors={fieldErrors?.email} />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-ppt-blue mb-1.5 uppercase tracking-wide">
                            Firma <span className="text-zinc-400 font-normal normal-case">(optional)</span>
                          </label>
                          <input
                            name="company"
                            placeholder="Muster GmbH"
                            className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50 text-ppt-blue placeholder:text-zinc-400 outline-none transition-all focus:ring-2 focus:ring-ppt-pink/20 focus:border-ppt-pink"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-ppt-blue mb-1.5 uppercase tracking-wide">
                            Nachricht <span className="text-zinc-400 font-normal normal-case">(optional)</span>
                          </label>
                          <textarea
                            name="message"
                            rows={3}
                            placeholder="Fragen oder Anmerkungen..."
                            className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50 text-ppt-blue placeholder:text-zinc-400 outline-none transition-all focus:ring-2 focus:ring-ppt-pink/20 focus:border-ppt-pink resize-none"
                          />
                        </div>

                        <p className="text-xs text-zinc-400">
                          Mit der Anmeldung stimmst du zu, dass wir deine Daten zur Veranstaltungsorganisation verwenden.
                        </p>

                        <button
                          type="submit"
                          disabled={isPending}
                          className="w-full bg-ppt-pink text-white font-bold py-4 px-8 rounded-xl uppercase tracking-wider transition-all hover:bg-ppt-pink/90 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(240,24,213,0.3)]"
                        >
                          {isPending ? (
                            <>
                              <Loader2 size={18} className="animate-spin" />
                              Wird angemeldet…
                            </>
                          ) : (
                            'Jetzt anmelden'
                          )}
                        </button>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
