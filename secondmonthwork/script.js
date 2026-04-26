/**
 * SONATA Music Player — script.js (Updated with real audio)
 *
 * All tracks sourced from the Internet Archive (archive.org).
 * Licenses: CC0 Public Domain / CC BY / CC BY-SA — freely streamable.
 * Direct MP3 links use the stable archive.org/download/{id}/{file} pattern.
 *
 * Sources used:
 *  - piano_jazz                        → Pascal Wintz, Piano Jazz Improvisation (CC BY)
 *  - 6ShortPianoPieces_415             → Dimitris Diavatis (CC0)
 *  - Rplicas001RecordsNetlabel-JazzSeries02 → 001 Records Netlabel (CC BY-SA)
 *  - space-ambient-compilation         → Internet Daemon Netlabel (CC BY-NC-ND)
 */

'use strict';

/* ═══════════════════════════════════════════════════════
   1. PLAYLIST DATA  —  Real audio from Internet Archive
   ═══════════════════════════════════════════════════════ */
const PLAYLIST_DATA = [

  /* ── Jazz ──────────────────────────────────────────── */
  {
    id: 1,
    title:    "Blues Improvisation",
    artist:   "Pascal Wintz",
    genre:    "Jazz",
    duration: "3:14",
    color: 2,
    src: "https://archive.org/download/piano_jazz/01_Blues_Improvisation.mp3",
  },
  {
    id: 2,
    title:    "Jazz Waltz",
    artist:   "Pascal Wintz",
    genre:    "Jazz",
    duration: "2:58",
    color: 2,
    src: "https://archive.org/download/piano_jazz/02_Jazz_Waltz.mp3",
  },
  {
    id: 3,
    title:    "Bossa Nova",
    artist:   "Pascal Wintz",
    genre:    "Jazz",
    duration: "3:42",
    color: 2,
    src: "https://archive.org/download/piano_jazz/03_Bossa_Nova.mp3",
  },
  {
    id: 4,
    title:    "Réplica",
    artist:   "Mario Feito Fedusa Trio",
    genre:    "Jazz",
    duration: "4:15",
    color: 2,
    src: "https://archive.org/download/Rplicas001RecordsNetlabel-JazzSeries02/01_Mario_Feito_Fedusa_Trio_-_Rplica.mp3",
  },
  {
    id: 5,
    title:    "Santiago 7 P.M.",
    artist:   "Andrés Pérez Quinteto",
    genre:    "Jazz",
    duration: "3:55",
    color: 2,
    src: "https://archive.org/download/Rplicas001RecordsNetlabel-JazzSeries02/09_Andrs_Prez_Quinteto_-_Santiago_7_PM.mp3",
  },

  /* ── Classical Piano ───────────────────────────────── */
  {
    id: 6,
    title:    "Introduction",
    artist:   "Dimitris Diavatis",
    genre:    "Classical",
    duration: "2:10",
    color: 3,
    src: "https://archive.org/download/6ShortPianoPieces_415/01introduction.mp3",
  },
  {
    id: 7,
    title:    "Scar",
    artist:   "Dimitris Diavatis",
    genre:    "Classical",
    duration: "2:14",
    color: 3,
    src: "https://archive.org/download/6ShortPianoPieces_415/02scar.mp3",
  },
  {
    id: 8,
    title:    "What's The Point",
    artist:   "Dimitris Diavatis",
    genre:    "Classical",
    duration: "2:30",
    color: 3,
    src: "https://archive.org/download/6ShortPianoPieces_415/03whatsthepoint.mp3",
  },
  {
    id: 9,
    title:    "Sadness",
    artist:   "Dimitris Diavatis",
    genre:    "Classical",
    duration: "3:20",
    color: 3,
    src: "https://archive.org/download/6ShortPianoPieces_415/04sadness.mp3",
  },
  {
    id: 10,
    title:    "In The Sky",
    artist:   "Dimitris Diavatis",
    genre:    "Classical",
    duration: "3:12",
    color: 5,
    src: "https://archive.org/download/6ShortPianoPieces_415/05inthesky.mp3",
  },
  {
    id: 11,
    title:    "Disagreement",
    artist:   "Dimitris Diavatis",
    genre:    "Classical",
    duration: "4:40",
    color: 5,
    src: "https://archive.org/download/6ShortPianoPieces_415/06disagreement.mp3",
  },

  /* ── Electronic / Ambient ──────────────────────────── */
  {
    id: 12,
    title:    "A Bouquet Of Light",
    artist:   "DJ Iterate",
    genre:    "Electronic",
    duration: "5:48",
    color: 1,
    src: "https://archive.org/download/space-ambient-compilation/18%20-%20DJ_Iterate_-_A_Bouquet_Of_Light.mp3",
  },

  /* ── Folk ──────────────────────────────────────────── */
  {
    id: 13,
    title:    "Vals para Gaspar",
    artist:   "Ignacio González Cuarteto",
    genre:    "Folk",
    duration: "4:05",
    color: 5,
    src: "https://archive.org/download/Rplicas001RecordsNetlabel-JazzSeries02/03_Ignacio_Gonzlez_Cuarteto_-_Vals_para_Gaspar.mp3",
  },
  {
    id: 14,
    title:    "Autoatentado",
    artist:   "Sebastián Jordán Trío",
    genre:    "Folk",
    duration: "3:30",
    color: 5,
    src: "https://archive.org/download/Rplicas001RecordsNetlabel-JazzSeries02/07_Sebastin_Jordn_Tro_-_Autoatentado.mp3",
  },
  {
    id: 15,
    title:    "Cronos",
    artist:   "Sebastián Prado Quinteto",
    genre:    "Folk",
    duration: "4:20",
    color: 4,
    src: "https://archive.org/download/Rplicas001RecordsNetlabel-JazzSeries02/05_Sebastin_Prado_Quinteto_-_Cronos.mp3",
  },
];

/* Derive unique genre list */
const ALL_GENRES = ['All', ...new Set(PLAYLIST_DATA.map(t => t.genre))].sort((a, b) => a === 'All' ? -1 : a.localeCompare(b));

/* ═══════════════════════════════════════════════════════
   2. STATE
   ═══════════════════════════════════════════════════════ */
const state = {
  playlist:       PLAYLIST_DATA,
  filtered:       [...PLAYLIST_DATA],
  currentIndex:   -1,
  currentTrackId: null,
  isPlaying:      false,
  isShuffle:      false,
  isRepeat:       false,
  isMuted:        false,
  volume:         0.8,
  searchQuery:    '',
  activeGenre:    'All',
};

/* ═══════════════════════════════════════════════════════
   3. DOM REFERENCES
   ═══════════════════════════════════════════════════════ */
const audio          = document.getElementById('audioPlayer');
const playlistEl     = document.getElementById('playlist');
const genreChipsEl   = document.getElementById('genreChips');
const searchInput    = document.getElementById('searchInput');
const clearSearchBtn = document.getElementById('clearSearch');
const libraryMeta    = document.getElementById('libraryMeta');
const emptyState     = document.getElementById('emptyState');

const trackTitle     = document.getElementById('trackTitle');
const trackArtist    = document.getElementById('trackArtist');
const trackGenreEl   = document.getElementById('trackGenre');
const albumArt       = document.getElementById('albumArt');
const spinRing       = document.getElementById('spinRing');
const progressBar    = document.getElementById('progressBar');
const progressFill   = document.getElementById('progressFill');
const currentTimeEl  = document.getElementById('currentTime');
const durationEl     = document.getElementById('duration');
const volumeBar      = document.getElementById('volumeBar');
const volumeFill     = document.getElementById('volumeFill');

const btnPlay        = document.getElementById('btnPlay');
const btnPrev        = document.getElementById('btnPrev');
const btnNext        = document.getElementById('btnNext');
const btnShuffle     = document.getElementById('btnShuffle');
const btnRepeat      = document.getElementById('btnRepeat');
const btnMute        = document.getElementById('btnMute');
const iconPlay       = document.getElementById('iconPlay');
const iconPause      = document.getElementById('iconPause');

/* ═══════════════════════════════════════════════════════
   4. UTILITIES
   ═══════════════════════════════════════════════════════ */
function formatTime(secs) {
  if (!isFinite(secs) || isNaN(secs)) return '0:00';
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function matchesSearch(track, query) {
  if (!query) return true;
  const q = query.toLowerCase();
  return track.title.toLowerCase().includes(q)  ||
         track.artist.toLowerCase().includes(q) ||
         track.genre.toLowerCase().includes(q);
}

function escapeHtml(str) {
  const el = document.createElement('span');
  el.textContent = str;
  return el.innerHTML;
}

function randomIndexExcluding(len, exclude) {
  if (len <= 1) return 0;
  let r;
  do { r = Math.floor(Math.random() * len); } while (r === exclude);
  return r;
}

/* ═══════════════════════════════════════════════════════
   5. FILTERING
   ═══════════════════════════════════════════════════════ */
function applyFilters() {
  const { searchQuery, activeGenre, playlist } = state;
  state.filtered = playlist.filter(track => {
    const genreOk  = activeGenre === 'All' || track.genre === activeGenre;
    const searchOk = matchesSearch(track, searchQuery);
    return genreOk && searchOk;
  });
  renderPlaylist();
  renderLibraryMeta();
}

/* ═══════════════════════════════════════════════════════
   6. RENDER FUNCTIONS
   ═══════════════════════════════════════════════════════ */
function renderGenreChips() {
  genreChipsEl.innerHTML = '';
  ALL_GENRES.forEach(genre => {
    const btn = document.createElement('button');
    btn.className = 'chip' + (genre === state.activeGenre ? ' active' : '');
    btn.textContent = genre;
    btn.setAttribute('aria-pressed', String(genre === state.activeGenre));
    btn.addEventListener('click', () => {
      state.activeGenre = genre;
      applyFilters();
      renderGenreChips();
    });
    genreChipsEl.appendChild(btn);
  });
}

function renderPlaylist() {
  const { filtered, isPlaying } = state;
  playlistEl.innerHTML = '';

  if (filtered.length === 0) {
    emptyState.hidden = false;
    return;
  }
  emptyState.hidden = true;

  const activeId = state.currentTrackId;

  filtered.forEach((track, index) => {
    const isActive           = track.id === activeId;
    const isCurrentlyPlaying = isActive && isPlaying;

    const li = document.createElement('li');
    li.className = 'track-item'
      + (isActive           ? ' active'  : '')
      + (isCurrentlyPlaying ? ' playing' : (isActive && !isPlaying ? ' paused' : ''));
    li.setAttribute('role', 'button');
    li.setAttribute('tabindex', '0');
    li.setAttribute('aria-label', `${track.title} by ${track.artist}`);
    li.dataset.trackId = track.id;

    li.innerHTML = `
      <div class="track-num">${index + 1}</div>
      <div class="track-play-icon">
        ${isCurrentlyPlaying
          ? `<div class="equalizer" aria-label="Now playing"><span></span><span></span><span></span></div>`
          : `<svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>`
        }
      </div>
      <div class="track-info">
        <div class="track-name">${escapeHtml(track.title)}</div>
        <div class="track-artist-sm">${escapeHtml(track.artist)}</div>
      </div>
      <div class="track-genre-badge">${escapeHtml(track.genre)}</div>
      <div class="track-duration">${track.duration}</div>
    `;

    li.addEventListener('click', () => loadAndPlay(index));
    li.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); loadAndPlay(index); }
    });

    playlistEl.appendChild(li);
  });
}

function renderLibraryMeta() {
  const n = state.filtered.length;
  libraryMeta.textContent = `${n} track${n !== 1 ? 's' : ''}`;
}

function renderNowPlaying(track) {
  if (!track) {
    trackTitle.textContent   = 'Select a Track';
    trackArtist.textContent  = '—';
    trackGenreEl.textContent = '';
    albumArt.removeAttribute('data-color');
    return;
  }
  trackTitle.textContent   = track.title;
  trackArtist.textContent  = track.artist;
  trackGenreEl.textContent = track.genre;
  albumArt.dataset.color   = track.color;
}

function renderPlayState() {
  const p = state.isPlaying;
  iconPlay.style.display  = p ? 'none'  : 'block';
  iconPause.style.display = p ? 'block' : 'none';
  albumArt.classList.toggle('active', p);
  spinRing.classList.toggle('active', p);
  btnPlay.setAttribute('aria-label', p ? 'Pause' : 'Play');
}

function renderModeButtons() {
  btnShuffle.classList.toggle('active', state.isShuffle);
  btnRepeat.classList.toggle('active', state.isRepeat);
  btnShuffle.setAttribute('aria-pressed', String(state.isShuffle));
  btnRepeat.setAttribute('aria-pressed', String(state.isRepeat));
}

function renderVolume() {
  const vol = state.isMuted ? 0 : state.volume;
  volumeFill.style.width = (vol * 100) + '%';
}

/* ═══════════════════════════════════════════════════════
   7. PLAYBACK
   ═══════════════════════════════════════════════════════ */
function loadAndPlay(index) {
  const track = state.filtered[index];
  if (!track) return;

  state.currentIndex   = index;
  state.currentTrackId = track.id;

  audio.src    = track.src;
  audio.volume = state.isMuted ? 0 : state.volume;

  // Show track info immediately; duration updates on metadata load
  renderNowPlaying(track);
  durationEl.textContent = track.duration;

  audio.load();
  audio.play()
    .then(() => {
      state.isPlaying = true;
      renderPlayState();
      renderPlaylist();
    })
    .catch(err => {
      console.warn('Playback blocked or network error:', err.message);
      state.isPlaying = false;
      renderPlayState();
      renderPlaylist();
    });
}

function togglePlay() {
  if (state.currentTrackId === null) {
    if (state.filtered.length > 0) loadAndPlay(0);
    return;
  }
  if (state.isPlaying) {
    audio.pause();
  } else {
    audio.play().catch(err => console.warn(err.message));
  }
}

function skipNext() {
  const { filtered, currentIndex, isShuffle, isRepeat } = state;
  if (!filtered.length) return;

  let next;
  if (isRepeat)        next = Math.max(0, currentIndex);
  else if (isShuffle)  next = randomIndexExcluding(filtered.length, currentIndex);
  else                 next = (currentIndex + 1) % filtered.length;

  loadAndPlay(next);
}

function skipPrev() {
  const { filtered, currentIndex } = state;
  if (!filtered.length) return;

  if (audio.currentTime > 3) { audio.currentTime = 0; return; }

  const prev = currentIndex <= 0 ? filtered.length - 1 : currentIndex - 1;
  loadAndPlay(prev);
}

/* ═══════════════════════════════════════════════════════
   8. AUDIO EVENTS
   ═══════════════════════════════════════════════════════ */
audio.addEventListener('timeupdate', () => {
  if (!audio.duration || !isFinite(audio.duration)) return;
  const pct = (audio.currentTime / audio.duration) * 100;
  progressBar.value        = pct;
  progressFill.style.width = pct + '%';
  currentTimeEl.textContent = formatTime(audio.currentTime);
});

audio.addEventListener('loadedmetadata', () => {
  durationEl.textContent = formatTime(audio.duration);
});

audio.addEventListener('ended', () => {
  state.isPlaying = false;
  skipNext();
});

audio.addEventListener('play',  () => { state.isPlaying = true;  renderPlayState(); renderPlaylist(); });
audio.addEventListener('pause', () => { state.isPlaying = false; renderPlayState(); renderPlaylist(); });

// If a track fails (e.g. file doesn't exist), auto-skip after 1.5s
audio.addEventListener('error', () => {
  console.warn('Audio error, skipping track:', audio.src);
  state.isPlaying = false;
  renderPlayState();
  renderPlaylist();
  setTimeout(skipNext, 1500);
});

/* ═══════════════════════════════════════════════════════
   9. CONTROLS
   ═══════════════════════════════════════════════════════ */
btnPlay.addEventListener('click', togglePlay);
btnPrev.addEventListener('click', skipPrev);
btnNext.addEventListener('click', skipNext);

btnShuffle.addEventListener('click', () => { state.isShuffle = !state.isShuffle; renderModeButtons(); });
btnRepeat.addEventListener('click',  () => { state.isRepeat  = !state.isRepeat;  renderModeButtons(); });

progressBar.addEventListener('input', () => {
  if (!isFinite(audio.duration)) return;
  audio.currentTime        = (progressBar.value / 100) * audio.duration;
  progressFill.style.width = progressBar.value + '%';
});

volumeBar.addEventListener('input', () => {
  state.volume  = parseFloat(volumeBar.value);
  state.isMuted = state.volume === 0;
  audio.volume  = state.volume;
  renderVolume();
});

btnMute.addEventListener('click', () => {
  state.isMuted = !state.isMuted;
  audio.volume  = state.isMuted ? 0 : state.volume;
  volumeFill.style.width = state.isMuted ? '0%' : (state.volume * 100) + '%';
  renderVolume();
});

/* Keyboard shortcuts (Space, arrows) */
document.addEventListener('keydown', e => {
  if (document.activeElement === searchInput) return;
  switch (e.code) {
    case 'Space':      e.preventDefault(); togglePlay(); break;
    case 'ArrowRight': e.preventDefault(); skipNext();   break;
    case 'ArrowLeft':  e.preventDefault(); skipPrev();   break;
    case 'ArrowUp':
      e.preventDefault();
      state.volume = Math.min(1, state.volume + 0.05);
      audio.volume = state.volume;
      volumeBar.value = state.volume;
      renderVolume();
      break;
    case 'ArrowDown':
      e.preventDefault();
      state.volume = Math.max(0, state.volume - 0.05);
      audio.volume = state.volume;
      volumeBar.value = state.volume;
      renderVolume();
      break;
  }
});

/* ═══════════════════════════════════════════════════════
   10. SEARCH
   ═══════════════════════════════════════════════════════ */
searchInput.addEventListener('input', () => {
  state.searchQuery = searchInput.value.trim();
  clearSearchBtn.hidden = state.searchQuery === '';
  applyFilters();
});

clearSearchBtn.addEventListener('click', () => {
  searchInput.value     = '';
  state.searchQuery     = '';
  clearSearchBtn.hidden = true;
  searchInput.focus();
  applyFilters();
});

/* ═══════════════════════════════════════════════════════
   11. INIT
   ═══════════════════════════════════════════════════════ */
function init() {
  audio.volume    = state.volume;
  volumeBar.value = state.volume;
  renderVolume();
  renderGenreChips();
  applyFilters();
  renderNowPlaying(null);
  renderPlayState();
  renderModeButtons();
  currentTimeEl.textContent = '0:00';
  durationEl.textContent    = '0:00';
}

init();
