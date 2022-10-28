import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import config from '../../config/config';


export default function Form() {
    let { apiURL } = config;

    const [registered, setRegistered] = useState(false);
    const [shareLink, setShareLink] = useState('');
    const [confirmCopy, setConfirmCopy] = useState(false);

    // Check for referrals
    const [queryParams, setQueryParams] = useSearchParams();

    const referrer = queryParams.get('referrer')

    if (referrer) apiURL += `?referrer=${referrer}`

    console.log("API URL: ", apiURL);

    const register = (e) => {
        e.preventDefault();

        const reqBody = {}

        // Build request body
        Array.from(e.target).forEach((input) => {
            if (input.value) reqBody[input.name] = input.value;
        });
        reqBody['referralCount'] = 1;

        // Send POST request and display share link
        axios.post(apiURL, {
            ...reqBody
        }).then((data) => {
            const registeredUser = data.data.user;

            let link = 'https://referral-site-client.onrender.com';
            //  || 'http://localhost:5173';

            if (registeredUser?._id) {
                link += `?referrer=${registeredUser?._id}`;
            }

            setShareLink(link)
            setRegistered(true);

        }).catch((err) => {
            console.log(`DAMN an error occured...\n ${err}`)
        })

    }

    const copyLink = () => {
        var copyText = document.getElementById("share-link").innerText;
        console.log(copyText)
        navigator.clipboard.writeText(copyText).then(() => {
            // Alert the user that the action took place.
            
            setConfirmCopy(true)
            setTimeout(() => {
                document.getElementById('confirm-copy').classList.add('fade-out');
            }, 3000)
            setTimeout(() => {
                setConfirmCopy(false)
                document.getElementById('confirm-copy').classList.remove('fade-out');
            }, 6000)

        });
    }

    return (
        <section id='reg-form' className="footer">
            <h1>Register For Referral Challenge</h1>
            <form onSubmit={(e) => register(e)}>
                <div className="form_group">
                    <label>First Name: </label>
                    <input name="firstName" type="text" />
                </div>
                <div className="form_group">
                    <label>last Name: </label>
                    <input name="lastName" type="text" />
                </div>
                <div className="form_group">
                    <label>Email: </label>
                    <input name="email" type="email" />
                </div>
                <div className="form_group">
                    <label>Mobile Number: </label>
                    <input name="mobileNumber" type="tel" />
                </div>
                <button className="btn">Submit</button>
            </form>
            {registered ? (<div className="share">
                <p id="share-link">{shareLink}</p>
                <div onClick={copyLink} className='copy-btn'>
                    <i className="fa-regular fa-clipboard"></i>
                </div>
                {confirmCopy ?
                    <div id='confirm-copy' className="confirm-copy">copied!</div>
                    : null}
            </div>) : null}
        </section>
    )
}
