import React from 'react';

export function List({ children }) {
    return(
        <div className='list-overflow-container' style={{width: '100%'}}>
            <ul className='list-group'>{children}</ul>
        </div>
    );
};

export function ListItem({ children }) {
    return <li className='list-group-item' style={{width: '100%'}}>{children}</li>
}