//overlay

let sidebar;
let toggleButton;

$(document).ready(function() {
    toggleButton = $('#toggle-btn');
    sidebar = $('#sidebar');
});

function toggleSidebar() {
    console.log("Toggle sidebar clicked");
    sidebar.toggleClass('close');
    toggleButton.toggleClass('rotate');

    closeAllSubMenus();
}


function toggleSubMenu(buttonId) {
    const button = $(`#${buttonId}`);

    const subMenu = button.next('.sub-menu');

    if (!subMenu.hasClass('show')) {
        closeAllSubMenus();
    }

    subMenu.toggleClass('show');
    button.toggleClass('rotate');

    if (sidebar.hasClass('close')) {
        sidebar.toggleClass('close');
        toggleButton.toggleClass('rotate');
    }
}

function closeAllSubMenus() {
    sidebar.find('.show').removeClass('show')
        .prev().removeClass('rotate');
}

