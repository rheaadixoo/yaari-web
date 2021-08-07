ng build --prod
# mv dist/can-frontend-boilerplate/ deploy
# rm -R dist
# mv deploy/ dist
scp -r dist/ root@172.104.187.208:/home/crsuser/projects/housr/housr-dashboard/
