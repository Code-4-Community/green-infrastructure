export default function generateGreenRoofPlanterSVG(hovered: boolean) {
  let color: string;
  if (hovered) {
    color = '#FFFDFD';
  } else {
    color = '#091F2F';
  }

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
        strokeWidth="2"
      />
      <path
        d="M24.8315 17.6301L22.501 24H16.3914L13.2328 17.5865L19.0974 12.3499L24.8315 17.6301Z"
        fill={color}
        stroke={color}
        strokeWidth="2"
      />
    </svg>
  );
}
