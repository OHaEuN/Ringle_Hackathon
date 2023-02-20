import { useEffect, useState } from "react";
import axios from "axios";

export const useSynonymsApi = (sentence) => {
  const [synonyms, setSynonyms] = useState({ hi: "hi" });

  useEffect(() => {
    console.log("use effect..?");
    const fetchEvents = async () => {
      console.log("fetch");
      const res = await axios.get(
        `http://localhost:8000/word?sentence=${sentence}`
      );

      setSynonyms(res.data);
    };
    fetchEvents();
  }, []);
  return [synonyms];
};

// export const useSynonymsVADApi = (sentence) => {
//   const [VADs, setVADs] = useState({});

//   useEffect(() => {
//     const fetchEvents = async () => {
//       const res = await axios
//         .get(
//           `http://localhost:8000/word/detail?w=${Brave}&s1=${courageous}&s2=daring&s3=intrepid&s4=valiant`
//         )
//         .then((response) => {
//           console.log(response.status);
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//       console.log(res);
//       setSynonyms(res.data.data);
//       //   const response = await fetch(
//       //     `http://localhost:8000/word?sentence=${sentence}`
//       //   );
//       //   const data = await response.json();

//       //   console.log(data);
//     };
//     fetchEvents();
//   });

//   return [synonyms];
// };
