import React from 'react';

const Persons = ({ person,handleDelete,updateNumber }) => {
    return (
        <>
            <tr>
                <td>{person.name}</td>
                <td>{person.number}</td>
                <td>
                    <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
                </td>
                <td>
                    <button className="btn btn-secondary" onClick={updateNumber}>Update</button>
                </td>
            </tr>
        </>
    );
    }

export default Persons;