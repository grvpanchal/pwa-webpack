function component() {
    const element = document.createElement('div');
  
    element.innerHTML = '<h2>This is a PWA config with Webpack</h2>';
  
    return element;
  }
  
  document.body.appendChild(component());