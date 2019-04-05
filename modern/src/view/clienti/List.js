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
Ext.define('GeoAssistenza.view.clienti.List', {
    extend: 'Ext.Panel',
    xtype: 'clienti-list',

    requires: [
        'GeoAssistenza.model.Clienti',
        'GeoAssistenza.view.clienti.ListController'
    ],

    controller: 'clienti-list',

    title: 'Lista clienti',

    scrollable: true,

    tools: [{
        type: 'search',
        handler: 'onSearchClick'
    }],

    items: [{
        xtype: 'list',
        reference: 'clientiGrid',
        itemTpl: '<b>{cli_nome}</b><br>'+
            '<b>cellulare:</b> {cli_cell}<br>'+
            '<b>Fisso:</b> {cli_tell}<br>'+
            '<b>Mail:</b> {cli_mail}<hr>',
        store: {
            model: 'GeoAssistenza.model.Clienti'
        }
    }]
});
