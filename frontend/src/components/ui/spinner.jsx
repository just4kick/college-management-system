export function Spinner({ className }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 50"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="25" cy="25" r="20" className="opacity-25" />
      <circle
        cx="25"
        cy="25"
        r="20"
        className="opacity-75"
        strokeDasharray="126.92"
        strokeDashoffset="63.46"
      />
    </svg>
  );
}
