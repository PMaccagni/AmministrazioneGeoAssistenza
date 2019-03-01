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
