# [🚧 WIP 🚧] Productive Slack

A Web Extension to make Slack less distracting.

**NOTE:** This project is just getting started. See the feature list below for what is planned and what is done so far.

# Feature to-do list

* [X] Override the page title to not indicate unreads
* [x] Override the page icon to not indicate unreads ([issue #2](https://github.com/drmercer/productive-slack/issues/2))
* [x] Collapse sections in sidebar when window is unfocused
* [ ] User settings to enable/disable/configure features
* [ ] Basic personal analytics ([issue #3](https://github.com/drmercer/productive-slack/issues/3))
* [ ] Batch notifications on a regular interval instead of delivering them immediately ([issue #4](https://github.com/drmercer/productive-slack/issues/4))
* [ ] Filter unreads so that you only see unreads you care about the most ([issue #1](https://github.com/drmercer/productive-slack/issues/1))
* [ ] Some kind of "inbox" for important messages where you have to manually dismiss them so you can read messages without needing to respond right away ([issue #5](https://github.com/drmercer/productive-slack/issues/5))
* [ ] Manifest v3 (currently using v2). Blocked by https://github.com/parcel-bundler/parcel/issues/6079. Maybe switch to webpack and do something like [this](https://github.com/BCIT-DDC/web-extension-ts-starter).

# Project Goals

* Enable Slack users to be intentional about where their attention goes.

## Non-goals

* Block things. Blocking things causes reactance, and web extensions can be disabled in 3 easy clicks.
