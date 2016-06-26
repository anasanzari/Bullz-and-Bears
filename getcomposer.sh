/opt/php56/bin/php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
/opt/php56/bin/php -r "if (hash_file('SHA384', 'composer-setup.php') === 'e115a8dc7871f15d853148a7fbac7da27d6c0030b848d9b3dc09e2a0388afed865e6a3d6b3c0fad45c48e2b5fc1196ae') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
/opt/php56/bin/php composer-setup.php
/opt/php56/bin/php -r "unlink('composer-setup.php');"
