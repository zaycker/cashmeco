require('./marker.css');

const svgTemplate = `
<svg xmlns="http://www.w3.org/2000/svg" style="width:0;height:0;">
  <defs>
    <linearGradient id="marker-stroke-gradient" x1="0" y1="0" x2="0" y2="103" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#ddd"/>
      <stop offset="1" stop-color="#fff"/>
    </linearGradient>
    <linearGradient id="marker-fill-gradient" x1="0" y1="0" x2="0" y2="103" gradientUnits="userSpaceOnUse">
      <stop offset="40%" stop-color="rgb(255,255,255)" />
      <stop offset="90%" stop-color="rgb(215,215,215)" />
    </linearGradient>
    <rect id="gradient-rect" x="0" y="0" width="62" height="105" fill="url(#marker-fill-gradient)"/>
    <filter id="blend-it" x="0%" y="0%" width="100%" height="100%">
      <feImage xlink:href="#gradient-rect" result="gradient" />
      <feBlend in="gradient" in2="SourceGraphic" mode="multiply" result="blendedGrad" />
      <feComposite in="blendedGrad" in2="SourceGraphic" operator="in"/>
    </filter>
    <symbol id="marker">
      <path class="marker__inner" d="M31.006 1a29.974 29.974 0 0 1 30.006 29.942C61.012 47.478 29.806 104 29.806 104S1 47.478 1 30.942A29.974 29.974 0 0 1 31.006 1z" />
      <path class="marker__border" d="M31.006 1a29.974 29.974 0 0 1 30.006 29.942C61.012 47.478 29.806 104 29.806 104S1 47.478 1 30.942A29.974 29.974 0 0 1 31.006 1z" />
    </symbol>
  </defs>
</svg>`;

const markerTemplate = document.createElement('div');
markerTemplate.innerHTML = svgTemplate;
document.body.appendChild(markerTemplate);

export default function getMarker({ className, text }) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 62 105">
      <use xlink:href="#marker" class="marker ${className}" />
    </svg>
    <div class="marker__caption">${text}</div>
    `;
}
