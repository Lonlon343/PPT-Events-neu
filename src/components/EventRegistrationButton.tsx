'use client';

type EventRegistrationButtonProps = {
  onClick: () => void;
  label?: string;
};

export function EventRegistrationButton({
  onClick,
  label = 'Jetzt anmelden',
}: EventRegistrationButtonProps) {
  return (
    <button
      onClick={onClick}
      className="rounded-full bg-ppt-pink px-6 py-3 text-xs font-bold uppercase tracking-wide text-white transition-transform hover:scale-105"
    >
      {label}
    </button>
  );
}
