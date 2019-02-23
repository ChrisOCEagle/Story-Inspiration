import React, { Component } from 'react';
import Header from '../Header';
import './style.css';

class Button extends Component {
    render() {;
        if (this.props.className === 'btn') {
            return(
                <button
                    className={this.props.className}
                    id={this.props.id}
                    name={this.props.name}
                    onClick={
                        this.props.clickEvent2 && this.props.clickEvent3 ? 
                        () => {
                            this.props.clickEvent1();
                            this.props.clickEvent2(this.props.id);
                            this.props.clickEvent3(this.props.id);
                        } :
                        this.props.clickEvent2 ?
                        () => {
                            this.props.clickEvent1();
                            this.props.clickEvent2(this.props.id);
                        } :
                        () => {
                            this.props.clickEvent1();
                        }
                    }
                >
                    {this.props.children}
                </button>
            );
        } else if (typeof this.props.href != 'undefined') {
            return(
                <a className={this.props.className} href={this.props.href} id={this.props.id} name={this.props.name}>
                    <Header className={this.props.headerName}>{this.props.children}</Header>
                </a>
            );
        };
    };
};

export default Button;