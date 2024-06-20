--[[ FX Information ]]--
fx_version   'cerulean'
use_experimental_fxv2_oal 'yes'
lua54        'yes'
game         'gta5'

--[[ Resource Information ]]--
name         'ox_mdt'
version      '0.3.0'
description  'MDT'
author       'overextended'
repository   'https://github.com/overextended/ox_mdt'

--[[ Manifest ]]--
dependencies {
	'/server:6279',
	'/onesync',
}

ox_libs {
    'locale',
}

shared_scripts {
	'@ox_lib/init.lua',
    '@ox_core/lib/init.lua'
}

client_scripts {
    'client/main.lua',
}

server_scripts {
	'@oxmysql/lib/MySQL.lua',
    'server/main.lua',
}

ui_page 'web/build/index.html'

files {
    'web/build/index.html',
    'web/build/**/*',
    'locales/*.json',
    'client/framework/*.lua',
    'config.lua'
}
