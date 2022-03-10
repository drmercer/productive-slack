import { setTitle } from './util/contentscripts/title';
import { freezeIcon } from './util/contentscripts/favicon';

setTitle('Slack (but productive!)');

freezeIcon();

// Collapse sections when window is unfocused for 10 seconds
let timeoutHandle: number = 0;
window.onblur = () => {
  timeoutHandle = setTimeout(() => {
    document
      .querySelectorAll<HTMLElement>(
        '.p-channel_sidebar__section_heading:not(.p-channel_sidebar__section_heading--collapsed)' +
        ' .p-channel_sidebar__section_heading_expand_container')
      .forEach(el => el.click())
  }, 10_000)
}

window.onfocus = () => {
  clearTimeout(timeoutHandle);
}
