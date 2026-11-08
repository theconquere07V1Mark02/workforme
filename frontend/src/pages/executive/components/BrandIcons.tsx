import React from 'react';

interface IconProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function LinkedInIcon({ size = 20, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
      <rect width="24" height="24" rx="4" fill="#0A66C2" />
      <path
        d="M6.94 5a1.94 1.94 0 1 1 0 3.88 1.94 1.94 0 0 1 0-3.88ZM5.2 10.1h3.48V20H5.2V10.1Zm5.68 0h3.34v1.36h.05c.46-.88 1.6-1.8 3.3-1.8 3.52 0 4.18 2.32 4.18 5.33V20h-3.48v-4.48c0-1.07-.02-2.45-1.5-2.45-1.5 0-1.73 1.17-1.73 2.37V20h-3.48V10.1h.32Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function InstagramIcon({ size = 20, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
      <defs>
        <radialGradient id="igGrad" cx="30%" cy="107%" r="150%">
          <stop offset="0%" stopColor="#fdf497" />
          <stop offset="5%" stopColor="#fdf497" />
          <stop offset="45%" stopColor="#fd5949" />
          <stop offset="60%" stopColor="#d6249f" />
          <stop offset="90%" stopColor="#285AEB" />
        </radialGradient>
      </defs>
      <rect width="24" height="24" rx="6" fill="url(#igGrad)" />
      <path
        d="M12 6.87a5.13 5.13 0 1 0 0 10.26 5.13 5.13 0 0 0 0-10.26Zm0 8.44a3.31 3.31 0 1 1 0-6.62 3.31 3.31 0 0 1 0 6.62Zm6.53-8.77a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0ZM17.6 3H6.4A3.4 3.4 0 0 0 3 6.4v11.2A3.4 3.4 0 0 0 6.4 21h11.2a3.4 3.4 0 0 0 3.4-3.4V6.4A3.4 3.4 0 0 0 17.6 3Zm1.58 14.6a1.58 1.58 0 0 1-1.58 1.58H6.4a1.58 1.58 0 0 1-1.58-1.58V6.4A1.58 1.58 0 0 1 6.4 4.82h11.2A1.58 1.58 0 0 1 19.18 6.4v11.2Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function GitHubIcon({ size = 20, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#FFFFFF" style={style}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z"
      />
    </svg>
  );
}

export function XTwitterIcon({ size = 20, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#FFFFFF" style={style}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function SnapchatIcon({ size = 20, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
      <rect width="24" height="24" rx="5" fill="#FFFC00" />
      <path
        d="M12.03 4.5c-2.47 0-4.14 1.76-4.14 4.22 0 .68.17 1.72.48 2.38-.66.19-1.27.52-1.27 1.13 0 .44.35.81.93.92-.09.39-.41 1.72-1.46 2.05-.33.1-.56.32-.56.59 0 .44.57.77 1.33.87.52.07 1.07.02 1.54-.18.42-.18.8-.46 1.16-.76.54.42 1.19.68 1.97.68.78 0 1.43-.26 1.97-.68.36.3.74.58 1.16.76.47.2 1.02.25 1.54.18.76-.1 1.33-.43 1.33-.87 0-.27-.23-.49-.56-.59-1.05-.33-1.37-1.66-1.46-2.05.58-.11.93-.48.93-.92 0-.61-.61-.94-1.27-1.13.31-.66.48-1.7.48-2.38 0-2.46-1.67-4.22-4.11-4.22Z"
        fill="#000000"
      />
    </svg>
  );
}

export function FacebookIcon({ size = 20, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
      <rect width="24" height="24" rx="4" fill="#1877F2" />
      <path
        d="M16.5 12.5H13.8V21H10.2V12.5H8.5V9.5h1.7V7.5c0-2.3 1.4-3.5 3.5-3.5 1 0 1.9.1 2.1.1v2.5h-1.4c-1.1 0-1.4.5-1.4 1.3v1.6h2.7l-.4 3Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function UpworkIcon({ size = 20, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
      <rect width="24" height="24" rx="4" fill="#14A800" />
      <path
        d="M18.56 12.02c-.81 0-1.54.37-2.01.95l-.17.21c-.32-.98-.67-2.1-1.02-3.15h2.17c.56 0 1.02-.46 1.02-1.02s-.46-1.02-1.02-1.02h-2.9c-.31-.95-.62-1.84-.73-2.19-.13-.43-.45-.72-.9-.72s-.77.29-.9.72c-.22.75-.82 2.5-1.3 4.21h-2.2c-.56 0-1.02.46-1.02 1.02s.46 1.02 1.02 1.02h1.66c-.4 1.41-.75 2.76-.75 3.86 0 1.9 1.15 3.1 2.87 3.1 1.74 0 2.86-1.21 2.86-3.1 0-.3-.03-.6-.08-.91.46.75 1.25 1.27 2.22 1.27 1.54 0 2.78-1.28 2.78-2.85s-1.23-2.85-2.77-2.85zm-4.8 3.89c0 .88-.47 1.43-1.19 1.43-.73 0-1.19-.55-1.19-1.43 0-.74.25-1.84.58-3.05.32-.99.64-1.97.94-2.88.58 2.06.86 4.3.86 5.93zm4.8 1.13c-.62 0-1.12-.51-1.12-1.13 0-.63.5-1.13 1.12-1.13.62 0 1.12.5 1.12 1.13s-.5 1.13-1.12 1.13z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function IndeedIcon({ size = 20, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
      <rect width="24" height="24" rx="4" fill="#003A9B" />
      <path
        d="M13.64 6.82c0-.98-.79-1.78-1.77-1.78s-1.77.8-1.77 1.78c0 .99.79 1.78 1.77 1.78s1.77-.79 1.77-1.78Zm-3.54 3.7h3.54v8.44H10.1v-8.44Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function DiscordIcon({ size = 20, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
      <rect width="24" height="24" rx="4" fill="#5865F2" />
      <path
        d="M17.47 7.23a13.3 13.3 0 0 0-3.3-1.02.13.13 0 0 0-.14.07c-.14.26-.3.59-.41.85-1.25-.19-2.5-.19-3.74 0-.11-.26-.28-.59-.42-.85a.14.14 0 0 0-.14-.07c-1.14.23-2.25.58-3.3 1.02-.02 0-.03.02-.04.03-2.12 3.16-2.7 6.24-2.42 9.28 0 .02.02.04.03.05a13.4 13.4 0 0 0 4.07 2.05.14.14 0 0 0 .15-.05c.31-.43.59-.89.83-1.37.01-.03 0-.06-.03-.07-.66-.25-1.28-.56-1.87-.93a.13.13 0 0 1-.02-.18c.13-.09.25-.19.37-.29.02-.02.05-.02.07-.01 2.65 1.21 5.52 1.21 8.14 0 .03-.01.05 0 .07.01.12.1.25.2.37.29a.14.14 0 0 1-.01.18c-.59.37-1.21.68-1.87.93a.13.13 0 0 0-.03.07c.24.48.52.94.83 1.37.04.05.1.07.15.05 1.38-.56 2.76-1.26 4.07-2.05.02-.01.03-.03.03-.05.34-3.52-.56-6.58-2.42-9.28 0-.01-.02-.03-.04-.03ZM9.3 14.1c-.8 0-1.46-.73-1.46-1.63s.64-1.63 1.46-1.63c.82 0 1.48.74 1.46 1.63 0 .9-.64 1.63-1.46 1.63Zm5.4 0c-.8 0-1.46-.73-1.46-1.63s.64-1.63 1.46-1.63c.82 0 1.48.74 1.46 1.63 0 .9-.64 1.63-1.46 1.63Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function YouTubeIcon({ size = 20, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
      <rect width="24" height="24" rx="4" fill="#FF0000" />
      <path
        d="M18.8 8.42c-.22-.84-.87-1.5-1.7-1.72-1.5-.4-7.5-.4-7.5-.4s-6 0-7.5.4c-.83.22-1.48.88-1.7 1.72-.4 1.52-.4 4.7-.4 4.7s0 3.18.4 4.7c.22.84.87 1.5 1.7 1.72 1.5.4 7.5.4 7.5.4s6 0 7.5-.4c.83-.22 1.48-.88 1.7-1.72.4-1.52.4-4.7.4-4.7s0-3.18-.4-4.7ZM10.5 15.1V9.9l4.5 2.6-4.5 2.6Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function SupabaseIcon({ size = 20, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
      <path
        d="M13.4 2.1c-.5-.7-1.6-.4-1.7.5l-1.3 7.6h-7c-.8 0-1.3.9-.9 1.6l8.8 10.1c.5.6 1.5.3 1.6-.5l1.3-7.6h7c.8 0 1.3-.9.9-1.6L13.4 2.1Z"
        fill="#3ECF8E"
      />
    </svg>
  );
}

export function RenderIcon({ size = 20, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
      <path
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm-1 14.5v-9l7 4.5-7 4.5Z"
        fill="#46E3B7"
      />
    </svg>
  );
}

export function NetlifyIcon({ size = 20, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
      <path
        d="M12.56 2.14a.75.75 0 0 0-1.12 0L2.14 11.44a.75.75 0 0 0 0 1.12l9.3 9.3a.75.75 0 0 0 1.12 0l9.3-9.3a.75.75 0 0 0 0-1.12l-9.3-9.3ZM12 4.41l7.59 7.59L12 19.59 4.41 12 12 4.41Z"
        fill="#00C7B7"
      />
    </svg>
  );
}

export function GoogleCloudIcon({ size = 20, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
      <path
        d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96ZM19 18H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3Z"
        fill="#4285F4"
      />
    </svg>
  );
}

export function DigiLockerIcon({ size = 20, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
      <rect width="24" height="24" rx="4" fill="#0072C6" />
      <path
        d="M12 4a4 4 0 0 0-4 4v3H7a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1h-1V8a4 4 0 0 0-4-4Zm-2 4a2 2 0 1 1 4 0v3h-4V8Zm2 7a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function AadhaarIcon({ size = 20, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
      <circle cx="12" cy="12" r="10" fill="#E65100" />
      <circle cx="12" cy="12" r="6" fill="#FFFFFF" />
      <circle cx="12" cy="12" r="3" fill="#1565C0" />
    </svg>
  );
}
