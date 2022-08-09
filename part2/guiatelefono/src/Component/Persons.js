import React from 'react';

const Persons = ({ person,handleDelete }) => {
    return (
        <>
            <tr>
                <td>{person.name}</td>
                <td>{person.number}</td>
                <td>
                    <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
                </td>
            </tr>
        </>
    );
    }

export default Persons;