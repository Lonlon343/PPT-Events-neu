"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "Was sollte ich tun, wenn ich mich verspäte?",
    answer:
      "Grundsätzlich solltest du pünktlich zur Veranstaltung erscheinen. Solltest du es dennoch einmal nicht pünktlich schaffen, bitten wir dich deinen Ansprechpartner umgehend darüber zu informieren. Sollte deine Verspätung „ein paar Minuten\" überschreiten, ist das gar nicht schlimm, denn gewisse Veranstaltungen bieten wir regelmäßig an, sodass du dir direkt einen Platz in der darauffolgenden Veranstaltung sichern kannst.",
  },
  {
    question: "Muss meine Kamera eingeschaltet sein?",
    answer:
      "Da wir in den Austausch gehen und es möglichst hochwertig und interaktiv gestalten wollen, bitten wir dich die Kamera einzuschalten. Die Referenten behalten sich den Ausschluss von der jeweiligen Veranstaltung vor.",
  },
  {
    question: "Entstehen mir dabei Kosten?",
    answer:
      "Nein, dir entstehen keine Kosten für die Veranstaltungen, da sie ausschließlich informativen Charakter haben. Sollten für zukünftige Veranstaltungen Kosten entstehen, weisen wir dich ausdrücklich im Vorhinein darauf hin.",
  },
  {
    question: "Kann ich noch weitere Teilnehmer mitbringen?",
    answer:
      "Je nach Veranstaltung und verfügbaren Plätzen ist das problemlos möglich. Gib dafür am besten direkt deinem Ansprechpartner Bescheid, sodass wir die Person zuordnen können. Sie meldet sich danach genauso wie du über das jeweilige Anmeldeformular selbst an.",
  },
  {
    question: "Gibt es einen Dresscode?",
    answer:
      "Da wir die Veranstaltung so hochwertig wie möglich gestalten wollen und du im Optimalfall einige neue Impulse mitnehmen solltest, bitten wir dich auch um Angemessenheit was deine Kleidungswahl und die Örtlichkeit deiner Zuschaltung bei digitalen Events angeht.",
  },
  {
    question: "Was steckt hinter dem Namen PPT-Events?",
    answer:
      "Er hat zwar nichts mit der bekannten Präsentations-Software zu tun, setzt sich aber aus „Pars Pro Toto“ zusammen und meint „Teil des Ganzen“. Wir setzen uns aktiv für finanzielle Bildung ein und sehen dies als eines der wichtigsten Beiträge für unsere Gesellschaft an.",
  },
  {
    question: "Was bringt mir das?",
    answer:
      "Durch die sorgfältige Auswahl der Referenten sind wir fest davon überzeugt, dass wir dir einen möglichst großen Mehrwert in den jeweiligen Themen bieten können. Bestenfalls kannst du für dich etwas aus der gelernten Theorie erfolgreich in die Praxis umsetzen.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-[#00325B] text-white">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-ppt-pink font-bold uppercase tracking-widest text-center text-sm md:text-base mb-2"
        >
          FAQ
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-center mb-16"
        >
          Haben Sie noch Fragen?
        </motion.h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className={`border border-white/10 rounded-2xl overflow-hidden transition-colors duration-300 ${
                openIndex === index ? "bg-white/5" : "bg-transparent hover:bg-white/5"
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left px-6 py-6 flex items-center justify-between focus:outline-none"
              >
                <span className="font-bold text-lg pr-8">{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-ppt-pink shrink-0"
                >
                  <ChevronDown size={24} />
                </motion.div>
              </button>
              
              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 text-white/80 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
