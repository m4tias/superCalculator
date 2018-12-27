import React from 'react';
import Person from '../Person/Person';

export default class Distrib extends React.PureComponent {

    render() {
        /*
            Hardy alg.
        */

        const debtors = JSON.parse(JSON.stringify(this.props.debtors));
        const oweds = JSON.parse(JSON.stringify(this.props.owed));

        const personsToRender = [];

        //Numeric debts
        const debtorsPrices = [];
        this.props.debtors.forEach(element => {
            debtorsPrices.push(Math.abs(element.owes));
        });
        const owedsPrices = [];
        this.props.owed.forEach(element => {
            owedsPrices.push(Math.abs(element.owes));
        });

        //Finding matches
        const matchesBetweenBoth = debtorsPrices.filter(e => owedsPrices.indexOf(e) !== -1);

        //Unifying each match 
        matchesBetweenBoth.forEach((e, i) => {
            const debtor = debtors[debtorsPrices.indexOf(e)];
            const owed = oweds[owedsPrices.indexOf(e)];
            personsToRender.push(
                <Person person={debtor}
                    type="pays"
                    key={personsToRender.length + 1}
                    money={e}
                    toWho={owed.name} />
            )
            debtors.splice(debtorsPrices.indexOf(e), 1);
            debtorsPrices.splice(debtorsPrices.indexOf(e), 1);
            oweds.splice(owedsPrices.indexOf(e), 1);
            owedsPrices.splice(owedsPrices.indexOf(e), 1);
        });

        //Keep paying
        debtors.forEach((debtor, i) => {

            while (Math.abs(debtor.owes) >= Math.abs(oweds[0].owes)) {
                debtor.owes = Math.abs(debtor.owes) - Math.abs(oweds[0].owes);
                personsToRender.push(
                    <Person person={debtor}
                        type="pays"
                        key={personsToRender.length + 1}
                        money={Math.abs(oweds[0].owes).toFixed(1)}
                        toWho={oweds[0].name} />
                );
                oweds.splice(0, 1);
                if (oweds.length === 0)
                    break;
            }

            if (debtor.owes !== 0 && oweds.length !== 0) {
                oweds[0].owes = Math.abs(oweds[0].owes) - Math.abs(debtor.owes);
                personsToRender.push(
                    <Person person={debtor}
                        type="le paga"
                        key={personsToRender.length + 1}
                        money={Math.abs(debtor.owes).toFixed(1)}
                        toWho={oweds[0].name} />
                );
            }
        })

        return personsToRender;
    }
}