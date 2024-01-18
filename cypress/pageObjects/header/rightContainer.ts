class RightContainer {
    private menu_nav = 'nb-actions.size-small';
    private menu_item = 'nb-action.control-item';
    private menu_icons = {
        search: 'search-outline',
        email: 'email-outline',
        bell: 'bell-outline'
    };
    public menu_opt = (option: string) => `${this.menu_nav} > ${this.menu_item}  [ng-reflect-icon='${this.menu_icons[option]}']`;
    
    private user_ctr = 'nb-user div.user-container';
    private user = {
        pic: 'div.user-picture',
        name: 'div.info-container > div.user-name'
    }
    public menu_user = (attr: string) => `${this.user_ctr} ${this.user[attr]}`;
}

export default new RightContainer();