import cyp from '../../utils/cypressManager';

class Sidebar {
    private sidebar = 'nb-sidebar.menu-sidebar';
    private sidebar_opt = `${this.sidebar} nb-menu > ul.menu-items > li.menu-item > a span.menu-title`;

    validateSidebarOptions() {
        const options: string[] = [
            "Layout",
            "Forms",
            "Modal & Overlays",
            "Extra Components",
            "Tables & Data",
            "Auth"
        ]
        cyp.validateTextFromOptions(this.sidebar_opt, options)
    }

    validateSidebarIsClosed() {
        cyp.validateHaveClass(this.sidebar, "compacted");
        cyp.validateDoesNotHaveClass(this.sidebar, "expanded");
    }

    validateSidebarIsOpen() {
        cyp.validateHaveClass(this.sidebar, "expanded");
        cyp.validateDoesNotHaveClass(this.sidebar, "compacted");
    }
};

export default new Sidebar();