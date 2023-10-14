import React, { Component } from "react";

export const AdmitContext = React.createContext();

export class AdmitProvider extends Component {
    constructor(props) {
        super(props);
        this.state = { admitItems: [] };
        this.addToAdmit = this.addToAdmit.bind(this);
        this.updateQuantity = this.updateQuantity.bind(this);
        this.removeFromAdmit = this.removeFromAdmit.bind(this);
    }
    addToAdmit(payloadf) {
        console.log('add to admit: ', payloadf);
        const existingProductIndex = this.state.admitItems.findIndex(item => item.id === payloadf.idProduct);
        if (existingProductIndex >= 0) {
            const updatedAdmitItems = [...this.state.admitItems];
            updatedAdmitItems[existingProductIndex].quantity++;
            this.setState({
                admitItems: updatedAdmitItems
            });
        } else {
            this.setState({
                admitItems: [...this.state.admitItems, { ...payloadf, quantity: payloadf.quantity }]
            });
        }
    }
    updateQuantity(payloadf, newQuantity) {
        if (newQuantity < 1) {
            return;
        }
        const updatedAdmitItems = this.state.admitItems.map((item) => {
            if (item.id === payloadf.idProduct) {
                return { ...item, quantity: newQuantity };
            }
            return item;
        });
        this.setState({
            admitItems: updatedAdmitItems
        });
    }
    removeFromAdmit(productId) {
        const updatedAdmitItems = this.state.admitItems.filter(
            (item) => item.idProduct !== productId
        );
        this.setState({
            admitItems: updatedAdmitItems
        });
    }
    render() {
        return (
            <AdmitContext.Provider
                value={{
                    admitItems: this.state.admitItems,
                    addToAdmit: this.addToAdmit,
                    updateQuantity: this.updateQuantity,
                    removeFromAdmit: this.removeFromAdmit
                }}
            >
                {this.props.children}
            </AdmitContext.Provider>
        );
    }
}