document.addEventListener("DOMContentLoaded", function() {
    const projects = document.querySelectorAll('.project');
    const backgroundContainer = document.getElementById('background-container');
    
    projects.forEach(project => {
        project.addEventListener('mouseenter', function() {
            const bgImage = this.getAttribute('data-bg');
            backgroundContainer.style.backgroundImage = `url(${bgImage})`;
            backgroundContainer.style.opacity = 1;
            console.log('in')
        });
        
        project.addEventListener('mouseleave', function() {
            backgroundContainer.style.opacity = 0;
        });
    });
});