function IconBase({ children, size = 22, className = "" }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      {children}
    </svg>
  );
}

export function HomeIcon(props) {
  return (
    <IconBase {...props}>
      <path
        d="M3.8 10.5 12 3.7l8.2 6.8v8.7a1.8 1.8 0 0 1-1.8 1.8H5.6a1.8 1.8 0 0 1-1.8-1.8v-8.7Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
      <path d="M9 21v-6h6v6" stroke="currentColor" strokeWidth="1.8" />
    </IconBase>
  );
}

export function ArchiveIcon(props) {
  return (
    <IconBase {...props}>
      <path
        d="M6 3.5h9.5L19 7v13.5H6V3.5Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
      <path d="M15 3.5V7h4M9 11h7M9 15h7" stroke="currentColor" strokeWidth="1.8" />
    </IconBase>
  );
}

export function PillIcon(props) {
  return (
    <IconBase {...props}>
      <path
        d="M7.1 18.9a4.6 4.6 0 0 1 0-6.5l5.3-5.3a4.6 4.6 0 1 1 6.5 6.5l-5.3 5.3a4.6 4.6 0 0 1-6.5 0Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path d="m9.6 10 4.4 4.4" stroke="currentColor" strokeWidth="1.8" />
    </IconBase>
  );
}

export function ChatIcon(props) {
  return (
    <IconBase {...props}>
      <path
        d="M4 5.2h16v11.3H9l-5 4v-15.3Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
      <path d="M8 9h8M8 12.5h5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </IconBase>
  );
}

export function MoonLogIcon(props) {
  return (
    <IconBase {...props}>
      <path
        d="M19 15.7A8 8 0 0 1 8.3 5a7.8 7.8 0 1 0 10.7 10.7Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
      <path d="M14.5 5.5h5M17 3v5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </IconBase>
  );
}

export function AlertIcon(props) {
  return (
    <IconBase {...props}>
      <path
        d="M12 3 2.8 20h18.4L12 3Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
      <path d="M12 9v5M12 17.2v.1" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
    </IconBase>
  );
}

export function ReportIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M5 20V4h14v16H5Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.8" />
      <path d="M8.5 15v-3M12 15V8M15.5 15v-5M8 18h8" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </IconBase>
  );
}

export function ChevronLeftIcon(props) {
  return (
    <IconBase {...props}>
      <path d="m15 5-7 7 7 7" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </IconBase>
  );
}

export function ChevronRightIcon(props) {
  return (
    <IconBase {...props}>
      <path d="m9 5 7 7-7 7" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </IconBase>
  );
}

export function ClockIcon(props) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 7v5l3 2" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </IconBase>
  );
}

export function CheckIcon(props) {
  return (
    <IconBase {...props}>
      <path d="m5 12.5 4.2 4.2L19 7" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" />
    </IconBase>
  );
}

export function DownloadIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M12 3v11M8 10l4 4 4-4M5 20h14" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </IconBase>
  );
}

export function UserDoctorIcon(props) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="7" r="3.2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M5.5 20c.5-4 2.7-6 6.5-6s6 2 6.5 6" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
      <path d="M18 3v4M16 5h4" stroke="currentColor" strokeLinecap="round" strokeWidth="1.6" />
    </IconBase>
  );
}

export function PlusIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
    </IconBase>
  );
}
