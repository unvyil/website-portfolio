document.addEventListener("DOMContentLoaded", () => {
    const projectCards = document.querySelectorAll('.Projects .card');
    
    projectCards.forEach(card => {
        const arrow = document.createElement('a');
        arrow.innerHTML = '&#8599;'; 
        arrow.style.alignSelf = 'flex-end';
        arrow.style.cursor = 'pointer';
        arrow.style.color = '#ff48ac';
        arrow.style.fontSize = '1.5rem';
        arrow.style.textDecoration = 'none';
        
        card.appendChild(arrow);
    });
});