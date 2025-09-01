const canvas = document.getElementById('canvas');
const toolbox = document.getElementById('controls');
const imagePicker = document.getElementById('imagePicker');
let selectedImage = '../media/hero.jpg';
let draggedSection = null;
let draggedMenu = null;
const navList = document.getElementById('navList');
const primaryColor = document.getElementById('primaryColor');

imagePicker.querySelectorAll('img').forEach(img => {
  img.addEventListener('click', () => {
    selectedImage = img.getAttribute('src');
    imagePicker.querySelectorAll('img').forEach(i => i.classList.remove('selected'));
    img.classList.add('selected');
  });
});

// Drag from toolbox
toolbox.addEventListener('dragstart', e => {
  if (e.target.classList.contains('tool')) {
    e.dataTransfer.setData('type', e.target.dataset.type);
  }
});

canvas.addEventListener('dragover', e => e.preventDefault());
canvas.addEventListener('drop', e => {
  e.preventDefault();
  const type = e.dataTransfer.getData('type');
  if (type) {
    let el;
    if (type === 'header') {
      el = document.createElement('h2');
      el.textContent = 'Header';
      el.contentEditable = true;
    } else if (type === 'paragraph') {
      el = document.createElement('p');
      el.textContent = 'Your text';
      el.contentEditable = true;
    } else if (type === 'image') {
      el = document.createElement('img');
      el.src = selectedImage;
    }
    if (el) {
      el.classList.add('section');
      el.draggable = true;
      canvas.appendChild(el);
    }
  } else if (draggedSection) {
    if (e.target.classList.contains('section')) {
      canvas.insertBefore(draggedSection, e.target.nextSibling);
    } else {
      canvas.appendChild(draggedSection);
    }
    draggedSection = null;
  }
});

canvas.addEventListener('dragstart', e => {
  if (e.target.classList.contains('section')) {
    draggedSection = e.target;
  }
});

// Menu item add and reorder
function refreshMenuDraggables() {
  navList.querySelectorAll('li').forEach(li => li.draggable = true);
}
refreshMenuDraggables();

document.getElementById('addMenuItem').addEventListener('click', () => {
  const text = document.getElementById('newMenuText').value.trim();
  if (!text) return;
  const li = document.createElement('li');
  li.textContent = text;
  li.contentEditable = true;
  navList.appendChild(li);
  document.getElementById('newMenuText').value = '';
  refreshMenuDraggables();
});

navList.addEventListener('dragstart', e => {
  if (e.target.tagName === 'LI') {
    draggedMenu = e.target;
  }
});
navList.addEventListener('dragover', e => e.preventDefault());
navList.addEventListener('drop', e => {
  e.preventDefault();
  if (e.target.tagName === 'LI' && draggedMenu) {
    navList.insertBefore(draggedMenu, e.target.nextSibling);
  } else if (draggedMenu) {
    navList.appendChild(draggedMenu);
  }
  draggedMenu = null;
});

// Color palette
primaryColor.addEventListener('input', () => {
  document.documentElement.style.setProperty('--primary', primaryColor.value);
});

// Save/Load/Clear
function refreshSections() {
  canvas.querySelectorAll('.section').forEach(sec => sec.draggable = true);
}

document.getElementById('save').addEventListener('click', () => {
  const data = {
    menu: navList.innerHTML,
    content: canvas.innerHTML,
    color: primaryColor.value
  };
  localStorage.setItem('metaMock', JSON.stringify(data));
  alert('Saved');
});

document.getElementById('load').addEventListener('click', () => {
  const raw = localStorage.getItem('metaMock');
  if (!raw) return;
  const data = JSON.parse(raw);
  navList.innerHTML = data.menu || '';
  canvas.innerHTML = data.content || '';
  primaryColor.value = data.color || '#009688';
  document.documentElement.style.setProperty('--primary', primaryColor.value);
  refreshMenuDraggables();
  refreshSections();
});

// auto load existing
if (localStorage.getItem('metaMock')) {
  const raw = localStorage.getItem('metaMock');
  const data = JSON.parse(raw);
  navList.innerHTML = data.menu || '';
  canvas.innerHTML = data.content || '';
  primaryColor.value = data.color || '#009688';
  document.documentElement.style.setProperty('--primary', primaryColor.value);
  refreshMenuDraggables();
  refreshSections();
}

document.getElementById('clear').addEventListener('click', () => {
  localStorage.removeItem('metaMock');
  location.reload();
});
