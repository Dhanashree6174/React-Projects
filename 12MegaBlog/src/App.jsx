import "./App.css";

function App() {
  // console.log(process.env.REACT_APP_APPWRITE_URL); // env variable file is defined in process and hence accessed like this in most cases(like in create react app) but not always
  console.log(import.meta.env.VITE_APPWRITE_URL); // for vite
  return (
    <>
      <h1>A blog app with appwrite</h1>
    </>
  );
}

export default App;

// environment variables --> system variables -- used to keep certain variables like passwords etc secret -- handled differently than normal variables -- should be in root of project (project's home directory - jaha package.json he)

// "@reduxjs/toolkit": "^2.5.0", --> redux
// "@tinymce/tinymce-react": "^5.1.1", --> for rich text -- to give text editing facilities to user when creating article
// "appwrite": "^16.1.0", --> provides backend as a service
// "html-react-parser": "^5.2.2", --> article is given in form of html but browser cannot display it directly so we need this parser
// "react-hook-form": "^7.54.2", --> this is a useful form
// "react-redux": "^9.2.0",
// "react-router-dom": "^7.1.1"
