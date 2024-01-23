import generalHeader from '../pageObjects/header/generalHeader';
import sideBar from '../pageObjects/sidebar/sideBar';
import cyp from '../utils/cypressManager';

describe('General Header Tests', () => {

  beforeEach(() => {
    cyp.navigateTo();
  });

  it('Validate Header Elements', () => {
    generalHeader.validateLeftMenu();
    generalHeader.validateRightMenu();
  });

  it('Validate Theme Selection', () => {
    generalHeader.validateThemeSelection('cosmic');
    generalHeader.validateThemeSelection('corporate');
    generalHeader.validateThemeSelection('light');
    generalHeader.validateThemeSelection('dark');
  });

  it('Validate Sidebar Toggle', () => {
    sideBar.validateSidebarOptions();
    generalHeader.toggleSideBar();
    sideBar.validateSidebarIsClosed();
    generalHeader.toggleSideBar();
    sideBar.validateSidebarIsOpen()
  });
});