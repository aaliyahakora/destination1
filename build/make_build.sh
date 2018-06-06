# Clone pages repo and update with newly built packages
git clone --branch=master git@bitbucket.org:bitbucket-connect-wiki/bitbucket-connect-wiki.bitbucket.io.git pages-repo

npm install --save-dev
npx webpack --mode production

cp -R dist pages-repo
cp index.html pages-repo
cp connect.json pages-repo

cd pages-repo
git config --global user.email "dev@bitbucket.org"
git config --global user.name "Pipelines Build"
git add dist
git add index.html
git add connect.json
git commit -m "Build":`date -u +%F-%H%M`
git push origin master


