import React from 'react';
import { Button } from 'react-bootstrap';
const moderatorList = props => {

    if (!props.moderators){
        return <div/>
    }

    const moderators = [];
    Object.values(props.moderators).forEach(moderator => {
        // const element = {
        //     province: moderator.province,
        //     username: props.users[moderator.userId].username,
        //     email: props.users[moderator.userId].email,
        //     id: moderator.id,

        // }
        moderator.username = props.users[moderator.userId].username;
        moderator.email = props.users[moderator.userId].email
//        moderators.push(element)
        moderators.push(moderator);
    });

    return (
        <table>
            <thead>
                <tr>
                    <th>Province</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {moderators.map((moderator) => {
                    const action = moderator.status === 'ENABLED' ? 'Disable' : 'Enable'
                    return (
                        <tr key={moderator.id}>
                            <td>{moderator.province}</td>
                            <td>{moderator.username}</td>
                            <td>{moderator.email}</td>
                            <td><input style={{'width': '6em'}} type='button' name={moderator.id} value={action} onClick={() => props.switchStatus({...moderator})}></input></td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}
// <Button className='btn-xs btn-outline-secondary' onClick={() => props.switchStatus(moderator.id)}>{action}</Button>
//<input type='button' id={moderator.id} value={action} onClick={props.switchStatus}></input>

export default moderatorList;