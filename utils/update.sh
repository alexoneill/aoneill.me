# update.sh
# aoneill - 12/24/16

# Location of this script
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Go to base directory
cd $DIR/..

files="$@"

function update() { echo 'update'; }

git checkout master
git reset --hard
git pull

# If package.json was updated
[[ $files =~ package.json ]] && update && npm install

# Only force a reload if Node files changed
echo $files | tr ' ' '\n' \
  | grep -q -e "server\.js" -e "support/" && update

exit 0
