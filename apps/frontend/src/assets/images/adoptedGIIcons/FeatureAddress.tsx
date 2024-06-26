export default function generateFeatureAddress() {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <circle
        cx="20"
        cy="20"
        r="18.5"
        fill="#FFFDFD"
        stroke="black"
        stroke-width="3"
      />
      <rect
        x="10"
        y="10"
        width="20"
        height="20"
        fill="url(#pattern0_1070_49)"
      />
      <defs>
        <pattern
          id="pattern0_1070_49"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_1070_49" transform="scale(0.005)" />
        </pattern>
        <image
          id="image0_1070_49"
          width="200"
          height="200"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
}
