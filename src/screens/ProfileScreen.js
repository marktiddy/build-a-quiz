import React, { useState, useContext, useEffect } from 'react';
import { Button, Container, Col, Row, Form, ProgressBar } from 'react-bootstrap';
import { AuthContext } from '../context/Auth';
import avatar from '../img/avatar.png';
import firebase from '../keys/firebase';
import Spacer from '../components/Spacer'

const ProfileScreen = ({ history }) => {
  const { authenticated, currentUser, setCurrentUser } = useContext(
    AuthContext
  );
  const [user, setUser] = useState(firebase.auth().currentUser);
  const [storage] = useState(firebase.storage());
  const [username, setUsername] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [selectedFile,setSelectedFile] = useState(null)
  const [error,setError] = useState(null)
  const [progress,setProgress] = useState(0)

  useEffect(() => {
    if (currentUser.displayName) {
      setUsername(currentUser.displayName);
    }
  }, []);

  const onFileChange = event => {
    setSelectedFile(event.target.files[0])
  }

  const onFileUpload = (event) => {
event.preventDefault()

  //Check if file is empty
  if (!selectedFile) {
    setError('You must choose a photo')
    return;
  }
  //Check if file is not an image
  if (selectedFile.type.split('/')[0] !== 'image') {
    setError('Your file is not an image')
    return;
  }

  //Check filesize
  if (selectedFile.size > 2200000) {
    setError('Your image must be smaller than 2MB to continue')
  } else {
    setError(null)
   //Now upload with firebase bucket
var uploadTask = firebase.storage().ref(`avatars/${selectedFile.name}`).put(selectedFile)
//Start the task
uploadTask.on(
  "state_changed",
  snapshot => {
    //Update our progress bar
    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
    setProgress(progress)
  },
  error => {
    setError('Something went wrong uploading your photo')
  },
  () => {
    storage.ref('avatars').child(selectedFile.name).getDownloadURL().then(url => {
      if (currentUser.photoURL) {



//Script to grab filename from URL
var oldPhotoFilename;
const oldUrl = currentUser.photoURL
if (url.lastIndexOf('.jpg'|| '.png') !== -1) {
  oldPhotoFilename = oldUrl.substring(oldUrl.lastIndexOf('/')+11, oldUrl.lastIndexOf('.jpg'||'.png'||'.gif')+4)
} else {
  oldPhotoFilename = oldUrl.substring(oldUrl.lastIndexOf('/')+11, oldUrl.lastIndexOf('.jpeg')+5)
}

deleteExistingAvatar(oldPhotoFilename)
updateProfileURL(url)
      } else {
//user doesn't have a photo so we just want to save the new one
updateProfileURL(url)
      }
      
      //Finall set progress to zero
      setProgress(0)
      setSelectedFile(null)
    })
  }
)
  }

  }

const updateProfileURL = (url) => {
  console.log(url)
if (user) {
      user
        .updateProfile({
          photoURL: url,
        })
        .then(() => {
          setCurrentUser(user);
          //Reload the page
         history.push('/profile') 
        })
        .catch((e) => console.log(e));
    }
  }

  const deleteExistingAvatar = (oldfilename) => {
var oldFileRef = firebase.storage().ref('avatars').child(oldfilename)
oldFileRef.delete().then(()=>{
  //file was deleted
}).catch(e => console.log(e))
  }

  const handleUpdate = (event) => {
    event.preventDefault();
    if (user) {
      user
        .updateProfile({
          displayName: username,
        })
        .then(() => {
          setCurrentUser(user);
          setFeedback('We have successfully updated your username');
          setTimeout(() => {
            setFeedback(null);
            history.push('/profile');
          }, 2000);
        })
        .catch((e) => console.log(e));
    }
  };

  return (
    <>
      <Container>
        <Row>
          <Col>
            <h3>
              Welcome back{' '}
              {currentUser.displayName ? currentUser.displayName : null}
            </h3>
            <p>
              This is your profile area. Upload an avatar, change your username
              or update your password
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form onSubmit={handleUpdate}>
              <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Choose a username"
                  id="username-box"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
                {feedback ? <p>{feedback}</p> : null}
              </Form.Group>

              <Button variant="primary" type="submit" size="sm">
                Update Profile
              </Button>
            </Form>
          </Col>
        </Row>
        <Spacer />
         <Spacer />
        <Row>
          <Col md={3}>
            <h5>Avatar</h5>
        
          
            {currentUser.photoURL ? (
              <img src={currentUser.photoURL} alt="avatar" className="inline-avatar" />
            ) : (
              <img src={avatar} alt="avatar" className="inline-avatar" />
            )}
          </Col>
          <Col>
          <h5>Upload a new avatar</h5>
           <p>(use a square image for best results)</p>
            <Form onSubmit={onFileUpload}>
              <Form.File id="custom-file" label={selectedFile ? selectedFile.name : "Choose a photo"} custom onChange={onFileChange} />
              
    {error ? <Form.Text className="error-message">{error}</Form.Text> : null}
   <Spacer />
{progress === 0 ? null : <>     <ProgressBar variant="primary" animated now={progress} label="Uploading" />
<Spacer /></>}
    
    <Button variant="primary" type="submit" size="sm">Upload Avatar</Button>
            </Form>
               

           
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProfileScreen;
