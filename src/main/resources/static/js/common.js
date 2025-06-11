//overlay


$(document).ready(function() {
    const $sidebar = $('.sidebar');
    const $mainContent = $('.main-content');


    $('#toggle-btn').click(function() {
        $sidebar.toggleClass('collapsed');
        $mainContent.toggleClass('expanded');

        // Save state in localStorage
        const isCollapsed = $sidebar.hasClass('collapsed');
        localStorage.setItem('sidebarCollapsed', isCollapsed);
    });

    if (localStorage.getItem('sidebarCollapsed') === 'true') {
        $sidebar.addClass('collapsed');
        $mainContent.addClass('expanded');
    }

});

