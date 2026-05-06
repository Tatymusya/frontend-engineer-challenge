export const injectFonts = () => {
  const fontUrl = new URL('./fonts/inter/Inter-VariableFont_opsz,wght.woff2', import.meta.url).href;

  const style = document.createElement('style');
  style.textContent = `
    @font-face {
      font-family: 'Inter';
      font-weight: 100 900;
      font-display: swap;
      font-style: normal;
      src: url(${fontUrl}) format('woff2');
    }
  `;
  document.head.appendChild(style);
};