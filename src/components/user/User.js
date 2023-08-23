import React, { useState, useEffect } from "react";
import { Flex, Table, TableCell, TableRow, TableHead } from "@aws-amplify/ui-react";
import { Auth } from 'aws-amplify';
import './user.css';

export const User = () => {
    const [userAttributes, setUserAttributes] = useState({});
    
    useEffect(() => {
        async function fetchUserAttributes() {
            try {
                const user = await Auth.currentAuthenticatedUser();
                const attributes = await Auth.userAttributes(user);

                const userAttributes = {};
                attributes.forEach(attribute => {
                    userAttributes[attribute.Name] = attribute.Value;
                });

                setUserAttributes(userAttributes);
            } catch (error) {
                console.error('Error fetching user attributes:', error);
            }
        }
        fetchUserAttributes();
    }, []);

    return (
        <Flex direction="column">
        <Table className="custom-table">
            <TableHead>
                <TableRow>
                    <TableCell as="th">User Email</TableCell>
                    <TableCell as="th">User Clearance Level</TableCell>
                    <TableCell as="th">User Team</TableCell>
                </TableRow>
            </TableHead>
            <TableRow>
                <TableCell>{userAttributes['email']}</TableCell>
                <TableCell>{userAttributes['custom:clearance_level']}</TableCell>
                <TableCell>{userAttributes['custom:team']}</TableCell>
            </TableRow>
        </Table>
    </Flex>
    );
};