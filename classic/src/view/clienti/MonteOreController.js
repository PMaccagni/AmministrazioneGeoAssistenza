Ext.define('GeoAssistenza.view.clienti.MonteOreController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.monte-ore-clienti',

    onSearchClick() {
        let grid = this.lookup('interventiGrid'),
            codiceCliente = this.lookup('codiceCliente').getValue(),
            dataDa = this.lookup('dataDa').getValue(),
            dataA = this.lookup('dataA').getValue(),
            store = grid.getStore();
        if (codiceCliente === null) {
            Ext.Msg.alert('Attenzione', 'Selezionare un cliente');
            return;
        }
        if (dataDa === null && dataA === null) {
            Ext.Msg.alert('Attenzione', 'Selezionare un range di date');
            return;
        } else if (dataDa === null && dataA !== null) {
            Ext.Msg.alert('Attenzione', 'Compilare entrambe le date');
            return;
        } else if (dataDa !== null && dataA === null) {
            Ext.Msg.alert('Attenzione', 'Compilare entrambe le date');
            return;
        } else if (dataDa !== null && dataA === null) {
            dataDa = dataDa.toISOString().substr(0, 10),
            dataA = dataA.toISOString().substr(0, 10)
        }
        store.load({
            params: {
                codiceCliente,
                dataDa,
                dataA
            },
            callback(records, operation, success) {
                if (success) {
                    if (records.length > 0) {
                        this.setTotale(records);
                    } else {
                        Ext.Msg.alert('Info', 'Nessun risultato');
                    }
                }
            },
            scope: this
        });
    },

    setTotale(records) {
        let ore = 0,
            minuti = 0;
        records.forEach((record) => {
            ore = ore + Number(record.get('int_ore'));
            minuti = minuti + Number(record.get('int_minuti'));
        });
        let hours = (minuti / 60),
            rhours = Math.floor(hours),
            minutes = (hours - rhours) * 60,
            rminutes = Math.round(minutes);
        ore = ore + rhours;
        this.lookup('totOre').setValue(ore + ' ore e ' + rminutes + ' minuti');
    }
});