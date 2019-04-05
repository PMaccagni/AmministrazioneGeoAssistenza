/*
    Copyright 2018, 2019 Pietro Maccagni
    
    This file is part of AmministrazioneGeoAssistenza.

    AmministrazioneGeoAssistenza is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    AmministrazioneGeoAssistenza is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with AmministrazioneGeoAssistenza.  If not, see <http://www.gnu.org/licenses/>.
*/
Ext.define('GeoAssistenza.view.main.Info', {
    extend: 'Ext.Panel',
    xtype: 'info',

    title: 'Informazioni',

    scrollable: true,

    items: [{
        xtype: 'label',
        html: 'Versione del software: <b>1.0.0.0</b><br><br>'+
            'Questo software è stato fatto da <b>Pietro Maccagni</b><br>' +
            'ed è sotto licenza <b><a href="https://www.gnu.org/licenses/gpl-3.0.html" target="_blank">GPL</a></b><br>' +
            'puoi trovare i sorgenti <a href="https://github.com/PMaccagni/AmministrazioneGeoAssistenza" target="_blank">QUI</a></b>'
    }]
});
