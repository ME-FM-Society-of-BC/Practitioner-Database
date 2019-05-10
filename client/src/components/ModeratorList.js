import React from 'react';

const moderatorList = props => {

    if (!props.moderators){
        return <div/>
    }
    const moderators = [];
    props.moderators.forEach(moderator => {
        const element = {
            province: moderator.province,
            username: props.users[moderator.userId].username,
            email: props.users[moderator.userId].email
        }
        moderators.push(element)
    });

    return (
        <table>
            <thead>
                <tr>
                    <th>Province</th>
                    <th>Username</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                {moderators.map((moderator, index) => {
                    return (
                        <tr key={index}>
                            <td>{moderator.province}</td>
                            <td>{moderator.username}</td>
                            <td>{moderator.email}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default moderatorList;