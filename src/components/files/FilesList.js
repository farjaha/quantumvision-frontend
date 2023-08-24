import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Auth } from 'aws-amplify';
import { Flex, Table, TableCell, TableRow, TableHead, TableBody } from "@aws-amplify/ui-react";

const API_ENDPOINT = 'https://kxtyyoyea2.execute-api.us-east-2.amazonaws.com/dev';

export const FilesList = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userAttributes, setUserAttributes] = useState({});
  const [userData, setUserData] = useState({});

  useEffect(() => {
    async function fetchUserData() {
      try {

        const user = await Auth.currentAuthenticatedUser();
        const idToken = user.signInUserSession.idToken.jwtToken;
        console.log(idToken);

        const attributes = await Auth.userAttributes(user);

        const userAttributes = {};
        attributes.forEach(attribute => {
          userAttributes[attribute.Name] = attribute.Value;
        });

        const userTeam = userAttributes['custom:team'];
        const userLevel = userAttributes['custom:clearance_level'];

        const requiredData = {
          team: userTeam,
        }
        setUserAttributes(userAttributes);
        setUserData({ userLevel, userTeam });
        const response = await axios.post(`${API_ENDPOINT}/qvFiles`, requiredData, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: idToken,
          },
        });

        setFiles(response.data);
      } catch (error) {
        console.log('Error fetching files:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchUserData();
  }, []);

  const handleDownload = async (filename) => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const idToken = user.signInUserSession.idToken.jwtToken;
      const { userLevel, userTeam } = userData;

      const requiredData = {
        team: userTeam,
        clearance_lavel: userLevel,
        filename: filename
      }

      console.log("requiredData:", requiredData);

      const response = await axios.post(`${API_ENDPOINT}/download`, requiredData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: idToken,
        },
        responseType: 'blob',
      });

      const blob = new Blob([response.data], { type: 'application/json' });
      const downloadUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  const getFileType = (filename) => {
    const parts = filename.split('.');
    if (parts.length > 1) {
      return parts[parts.length - 1];
    }
    return 'Unknown';
  };

  console.log(userData)

  return (
    <div style={{ position: 'relative' }}>
      <h2 >Files in S3 Bucket:</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Flex direction="column">
          <Table className="custom-table">
            <TableHead>
              <TableRow>
                <TableCell as="th">File Name</TableCell>
                <TableCell as="th">File Type</TableCell>
                <TableCell as="th"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <td colSpan="3">Loading...</td>
              ) : (
                files.map((file, index) => (
                  <TableRow key={index}>
                    <TableCell>{file}</TableCell>
                    <TableCell>{getFileType(file)}</TableCell>
                    <TableCell>
                      <button onClick={() => handleDownload(file)}>Download</button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Flex>
      )}
    </div>
  );
};

