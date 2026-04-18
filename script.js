/* ============================================================
   STUDY ASSISTANT — script.js
   Beginner-friendly: plain functions, descriptive names
   ============================================================ */

'use strict';

/* ──────────────────────────────────────────────
   1. KNOWLEDGE BASE — topics with explanations
   ────────────────────────────────────────────── */
var KNOWLEDGE_BASE = [
  {
    id: 'osi-model',
    title: 'OSI Model',
    category: 'Networking',
    icon: '🔗',
    keywords: ['osi', 'osi model', 'layers', 'network layers'],
    snippet: 'The 7-layer reference model that standardizes network communication.',
    explanation:
      'The OSI Model consists of 7 layers: Physical, Data Link, Network, Transport, Session, ' +
      'Presentation, and Application. It standardizes how different systems communicate so that ' +
      'hardware and software from any vendor can interoperate.',
    points: [
      '7 layers: Physical → Data Link → Network → Transport → Session → Presentation → Application',
      'Each layer has a single, well-defined responsibility',
      'Enables interoperability between different vendors',
      'Widely used as a reference model for teaching and troubleshooting',
    ],
  },
  {
    id: 'tcp-ip',
    title: 'TCP/IP',
    category: 'Networking',
    icon: '📡',
    keywords: ['tcp', 'ip', 'tcp/ip', 'protocol', 'internet protocol'],
    snippet: 'The protocol suite that powers the entire internet.',
    explanation:
      'TCP/IP is the suite of communication protocols used to connect devices on the internet. ' +
      'TCP ensures reliable, ordered delivery of data while IP handles addressing and routing ' +
      'between hosts across networks.',
    points: [
      'TCP handles reliable delivery and error correction',
      'IP handles logical addressing and routing',
      'Foundation of all modern internet communication',
      'Works across heterogeneous networks',
    ],
  },
  {
    id: 'recursion',
    title: 'Recursion',
    category: 'Programming',
    icon: '🔄',
    keywords: ['recursion', 'recursive', 'function calls itself'],
    snippet: 'A function that solves problems by calling itself on smaller inputs.',
    explanation:
      'Recursion is a programming technique where a function calls itself to solve a smaller ' +
      'instance of the same problem. Every recursive function needs a base case to stop the ' +
      'recursion and a recursive case that moves toward that base case.',
    points: [
      'Always needs a base case to prevent infinite calls',
      'Each call works on a smaller version of the problem',
      'Great for tree, graph, and divide-and-conquer problems',
      'Can be less memory-efficient than iteration',
    ],
  },
  {
    id: 'data-structures',
    title: 'Data Structures',
    category: 'Programming',
    icon: '🗂️',
    keywords: ['data structure', 'data structures', 'array', 'linked list', 'tree', 'graph'],
    snippet: 'Ways to organize data for efficient access and modification.',
    explanation:
      'Data structures are specialized formats for organizing, processing, and storing data. ' +
      'Choosing the right one for your problem can make code dramatically faster and clearer.',
    points: [
      'Arrays: fast indexed access, fixed size',
      'Linked lists: easy insertion/deletion, slow lookup',
      'Trees: hierarchical, ideal for searching',
      'Graphs: model relationships between entities',
    ],
  },
  {
    id: 'big-o',
    title: 'Big O Notation',
    category: 'Programming',
    icon: '📈',
    keywords: ['big o', 'complexity', 'time complexity', 'space complexity'],
    snippet: 'A notation for describing how algorithms scale with input size.',
    explanation:
      'Big O notation describes the upper bound on the growth rate of an algorithm in terms of ' +
      'time or space as the input size grows. It helps developers compare algorithms and predict ' +
      'how they will behave on large inputs.',
    points: [
      'O(1): constant time — best case',
      'O(log n): logarithmic — very efficient',
      'O(n): linear — scales with input',
      'O(n²): quadratic — slow on large inputs',
    ],
  },
  {
    id: 'photosynthesis',
    title: 'Photosynthesis',
    category: 'Biology',
    icon: '🌿',
    keywords: ['photosynthesis', 'plants', 'chlorophyll', 'sunlight'],
    snippet: 'How plants convert light energy into chemical energy.',
    explanation:
      'Photosynthesis is the process by which green plants, algae, and some bacteria convert ' +
      'light energy from the sun into chemical energy stored in glucose. Carbon dioxide and ' +
      'water are the inputs, and oxygen is released as a byproduct.',
    points: [
      'Occurs mainly in the chloroplasts of plant cells',
      'Inputs: CO₂, water, sunlight',
      'Outputs: glucose and oxygen',
      'Forms the foundation of nearly all food chains',
    ],
  },
  {
    id: 'newton-laws',
    title: "Newton's Laws of Motion",
    category: 'Physics',
    icon: '🍎',
    keywords: ['newton', 'newton laws', 'motion', 'force', 'inertia'],
    snippet: 'The three foundational laws describing how objects move.',
    explanation:
      "Newton's three laws of motion describe the relationship between a body and the forces " +
      'acting on it. They form the basis of classical mechanics and explain everything from ' +
      'falling apples to rocket launches.',
    points: [
      '1st Law: An object stays at rest or in motion unless acted upon by a force',
      '2nd Law: Force = mass × acceleration (F = ma)',
      '3rd Law: For every action there is an equal and opposite reaction',
      'Forms the foundation of classical mechanics',
    ],
  },
  {
    id: 'pythagoras',
    title: 'Pythagorean Theorem',
    category: 'Mathematics',
    icon: '📐',
    keywords: ['pythagoras', 'pythagorean', 'triangle', 'hypotenuse'],
    snippet: 'The relationship between the sides of a right triangle.',
    explanation:
      'The Pythagorean theorem states that in a right-angled triangle, the square of the ' +
      'hypotenuse equals the sum of the squares of the other two sides: a² + b² = c². It is ' +
      'one of the most useful formulas in geometry.',
    points: [
      'Only applies to right-angled triangles',
      'Formula: a² + b² = c²',
      'c is always the hypotenuse (longest side)',
      'Used everywhere from architecture to navigation',
    ],
  },
  {
    id: 'mitochondria',
    title: 'Mitochondria',
    category: 'Biology',
    icon: '⚡',
    keywords: ['mitochondria', 'cell', 'energy', 'powerhouse', 'atp'],
    snippet: 'The "powerhouse" of the cell that produces energy.',
    explanation:
      'Mitochondria are organelles found in most eukaryotic cells. They produce most of the ' +
      "cell's supply of ATP (adenosine triphosphate), which is used as a source of chemical " +
      'energy. They have their own DNA and are believed to have evolved from ancient bacteria.',
    points: [
      'Generate ATP through cellular respiration',
      'Have their own circular DNA',
      'Inherited only from the mother',
      'Number per cell varies based on energy needs',
    ],
  },
];

/* ──────────────────────────────────────────────
   2. SEARCH — find best matching topic
   ────────────────────────────────────────────── */

// Find a topic that matches the user's query
function findMatchingTopic(query) {
  var cleanQuery = query.toLowerCase().trim();
  if (cleanQuery === '') return null;

  // First pass: exact keyword match
  for (var i = 0; i < KNOWLEDGE_BASE.length; i++) {
    var topic = KNOWLEDGE_BASE[i];
    for (var k = 0; k < topic.keywords.length; k++) {
      if (topic.keywords[k] === cleanQuery) return topic;
    }
  }

  // Second pass: partial match (query contains keyword or keyword contains query)
  for (var j = 0; j < KNOWLEDGE_BASE.length; j++) {
    var t = KNOWLEDGE_BASE[j];
    for (var m = 0; m < t.keywords.length; m++) {
      var kw = t.keywords[m];
      if (cleanQuery.indexOf(kw) !== -1 || kw.indexOf(cleanQuery) !== -1) {
        return t;
      }
    }
  }

  return null;
}

// Render a topic into the result panel
function showTopicResult(topic) {
  var panel = document.getElementById('resultPanel');
  if (!topic) {
    panel.innerHTML =
      '<div class="result-empty">' +
        '<i class="bi bi-search"></i>' +
        '<p>Hmm, no match found. Try one of the topic chips above!</p>' +
      '</div>';
  } else {
    var pointsHtml = '';
    for (var i = 0; i < topic.points.length; i++) {
      pointsHtml += '<li>' + topic.points[i] + '</li>';
    }

    panel.innerHTML =
      '<div class="result-panel-header">' +
        '<div class="result-icon">' + topic.icon + '</div>' +
        '<div>' +
          '<div class="result-category">' + topic.category + '</div>' +
          '<h3 class="result-title">' + topic.title + '</h3>' +
        '</div>' +
      '</div>' +
      '<p class="result-explanation">' + topic.explanation + '</p>' +
      '<ul class="result-points">' + pointsHtml + '</ul>';
  }

  panel.hidden = false;
  panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Handle search form submission
function handleSearchSubmit(event) {
  event.preventDefault();
  var input = document.getElementById('searchInput');
  var topic = findMatchingTopic(input.value);
  showTopicResult(topic);
}

// Used by the chip buttons and topic cards
function quickSearch(term) {
  var input = document.getElementById('searchInput');
  input.value = term;
  var topic = findMatchingTopic(term);
  showTopicResult(topic);
}

/* ──────────────────────────────────────────────
   3. TOPICS GRID — build cards from knowledge base
   ────────────────────────────────────────────── */
function buildTopicsGrid() {
  var grid = document.getElementById('topicsGrid');
  if (!grid) return;

  var html = '';
  for (var i = 0; i < KNOWLEDGE_BASE.length; i++) {
    var t = KNOWLEDGE_BASE[i];
    html +=
      '<div class="col-md-6 col-lg-4 reveal">' +
        '<div class="topic-card" onclick="quickSearch(\'' + t.title.replace(/'/g, "\\'") + '\')">' +
          '<div class="topic-icon">' + t.icon + '</div>' +
          '<div class="topic-cat">' + t.category + '</div>' +
          '<h3 class="topic-title">' + t.title + '</h3>' +
          '<p class="topic-snippet">' + t.snippet + '</p>' +
          '<span class="topic-link">Read more <i class="bi bi-arrow-right"></i></span>' +
        '</div>' +
      '</div>';
  }
  grid.innerHTML = html;
}

/* ──────────────────────────────────────────────
   4. STICKY NAVBAR — add shadow on scroll
   ────────────────────────────────────────────── */
function handleNavbarScroll() {
  var navbar = document.getElementById('mainNavbar');
  if (window.scrollY > 30) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

/* ──────────────────────────────────────────────
   5. SCROLL REVEAL — fade-in animation
   ────────────────────────────────────────────── */
function setupScrollReveal() {
  var elements = document.querySelectorAll('.reveal');

  var observer = new IntersectionObserver(function (entries) {
    for (var i = 0; i < entries.length; i++) {
      if (entries[i].isIntersecting) {
        entries[i].target.classList.add('is-visible');
        observer.unobserve(entries[i].target);
      }
    }
  }, { threshold: 0.12 });

  for (var j = 0; j < elements.length; j++) {
    observer.observe(elements[j]);
  }
}

/* ──────────────────────────────────────────────
   6. STATS COUNTER — animate numbers
   ────────────────────────────────────────────── */
function animateStatNumber(el) {
  var target = parseInt(el.getAttribute('data-target'), 10);
  var duration = 1600;
  var startTime = null;

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    var progress = Math.min((timestamp - startTime) / duration, 1);
    var current = Math.floor(progress * target);
    el.textContent = current.toLocaleString();
    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      el.textContent = target.toLocaleString();
    }
  }
  requestAnimationFrame(step);
}

function setupStatsCounter() {
  var stats = document.querySelectorAll('.stat-number');

  var observer = new IntersectionObserver(function (entries) {
    for (var i = 0; i < entries.length; i++) {
      if (entries[i].isIntersecting) {
        animateStatNumber(entries[i].target);
        observer.unobserve(entries[i].target);
      }
    }
  }, { threshold: 0.4 });

  for (var j = 0; j < stats.length; j++) {
    observer.observe(stats[j]);
  }
}

/* ──────────────────────────────────────────────
   7. NEWSLETTER FORM — fake submit handler
   ────────────────────────────────────────────── */
function handleNewsletterSubmit(event) {
  event.preventDefault();
  var emailInput = document.getElementById('newsletterEmail');
  var msg = document.getElementById('newsletterMsg');

  msg.textContent = '✓ Thanks! Check your inbox to confirm your subscription.';
  msg.hidden = false;
  emailInput.value = '';

  setTimeout(function () { msg.hidden = true; }, 5000);
}

/* ──────────────────────────────────────────────
   8. INIT — run when page is ready
   ────────────────────────────────────────────── */
function initStudyAssistant() {
  buildTopicsGrid();
  setupScrollReveal();
  setupStatsCounter();
  window.addEventListener('scroll', handleNavbarScroll);
  handleNavbarScroll();
}

// Expose handlers used by inline onclick / onsubmit
window.handleSearchSubmit = handleSearchSubmit;
window.quickSearch = quickSearch;
window.handleNewsletterSubmit = handleNewsletterSubmit;

document.addEventListener('DOMContentLoaded', initStudyAssistant);


