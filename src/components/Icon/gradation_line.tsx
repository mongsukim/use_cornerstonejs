const GradationLine = () => {
  return (
    <svg
      width="355"
      height="2"
      viewBox="0 0 355 2"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        y="0.667969"
        width="355"
        height="1"
        fill="url(#paint0_radial_8833_1040)"
      />
      <rect
        y="0.667969"
        width="355"
        height="1"
        fill="url(#paint1_radial_8833_1040)"
        fillOpacity="0.3"
      />
      <rect
        y="0.667969"
        width="355"
        height="1"
        fill="url(#paint2_radial_8833_1040)"
        fillOpacity="0.4"
      />
      <defs>
        <radialGradient
          id="paint0_radial_8833_1040"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(41.6318 0.864124) rotate(0.108923) scale(356.076 162.039)"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <radialGradient
          id="paint1_radial_8833_1040"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(188.258 1.32736) rotate(-170.749) scale(3.70577 34.0109)"
        >
          <stop stopColor="#151515" />
          <stop offset="1" stopOpacity="0" />
        </radialGradient>
        <radialGradient
          id="paint2_radial_8833_1040"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(346.179 1.49874) rotate(-179.882) scale(294.436 134.056)"
        >
          <stop stopColor="#B2BAFF" />
          <stop offset="1" stopColor="#B2BAFF" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
};

export default GradationLine;
