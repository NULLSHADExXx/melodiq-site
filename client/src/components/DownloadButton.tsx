interface DownloadButtonProps {
  url: string;
  filename: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

/**
 * A download button that links directly to the file URL.
 * GitHub Releases serve files with correct filenames and Content-Disposition headers,
 * so no blob workaround is needed.
 */
export function DownloadButton({ url, filename, className, style, children }: DownloadButtonProps) {
  return (
    <a
      href={url}
      download={filename}
      className={className}
      style={style}
      rel="noopener"
    >
      {children}
    </a>
  );
}
