import { setTitle } from './util/contentscripts/title';
import { freezeIcon } from './util/contentscripts/favicon';
import { debouncedWindowFocusListener } from './util/windowfocus';
import { log } from './util/log';
import { recordEvent } from './store/store';

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
  },
})

watchFocusState();
function watchFocusState() {
  async function focused() {
    await recordEvent({
      type: 'focus',
      timestamp: new Date(),
      focused: true,
    })
    log.info('recorded focus event')
  }

  async function blurred() {
    await recordEvent({
      type: 'focus',
      timestamp: new Date(),
      focused: false,
    })
    log.info('recorded blur event')
  }

  debouncedWindowFocusListener({
    debounceTimeMs: 5_000,
    focus: focused,
    blur: blurred,
  })

  setTimeout(() => {
    if (document.hasFocus) {
      focused();
    } else {
      blurred();
    }
  }, 1000)
}
