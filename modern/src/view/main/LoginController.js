Ext.define('GeoAssistenza.view.main.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.login',

    onLoginClick() {
        let ope_nome = this.lookup('username').getValue(),
            ope_password = this.lookup('password').getValue();
        if ((ope_nome === '') || (ope_password === '')) {
            Ext.Msg.alert('Attenzione', 'Inserire nome operatore e password');
            return;
        }
        Ext.Ajax.request({
            url: 'server/...',
            params: {
                ope_nome,
                ope_password
            },
            success(response, opts) {
                if (response.responseText !== '') {
                    let records = Ext.JSON.decode(response.responseText);
                    GeoAssistenza.codiceOperatore = records[0].ope_cod;
                    GeoAssistenza.nomeOperatore = records[0].ope_nome;
                    GeoAssistenza.admin = records[0].ope_admin;
                    if (this.isAdmin(GeoAssistenza.admin)) {
                        Ext.Msg.alert('Attenzione', 'La versione mobile per utente admin è ancora in fase di sviluppo...');
                    } else {
                        this.getView().up('app-main').fireEvent('onLoginSuccess');
                    }
                } else {
                    Ext.Msg.alert('Attenzione', 'Nome operatore o password errati');
                }
            },
            scope: this
        });
    },

    isAdmin(admin) {
        if (admin === '1') {
            return true;
        } else {
            return false;
        }
    }
});