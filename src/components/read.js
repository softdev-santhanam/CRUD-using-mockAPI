import axios from 'axios';
import "../App.css";
import React, { useEffect, useState } from 'react';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default function Read() {
    const [APIData, setAPIData] = useState([]);
    useEffect(() => {
        axios.get(`https://63aa9d337d7edb3ae62c2ad9.mockapi.io/crud/api/crud-api`)
            .then((response) => {
                console.log(response.data)
                setAPIData(response.data);
            })
    }, []);

    const setData = (data) => {
        let { id, firstName, lastName, checkbox } = data;
        localStorage.setItem('ID', id);
        localStorage.setItem('First Name', firstName);
        localStorage.setItem('Last Name', lastName);
        localStorage.setItem('Checkbox Value', checkbox)
    }

    const getData = () => {
        axios.get(`https://63aa9d337d7edb3ae62c2ad9.mockapi.io/crud/api/crud-api`)
            .then((getData) => {
                setAPIData(getData.data);
            })
    }

    const onDelete = (id) => {
        axios.delete(`https://63aa9d337d7edb3ae62c2ad9.mockapi.io/crud/api/crud-api/${id}`)
        .then(() => {
            getData();
        })
    }

    return (
        <div>
            <table className='table'>
                    <tr className='tr'>
                        <th>SN NO</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Checkbox Value</th>
                        <th>Create</th>
                        <th>Update</th>
                        <th>Delete</th>
                        <th>Time</th>
                    </tr>

                    {APIData.map((data) => {
                        return (
                            <tr>
                                <td>{data.id}</td>
                                <td>{data.firstName}</td>
                                <td>{data.lastName}</td>
                                <td>{data.checkbox ? 'Checked' : 'Unchecked'}</td>
                                
                                <td> 
                                <Link to='/'><Button onClick={() => setData(data)}>Create</Button></Link> 
                                </td>
                                
                                <td> 
                                <Link to='/update'><Button onClick={() => setData(data)}>Update</Button></Link>
                                </td>
                                
                                <td>
                                    <Button onClick={() => onDelete(data.id)}>Delete</Button>
                                </td>
                                <td>{data.createdAt}</td>
                            </tr>
                            
                        )
                    })}
                
            </table>
        </div>
    )
}