import React from 'react'
import { TextInput, Alert } from 'flowbite-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { spotifyService } from '../../service/index.service';
import { axiosError } from '../../handlers/error.handler';
import { isLink, isSpotifyLink } from '../../utils/regex.util';
import { useEffect } from 'react';
export function SpotifyFormComponent(props) {
    const setSongs = props.setSongs;
    const [errorState, setErrorState] = React.useState(false);
    const [buttonText, setButtonText] = React.useState('');
    useEffect(() => {
        if (!buttonText) {
            setButtonText('جستجو و دانلود');
        }
    }, [buttonText])
    useEffect(() => {
        if (errorState && errorState != '') {
            alert(errorState)
        }
    }, [errorState])
    return (
        <form className="flex flex-col items-center" onSubmit={(e) => submitHandler(e, setSongs, setErrorState, setButtonText)} >
            <input type="text" placeholder="لینک سینگل موزیک خود را وارد کنید..." className="input input-bordered input-success w-full max-w-xs mb-2" />
            <button className="btn btn-wide ">
                <FontAwesomeIcon icon={['fas', 'search']} className='mr-2' />
                {buttonText}
            </button>
        </form >
    )
}
async function submitHandler(e, setSongs, setErrorState, setButtonText) {
    e.preventDefault();
    setSongs([]);
    setErrorState(false);
    let value = e.target.querySelector('input').value;
    const button = e.target.querySelector('button');
    if (!value || !isLink(value)) {
        alert('لطفا یک لینک معتبر وارد کنید')
        return;
    }
    let targetUrl = ''
    switch (true) {
        case isSpotifyLink(value): targetUrl = 'spotify'; break;
        default: targetUrl = 'unknown';
    }

    if (targetUrl == 'unknown') {
        alert('لطفا یک لینک معتبر وارد کنید')
        return;
    }
    try {
        if (targetUrl == 'spotify') {
            button.classList.add('loading');
            const indexOf = value.indexOf("&")
            if (indexOf > 0) {
                value = value.substring(0, indexOf)
            }
            const data = await spotifyService.search(value)
            setSongs(data);
            button.classList.remove('loading');
            //    setinputSearchValue(value);
            return;
        }
        else {
            alert('لطفا یک لینک معتبر وارد کنید')
        }
    } catch (error) {
        axiosError(error, setErrorState)
    } finally {
        button.classList.remove('loading');
        setButtonText('')
    }
}



