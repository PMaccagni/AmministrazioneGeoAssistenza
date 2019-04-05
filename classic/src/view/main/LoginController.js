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
            url: 'http://localhost:8888/Session/GetSession.php',
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
                    this.getView().fireEvent('onLoginSuccess');
                    this.getView().destroy();
                } else {
                    Ext.Msg.alert('Attenzione', 'Nome operatore o password errati');
                }
            },
            scope: this
        });
    }
});