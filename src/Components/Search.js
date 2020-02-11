import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import './Style.css';
import axios from 'axios';
import Video from './Video';
import {ActiveButton, DisableButton} from './Button';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    fontWeight: 'bold'
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function CustomizedInputBase() {

  const classes = useStyles();

  const [termo, setTermo] = useState("");
  const [ids, setIds] = useState([]);
  const [totalVideos, setTotalVideos] = useState(0);
  const [nextPage, setNextPage] = useState("");
  const [prevPage, setPrevPage] = useState("");

  useEffect(() => {
    
    if(totalVideos === 100 || totalVideos === '100'){
      setNextPage("");
    }
  }, [totalVideos]);

  const handleChange = e => {
    e.preventDefault();

    setTermo(e.target.value);
  }

  const getIds = async () => {
    const key = "";
    await axios.get(
      `https://www.googleapis.com/youtube/v3/search?key=${key}&part=id&part=snippet&q=${termo}&type=video&maxResults=20`
    ).then((result) => {

      if(result.data.nextPageToken){
        setNextPage(result.data.nextPageToken);
      }else{
        setNextPage("");
      }
      
      if(result.data.prevPageToken){
        setPrevPage(result.data.prevPageToken);
      }else{
        setPrevPage("");
      }
      
      const arrayResult = [];
      for (let index = 0; index < 20; index++) {
        arrayResult.push(result.data.items[index].id.videoId);
      }
      setIds(arrayResult);
    }).catch((err) => {
      alert(err); 
    });
  }

  const getNextVideos = async () => {
    const key = "";
    await axios.get(
      `https://www.googleapis.com/youtube/v3/search?key=${key}&part=id&part=snippet&q=${termo}&type=video&maxResults=20&pageToken=${nextPage}`
    ).then((result) => {

      if(result.data.nextPageToken){
        setNextPage(result.data.nextPageToken);
      }else{
        setNextPage("");
      }
      
      if(result.data.prevPageToken){
        setPrevPage(result.data.prevPageToken);
      }else{
        setPrevPage("");
      }
      
      const arrayResult = [];
      for (let index = 0; index < 20; index++) {
        arrayResult.push(result.data.items[index].id.videoId);
      }
      setIds(arrayResult); 
      setTotalVideos(totalVideos + 20);
    }).catch((err) => {
      console.log(err.response.data); 
    });
  }

  const getPrevVideos = async () => {
    const key = "";
    await axios.get(
      `https://www.googleapis.com/youtube/v3/search?key=${key}&part=id&part=snippet&q=${termo}&type=video&maxResults=20&pageToken=${prevPage}`
    ).then((result) => {

      if(result.data.nextPageToken){
        setNextPage(result.data.nextPageToken);
      }else{
        setNextPage("");
      }
      
      if(result.data.prevPageToken){
        setPrevPage(result.data.prevPageToken);
      }else{
        setPrevPage("");
      }
      
      const arrayResult = [];
      for (let index = 0; index < 20; index++) {
        arrayResult.push(result.data.items[index].id.videoId);
      }

      setIds(arrayResult);
      setTotalVideos(totalVideos - 20);
      
    }).catch((err) => {
      alert(err.response.data); 
    });
  }
  
  return (
    <div className="container">

      {
        nextPage ? <ActiveButton value= {<SkipNextIcon />} func={getNextVideos}/> : <DisableButton value={<SkipNextIcon />} />
      }

      {
        prevPage ? <ActiveButton value={<SkipPreviousIcon />} func={getPrevVideos}/> : <DisableButton value={<SkipPreviousIcon />} />
      }

      {
        totalVideos ? <DisableButton value={ids.length} /> : <DisableButton value='0' />
      }

      <div className="containerInput">
        <Paper component="form" className={classes.root}>
          <InputBase
            className={classes.input}
            placeholder="Pesquisar"
            onChange={handleChange}          
          />
          
          <Divider className={classes.divider} orientation="vertical" />

          <IconButton  
            type="button"   
            className={classes.iconButton} 
            aria-label="search"
            onClick={getIds}  
          >

            <SearchIcon />
          </IconButton>
        </Paper>
      </div>

      <div className="containerVideos">
        {
          ids ? ids.map(id => <Video id={id}/>)
          : ""
        }

      </div>
    </div>
  );
}