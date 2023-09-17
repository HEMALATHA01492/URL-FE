import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {  useNavigate } from 'react-router-dom';


function Urlshortner({url}) {

  const [ data, setData ]=useState([]);
  const [ title, setTitle] = useState("");
  const [Url, setUrl] = useState("");
  const [Click, setClick] = useState(true);
  const Navigate = useNavigate();

  useEffect(() => {
    const token = window.localStorage.getItem("loggedInUser");
    const config = { headers: { authorization: JSON.parse(token) } };
    axios.get(`${url}/urlShortener/userdata`, config)
    .then((res) => {
      setData(res.data);
    });
  }, [Click, setClick]);


  const HandleUrlShort = async (e) => {
    e.preventDefault();
    try {
      const token = window.localStorage.getItem("loggedInUser");
      const config = { headers: { authorization: JSON.parse(token)}};
      await axios.post(
        `${url}/urlShortener`,
        {
          title: title,
          longurl: Url,
        },
        config
      );
      Click ? setClick(false) : setClick(true);
      setTitle("");
      setUrl("");
    } catch (err) {
      console.log(err);
    }
  };
  const HandleClick = async (shorturl) => {
    try {
      const token = window.localStorage.getItem("loggedInUser");
      const config = { headers: { authorization: JSON.parse(token) } };
      await axios.post(`${url}/urlShortener/click`, { shorturl }, config);
      Click ? setClick(false) : setClick(true);
    } catch (err) {
      console.error(err);
    }
  };

  const HandleLogout = () => {
    window.localStorage.clear();
    Navigate("/signin");
  };
  return (
    <>
       <div className="container d-flex justify-content-center">
        <div className="row">
         <nav className="navbar sticky-top p-4">
          <div className="container-fluid heading">
            <span className="h3 fw-bold">WELCOME TO URL SHORTENER </span>
          <button className='btn btn-danger p-2'            
           onClick={HandleLogout}>
            Logout
          </button>
          </div>
        </nav>

       
        <div>
        <form className="text-center mb-3 ">
          <input className="form-control mb-1 mt-2"
            type="text"
            id="title"
            placeholder="Add Title to Your URL"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className="form-control mb-1 input-group input-group-lg mt-3 p-3"
            type="url"
            placeholder="Paste your URL"
            id="url"
            required
            value={Url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button
            className="btn btn-success mt-3"
            type="submit"
            id="makeshort"
            onClick={(e)=>HandleUrlShort(e)}
          >
            Make Short
          </button>
        </form>
        </div>

          {data.length > 0 ? (
            data.map((urldata) => {
              return (
                <table key={urldata._id} className="table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Short URL</th>
                      <th>Created Date</th>
                      <th>No.of.Clicks</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{urldata.title}</td>
                      <td>
                      <a href={urldata.longurl} target="_Blank">
                          <span onClick={() => HandleClick(urldata.shorturl)}>
                           {urldata.shorturl}
                         </span>
                       </a>
                      </td>
                      <td>{urldata.createdon}</td>
                      <td>{urldata.clicks}</td>
                    </tr>
                  </tbody>

                </table>
             );
             })
          ) : (
            <p className="text-danger fw-bold mt-5">
              Wait for data / Data Not available
            </p>
          )}
        </div>
        </div>
      </>

  )
}

export default Urlshortner