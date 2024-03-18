export default function generateTreeTrenchPlanterSVG(hovered: boolean) {
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
        stroke-width="2"
      />
      <path
        d="M19 15.2361L19.8451 17.8369L20.0696 18.5279H20.7961H23.5308L21.3184 20.1353L20.7306 20.5623L20.9551 21.2533L21.8002 23.8541L19.5878 22.2467L19 21.8197L18.4122 22.2467L16.1998 23.8541L17.0449 21.2533L17.2694 20.5623L16.6816 20.1353L14.4692 18.5279H17.2039H17.9304L18.1549 17.8369L19 15.2361Z"
        fill={color}
        stroke={color}
        stroke-width="2"
      />
    </svg>
  );
}
