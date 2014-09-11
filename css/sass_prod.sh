#compass compile -s compressed sass/main.scss
#compass compile -s compressed sass/restoadmin.scss
#compass compile -s compressed sass/database.scss

. sass_common.sh
compass watch -s compressed $FILES
