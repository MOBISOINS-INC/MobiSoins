'use client';

import { Plus } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

/* ─── Disclosure ───────────────────────────────────────────────────────────
   One expandable Q&A row, shared by the landing FAQ (six booking-blocking
   questions) and the full /faq page (all eight, grouped by theme).

   The accessibility wiring is the reason this is a component rather than
   copied markup: the toggle is a real disclosure with aria-expanded and
   aria-controls, and the panel is UNMOUNTED when closed rather than
   zero-height — a collapsed overflow-hidden panel is still reachable by
   screen readers and still in the tab order. AnimatePresence keeps the
   collapse animation despite the unmount.
   ---------------------------------------------------------------------- */

interface DisclosureProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  /** Must be unique per row across the page — callers pass a useId()-derived value. */
  id: string;
}

export function Disclosure({ question, answer, isOpen, onToggle, id }: DisclosureProps) {
  const panelId = `faq-panel-${id}`;
  const buttonId = `faq-button-${id}`;

  return (
    <div className="ms-rule border-b">
      <h3>
        <button
          type="button"
          id={buttonId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className="group w-full py-5 sm:py-6 flex items-start justify-between gap-6 text-left cursor-pointer"
        >
          <span className="ms-item-title transition-colors group-hover:text-sage">
            {question}
          </span>
          <Plus
            className="w-[18px] h-[18px] mt-0.5 shrink-0 text-ink-3 transition-transform duration-300 ease-out"
            style={{ transform: isOpen ? 'rotate(45deg)' : 'none' }}
            strokeWidth={2}
            aria-hidden="true"
          />
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="ms-body pb-6 pr-6 max-w-[62ch]">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
