Ext.define('GeoAssistenza.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',

    onItemSelected: function (sender, record) {
        Ext.Msg.confirm('Confirm', 'Are you sure?', 'onConfirm', this);
    },

    onConfirm: function (choice) {
        if (choice === 'yes') {
            //
        }
    },

    getAdminText(admin) {
        if (admin === '1') {
            return 'Admin';
        } else {
            return 'Utente normale';
        }
    },

    isAdmin(admin) {
        if (admin === '1') {
            return true;
        } else {
            return false;
        }
    },

    init() {
        this.getView().showLogin();
    }
});
