# watch-single-file-action-example

> Example for a GitHub Action that acts on changes to a single file

## How it works

The workflow is defined in [`.github/workflows/watch-file.yaml`](.github/workflows/watch-file.yaml).

On every push event, [`index.js`](index.js) is run. The file that is being watched is passed as `FILE_PATH_TO_WATCH` environment variable. The [payload from the push event](https://developer.github.com/v3/activity/events/types/#pushevent) includes two properties: `"before"` and `"after"`, which ared use to find out which files have been changed using the [Compare two commits](https://developer.github.com/v3/repos/commits/#compare-two-commits) endpoint. If the changed files include the file that is being watched, the `"changed"` output for the step is set to `"true"`.

The next step can check for this output in order to act on the file change.

## LICENSE

[ISC](LICENSE)
