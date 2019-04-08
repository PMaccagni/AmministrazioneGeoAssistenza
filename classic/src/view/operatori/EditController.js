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
Ext.define('GeoAssistenza.view.operatori.EditController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.operatori-edit',

    onSaveClick() {
        let ope_cod = this.lookup('codiceOperatore').getValue(),
            ope_nome = this.lookup('nomeOperatore').getValue(),
            admin_operatore = this.lookup('adminOperatore').getValue(),
            idOperatore = this.lookup('idOperatore').getValue(),
            passwordOperatore = this.lookup('passwordOperatore').getValue();
        if ((ope_cod === '') || (ope_nome === '') || (admin_operatore === null) || (passwordOperatore === '')) {
            Ext.Msg.alert('Attenzione', 'Compilare tutti i campi');
            return;
        }
        Ext.Ajax.request({
            url: 'server/Operatori/PostOperatori.php',
            params: {
                idOperatore,
                ope_cod,
                ope_nome,
                admin_operatore,
                passwordOperatore
            },
            success(response, opts) {
                if (this.checkErrors(response.responseText)) {
                    if (idOperatore !== '') {
                        Ext.Msg.alert('Info', 'Operatore modificato');
                    } else {
                        Ext.Msg.alert('Info', 'Operatore inserito');
                    }
                    this.onRevertClick();
                }
            },
            scope: this
        });
    },

    checkErrors(responseText) {
        if (responseText.substr(0, 1) === 'O') {
            return true;
        } else if (responseText.substr(0, 1) === 'E') {
            Ext.Msg.alert('Attenzione', responseText);
            return false;
        }
    },

    loadEdit(ope_id) {
        Ext.Ajax.request({
            url: 'server/Operatori/GetOperatori.php',
            params: {
                ope_id
            },
            success(response, opts) {
                let record = Ext.JSON.decode(response.responseText);
                this.setFormValues(record[0]);
            },
            scope: this
        });
    },

    setFormValues(record) {
        this.lookup('idOperatore').setValue(record.ope_id);
        this.lookup('codiceOperatore').setValue(record.ope_cod);
        this.lookup('nomeOperatore').setValue(record.ope_nome);
        this.lookup('adminOperatore').setValue(record.ope_admin);
        this.lookup('passwordOperatore').setValue(record.ope_password);
    },

    onRevertClick() {
        let form = this.getView().down('form');
        form.reset();
    },

    onCloseClick() {
        this.onRevertClick();
        this.getView().up('app-main').setActiveItem(this.listIndex);
    },

    init() {
        this.callParent();
        this.listIndex = this.getView().listIndex;
    }

});