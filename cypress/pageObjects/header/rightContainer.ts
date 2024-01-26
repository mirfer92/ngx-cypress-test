import cyp from '../../utils/cypressManager';
import { removeSpaces } from '../../utils/stringUtils';

class RightContainer {
    private menu_nav = 'nb-actions.size-small';
    private menu_item = 'nb-action.control-item';
    private menu_icons = {
        search: 'search-outline',
        email: 'email-outline',
        bell: 'bell-outline'
    };
    public menu_opt = (option: string) =>
        `${this.menu_nav} > ${this.menu_item}  [ng-reflect-icon='${this.menu_icons[option.toLowerCase()]}']`;
    
    private user_ctr = 'nb-user div.user-container';
    private user = {
        pic: 'div.user-picture',
        name: 'div.info-container > div.user-name'
    };
    public menu_user = (attr: string) => `${this.user_ctr} ${this.user[attr.toLowerCase()]}`;
    public profile_menu_ctr = 'nb-context-menu.nb-overlay-bottom';
    private profile = {
        profile: 'Profile',
        logout: 'Log out'
    };
    public profile_menu_opt = (option: string) =>
        `${this.profile_menu_ctr} ul.menu-items a[title="${this.profile[removeSpaces(option.toLowerCase())]}"] span.menu-title`;

    public openProfileMenu() {
        cyp.findElement(this.menu_user("pic")).click();
        cyp.findElement(this.profile_menu_ctr);
    };

    public closeProfileMenu() {
        cyp.findElement(this.menu_user("pic")).click();
        cyp.validateDoesNotExist(this.profile_menu_ctr);
    };
}

export default new RightContainer();