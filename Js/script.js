// © Zero - Código libre no comercial

console.log("✅ Script iniciado");

// Cargar el SVG y animar los corazones
fetch('Img/treelove.svg')
  .then(res => {
    console.log("📦 SVG response:", res.status);
    return res.text();
  })
  .then(svgText => {
    console.log("✅ SVG text received, length:", svgText.length);
    
    const container = document.getElementById('tree-container');
    console.log("🔍 tree-container existe:", !!container);
    
    if (!container) {
      console.error("❌ ERROR: tree-container no existe en el HTML");
      return;
    }
    
    container.innerHTML = svgText;
    const svg = container.querySelector('svg');
    console.log("✅ SVG cargado en el DOM");
    
    if (!svg) {
      console.error("❌ ERROR: No hay SVG dentro del contenedor");
      return;
    }

    // Animación de "dibujo" para todos los paths
    const allPaths = Array.from(svg.querySelectorAll('path'));
    console.log("📍 Total paths encontrados:", allPaths.length);
    
    allPaths.forEach(path => {
      path.style.stroke = '#222';
      path.style.strokeWidth = '2.5';
      path.style.fillOpacity = '0';
      const length = path.getTotalLength();
      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = length;
      path.style.transition = 'none';
    });

    setTimeout(() => {
      console.log("⏱️ Iniciando animación de paths");
      
      allPaths.forEach((path, i) => {
        path.style.transition = `stroke-dashoffset 1.2s cubic-bezier(.77,0,.18,1) ${i * 0.08}s, fill-opacity 0.5s ${0.9 +*`

