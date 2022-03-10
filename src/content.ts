import { setTitle } from './util/contentscripts/title';
import { freezeIcon } from './util/contentscripts/favicon';
import { debouncedWindowFocusListener } from './util/windowfocus';

setTitle('Slack (but productive!)');

freezeIcon();

// Collapse sections when window is unfocused for 10 seconds
debouncedWindowFocusListener({
  debounceTimeMs: 10_000,
  blur() {
    console.log("Collapsing sections")
    document
      .querySelectorAll<HTMLElement>(
        '.p-channel_sidebar__section_heading:not(.p-channel_sidebar__section_heading--collapsed)' +
        ' .p-channel_sidebar__section_heading_expand_container')
      .forEach(el => el.click())
  }
})
