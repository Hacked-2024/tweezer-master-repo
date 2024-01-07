import React, { useState, useEffect } from 'react';

const APIOutput = ({formattedJsonString,formattedImageJsonString}) => {
    //   const [data, setData] = useState([]);


    //   useEffect(() => {
    //     const fetchData = async () => {
    //       try {
    //         const response = await fetch('https://api.example.com/data');
    //         if (!response.ok) {
    //           throw new Error('Network response was not ok');
    //         }
    //         const apiData = await response.json();
    //         setData(apiData);
    //       } catch (error) {
    //         console.error('Error fetching data:', error);
    //       }
    //     };

    //     fetchData();
    //   }, []);

    //   return (
    //     <div>
    //       <h1>API Output:</h1>
    //       <ul>
    //         {data.map((item, index) => (
    //           <li key={index}>{JSON.stringify(item)}</li>
    //         ))}
    //       </ul>
    //     </div>
    //   );
    return (
        <div>
            JSON Response:
            <div className="JSON-output">
                <pre>
                    <code className="code-inline">Text Analysis: {formattedJsonString}</code>
                    <br/>
                    <code className="code-inline">Image Analysis: {formattedImageJsonString}</code>
                </pre>
            </div>
        </div>

    );
};

export default APIOutput;