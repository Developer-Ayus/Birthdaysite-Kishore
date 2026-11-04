/* ==========================================================================
   Happy Birthday Kishore - Interactive Logic
   ========================================================================== */

/**
 * ==========================================================================
 * EASY CONFIGURATION: EDIT SONGS AND MESSAGES HERE!
 * ==========================================================================
 * To change a song or message:
 * - Update 'image': The path to your photo.
 * - Update 'title': Title for the polaroid caption.
 * - Update 'date': Subtext/date on the photo.
 * - Update 'message': The personalized text on the memory page.
 * - Update 'video': Optional video memory shown on that page.
 */
const SCRAPBOOK_PAGES = [
  {
    image: 'Asset/1_20260815_121908.jpg',
    title: 'Independence Day Vibe ✨',
    date: '15 August • Pure Energy',
    message: "Kishore, starting off with this icon of a memory! That day was filled with nothing but high energy and pure vibes. Here's to more days where we just conquer the city with unmatched spirit! 🚀",
    video: {
      src: 'Asset/New project (1).webm',
      title: 'Apke toothpaste me namak hai kya?😁',
      description: "kya muskurahat hai😃."
    }
  },
  {
    image: 'Asset/2_20260914_134426.jpg',
    title: "Teachers' Day Celebration Moment ╰(*°▽°*)╯ ",
    date: '14 September • Classic Chaos',
    message: "No filter, no pretenses, just two brothers enjoying clg life, and stupid jokes over some ₹30 teachers' day party. These unscripted hangouts are honestly Mindblowing. 💯"
  },
  {
    image: 'Asset/3_20260914_151508.jpg',
    title: 'Another One 🚀',
    date: '14 September • Classic Chaos',
    message: "Perfect shot of us in the middle of a spontaneous adventure.🎉"
  },
  {
    image: 'Asset/4_20260914_153406.jpg',
    title: 'That Candid Smile 😁',
    date: '14 September • Golden Hour',
    message: "The গরুর হাটের ছোট্ট vlog. Caught you right in the middle of genuine laughter! Never lose that contagious smile, Kishore. It lights up every room and brings good vibes everywhere you go. খিস্তি টা কম মারো",
    video: {
      src: 'Asset/5_New project.mp4',
      title: 'Behind The Scenes Chaos 💥',
      description: 'Real, unscripted, and 100% pure Kishore moments.'
    }
  },
  
  {
    image: 'Asset/6_20260918_142534.jpg',
    title: 'vishwakarma Puja',
    date: '18 September • Good Times',
    message: "That day we enjoyed a lot and laughed a lot. Thanks for Inviting 🤩"
  },
  {
    image: 'Asset/7_20261002_175622.jpg',
    title: 'Sunset Chronicles 🌅',
    date: '02 October • Evening Vibes',
    message: "Thanks for the amazing day! really enjoyed that outside lunch time 🎉"
  },
  {
    image: 'Asset/8_20261002_180000.jpg',
    title: 'Best pfp Ever taken 😎',
    date: '02 October • Golden Skies',
    message: "You never thanked me to take this photo, but I know you secretly love it. 😏 Bondhu November chole elo ₹3000 taka ta....??????"
  },
  {
    image: 'Asset/9_20261002_183815.jpg',
    title: 'Night Moves & Adventures 🌃',
    date: '02 October • Twilight',
    message: "When the sun goes down, our best stories begin! Thanks for being the ride-or-die partner for every late-night mission. Happy Birthday, my brother! 🎉🔥"
  },
  { 
    title: 'Melody of Memories 🎶',
    date: 'A special birthday gift',
    message: "A special birthday surprise, made even better because it came from Modi.",
    video: {
      src: 'Asset/10_Melody.mp4',
      title: 'Melody of Memories 🎶',
      description: "A Special Gift From Modi to You presented by Me😁"
    }
  },
  {
    image: 'Asset/11_20260914_141329.jpg',
    title: 'The Ashraful Moment 🤣',
    date: '14 September • IYKYK',
    message: "Handing Over the Gift to Ashraful was a moment of pure comedy gold. ",

    video: {
      src: 'Asset/New project.webm',
      title: 'IYKYK🤣🤣',
      description: "Sorry Broo 🙏🏻🙏🏻"
    }
  }
  

];


document.addEventListener('DOMContentLoaded', () => {
  // Correct passkey
  const CORRECT_PASS = '2020';
  let enteredPin = '';

  // Screens
  const screenGate = document.getElementById('screen-gate');
  const screenCake = document.getElementById('screen-cake');
  const screenScrapbook = document.getElementById('screen-scrapbook');
  const cakeStage = document.getElementById('cake-interactive-stage');

  // Pin elements
  const pinSlots = [
    document.getElementById('slot-0'),
    document.getElementById('slot-1'),
    document.getElementById('slot-2'),
    document.getElementById('slot-3')
  ];
  const pinFeedback = document.getElementById('pin-feedback');

  // Mic & Candle elements
  const meterFill = document.getElementById('blow-meter-fill');
  const meterText = document.getElementById('meter-status-text');
  const flames = document.querySelectorAll('.flame');
  const startMicBtn = document.getElementById('start-mic-btn');
  const manualBlowBtn = document.getElementById('manual-blow-btn');
  let audioContext = null;
  let analyser = null;
  let micStream = null;
  let isListening = false;
  let candlesBlown = false;
  let blowAccumulator = 0;
  let cakeIsReady = false;

  // Spiral Notebook State
  let currentNotebookPageIndex = 0;

  // --------------------------------------------------------------------------
  // Navigation Helper
  // --------------------------------------------------------------------------
  function switchScreen(fromScreen, toScreen) {
    fromScreen.style.opacity = '0';
    fromScreen.style.transform = 'scale(0.95)';
    setTimeout(() => {
      fromScreen.classList.remove('active');
      toScreen.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => {
        toScreen.style.opacity = '1';
        toScreen.style.transform = 'scale(1)';
      }, 50);
    }, 400);
  }

  function playSoundEffect(type) {
    const AudioContextConstructor = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextConstructor) return;

    if (!audioContext) audioContext = new AudioContextConstructor();
    if (audioContext.state === 'suspended') {
      audioContext.resume().catch((error) => {
        console.warn('Could not resume sound effects:', error);
      });
    }

    const now = audioContext.currentTime;
    const notes = type === 'wrong'
      ? [{ frequency: 220, endFrequency: 130, delay: 0 }]
      : type === 'correct'
        ? [{ frequency: 523.25, delay: 0 }, { frequency: 659.25, delay: 0.11 }, { frequency: 783.99, delay: 0.22 }]
        : [{ frequency: 360, endFrequency: 75, delay: 0 }];

    notes.forEach((note) => {
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();
      const start = now + note.delay;
      const duration = type === 'wrong' ? 0.28 : type === 'correct' ? 0.24 : 0.22;

      oscillator.type = type === 'wrong' ? 'triangle' : 'sine';
      oscillator.frequency.setValueAtTime(note.frequency, start);
      if (note.endFrequency) {
        oscillator.frequency.exponentialRampToValueAtTime(note.endFrequency, start + duration);
      }
      gain.gain.setValueAtTime(type === 'pop' ? 0.24 : 0.12, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + duration);
      oscillator.connect(gain);
      gain.connect(audioContext.destination);
      oscillator.start(start);
      oscillator.stop(start + duration);
    });
  }

  // --------------------------------------------------------------------------
  // STAGE 1: Password Logic
  // --------------------------------------------------------------------------
  function updatePinDisplay() {
    pinSlots.forEach((slot, idx) => {
      if (idx < enteredPin.length) {
        slot.textContent = enteredPin[idx];
        slot.classList.add('filled');
        slot.classList.remove('active');
      } else if (idx === enteredPin.length) {
        slot.textContent = '';
        slot.classList.remove('filled');
        slot.classList.add('active');
      } else {
        slot.textContent = '';
        slot.classList.remove('filled', 'active');
      }
    });

    if (enteredPin.length === 4) {
      validatePin();
    }
  }

  function handleDigitInput(val) {
    if (enteredPin.length < 4) {
      enteredPin += val;
      updatePinDisplay();
    }
  }

  function handleBackspace() {
    if (enteredPin.length > 0) {
      enteredPin = enteredPin.slice(0, -1);
      pinFeedback.textContent = '';
      updatePinDisplay();
    }
  }

  function validatePin() {
    if (enteredPin === CORRECT_PASS) {
      playSoundEffect('correct');
      pinFeedback.style.color = '#34d399';
      pinFeedback.textContent = '🔓 Passcode Verified! Welcome, Kishore! 🎉';
      triggerConfettiBurst(window.innerWidth / 2, window.innerHeight / 2, 40);

      pinSlots.forEach(slot => {
        slot.style.borderColor = '#10b981';
        slot.style.backgroundColor = 'rgba(16, 185, 129, 0.2)';
      });

      setTimeout(() => {
        switchScreen(screenGate, screenCake);
        window.setTimeout(beginCakeAssembly, 450);
      }, 900);
    } else {
      playSoundEffect('wrong');
      const gateBox = document.querySelector('.gate-wrapper');
      gateBox.classList.add('shake');
      pinFeedback.style.color = '#fb7185';
      pinFeedback.textContent = '❌ Incorrect year! Think back to when we met...';
      
      pinSlots.forEach(slot => {
        slot.style.borderColor = '#ef4444';
      });

      setTimeout(() => {
        gateBox.classList.remove('shake');
        enteredPin = '';
        pinSlots.forEach(slot => {
          slot.style.borderColor = '';
        });
        updatePinDisplay();
      }, 800);
    }
  }

  // Numpad button click listeners
  document.querySelectorAll('.num-key').forEach(button => {
    button.addEventListener('click', () => {
      const action = button.dataset.action;
      const num = button.dataset.num;
      if (num !== undefined) {
        handleDigitInput(num);
      } else if (action === 'delete') {
        handleBackspace();
      } else if (action === 'clear') {
        enteredPin = '';
        pinFeedback.textContent = '';
        updatePinDisplay();
      }
    });
  });

  // Keyboard support for desktop
  window.addEventListener('keydown', (e) => {
    if (!screenGate.classList.contains('active')) return;
    if (e.key >= '0' && e.key <= '9') {
      handleDigitInput(e.key);
    } else if (e.key === 'Backspace') {
      handleBackspace();
    } else if (e.key === 'Escape') {
      enteredPin = '';
      pinFeedback.textContent = '';
      updatePinDisplay();
    }
  });

  // --------------------------------------------------------------------------
  // STAGE 2: Birthday Cake & Microphone Blow Detection
  // --------------------------------------------------------------------------
  function activateCakeBlow() {
    if (cakeIsReady) return;
    cakeIsReady = true;
    if (cakeStage) cakeStage.classList.add('cake-ready');
    meterText.textContent = '🎙️ Cake is ready! Blow into your mic or tap below!';
    if (startMicBtn) startMicBtn.disabled = false;
    if (manualBlowBtn) manualBlowBtn.disabled = false;
  }

  function beginCakeAssembly() {
    if (!cakeStage) {
      activateCakeBlow();
      return;
    }

    cakeStage.classList.remove('cake-ready');
    cakeStage.classList.add('cake-building');
    meterText.textContent = '🎂 Your birthday cake is being made...';

    const topTier = cakeStage.querySelector('.tier.top');
    const finishAssembly = (event) => {
      if (event && (event.target !== topTier || event.animationName !== 'cakeLayerDrop')) return;
      window.clearTimeout(assemblyFallback);
      activateCakeBlow();
    };
    const assemblyFallback = window.setTimeout(() => finishAssembly(), 3500);
    if (topTier) {
      topTier.addEventListener('animationend', finishAssembly, { once: true });
    } else {
      finishAssembly();
    }
  }

  async function initMicrophone() {
    if (!cakeIsReady) return;

    try {
      if (audioContext && audioContext.state === 'suspended') {
        await audioContext.resume();
      }
      if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
      }

      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        meterText.textContent = 'Mic not supported on this browser. Tap to blow! 👇';
        return;
      }

      micStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      const source = audioContext.createMediaStreamSource(micStream);
      analyser = audioContext.createAnalyser();
      analyser.fftSize = 512;
      analyser.smoothingTimeConstant = 0.3;
      source.connect(analyser);

      isListening = true;
      meterText.textContent = '🎙️ Listening... Blow directly into your mic!';
      startMicBtn.style.display = 'none';
      analyzeBlowStream();
    } catch (err) {
      console.warn('Microphone permission denied or error:', err);
      meterText.textContent = 'Tap the button below to blow out candles! 💨';
      startMicBtn.textContent = '🎙️ Try Mic Again';
    }
  }

  if (startMicBtn) {
    startMicBtn.addEventListener('click', initMicrophone);
  }

  function analyzeBlowStream() {
    if (!isListening || candlesBlown) return;

    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(dataArray);

    let sum = 0;
    const testBins = Math.min(dataArray.length, 120);
    for (let i = 0; i < testBins; i++) {
      sum += dataArray[i];
    }
    const average = sum / testBins;
    const normalizedEnergy = Math.min(100, Math.max(0, (average - 15) * 1.8));

    meterFill.style.width = `${normalizedEnergy}%`;

    if (normalizedEnergy > 35) {
      flames.forEach(f => f.classList.add('waver'));
      blowAccumulator += normalizedEnergy > 60 ? 25 : 12;
    } else {
      flames.forEach(f => f.classList.remove('waver'));
      blowAccumulator = Math.max(0, blowAccumulator - 5);
    }

    if (blowAccumulator >= 100) {
      extinguishCandles();
      return;
    }

    requestAnimationFrame(analyzeBlowStream);
  }

  function extinguishCandles() {
    if (!cakeIsReady || candlesBlown) return;
    candlesBlown = true;
    isListening = false;
    playSoundEffect('pop');
    startMicBtn.disabled = true;
    manualBlowBtn.disabled = true;

    if (micStream) {
      micStream.getTracks().forEach(track => track.stop());
    }

    flames.forEach((flame, index) => {
      setTimeout(() => {
        flame.classList.remove('waver');
        flame.classList.add('extinguished');
        createSmokePuff(flame.parentElement);
      }, index * 120);
    });

    meterFill.style.width = '100%';
    meterText.textContent = '💨 CANDLES BLOWN! MAKE A WISH! ✨';

    if (navigator.vibrate) {
      navigator.vibrate([100, 50, 150]);
    }

    setTimeout(() => {
      launchCelebrationConfetti();
    }, 400);

    setTimeout(() => {
      switchScreen(screenCake, screenScrapbook);
      launchCelebrationConfetti();
    }, 2800);
  }

  function createSmokePuff(candleElem) {
    for (let i = 0; i < 4; i++) {
      const smoke = document.createElement('div');
      smoke.className = 'smoke-particle';
      smoke.style.animationDelay = `${i * 0.18}s`;
      smoke.style.left = `${50 + (Math.random() * 20 - 10)}%`;
      candleElem.appendChild(smoke);
      setTimeout(() => smoke.remove(), 2000);
    }
  }

  if (manualBlowBtn) {
    manualBlowBtn.addEventListener('click', () => {
      extinguishCandles();
    });
  }

  document.querySelectorAll('.candle').forEach(candle => {
    candle.addEventListener('click', () => {
      extinguishCandles();
    });
  });

  // --------------------------------------------------------------------------
  // STAGE 3: SPIRAL NOTEBOOK SCRAPBOOK ENGINE
  // --------------------------------------------------------------------------
  const pagesStack = document.getElementById('notebook-pages-stack');
  const pageIndicator = document.getElementById('notebook-page-indicator');
  const btnPrev = document.getElementById('btn-prev-page');
  const btnNext = document.getElementById('btn-next-page');
  const notebook = document.getElementById('spiral-notebook');
  const notebookCover = document.getElementById('notebook-cover');
  let notebookOpened = false;
  let notebookOpening = false;
  let pageTurnInProgress = false;

  if (pagesStack) pagesStack.inert = true;

  function openNotebook() {
    if (notebookOpened || notebookOpening || !notebook || !notebookCover) return;
    notebookOpening = true;
    notebook.classList.add('is-opening');
    notebookCover.setAttribute('aria-expanded', 'true');
    playNotebookVideo(currentNotebookPageIndex);

    const finishOpening = () => {
      notebookOpening = false;
      notebookOpened = true;
      if (pagesStack) pagesStack.inert = false;
      notebook.classList.remove('is-opening', 'opening-cover', 'closing-cover');
      notebook.classList.add('is-open');
      updateNotebookNavigation();
    };
    const transitionFallback = window.setTimeout(finishOpening, 1300);

    notebookCover.addEventListener('transitionend', (event) => {
      if (event.target !== notebookCover || event.propertyName !== 'transform') return;
      window.clearTimeout(transitionFallback);
      finishOpening();
    }, { once: true });

    notebook.classList.add('opening-cover');
  }

  function closeNotebook() {
    if (!notebookOpened || notebookOpening || !notebook || !notebookCover) return;
    notebookOpening = true;
    notebookOpened = false;
    if (pagesStack) pagesStack.querySelectorAll('video').forEach((video) => video.pause());
    notebook.classList.remove('is-open');
    notebook.classList.add('is-opening', 'closing-cover');
    notebookCover.setAttribute('aria-expanded', 'false');
    if (pagesStack) pagesStack.inert = true;

    const finishClosing = () => {
      notebookOpening = false;
      notebook.classList.remove('is-opening', 'closing-cover', 'opening-cover');
      updateNotebookNavigation();
    };
    const transitionFallback = window.setTimeout(finishClosing, 1300);

    notebookCover.addEventListener('transitionend', (event) => {
      if (event.target !== notebookCover || event.propertyName !== 'transform') return;
      window.clearTimeout(transitionFallback);
      finishClosing();
    }, { once: true });
  }

  if (notebook) {
    notebook.addEventListener('click', () => {
      if (!notebookOpened) openNotebook();
    });
  }

  function renderSpiralNotebook() {
    if (!pagesStack) return;
    pagesStack.innerHTML = '';

    SCRAPBOOK_PAGES.forEach((item, idx) => {
      const pageWrapper = document.createElement('article');
      pageWrapper.className = 'notebook-page';
      pageWrapper.dataset.index = idx;
      if (item.image && item.video) pageWrapper.classList.add('has-photo-and-video');

      if (idx === 0) {
        pageWrapper.classList.add('active');
      }

      pageWrapper.innerHTML = `
        <div class="notebook-page-header">
          <span class="page-num-badge">Memory ${String(idx + 1).padStart(2, '0')}</span>
          <span class="notebook-page-date">${item.date || ''}</span>
        </div>
        <div class="notebook-memory">
          <div class="notebook-media-column">
          ${item.image ? `
            <figure class="polaroid-photo-frame">
              <div class="polaroid-tape"></div>
              <div class="photo-img-wrap">
                <img src="${item.image}" alt="${item.title}" loading="lazy">
              </div>
              <figcaption class="photo-caption-block">
                <p class="photo-title">${item.title}</p>
                <button class="polaroid-like-btn" title="Send Love" aria-label="Send love">❤️ <span class="like-count">12</span></button>
              </figcaption>
            </figure>
          ` : ''}
          ${item.video ? `
            <div class="notebook-video">
              <video controls playsinline preload="none" aria-label="${item.video.title}">
                <source src="${item.video.src}" type="${item.video.src.endsWith('.webm') ? 'video/webm' : 'video/mp4'}">
                Your browser does not support the video tag.
              </video>
              <div class="notebook-video-caption">
                <strong>${item.video.title}</strong>
                <span>${item.video.description}</span>
              </div>
            </div>
          ` : ''}
          </div>
          <div class="notebook-entry">
            <span class="notebook-entry-label">A little note</span>
            <h3 class="notebook-message-heading">${item.title}</h3>
            <p class="notebook-message-body">${item.message}</p>
            <div class="notebook-footer-doodle">Made of memories <span aria-hidden="true">♡</span></div>
          </div>
        </div>
      `;

      // Tap to flip next/prev page
      pageWrapper.addEventListener('click', (e) => {
        if (e.target.closest('.polaroid-like-btn, video, button')) return;
        if (!notebookOpened && !notebookOpening) {
          openNotebook();
          return;
        }

        if (!notebookOpened || pageTurnInProgress) return;
        if (idx === currentNotebookPageIndex) {
          goToPage(currentNotebookPageIndex + 1);
        } else if (idx < currentNotebookPageIndex) {
          goToPage(idx);
        }
      });

      pagesStack.appendChild(pageWrapper);
    });

    const backCover = document.createElement('article');
    backCover.className = 'notebook-page back-cover';
    backCover.dataset.index = SCRAPBOOK_PAGES.length;
    backCover.setAttribute('aria-label', 'Scrapbook back cover');
    backCover.innerHTML = `
      <div class="back-cover-content">
        <span class="back-cover-title">The End...?</span>
        <p>Here’s to all the memories still waiting to be made.</p>
        <span class="back-cover-signoff">अभी के लिए बस इतना ही ❤️</span>
      </div>
    `;
    backCover.addEventListener('click', () => {
      if (notebookOpened && !pageTurnInProgress && currentNotebookPageIndex === SCRAPBOOK_PAGES.length) {
        goToPage(currentNotebookPageIndex - 1);
      }
    });
    pagesStack.appendChild(backCover);

    updateNotebookNavigation();
    bindPolaroidLikes();
  }

  function playNotebookVideo(pageIndex) {
    const page = pagesStack && pagesStack.querySelector(`[data-index="${pageIndex}"]`);
    const video = page && page.querySelector('video');
    if (!video) return;

    video.loop = true;
    video.play().catch((error) => {
      if (error.name !== 'AbortError') {
        console.warn('Could not autoplay scrapbook video:', error);
      }
    });
  }

  function goToPage(targetIndex) {
    if (notebookOpening || pageTurnInProgress) return;
    if (!notebookOpened) {
      openNotebook();
      return;
    }
    if (targetIndex < 0) {
      if (currentNotebookPageIndex === 0) closeNotebook();
      return;
    }
    const lastPageIndex = SCRAPBOOK_PAGES.length;
    if (targetIndex > lastPageIndex || targetIndex === currentNotebookPageIndex) return;

    const direction = targetIndex > currentNotebookPageIndex ? 'next' : 'previous';
    const currentPage = pagesStack.querySelector(`[data-index="${currentNotebookPageIndex}"]`);
    const targetPage = pagesStack.querySelector(`[data-index="${targetIndex}"]`);
    if (!currentPage || !targetPage) return;
    pagesStack.querySelectorAll('video').forEach((video) => video.pause());
    playNotebookVideo(targetIndex);
    pageTurnInProgress = true;
    targetPage.classList.add('active');
    if (direction === 'next') {
      targetPage.classList.add('under-turn');
    } else {
      targetPage.classList.add('previous-under-turn');
    }
    void targetPage.offsetWidth;
    requestAnimationFrame(() => {
      if (direction === 'next') currentPage.classList.add('turning-next');
      if (direction === 'previous') targetPage.classList.remove('previous-under-turn');
    });

    window.setTimeout(() => {
      currentPage.classList.remove('active', 'turning-next', 'under-turn');
      targetPage.classList.add('active');
      targetPage.classList.remove('under-turn', 'previous-under-turn');
      currentNotebookPageIndex = targetIndex;
      pageTurnInProgress = false;
      updateNotebookNavigation();
    }, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 20 : 720);
  }

  function updateNotebookNavigation() {
    if (pageIndicator) {
      pageIndicator.textContent = notebookOpened
        ? currentNotebookPageIndex === SCRAPBOOK_PAGES.length
          ? 'Back cover'
          : `Page ${currentNotebookPageIndex + 1} of ${SCRAPBOOK_PAGES.length}`
        : 'Cover';
    }
    if (btnPrev) btnPrev.disabled = !notebookOpened;
    if (btnNext) btnNext.textContent = notebookOpened ? 'Next ▶' : 'Open ▶';
    if (btnNext) btnNext.disabled = notebookOpened && currentNotebookPageIndex === SCRAPBOOK_PAGES.length;
  }

  if (btnPrev) {
    btnPrev.addEventListener('click', () => {
      if (notebookOpened) goToPage(currentNotebookPageIndex - 1);
    });
  }
  if (btnNext) {
    btnNext.addEventListener('click', () => {
      if (!notebookOpened) openNotebook();
      else goToPage(currentNotebookPageIndex + 1);
    });
  }
  if (notebookCover) {
    notebookCover.addEventListener('click', openNotebook);
  }

  renderSpiralNotebook();

  // --------------------------------------------------------------------------
  // Friendship Duration Calculator (Since 2020)
  // --------------------------------------------------------------------------
  function updateFriendshipCounter() {
    const meetDate = new Date('2020-01-01T00:00:00');
    const now = new Date();
    const diffTime = Math.abs(now - meetDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const years = Math.floor(diffDays / 365.25);

    const daysEl = document.getElementById('stat-days');
    const yearsEl = document.getElementById('stat-years');
    if (daysEl) daysEl.textContent = `${diffDays.toLocaleString()}+`;
    if (yearsEl) yearsEl.textContent = `${years}+`;
  }
  updateFriendshipCounter();

  // --------------------------------------------------------------------------
  // Interactive Polaroid Likes & Lightbox Modal
  // --------------------------------------------------------------------------
  const lightbox = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-media-img');
  const lightboxVideo = document.getElementById('lightbox-media-video');
  const lightboxCaption = document.getElementById('lightbox-caption-text');
  const lightboxClose = document.getElementById('lightbox-close-btn');

  function bindPolaroidLikes() {
    document.querySelectorAll('.polaroid-like-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const countEl = btn.querySelector('.like-count');
        let count = parseInt(countEl.textContent, 10) || 0;
        countEl.textContent = count + 1;
        btn.style.transform = 'scale(1.4)';
        setTimeout(() => btn.style.transform = '', 200);

        const heart = document.createElement('div');
        heart.textContent = '❤️';
        heart.style.position = 'fixed';
        heart.style.left = `${e.clientX}px`;
        heart.style.top = `${e.clientY}px`;
        heart.style.fontSize = '24px';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '9999';
        heart.style.transition = 'all 1s cubic-bezier(0.1, 0.8, 0.3, 1)';
        document.body.appendChild(heart);

        setTimeout(() => {
          heart.style.transform = `translate(${Math.random() * 60 - 30}px, -90px) scale(1.5)`;
          heart.style.opacity = '0';
        }, 20);

        setTimeout(() => heart.remove(), 1100);
      });
    });
  }

  // Lightbox Close
  if (lightboxClose && lightbox) {
    lightboxClose.addEventListener('click', () => {
      lightbox.classList.remove('active');
      if (lightboxVideo) lightboxVideo.pause();
    });

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove('active');
        if (lightboxVideo) lightboxVideo.pause();
      }
    });
  }

  // --------------------------------------------------------------------------
  // Confetti Engine
  // --------------------------------------------------------------------------
  const canvas = document.getElementById('confetti-canvas');
  let ctx = null;
  let particles = [];
  let isConfettiRunning = false;

  if (canvas) {
    ctx = canvas.getContext('2d');
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
  }

  const confettiColors = ['#f43f5e', '#ec4899', '#a855f7', '#06b6d4', '#fbbf24', '#34d399', '#ffffff'];

  class Particle {
    constructor(x, y, vx, vy) {
      this.x = x;
      this.y = y;
      this.vx = vx !== undefined ? vx : (Math.random() * 8 - 4);
      this.vy = vy !== undefined ? vy : (Math.random() * -12 - 4);
      this.size = Math.random() * 9 + 5;
      this.color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
      this.rotation = Math.random() * 360;
      this.rotSpeed = Math.random() * 10 - 5;
      this.gravity = 0.32;
      this.drag = 0.985;
      this.opacity = 1;
      this.shape = Math.random() > 0.3 ? 'rect' : 'circle';
    }

    update() {
      this.vx *= this.drag;
      this.vy *= this.drag;
      this.vy += this.gravity;
      this.x += this.vx;
      this.y += this.vy;
      this.rotation += this.rotSpeed;
      if (this.y > canvas.height - 20) {
        this.opacity -= 0.02;
      }
    }

    draw(ctx) {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate((this.rotation * Math.PI) / 180);
      ctx.globalAlpha = Math.max(0, this.opacity);
      ctx.fillStyle = this.color;
      if (this.shape === 'rect') {
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size * 0.6);
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, this.size / 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }
  }

  function triggerConfettiBurst(x, y, count = 70) {
    if (!ctx) return;
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 14 + 4;
      particles.push(new Particle(
        x,
        y,
        Math.cos(angle) * speed,
        Math.sin(angle) * speed - 6
      ));
    }
    if (!isConfettiRunning) {
      isConfettiRunning = true;
      animateConfetti();
    }
  }

  function launchCelebrationConfetti() {
    triggerConfettiBurst(window.innerWidth * 0.2, window.innerHeight * 0.6, 90);
    setTimeout(() => {
      triggerConfettiBurst(window.innerWidth * 0.8, window.innerHeight * 0.6, 90);
    }, 250);
    setTimeout(() => {
      triggerConfettiBurst(window.innerWidth * 0.5, window.innerHeight * 0.4, 110);
    }, 600);
  }

  function animateConfetti() {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.update();
      p.draw(ctx);
      if (p.opacity <= 0 || p.y > canvas.height + 50) {
        particles.splice(i, 1);
      }
    }

    if (particles.length > 0) {
      requestAnimationFrame(animateConfetti);
    } else {
      isConfettiRunning = false;
    }
  }

  // Confetti FAB button
  const fabConfetti = document.getElementById('fab-confetti');
  if (fabConfetti) {
    fabConfetti.addEventListener('click', (e) => {
      triggerConfettiBurst(e.clientX || window.innerWidth / 2, e.clientY || window.innerHeight / 2, 80);
    });
  }
});