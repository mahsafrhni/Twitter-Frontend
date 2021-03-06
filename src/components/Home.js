import React from 'react';
import '../css/home.css';
import {Link} from "react-router-dom";
import logo from "../src/logo.png";
import history from "./history";

class Home extends React.Component {

    state = {
        username: '',
        tweet:'',
        disable_tweet :false,
        TweetsList: [],
        hashTags: null
    };

    count = 0 ;

    componentDidMount() {

    }


    sendTweetRequest = (tweet)=>{
        let twt ={
            content : tweet.text.toString(),
            hashTags : tweet.text.match(/#[a-z]+/gi),
        };
        if (twt.hashTags !== null){
            for (let i = 0 ; i < twt.hashTags.length ; i++){
                console.log("tags "+i+" " +twt.hashTags[i]);
                twt.hashTags[i] = twt.hashTags[i].substring(1);

            }
        }

        alert("auth: " + 'Bearer ' + localStorage.getItem("token"));

        console.log("tags after : " +twt.hashTags);
        this.state.hashTags = twt.hashTags;

        const requestOptions = {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
                Accept: '*/*',
                'Content-Type': 'application/json' },
            body: JSON.stringify(twt)
        }

        fetch('https://localhost:5001/api/Tweet', requestOptions )

            .then(response => response.json())
            .then((response) => {
                if(response.ok)
                    alert("tweet created");
                else if(response.status == 401)
                    alert("unauth");
                this.state.hashTags = twt.hashTags;
            })
            .catch((error) => {
                // handle your errors here
                console.error(error)
            })

        alert("tweet sent");
    }

    makeTweet = (retweet) =>{
        const tweet={
            id:this.count,
            text: retweet.text.toString(),
            retweet:retweet.retweet,
            like:retweet.like,
            comment:retweet.comment,
            hashTags: retweet.hashTags
        }
        this.sendTweetRequest(tweet);
        this.state.TweetsList[this.count++] = tweet;

        const field = document.getElementById("list_t");
        const template = document.createElement("div");
        template.setAttribute("class", "backg");
        field.parentNode.appendChild(template);

        const elem = document.createElement("div");
        elem.setAttribute("class", "item");
        elem.innerHTML = tweet.text;
        elem.innerHTML= "hashTags : ";

        if (tweet.hashTags !== null){
            elem.innerHTML= `<table class="tweet-box"><tr class="row"><td id="txt-tw">${tweet.text}</td></tr>
                        <tr class="row"><td class="col">hashTags : <a href="#">${tweet.hashTags}</a></td></tr>
                        <tr class="row">
                        <td class="col"><button class="btn foot" id="like-btn${tweet.id}" name="like">like (${tweet.like})</button></td>
                        <td class="col"><button class="btn foot" id="retweet-btn${tweet.id}" name="retweet">retweet (${tweet.retweet})</button></td>
                        <td class="col"><button class="btn foot" id="comment-btn${tweet.id}" name="comment">comment (${tweet.comment})</button></td>
                        </tr></table>`;
        } else{
            elem.innerHTML= `<table class="tweet-box"><tr class="row"><td id="txt-tw">${tweet.text}</td></tr>
                        <tr class="row">
                        <td class="col"><button class="btn foot" id="like-btn${tweet.id}" name="like">like (${tweet.like})</button></td>
                        <td class="col"><button class="btn foot" id="retweet-btn${tweet.id}" name="retweet">retweet (${tweet.retweet})</button></td>
                        <td class="col"><button class="btn foot" id="comment-btn${tweet.id}" name="comment">comment (${tweet.comment})</button></td>
                        </tr></table>`;
        }


        template.appendChild(elem);
        this.state.tweet='';
        document.getElementById("tweet_txt").value="";

        document.getElementById(`like-btn${tweet.id}`).addEventListener("click", ()=>{
            this.state.TweetsList[tweet.id].like = ++this.state.TweetsList[tweet.id].like ;
            document.getElementById(`like-btn${tweet.id}`).innerHTML =`liked (${this.state.TweetsList[tweet.id].like })`;
        })
        document.getElementById(`retweet-btn${tweet.id}`).addEventListener("click", ()=>{
            this.state.TweetsList[tweet.id].retweet = ++this.state.TweetsList[tweet.id].retweet ;
            document.getElementById(`retweet-btn${tweet.id}`).innerHTML =`retweeted (${this.state.TweetsList[tweet.id].retweet })`;
            this.makeTweet(tweet);
        })
        document.getElementById(`comment-btn${tweet.id}`).addEventListener("click", ()=>{
            this.state.TweetsList[tweet.id].comment = ++this.state.TweetsList[tweet.id].comment ;
            document.getElementById(`comment-btn${tweet.id}`).innerHTML =`commented (${this.state.TweetsList[tweet.id].comment })`;

        })
    }
    sendTweet = (e, data)  =>{

        let tweet={
            id:this.count,
            text: data.tweet.toString(),
            retweet:0,
            like:0,
            comment:0,
            hashTags: [],
            retweeted: [],
            liked:[]
        }
        this.sendTweetRequest(tweet);
        tweet.hashTags = this.state.hashTags;
        this.state.TweetsList[this.count++] = tweet;

        const field = document.getElementById("list_t");
        const template = document.createElement("div");
        template.setAttribute("class", "backg");
        field.parentNode.appendChild(template);

        const elem = document.createElement("div");
        elem.setAttribute("class", "item");
        elem.innerHTML = tweet.text;
        elem.innerHTML= "hashTags : ";

        if (tweet.hashTags !== null){
            elem.innerHTML= `<table class="tweet-box"><tr class="row"><td id="txt-tw">${tweet.text}</td></tr>
                        <tr class="row"><td class="col">hashTags : <a href="#">${tweet.hashTags}</a></td></tr>
                        <tr class="row">
                        <td class="col"><button class="btn foot" id="like-btn${tweet.id}" name="like">like (${tweet.like})</button></td>
                        <td class="col"><button class="btn foot" id="retweet-btn${tweet.id}" name="retweet">retweet (${tweet.retweet})</button></td>
                        <td class="col"><button class="btn foot" id="comment-btn${tweet.id}" name="comment">comment (${tweet.comment})</button></td>
                        </tr></table>`;
        } else{
            elem.innerHTML= `<table class="tweet-box"><tr class="row"><td id="txt-tw">${tweet.text}</td></tr>
                        <tr class="row">
                        <td class="col"><button class="btn foot" id="like-btn${tweet.id}" name="like">like (${tweet.like})</button></td>
                        <td class="col"><button class="btn foot" id="retweet-btn${tweet.id}" name="retweet">retweet (${tweet.retweet})</button></td>
                        <td class="col"><button class="btn foot" id="comment-btn${tweet.id}" name="comment">comment (${tweet.comment})</button></td>
                        </tr></table>`;
        }


        template.appendChild(elem);
        this.state.tweet='';
        document.getElementById("tweet_txt").value="";

        document.getElementById(`like-btn${tweet.id}`).addEventListener("click", ()=>{
            this.state.TweetsList[tweet.id].like = ++this.state.TweetsList[tweet.id].like ;
            document.getElementById(`like-btn${tweet.id}`).innerHTML =`liked (${this.state.TweetsList[tweet.id].like })`;
        })
        document.getElementById(`retweet-btn${tweet.id}`).addEventListener("click", ()=>{
            this.state.TweetsList[tweet.id].retweet = ++this.state.TweetsList[tweet.id].retweet ;
            document.getElementById(`retweet-btn${tweet.id}`).innerHTML =`retweeted (${this.state.TweetsList[tweet.id].retweet })`;
            if (tweet.retweeted!==null){
                for (let i=0 ; i<tweet.retweeted.length ; i++){
                    if (tweet.retweeted[i]==true){
                        this.updateTweet(i , this.count , tweet);
                    }
                }
            }
            tweet.retweeted[this.count]=true;
            this.makeTweet(tweet);
        })
        document.getElementById(`comment-btn${tweet.id}`).addEventListener("click", ()=>{
            this.state.TweetsList[tweet.id].comment = ++this.state.TweetsList[tweet.id].comment ;
            document.getElementById(`comment-btn${tweet.id}`).innerHTML =`commented (${this.state.TweetsList[tweet.id].comment })`;

        })

    }
    updateTweet =(i , retweeter , tweet)=>{
        this.state.TweetsList[i].like=tweet.like;
        this.state.TweetsList[i].retweet=tweet.retweet;
        this.state.TweetsList[i].comment=tweet.comment;

    }


    handle_logout = () => {

        localStorage.removeItem('token');
        this.setState({ logged_in: false, username: ''});
        history.push("/login");
        window.location.reload();
    };

    handle_change = e => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState(prestate => {
            const newState = { ...prestate };
            newState[name] = value;
            document.getElementById("text_size").innerHTML=newState.tweet.length.toString()+"/250";
            if (newState.tweet.length<1 || newState.tweet.length>250){
                document.getElementById("tweet_size_warn").innerHTML="<p id='size_warn'>tweet must have 1 to 250 letters</p>";
                this.state.disable_tweet = true;
            }else {
                this.state.disable_tweet = false;
            }
            return newState;
        });
    };


    render() {
        return (
            <div>
                <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
                <table id="main_table">
                    <tr class="row">
                        <td class="col" colSpan="4">
                            <h2 id="home">Twitter</h2>
                        </td>
                    </tr>
                    <tr class="row">
                        <td class="col-4">
                            <div id="sidebar_left">
                                <img id="logo-home" src={logo} alt="logo"></img>
                                <Link to="/home"><button class="btn btn-primary menu-item">Home</button></Link>
                                <Link to="/notifications"><button class="btn btn-outline-primary menu-item">Notifications</button></Link>
                                <Link to="/profile"><button class="btn btn-outline-primary menu-item">Profile</button></Link>
                                <button class="btn btn-outline-primary menu-item" onClick={this.handle_logout}>Log Out</button>
                            </div>
                        </td>
                        <td class="col-5" colSpan="2">
                            <div id="page_center">
                                <div class="tweet">
                                    <textarea class="form-control" id="tweet_txt" name="tweet" rows="8" cols="70" placeholder="  What's happening?"
                                              onChange={this.handle_change}></textarea>
                                    <p id="text_size"></p>
                                    <div id="tweet_size_warn"></div>
                                    <button id="send_tweet_button" class="btn btn-primary" disabled={this.state.disable_tweet} onClick={e => this.sendTweet(e, this.state)}>Tweet</button>
                                </div>
                                <div class="tweet_list">
                                    <ul id="list_t">

                                    </ul>
                                </div>
                            </div>
                        </td>
                        <td class="col-3">
                            <div id="sidebar_right">
                                <input id="search_txt" type="text" size="10" class="form-control" placeholder="Search Twitter" name="search"></input>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        );
    }
}
export default Home;
