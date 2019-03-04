Ext.define('GeoAssistenza.Application', {
    extend: 'Ext.app.Application',

    name: 'GeoAssistenza',

    requires: [
        'GeoAssistenza.view.main.Main'
    ],

    quickTips: false,
    platformConfig: {
        desktop: {
            quickTips: true
        }
    },

    stores: [
        
    ],

    launch: function () {
        //Ext.create({
        //    xtype: 'login'
        //});
    },

    onAppUpdate: function () {
        Ext.Msg.confirm('Aggiornamento', 'Aggiornamento disponibile, applicarlo?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
