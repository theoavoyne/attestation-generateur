const onResize = () => {
  const windowHeight = window.innerHeight;
  const app = document.getElementById('app');
  app.style.setProperty('height', `${windowHeight}px`);
};

onResize();

window.addEventListener('resize', onResize);
