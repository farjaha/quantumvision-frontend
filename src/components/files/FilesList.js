import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Auth } from 'aws-amplify';

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
        console.log(idToken)
        const attributes = await Auth.userAttributes(user);
        const userAttributes = {};
        attributes.forEach(attribute => {
          userAttributes[attribute.Name] = attribute.Value;
        });
        const userTeam = userAttributes['custom:team'];
        const userLevel = userAttributes['custom:clearance_level'];
        setUserAttributes(userAttributes);
        setUserData({ userLevel, userTeam });
        const response = await axios.get(`${API_ENDPOINT}/qvFiles?team=${userTeam}`, {
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

      const response = await axios.get(`${API_ENDPOINT}/download`, {
        headers: {
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
          ): (
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
        <thead>
          <tr style={{ backgroundColor: 'lightgrey', color: 'black' }}>
            <th>File Name</th>
            <th>File Type</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="3">Loading...</td>
            </tr>
          ) : (
            files.map((file, index) => (
              <tr key={index}>
                <td>{file}</td>
                <td>{getFileType(file)}</td>
                <td>
                  <button onClick={() => handleDownload(file)}>Download</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table> )}
    </div>
  );
};

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Auth } from 'aws-amplify';

// const API_ENDPOINT = 'https://kxtyyoyea2.execute-api.us-east-2.amazonaws.com/dev'; 

// export const FilesList = () => {
//   const [files, setFiles] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [userAttributes, setUserAttributes] = useState({});

//   useEffect(() => {
//     async function fetchFiles() {
//       try {
//         const user = await Auth.currentAuthenticatedUser();
//         const idToken = user.signInUserSession.idToken.jwtToken;
//         const attributes = await Auth.userAttributes(user);

//         const userAttributes = {};
//         attributes.forEach(attribute => {
//           userAttributes[attribute.Name] = attribute.Value;
//         });

//         const userTeam = userAttributes['custom:team'];
//         const userLevel = userAttributes['custom:clearance_level'];

//         setUserAttributes(userAttributes);
//         console.log(idToken);
//         const userData = {
//           userLevel,
//           userTeam,
//         };
//         const response = await axios.get(`${API_ENDPOINT}/qvFiles?team=${userTeam}`, {
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: idToken,
//           },
//         });
//         setFiles(response.data);
//       } catch (error) {
//         console.log('Error fetching files:', error);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchFiles();
//   }, []);

//   const handleDownload = async (filename) => {
//     try {
//       const user = await Auth.currentAuthenticatedUser();
//       const idToken = user.signInUserSession.idToken.jwtToken;
//       const userLevel = userAttributes['custom:clearance_level'];
//       const userTeam = userAttributes['custom:team']
//       const userData = {
//         userLevel,
//         userTeam,
//       };
//       const response = await axios.get(`${API_ENDPOINT}/download?filename=${filename}&clearance_level=${userLevel}&team=${userTeam}`, {
//         headers: {
//           Authorization: idToken,
//         },
//         responseType: 'blob', // Set response type to 'blob' for binary data
//       });
//       // Create a Blob object from the response data
//       const blob = new Blob([response.data], { type: 'application/json' });
//       // Create a download URL for the Blob
//       const downloadUrl = URL.createObjectURL(blob);
//       // Create an anchor element and simulate a click to trigger the download
//       const a = document.createElement('a');
//       a.href = downloadUrl;
//       a.download = filename;
//       a.click();
//       // Clean up the URL object
//       URL.revokeObjectURL(downloadUrl);
//     } catch (error) {
//       console.error('Error downloading file:', error);
//     }
//   };

  


//   return (
//     <div style={{ position: 'relative', left: '15px', display: 'grid', gridTemplateColumns: '1fr 50px 1fr' }}>
//       <div>
//         <h2>Files in S3 Bucket:</h2>
//         <ul style={{ listStyle: 'none', padding: 0 }}>
//           {loading ? (
//             <p>Loading...</p>
//           ) : (
//             files.map((file, index) => (
//               <li
//                 key={index}
//                 style={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   marginBottom: '15px',
//                   borderBottom: '0.5px solid #ccc',
//                   paddingBottom: '5px',
//                 }}
//               >
//                 <button onClick={() => handleDownload(file)}>
//                   Download
//                 </button>
//                 <span style={{ marginLeft: '10px' }}>{file}</span>
//               </li>
//             ))
//           )}
//         </ul>
//       </div>
//       <div></div> {/* Empty second column */}
//     </div>
//   );
// };