import { setTitle } from './util/contentscripts/title';
import { freezeIcon } from './util/contentscripts/favicon';
import { debouncedWindowFocusListener } from './util/windowfocus';
import { log } from './util/log';

window.onerror = (event, _source, _lineno, _colno, error) => {
  log.error('Uncaught error:', error);
}

function addPwaManifest() {
  const webmanifestLink = document.createElement('link');
  webmanifestLink.rel = 'manifest';
  webmanifestLink.href = 'https://danmercer.net/slackwebmanifest.json';
  document.head.appendChild(webmanifestLink);
  log.info('Added webmanifest');
}
addPwaManifest();

setTitle('Slack (but productive!)');

const ukraineFavicon = 'https://a.slack-edge.com/5f35cf0/img/icons/favicon-32-ua.png';

freezeIcon(ukraineFavicon);

// Collapse sections when window is unfocused for 10 seconds
debouncedWindowFocusListener({
  debounceTimeMs: 10_000,
  blur() {
    log("Collapsing sections")
    document
      .querySelectorAll<HTMLElement>(
        '.p-channel_sidebar__section_heading:not(.p-channel_sidebar__section_heading--collapsed)' +
        ' .p-channel_sidebar__section_heading_expand_container')
      .forEach(el => el.click())
  }
})
