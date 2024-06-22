document.addEventListener("DOMContentLoaded", function() {
    const projects = document.querySelectorAll('.project');
    const backgroundContainer = document.getElementById('background-container');
    
    // projects.forEach(project => {
    //     project.addEventListener('mouseenter', function() {
    //         const bgImage = this.getAttribute('data-bg');
    //         backgroundContainer.style.backgroundImage = `url(${bgImage})`;
    //         backgroundContainer.style.opacity = 1;
    //         console.log('in')
    //     });
    // });
});

let currentProject = -1;
function setProject(pidx) {
    if (pidx != currentProject) {
        let projects = document.getElementsByClassName("project");
        let prj = projects[pidx];
        console.log(pidx);

        const backgroundContainer = document.getElementById('background-container');
        const bgImage = prj.getAttribute('data-bg');
        backgroundContainer.style.backgroundImage = `url(${bgImage})`;
        backgroundContainer.style.opacity = 1;

        for (let i = 0; i < projects.length; i++) {
            projects[i].classList.toggle("pactive", i==pidx);
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    let startY = 0;
    let accumulatedDistance = 0;

    // Function to handle touch start
    function handleTouchStart(event) {
        // Only consider the first touch point
        if (event.touches.length === 1) {
            startY = event.touches[0].clientY;
        }
    }



    // Function to handle touch move
    function handleTouchMove(event) {
        if (event.touches.length === 1) {
            event.preventDefault();

            const currentY = event.touches[0].clientY;
            const distance = startY - currentY;
            accumulatedDistance += distance;
            startY = currentY;

            console.log('Accumulated distance:', accumulatedDistance);

            let pidx = Math.floor(-accumulatedDistance/50);
            function mod(n, m) {
                return ((n % m) + m) % m;
            }
            let projects = document.getElementsByClassName("project");
            pidx = mod(pidx, projects.length);

            setProject(pidx);

            // Add your custom logic here
        }
    }

    // Add event listeners for touch events
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    setProject(0);

});


