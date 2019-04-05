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
Ext.define('GeoAssistenza.view.interventi.List', {
    extend: 'Ext.Panel',
    xtype: 'interventi-list',

    requires: [
        'GeoAssistenza.model.Interventi',
        'GeoAssistenza.view.interventi.ListController'
    ],
    
    controller: 'interventi-list',

    title: 'Lista interventi',

    scrollable: true,

    tools: [{
        type: 'search',
        handler: 'onSearchClick'
    }, {
        type: 'plus',
        handler: 'onAddClick'
    }, {
        type: 'pin',
        handler: 'onEditClick'
    }],

    items: [{
        xtype: 'list',
        reference: 'interventiGrid',
        itemTpl: '<b>Intervento in data:</b> {int_data}<br>' + 
            '<b>al cliente:</b> {cli_nome}<br>' + 
            '<b>dalle ore:</b> {int_ora_inizio}<br>' +
            '<b>alle ore:</b> {int_ora_fine}<hr>',
        store: {
            model: 'GeoAssistenza.model.Interventi'
        }
    }]
});
