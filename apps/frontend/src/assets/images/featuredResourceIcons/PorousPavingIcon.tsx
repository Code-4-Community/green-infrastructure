export default function generatePorousPavingSVG(color: string) {
  return (
    <svg
      width="50"
      height="50"
      viewBox="0 0 38 39"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M37 19.5C37 29.7419 28.9168 38 19 38C9.0832 38 1 29.7419 1 19.5C1 9.25809 9.0832 1 19 1C28.9168 1 37 9.25809 37 19.5Z"
        stroke={color}
        stroke-width="2"
      />
      <path
        d="M13.4142 18L19 12.4142L24.5858 18L19 23.5858L13.4142 18Z"
        fill={color}
        stroke={color}
        stroke-width="2"
      />
    </svg>
  );
}
