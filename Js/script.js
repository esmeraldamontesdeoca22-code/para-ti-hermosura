// © Zero - Código libre no comercial

// Cargar el SVG y animar los corazones
fetch('Img/treelove.svg')
  .then(res => res.text())
  .then(svgText => {
    const container = document.getElementById('tree-container');
    if (!container) {
      console.error("Error: tree-container no encontrado");
      return;
    }
    container.innerHTML = svgText;
    const svg = container.querySelector('svg');
    if (!svg) {
      console.error("Error: SVG no cargó");
      return;
    }

    // Animación de "dibujo" para todos los paths
    const allPaths = Array.from(svg.querySelectorAll('path'));
    allPaths.forEach(path => {
      path.style.stroke = '#222';
      path.style.strokeWidth = '2.5';
      path.style.fillOpacity = '0';
      const length = path.getTotalLength();
      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = length;
      path.style.transition = 'none';
    });

    // Forzar reflow y luego animar
    setTimeout(() => {
      allPaths.forEach((path, i) => {
        path.style.transition = `stroke-dashoffset 1.2s cubic-bezier(.77,0,.18,1) ${i * 0.08}s, fill-opacity 0.5s ${0.9 + i * 0.08}s`;
        path.style.strokeDashoffset = 0;
        setTimeout(() => {
          path.style.fillOpacity = '1';
          path.style.stroke = '';
          path.style.strokeWidth = '';
        }, 1200 + i * 80);
      });

      const totalDuration = 1200 + (allPaths.length - 1) * 80 + 500;
      setTimeout(() => {
        svg.classList.add('move-and-scale');
        setTimeout(() => {
          showDedicationText();
          startFloatingObjects();
          showCountdown();
          playBackgroundMusic();
        }, 1200);
      }, totalDuration);
    }, 50);

    const heartPaths = allPaths.filter(el => {
      const style = el.getAttribute('style') || el.getAttribute('fill') || '';
      return style.includes('#FC6F58') || style.includes('#C1321F');
    });
    heartPaths.forEach(path => {
      path.classList.add('animated-heart');
    });
  })
  .catch(err => console.error("Error al cargar SVG:", err));

function getURLParam(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

function showDedicationText() {
  let rawText = getURLParam('text');
  let text = "";

  if (!rawText) {
    text = "ELY quiero decirte que:\n\n" +
           "Sé que a veces dices que estás bien, pero yo puedo notar cuando no lo estás…\n" +
           "No tienes que mentirme, mi amor, puedes confiar en mí.\n\n" +
           "Si estás cansada o algo te duele, ven aquí, a mi pecho,\n" +
           "que conmigo no tienes que fingir nada.\n" +
           "Puedes ser tú, tal cual, sin miedo.\n\n" +
           "No tienes que cargar todo sola,\n" +
           "si sientes que todo se vuelve oscuro, quédate conmigo…\n" +
           "como el mar cuando abraza la orilla, así quiero cuidarte,\n" +
           "sin soltarte, sin dejarte caer.\n\n" +
           "Porque de verdad me importas,\n" +
           "y aunque no siempre tenga las palabras perfectas,\n" +
           "sé que mi amor por ti es más grande cada día.\n" +
           "Quiero estar contigo,\n" +
           "en lo bueno, en lo difícil… en todo.\n\n" +
           "Después de todo lo que te dije, necesito que esto te quede bien claro. Te amo. Y sí, te amo de verdad, no por decirlo bonito. No es una broma de YouTube jajajaj.\n\n" +
           "Me importas muchísimo y te quiero en mi vida porque eres tú. Te quiero en mis días, en lo que pienso, en lo que siento. Y te amo por todo lo que eres y por lo que representas.\n\n" +
           "Te amo, mi hermoso sauce llorón.\n" +
           "Te quiero, mi pechomcha.\n" +
           "Y te pienso siempre, my galaxy.\n\n" +
           "Te valoro un montón, más de lo que a veces te digo. Incluso cuando tú dudas de ti misma, yo no dudo de lo que eres para mí. Para mí no eres cualquier persona, eres alguien que se volvió importante de verdad.\n\n" +
           "Y sí, eres maravillosa, pero en lo real, no exagerado… en eso que se siente cuando estoy contigo o cuando pienso en ti.\n";
  } else {
    text = decodeURIComponent(rawText).replace(/\\n/g, '\n');
  }

  const container = document.getElementById('dedication-text');
  if (!container) {
    console.error("Error: dedication-text no encontrado");
    return;
  }

  container.innerHTML = "";
  let i = 0;

  function type() {
    if (i < text.length) {
      container.textContent += text.charAt(i);
      i++;
      window.scrollTo(0, document.body.scrollHeight);
      let delay = text.charAt(i - 1) === '\n' ? 200 : 30;
      setTimeout(type, delay);
    } else {
      console.log("Texto completado");
      showSignature();
    }
  }

  type();
}

function showSignature() {
  const dedication = document.getElementById('dedication-text');
  if (!dedication) return;

  let signature = document.getElementById('signature');
  if (!signature) {
    signature = document.createElement('div');
    signature.id = 'signature';
    signature.className = 'signature';
    dedication.appendChild(signature);
  }

  let firma = getURLParam('firma');
  signature.textContent = firma ? decodeURIComponent(firma) : "Con amor, ALL";
  signature.classList.add('visible');
}

function startFloatingObjects() {
  const container = document.getElementById('floating-objects');
  if (!container) {
    console.error("Error: floating-objects no encontrado");
    return;
  }

  let count = 0;
  function spawn() {
    let el = document.createElement('div');
    el.className = 'floating-petal';
    el.style.left = `${Math.random() * 90 + 2}%`;
    el.style.top = `${100 + Math.random() * 10}%`;
    el.style.opacity = 0.7 + Math.random() * 0.3;
    container.appendChild(el);

    const duration = 6000 + Math.random() * 4000;
    const drift = (Math.random() - 0.5) * 60;
    setTimeout(() => {
      el.style.transition = `transform ${duration}ms linear, opacity 1.2s`;
      el.style.transform = `translate(${drift}px, -110vh) scale(${0.8 + Math.random() * 0.6}) rotate(${Math.random() * 360}deg)`;
      el.style.opacity = 0.2;
    }, 30);

    setTimeout(() => {
      if (el.parentNode) el.parentNode.removeChild(el);
    }, duration + 2000);

    if (count++ < 100) setTimeout(spawn, 400);
  }
  spawn();
}

function showCountdown() {
  const container = document.getElementById('countdown');
  if (!container) {
    console.error("Error: countdown no encontrado");
    return;
  }

  container.innerHTML = "Nos conocimos desde hace <b>8 años</b> 💖";
  container.classList.add('visible');
}

function playBackgroundMusic() {
  let audio = document.getElementById('bg-music');
  if (!audio) {
    audio = document.createElement('audio');
    audio.id = 'bg-music';
    document.body.appendChild(audio);
  }

  let musicaParam = getURLParam('musica');
  if (musicaParam) {
    musicaParam = decodeURIComponent(musicaParam).replace(/[^a-zA-Z0-9._-]/g, '');
    audio.src = 'Music/' + musicaParam;
  }

  let btn = document.getElementById('music-btn');
  if (!btn) {
    btn = document.createElement('button');
    btn.id = 'music-btn';
    btn.style.position = 'fixed';
    btn.style.bottom = '18px';
    btn.style.right = '18px';
    btn.style.zIndex = 1000;
    btn.textContent = '▶️ Música';
    document.body.appendChild(btn);
  }

  audio.volume = 0.7;

  btn.onclick = () => {
    if (audio.paused) {
      audio.play();
      btn.textContent = '🔊 Música';
    } else {
      audio.pause();
      btn.textContent = '🔈 Música';
    }
  };
}
