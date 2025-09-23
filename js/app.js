// ===== VARIABLES GLOBALES =====
let activeWindows = new Set();
let windowPositions = new Map();
let draggedWindow = null;
let dragOffset = { x: 0, y: 0 };

// ===== INITIALISATION =====
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    updateTime();
    setInterval(updateTime, 1000);
});

function initializeApp() {
    setupNavigation();
    setupDesktopIcons();
    setupWindowControls();
    setupDragAndDrop();
    setupMobileNav();
    
    // Positions initiales des fenêtres
    const windows = document.querySelectorAll('.window');
    windows.forEach((window, index) => {
        const x = 100 + (index % 3) * 50;
        const y = 100 + Math.floor(index / 3) * 50;
        windowPositions.set(window.id, { x, y });
    });
}

// ===== NAVIGATION =====
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            openWindow(tabName);
            
            // Mise à jour des liens actifs
            navLinks.forEach(nl => nl.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// ===== ICÔNES BUREAU =====
function setupDesktopIcons() {
    const desktopIcons = document.querySelectorAll('.desktop-icon');
    
    desktopIcons.forEach(icon => {
        // Double-clic pour ouvrir
        icon.addEventListener('dblclick', function() {
            const tabName = this.getAttribute('data-tab');
            openWindow(tabName);
        });
        
        // Effet de sélection
        icon.addEventListener('click', function() {
            desktopIcons.forEach(di => di.classList.remove('selected'));
            this.classList.add('selected');
        });
    });
}

// ===== OUVERTURE/FERMETURE FENÊTRES =====
function openWindow(tabName) {
    const window = document.getElementById(`${tabName}-window`);
    if (!window) return;
    
    // Si la fenêtre est déjà ouverte, la mettre au premier plan
    if (activeWindows.has(tabName)) {
        bringToFront(window);
        return;
    }
    
    // Position de la fenêtre
    const position = windowPositions.get(window.id) || { x: 100, y: 100 };
    window.style.left = position.x + 'px';
    window.style.top = position.y + 'px';
    
    // Afficher la fenêtre
    window.classList.add('active');
    activeWindows.add(tabName);
    
    // Mettre au premier plan
    bringToFront(window);
    
    // Ajouter à la taskbar
    addToTaskbar(tabName);
    
    // Animation d'ouverture
    window.style.transform = 'scale(0.8)';
    window.style.opacity = '0';
    
    requestAnimationFrame(() => {
        window.style.transform = 'scale(1)';
        window.style.opacity = '1';
    });
}

function closeWindow(tabName) {
    const window = document.getElementById(`${tabName}-window`);
    if (!window) return;
    
    // Animation de fermeture
    window.style.transform = 'scale(0.8)';
    window.style.opacity = '0';
    
    setTimeout(() => {
        window.classList.remove('active');
        activeWindows.delete(tabName);
        removeFromTaskbar(tabName);
        
        // Reset des styles
        window.style.transform = '';
        window.style.opacity = '';
    }, 200);
}

function minimizeWindow(tabName) {
    const window = document.getElementById(`${tabName}-window`);
    if (!window) return;
    
    // Animation de minimisation vers la taskbar
    window.style.transform = 'scale(0.1) translateY(200px)';
    window.style.opacity = '0';
    
    setTimeout(() => {
        window.style.display = 'none';
        window.style.transform = '';
        window.style.opacity = '';
    }, 300);
}

function maximizeWindow(tabName) {
    const window = document.getElementById(`${tabName}-window`);
    if (!window) return;
    
    if (window.classList.contains('maximized')) {
        // Restaurer
        window.classList.remove('maximized');
        const position = windowPositions.get(window.id);
        window.style.left = position.x + 'px';
        window.style.top = position.y + 'px';
        window.style.width = '';
        window.style.height = '';
    } else {
        // Maximiser
        windowPositions.set(window.id, {
            x: parseInt(window.style.left),
            y: parseInt(window.style.top)
        });
        window.classList.add('maximized');
    }
}

// ===== CONTRÔLES FENÊTRES =====
function setupWindowControls() {
    const controls = document.querySelectorAll('.control');
    
    controls.forEach(control => {
        control.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const window = this.closest('.window');
            const tabName = window.getAttribute('data-tab');
            const action = this.getAttribute('data-action');
            
            switch(action) {
                case 'close':
                    closeWindow(tabName);
                    break;
                case 'minimize':
                    minimizeWindow(tabName);
                    break;
                case 'maximize':
                    maximizeWindow(tabName);
                    break;
            }
        });
    });
}

// ===== DRAG & DROP =====
function setupDragAndDrop() {
    const windows = document.querySelectorAll('.window');
    
    windows.forEach(window => {
        const header = window.querySelector('.window-header');
        
        header.addEventListener('mousedown', startDrag);
        header.addEventListener('dblclick', function() {
            const tabName = window.getAttribute('data-tab');
            maximizeWindow(tabName);
        });
    });
    
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', endDrag);
}

function startDrag(e) {
    if (e.target.classList.contains('control')) return;
    
    draggedWindow = this.closest('.window');
    const rect = draggedWindow.getBoundingClientRect();
    
    dragOffset.x = e.clientX - rect.left;
    dragOffset.y = e.clientY - rect.top;
    
    bringToFront(draggedWindow);
    draggedWindow.style.userSelect = 'none';
}

function drag(e) {
    if (!draggedWindow || draggedWindow.classList.contains('maximized')) return;
    
    const x = e.clientX - dragOffset.x;
    const y = e.clientY - dragOffset.y;
    
    // Limites de l'écran
    const maxX = window.innerWidth - draggedWindow.offsetWidth;
    const maxY = window.innerHeight - draggedWindow.offsetHeight - 60; // 60px pour la navbar
    
    draggedWindow.style.left = Math.max(0, Math.min(x, maxX)) + 'px';
    draggedWindow.style.top = Math.max(60, Math.min(y, maxY)) + 'px';
}

function endDrag() {
    if (draggedWindow) {
        draggedWindow.style.userSelect = '';
        
        // Sauvegarder la position
        windowPositions.set(draggedWindow.id, {
            x: parseInt(draggedWindow.style.left),
            y: parseInt(draggedWindow.style.top)
        });
        
        draggedWindow = null;
    }
}

// ===== Z-INDEX MANAGEMENT =====
let highestZIndex = 100;

function bringToFront(window) {
    window.style.zIndex = ++highestZIndex;
}

// ===== TASKBAR =====
function addToTaskbar(tabName) {
    const taskbarApps = document.getElementById('taskbar-apps');
    const existingApp = taskbarApps.querySelector(`[data-tab="${tabName}"]`);
    
    if (existingApp) {
        existingApp.classList.add('active');
        return;
    }
    
    const window = document.getElementById(`${tabName}-window`);
    const title = window.querySelector('.window-title span').textContent;
    
    const taskbarApp = document.createElement('div');
    taskbarApp.className = 'taskbar-app active';
    taskbarApp.setAttribute('data-tab', tabName);
    taskbarApp.textContent = title;
    
    taskbarApp.addEventListener('click', function() {
        const window = document.getElementById(`${tabName}-window`);
        
        if (window.style.display === 'none') {
            // Restaurer depuis la minimisation
            window.style.display = 'flex';
            window.style.transform = 'scale(1)';
            window.style.opacity = '1';
        } else {
            // Mettre au premier plan ou minimiser si déjà au premier plan
            if (window.style.zIndex == highestZIndex) {
                minimizeWindow(tabName);
                this.classList.remove('active');
            } else {
                bringToFront(window);
            }
        }
    });
    
    taskbarApps.appendChild(taskbarApp);
}

function removeFromTaskbar(tabName) {
    const taskbarApps = document.getElementById('taskbar-apps');
    const app = taskbarApps.querySelector(`[data-tab="${tabName}"]`);
    if (app) {
        app.remove();
    }
}

// ===== NAVIGATION MOBILE =====
function setupMobileNav() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Fermer le menu mobile lors du clic sur un lien
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
            }
        });
    });
}

// ===== HEURE =====
function updateTime() {
    const timeElement = document.getElementById('current-time');
    const now = new Date();
    const timeString = now.toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit'
    });
    timeElement.textContent = timeString;
}

// ===== BOUTON START =====
document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.querySelector('.start-button');
    
    startButton.addEventListener('click', function() {
        // Afficher toutes les fenêtres ou menu start
        const desktopIcons = document.querySelectorAll('.desktop-icon');
        desktopIcons.forEach((icon, index) => {
            setTimeout(() => {
                icon.style.animation = 'bounce 0.6s ease';
                setTimeout(() => {
                    icon.style.animation = '';
                }, 600);
            }, index * 100);
        });
    });
});

// ===== GESTION FORMULAIRE CONTACT =====
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('#contact-window form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Animation du bouton
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi...';
            submitBtn.disabled = true;
            
            // Simulation d'envoi
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Envoyé !';
                submitBtn.style.background = '#10b981';
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    this.reset();
                }, 2000);
            }, 2000);
        });
    }
});

// ===== ANIMATIONS CSS =====
const style = document.createElement('style');
style.textContent = `
    @keyframes bounce {
        0%, 20%, 60%, 100% {
            transform: translateY(0);
        }
        40% {
            transform: translateY(-20px);
        }
        80% {
            transform: translateY(-10px);
        }
    }
    
    .desktop-icon.selected {
        background: rgba(37, 99, 235, 0.2) !important;
        border: 1px solid var(--primary-color);
    }
    
    .window {
        transition: transform 0.3s ease, opacity 0.3s ease;
    }
`;
document.head.appendChild(style);

// ===== RACCOURCIS CLAVIER =====
document.addEventListener('keydown', function(e) {
    // Alt + Tab pour changer de fenêtre
    if (e.altKey && e.key === 'Tab') {
        e.preventDefault();
        cycleWindows();
    }
    
    // Échap pour fermer la fenêtre active
    if (e.key === 'Escape') {
        const activeWindow = document.querySelector('.window[style*="z-index: ' + highestZIndex + '"]');
        if (activeWindow) {
            const tabName = activeWindow.getAttribute('data-tab');
            closeWindow(tabName);
        }
    }
});

function cycleWindows() {
    const openWindows = Array.from(activeWindows);
    if (openWindows.length <= 1) return;
    
    const currentWindow = document.querySelector('.window[style*="z-index: ' + highestZIndex + '"]');
    const currentTab = currentWindow ? currentWindow.getAttribute('data-tab') : null;
    const currentIndex = openWindows.indexOf(currentTab);
    const nextIndex = (currentIndex + 1) % openWindows.length;
    const nextWindow = document.getElementById(`${openWindows[nextIndex]}-window`);
    
    bringToFront(nextWindow);
}