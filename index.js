const { Octokit } = require("@octokit/core");
const core = require("@actions/core");

// https://developer.github.com/v3/activity/events/types/#pushevent
const EVENT_PAYLOAD = require(process.env.GITHUB_EVENT_PATH);

run();

async function run() {
  // Get value for `with.file` from action *.yaml file
  const filePathToWatch = process.env.FILE_PATH_TO_WATCH;

  // Get commit hashes from before & after
  const { before, after, compare } = EVENT_PAYLOAD;

  // Instantiate Octokit (https://github.com/octokit/action.js)
  const octokit = new Octokit();

  // https://developer.github.com/v3/repos/commits/#compare-two-commits
  const [owner, repo] = process.env.GITHUB_REPOSITORY.split("/");
  const {
    data: { files }
  } = await octokit.request("GET /repos/:owner/:repo/compare/:base...:head", {
    owner,
    repo,
    base: before,
    head: after
  });

  changedFileNames = files.map(file => file.filename);

  console.log("changed files in push:");
  console.log(changedFileNames.join("\n"));
  console.log("");

  if (changedFileNames.includes(filePathToWatch)) {
    console.log(`✅ ${filePathToWatch} did change: ${compare}`);
    // https://github.com/actions/toolkit/tree/master/packages/core#inputsoutputs
    // Only supports string values.
    core.setOutput("changed", "true");
  } else {
    console.log(`❌ ${filePathToWatch} did not change: ${compare}`);
  }
}
