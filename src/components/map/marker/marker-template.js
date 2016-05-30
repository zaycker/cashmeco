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
    <symbol id="marker__shadow">
        <path class="marker__shadow-inner" d="M185.7 725.2c16.1 0 26.1 10.5 22.5 23.5S161.9 806 161.9 806s-15.5-44.4-11.8-57.3S169.7 725.2 185.7 725.2Z" transform="translate(-133 -702)"/>
    </symbol>
  </defs>
</svg>`;

const markerTemplate = document.createElement('div');
markerTemplate.style.height = '0';
markerTemplate.innerHTML = svgTemplate;
document.body.appendChild(markerTemplate);

export function getShadow() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 76 105">
      <use xlink:href="#marker__shadow" />
    </svg>`;
}

export default function getMarker({ className, text }) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 61 105">
      <use xlink:href="#marker" class="marker ${className}" />
    </svg>
    <div class="marker__caption">${text}</div>
    `;
}
